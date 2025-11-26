import { NextResponse, type NextRequest } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';
import { SESSION_COOKIE, parseSessionToken } from '@/lib/session';
import { validateEmail, getPasswordErrorMessage } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        // Auth check
        const token = req.cookies.get(SESSION_COOKIE)?.value;
        const session = token ? parseSessionToken(token) : null;

        if (!session || session.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!supabaseServer) {
            return NextResponse.json({ error: 'Database client not configured' }, { status: 500 });
        }

        const [
            { data: users, error: usersError },
            { data: admins, error: adminsError }
        ] = await Promise.all([
            supabaseServer
                .from('profiles')
                .select('id, full_name, email, created_at')
                .order('created_at', { ascending: false }),
            supabaseServer
                .from('admins')
                .select('email')
        ]);

        if (usersError) {
            return NextResponse.json({ error: usersError.message }, { status: 500 });
        }

        const adminEmails = new Set((admins || []).map(a => a.email));

        const usersWithRole = (users || []).map(u => ({
            ...u,
            role: adminEmails.has(u.email) ? 'admin' : 'user'
        }));

        return NextResponse.json({ users: usersWithRole });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        // Auth check
        const token = req.cookies.get(SESSION_COOKIE)?.value;
        const session = token ? parseSessionToken(token) : null;

        if (!session || session.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Check if we are deleting an admin
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const email = searchParams.get('email');
        const action = searchParams.get('action'); // 'delete_user' or 'remove_admin'

        if (!supabaseServer) {
            return NextResponse.json({ error: 'Database client not configured' }, { status: 500 });
        }

        if (action === 'remove_admin' && email) {
            const { error } = await supabaseServer
                .from('admins')
                .delete()
                .eq('email', email);

            if (error) return NextResponse.json({ error: error.message }, { status: 500 });
            return NextResponse.json({ success: true });
        }

        if (action === 'delete_user' && id) {
            const { error } = await supabaseServer
                .from('profiles')
                .delete()
                .eq('id', id);

            if (error) return NextResponse.json({ error: error.message }, { status: 500 });
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        // Auth check
        const token = req.cookies.get(SESSION_COOKIE)?.value;
        const session = token ? parseSessionToken(token) : null;

        if (!session || session.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const emailInput = (body.email ?? '').toLowerCase().trim();
        const password = body.password ?? '';

        // Validate email
        const emailValidation = validateEmail(emailInput);
        if (!emailValidation.isValid) {
            return NextResponse.json({ error: emailValidation.error }, { status: 400 });
        }

        // Validate password strength
        const passwordError = getPasswordErrorMessage(password);
        if (passwordError) {
            return NextResponse.json({ error: passwordError }, { status: 400 });
        }

        if (!supabaseServer) {
            return NextResponse.json({ error: 'Database client not configured' }, { status: 500 });
        }

        // Insert new admin with validated and sanitized data
        const { error } = await supabaseServer.rpc('create_admin', {
            _email: emailValidation.sanitized!,
            _password: password
        });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

