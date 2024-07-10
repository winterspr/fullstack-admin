import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';

//data imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductState from './models/ProductState.js';
import Transaction from './models/Transaction.js';
import OverallStat from './models/OverallStat.js';
import AffiliateStat from './models/AffiliateStat.js';
import {dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat} from "./data/index.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet()); 
// là một middleware để tăng cường bảo mật bằng cách thiết lập các httmp phù hợp 
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
//giúp kiểm soát các tài nguyên được truy cập qua các domain khác nhau
// + cross-origin: cho phép tất các request liên domain truy cập tài nguyên

app.use(morgan("common"));
// là một middleware được sử dụng để ghi log các request http đến ứng dụng
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

/* Routes */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen(PORT, ()=>console.log(`Server Port: ${PORT}`));
    //Product.insertMany(dataProduct);
    //ProductState.insertMany(dataProductStat);
    //User.insertMany(dataUser);
    //Transaction.insertMany(dataTransaction)
   //OverallStat.insertMany(dataOverallStat);
   //AffiliateStat.insertMany(dataAffiliateStat);
}).catch((error)=>console.log(`${error} did not connect`))