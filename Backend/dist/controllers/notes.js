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
exports.deleteNote = exports.updateNote = exports.createNotes = exports.getSingleNote = exports.getNotes = void 0;
const notes_1 = __importDefault(require("../models/notes"));
const http_errors_1 = __importDefault(require("http-errors"));
const mongoose_1 = __importDefault(require("mongoose"));
const getNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield notes_1.default.find().exec();
        res
            .status(200)
            .json({ message: "Notes fetched successfully", data: notes });
    }
    catch (error) {
        next(error);
    }
});
exports.getNotes = getNotes;
const getSingleNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = req.params.id;
    try {
        if (!mongoose_1.default.isValidObjectId(noteId))
            throw (0, http_errors_1.default)(400, "Invalid note ID");
        const note = yield notes_1.default.findById(noteId);
        if (!note)
            throw (0, http_errors_1.default)(400, "Note not found");
        res.status(200).json(note);
    }
    catch (error) {
        next(error);
    }
});
exports.getSingleNote = getSingleNote;
const createNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const text = req.body.text;
    try {
        if (!title)
            throw (0, http_errors_1.default)(400, "Note must have a title");
        const newNote = yield notes_1.default.create({ title, text });
        res.status(200).json(newNote);
    }
    catch (error) {
        next(error);
    }
});
exports.createNotes = createNotes;
const updateNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = req.params.id;
    const title = req.body.title;
    const text = req.body.text;
    try {
        if (!mongoose_1.default.isValidObjectId(noteId))
            throw (0, http_errors_1.default)(400, "Invalid note ID");
        if (!title)
            throw (0, http_errors_1.default)(400, "Note must have a title");
        const note = yield notes_1.default.findById(noteId);
        if (!note)
            throw (0, http_errors_1.default)(400, "Note not found");
        note.title = title;
        note.text = text;
        const updatedNote = yield note.save();
        res.status(200).json(updatedNote);
    }
    catch (error) {
        next(error);
    }
});
exports.updateNote = updateNote;
const deleteNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = req.params.id;
    try {
        if (!mongoose_1.default.isValidObjectId(noteId))
            throw (0, http_errors_1.default)(400, "Invalid note ID");
        const note = yield notes_1.default.findById(noteId);
        if (!note)
            throw (0, http_errors_1.default)(400, "Note not found");
        yield note.deleteOne();
        res.status(204).json({ message: "Note deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteNote = deleteNote;
