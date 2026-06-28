const foods = {
  apple: { calories: 95, protein: "0.5 g", carbs: "25 g", fat: "0.3 g" },
  banana: { calories: 105, protein: "1.3 g", carbs: "27 g", fat: "0.3 g" },
  egg: { calories: 78, protein: "6 g", carbs: "0.6 g", fat: "5 g" },
  milk: { calories: 103, protein: "8 g", carbs: "12 g", fat: "2.4 g" },
  rice: { calories: 130, protein: "2.7 g", carbs: "28 g", fat: "0.3 g" },
  chicken: { calories: 165, protein: "31 g", carbs: "0 g", fat: "3.6 g" },
  fish: { calories: 206, protein: "22 g", carbs: "0 g", fat: "12 g" },
  bread: { calories: 79, protein: "4 g", carbs: "15 g", fat: "1 g" },
  paneer: { calories: 265, protein: "18 g", carbs: "2 g", fat: "20 g" },
  potato: { calories: 161, protein: "4 g", carbs: "37 g", fat: "0.2 g" },
  almonds: { calories: 164, protein: "6 g", carbs: "6 g", fat: "14 g" },
  oats: { calories: 150, protein: "5 g", carbs: "27 g", fat: "3 g" },
  orange: { calories: 62, protein: "1.2 g", carbs: "15 g", fat: "0.2 g" },
  mango: { calories: 99, protein: "1.4 g", carbs: "25 g", fat: "0.6 g" },
  grapes: { calories: 104, protein: "1 g", carbs: "27 g", fat: "0.2 g" },
  curd: { calories: 98, protein: "11 g", carbs: "3.4 g", fat: "4.3 g" },
  cheese: { calories: 113, protein: "7 g", carbs: "1 g", fat: "9 g" },
  peanuts: { calories: 161, protein: "7 g", carbs: "5 g", fat: "14 g" },
  dosa: { calories: 168, protein: "4 g", carbs: "30 g", fat: "3 g" },
  idli: { calories: 58, protein: "2 g", carbs: "12 g", fat: "0.4 g" }
};

const searchFood = async (req, res) => {
  const { food } = req.body;

  if (!food) {
    return res.status(400).json({
      message: "Food name is required",
    });
  }

  const result = foods[food.toLowerCase()];

  if (!result) {
    return res.status(404).json({
      message: "Food not found",
    });
  }

  res.json(result);
};

module.exports = { searchFood };