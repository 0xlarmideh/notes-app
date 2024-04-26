"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const validateEnv_1 = __importDefault(require("./util/validateEnv"));
const app_1 = __importDefault(require("./app"));
const PORT = validateEnv_1.default.PORT;
const DB_URL = validateEnv_1.default.DB_URL;
mongoose_1.default
    .connect(DB_URL)
    .then(() => {
    console.log("DB connect3d");
    app_1.default.listen(PORT, () => {
        console.log("Server running on " + PORT);
    });
})
    .catch(console.error);
