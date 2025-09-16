import { Router } from 'express';
import { LoginUseCase } from '../usecase/login-use-case';
import { validateBody } from '../validation/middleware/validate';
import { loginSchema } from '../validation/schemas/auth-schemas';

const router = Router();
const loginUseCase = new LoginUseCase();

router.post('/login', validateBody(loginSchema), async (req, res, next) => {
    try {
        const result = await loginUseCase.execute(req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export default router;
