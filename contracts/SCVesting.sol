// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.8.18;

import "./Vesting.sol";

contract SCVesting {
    receive() external payable {
        // This function is called when Ether is sent to the contract.
        // You can add custom logic here, if needed.
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function fundVestingFromContractWithoutApproval(
        address vestingAddress,
        uint64 startTime,
        Period[] calldata lockupPeriods,
        Period[] calldata vestingPeriods
    ) external {
        VESTING_CONTRACT.fundVestingAccount(
            address(this),
            vestingAddress,
            startTime,
            lockupPeriods,
            vestingPeriods
        );
    }

    function approve() external {
        bool approved = VESTING_CONTRACT.approve(
            address(this),
            MSG_FUND_VESTING_ACCOUNT
        );
        require(approved, "Approval was not successfull");
    }

    function fundVestingFromContractWithtApproval(
        address vestingAddress,
        uint64 startTime,
        Period[] calldata lockupPeriods,
        Period[] calldata vestingPeriods
    ) external {
        bool approved = VESTING_CONTRACT.approve(
            address(this),
            MSG_FUND_VESTING_ACCOUNT
        );
        require(approved, "Approval was not successfull");

        VESTING_CONTRACT.fundVestingAccount(
            address(this),
            vestingAddress,
            startTime,
            lockupPeriods,
            vestingPeriods
        );
    }
}
