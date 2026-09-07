const express = require("express");
const { generateListing } = require("../services/aiService");

const router = express.Router();

router.post("/generate-listing", async (req, res) => {

    try {

        const { hindiText } = req.body;

        if (!hindiText || !hindiText.trim()) {
            return res.status(400).json({
                error: "Hindi text is required"
            });
        }

        const listing = await generateListing(hindiText);

        res.json(listing);

    } catch (error) {

        console.error("Gemini Error:", error);

        res.status(500).json({
            error: "Failed to generate listing"
        });
    }
});

module.exports = router;