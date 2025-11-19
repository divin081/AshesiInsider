import express from "express"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const router = express.Router();


router.post("/login",async(req,res)=>{
    try{
        const{email,password} = req.body
          
        //validate input
        if(!email||!password){
            return res.status(400).json({error:"Fill in all required fields"})
        }

        //retrieve from the database and check if user email is valid
        const {data, error} = await supabase
            .from('Users')
            .select('*')
            .eq('email', email)
            .single();
        
             if (error || !data) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
    //compare password
    const isPasswordValid = await bcrypt.compare(password,data.password_hash)

    if(!isPasswordValid){
        return res.status(401).json({error: "Invalid credentials"})
    }

    }
    catch(error){

    }
})