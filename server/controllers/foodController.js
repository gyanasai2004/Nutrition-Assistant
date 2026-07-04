const axios = require("axios");

const EXCLUDED_KEYWORDS = [
  "seasoning",
  "supplement",
  "baby food",
  "formula",
  "vitamin",
  "powder",
  "extract",
  "capsule",
  "tablet",
  "drink mix",
  "protein shake",
  "medical food",
];

const searchFood = async (req, res) => {
  try {
    const { food } = req.body;

    if (!food || !food.trim()) {
      return res.status(400).json({
        message: "Food name is required",
      });
    }

    const response = await axios.get(
      "https://api.nal.usda.gov/fdc/v1/foods/search",
      {
        params: {
          api_key: process.env.USDA_API_KEY,
          query: food.trim(),
          pageSize: 30,
        },
      }
    );

    if (!response.data.foods || response.data.foods.length === 0) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    // Remove unwanted food items
    const filteredFoods = response.data.foods.filter((item) => {
      const name = (item.description || "").toLowerCase();

      return !EXCLUDED_KEYWORDS.some((keyword) =>
        name.includes(keyword)
      );
    });

    // Sort better matches first
    filteredFoods.sort((a, b) => {
      const query = food.toLowerCase();

      const aExact = a.description.toLowerCase().startsWith(query);
      const bExact = b.description.toLowerCase().startsWith(query);

      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;

      return 0;
    });

    const foods = filteredFoods.slice(0, 10).map((item) => {
      let calories = 0;
      let protein = 0;
      let carbs = 0;
      let fat = 0;
      let fiber = 0;
      let sugar = 0;
      let sodium = 0;

      item.foodNutrients.forEach((nutrient) => {
        switch (nutrient.nutrientName) {
          case "Energy":
            calories = nutrient.value || 0;
            break;

          case "Protein":
            protein = nutrient.value || 0;
            break;

          case "Carbohydrate, by difference":
            carbs = nutrient.value || 0;
            break;

          case "Total lipid (fat)":
            fat = nutrient.value || 0;
            break;

          case "Fiber, total dietary":
            fiber = nutrient.value || 0;
            break;

          case "Sugars, total including NLEA":
            sugar = nutrient.value || 0;
            break;

          case "Sodium, Na":
            sodium = nutrient.value || 0;
            break;

          default:
            break;
        }
      });

      return {
        foodId: item.fdcId,
        name: item.description,
        category: item.foodCategory || "General",

        caloriesPer100g: Number(calories.toFixed(2)),
        proteinPer100g: Number(protein.toFixed(2)),
        carbsPer100g: Number(carbs.toFixed(2)),
        fatPer100g: Number(fat.toFixed(2)),
        fiberPer100g: Number(fiber.toFixed(2)),
        sugarPer100g: Number(sugar.toFixed(2)),
        sodiumPer100g: Number(sodium.toFixed(2)),

        image: "",
      };
    });

    res.json(foods);
  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      message: "Food search failed",
    });
  }
};

module.exports = {
  searchFood,
};