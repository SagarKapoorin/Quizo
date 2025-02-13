import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { Request, Response, NextFunction } from "express";
import morgan from "morgan";
dotenv.config({ path: "../../.env" });

const app = express();

app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));



const PORT: string = process.env.PORT || "3000";
// console.log(PORT);
app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});