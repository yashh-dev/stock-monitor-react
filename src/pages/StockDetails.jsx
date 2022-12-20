import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import finnHub from "../api/finnHub";
import { StockChart } from "../components/StockChart";
import { StockData } from "../components/StockData";

const formatData = (data) => {
	return data.t.map((el, index) => {
		return {
			x: el * 1000,
			y: Math.floor(data.c[index]),
		};
	});
};

const StockDetails = () => {
	const { symbol } = useParams();
	const [chartData, setChartData] = useState();
	useEffect(() => {
		const fetchData = async () => {
			const date = new Date();
			const currentTime = Math.floor(date.getTime() / 1000);
			let oneDay;
			if (date.getDay() == 6) {
				oneDay = currentTime - 24 * 60 * 60 * 2;
			} else if (date.getDay() == 7) {
				oneDay = currentTime - 24 * 60 * 60 * 3;
			} else {
				oneDay = currentTime - 24 * 60 * 60;
			}
			const oneWeek = currentTime - 24 * 60 * 60 * 7;
			const oneYear = currentTime - 24 * 60 * 60 * 365;
			try {
				const responses = await Promise.all([
					await finnHub.get("/stock/candle", {
						params: {
							symbol: symbol,
							from: oneDay,
							to: currentTime,
							resolution: 30,
						},
					}),
					await finnHub.get("/stock/candle", {
						params: {
							symbol: symbol,
							from: oneWeek,
							to: currentTime,
							resolution: 60,
						},
					}),
					await finnHub.get("/stock/candle", {
						params: {
							symbol: symbol,
							from: oneYear,
							to: currentTime,
							resolution: "W",
						},
					}),
				]);
				setChartData({
					day: formatData(responses[0].data),
					week: formatData(responses[1].data),
					year: formatData(responses[2].data),
				});
			} catch (err) {
				console.log(err);
			}
		};
		fetchData();
	}, [symbol]);
	return (
		<div>
			{chartData && (
				<div>
					<StockChart chartData={chartData} symbol={symbol} />
					<StockData symbol={symbol} />
				</div>
			)}
		</div>
	);
};

export default StockDetails;
