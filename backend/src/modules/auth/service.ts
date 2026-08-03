import { createUserService } from '../user/service.ts'
import jwt from 'jsonwebtoken'
export const signUpService = async (
    name: string,
    email: string,
    password: string
) => {
    const result = await createUserService(name, email, password)

    const jwtToken = jwt.sign({},  'anu123')
    return { ...result, jwtToken }
}