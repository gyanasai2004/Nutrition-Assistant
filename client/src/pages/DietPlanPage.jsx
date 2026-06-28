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
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <MainLayout>
      <DietPlan nutrition={nutrition} />
    </MainLayout>
  );
}

export default DietPlanPage;