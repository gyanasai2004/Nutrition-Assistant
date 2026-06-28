function StatsCards({ bmi, nutrition, water }) {
  const cards = [
    {
      title: "BMI",
      value: bmi.bmi,
      sub: bmi.category,
      icon: "📊",
      color: "#3b82f6",
      shadow: "rgba(59,130,246,0.25)",
    },
    {
      title: "Calories",
      value: `${nutrition.calories} kcal`,
      sub: "Daily Goal",
      icon: "🔥",
      color: "#f97316",
      shadow: "rgba(249,115,22,0.25)",
    },
    {
      title: "Water",
      value: water,
      sub: "Recommended",
      icon: "💧",
      color: "#06b6d4",
      shadow: "rgba(6,182,212,0.25)",
    },
    {
      title: "Protein",
      value: `${nutrition.protein} g`,
      sub: "Daily Goal",
      icon: "🥩",
      color: "#22c55e",
      shadow: "rgba(34,197,94,0.25)",
    },
  ];

  return (
    <div className="row g-4 mb-4">
      {cards.map((card, index) => (
        <div className="col-lg-3 col-md-6" key={index}>
          <div
            className="card h-100"
            style={{
              border: "none",
              borderRadius: "20px",
              overflow: "hidden",
              transition: "0.3s",
              cursor: "pointer",
              boxShadow: `0 12px 25px ${card.shadow}`,
            }}
          >
            <div
              style={{
                height: "8px",
                background: `linear-gradient(90deg, ${card.color}, #ffffff)`,
              }}
            />

            <div className="card-body text-center">

              <div
                style={{
                  width: "75px",
                  height: "75px",
                  borderRadius: "50%",
                  background: `${card.color}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 15px",
                  fontSize: "36px",
                }}
              >
                {card.icon}
              </div>

              <h6
                className="text-muted"
                style={{ fontWeight: "600" }}
              >
                {card.title}
              </h6>

              <h2
                style={{
                  color: card.color,
                  fontWeight: "700",
                  marginBottom: "8px",
                }}
              >
                {card.value}
              </h2>

              <small className="text-muted">
                {card.sub}
              </small>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;