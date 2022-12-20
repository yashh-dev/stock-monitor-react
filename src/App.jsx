import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StockOverview from "./pages/StockOverview";
import StockDetails from "./pages/StockDetails";
import { WatchListContextProvider } from "./context/WatchListContext";
function App() {
	return (
		<main className="container">
			<WatchListContextProvider>
				<Router>
					<Routes>
						<Route path="/" element={<StockOverview />} />
						<Route path="/detail/:symbol" element={<StockDetails />} />
					</Routes>
				</Router>
			</WatchListContextProvider>
		</main>
	);
}

export default App;
