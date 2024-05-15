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
            return;
        }

        // 合约调用者的地址
        const addr = await getAccountAddr();
        console.log(addr)
        // 调用合约的burn函数
        await contract.methods.burn(tokenId).send({ from: addr });
        console.log('代币销毁成功');
    } catch (error) {
        console.error('代币销毁失败', error);
    }
}

export default burn;
