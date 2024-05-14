/* 
getBalanceOf.js提供获取一个账户address的拥有的NFT的数量的方法
函数需要一个传参：address 指的是需要查询的账户地址
函数返回一个整数：uint256 表示address的拥有的NFT的数量
*/
import contract from "./contract";

async function getBalanceOf(address) {
    try {
        if (!contract) {
            console.error('合约实例尚未初始化');
            return null;
        }

        // 调用只能合约中的balanceOf函数
        const balance = await contract.methods.balanceOf(address);
        return balance;
    } catch (error) {
        console.error('余额查询失败', error);
        return null;
    }
}

export default getBalanceOf;