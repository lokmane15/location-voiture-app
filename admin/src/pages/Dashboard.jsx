import { useQuery } from "@tanstack/react-query";
import { getBalance, getEarningstoday } from "../api/Cars";
import Graph from "./Graph";
import PopularCars from "./PopularCars";
import { BsGraphUpArrow } from "react-icons/bs";
import Doughnut from "./Doughnut";
import RandomCars from "./RandomCars";

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
    return <div>Loading...</div>;
  }
  const amount = balance.available[0].amount;
  const formattedAmount = (amount / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const panding = balance.pending[0].amount;
  const formattedPendingAmount = (panding / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const eartoday = earningToDay.data[0].amount;
  const formattedeartodayAmount = (eartoday / 1000).toLocaleString("en-US", {
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
          <strong>$ {formattedeartodayAmount}</strong>
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
