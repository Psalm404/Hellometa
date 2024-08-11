import axios from 'axios'; // 用于发送 HTTP 请求

// 通过调用后端开放的接口
async function saveTransactionHash(transactionHash, tokenURI) {
    try {
        // 通过交易哈希查询交易记录
        const response = await axios.get('/api/getTxIDByTxHash', {
            params: { txHash: transactionHash }
        });
        
        const transactionId = response.data.ID;

        if (transactionId) {
            // 将 ID 和 tokenURI 存入数据库
            await axios.post('/api/saveTxHash', {
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
