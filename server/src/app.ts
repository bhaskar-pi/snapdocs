import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import env from "@config/env";
import authRouter from "@routes/auth.routes";
import createRequestRouter from "@routes/document-requests.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, //  allow cookies
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use(env.API_PATH, authRouter);
app.use(env.API_PATH, createRequestRouter);

export default app;
