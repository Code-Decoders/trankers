// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./SpaceOzToken.sol";

contract SpaceOzInventory is ERC1155, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => uint256) private _tokenPrices;
    mapping(uint256 => uint256) private _tokenPricesInSPT;

    address token;

    constructor(address token_)
        ERC1155("https://spaceoz.netlify.app/api/item/{id}.json")
    {
        token = token_;
    }

    function updateToken(address token_) public onlyOwner {
        token = token_;
    }

    function mint(uint256 price, uint256 priceInSPT) public onlyOwner {
        require(msg.sender != address(0), "to address is invalid");
        require(price > 0, "amount is invalid");
        _tokenIds.increment();
        _tokenPrices[_tokenIds.current()] = price;
        _tokenPricesInSPT[_tokenIds.current()] = priceInSPT;
        _mint(msg.sender, _tokenIds.current(), 1, "");
    }

    function mint(uint256 token_id) public payable {
        require(msg.sender != address(0), "to address is invalid");
        require(token_id > 0, "token id is invalid");
        require(balanceOf(msg.sender, token_id) == 0, "already minted");
        if (_tokenPrices[token_id] == msg.value) {
            _mint(msg.sender, token_id, 1, "");
        } else {
            SpaceOzToken(token).burnFrom(
                msg.sender,
                _tokenPricesInSPT[token_id]
            );
            _mint(msg.sender, token_id, 1, "");
        }
    }
}
