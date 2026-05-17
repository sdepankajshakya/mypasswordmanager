import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { 
      type: String, 
      required: true
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    referenceId: { type: mongoose.Schema.Types.ObjectId }
}, { timestamps: true });

const Record = mongoose.model("Record", recordSchema);

export default Record;