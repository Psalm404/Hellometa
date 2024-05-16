/*
getURLbyTokenId.js提供根据TokenId查询对应的URL方法
函数一个传参：uint256 所需要查询的TokenId
函数返回一个字符串：URL string TokenId所对应的URL
*/

import contract from './contract';

async function getURLbyTokenId(tokenId) {
    try {
        if (!contract) {
            console.error('合约实例尚未初始化');
            return null;
        }

        // 调用合约的getURLbyTokenId函数
        const URL = await contract.methods.getURLbyTokenId(tokenId).call();
        return URL;
    } catch (error) {
        console.error('根据代币ID查询URL失败', error);
        return null;
    }
}

export default getURLbyTokenId;
