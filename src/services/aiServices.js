const { HfInference } = require("@huggingface/inference");

const hf = new HfInference(process.env.HF_TOKEN);

const analyzeSentiment = async (text) => {
    try {
        const result = await hf.textClassification({
            model: "distilbert-base-uncased-finetuned-sst-2-english",
            inputs: text,
        });

        return result[0];
    } catch (error) {
        console.error("AI Service Error:", error.message);

        throw error;
    }
};

module.exports = {
    analyzeSentiment,
};