import { useEffect, useState } from "react";
import API from "../services/api";

import MainLayout from "../layouts/MainLayout";
import ProfileCard from "../components/ProfileCard";
import StatsCards from "../components/StatsCards";
import DietPlan from "../components/DietPlan";
import CaloriesChart from "../charts/CaloriesChart";
import ProgressCards from "../components/ProgressCards";
import WeeklyChart from "../charts/WeeklyChart";
import ReportButton from "../components/ReportButton";
import Loader from "../components/Loader";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [bmi, setBMI] = useState(null);
  const [water, setWater] = useState("");
  const [nutrition, setNutrition] = useState(null);

  const [summary, setSummary] = useState({
    calories: 0,
  });

  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Profile
      const profileRes = await API.get("/profile", { headers });
      setUser(profileRes.data);

      // BMI
      const bmiRes = await API.post(
        "/bmi",
        {
          height: profileRes.data.height,
          weight: profileRes.data.weight,
        },
        { headers }
      );
      setBMI(bmiRes.data);

      // Water
      const waterRes = await API.post(
        "/water",
        {
          weight: profileRes.data.weight,
        },
        { headers }
      );
      setWater(waterRes.data.water);

      // Nutrition
      const nutritionRes = await API.post(
        "/nutrition",
        {
          age: profileRes.data.age,
          gender: profileRes.data.gender,
          height: profileRes.data.height,
          weight: profileRes.data.weight,
          activityLevel: profileRes.data.activityLevel,
          goal:profileRes.data.goal,
        },
        { headers }
      );
      setNutrition(nutritionRes.data);

      // Today's Summary
      const summaryRes = await API.get("/summary", {
        headers,
      });
      setSummary(summaryRes.data);

      // Weekly Summary
      const weeklyRes = await API.get("/weekly-summary", {
        headers,
      });
      setWeeklyData(weeklyRes.data);

    } catch (err) {
  console.error("Dashboard Error:", err);

  // If the user is not logged in, send them back to login
  if (err.response?.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("googleUser");
    window.location.href = "/login";
  }
}
  };

  if (!user || !bmi || !nutrition) {
    return (
      <h2 className="text-center mt-5">
  <Loader text="Loading Dashboard..." />

      </h2>
    );
  }

  return (
    <MainLayout>

      {/* Welcome Card */}
      {/* Welcome Card */}
{(() => {
  const googleUser = JSON.parse(localStorage.getItem("googleUser"));

  const profile =
    googleUser?.photo ||
    "https://ui-avatars.com/api/?name=" +
      encodeURIComponent(googleUser?.name || user.name);

  return (
    <div
      className="mb-4"
      style={{
        background: "linear-gradient(135deg,#16a34a,#22c55e,#4ade80)",
        color: "white",
        borderRadius: "25px",
        padding: "35px",
        boxShadow: "0 15px 35px rgba(34,197,94,.35)",
      }}
    >
      <div className="d-flex justify-content-between align-items-center flex-wrap">

        {/* Left Side */}
        <div className="d-flex align-items-center">
          <img
            src={profile}
            alt="Profile"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.target.src =
                "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(googleUser?.name || user.name);
            }}
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "5px solid white",
              marginRight: "25px",
              boxShadow: "0 8px 20px rgba(0,0,0,.2)",
            }}
          />

          <div>
            <h1
              style={{
                margin: 0,
                fontWeight: "700",
              }}
            >
              👋 Welcome Back,
            </h1>

            <h2
              style={{
                marginTop: "10px",
                marginBottom: "8px",
                fontWeight: "700",
              }}
            >
              {googleUser?.name || user.name}
            </h2>

            <p
              style={{
                marginBottom: "15px",
                opacity: ".95",
                fontSize: "17px",
              }}
            >
              {googleUser?.email || user.email}
            </p>

            <p
              style={{
                fontSize: "18px",
                margin: 0,
              }}
            >
              Stay healthy. Eat smart. Track your nutrition every day.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="mt-3">
          <ReportButton
            user={user}
            bmi={bmi}
            nutrition={nutrition}
            water={water}
            summary={summary}
          />
        </div>

      </div>
    </div>
  );
})()}

      {/* Profile */}
      <ProfileCard user={user} />

      {/* Stats */}
      <StatsCards
        bmi={bmi}
        nutrition={nutrition}
        water={water}
      />

      {/* Daily Progress */}
      <ProgressCards
        nutrition={nutrition}
        summary={summary}
      />

      {/* Calories Chart */}
      <div className="my-4">
        <CaloriesChart
          consumed={summary.calories}
          goal={nutrition.calories}
        />
      </div>

      {/* Weekly Chart */}
      <div className="my-4">
        <WeeklyChart weeklyData={weeklyData} />
      </div>

      {/* Diet Plan */}
      <DietPlan nutrition={nutrition} />

    </MainLayout>
  );
}

export default Dashboard;