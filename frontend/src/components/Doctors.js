import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialization: 'Clinical Psychologist',
    experience: '15 years',
    image: '/images/dr sarah.jpg',
    availability: ['Mon', 'Wed', 'Fri'],
    rating: 4.8
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialization: 'Psychiatrist',
    experience: '12 years',
    image: '/images/dr michael.jpg',
    availability: ['Tue', 'Thu', 'Sat'],
    rating: 4.9
  },
  {
    id: 3,
    name: 'Dr. Emma Williams',
    specialization: 'Counseling Psychologist',
    experience: '10 years',
    image: '/images/dr emma.jpg',
    availability: ['Mon', 'Tue', 'Thu'],
    rating: 4.7
  }
];

const Doctors = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const navigate = useNavigate();

  const handleBooking = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time for your appointment.");
      return;
    }

    const newAppointment = {
      doctor: selectedDoctor.name,
      specialization: selectedDoctor.specialization,
      date: selectedDate,
      time: selectedTime
    };

    // Retrieve existing appointments from localStorage
    const existingAppointments = JSON.parse(localStorage.getItem('appointments')) || [];

    // Add new appointment and update localStorage
    const updatedAppointments = [...existingAppointments, newAppointment];
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

    // Navigate to Appointments page
    navigate('/appointment');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Our Mental Health Experts
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
            >
              <img className="h-48 w-full object-cover" src={doctor.image} alt={doctor.name} />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                <p className="text-indigo-600">{doctor.specialization}</p>
                <p className="text-gray-600 mt-2">Experience: {doctor.experience}</p>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Available on:</p>
                  <div className="flex gap-2 mt-1">
                    {doctor.availability.map((day) => (
                      <span key={day} className="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded">
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-gray-600">{doctor.rating}</span>
                </div>
                <button
                  onClick={() => setSelectedDoctor(doctor)}
                  className="mt-6 w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appointment Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">
              Book Appointment with {selectedDoctor.name}
            </h3>
            <form className="space-y-4" onSubmit={handleBooking}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Time</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select a time</option>
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>2:00 PM</option>
                  <option>3:00 PM</option>
                  <option>4:00 PM</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setSelectedDoctor(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-md"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;