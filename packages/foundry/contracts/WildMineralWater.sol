//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract WildMineralWater is ERC20, AccessControl {
    error WMW__MINTING_TOO_MANY_TOKENS();
    error WMW__NOT_ENOUGH_TIME_PASSED_TO_MINT();

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    uint256 s_maxMintAmount;
    uint256 s_lastMintTimestamp;
    uint256 s_mintTimeThreshold;

    constructor(
        address[] memory admins,
        address[] memory minters,
        uint256 mintTimeThreshold,
        uint256 maxMintAmount
    ) ERC20("Wild Water", "WMW") {
        for (uint256 i = 0; i < admins.length; i++) {
            grantRole(DEFAULT_ADMIN_ROLE, admins[i]);
        }

        for (uint256 i = 0; i < minters.length; i++) {
            grantRole(MINTER_ROLE, minters[i]);
        }

        s_mintTimeThreshold = mintTimeThreshold;
        s_maxMintAmount = maxMintAmount;
    }

    function mint(
        address target,
        uint256 amount
    ) external onlyRole(MINTER_ROLE) {
        if (amount > s_maxMintAmount) {
            revert WMW__MINTING_TOO_MANY_TOKENS();
        }

        if (s_lastMintTimestamp + s_mintTimeThreshold < block.timestamp) {
            revert WMW__NOT_ENOUGH_TIME_PASSED_TO_MINT();
        }

        _mint(target, amount);

        s_lastMintTimestamp = block.timestamp;
    }

    function setMintTimeThreshold(
        uint256 value
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        s_mintTimeThreshold = value;
    }

    function setMaxMintAmount(
        uint256 value
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        s_maxMintAmount = value;
    }

    function getMintTimeTreshold() external view returns (uint256) {
        return s_mintTimeThreshold;
    }

    function getMaxMintAmount() external view returns (uint256) {
        return s_maxMintAmount;
    }

    function getLastMintTimestamp() external view returns (uint256) {
        return s_lastMintTimestamp;
    }
}
