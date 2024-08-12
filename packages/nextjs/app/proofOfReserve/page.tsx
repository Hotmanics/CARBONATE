"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { parseAbiItem } from "viem";
import { usePublicClient } from "wagmi";
import { useScaffoldContract } from "~~/hooks/scaffold-eth";
import proofOfReserve0 from "~~/public/proof-of-reserve-0.png";

const ProofOfReserve: NextPage = () => {
  const { data: contract } = useScaffoldContract({ contractName: "WildWaterBottleCapToken" });
  const publicClient = usePublicClient();

  useEffect(() => {
    async function get() {
      if (!publicClient) return;

      const filter = await publicClient.createEventFilter({
        address: contract?.address,
        event: parseAbiItem("event Transfer(address indexed, address indexed, uint256)"),
      });
      const logs = await publicClient.getFilterLogs({ filter });
      console.log(logs);
    }
    get();
  }, [publicClient]);

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10 bg-gradient-to-t from-base-100 to-base-200">
        <div className="flex items-center flex-col w-full">
          <p className="text-center text-3xl lg:text-9xl beerGlass">Proof Of Reserve</p>

          <div className="flex flex-col items-center bg-secondary rounded-lg p-10 space-y-1">
            {/*eslint-disable-next-line no-use-before-define */}
            <img src={proofOfReserve0.src} className="w-96 h-96" />
            <Link
              href="https://basescan.org/tx/0x50cd1633bba7d8ad441487a0ccb912228bec5fdcd866140c7f5514297f28c82e"
              target="#"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline bg-base-200 rounded-lg p-1 loving-snow"
            >
              0x50cd1633bba7d8ad441487a0ccb912228bec5fdcd866140c7f5514297f28c82e
            </Link>
            <div className="flex flex-col text-center">
              <p className="loving-snow m-1 text-2xl">Amount</p>
              <p className="loving-snow m-1 text-4xl">96</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProofOfReserve;
