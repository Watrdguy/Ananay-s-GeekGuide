import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Computer Price Predictor</h1>
      <p className="text-gray-600 mb-8">
        Enter your system details to estimate its market price instantly.
      </p>
      <Link
        to="/predict"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Go to Prediction
      </Link>
    </div>
  );
}
