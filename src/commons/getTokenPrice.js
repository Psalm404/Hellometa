import contract from "./contract";  
import Web3 from "web3";

async function getTokenPrice(tokenId) {
    try {
        if (!contract) {
            console.error('合约实例未初始化');
            return null;
        }

        const priceWei = await contract.methods.getTokenPrice(tokenId).call();
        const priceEth = Web3.utils.fromWei(priceWei, 'ether')
        return priceEth;
    } catch (error) {
        console.error('获取当前Token price 失败', error);
        return null;
    }
}

export default getTokenPrice;