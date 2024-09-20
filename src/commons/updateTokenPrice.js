import contract from './contract';
import Web3 from 'web3';
import { getAccountAddr } from './getAccountAddr';

async function updateTokenPrice(tokenId, newPrice) {
    try {
        if (!contract) {
            console.error('合约实例尚未初始化');
            throw new Error('Contract not initialized');
        }

        // 合约调用者的地址
        const addr = await getAccountAddr();
        console.log(addr);

        const newPriceWei = Web3.utils.toWei(newPrice, 'ether')
        console.log('new',newPriceWei)
        const transaction = await contract.methods.updateTokenPrice(tokenId, newPriceWei).send({ from: addr });
        console.log('代币价格修改成功');
        return transaction;
    } catch (error) {
        console.error('代币价格修改失败', error);
        throw error; // 重新抛出错误，以便在调用该函数时可以捕获并处理
    }
}

export default updateTokenPrice;
