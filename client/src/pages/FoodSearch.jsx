import { useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";

function FoodSearch() {
  const [food, setFood] = useState("");
  const [result, setResult] = useState(null);

  const searchFood = async () => {
    if (!food.trim()) {
      toast.warning("Please enter a food name");
      return;
    }

    try {
      const res = await API.post("/food", {
        food,
      });

      setResult(res.data);
      toast.success("Food found successfully");
    } catch (err) {
      toast.error("Food not found");
      setResult(null);
    }
  };

  return (
    <MainLayout>
      <h2 className="fw-bold mb-4">
        🔍 Food Nutrition Search
      </h2>

      <div className="card shadow-sm border-0 p-4">

        <div className="row g-3">

          <div className="col-md-9">
            <input
              type="text"
              className="form-control"
              placeholder="Enter food name (Example: apple)"
              value={food}
              onChange={(e) => setFood(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchFood();
                }
              }}
            />
          </div>

          <div className="col-md-3">
            <button
              className="btn btn-success w-100"
              onClick={searchFood}
            >
              Search
            </button>
          </div>

        </div>

        {result && (
          <div className="mt-4">

            <div className="row g-3">

              <div className="col-md-3">
                <div className="card text-center border-0 bg-light p-3 shadow-sm">
                  <h5>🔥 Calories</h5>
                  <h3>{result.calories}</h3>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card text-center border-0 bg-light p-3 shadow-sm">
                  <h5>🥩 Protein</h5>
                  <h3>{result.protein}</h3>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card text-center border-0 bg-light p-3 shadow-sm">
                  <h5>🍚 Carbs</h5>
                  <h3>{result.carbs}</h3>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card text-center border-0 bg-light p-3 shadow-sm">
                  <h5>🧈 Fat</h5>
                  <h3>{result.fat}</h3>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </MainLayout>
  );
}

export default FoodSearch;