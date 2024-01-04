import { RequestHandler } from "express";
import createHttpError from "http-errors";

interface SignupBody {
  username?: string;
  email?: string;
  password?: string;
}

export const signup: RequestHandler<
  unknown,
  unknown,
  SignupBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;

  try {
    if (!username || !email || !passwordRaw)
      throw createHttpError(
        400,
        "Parameters missing (email, username, password"
      );
  } catch (err) {
    next(err);
  }
};
