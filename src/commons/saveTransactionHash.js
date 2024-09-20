import axios from 'axios'; // 用于发送 HTTP 请求

// 调用后端接口存交易哈希
async function saveTransactionHash(transactionHash, tokenURI) {
    try {
        // 通过交易哈希查询交易记录
        const apiBaseUrl = process.env.VUE_APP_BACKEND_BASE_URL;
        const response = await axios.get(`${apiBaseUrl}/getTxIDByTxHash`, {
            params: { txHash: transactionHash }
        });
        
        const transactionId = response.data.id;

        if (transactionId) {
            // 将 ID 和 tokenURI 存入数据库
            await axios.post(`${apiBaseUrl}/saveTxHash`, {
                txID: transactionId,
                tokenURI: tokenURI,
            });
            console.log('Token URI 保存成功');
        } else {
            console.error('未找到交易记录');
        }
    } catch (error) {
        console.error('保存 Token URI 失败', error);
    }
}

export default saveTransactionHash;
