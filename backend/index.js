import express, { urlencoded } from "express" ;
import cookieParser from "cookie-parser" ;
import dotenv from "dotenv" ;
import cors from "cors" ;
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js"
import expenseRoute from "./routes/expense.route.js"

dotenv.config({}) ;

const app = express() ;
const PORT =process.env.PORT || 8000 ;


// middleware
app.use(express.json()) ;
app.use(urlencoded({extended:true}));
app.use(cookieParser()) ;
const corsOptions = {
    origin : "https://expense-tracker-frontend-jnj7.onrender.com" ,
    credentials : true
}
app.use(cors(corsOptions));

// api's
app.use("/api/v1/user", userRoute);           // http:localhost:5173/api/v1/user/register
app.use("/api/v1/expense", expenseRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
  });
});

