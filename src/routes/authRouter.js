import userSchemaValidation from '../middlewares/userSchemaValidation.js';
import { signUp,signIn } from '../controllers/authController.js';
import { Router } from 'express';
const authRouter = Router();
authRouter.post('/sign-up',userSchemaValidation,signUp);
authRouter.post('/sign-in',signIn);
export default authRouter;
