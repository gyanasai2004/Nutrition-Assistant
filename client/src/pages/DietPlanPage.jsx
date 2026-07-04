import { useEffect, useState } from "react";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";
import DietPlan from "../components/DietPlan";

function DietPlanPage() {
  const [nutrition, setNutrition] = useState(null);

  useEffect(() => {
    loadDietPlan();
  }, []);

  const loadDietPlan = async () => {
    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const profileRes = await API.get("/profile", { headers });

      const nutritionRes = await API.post(
        "/nutrition",
        {
          age: profileRes.data.age,
          gender: profileRes.data.gender,
          height: profileRes.data.height,
          weight: profileRes.data.weight,
          activityLevel: profileRes.data.activityLevel,
          goal: profileRes.data.goal,
        },
        { headers }
      );

      setNutrition(nutritionRes.data);
    } catch (err) {
      console.log(err);
    }
  };

 if (!nutrition) {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
      }}
    >
      <div
        className="spinner-border text-success"
        role="status"
        style={{
          width: "4rem",
          height: "4rem",
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>

      <h2 className="mt-4 fw-bold text-success">
        🥗 Nutrition Assistant
      </h2>

      <p className="text-muted">
        Preparing your personalized diet plan...
      </p>
    </div>
  );
}

  return (
    <MainLayout>
      <DietPlan nutrition={nutrition} />
    </MainLayout>
  );
}

export default DietPlanPage;