import { Router } from 'express';
import { createUser, getUser} from './controller.ts'; 


const userRoutes = Router();

userRoutes.post('/createUser', createUser);
userRoutes.get('/user/:id', getUser);

export default userRoutes;