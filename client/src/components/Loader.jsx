function Loader({ text = "Loading..." }) {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        height: "80vh",
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
        <span className="visually-hidden">
          Loading
        </span>
      </div>

      <h2
        className="mt-4 text-success fw-bold"
      >
        🥗 Nutrition Assistant
      </h2>

      <p className="text-muted">
        {text}
      </p>
    </div>
  );
}

export default Loader;