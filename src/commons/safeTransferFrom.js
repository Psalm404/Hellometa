import contract from './contract';
import { getAccountAddr } from './getAccountAddr';

async function safeTransferFrom(to, tokenId) {
    try {
        if (!contract) {
            console.error('合约实例尚未初始化');
            throw new Error('Contract not initialized');
        }

        const addr = await getAccountAddr();

        const transaction = await contract.methods.safeTransferFrom(addr, to, tokenId).send({ from: addr });
        console.log('代币传输成功');
        return transaction;
    } catch (error) {
        console.error('代币传输失败', error);
        throw error; // 重新抛出错误，以便在调用该函数时可以捕获并处理
    }
}

export default safeTransferFrom;
