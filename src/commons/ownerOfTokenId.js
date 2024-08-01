/*
ownerOfTokenId.js提供根据TokenId查询对应的拥有者owner的方法
函数一个传参：uint256 所需要查询的TokenId
函数返回一个字符串：address TokenId所对应的拥有者的地址
*/

import contract from './contract';

async function ownerOfTokenId(tokenId) {
    try {
        if (!contract) {
            console.error('合约实例尚未初始化');
            return null;
        }

        // 调用合约的ownerOfTokenId函数
        const owner = await contract.methods.ownerOf(tokenId).call();
        return owner;
    } catch (error) {
        console.error('查询代币所有者地址失败', error);
        return null;
    }
}

export default ownerOfTokenId;
