import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import MealTracker from "./pages/MealTracker";
import FoodSearch from "./pages/FoodSearch";
import ProfileEdit from "./pages/ProfileEdit";
import DietPlanPage from "./pages/DietPlanPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/meal-tracker" element={<MealTracker />} />
        <Route path="/food-search" element={<FoodSearch />} />
        <Route path="/diet-plan" element={<DietPlanPage/>}/>
        <Route path="/profile-edit" element={<ProfileEdit />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;