//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/YourContract.sol";
import "../contracts/WildWaterBottleCapToken.sol";

import "./DeployHelpers.s.sol";

contract DeployScript is ScaffoldETHDeploy {
    error InvalidPrivateKey(string);

    function run() external {
        uint256 deployerPrivateKey = setupLocalhostEnv();
        if (deployerPrivateKey == 0) {
            revert InvalidPrivateKey(
                "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
            );
        }

        address[] memory admins = new address[](1);
        admins[0] = 0xc689c800a7121b186208ea3b182fAb2671B337E7;
        address[] memory minters = new address[](1);
        minters[0] = 0xc689c800a7121b186208ea3b182fAb2671B337E7;

        vm.startBroadcast(deployerPrivateKey);
        WildWaterBottleCapToken yourContract = new WildWaterBottleCapToken(
            admins,
            minters
        );
        console.logString(
            string.concat(
                "YourContract deployed at: ",
                vm.toString(address(yourContract))
            )
        );
        vm.stopBroadcast();

        /**
         * This function generates the file containing the contracts Abi definitions.
         * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
         * This function should be called last.
         */
        exportDeployments();
    }

    function test() public {}
}
