// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import { UD60x18, ud, add, mul, ln, unwrap } from "@prb/math/src/UD60x18.sol";

contract PenXKey is ERC721, ERC721URIStorage, ERC721Enumerable, ERC721Burnable, Ownable {
  uint256 public _maxTokenId = 0;

  string public baseURI;

  event NFTMinted(address indexed owner, uint256 indexed tokenId);

  constructor(address initialOwner, string memory _baseURI) ERC721("PenX Key", "PXK") Ownable(initialOwner) {
    baseURI = _baseURI;
  }

  function mintKey() external payable {
    _mintNFT();
  }

  function burnKey(uint256 amount) external {
    uint256 balance = balanceOf(msg.sender);
    require(amount <= balance, "Key balance not enough");

    for (uint256 i = 0; i < amount; i++) {
      // console.log("====getBurnPrice():", getBurnPrice());
      _safeTransferETH(msg.sender, getBurnPrice());
      uint256 tokenId = tokenOfOwnerByIndex(msg.sender, i);
      _burn(tokenId);
    }
  }

  function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    return super.tokenURI(tokenId);
  }

  function getPrice(uint256 x) public pure returns (uint256) {
    return _calculatePrice(x);
  }

  function getMintPrice() public view returns (uint256) {
    return _calculatePrice(totalSupply() + 1);
  }

  function getBurnPrice() public view returns (uint256) {
    return _calculatePrice(totalSupply() - 1);
  }

  function maxTokenId() public view returns (uint256) {
    return _maxTokenId;
  }

  function getBalance() public view returns (uint) {
    return address(this).balance;
  }

  function _getTokenURI(uint256 tokenId) internal view returns (string memory) {
    string memory postfix = ".json";
    return string(abi.encodePacked(baseURI, Strings.toString(uint256(tokenId)), postfix));
  }

  function _mintNFT() internal {
    require(msg.value >= getMintPrice(), "Insufficient payment");

    // console.log("===getMintPrice():", getMintPrice());

    uint256 tokenId = _maxTokenId;
    string memory uri = _getTokenURI(tokenId);

    _safeMint(msg.sender, tokenId);
    _setTokenURI(tokenId, uri);

    _maxTokenId++;
    emit NFTMinted(msg.sender, tokenId);
  }

  /**
   * P(y)= 0.2 * ln(0.01 * x + 1) + 0.1
   *
   * @param x totalSupply
   */
  function _calculatePrice(uint256 x) internal pure returns (uint256) {
    // Convert constants to 60.18-decimal fixed-point format
    uint256 constant1 = 2 * 10 ** 17;
    uint256 constant2 = 1 * 10 ** 17;
    uint256 factor = 0.01 * 10 ** 18; // 0.01 in 60.18-decimal fixed-point format

    // Calculate the argument for the natural logarithm
    UD60x18 argument = ud(factor * x + 10 ** 18); // 1 in 60.18-decimal fixed-point format

    // Calculate the natural logarithm
    UD60x18 lnValue = ln(argument);

    // Calculate the final price
    UD60x18 result = ud(constant1) * lnValue + ud(constant2);

    return result.unwrap();
  }

  function supportsInterface(
    bytes4 interfaceId
  ) public view override(ERC721, ERC721URIStorage, ERC721Enumerable) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  function _update(
    address to,
    uint256 tokenId,
    address auth
  ) internal override(ERC721, ERC721Enumerable) returns (address) {
    return super._update(to, tokenId, auth);
  }

  function _increaseBalance(address account, uint128 value) internal override(ERC721, ERC721Enumerable) {
    super._increaseBalance(account, value);
  }

  /**
   * @notice Transfers ETH to the recipient address
   * @param to The destination of the transfer
   * @param value The value to be transferred
   * @dev Fails with `ETH transfer failed`
   */
  function _safeTransferETH(address to, uint256 value) internal {
    if (value > 0) {
      (bool success, ) = to.call{ value: value }(new bytes(0));
      require(success, "ETH transfer failed");
    }
  }
}
