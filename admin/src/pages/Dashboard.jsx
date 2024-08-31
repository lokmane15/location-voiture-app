import { useQuery } from "@tanstack/react-query";
import { getBalance, getEarningstoday } from "../api/Cars";
import Graph from "./Graph";
import PopularCars from "./PopularCars";
import { BsGraphUpArrow } from "react-icons/bs";
import Doughnut from "./Doughnut";
import RandomCars from "./RandomCars";
import ReactLoading from "react-loading";

export default function Dashboard() {
  const { data: balance, isLoading: isLoadingBalance } = useQuery({
    queryKey: ["balance"],
    queryFn: getBalance,
  });
  const { data: earningToDay, isLoading: isLoadingErningsToday } = useQuery({
    queryKey: ["earnings"],
    queryFn: getEarningstoday,
  });

  if (isLoadingBalance || isLoadingErningsToday) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ReactLoading type={"spin"} color={"black"} height={50} width={50} />
      </div>
    );
  }
  // Safely access the data properties
  const amount = balance?.available?.[0]?.amount ?? 0;
  const formattedAmount = (amount / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const pending = balance?.pending?.[0]?.amount ?? 0;
  const formattedPendingAmount = (pending / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const earToday = earningToDay?.data?.[0]?.amount ?? 0;
  const formattedEarTodayAmount = (earToday / 1000).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="mt-5">
      <div className="flex items-center justify-around">
        <div className="py-4 w-52 pl-4 border bg-white rounded-md">
          <p className="capitalize">Income</p>
          <strong className="font-extrabold flex items-center">
            $ {formattedAmount}
            <BsGraphUpArrow className="text-green-700 ml-2 text-xl" />
          </strong>
        </div>
        <div className="py-4 w-52 pl-4 border bg-white rounded-md">
          <p>Today Earning</p>
          <strong>$ {formattedEarTodayAmount}</strong>
        </div>
        <div className="py-4 w-52 pl-4 border bg-white rounded-md">
          <p>Pending</p>
          <strong>$ {formattedPendingAmount} </strong>
        </div>
      </div>
      <div className="flex flex-row gap-4 justify-around w-full mt-10 item-center">
        <div className="w-3/5">
          <p className="text-gray-700 font-medium ">Reservation Summary</p>
          <Graph />
        </div>
        <div>
          <Doughnut />
        </div>
      </div>
      <div className="flex flex-row gap-4 justify-around w-full mt-10 item-center">
        <RandomCars />
        <PopularCars />
      </div>
    </div>
  );
}
