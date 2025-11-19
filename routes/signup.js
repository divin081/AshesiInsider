import express from "express"
import bcrypt from 'bcryptjs';
dotenv.config();

const router = express.Router()

router.post("/signup" , async(req,res)=>{
    try{
        const{email,password,examType,yearsOfStudy,school} = req.body
        if(!email || !password || !yearsOfStudy ){
            return res.status(400).json({error: "Fill all required fields"})
        }

        //hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)


        if (password.length < 6) {
            return res.status(400).json({ 
                error: "Password must be at least 6 characters long" 
            });
        }
        //check if user already exists
        const { data: existingUser, error: checkError } = await supabase
            .from('Users')
            .select('email')
            .eq('email', email)
            .single();

        if (existingUser) {
            return res.status(409).json({ error: "User with this email already exists" });
        }

        //create a new user
        const {data, error} = await supabase
            .from('Users')
            .insert({
                email: email,
                password_hash: hashedPassword,
                examType: examType,
                yearsOfStudy: yearsOfStudy,
                school: school || ''
            })
            .select('*')
            .single();
            const {password_hash, ...user} = data
            return res.status(201).json({
                message : "User created successfully",
                user: user
            })
    }
    //check for error
    catch(error){
        console.error(error.message)
         // Handle specific database errors
        


        return res.status(500).json({error : error.message})
    }

    




})



export default router