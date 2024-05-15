/*
getTokenIdbyURL.js提供根据URL查询对应的TokenId方法
函数一个传参：tokenURI string 所需要查询的URL
函数返回一个整数：uint256 tokenURI对应的TokenId
*/

import contract from './contract';

async function getTokenIdbyURL(tokenURI) {
    try {
        if (!contract) {
            console.error('合约实例尚未初始化');
            return null;
        }

        // 调用合约的getTokenIdbyURL函数
        const tokenId = await contract.methods.getTokenIdbyURL(tokenURI).call();
        return tokenId;
    } catch (error) {
        console.error('根据URL查询代币ID失败', error);
        return null;
    }
}

export default getTokenIdbyURL;
