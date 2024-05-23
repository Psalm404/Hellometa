import contract from "./contract";  
import { getAccountAddr } from './getAccountAddr';

async function setTransactionHash(tokenURI, txhash) {
    try {
        if (!contract) {
            console.error('合约实例未初始化');
            return;
        }

        // 合约调用者的地址
        const addr = await getAccountAddr();
        await contract.methods.setTransactionHash(tokenURI, txhash).send({ from: addr });
        console.log('交易哈希设置成功');
        console.log(txhash);
    } catch (error) {
        console.log('交易哈希设置失败', error);
    }
}

export default setTransactionHash;