function ProfileCard({ user }) {
  return (
    <div
      className="card shadow-sm border-0 mb-4"
      style={{
        borderRadius: "20px",
        padding: "25px",
      }}
    >
      {/* Title */}
      <h3
        className="mb-4"
        style={{
          color: "#16a34a",
          fontWeight: "700",
        }}
      >
        📋 Health Information
      </h3>

      {/* Health Cards */}
      <div className="row g-4">
        <div className="col-lg-3 col-md-6">
          <div
            className="card border-0 shadow-sm text-center"
            style={{ borderRadius: "18px", padding: "20px" }}
          >
            <div style={{ fontSize: "35px" }}>🎂</div>
            <h6 className="text-muted mt-2">Age</h6>
            <h2>{user?.age || "-"}</h2>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div
            className="card border-0 shadow-sm text-center"
            style={{ borderRadius: "18px", padding: "20px" }}
          >
            <div style={{ fontSize: "35px" }}>📏</div>
            <h6 className="text-muted mt-2">Height</h6>
            <h2>{user?.height || "-"} cm</h2>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div
            className="card border-0 shadow-sm text-center"
            style={{ borderRadius: "18px", padding: "20px" }}
          >
            <div style={{ fontSize: "35px" }}>⚖️</div>
            <h6 className="text-muted mt-2">Weight</h6>
            <h2>{user?.weight || "-"} kg</h2>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div
            className="card border-0 shadow-sm text-center"
            style={{ borderRadius: "18px", padding: "20px" }}
          >
            <div style={{ fontSize: "35px" }}>🏃</div>
            <h6 className="text-muted mt-2">Activity</h6>
            <h5 style={{ textTransform: "capitalize" }}>
              {user?.activityLevel || "-"}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;