import Web3 from "web3";
import getTransaction from "@/commons/getTransaction";

async function getBlocks() {
    const web3 = new Web3(window.ethereum);

    try {
        // 请求用户连接他们的钱包
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // 获取最新的区块号
        const latestBlockNumber = await web3.eth.getBlockNumber();
        console.log("Latest block number:", latestBlockNumber);

        // 定义存储区块的数组
        let blocks = [];

        // 定义批量处理的步长
        const batchSize = 20;

        // 获取所有区块信息
        for (let i = Number(latestBlockNumber); i >= 0; i -= batchSize) {
            const start = Math.max(i - batchSize + 1, 0);
            const batchBlocks = await Promise.all(
                Array.from({ length: i - start + 1 }, (_, index) => web3.eth.getBlock(i - index))
            );

            // 处理每个区块的详细信息
            for (let j = Number(batchBlocks.length) - 1; j >= 0 ; j--) {
                const block = batchBlocks[j];
                // console.log(block.number);
                // 获取每个交易的详细信息
                let transactions_detail = [];
                if (block.transactions != null) {
                    for (let k = 0; k < block.transactions.length; k++) {
                        let tx = await getTransaction(block.transactions[k]);
                        transactions_detail.push(tx);
                    }
                }

                // 将区块信息添加到数组中
                blocks.push({
                    block: block,
                    transactions_detail: transactions_detail
                });
            }
        }

        // 返回所有区块信息
        console.log("All blocks retrieved:");
        return blocks;
    } catch (error) {
        console.error("Error retrieving blocks:", error);
        throw error;
    }
}

export default getBlocks;
