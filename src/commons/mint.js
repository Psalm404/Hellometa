/*
mint.js 提供创建代币的方法
需要两个传参：to 创建NFT的账户地址；tokenURI 图片等数据的URL
无返回值  ->成功返回true，失败返回false
*/

import contract from './contract';
import { getAccountAddr } from './getAccountAddr';
import saveTransactionHash from '@/commons/saveTransactionHash'
import Web3 from 'web3';

async function mint(to, tokenURI, price) {
    try {
        if (!contract) {
            console.error('合约实例尚未初始化');
            return;
        }
        
        // 合约调用者的地址
        const addr = await getAccountAddr();

        const priceWei = Web3.utils.toWei(price, 'ether')
        // const priceEth = Web3.utils.toEth(priceWei,'ether')
        // 调用合约的mint函数
        await contract.methods.mint(to, tokenURI, priceWei).send({ from: addr })
        .on('receipt', function(receipt){
            saveTransactionHash(receipt.transactionHash, tokenURI);
            alert('Transaction sent! Hash: ' + receipt.transactionHash);
        })
        .on('error', function(error) { 
            console.log(error);
        });
        console.log('代币铸造成功');
        return true

    } catch (error) {
        console.error('代币铸造失败', error);
        return false
    }
}

export default mint;
