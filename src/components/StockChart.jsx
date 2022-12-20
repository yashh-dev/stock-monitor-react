import { useState } from "react";
import Chart from "react-apexcharts";

export const StockChart = ({ chartData, symbol }) => {
	const [dateFormat, setDateFormat] = useState("24h");
	const { day, week, year } = chartData;

	const setFormat = () => {
		switch (dateFormat) {
			case "24h":
				return day;
			case "7d":
				return week;
			case "1y":
				return year;
			default:
				return day;
		}
	};

	const color =
		setFormat()[setFormat().length - 1].y - setFormat()[0].y > 0
			? "#0f0"
			: "#f00";
	const options = {
		colors: [color],
		title: {
			text: symbol,
			align: "center",
			style: {
				fontSize: "24px",
			},
		},
		chart: {
			id: "stock data",
			animations: {
				speed: 1200,
			},
		},
		xaxis: {
			type: "datetime",
			labels: {
				datetimeUTC: false,
			},
		},
		tooltip: {
			x: {
				format: "MMM dd HH:MM",
			},
		},
	};

	const series = [
		{
			name: symbol,
			data: setFormat(),
		},
	];
	const renderButton = (button) => {
		const style = "btn m-1 ";
		if (button === dateFormat) {
			return style + "btn-primary";
		} else {
			return style + "btn-outline-primary";
		}
	};
	return (
		<div className="bg-white mt-4 p-4 shadow-sm">
			<Chart options={options} series={series} type="area" width="100%" />
			<div>
				<button
					className={renderButton("24h")}
					onClick={() => setDateFormat("24h")}
				>
					24h
				</button>
				<button
					className={renderButton("7d")}
					onClick={() => setDateFormat("7d")}
				>
					7d
				</button>
				<button
					className={renderButton("1y")}
					onClick={() => setDateFormat("1y")}
				>
					1y
				</button>
			</div>
		</div>
	);
};
