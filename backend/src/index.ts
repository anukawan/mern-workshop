import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import connectDb from './src/modules/config/db';

const app = express();
app.use(bodyParser);  //use-- application level middleware 
app.use(express.json()); //use-- application level middleware
app.use(express.urlencoded({ extended: true })); //use-- application level middleware

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

const server = async()=>{
    await connectDb()
    app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
}
void server();