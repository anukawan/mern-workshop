import { Router } from 'express';
import { createUser} from './controller'; 

const userRoutes = Router();

userRoutes.post('/createUser', createUser);

export default userRoutes;