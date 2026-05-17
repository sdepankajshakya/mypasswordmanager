import mongoose from "mongoose";
import { decrypt } from "../utils/encryption.js";

const cardSchema = new mongoose.Schema({
    recordId: { type: mongoose.Schema.Types.ObjectId, ref: "Record", required: true },
    encryptedCardHolderName: { type: String, required: true },
    encryptedCardNumber: { type: String, required: true },
    encryptedExpiryDate: { type: String, required: true },
    encryptedCVV: { type: String, required: true },
    encryptedPin: { type: String, required: true },
}, { timestamps: true });

// Instance method to decrypt
cardSchema.methods.decryptCardDetails = function () {
    return {
        cardHolderName: decrypt(this.encryptedCardHolderName),
        cardNumber: decrypt(this.encryptedCardNumber),
        expiryDate: decrypt(this.encryptedExpiryDate),
        cvv: decrypt(this.encryptedCVV),
        pin: decrypt(this.encryptedPin),
    };
};

const Card = mongoose.model("Card", cardSchema);

export default Card;