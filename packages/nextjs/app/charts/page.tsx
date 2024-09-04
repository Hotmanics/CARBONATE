"use client";

import { useEffect, useState } from "react";
import type { NextPage } from "next";
import {
  // Area, AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts";
import { formatUnits, parseAbiItem } from "viem";
import { useAccount, usePublicClient } from "wagmi";
import { getBlock } from "wagmi/actions";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "~~/components/ui/chart";
import { useScaffoldContract } from "~~/hooks/scaffold-eth";
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

const Charts: NextPage = () => {
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

  const { address: userAddress } = useAccount();

  if (!userAddress) {
    return (
      <div className="m-4">
        <div className="text-center text-4xl m-0">Connect wallet to view onchain data!</div>
        <div className="text-center text-xl m-0">*You do NOT need to sign any transactions</div>
      </div>
    );
    return;
  }
  return (
    <>
      <div className="flex flex-wrap items-center justify-center">
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
    </>
  );
};

export default Charts;
