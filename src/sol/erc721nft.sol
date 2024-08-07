// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

// ERC 165 标准接口
interface IERC165 {
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}

// ERC 721 标准接口
interface IERC721 is IERC165 {
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    function balanceOf(address owner) external view returns (uint256 balance);
    function ownerOf(uint256 tokenId) external view returns (address owner);
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
    function transferFrom(address from, address to, uint256 tokenId) external;
    function approve(address to, uint256 tokenId) external;
    function getApproved(uint256 tokenId) external view returns (address operator);
    function setApprovalForAll(address operator, bool _approved) external;
    function isApprovedForAll(address owner, address operator) external view returns (bool);
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external;
}

// 支持 接收 NFT
interface IERC721Receiver {
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4);
}

contract ERC721 is IERC721 {
    using Address for address;

    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => string) private _tokenURLs;
    mapping(string => uint256) private _urlToTokenId;
    mapping(address => uint256[]) private _ownedTokens;
    mapping(address => string[]) private _ownedURLs;
    mapping(string => bytes32) public tokenHashes;
    uint256[] private _allTokenIds;
    mapping(uint256 => uint256) private _allTokenIdsIndex;
    mapping(uint256 => address) private _tokenApprovals;
    mapping(uint256 => uint256) private _tokenPrices;

    event TokenURLSet(uint256 indexed tokenId, string url);
    event TokenPriceSet(uint256 indexed tokenId, uint256 price);
    // 事件来通知价格更改
    event TokenPriceUpdated(uint256 indexed tokenId, uint256 newPrice);

    function supportsInterface(bytes4 interfaceId) public pure override returns (bool) {
        return interfaceId == type(IERC721).interfaceId;
    }

    function balanceOf(address owner) external view override returns (uint256) {
        require(owner != address(0), "owner = zero address");
        return _balances[owner];
    }

    function ownerOf(uint256 tokenId) public view override returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "token doesn't exist");
        return owner;
    }

    function ownerOfURL(string memory tokenURI) public view returns (address) {
        uint256 tokenId = _urlToTokenId[tokenURI];
        return ownerOf(tokenId);
    }

    function _exists(uint256 tokenId) private view returns (bool) {
        return _owners[tokenId] != address(0);
    }

    function _mint(address to, uint256 tokenId) private {
        require(to != address(0), "mint to zero address");
        require(!_exists(tokenId), "token already minted");

        _balances[to] += 1;
        _owners[tokenId] = to;

        _allTokenIds.push(tokenId);
        _allTokenIdsIndex[tokenId] = _allTokenIds.length - 1;

        emit Transfer(address(0), to, tokenId);
    }

    function _setTokenURL(uint256 tokenId, string memory tokenURI) internal {
        require(_exists(tokenId), "URL set of nonexistent token");
        _tokenURLs[tokenId] = tokenURI;
        emit TokenURLSet(tokenId, tokenURI);
    }

    function mint(address to, string memory tokenURI, uint256 price) public {
        bytes32 hash = keccak256(abi.encodePacked(tokenURI));
        uint256 newTokenId = uint256(hash);

        _mint(to, newTokenId);

        _setTokenURL(newTokenId, tokenURI);
        _urlToTokenId[tokenURI] = newTokenId;
        _ownedTokens[to].push(newTokenId);
        _ownedURLs[to].push(tokenURI);

        _setTokenPrice(newTokenId, price);
    }

    function _setTokenPrice(uint256 tokenId, uint256 price) internal {
        require(_exists(tokenId), "URL set of nonexistent token");
        _tokenPrices[tokenId] = price;
        emit TokenPriceSet(tokenId, price);
    }

    function getTokenPrice(uint256 tokenId) public view returns (uint256) {
        require(_exists(tokenId), "Price query for nonexistent token");
        return _tokenPrices[tokenId];
    }

     // 新增一个函数来返回所有price不为0的nft的url
    function getActiveNFTsURLs() public view returns (string[] memory) {
        uint256 totalSupply = _allTokenIds.length;
        uint256 activeCount = 0;

        // 首先计算价格不为0的NFT的数量
        for (uint256 i = 0; i < totalSupply; i++) {
            uint256 tokenId = _allTokenIds[i];
            if (_tokenPrices[tokenId] != 0) {
                activeCount++;
            }
        }

        // 创建一个新数组来存储价格不为0的NFT的URL
        string[] memory activeNFTsURLs = new string[](activeCount);

        // 填充数组
        uint256 index = 0;
        for (uint256 i = 0; i < totalSupply; i++) {
            uint256 tokenId = _allTokenIds[i];
            if (_tokenPrices[tokenId] != 0) {
                activeNFTsURLs[index] = _tokenURLs[tokenId];
                index++;
            }
        }

        return activeNFTsURLs;
    }

    // 新增一个函数来返回所有price不为0的nft的tokenID
    function getActiveNFTsTokenIds() public view returns (uint256[] memory) {
        uint256 totalSupply = _allTokenIds.length;
        uint256 activeCount = 0;

        // 首先计算价格不为0的NFT的数量
        for (uint256 i = 0; i < totalSupply; i++) {
            uint256 tokenId = _allTokenIds[i];
            if (_tokenPrices[tokenId] != 0) {
                activeCount++;
            }
        }

        // 创建一个新数组来存储价格不为0的NFT的tokenID
        uint256[] memory activeNFTsTokenIds = new uint256[](activeCount);

        // 填充数组
        uint256 index = 0;
        for (uint256 i = 0; i < totalSupply; i++) {
            uint256 tokenId = _allTokenIds[i];
            if (_tokenPrices[tokenId] != 0) {
                activeNFTsTokenIds[index] = tokenId;
                index++;
            }
        }

        return activeNFTsTokenIds;
    }

    // 更改NFT价格的函数
    function updateTokenPrice(uint256 tokenId, uint256 newPrice) external {
        require(_exists(tokenId), "Token does not exist");
        require(_isApprovedOrOwner(msg.sender, tokenId), "Not owner nor approved");

        _tokenPrices[tokenId] = newPrice;
        emit TokenPriceUpdated(tokenId, newPrice);
    }

    function getURLbyTokenId(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "URL query for nonexistent token");
        return _tokenURLs[tokenId];
    }

    function getTokenIdbyURL(string memory tokenURI) public view returns (uint256) {
        uint256 tokenId = _urlToTokenId[tokenURI];
        require(_exists(tokenId), "Token with this URL does not exist");
        return tokenId;
    }

    function burn(uint256 tokenId) external {
        address owner = ownerOf(tokenId);
        require(msg.sender == owner, "not owner of token");

        _balances[owner] -= 1;
        delete _owners[tokenId];

        string memory tokenURL = _tokenURLs[tokenId];
        delete _tokenURLs[tokenId];
        delete _urlToTokenId[tokenURL];
        delete _tokenPrices[tokenId];

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

        uint256 indexToRemove = _allTokenIdsIndex[tokenId];
        uint256 lastIndex = _allTokenIds.length - 1;
        uint256 lastTokenId = _allTokenIds[lastIndex];
        _allTokenIds[indexToRemove] = lastTokenId;
        _allTokenIdsIndex[lastTokenId] = indexToRemove;
        _allTokenIds.pop();
        delete _allTokenIdsIndex[tokenId];

        emit Transfer(owner, address(0), tokenId);
    }

    function transferFrom(address from, address to, uint256 tokenId) public override {
        require(_isApprovedOrOwner(msg.sender, tokenId), "ERC721: transfer caller is not owner nor approved");
        _transfer(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) public override {
        safeTransferFrom(from, to, tokenId, "");
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public override {
        require(_isApprovedOrOwner(msg.sender, tokenId), "ERC721: transfer caller is not owner nor approved");
        _safeTransfer(from, to, tokenId, _data);
    }

    function _transfer(address from, address to, uint256 tokenId) internal {
        require(ownerOf(tokenId) == from, "ERC721: transfer from incorrect owner");
        require(to != address(0), "ERC721: transfer to the zero address");

        _approve(address(0), tokenId);

        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;

        _removeTokenFromOwnerEnumeration(from, tokenId);
        _addTokenToOwnerEnumeration(to, tokenId);

        _removeURLFromOwnerEnumeration(from, tokenId);
        _addURLToOwnerEnumeration(to, tokenId);

        emit Transfer(from, to, tokenId);
    }

    function _safeTransfer(address from, address to, uint256 tokenId, bytes memory _data) internal {
        _transfer(from, to, tokenId);
        require(_checkOnERC721Received(from, to, tokenId, _data), "ERC721: transfer to non ERC721Receiver implementer");
    }

    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view returns (bool) {
        require(_exists(tokenId), "ERC721: operator query for nonexistent token");
        address owner = ownerOf(tokenId);
        return (spender == owner || getApproved(tokenId) == spender);
    }

    function _checkOnERC721Received(address from, address to, uint256 tokenId, bytes memory _data) private returns (bool) {
        if (to.isContract()) {
            try IERC721Receiver(to).onERC721Received(msg.sender, from, tokenId, _data) returns (bytes4 retval) {
                return retval == IERC721Receiver.onERC721Received.selector;
            } catch (bytes memory reason) {
                if (reason.length == 0) {
                    revert("ERC721: transfer to non ERC721Receiver implementer");
                } else {
                    assembly {
                        revert(add(32, reason), mload(reason))
                    }
                }
            }
        } else {
            return true;
        }
    }

    function approve(address to, uint256 tokenId) public override {
        address owner = ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");
        require(msg.sender == owner, "ERC721: approve caller is not owner");

        _approve(to, tokenId);
    }

    function _approve(address to, uint256 tokenId) internal {
        _tokenApprovals[tokenId] = to;
        emit Approval(ownerOf(tokenId), to, tokenId);
    }

    function getApproved(uint256 tokenId) public view override returns (address) {
        require(_exists(tokenId), "ERC721: approved query for nonexistent token");
        return _tokenApprovals[tokenId];
    }

    function setApprovalForAll(address operator, bool approved) public override {
        require(operator != msg.sender, "ERC721: approve to caller");
        _operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function isApprovedForAll(address owner, address operator) public view override returns (bool) {
        return _operatorApprovals[owner][operator];
    }

    function getOwnedTokenIds(address owner) public view returns (uint256[] memory) {
        require(owner != address(0), "owner = zero address");
        return _ownedTokens[owner];
    }

    function getOwnedURLs(address owner) public view returns (string[] memory) {
        require(owner != address(0), "owner = zero address");
        return _ownedURLs[owner];
    }

    function getMyTokenIds() public view returns (uint256[] memory) {
        return _ownedTokens[msg.sender];
    }

    function getMyURLs() public view returns (string[] memory) {
        return _ownedURLs[msg.sender];
    }

    function getAllTokenIds() public view returns (uint256[] memory) {
        return _allTokenIds;
    }

    function getAllURLs() public view returns (string[] memory) {
        string[] memory urls = new string[](_allTokenIds.length);
        for (uint256 i = 0; i < _allTokenIds.length; i++) {
            uint256 tokenId = _allTokenIds[i];
            urls[i] = _tokenURLs[tokenId];
        }
        return urls;
    }

    function setTransactionHash(string memory tokenURI, bytes32 txhash) public {
        tokenHashes[tokenURI] = txhash;
    }

    function getTransactionHash(string memory tokenURI) public view returns (bytes32) {
        return tokenHashes[tokenURI];
    }

    mapping(address => mapping(address => bool)) private _operatorApprovals;

    function _removeTokenFromOwnerEnumeration(address from, uint256 tokenId) private {
        uint256[] storage tokens = _ownedTokens[from];
        for (uint256 i = 0; i < tokens.length; i++) {
            if (tokens[i] == tokenId) {
                tokens[i] = tokens[tokens.length - 1];
                tokens.pop();
                break;
            }
        }
    }

    function _addTokenToOwnerEnumeration(address to, uint256 tokenId) private {
        _ownedTokens[to].push(tokenId);
    }

    function _removeURLFromOwnerEnumeration(address from, uint256 tokenId) private {
        string memory tokenURL = _tokenURLs[tokenId];
        string[] storage urls = _ownedURLs[from];
        for (uint256 i = 0; i < urls.length; i++) {
            if (keccak256(abi.encodePacked(urls[i])) == keccak256(abi.encodePacked(tokenURL))) {
                urls[i] = urls[urls.length - 1];
                urls.pop();
                break;
            }
        }
    }

    function _addURLToOwnerEnumeration(address to, uint256 tokenId) private {
        string memory tokenURL = _tokenURLs[tokenId];
        _ownedURLs[to].push(tokenURL);
    }

    function buyNFT(uint256 tokenId) external payable {
        uint256 price = _tokenPrices[tokenId];
        address owner = ownerOf(tokenId);
        require(msg.value == price, "Incorrect Ether value sent");
        require(owner != address(0), "Token does not exist");
        require(owner != msg.sender, "Buyer is already the owner");

        // Clear the price before transferring to avoid re-entrancy issues
        _tokenPrices[tokenId] = 0;

        // Transfer the NFT to the buyer
        _transfer(owner, msg.sender, tokenId);

        // Transfer Ether to the owner
        payable(owner).transfer(msg.value);
    }

}

library Address {
    function isContract(address account) internal view returns (bool) {
        uint size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
