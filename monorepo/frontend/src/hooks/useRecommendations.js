// useRecommendations.js

import { useState } from 'react';
import recommendationService from '../services/recommendation.service';

function useRecommendations(products) {
  const [recommendations, setRecommendations] = useState([]);

  const getRecommendations = (formData) => {
    const recommendationsResult = recommendationService.getRecommendations(
      formData,
      products
    );
    setRecommendations(recommendationsResult);
    return recommendationsResult;
  };

  return { recommendations, getRecommendations, setRecommendations };
}

export default useRecommendations;
