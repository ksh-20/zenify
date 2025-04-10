import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    name: 'Mental Health Assessment',
    description: 'Take our comprehensive mental health test to understand your current mental well-being.',
    href: '/prediction',
    imageSrc: '/images/mental health.jpg'
  },
  {
    name: '24/7 Chat Support',
    description: 'Connect with our AI-powered chatbot for immediate emotional support and guidance.',
    href: '/chatbot',
    imageSrc: '/images/chat support.jpg'
  },
  {
    name: 'Expert Consultation',
    description: 'Book appointments with licensed mental health professionals.',
    href: '/doctors',
    imageSrc: '/images/expert consultation.jpg'
  },
];

const quotes = [
  '"Mental health is not a destination, but a journey."',
  '"Your mental health is a priority. Your happiness is essential. Your self-care is a necessity."',
  '"Its okay not to be okay, as long as you are not giving up."'
];

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Simplify your mind, amplify your peace
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Your journey to mental wellness starts here. We provide personalized support, 
              professional guidance, and resources to help you maintain and improve your mental health.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                to="/prediction"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Take Mental Health Test
              </Link>
              <Link
                to="/Login"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {quotes[0]}
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Our Services</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for mental wellness
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <Link key={feature.name} to={feature.href}>
                  <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <img
                      className="h-48 w-full object-cover"
                      src={feature.imageSrc}
                      alt={feature.name}
                    />
                    <div className="flex-1 p-6">
                      <dt className="text-lg font-semibold leading-7 text-gray-900">
                        {feature.name}
                      </dt>
                      <dd className="mt-1 text-base leading-7 text-gray-600">
                        {feature.description}
                      </dd>
                    </div>
                  </div>
                </Link>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;