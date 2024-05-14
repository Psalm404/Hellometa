/*
getOwnedTokenIds.js提供获取指定的账户address已经成功上链的NFT的TokenID方法
函数有一个传参：address 指定的账户的地址
函数返回一个整数数组：uint256[] 表示指定的账户的所有的NFT的TokenID
*/

import contract from "./contract";  

async function getOwnedTokenIds(address) {
    try {
        if (!contract) {
            console.error('合约实例未初始化');
            return null;
        }

        // 调用合约的getOwnedTokenIds函数
        const tokenIds = await contract.methods.getOwnedTokenIds(address);
        return tokenIds;
    } catch (error) {
        console.error('获取指定账户的Token ID列表失败', error);
        return null;
    }
}

export default getOwnedTokenIds;