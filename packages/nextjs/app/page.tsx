"use client";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10 space-y-4">
        <div className="px-5 text-center lg:w-[720px] bg-base-100 rounded-lg shadow-md shadow-secondary">
          <p className="text-4xl lg:text-7xl beerGlass">Wild Water</p>
          <p className="text-4xl lg:text-7xl beerGlass">Bottle Cap Token</p>
          <p className="text-xl lg:text-2xl beerGlass">A Tokenized Real World Asset</p>
        </div>
        <div className="px-5 text-center lg:w-[512px] bg-base-100 rounded-lg shadow-md shadow-secondary">
          <p className="text-xl lg:text-3xl kanit-light">Civilization has ended?</p>
          <p className="lg:text-2xl kanit">and</p>
          <p className="text-xl lg:text-3xl kanit-lght">Your flimsy paper money is now worthless?</p>
          <p className="text-3xl lg:text-4xl kanit font-bold">
            Stock up on Wild Water Bottle Cap tokens to be brought into the future!
          </p>
        </div>

        <div className="rounded-lg bg-base-100 rounded-lg shadow-md shadow-secondary">
          <div className="lg:w-[620px]">
            <p className="text-4xl beerGlass text-center">What is it?</p>
            <p className="text-xl kanit text-center">
              {`A tokenized Real World Asset (RWA) where the supply of the token matches the actual number of bottle caps
            that Jacob Homanics owns in the physical world.`}
            </p>
          </div>

          <div className="lg:w-[620px]">
            <p className="text-4xl beerGlass text-center">How is it?</p>
            <p className="text-xl kanit text-center">
              {`Jacob loves his mineral water. Every Sunday he takes a a stroll down to the local supermarket to stock up on a 12ct pack of bottles. 
              After poppin' the top off, throughtout the week, he stores the bottle caps for safekeeping instead of throwing them in the trash. 
              "Who knows, maybe they'll be the currency of the future!" He thinks, as he plucks another bottle cap into the treasury.`}
            </p>
          </div>

          <div className="lg:w-[620px]">
            <p className="text-4xl beerGlass text-center">Why is it?</p>
            <p className="text-xl kanit text-center">
              {`This is a fun experiment that will help explore and discover what it means to be a Tokenized Real World
            Asset. It is designed to test and break the boundaries and processes for bringing Real World Assets onchain.`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
