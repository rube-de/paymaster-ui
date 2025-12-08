// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.28;

import "@oasisprotocol/sapphire-contracts/contracts/Sapphire.sol";

contract Raffle {
    uint256 public unlockTime;
    address payable[] public players;

    constructor() payable {
        unlockTime = block.timestamp + 2 weeks;
    }

    function enter() public payable {
        require(block.timestamp < unlockTime, "too late");
        // TODO: value === 250
        require(msg.value > .01 ether, "incorrect amount");
        require(players.length < 3600 ether, "exceeded max players");
        players.push(payable(msg.sender));
    }

    function pickWinner() public {
        require(block.timestamp >= unlockTime, "not yet");
        uint256 index = random() % players.length;
        players[index].transfer(address(this).balance);
        players = new address payable[](0);
    }

    function random() private view returns (uint256) {
        return uint256(bytes32(Sapphire.randomBytes(32, "")));
    }

    function countPlayers() public view returns (uint256) {
        return players.length;
    }
}
