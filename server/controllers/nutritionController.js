const calculateNutrition = async (req, res) => {
  const { age, gender, height, weight, activityLevel,goal,} = req.body;

  let bmr;

  if (gender.toLowerCase() === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  let calories = bmr;

  switch (activityLevel.toLowerCase()) {
    case "low":
      calories *= 1.2;
      break;
    case "moderate":
      calories *= 1.55;
      break;
    case "high":
      calories *= 1.9;
      break;
    default:
      calories *= 1.2;
  }

  calories = Math.round(calories);
  if(goal=="lose"){
    calories-=500;
  }else if(goal=="gain"){
    calories+=300;
  }

  const protein = Math.round((calories * 0.20) / 4);
  const carbs = Math.round((calories * 0.50) / 4);
  const fat = Math.round((calories * 0.30) / 9);

  let breakfast, lunch, snacks, dinner;

if (goal === "lose") {
  breakfast = "Oats + Boiled Eggs";
  lunch = "Grilled Chicken + Salad";
  snacks = "Apple + Green Tea";
  dinner = "Vegetable Soup + Paneer";
} else if (goal === "gain") {
  breakfast = "Peanut Butter Sandwich + Milk";
  lunch = "Rice + Chicken + Dal";
  snacks = "Banana + Nuts";
  dinner = "Chapati + Paneer + Eggs";
} else {
  breakfast = "Oats + Milk + Banana";
  lunch = "Brown Rice + Dal + Vegetables";
  snacks = "Apple + Almonds";
  dinner = "Grilled Chicken + Salad";
}

res.json({
  calories,
  protein,
  carbs,
  fat,
  breakfast,
  lunch,
  snacks,
  dinner,
});
};
const getDietPlan = async (req, res) => {
  res.json({
    breakfast: "Oats + Milk + Banana",
    lunch: "Brown Rice + Dal + Vegetables",
    snacks: "Apple + Almonds",
    dinner: "Grilled Chicken + Salad",
  });
};

const calculateWaterIntake = async (req, res) => {
  const { weight } = req.body;

  const water = weight
    ? (weight * 0.035).toFixed(1)
    : 2.5;

  res.json({
    water: `${water} L`,
  });
};

const calculateBMI = async (req, res) => {
  const { height, weight } = req.body;

  const bmi = weight / ((height / 100) * (height / 100));

  let category = "";

  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal Weight";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";

  res.json({
    bmi: bmi.toFixed(1),
    category,
    calories: 2200,
  });
};

module.exports = {
  calculateNutrition,
  getDietPlan,
  calculateWaterIntake,
  calculateBMI,
};