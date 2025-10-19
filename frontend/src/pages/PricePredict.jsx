import React, { useState, useEffect } from "react";
import InputField from "../components/InputField";
import axios from "axios";

export default function PricePredict() {
  const [formData, setFormData] = useState({
    device_type: "",
    brand: "",
    release_year: "",
    cpu_brand: "",
    cpu_model: "",
    cpu_cores: "",
    cpu_threads: "",
    cpu_base_ghz: "",
    cpu_boost_ghz: "",
    gpu_brand: "",
    gpu_model: "",
    vram_gb: "",
    ram_gb: "",
    storage_gb: "",
    weight_kg: "",
  });

  const [price, setPrice] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://ananay-s-geekguide.onrender.com/predict", formData);
      setPrice(res.data.predicted_price);
    } catch (err) {
      console.error(err);
    }
  };

  // Options state
  const [options, setOptions] = useState({
    device_type: [],
    brand: [],
    cpu_brand: [],
    cpu_model: [],
    gpu_brand: [],
    gpu_model: [],
  });

  // Load options from text files
  useEffect(() => {
    const fields = Object.keys(options);
    fields.forEach(async (field) => {
      try {
        const res = await fetch(`/options/${field}.txt`);
        const text = await res.text();
        const lines = Array.from(new Set(text.split("\n").map((l) => l.trim()).filter(Boolean))); // deduplicate
        setOptions((prev) => ({ ...prev, [field]: lines }));
      } catch (err) {
        console.error(`Failed to load ${field}.txt`, err);
      }
    });
  }, []);

  // Render a dropdown
  const renderDropdown = (name, label) => (
    <div className="mb-4" key={name}>
      <label className="block mb-1 font-semibold">{label}</label>
      <select
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md p-2"
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options[name].map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Predict Computer Price</h2>
      <form onSubmit={handleSubmit}>
        {renderDropdown("device_type", "Device Type")}
        {renderDropdown("brand", "Brand")}
        {renderDropdown("cpu_brand", "CPU Brand")}
        {renderDropdown("cpu_model", "CPU Model")}
        {renderDropdown("gpu_brand", "GPU Brand")}
        {renderDropdown("gpu_model", "GPU Model")}

        {/* Other input fields */}
        {Object.keys(formData)
          .filter(
            (key) =>
              !["device_type", "brand", "cpu_brand", "cpu_model", "gpu_brand", "gpu_model"].includes(key)
          )
          .map((key) => (
            <InputField
              key={key}
              label={key.replace(/_/g, " ").toUpperCase()}
              name={key}
              value={formData[key]}
              onChange={handleChange}
            />
          ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Predict
        </button>
      </form>

      {price && (
        <div className="mt-6 text-center text-xl font-semibold text-green-600">
          Estimated Price: ${price.toFixed(2)}
        </div>
      )}
    </div>
  );
}
