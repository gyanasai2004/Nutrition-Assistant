import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ReportButton({ user, bmi, nutrition, water, summary }) {
  const downloadReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Nutrition Assistant Report", 14, 20);

    doc.setFontSize(12);

    autoTable(doc, {
      startY: 30,
      head: [["Field", "Value"]],
      body: [
        ["Name", user.name],
        ["Email", user.email],
        ["Age", user.age],
        ["Gender", user.gender],
        ["Height", `${user.height} cm`],
        ["Weight", `${user.weight} kg`],
        ["Goal", user.goal || "Maintain"],
        ["BMI", `${bmi.bmi} (${bmi.category})`],
        ["Calories Goal", nutrition.calories],
        ["Protein Goal", nutrition.protein],
        ["Carbs Goal", nutrition.carbs],
        ["Fat Goal", nutrition.fat],
        ["Today's Calories", summary.calories || 0],
        ["Today's Protein", summary.protein ||0],
        ["Today's Carbs", summary.carbs || 0],
        ["Today's Fat", summary.fat ||0],
        ["Water Intake", water || 0],
      ],
    });

    doc.save("Nutrition_Report.pdf");
  };

  return (
    <button
      className="btn btn-primary"
      onClick={downloadReport}
    >
      📄 Download Report
    </button>
  );
}

export default ReportButton;