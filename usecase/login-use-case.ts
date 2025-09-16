import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN, HARDCODED_USER } from '../auth/auth-config';
import { ValidationError } from '../errors';
import { LoginDTO } from '../validation/schemas/auth-schemas';

export class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UnauthorizedError';
    }
}

export class LoginUseCase {

    async execute(input: LoginDTO): Promise<{ token: string }> {
        if (input.username !== HARDCODED_USER.username || input.password !== HARDCODED_USER.password) {
            throw new UnauthorizedError('Invalid credentials');
        }

        const token = jwt.sign(
            { 
                sub: 'admin', 
                username: 'admin' 
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        return { token };
    }
}
