const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    mealType: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner", "Snack"],
      required: true,
    },

    food: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      default: "General",
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
    },

    unit: {
      type: String,
      default: "g",
    },

    weight: {
      type: Number,
      default: 100,
    },

    calories: {
      type: Number,
      required: true,
    },

    protein: {
      type: Number,
      default: 0,
    },

    carbs: {
      type: Number,
      default: 0,
    },

    fat: {
      type: Number,
      default: 0,
    },

    fiber: {
      type: Number,
      default: 0,
    },

    sugar: {
      type: Number,
      default: 0,
    },

    sodium: {
      type: Number,
      default: 0,
    },

    image: {
      type: String,
      default: "",
    },

    foodId: {
      type: String,
      default: "",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Meal", mealSchema);