import contract from './contract';

async function getTransactionHash(tokenURI) {
    try {
        if (!contract) {
            console.error('合约实例尚未初始化');
            return null;
        }

        // 调用合约的getTransactionHash函数
        const txhash = await contract.methods.getTransactionHash(tokenURI).call();
        return txhash;
    } catch (error) {
        console.error('根据URL查询交易哈希失败', error);
        return null;
    }
}

export default getTransactionHash;
