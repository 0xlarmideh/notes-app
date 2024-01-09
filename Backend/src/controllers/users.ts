import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

interface SignupBody {
  username?: string;
  email?: string;
  password?: string;
}

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;

  try {
    if (!authenticatedUserId) {
      throw createHttpError(401, "User not logged in")
    }

    const user = await UserModel.findById(authenticatedUserId).select("+email");

    res.status(200).json(user);
  } catch (error) {
    next(error)
  }
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
    const existingUser = await UserModel.findOne({ username });
    const existingEmail = await UserModel.findOne({ email });
    if (existingUser) {
      throw createHttpError(
        409,
        "Username already exists. Please choose another username."
      );
    }
    if (existingEmail) {
      throw createHttpError(
        409,
        "Email already exists. Please choose another email."
      );
    }
    const HashedPassword = await bcrypt.hash(passwordRaw, 10);
    const newUser = await UserModel.create({
      username,
      email,
      password: HashedPassword,
    });

    req.session.userId = newUser._id;
    res
      .status(200)
      .json({ message: "User created successfully.", data: newUser });
  } catch (err) {
    next(err);
  }
};

export const login: RequestHandler<
  unknown,
  unknown,
  Omit<SignupBody, "email">,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const passwordRaw = req.body.password;

  try {
    if (!username || !passwordRaw)
      throw createHttpError(400, "Parameters missing (username, password)");

    const existingUser = await UserModel.findOne({ username }).select(
      "+password +email"
    );

    if (!existingUser) {
      throw createHttpError(401, "Username does not exist.");
    }

    const passwordMatch = await bcrypt.compare(
      passwordRaw,
      existingUser.password
    );

    if (!passwordMatch) {
      throw createHttpError(401, "Invalid password.");
    }

    req.session.userId = existingUser._id;

    res
      .status(200)
      .json({
        message: "User logged in successfully.",
        data: { ...existingUser },
      });
  } catch (err) {
    next(err);
  }
};

export const logout: RequestHandler = async (req, res, next) => {
 req.session.destroy(error => {
  if (error) {
    next(error)
  }
  else {
    res.status(200).json({message: "User logged out successfully"})
  }
 })
};
