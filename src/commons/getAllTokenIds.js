/*
getAllTokenIds.js提供获取所有账户已经成功上链的NFT的TokenID方法
函数无传参
函数返回一个整数数组：uint256[] 表示所有的NFT的TokenID
*/

import contract from "./contract";  

async function getAllTokenIds() {
    try {
        if (!contract) {
            console.error('合约实例未初始化');
            return null;
        }

        // 调用合约的getAllTokenIds函数
        const tokenIds = await contract.methods.getAllTokenIds();
        return tokenIds;
    } catch (error) {
        console.error('获取所有Token ID列表失败', error);
        return null;
    }
}

export default getAllTokenIds;