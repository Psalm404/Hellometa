/*
burn.js 提供销毁代币的方法
需要一个传参：tokenId 需要销毁的NFT的tokenId
无返回值
*/


import contract from './contract';
import { getAccountAddr } from './getAccountAddr';

async function burn(tokenId) {
    try {
        if (!contract) {
            console.error('合约实例尚未初始化');
            throw new Error('Contract not initialized');
        }

        // 合约调用者的地址
        const addr = await getAccountAddr();
        console.log(addr);
        // 调用合约的 burn 函数
        const transaction = await contract.methods.burn(tokenId).send({ from: addr });
        console.log('代币销毁成功');
        return transaction;
    } catch (error) {
        console.error('代币销毁失败', error);
        throw error; // 重新抛出错误，以便在调用该函数时可以捕获并处理
    }
}

export default burn;
