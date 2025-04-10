const express = require("express");
const pool = require("../config/db");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

// Book Appointment
router.post("/book", authenticateToken, async (req, res) => {
  const { doctorName, date, time } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO appointments (user_id, doctor_name, date, time) VALUES ($1, $2, $3, $4) RETURNING *", 
      [req.user.id, doctorName, date, time]
    );
    const bookedAppointment = result.rows[0];
    res.json({
      message: "Appointment booked successfully",
      appointment: bookedAppointment, // Return the booked appointment details
    });
  } catch (error) {
    console.error("Error booking appointment:", error.message);
    res.status(500).json({ error: "Failed to book appointment, please try again later" });
  }
});

// Get User Appointments
router.get("/profile/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const result = await pool.query(
      "SELECT * FROM appointments WHERE user_id = $1",
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching appointments:", err.message);
    res.status(500).send("Server Error");
  }
});

// Delete Appointment
router.delete("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM appointments WHERE id = $1", [id]);
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    console.error("Error deleting appointment:", err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
