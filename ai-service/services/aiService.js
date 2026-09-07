const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function generateListing(hindiText) {

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",

        contents: `
You are an AI assistant for HunarSetu, an Indian artisan marketplace.

The artisan will describe their handmade product in Hindi.

Your task is to create TWO complete product listings from the same information:

1. English product listing
2. Hindi product listing

IMPORTANT RULES:

- Understand the Hindi description accurately.
- Do not invent any facts.
- Both English and Hindi versions must contain the SAME information.
- The Hindi version must be written naturally in Hindi.
- The English version must be written professionally in English.
- Do not add information that is not present in the original Hindi description.
- Extract materials only if they are mentioned.
- Extract production time only if it is mentioned.
- Create useful tags based only on the information provided.
- If information is missing, return an empty string or empty array.
- The Hindi and English versions must represent the same product.

The required fields for BOTH languages are:

- Product Name
- Description
- Category
- Materials
- Production Time
- Tags

Hindi description provided by the artisan:

${hindiText}
`,

        config: {
            responseMimeType: "application/json",

            responseSchema: {
                type: "object",

                properties: {

                    english: {
                        type: "object",

                        properties: {

                            productName: {
                                type: "string"
                            },

                            description: {
                                type: "string"
                            },

                            category: {
                                type: "string"
                            },

                            materials: {
                                type: "array",
                                items: {
                                    type: "string"
                                }
                            },

                            productionTime: {
                                type: "string"
                            },

                            tags: {
                                type: "array",
                                items: {
                                    type: "string"
                                }
                            }
                        },

                        required: [
                            "productName",
                            "description",
                            "category",
                            "materials",
                            "productionTime",
                            "tags"
                        ]
                    },

                    hindi: {
                        type: "object",

                        properties: {

                            productName: {
                                type: "string"
                            },

                            description: {
                                type: "string"
                            },

                            category: {
                                type: "string"
                            },

                            materials: {
                                type: "array",
                                items: {
                                    type: "string"
                                }
                            },

                            productionTime: {
                                type: "string"
                            },

                            tags: {
                                type: "array",
                                items: {
                                    type: "string"
                                }
                            }
                        },

                        required: [
                            "productName",
                            "description",
                            "category",
                            "materials",
                            "productionTime",
                            "tags"
                        ]
                    }
                },

                required: [
                    "english",
                    "hindi"
                ]
            }
        }
    });

    return JSON.parse(response.text);
}

module.exports = {
    generateListing
};