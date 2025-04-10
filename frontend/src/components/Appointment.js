import React, { useState, useEffect } from "react";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(storedAppointments);
  }, []);

  // Save to localStorage
  const updateStorage = (updatedAppointments) => {
    setAppointments(updatedAppointments);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
  };

  // Delete Appointment
  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      const updatedAppointments = appointments.filter((_, i) => i !== index);
      updateStorage(updatedAppointments);
    }
  };

  // Enable Edit Mode
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditDate(appointments[index].date);
    setEditTime(appointments[index].time);
  };

  // Save Modified Appointment
  const handleSave = () => {
    if (!editDate || !editTime) {
      alert("Please select a valid date and time.");
      return;
    }

    const updatedAppointments = [...appointments];
    updatedAppointments[editingIndex] = {
      ...updatedAppointments[editingIndex],
      date: editDate,
      time: editTime,
    };

    updateStorage(updatedAppointments);
    setEditingIndex(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Your Appointments
        </h2>

        {appointments.length === 0 ? (
          <p className="text-center text-gray-600">No appointments booked yet.</p>
        ) : (
          <ul className="space-y-4">
            {appointments.map((appt, index) => (
              <li key={index} className="bg-white shadow p-4 rounded-md">
                <h3 className="text-lg font-semibold">{appt.doctor}</h3>
                <p>{appt.specialization}</p>

                {editingIndex === index ? (
                  // Edit Mode
                  <div>
                    <label className="block text-sm font-medium text-gray-700">New Date</label>
                    <input
                      type="date"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                    />

                    <label className="block text-sm font-medium text-gray-700 mt-2">New Time</label>
                    <select
                      value={editTime}
                      onChange={(e) => setEditTime(e.target.value)}
                      className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                    >
                      <option>9:00 AM</option>
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>2:00 PM</option>
                      <option>3:00 PM</option>
                      <option>4:00 PM</option>
                    </select>

                    <div className="flex space-x-4 mt-4">
                      <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded-md">
                        Save
                      </button>
                      <button
                        onClick={() => setEditingIndex(null)}
                        className="px-4 py-2 bg-gray-400 text-white rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // Normal View
                  <>
                    <p>Date: {appt.date}</p>
                    <p>Time: {appt.time}</p>

                    <div className="flex space-x-4 mt-4">
                      <button
                        onClick={() => handleEdit(index)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Appointment;