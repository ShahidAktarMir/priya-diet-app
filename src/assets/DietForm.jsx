// src/components/DietForm.jsx
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useState } from "react";
import Button from "./Button.jsx";
import DietPDF from "./DietPdf.jsx";
import Input from "./Input.jsx";

function DietForm() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    bmi: "",
    complications: "",
    goals: "",
    earlyMorning: "",
    breakfast: "",
    lunch: "",
    dinner: "",
    notes: "",
  });
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <Input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Client Name"
      />
      <Input
        name="age"
        value={form.age}
        onChange={handleChange}
        placeholder="Age"
      />
      {/* Add more fields for BMI, complications, etc. */}
      <Input
        name="earlyMorning"
        value={form.earlyMorning}
        onChange={handleChange}
        placeholder="Early Morning Meal"
      />
      <Input
        name="breakfast"
        value={form.breakfast}
        onChange={handleChange}
        placeholder="Breakfast"
      />
      <Input
        name="lunch"
        value={form.lunch}
        onChange={handleChange}
        placeholder="Lunch"
      />
      <Input
        name="dinner"
        value={form.dinner}
        onChange={handleChange}
        placeholder="Dinner"
      />
      <Input
        name="notes"
        value={form.notes}
        onChange={handleChange}
        placeholder="Additional Notes"
      />
      <PDFDownloadLink
        document={<DietPDF data={form} />}
        fileName={`${form.name || "client"}-diet-chart.pdf`}
      >
        {({ loading }) => (
          <Button disabled={loading}>
            {loading ? "Generating..." : "Generate PDF"}
          </Button>
        )}
      </PDFDownloadLink>
    </div>
  );
}
export default DietForm;
