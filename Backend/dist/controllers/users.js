"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signup = exports.getAuthenticatedUser = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getAuthenticatedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authenticatedUserId = req.session.userId;
    try {
        if (!authenticatedUserId) {
            throw (0, http_errors_1.default)(401, "User not logged in");
        }
        const user = yield user_1.default.findById(authenticatedUserId).select("+email");
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getAuthenticatedUser = getAuthenticatedUser;
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;
    try {
        if (!username || !email || !passwordRaw)
            throw (0, http_errors_1.default)(400, "Parameters missing (email, username, password");
        const existingUser = yield user_1.default.findOne({ username });
        const existingEmail = yield user_1.default.findOne({ email });
        if (existingUser) {
            throw (0, http_errors_1.default)(409, "Username already exists. Please choose another username.");
        }
        if (existingEmail) {
            throw (0, http_errors_1.default)(409, "Email already exists. Please choose another email.");
        }
        const HashedPassword = yield bcrypt_1.default.hash(passwordRaw, 10);
        const newUser = yield user_1.default.create({
            username,
            email,
            password: HashedPassword,
        });
        req.session.userId = newUser._id;
        res
            .status(200)
            .json({ message: "User created successfully.", data: newUser });
    }
    catch (err) {
        next(err);
    }
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const passwordRaw = req.body.password;
    try {
        if (!username || !passwordRaw)
            throw (0, http_errors_1.default)(400, "Parameters missing (username, password)");
        const existingUser = yield user_1.default.findOne({ username }).select("+password +email");
        if (!existingUser) {
            throw (0, http_errors_1.default)(401, "Username does not exist.");
        }
        const passwordMatch = yield bcrypt_1.default.compare(passwordRaw, existingUser.password);
        if (!passwordMatch) {
            throw (0, http_errors_1.default)(401, "Invalid password.");
        }
        req.session.userId = existingUser._id;
        res
            .status(200)
            .json({
            message: "User logged in successfully.",
            data: Object.assign({}, existingUser),
        });
    }
    catch (err) {
        next(err);
    }
});
exports.login = login;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.session.destroy(error => {
        if (error) {
            next(error);
        }
        else {
            res.status(200).json({ message: "User logged out successfully" });
        }
    });
});
exports.logout = logout;
