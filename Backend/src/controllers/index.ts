import { RequestHandler } from "express";
import NoteModel from "../models/schema";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getSingleNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.id;

  try {
    if (!mongoose.isValidObjectId(noteId))
      throw createHttpError(400, "Invalid note ID");
    const note = await NoteModel.findById(noteId);
    if (!note) throw createHttpError(400, "Note not found");

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface ICreateNoteBody {
  title?: string;
  text?: string;
}

export const createNotes: RequestHandler<
  unknown,
  unknown,
  ICreateNoteBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;
  try {
    if (!title) throw createHttpError(400, "Note must have a title");
    const newNote = await NoteModel.create({ title, text });

    res.status(200).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const updateNote: RequestHandler<
  { id: string },
  unknown,
  ICreateNoteBody,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.id;
  const title = req.body.title;
  const text = req.body.text;
  try {
    if (!mongoose.isValidObjectId(noteId))
      throw createHttpError(400, "Invalid note ID");

    if (!title) throw createHttpError(400, "Note must have a title");
    const note = await NoteModel.findById(noteId);

    if (!note) throw createHttpError(400, "Note not found");

    note.title = title;
    note.text = text;

    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.id;

  try {
    if (!mongoose.isValidObjectId(noteId))
      throw createHttpError(400, "Invalid note ID");

    const note = await NoteModel.findById(noteId);

    if (!note) throw createHttpError(400, "Note not found");

    await note.deleteOne();

    res.status(204).json({ message: "Note deleted successfully" });
  } catch (error) {
    next(error);
  }
};
