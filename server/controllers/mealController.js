const Meal = require("../models/Meal");

// Add Meal
const addMeal = async (req, res) => {
  try {
    const { mealType, food, calories, protein, carbs, fat } = req.body;

    if (!mealType || !food) {
      return res.status(400).json({
        message: "Meal type and food are required",
      });
    }

    const meal = await Meal.create({
      user: req.user.id,
      mealType,
      food,
      calories: Number(calories) || 0,
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
    });

    res.status(201).json({
      message: "Meal added successfully",
      meal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to add meal",
    });
  }
};

// Get Meals
const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json(meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch meals",
    });
  }
};

// Delete Meal
const deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);

    if (!meal) {
      return res.status(404).json({
        message: "Meal not found",
      });
    }

    if (meal.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await Meal.findByIdAndDelete(req.params.id);

    res.json({
      message: "Meal deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete meal",
    });
  }
};

// Today's Summary
const getSummary = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const meals = await Meal.find({
      user: req.user.id,
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    const summary = meals.reduce(
      (acc, meal) => {
        acc.calories += Number(meal.calories || 0);
        acc.protein += Number(meal.protein || 0);
        acc.carbs += Number(meal.carbs || 0);
        acc.fat += Number(meal.fat || 0);
        return acc;
      },
      {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      }
    );

    res.json({
      calories: Number(summary.calories.toFixed(1)),
      protein: Number(summary.protein.toFixed(1)),
      carbs: Number(summary.carbs.toFixed(1)),
      fat: Number(summary.fat.toFixed(1)),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to load today's summary",
    });
  }
};

// Weekly Summary
const getWeeklySummary = async (req, res) => {
  try {
    const meals = await Meal.find({
      user: req.user.id,
    });

    const today = new Date();

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
          week[weekday] += Number(meal.calories || 0);
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
    console.error(error);
    res.status(500).json({
      message: "Failed to load weekly summary",
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