import userSchemaValidation from '../middlewares/userSchemaValidation.js';
import { signUp } from '../controllers/authController.js';
import { Router } from 'express';
const authRouter = Router();
authRouter.post('/sign-up',userSchemaValidation,signUp);
export default authRouter;
