const axios = require('axios');

async function getIngredientsCalories(ingredients) {
    const API_URL = 'https://api.nal.usda.gov/fdc/v1/foods';

    let totalCalories = 0;

    for (let ingredient of ingredients) {
        const response = await axios.get(`${API_URL}/search?api_key=DEMO_KEY&query=${JSON.stringify(ingredient.name)}`);
        const item = response.data.foods.length > 0 ? response.data.foods[0] : null;
        if (item) {
            let energyObj = item.foodNutrients.filter((nutrient) => nutrient.nutrientId === 1008)[0];
            totalCalories += energyObj.value * ingredient.servings;
        }
    }
    return Math.round(totalCalories);
}

exports.getIngredientsCalories = getIngredientsCalories;