import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import Home from "./components/Home";
import Prediction from "./components/Prediction";
import Chatbot from "./components/Chatbot";
import Blog from "./components/Blog";
import Doctors from "./components/Doctors";
import Login from "./components/Login";
import Signup from "./components/Signup"; 
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Appointment from "./components/Appointment";  

const navigation = [
  { name: "Home", href: "/" },
  { name: "Mental Health Test", href: "/prediction" },
  { name: "Chat Support", href: "/chatbot" },
  { name: "Blog", href: "/blog" },
  { name: "Expert Doctors", href: "/doctors" },
  { name: "Appointment", href: "/appointment" },  
];

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuth(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Navigation */}
      <header className="bg-white shadow-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Zenify</span>
              <div className="text-3xl font-bold text-indigo-600">Zenify</div>
            </Link>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
              >
                {item.name}
              </Link>
            ))}
            {!auth ? (
              <>
                <Link to="/login" className="text-sm font-semibold text-indigo-600 mr-4">Login</Link>
                <Link to="/signup" className="text-sm font-semibold text-indigo-600">Sign Up</Link>
              </>
            ) : (
              <button onClick={handleLogout} className="text-sm font-semibold text-red-600">Logout</button>
            )}
          </div>

          <div className="flex lg:hidden">
            <button type="button" className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <div className="text-2xl font-bold text-indigo-600">Zenify</div>
              </Link>
              <button type="button" className="rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link key={item.name} to={item.href}
                    className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}>
                    {item.name}
                  </Link>
                ))}
                {!auth ? (
                  <>
                    <Link to="/login" className="block rounded-lg px-3 py-2 text-base font-semibold text-indigo-600 hover:bg-gray-50">Login</Link>
                    <Link to="/signup" className="block rounded-lg px-3 py-2 text-base font-semibold text-indigo-600 hover:bg-gray-50">Sign Up</Link>
                  </>
                ) : (
                  <button onClick={handleLogout} className="block w-full text-left rounded-lg px-3 py-2 text-base font-semibold text-red-600 hover:bg-gray-50">Logout</button>
                )}
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute auth={auth}>
              <Dashboard />
            </ProtectedRoute>
          }/>
          <Route path="/prediction" element={
            <ProtectedRoute auth={auth}>
              <Prediction />
            </ProtectedRoute>
          }/>
          <Route path="/chatbot" element={
            <ProtectedRoute auth={auth}>
              <Chatbot />
            </ProtectedRoute>
          }/>
          <Route path="/appointment" element={
            <ProtectedRoute auth={auth}>
              <Appointment />
            </ProtectedRoute>
          }/>
          <Route path="/doctors" element={
            <ProtectedRoute auth={auth}>
              <Doctors />
            </ProtectedRoute>
          }/>
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-auto">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-400">
              &copy; {new Date().getFullYear()} Zenify. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;