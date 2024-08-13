"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { formatUnits, parseAbiItem } from "viem";
import { usePublicClient } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContract } from "~~/hooks/scaffold-eth";
import proofOfReserve0 from "~~/public/proof-of-reserve-0.png";

const proofOfReserveArray = [proofOfReserve0];

const ProofOfReserve: NextPage = () => {
  const { data: contract } = useScaffoldContract({ contractName: "WildWaterBottleCapToken" });
  const publicClient = usePublicClient();

  const [mintLogs, setMintLogs] = useState<any>();

  const mintEventComponents = mintLogs?.map((log: any, index: number) => {
    return (
      <div key={index} className="flex flex-col items-center bg-secondary rounded-lg p-10 space-y-1 m-10">
        <p className="loving-snow text-4xl m-1">Mint #{index}</p>
        {/* eslint-disable-next-line */}
        <img src={proofOfReserveArray[index].src} className="w-32 h-32 lg:w-96 lg:h-96" />
        <Link
          href={`https://basescan.org/tx/${log?.transactionHash}`}
          target="#"
          className="font-medium hover:underline rounded-lg p-1 loving-snow break-all"
        >
          {log?.transactionHash}
        </Link>
        <div className="flex flex-col text-center">
          <p className="loving-snow m-1 text-2xl">Recipient</p>
          <Address address={log?.args[0]} />
        </div>
        <div className="flex flex-col text-center">
          <p className="loving-snow m-1 text-2xl">Amount</p>
          <p className="loving-snow m-1 text-4xl">{formatUnits(log?.args[1], 18).toString()}</p>
        </div>
      </div>
    );
  });

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

      setMintLogs(logs);
    }
    get();
    /* eslint-disable-next-line */
  }, [contract?.address, publicClient?.chain?.id]);

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10 bg-gradient-to-t from-base-100 to-base-200">
        <div className="flex items-center flex-col w-full">
          <p className="text-center text-3xl lg:text-9xl beerGlass">Proof Of Reserve</p>
          <div className="lg:w-1/4 bg-base-300 rounded-lg shadow-md m-4 p-4">
            <p className="text-3xl beerGlass text-center">How can you participate?</p>
            <p className="text-xl loving-snow text-center">
              {`You can send in your bottle cap tokens along with an associated address and when I receive the physical caps, then I will mint the tokens to your specified address!`}
            </p>
          </div>
          {mintEventComponents}
        </div>
      </div>
    </>
  );
};

export default ProofOfReserve;
