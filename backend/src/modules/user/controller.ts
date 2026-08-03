import {Request, Response} from 'express';
import { createUserService, getUserService } from './service.ts';
 
   export const createUser = async (req: Request, res: Response) => {
    const a = req.body;
    const { name, email, password } = a;

   const userResponse = await createUserService(name, email, password);
   res.status(201).json(userResponse);
  }

  export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userResponse = await getUserService(id as string);
res.status(userResponse.statusCode).json(userResponse);  }