import contractABI from '@/abi/contract.json'
import Web3 from 'web3'

export function mint(contractAddr, account) {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(contractABI, contractAddr);
    console.log('state.account=', account)
    const toAddress = '0x8Ee31F13c865302E04c39c6967Da09b93A2C52bD';
    const tokenURI = '12345';
    contract.methods.mint(toAddress, tokenURI).send({
        from: account
    });
}
