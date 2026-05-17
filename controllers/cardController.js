import Card from "../models/card.js";
import Record from "../models/record.js";
import { encrypt } from "../utils/encryption.js";

export const createCardRecord = async (req, res) => {
    try {
        const { title, categoryId, cardDetails } = req.body;

        if (!title || !categoryId || !cardDetails) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Encrypt sensitive fields
        const encryptedCardNumber = encrypt(cardDetails.cardNumber);
        const encryptedCvv = encrypt(cardDetails.cvv);
        const encryptedExpiryDate = encrypt(cardDetails.expiryDate);
        const encryptedPin = encrypt(cardDetails.pin);

        // Create Card
        const newCard = new Card({
            cardHolderName: cardDetails.cardHolderName,
            cardNumber: encryptedCardNumber,
            expiryDate: encryptedExpiryDate,
            cvv: encryptedCvv,
            pin: encryptedPin
        });

        const savedCard = await newCard.save();

        // Create Record linked to Card
        const newRecord = new Record({
            title: title,
            category: categoryId,
            dataId: savedCard._id,      // links to Card
            dataModel: "Card"
        });

        await newRecord.save();

        return res.status(201).json({ message: "Card saved successfully.", recordId: newRecord._id });
    } catch (error) {
        console.error("Error saving card:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};