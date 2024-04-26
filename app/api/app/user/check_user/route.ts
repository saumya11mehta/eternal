import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
import { generateAuthToken } from '@/utils/passwordUtils';
import { getAuthCookie } from '@/lib/cookie';

const prisma = new PrismaClient();

export async function POST(request: Request){
    const { display_name,email } = await request.json();

    const check_user = await prisma.auth_user.findFirst({
        where: { first_name: display_name, email: email},
    });

    if(check_user != null) {
        const authToken = generateAuthToken(check_user.id); // Assuming generateAuthToken exists in passwordUtils.js

      // Set cookie with secure flag (important!)
        const cookie = getAuthCookie(authToken);
        return  NextResponse.json({ exists: true,display_name:display_name },{ headers: { 'Set-Cookie': cookie }})
    }else{
        return  NextResponse.json({ exists: false })
    }
}