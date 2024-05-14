/*
getMyTokenIds.js提供获取当前账户已经成功上链的NFT的TokenID方法
函数无传参
函数返回一个整数数组：uint256[] 表示当前账户的所有的NFT的TokenID
*/

import contract from "./contract";  

async function getMyTokenIds() {
    try {
        if (!contract) {
            console.error('合约实例未初始化');
            return null;
        }

        // 调用合约的getMyTokenIds函数
        const tokenIds = await contract.methods.getMyTokenIds();
        return tokenIds;
    } catch (error) {
        console.error('获取当前Token ID列表失败', error);
        return null;
    }
}

export default getMyTokenIds;