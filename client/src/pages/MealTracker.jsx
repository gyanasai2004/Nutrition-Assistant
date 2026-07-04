import { useEffect, useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";

function MealTracker() {
  const [mealType, setMealType] = useState("Breakfast");
  const [food, setFood] = useState("");
  const [meals, setMeals] = useState([]);
  const [summary, setSummary] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  const token = localStorage.getItem("token");

  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${token}`,
    }),
    [token]
  );

  const loadMeals = useCallback(async () => {
    try {
      const mealRes = await API.get("/meals", { headers });
      setMeals(mealRes.data);

      const summaryRes = await API.get("/summary", { headers });
      setSummary(summaryRes.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load meals");
    }
  }, [headers]);

  useEffect(() => {
    loadMeals();
  }, [loadMeals]);

  const addMeal = async () => {
    if (!food.trim()) {
      toast.warning("Please enter a food name");
      return;
    }

    try {
      const foodRes = await API.post("/food", { food });

      // Backend now returns an array
      const selectedFood = Array.isArray(foodRes.data)
        ? foodRes.data[0]
        : foodRes.data;

      if (!selectedFood) {
        toast.error("Food not found");
        return;
      }

      await API.post(
        "/meal",
        {
          mealType,
          food: selectedFood.name || food,
          calories:
            selectedFood.caloriesPer100g || selectedFood.calories || 0,
          protein:
            selectedFood.proteinPer100g || selectedFood.protein || 0,
          carbs:
            selectedFood.carbsPer100g || selectedFood.carbs || 0,
          fat:
            selectedFood.fatPer100g || selectedFood.fat || 0,
        },
        { headers }
      );

      toast.success("Meal added successfully");

      setFood("");

      loadMeals();
    } catch (err) {
      console.log(err);
      toast.error("Food not found");
    }
  };

  const deleteMeal = async (id) => {
    try {
      await API.delete(`/meal/${id}`, { headers });

      toast.success("Meal deleted successfully");

      loadMeals();
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete meal");
    }
  };

  return (
    <MainLayout>
      <h2 className="fw-bold mb-4">🍽 Meal Tracker</h2>

      <div className="card p-4 shadow-sm border-0">
        <div className="row g-3">

          <div className="col-md-4">
            <select
              className="form-select"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
            >
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Snack</option>
              <option>Dinner</option>
            </select>
          </div>

          <div className="col-md-5">
            <input
              className="form-control"
              placeholder="Enter food name"
              value={food}
              onChange={(e) => setFood(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addMeal();
              }}
            />
          </div>

          <div className="col-md-3">
            <button
              className="btn btn-success w-100"
              onClick={addMeal}
            >
              Add Meal
            </button>
          </div>

        </div>
      </div>

      <div className="row mt-4">

        <div className="col-lg-4">
          <div className="card p-4 shadow-sm border-0">
            <h4>Today's Summary</h4>

            <hr />

            <p>🔥 Calories : {summary.calories}</p>
            <p>🥩 Protein : {summary.protein} g</p>
            <p>🍚 Carbs : {summary.carbs} g</p>
            <p>🧈 Fat : {summary.fat} g</p>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card p-4 shadow-sm border-0">
            <h4>Today's Meals</h4>

            <hr />

            {meals.length === 0 ? (
              <p className="text-muted">No meals added today.</p>
            ) : (
              meals.map((meal) => (
                <div
                  key={meal._id}
                  className="border rounded p-3 mb-3 shadow-sm"
                >
                  <div className="d-flex justify-content-between align-items-center">

                    <div>
                      <h5>{meal.mealType}</h5>

                      <h6>{meal.food}</h6>

                      <p className="mb-1">
                        🔥 {meal.calories} kcal
                      </p>

                      <small className="text-muted">
                        🥩 {meal.protein} g |
                        🍚 {meal.carbs} g |
                        🧈 {meal.fat} g
                      </small>
                    </div>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteMeal(meal._id)}
                    >
                      Delete
                    </button>

                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </MainLayout>
  );
}

export default MealTracker;