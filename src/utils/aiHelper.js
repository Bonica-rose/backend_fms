const formatSentiment = (result) => {
    return {
        sentiment: result.label,
        confidence: Number(result.score.toFixed(4))
    };
};

module.exports = {
    formatSentiment
};