import { app } from "./app.js";
import { connectDatabase } from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path: './.env'
})

connectDatabase().then((e) =>{
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch((e) => {
    throw new Error(`App is not running on port ${process.env.PORT}`);
});