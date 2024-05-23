// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

// ERC 165 标准接口
interface IERC165 {}

// ERC 721 标准接口
interface IERC721 is IERC165 {
    function balanceOf(address owner) external view returns (uint balance);

    function ownerOfTokenId(uint tokenId) external view returns (address owner);
}

contract ERC721 is IERC721 {
    
    using Address for address;

    // Mapping from token ID to owner address
    mapping(uint => address) private _owners;

    // Mapping owner address to token count
    mapping(address => uint) private _balances;

    // Mapping from tokenId to picture URL
    mapping(uint256 => string) private _tokenURLs;

    // Mapping from URL to token ID
    mapping(string => uint256) private _urlToTokenId;

    // Mapping from address to array of owned token IDs
    mapping(address => uint256[]) private _ownedTokens;

    // Mapping from address to array of owned URLs
    mapping(address => string[]) private _ownedURLs;

    // Array to store all token IDs
    uint256[] private _allTokenIds;

    // Mapping from token Id to index in _allTokenIds array
    mapping(uint256 => uint256) private _allTokenIdsIndex;
    
    // Event triggered when setting token URL
    event TokenURLSet(uint256 indexed tokenId, string url);

    // Private function _mint to mint NFTs by address and tokenId
    function _mint(address to, uint tokenId) private {
        require(to != address(0), "mint to zero address");
        require(_owners[tokenId] == address(0), "token already minted");

        _balances[to] += 1;
        _owners[tokenId] = to;

        // Add tokenId to _allTokenIds array
        _allTokenIds.push(tokenId);
        _allTokenIdsIndex[tokenId] = _allTokenIds.length - 1;
    }

    // Internal function to set token URL
    function _setTokenURL(uint256 tokenId, string memory tokenURI) internal {
        require(_exists(tokenId), "URL set of nonexistent token");
        _tokenURLs[tokenId] = tokenURI;
        emit TokenURLSet(tokenId, tokenURI);
    }
    
    // Function to mint NFTs by address and picture URL
    function mint(address to, string memory tokenURI) public {
        bytes32 hash = keccak256(abi.encodePacked(tokenURI));
        uint256 newTokenId = uint256(hash);

        _mint(to, newTokenId);

        _setTokenURL(newTokenId, tokenURI);
        _urlToTokenId[tokenURI] = newTokenId;
        _ownedTokens[to].push(newTokenId);
        _ownedURLs[to].push(tokenURI);
    }
    
    // Function to get token URL by tokenId
    function getURLbyTokenId(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "URL query for nonexistent token");
        return _tokenURLs[tokenId];
    }

    // Function to get tokenId by URL
    function getTokenIdbyURL(string memory tokenURI) public view returns (uint256) {
        uint256 tokenId = _urlToTokenId[tokenURI];
        require(_exists(tokenId), "Token with this URL does not exist");

        return tokenId;
    }

    // Function to burn NFTs
    function burn(uint256 tokenId) external {
        address owner = ownerOfTokenId(tokenId);
        require(msg.sender == owner, "not owner of token");

        _balances[owner] -= 1;
        delete _owners[tokenId];

        string memory tokenURL = _tokenURLs[tokenId];
        delete _tokenURLs[tokenId];
        delete _urlToTokenId[tokenURL];

        uint256[] storage ownedTokens = _ownedTokens[owner];
        for (uint256 i = 0; i < ownedTokens.length; i++) {
            if (ownedTokens[i] == tokenId) {
                ownedTokens[i] = ownedTokens[ownedTokens.length - 1];
                ownedTokens.pop();
                break;
            }
        }

        string[] storage ownedURLs = _ownedURLs[owner];
        for (uint256 i = 0; i < ownedURLs.length; i++) {
            if (keccak256(abi.encodePacked(ownedURLs[i])) == keccak256(abi.encodePacked(tokenURL))) {
                ownedURLs[i] = ownedURLs[ownedURLs.length - 1];
                ownedURLs.pop();
                break;
            }
        }

        // Remove tokenId from _allTokenIds array
        uint256 indexToRemove = _allTokenIdsIndex[tokenId];
        uint256 lastIndex = _allTokenIds.length - 1;
        uint256 lastTokenId = _allTokenIds[lastIndex];
        _allTokenIds[indexToRemove] = lastTokenId;
        _allTokenIdsIndex[lastTokenId] = indexToRemove;
        _allTokenIds.pop();
        delete _allTokenIdsIndex[tokenId];
    }

    // Private function to check if token exists
    function _exists(uint256 tokenId) private view returns (bool) {
        return _owners[tokenId] != address(0);
    }

    // Function to get the total count of tokens owned by owner
    function balanceOf(address owner) external view override returns (uint) {
        require(owner != address(0), "owner = zero address");
        return _balances[owner];
    }

    // Function to determine owner by tokenId
    function ownerOfTokenId(uint tokenId) public view override returns (address owner) {
        owner = _owners[tokenId];
        require(owner != address(0), "token doesn't exist");
    }

    // Function to determine owner by URL
    function ownerOfURL(string memory tokenURI) public view returns (address) {
        uint256 token_Id = _urlToTokenId[tokenURI];
        require(_exists(token_Id), "Token with this URL does not exist");

        return _owners[token_Id];
    }

    // Function to get all token IDs owned by specified owner
    function getOwnedTokenIds(address owner) public view returns (uint256[] memory) {
        require(owner != address(0), "owner = zero address");
        return _ownedTokens[owner];
    }

    // Function to get all URLs owned by specified owner
    function getOwnedURLs(address owner) public view returns (string[] memory) {
        require(owner != address(0), "owner = zero address");
        return _ownedURLs[owner];
    }

    // Function to get all token IDs owned by current owner
    function getMyTokenIds() public view returns (uint256[] memory) {
        return _ownedTokens[msg.sender];
    }

    // Function to get all URLs owned by current owner
    function getMyURLs() public view returns (string[] memory) {
        return _ownedURLs[msg.sender];
    }

    // Function to get all token IDs
    function getAllTokenIds() public view returns (uint256[] memory) {
        return _allTokenIds;
    }

    // Function to get all URLs
    function getAllURLs() public view returns (string[] memory) {
        string[] memory urls = new string[](_allTokenIds.length);
        for (uint256 i = 0; i < _allTokenIds.length; i++) {
            uint256 tokenId = _allTokenIds[i];
            urls[i] = _tokenURLs[tokenId];
        }
        return urls;
    }
}

// Library to check if address is a contract address
library Address {
    function isContract(address account) internal view returns (bool) {
        uint size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
