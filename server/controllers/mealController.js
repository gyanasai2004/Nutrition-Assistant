const Meal = require("../models/Meal");

const addMeal = async (req, res) => {
  try {
    const { mealType, food, calories, protein, carbs, fat } = req.body;

    const meal = await Meal.create({
      user: req.user.id,
      mealType,
      food,
      calories,
      protein,
      carbs,
      fat,
    });

    res.status(201).json(meal);
  } catch (error) {
    res.status(500).json({ message: "Failed to add meal" });
  }
};

const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch meals" });
  }
};

const deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);

    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    if (meal.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Meal.findByIdAndDelete(req.params.id);

    res.json({ message: "Meal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete meal" });
  }
};

const getSummary = async (req, res) => {
  try {
    // Start of today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // End of today
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const meals = await Meal.find({
      user: req.user.id,
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    meals.forEach((meal) => {
      calories += Number(meal.calories);
      protein += Number(meal.protein);
      carbs += Number(meal.carbs);
      fat += Number(meal.fat);
    });

    res.json({
      calories,
      protein: protein.toFixed(1),
      carbs: carbs.toFixed(1),
      fat: fat.toFixed(1),
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load today's summary",
    });
  }
};
const getWeeklySummary = async (req, res) => {
  try {
    const meals = await Meal.find({ user: req.user.id });

    const today = new Date();

    // Start of current week (Monday)
    const firstDay = new Date(today);
    const day = today.getDay();
    const diff = day === 0 ? -6 : 1 - day;

    firstDay.setDate(today.getDate() + diff);
    firstDay.setHours(0, 0, 0, 0);

    const week = {
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
      Sun: 0,
    };

    meals.forEach((meal) => {
      const mealDate = new Date(meal.createdAt);

      if (mealDate >= firstDay) {
        const weekday = mealDate.toLocaleDateString("en-US", {
          weekday: "short",
        });

        if (week[weekday] !== undefined) {
          week[weekday] += Number(meal.calories);
        }
      }
    });

    res.json([
      { day: "Mon", calories: week.Mon },
      { day: "Tue", calories: week.Tue },
      { day: "Wed", calories: week.Wed },
      { day: "Thu", calories: week.Thu },
      { day: "Fri", calories: week.Fri },
      { day: "Sat", calories: week.Sat },
      { day: "Sun", calories: week.Sun },
    ]);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  addMeal,
  getMeals,
  deleteMeal,
  getSummary,
  getWeeklySummary,
};