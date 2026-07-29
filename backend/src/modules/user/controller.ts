import {Request, Response} from 'express';
import { createUserService } from './service';
export const createUser = async (req: Request, res: Response) => {
    const a = req.body;
    const {
        name, 
        email, 
        password
    } = a;
    const userResponse = createUserService( name, email, password );
    res.status(201).json({ userResponse });
}

export const updateUser = async()=>{}

