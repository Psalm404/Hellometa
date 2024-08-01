import contract from "./contract";  

async function getApproved(tokenId) {
    try {
        if (!contract) {
            console.error('合约实例未初始化');
            return null;
        }

        const address = await contract.methods.getApproved(tokenId).call();
        return address;
    } catch (error) {
        console.error('获取当前Token Approved address 失败', error);
        return null;
    }
}

export default getApproved;