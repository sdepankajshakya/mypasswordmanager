import express from "express";
import { createCardRecord } from "../controllers/cardController.js";

const router = express.Router();

router.post("/", createCardRecord);

export default router;