import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function ProfileEdit() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    activityLevel: "",
  });

  const token = localStorage.getItem("token");

  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${token}`,
    }),
    [token]
  );

  const loadProfile = useCallback(async () => {
    try {
      const res = await API.get("/profile", { headers });

      setForm({
        name: res.data.name || "",
        age: res.data.age || "",
        height: res.data.height || "",
        weight: res.data.weight || "",
        activityLevel: res.data.activityLevel || "",
      });
    } catch (err) {
      console.error(err);
    }
  }, [headers]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async () => {
    try {
      await API.put("/profile", form, { headers });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="text-success mb-4">✏ Edit Profile</h2>

        <input
          className="form-control mb-3"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          type="number"
          name="height"
          placeholder="Height (cm)"
          value={form.height}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={form.weight}
          onChange={handleChange}
        />

        <select
          className="form-select mb-3"
          name="activityLevel"
          value={form.activityLevel}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>

        <button
          className="btn btn-success"
          onClick={updateProfile}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}

export default ProfileEdit;