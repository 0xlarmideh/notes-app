"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notes_1 = require("../controllers/notes");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Route setup
router.get("/", notes_1.getNotes);
router.get("/:id", notes_1.getSingleNote);
router.post("/", notes_1.createNotes);
router.patch("/:id", notes_1.updateNote);
router.delete("/:id", notes_1.deleteNote);
exports.default = router;
