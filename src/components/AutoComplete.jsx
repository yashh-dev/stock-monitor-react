import { useContext, useEffect, useState } from "react";
import finnHub from "../api/finnHub";
import { watchListContext } from "../context/WatchListContext";

const AutoComplete = () => {
	const [search, setSearch] = useState("");
	const [results, setResults] = useState([]);
	const { addStock } = useContext(watchListContext);
	const showDropdown = () => {
		const dropdownClass = search ? "show" : null;
		return (
			<ul
				style={{
					maxHeight: "60vh",
					overflowY: "scroll",
					overflowX: "hidden",
					cursor: "pointer",
				}}
				className={`dropdown-menu ${dropdownClass}`}
			>
				{results.map((result) => {
					return (
						<li
							onClick={() => {
								addStock(result.symbol);
								setSearch("");
							}}
							key={result.symbol}
							className="dropdown-item"
						>
							{result.description}({result.symbol})
						</li>
					);
				})}
			</ul>
		);
	};
	useEffect(() => {
		let isMounted = true;
		const fetchData = async () => {
			try {
				const response = await finnHub.get("/search", {
					params: {
						q: search,
					},
				});
				if (isMounted) {
					setResults(response.data.result);
				}
			} catch (err) {
				console.log(err);
			}
		};
		if (search.length > 0) {
			fetchData();
		} else {
			setResults([]);
		}
		return () => {
			isMounted = false;
		};
	}, [search]);
	return (
		<div className="w-50 p-5 rounded mx-auto">
			<div className="form-floating dropdown">
				<input
					id="search"
					type="text"
					className="form-control"
					placeholder="Search"
					autoComplete="off"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				></input>
				<label htmlFor="search">Search</label>
				{showDropdown()}
			</div>
		</div>
	);
};

export default AutoComplete;
