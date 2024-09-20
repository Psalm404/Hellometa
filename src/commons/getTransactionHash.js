import axios from 'axios';

async function getTransactionHash(tokenURI) {
    try {
        // 调用后端接口获取交易哈希
        const apiBaseUrl = process.env.VUE_APP_BACKEND_BASE_URL;
        const response = await axios.get(`${apiBaseUrl}/getTxHashByTokenURI`, {
            params: {
                tokenURI: tokenURI
            }
        });

        if (response.status === 200 && response.data.txHash) {
            return response.data.txHash;
        } else {
            console.error('未找到与该 tokenURI 关联的交易哈希');
            return null;
        }
    } catch (error) {
        console.error('根据URL查询交易哈希失败', error);
        return null;
    }
}

export default getTransactionHash;
