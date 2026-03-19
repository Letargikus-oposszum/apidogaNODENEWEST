/*
Készítsünk virágbolt rendeléseket számon tartó Web API-t. A rendelések a következő mezőkből állnak: Id, ProductName, ProductType, Quantity, Price, Created. SQL script mellékelve.
*/

import express from 'express';
import cors from 'cors';
import orderRouter from './controllers/Controller.js';


const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/', orderRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})