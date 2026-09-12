const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const complaints = [];

app.post("/api/complaint", (req, res) => {
  const { name, serviceType, issue } = req.body;

  if (!name || !serviceType || !issue) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const complaint = {
    name,
    serviceType,
    issue,
    createdAt: new Date()
  };

  complaints.push(complaint);

  res.status(201).json({
    message: "Complaint submitted successfully",
    complaint
  });
});

app.get("/api/complaints", (req, res) => {
  res.json(complaints);
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});