/*
getMyURLs.js提供获取当前账户已经成功上链的NFT的URL方法
函数无传参
函数返回一个整数数组：string[] 表示当前账户的所有NFT的URL
*/

import contract from "./contract";  
import { getAccountAddr } from "./getAccountAddr";

async function getMyURLs() {
    try {
        if (!contract) {
            console.error('合约实例未初始化');
            return null;
        }
        
        // 获取当前调用者的地址
        const addr = await getAccountAddr()
        // 调用合约的getMyURLs函数
        const URLs = await contract.methods.getMyURLs().call({ from: addr});
        return URLs;
    } catch (error) {
        console.error('获取当前Token URL列表失败', error);
        return null;
    }
}

export default getMyURLs;