import walletSchemaValidation from '../middlewares/walletSchemaValidation.js';
import { entry,getItems} from '../controllers/walletController.js';
import { Router } from 'express';
const walletRouter = Router();
walletRouter.post('/entry',walletSchemaValidation,entry);
walletRouter.get('/entry',getItems);

export default walletRouter;
