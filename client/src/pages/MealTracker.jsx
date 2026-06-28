import { useEffect, useState } from "react";
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

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const loadMeals = async () => {
    try {
      const mealRes = await API.get("/meals", { headers });
      setMeals(mealRes.data);

      const summaryRes = await API.get("/summary", { headers });
      setSummary(summaryRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadMeals();
  }, []);

  const addMeal = async () => {
    if (!food) {
      alert("Enter food name");
      return;
    }

    try {
      const foodRes = await API.post("/food", { food });

      await API.post(
        "/meal",
        {
          mealType,
          food,
          calories: foodRes.data.calories,
          protein: foodRes.data.protein,
          carbs: foodRes.data.carbs,
          fat: foodRes.data.fat,
        },
        { headers }
      );

      alert("Meal Added");
      setFood("");
      loadMeals();
    } catch (err) {
      alert("Food not found");
    }
  };

  const deleteMeal = async (id) => {
    try {
      await API.delete(`/meal/${id}`, { headers });
      alert("Meal Deleted");
      loadMeals();
    } catch {
      alert("Failed to delete meal");
    }
  };

  return (
    <MainLayout>

      <h2 className="fw-bold mb-4">
        🍽 Meal Tracker
      </h2>

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
              <option>Snacks</option>
              <option>Dinner</option>
            </select>
          </div>

          <div className="col-md-5">
            <input
              className="form-control"
              placeholder="Food Name"
              value={food}
              onChange={(e) => setFood(e.target.value)}
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

          <div className="card p-4 shadow-sm">

            <h4>Today's Summary</h4>

            <hr />

            <p>🔥 Calories : {summary.calories}</p>
            <p>🥩 Protein : {summary.protein}</p>
            <p>🍚 Carbs : {summary.carbs}</p>
            <p>🧈 Fat : {summary.fat}</p>

          </div>

        </div>

        <div className="col-lg-8">

          <div className="card p-4 shadow-sm">

            <h4>Today's Meals</h4>

            <hr />

            {meals.length === 0 ? (
              <p>No meals added.</p>
            ) : (
              meals.map((meal) => (
                <div
                  key={meal._id}
                  className="border rounded p-3 mb-3"
                >
                  <h5>{meal.mealType}</h5>

                  <p>{meal.food}</p>

                  <p>
                    🔥 {meal.calories} kcal
                  </p>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteMeal(meal._id)}
                  >
                    Delete
                  </button>

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