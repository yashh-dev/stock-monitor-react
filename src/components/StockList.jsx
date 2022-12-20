import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";
import finnHub from "../api/finnHub";
import { watchListContext } from "../context/WatchListContext";

const StockList = () => {
	const [stocks, setStocks] = useState([]);
	const { watchList, removeStock } = useContext(watchListContext);
	const changeColor = (change) => {
		return change > 0 ? "success" : "danger";
	};
	const renderIcon = (change) => {
		return change > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />;
	};
	const navigate = useNavigate();
	const handleStockSelect = (symbol) => {
		navigate(`detail/${symbol}`);
	};
	useEffect(() => {
		let isMounted = true;
		const fetchData = async () => {
			let responses = [];
			try {
				const responses = await Promise.all(
					watchList.map((stock) => {
						return finnHub.get("/quote", { params: { symbol: stock } });
					})
				);
				const data = responses.map((response) => {
					return {
						data: response.data,
						symbol: response.config.params.symbol,
					};
				});
				console.log(data);
				if (isMounted) {
					setStocks(data);
				}
			} catch (e) {
				console.log(e);
			}
		};
		fetchData();
		return () => {
			isMounted = false;
		};
	}, [watchList]);
	return (
		<div>
			<table className="table hover mt-5">
				<thead style={{ color: "rgb(79,89,102" }}>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Last</th>
						<th scope="col">Chg</th>
						<th scope="col">Chg%</th>
						<th scope="col">High</th>
						<th scope="col">Low</th>
						<th scope="col">Open</th>
						<th scope="col">Pclose</th>
					</tr>
				</thead>
				<tbody>
					{stocks.map((stock) => {
						const { data } = stock;
						return (
							<tr
								style={{ cursor: "pointer" }}
								onClick={() => handleStockSelect(stock.symbol)}
								className="table-row"
								key={stock.symbol}
							>
								<th scope="row">{stock.symbol}</th>
								<td>{data.c}</td>
								<td className={`text-${changeColor(data.d)}`}>
									{data.d}
									{renderIcon(data.d)}
								</td>
								<td className={`text-${changeColor(data.dp)}`}>
									{data.dp}
									{renderIcon(data.dp)}
								</td>
								<td>{data.h}</td>
								<td>{data.l}</td>
								<td>{data.o}</td>
								<td>
									{data.pc}
									<button
										className="btn btn-outline-danger mx-2 delete-button"
										onClick={(e) => {
											e.stopPropagation();
											removeStock(stock.symbol);
										}}
									>
										Remove
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default StockList;
