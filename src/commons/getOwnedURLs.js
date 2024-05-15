/*
getOwnedURLs.js提供获取指定的账户已经成功上链的NFT的URL方法
函数无传参
函数返回一个整数数组：string[] 表示指定的账户的所有NFT的URL
*/

import contract from "./contract";  

async function getOwnedURLs(address) {
    try {
        if (!contract) {
            console.error('合约实例未初始化');
            return null;
        }

        const URLs = await contract.methods.getOwnedURLs(address).call();
        return URLs;
    } catch (error) {
        console.error('获取当前Token URL列表失败', error);
        return null;
    }
}

export default getOwnedURLs;