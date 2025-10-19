export default function Footer() {
  return (
    <footer className="bg-white text-center py-3 border-t text-gray-500 text-sm">
      © {new Date().getFullYear()} Computer Price Predictor | Made with ❤️ using React + Flask
    </footer>
  );
}
