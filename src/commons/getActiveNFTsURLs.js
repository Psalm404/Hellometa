import contract from "./contract";  

async function getActiveNFTsURLs() {
    try {
        if (!contract) {
            console.error('合约实例未初始化');
            return null;
        }

        const urls = await contract.methods.getActiveNFTsURLs().call();
        return urls;
    } catch (error) {
        console.error('获取所有上架url列表失败', error);
        return null;
    }
}

export default getActiveNFTsURLs;