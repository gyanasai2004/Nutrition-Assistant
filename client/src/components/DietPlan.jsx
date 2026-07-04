function DietPlan({ nutrition }) {

  // Loading Screen
  if (!nutrition) {
    return (
      <div
        className="card border-0 shadow-sm mt-4"
        style={{ borderRadius: "20px" }}
      >
        <div
          className="card-body d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: "300px" }}
        >
          <div
            className="spinner-border text-success"
            role="status"
            style={{
              width: "3rem",
              height: "3rem",
            }}
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>

          <h5 className="mt-3 text-success fw-bold">
            🥗 Loading Diet Plan...
          </h5>

          <p className="text-muted">
            Preparing your personalized meals...
          </p>
        </div>
      </div>
    );
  }

  const meals = [
    {
      title: "🍳 Breakfast",
      value: nutrition.breakfast,
      color: "#FFF3CD",
    },
    {
      title: "🍛 Lunch",
      value: nutrition.lunch,
      color: "#D1FAE5",
    },
    {
      title: "🍎 Snacks",
      value: nutrition.snacks,
      color: "#DBEAFE",
    },
    {
      title: "🍗 Dinner",
      value: nutrition.dinner,
      color: "#FCE7F3",
    },
  ];

  return (
    <div
      className="card border-0 shadow-sm mt-4"
      style={{ borderRadius: "20px" }}
    >
      <div className="card-body">
        <h3 className="mb-4 fw-bold">
          🥗 Today's Diet Plan
        </h3>

        <div className="row g-3">
          {meals.map((meal, index) => (
            <div className="col-md-6" key={index}>
              <div
                style={{
                  background: meal.color,
                  borderRadius: "15px",
                  padding: "20px",
                  height: "100%",
                }}
              >
                <h5>{meal.title}</h5>

                <p
                  className="mb-0"
                  style={{
                    fontSize: "16px",
                    color: "#555",
                  }}
                >
                  {meal.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DietPlan;