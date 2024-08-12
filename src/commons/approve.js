import contract from './contract';
import { getAccountAddr } from './getAccountAddr';

async function approve(to, tokenId) {
    try {
        if (!contract) {
            console.error('合约实例尚未初始化');
            throw new Error('Contract not initialized');
        }

        const addr = await getAccountAddr();

        const transaction = await contract.methods.approve(to, tokenId).send({ from: addr });
        console.log('代币授权成功');
        return transaction;
    } catch (error) {
        console.error('授权失败', error);
        throw error; // 重新抛出错误，以便在调用该函数时可以捕获并处理
    }
}

export default approve;
