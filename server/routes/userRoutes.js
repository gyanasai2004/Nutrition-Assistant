const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");

const {
  calculateNutrition,
  getDietPlan,
  calculateWaterIntake,
  calculateBMI,
} = require("../controllers/nutritionController");

const { searchFood } = require("../controllers/foodController");

const {
  addMeal,
  getMeals,
  deleteMeal,
  getSummary,
  getWeeklySummary,
} = require("../controllers/mealController");

// Authentication
router.post("/register", registerUser);
router.post("/login", loginUser);

// User
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

// Nutrition
router.post("/nutrition", protect, calculateNutrition);
router.get("/diet", protect, getDietPlan);
router.post("/water", protect, calculateWaterIntake);
router.post("/bmi", protect, calculateBMI);

// Food
router.post("/food", searchFood);

// Meal Tracker
router.post("/meal", protect, addMeal);
router.get("/meals", protect, getMeals);
router.delete("/meal/:id", protect, deleteMeal);

// Summary
router.get("/summary", protect, getSummary);
router.get("/weekly-summary",protect,getWeeklySummary);

module.exports = router;