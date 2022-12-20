import { useState, createContext, useEffect } from "react";

export const watchListContext = createContext();

export const WatchListContextProvider = (props) => {
	const getWatchList = () => {
		const data = localStorage.getItem("watchList")?.split(",");
		if (data) return data;
		return ["GOOGL", "MSFT", "AMZN"];
	};
	const [watchList, setWatchList] = useState(getWatchList());

	useEffect(() => {
		localStorage.setItem("watchList", watchList);
	}, [watchList]);
	const addStock = (symbol) => {
		if (watchList.indexOf(symbol) === -1) {
			setWatchList([...watchList, symbol]);
		}
	};
	const removeStock = (symbol) => {
		setWatchList(watchList.filter((stock) => stock !== symbol));
	};
	return (
		<watchListContext.Provider value={{ watchList, addStock, removeStock }}>
			{props.children}
		</watchListContext.Provider>
	);
};
