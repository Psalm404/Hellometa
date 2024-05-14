/*
getAllURLs.js提供获取所有账户已经成功上链的NFT的URL方法
函数无传参
函数返回一个整数数组：string[] 表示所有的NFT的URL
*/

import contract from "./contract";  

async function getAllURLs() {
    try {
        if (!contract) {
            console.error('合约实例未初始化');
            return null;
        }

        // 调用合约的getAllURLs函数
        const URLs = await contract.methods.getAllURLs();
        return URLs;
    } catch (error) {
        console.error('获取所有Token URL列表失败', error);
        return null;
    }
}

export default getAllURLs;