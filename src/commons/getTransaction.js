// 引入 web3 库
import Web3 from "web3";

// 查询交易信息
export async function getTransaction(txHash) {
    const web3 = new Web3(window.ethereum);
    try {
        // 请求用户连接他们的钱包
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        // 查询交易信息
        const transaction = await web3.eth.getTransaction(txHash);
        console.log(transaction);
        return transaction;
    } catch (error) {
        console.error('Error fetching transaction:', error);
        return 'error';
    }
}
