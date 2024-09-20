import contract from "./contract";
import { getAccountAddr } from "./getAccountAddr";
import Web3 from "web3";

async function buyToken(tokenId, nftPrice) {
    try {
        if (!contract) {
            console.error('合约实例未初始化');
            return null;
        }

        // 确保传入的tokenId, nftPrice是有效的
        if (!tokenId || !nftPrice) {
            console.error('参数无效');
            return null;
        }
        
        const nftPriceWei = Web3.utils.toWei(nftPrice.toString(), 'ether');
        const address = await getAccountAddr();
        const gasEstimate = await contract.methods.buyNFT(tokenId).estimateGas({
            from: address, 
            value: nftPriceWei, // 发送的以太坊金额（以 wei 为单位）
        });
        console.log(gasEstimate)
        // 调用合约的buyNFT函数
        const tx = await contract.methods.buyNFT(tokenId).send({
            from: address, // 交易发起者的地址
            value: nftPriceWei.toString(), // 发送wei的金额
            gas: gasEstimate
        });

        // 交易成功后，打印交易哈希
        console.log('购买成功，交易哈希:', tx.transactionHash);
        return tx.transactionHash; // 返回交易哈希，以便于后续处理
    } catch (error) {
        console.error('购买NFT失败', error);
        return null;
    }
}

export default buyToken;