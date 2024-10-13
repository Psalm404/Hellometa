// 引入 web3 库
// import Web3 from "web3";
import axios from "axios";

// 10.13已经弃用
// 查询交易信息
export default async function getTransaction(txHash) {
    const apiBaseUrl = process.env.VUE_APP_BACKEND_BASE_URL;

    axios.get(`${apiBaseUrl}/blockSearch`, {
        params: {
            query: txHash
        }
    })
    .then(res => {
        if (res && res.data) {
            console.log("Transaction data:", res.data.Block);
            return res; 
        } else {
            console.error('Unexpected response structure:', res);
            return 'error';
        }
    })
    .catch(error => {
        console.error('Error fetching transaction data:', error);
        return 'error';
    });
}