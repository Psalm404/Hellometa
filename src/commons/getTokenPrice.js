import contract from "./contract";  

async function getTokenPrice(tokenId) {
    try {
        if (!contract) {
            console.error('合约实例未初始化');
            return null;
        }

        const price = await contract.methods.getTokenPrice(tokenId).call();
        return price;
    } catch (error) {
        console.error('获取当前Token price 失败', error);
        return null;
    }
}

export default getTokenPrice;