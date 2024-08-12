import contract from "./contract";  

async function getActiveNFTsTokenIds() {
    try {
        if (!contract) {
            console.error('合约实例未初始化');
            return null;
        }

        const tokenIds = await contract.methods.getActiveNFTsTokenIds().call();
        return tokenIds;
    } catch (error) {
        console.error('获取所有上架url列表失败', error);
        return null;
    }
}

export default getActiveNFTsTokenIds;