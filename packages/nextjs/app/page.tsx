"use client";

import type { NextPage } from "next";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { data: contract } = useScaffoldContract({ contractName: "WildWaterBottleCapToken" });

  return (
    <>
      <div className="flex flex-col items-center flex-grow pt-10 space-y-8 bg-gradient-to-t from-base-100 to-base-200">
        <div className="flex flex-col px-5 text-center lg:w-[720px] rounded-lg">
          <p className="text-4xl lg:text-7xl beerGlass m-1">Wild Water</p>
          <p className="text-4xl lg:text-7xl beerGlass m-1">Bottle Cap Token</p>
          <p className="text-xl lg:text-2xl beerGlass m-1">A Tokenized Real World Asset</p>
        </div>

        <div className="flex flex-col items-center text-center w-full px-5 bg-base-300 shadow-lg">
          <p className="text-xl lg:text-4xl loving-snow m-1">Society has collapsed?</p>
          <p className="lg:text-3xl loving-snow m-1">and</p>
          <p className="text-xl lg:text-4xl loving-snow m-1">Your flimsy paper money is now worthless?</p>
          <p className="text-3xl lg:text-5xl loving-snow font-bold lg:w-[680px]">Dive into the future!</p>
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row bg-base-100 rounded-lg m-1 p-1">
            <p className="my-2 font-medium">Contract Address:</p>
            <Address address={contract?.address} />
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
        </div>
      </div>
    </>
  );
};

export default Home;
