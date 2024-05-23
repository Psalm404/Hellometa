/*
mint.js 提供创建代币的方法
需要两个传参：to 创建NFT的账户地址；tokenURI 图片等数据的URL
无返回值
*/

import contract from './contract';
import { getAccountAddr } from './getAccountAddr';
import setTransactionHash from '@/commons/setTransactionHash'

async function mint(to, tokenURI) {
    try {
        if (!contract) {
            console.error('合约实例尚未初始化');
            return;
        }
        
        // 合约调用者的地址
        const addr = await getAccountAddr();

        // 调用合约的mint函数
        await contract.methods.mint(to, tokenURI).send({ from: addr })
        .on('receipt', function(receipt){
            setTransactionHash(tokenURI, receipt.transactionHash);
        })
        .on('error', function(error) { 
            console.log(error);
        });
        console.log('代币铸造成功');

    } catch (error) {
        console.error('代币铸造失败', error);
    }
}

export default mint;
