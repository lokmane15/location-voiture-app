import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState({
        dated: "",
        datef: "",
        id_car:null
    });

    // const setReservationData = (newData) => {
    //     setData({ ...data, ...newData });
    // };

    return (
        <DataContext.Provider value={{ data, setData }}>
        {children}
        </DataContext.Provider>
    );
};
