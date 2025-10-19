export default function Info() {
  return (
    <div className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
      <h2 className="text-3xl font-bold mb-4 text-blue-600">About This Project</h2>
      <p>
        This project predicts the price of a computer based on its hardware configuration using
        an <strong>XGBoost regression model</strong> trained on real-world data.
      </p>
      <p className="mt-4">
        The model considers features like CPU, GPU, RAM, storage, and other specifications to make
        accurate predictions.
      </p>
      <p className="mt-4">
        Frontend is built with <strong>React + Tailwind CSS</strong>, while the backend is powered by
        <strong> Flask</strong> serving the ML model.
      </p>
    </div>
  );
}
