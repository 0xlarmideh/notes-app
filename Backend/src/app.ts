import express, { NextFunction, Request, Response } from "express";
import router from "./routes/notes";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

// Middleware logger
app.use(morgan("dev"));

// Specify waht kind of filetype to use on our database
app.use(express.json());

// Router middleware
app.use("/api/notes", router);

// Create error message for when API is unavailable
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// Middleware setup
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occured";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
