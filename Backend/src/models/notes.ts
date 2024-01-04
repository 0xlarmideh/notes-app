import { InferSchemaType, Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
  },
  { timestamps: true }
);

export type INote = InferSchemaType<typeof noteSchema>;

export default model<INote>("Note", noteSchema);
