"use client";

import { useEffect, useState } from "react";
import "./page.css";
import type { NextPage } from "next";
import {
  // Area, AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts";
import { formatUnits, parseAbiItem } from "viem";
import { usePublicClient } from "wagmi";
import { getBlock } from "wagmi/actions";
import { PfpCard } from "~~/components/PfpCard";
import { Address } from "~~/components/scaffold-eth";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "~~/components/ui/chart";
import { useScaffoldContract } from "~~/hooks/scaffold-eth";
import jake from "~~/public/jake.png";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";

const chartConfig = {
  desktop: {
    label: "Tokens Minted",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

function BarChartExample({ chartData }: any) {
  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-auto">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={value => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="Tokens Minted: " fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

function BarChartExample2({ chartData }: any) {
  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-auto">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={value => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="Transactions: " fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Home: NextPage = () => {
  const { data: contract } = useScaffoldContract({ contractName: "WildWaterBottleCapToken" });

  const publicClient = usePublicClient();

  const [mintLogs, setMintLogs] = useState<any>([]);

  useEffect(() => {
    async function get() {
      if (!contract) return;
      if (!publicClient) return;

      const logs = await publicClient.getLogs({
        address: contract?.address,
        event: parseAbiItem("event Minted(address indexed, uint256)"),
        fromBlock: BigInt(0),
        toBlock: "latest",
      });

      console.log(logs);
      setMintLogs(logs);
    }
    get();
    /* eslint-disable-next-line */
  }, [contract?.address, publicClient?.chain?.id]);

  useEffect(() => {
    async function get() {
      const newChartData = [];

      const observedDate = new Date();
      observedDate.setUTCDate(observedDate.getUTCDate());

      for (let i = 0; i < 3; i++) {
        const observedMonth = observedDate.getMonth();
        console.log(observedMonth);

        let newTotal = 0;
        for (let j = 0; j < mintLogs.length; j++) {
          const block = await getBlock(wagmiConfig, { blockHash: mintLogs[j].blockHash });
          const timestampConverted = block.timestamp * BigInt(1000);

          const date = new Date(Number(timestampConverted));
          const dateYear = date.getUTCFullYear();
          const dateMonth = date.getUTCMonth();

          const result = dateYear === observedDate.getUTCFullYear() && dateMonth === observedMonth;
          if (result) {
            console.log("Added " + Number(formatUnits(mintLogs[j]?.args[1], 18)) + " to " + observedMonth);
            newTotal += Number(formatUnits(mintLogs[j]?.args[1], 18));
          }
        }

        newChartData.unshift({ month: months[observedMonth], "Tokens Minted: ": newTotal });
        observedDate.setUTCDate(observedDate.getUTCDate() - 30);
      }

      setSelectedChartData([...newChartData]);
    }
    get();
  }, [mintLogs]);

  const [selectedChartData, setSelectedChartData] = useState<any>();

  async function setChartData(numOfMonths: number) {
    const newChartData = [];

    const observedDate = new Date();
    observedDate.setUTCDate(observedDate.getUTCDate());

    for (let i = 0; i < numOfMonths; i++) {
      const observedMonth = observedDate.getMonth();
      console.log(observedMonth);

      let newTotal = 0;
      for (let j = 0; j < mintLogs.length; j++) {
        const block = await getBlock(wagmiConfig, { blockHash: mintLogs[j].blockHash });
        const timestampConverted = block.timestamp * BigInt(1000);

        const date = new Date(Number(timestampConverted));
        const dateYear = date.getUTCFullYear();
        const dateMonth = date.getUTCMonth();

        const result = dateYear === observedDate.getUTCFullYear() && dateMonth === observedMonth;
        if (result) {
          console.log("Added " + Number(formatUnits(mintLogs[j]?.args[1], 18)) + " to " + observedMonth);
          newTotal += Number(formatUnits(mintLogs[j]?.args[1], 18));
        }
      }

      newChartData.unshift({ month: months[observedMonth], "Tokens Minted: ": newTotal });
      observedDate.setUTCDate(observedDate.getUTCDate() - 30);
    }

    setSelectedChartData([...newChartData]);
  }

  useEffect(() => {
    async function get() {
      const newChartData = [];

      const observedDate = new Date();
      observedDate.setUTCDate(observedDate.getUTCDate());

      for (let i = 0; i < 3; i++) {
        const observedMonth = observedDate.getMonth();

        let newTotal = 0;
        for (let j = 0; j < mintLogs.length; j++) {
          const block = await getBlock(wagmiConfig, { blockHash: mintLogs[j].blockHash });
          const timestampConverted = block.timestamp * BigInt(1000);

          const date = new Date(Number(timestampConverted));
          const dateYear = date.getUTCFullYear();
          const dateMonth = date.getUTCMonth();

          const result = dateYear === observedDate.getUTCFullYear() && dateMonth === observedMonth;
          if (result) {
            newTotal++;
          }
        }

        newChartData.unshift({ month: months[observedMonth], "Transactions: ": newTotal });
        observedDate.setUTCDate(observedDate.getUTCDate() - 30);
      }

      setSelectedChartData2([...newChartData]);
    }
    get();
  }, [mintLogs]);

  const [selectedChartData2, setSelectedChartData2] = useState<any>();

  async function setChartData2(numOfMonths: number) {
    const newChartData = [];

    const observedDate = new Date();
    observedDate.setUTCDate(observedDate.getUTCDate());

    for (let i = 0; i < numOfMonths; i++) {
      const observedMonth = observedDate.getMonth();
      console.log(observedMonth);

      let newTotal = 0;
      for (let j = 0; j < mintLogs.length; j++) {
        const block = await getBlock(wagmiConfig, { blockHash: mintLogs[j].blockHash });
        const timestampConverted = block.timestamp * BigInt(1000);

        const date = new Date(Number(timestampConverted));
        const dateYear = date.getUTCFullYear();
        const dateMonth = date.getUTCMonth();

        const result = dateYear === observedDate.getUTCFullYear() && dateMonth === observedMonth;
        if (result) {
          newTotal++;
        }
      }

      newChartData.unshift({ month: months[observedMonth], "Transactions: ": newTotal });
      observedDate.setUTCDate(observedDate.getUTCDate() - 30);
    }

    setSelectedChartData2([...newChartData]);
  }

  return (
    <>
      <div className="flex flex-col flex-grow pt-10 space-y-8 bg-gradient-to-t from-base-100 to-base-200 items-center">
        <div className="flex flex-col px-5 justify-center items-center text-center rounded-3xl bg-base-300">
          <p className="text-4xl lg:text-7xl beerGlass m-1">Wild Water</p>
          <p className="text-4xl lg:text-7xl beerGlass m-1">Bottle Cap Token</p>
          <p className="text-xl lg:text-2xl beerGlass m-1">A Tokenized Real World Asset</p>
        </div>

        <div>
          <div className="wrap">
            <div className="wave"></div>
          </div>
          <div className="flex flex-col items-center text-center w-full px-5 bg-base-300 shadow-lg ">
            <p className="text-xl lg:text-4xl loving-snow m-1">Society has collapsed?</p>
            <p className="lg:text-3xl loving-snow m-1">and</p>
            <p className="text-xl lg:text-4xl loving-snow m-1">
              Your currency of the past is no longer useful in the present?
            </p>
            <p className="text-3xl lg:text-5xl loving-snow font-bold lg:w-[680px]">Dive into the future!</p>
            <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row bg-base-100 rounded-lg m-1 p-1">
              <p className="my-2 font-medium">Contract Address:</p>
              <Address address={contract?.address} />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-[600px] flex flex-col items-center justify-center">
            <p className="text-xl m-4">Mint Count</p>

            <div className="flex flex-wrap space-x-2">
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => {
                  setChartData(3);
                }}
              >
                3 month
              </button>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => {
                  setChartData(6);
                }}
              >
                6 month
              </button>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => {
                  setChartData(12);
                }}
              >
                YTD
              </button>
            </div>
            <div className="m-4">
              <BarChartExample chartData={selectedChartData} />
            </div>
          </div>

          <div className="w-[600px] flex flex-col items-center justify-center">
            <p className="text-xl m-4">Transactions</p>

            <div className="flex flex-wrap space-x-2">
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => {
                  setChartData2(3);
                }}
              >
                3 month
              </button>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => {
                  setChartData2(6);
                }}
              >
                6 month
              </button>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => {
                  setChartData2(12);
                }}
              >
                YTD
              </button>
            </div>
            <div className="m-4">
              <BarChartExample2 chartData={selectedChartData2} />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center w-full">
          <p className="w-3/4 text-5xl beerGlass text-center border-b-4 border-base-200">FAQ</p>

          <div className="flex flex-wrap justify-center lg:space-x-10">
            <div className="lg:w-1/4 bg-base-300 rounded-lg shadow-md m-4 p-4">
              <p className="text-3xl beerGlass text-center">What is it?</p>
              <p className="text-xl loving-snow text-center">
                {`A tokenized Real World Asset (RWA) where the supply of the token matches the actual number of bottle caps
            that Jacob Homanics owns in the physical world.`}
              </p>
            </div>

            <div className="lg:w-1/4 bg-base-300 rounded-lg shadow-md m-4 p-4">
              <p className="text-3xl beerGlass text-center">How is it?</p>
              <p className="text-xl loving-snow text-center">
                {`Jacob loves his mineral water. Every Sunday he takes a a stroll down to the local supermarket to stock up on a 12ct pack of bottles. 
              After poppin' the top off, throughtout the week, he stores the bottle caps for safekeeping instead of throwing them in the trash. 
              "Who knows, maybe one day they'll be the currency of the future!" He thinks, as he plucks another bottle cap into the treasury.`}
              </p>
            </div>

            <div className="lg:w-1/4 bg-base-300 rounded-lg shadow-md m-4 p-4">
              <p className="text-3xl beerGlass text-center">Why is it?</p>
              <p className="text-xl loving-snow text-center">
                {`This is a fun experiment that will help explore and discover what it means to be a Tokenized Real World
            Asset. It is designed to test and break the boundaries and processes for bringing Real World Assets onchain.`}
              </p>
            </div>

            <div className="lg:w-1/4 bg-base-300 rounded-lg shadow-md m-4 p-4">
              <p className="text-3xl beerGlass text-center">How can you participate?</p>
              <p className="text-xl loving-snow text-center">
                {`You can send in your bottle cap tokens along with an associated address and when I receive the physical caps, then I will mint the tokens to your specified address!`}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap text-center justify-center items-center">
            <PfpCard
              name="Jacob Homanics"
              image={jake}
              twitterUrl="https://www.twitter.com/JacobHomanics"
              farcasterUrl="https://www.warpcast.com/jacobhomanics.eth"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
