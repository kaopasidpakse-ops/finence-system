import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cors from 'cors';
import router from './Router/Router.js';




const app = express();




// console.log(process.cwd());
// console.log(process.env.JWT_SECRET);



app.use(cors());
app.use(express.json());


app.use('/api', router);


app.listen(3000, () => {
    console.log('Server is running on port 3000'); 
});