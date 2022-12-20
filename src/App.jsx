import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StockOverview from "./pages/StockOverview";
import StockDetails from "./pages/StockDetails";
function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<StockOverview />} />
          <Route path="/details/:stock" element={<StockDetails />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
