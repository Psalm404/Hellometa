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
        
        const nftPriceEth = Web3.utils.fromWei(nftPrice, 'ether')
        const address = await getAccountAddr();
        // 调用合约的buyNFT函数
        const tx = await contract.methods.buyNFT(tokenId).send({
            from: address, // 交易发起者的地址
            value: nftPriceEth // 发送wei的金额
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
