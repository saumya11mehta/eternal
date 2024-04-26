import { pbkdf2Sync, randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';

interface HashedPassword {
    algorithm:string;
    iterations:number;
    salt: string;
    hashedPassword: string;
}

interface DecodedPassword {
    salt: string;
    hashedPassword: string;
}

// Function to generate a salt and hash a password using PBKDF2 with SHA-256
export function hashPassword(password: string): HashedPassword {
  const algorithm = "pbkdf2_sha256";
  const iterations = 10000
  const salt = randomBytes(16).toString('hex');
  const hashedPassword = pbkdf2Sync(password, salt, iterations, 64, 'sha256').toString('hex');
  return { algorithm, iterations, salt, hashedPassword };
}

export function encodePassword(algorithm: string,iterations:number,salt:string,hashedPassword:string) : string {
    const password = algorithm + "$" + iterations + "$" + salt + "$" + hashedPassword;
    return password;
}

export function decodePassword(password:string) : DecodedPassword {
    const spiltVal = password.split("$");
    const salt = spiltVal[2];
    const hashedPassword = spiltVal[3];
    return { salt, hashedPassword };
}

// Function to verify a password against its hashed version
export function verifyPassword(password: string, hashedPassword: string, salt: string): boolean {
  const hash = pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');
  return hashedPassword === hash;
}

export function generateAuthToken(userId:number) {
    // Replace 'YOUR_SECRET_KEY' with a long, random, and environment-specific secret key
    const secretKey = process.env.JWT_SECRET_KEY || 'YOUR_SECRET_KEY';
  
    // Payload to include in the token (user ID in this example)
    const payload = { userId };
  
    // Generate the token using a secure algorithm (e.g., 'HS256')
    const token = jwt.sign(payload, secretKey, { algorithm: 'HS256' });
  
    return token;
}