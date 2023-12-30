import { createNotes, deleteNote, getNotes, getSingleNote, updateNote } from "../controllers";
import express from "express"

const router = express.Router();
// Route setup
router.get("/", getNotes);

router.get("/:id", getSingleNote);

router.post("/", createNotes);

router.patch("/:id", updateNote);

router.delete("/:id", deleteNote);


export default router;
