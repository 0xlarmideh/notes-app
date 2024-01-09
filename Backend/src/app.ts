import express, { NextFunction, Request, Response } from "express";
import noteRoutes from "./routes/notes";
import userRoutes from "./routes/users";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session
 from "express-session";
 import env from "./util/validateEnv"
import MongoStore from "connect-mongo";
const app = express();

// Middleware logger
app.use(morgan("dev"));

// Specify waht kind of filetype to use on our database
app.use(express.json());

app.use(session({
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 2000
  },
  rolling: true,
  store: MongoStore.create({
    mongoUrl: env.DB_URL
  })
}))

// Router middleware
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

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
