function ProgressCards({ nutrition, summary }) {
  const progress = [
    {
      title: "Calories",
      current: summary.calories,
      goal: nutrition.calories,
      color: "#f97316",
    },
    {
      title: "Protein",
      current: summary.protein || 0,
      goal: nutrition.protein,
      color: "#22c55e",
    },
    {
      title: "Carbs",
      current: summary.carbs || 0,
      goal: nutrition.carbs,
      color: "#3b82f6",
    },
    {
      title: "Fat",
      current: summary.fat || 0,
      goal: nutrition.fat,
      color: "#ec4899",
    },
  ];

  return (
    <div className="card p-4 mb-4">
      <h4 className="mb-4">📈 Daily Progress</h4>

      {progress.map((item, index) => {
       const percent =
  item.goal && item.goal > 0
    ? Math.min((item.current / item.goal) * 100, 100)
    : 0;

        return (
          <div key={index} className="mb-4">

            <div className="d-flex justify-content-between">
              <strong>{item.title}</strong>

              <span>
                {item.current} / {item.goal}
              </span>
            </div>

            <div
              style={{
                height: "10px",
                background: "#e5e7eb",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${percent}%`,
                  height: "100%",
                  background: item.color,
                  transition: "0.5s",
                }}
              />
            </div>

          </div>
        );
      })}
    </div>
  );
}

export default ProgressCards;