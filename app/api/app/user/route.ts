import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hashPassword, encodePassword, generateAuthToken } from '@/utils/passwordUtils';
import { getAuthCookie } from '@/lib/cookie';


const prisma = new PrismaClient();

export async function POST(request: Request){
	const { display_name,email,password } = await request.json();
	const { algorithm, iterations, salt, hashedPassword } = hashPassword(password);
	const encodedPass = encodePassword(algorithm, iterations, salt, hashedPassword);
	const data  = {
		password: encodedPass,
		last_login:new Date(),
		is_superuser: false,
		username: display_name,
		first_name: display_name,
		last_name: null,
		email: email,
		is_staff: false,
		is_active: true,
		date_joined: new Date(),
		from_spotify: true
	};
  
	try {
		const createdUser  = await prisma.auth_user.create({data:data});

		if (createdUser) {
			const authToken = generateAuthToken(createdUser.id); // Assuming generateAuthToken exists in passwordUtils.js

			// Set cookie with secure flag (important!)
			const cookie = getAuthCookie(authToken);

			return NextResponse.json({ created: true },{ headers: { 'Set-Cookie': cookie }}); // User created successfully
		} else {
			// Handle creation failure (e.g., email might already exist)
			return NextResponse.json({ created: false, error: 'User creation failed' }); // Informative error message
		}
	}catch (error) {
		return NextResponse.json({ created: false, error: 'Internal server error'});
	}
}