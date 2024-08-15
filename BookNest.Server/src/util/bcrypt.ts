import * as bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function hashPassword(pass : string): Promise<string> {
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(pass, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error(`Error generating hash: ${error}`);
    }
}

export async function verifyPassword(pass: string, hashed: string): Promise<boolean> {
    try {
        const isMatch = await bcrypt.compare(pass, hashed);
        return isMatch;
    } catch (error) {
        throw new Error(`Error generating hash: ${error}`);
    }
}