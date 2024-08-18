"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { formatUnits, parseAbiItem } from "viem";
import { usePublicClient } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContract } from "~~/hooks/scaffold-eth";
import proofOfReserve0 from "~~/public/proof-of-reserve-0.png";
import proofOfReserve1 from "~~/public/proof-of-reserve-1.png";
import proofOfReserve2 from "~~/public/proof-of-reserve-2.png";

// const proofOfReserveArray = [proofOfReserve0];

const newProofOfReserveArray = [
  {
    proof: proofOfReserve0,
    transactions: [
      { hash: "0xe18d63733c51a1b3d3710a9759c152da9906d8b38596baa73c9ccbb5794f466d", amount: "96000000000000000000" },
    ],
  },
  {
    proof: proofOfReserve1,
    transactions: [
      { hash: "0x69210aee3edc5df2f1a6ef7cf57097f14158d84596b5e8c81002a8a4214f1fdb", amount: "108000000000000000" },
      { hash: "0xf2f75fe2f0249eb7945d882e44099a9dab3b3b1361267b39b5a96b6b547b6b3d", amount: "107892000000000000000" },
      { hash: "0xb5d3b2e1627cc9b4b8c00f58ac30fc12da97dbbad2a06306c72b33bd77a129c5", amount: "108" },
    ],
  },
  {
    proof: proofOfReserve2,
    transactions: [{ hash: "TBD", amount: "1000000000000000000" }],
  },
];
const ProofOfReserve: NextPage = () => {
  const { data: contract } = useScaffoldContract({ contractName: "WildWaterBottleCapToken" });
  const publicClient = usePublicClient();

  const [mintLogs, setMintLogs] = useState<any>();

  const [mintEventComponents, setMintEventComponents] = useState<any>();

  useEffect(() => {
    async function get() {
      if (mintLogs === undefined) return;

      const mintEventComponents = newProofOfReserveArray?.map((proof: any, index: number) => {
        // const log2 = mintLogs[index];

        const txComps = [];
        for (let i = 0; i < proof.transactions.length; i++) {
          txComps.push(
            <div key={`${index}-${i}-txComps`} className="flex flex-col items-center bg-base-100">
              <Link
                href={`https://basescan.org/tx/${proof.transactions[i].hash}`}
                target="#"
                className="font-medium hover:underline rounded-lg p-1 loving-snow break-all"
              >
                {proof.transactions[i].hash}
              </Link>
              <div className="flex flex-col text-center">
                <p className="loving-snow m-1 text-2xl">Recipient</p>
                <Address address="0xc689c800a7121b186208ea3b182fAb2671B337E7" />
                {/*<Address address={log2?.args[0]} />*/}
              </div>
              <div className="flex flex-col text-center">
                <p className="loving-snow m-1 text-2xl">Amount</p>
                <p className="loving-snow m-1 text-4xl">{formatUnits(proof.transactions[i].amount, 18).toString()}</p>
              </div>
            </div>,
          );
        }

        return (
          <div key={index} className="flex flex-col items-center bg-secondary rounded-lg p-10 space-y-1 m-10">
            <p className="loving-snow text-4xl m-1">#{index}</p>
            {/* eslint-disable-next-line */}
            <img src={proof.proof.src} className="w-32 h-32 lg:w-96 lg:h-96" />
            {txComps}
            {/*<Link
              href={`https://basescan.org/tx/${proof.transactions}`}
              target="#"
              className="font-medium hover:underline rounded-lg p-1 loving-snow break-all"
            >
              {log2?.transactionHash}
            </Link>
            <div className="flex flex-col text-center">
              <p className="loving-snow m-1 text-2xl">Recipient</p>
              <Address address="0xc689c800a7121b186208ea3b182fAb2671B337E7" />
              <Address address={log2?.args[0]} />
            </div>
            
            <div className="flex flex-col text-center">
              <p className="loving-snow m-1 text-2xl">Amount</p>
              <p className="loving-snow m-1 text-4xl">{formatUnits(log2?.args[1], 18).toString()}</p>
            </div>
            */}
          </div>
        );
      });

      setMintEventComponents(mintEventComponents);
    }

    get();
  }, [mintLogs]);

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
