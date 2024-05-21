/*
ownerOfURL.js提供根据URL查询对应的拥有者owner的方法
函数一个传参：string 所需要查询的URL
函数返回一个字符串：address URL所对应的拥有者的地址
*/

import contract from './contract';

async function ownerOfURL(tokenURI) {
    try {
        if (!contract) {
            console.error('合约实例尚未初始化');
            return null;
        }

        // 调用合约的ownerOfURL函数
        const owner = await contract.methods.ownerOfURL(tokenURI).call();
        return owner;
    } catch (error) {
        console.error('根据URL查询代币所有者地址失败', error);
        return null;
    }
}

export default ownerOfURL;
