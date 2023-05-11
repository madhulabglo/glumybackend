import express from "express";
import BodyParser from "body-parser";
import routes from "./src/routes/hireDevRoutes";
import cors from "cors";
import {connectDB} from './dbAuth'

const app = express();

//bodyparser setup
app.use(
  BodyParser.urlencoded({
    extended: true,
  })
);
app.use(BodyParser.json());

//Allowing cross origin requests
app.use(cors());

//serving static files
app.use(express.static("public/images"));

//connecting the app to our routes
routes(app);

//connection to DB
connectDB();

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`server listening at ${PORT}`);
});
