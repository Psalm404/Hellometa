/*
contract.js根据智能合约地址和ABI创建一个contract实例，用于智能合约功能调用

在web3.js的基础上得出实例，创建contract实例之前，我们需要确认已经成功初始化了web3实例：
        检查是否存在以太坊浏览器扩展（如MetaMask）。
        请求用户授权连接他们的以太坊账户。
但是以上确认成功初始化了web3实例在contract.js中并没实现，需要根据实际情况补充代码！！！
*/
import Web3 from "web3";    
import contractABI from '@/abi/contract';

const contractAddr = '0x94ff1e1B38FE822FD7C0d88264A33eF036Ee4941'; // 合约地址
const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(contractABI, contractAddr); // 智能合约实例

export default contract;