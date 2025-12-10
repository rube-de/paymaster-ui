// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.28;

/// @title RoffleConstants - Configuration constants for the Roffle contract
/// @author Oasis Protocol Foundation
library RoffleConstants {
    /// @notice Cost of a single ticket in ROSE (250 ROSE)
    uint256 internal constant TICKET_PRICE = 250 ether;

    /// @notice Maximum tickets a single wallet can purchase
    uint256 internal constant MAX_TICKETS_PER_WALLET = 10;

    /// @notice Maximum total tickets available for sale
    uint256 internal constant MAX_TOTAL_TICKETS = 3600;

    /// @notice Number of winners to be selected
    uint256 internal constant WINNER_COUNT = 10;

    /// @notice Default raffle duration (1 week)
    uint256 internal constant DEFAULT_DURATION = 1 weeks;

    /// @notice Basis points denominator (100% = 10000)
    uint256 internal constant BASIS_POINTS = 10000;

    /// @notice Get prize percentage for a given rank
    /// @param rank Winner rank (0-9)
    /// @return Prize percentage in basis points
    function getPrizePercentage(uint256 rank) internal pure returns (uint256) {
        if (rank == 0) return 5000;
        if (rank == 1) return 2000;
        if (rank == 2) return 1000;
        if (rank == 3) return 500;
        if (rank == 4) return 500;
        return 200;
    }
}
