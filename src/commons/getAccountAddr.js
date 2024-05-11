import Web3 from 'web3';
export async function getAccountAddr() {
    const web3 = new Web3(window.ethereum);
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        return accounts[0]; // 拿到当前钱包账户的地址
    } catch (error) {
        return 'error';
    }
}