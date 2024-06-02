//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract CARBONATE is ERC20, AccessControl {
    constructor(address admin) ERC20("Carbonate", "CARB") {
        grantRole(DEFAULT_ADMIN_ROLE, admin);
    }

    function mint(
        address target,
        uint256 amount
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _mint(target, amount);
    }
}
