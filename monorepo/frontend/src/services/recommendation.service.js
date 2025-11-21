// getRecommendations.js

const getRecommendations = (
  formData = {
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: 'MultipleProducts',
  },
  products = []
) => {
  const {
    selectedPreferences = [],
    selectedFeatures = [],
    selectedRecommendationType = 'MultipleProducts',
  } = formData || {};

  const countMatches = (sourceList = [], comparisonList = []) => {
    if (!sourceList.length || !comparisonList.length) return 0;
    const comparisonSet = new Set(comparisonList);
    return sourceList.reduce(
      (total, currentItem) => total + (comparisonSet.has(currentItem) ? 1 : 0),
      0
    );
  };

  const scoredProducts = (products || []).map((product) => {
    const score =
      countMatches(product.preferences, selectedPreferences) +
      countMatches(product.features, selectedFeatures);
    return { product, score };
  });

  const matchedScoredProducts = scoredProducts.filter(
    (scored) => scored.score > 0
  );

  if (selectedRecommendationType === 'SingleProduct') {
    let highestScoringProduct = null;
    let highestScore = 0;
    for (const scoredProduct of matchedScoredProducts) {
      if (scoredProduct.score >= highestScore) {
        highestScoringProduct = scoredProduct.product;
        highestScore = scoredProduct.score;
      }
    }
    return highestScoringProduct ? [highestScoringProduct] : [];
  }

  return matchedScoredProducts
    .sort(
      (scoredProductA, scoredProductB) =>
        scoredProductB.score - scoredProductA.score
    )
    .map((scoredProduct) => scoredProduct.product);
};

const recommendationService = { getRecommendations };
export default recommendationService;
