<template>
    <div>
        <nav class="navbar">
            <div class="navbar-container">
                <a href="#/home" class="navbar-logo">
                    <img src="../assets/logo.png" alt="Logo" class="logo-image">
                </a>
                <h2>企业数据资产化平台</h2>
                <ul class="navbar-menu">
                    <li><a href="#/exhibitWorks"> Explore </a></li>
                    <li><a href="#"> Stats </a></li>
                    <li><a href="#/uploadWorks"> Upload </a></li>
                    <li><a href="#/recordWorks"> Records </a></li>
                </ul>
                <form class="navbar-search">
                    <div class="search-icon">
                        <input type="text" placeholder="Search..." class="search-input">
                        <i class="el-icon-search"></i>
                    </div>
                </form>
                <div class="navbar-actions">
                    <button class="navbar-button">Connect Wallet</button>
                    <div class="navbar-profile">
                        <a href="https://github.com/Psalm404/Hellometa" target="_blank">
                            <img src="../assets/github.jpg" alt="Join us">
                        </a>
                    </div>
                </div>
            </div>
        </nav>
        <div class="container">
            <el-carousel :interval="4000" type="card">
                <el-carousel-item v-for="(item, index) in picture" :key="index">
                    <img :src="item" class="responsive-img" alt="">
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="content">
            <h1>企业数据资产化</h1>
            <p>数据资产化："数据资产化"是一个涉及将数据转换成可量化的、有价值的资产的概念。<br>
                这一过程不仅包括数据的收集和存储，还包括对数据的管理、分析和利用，<br>
                目的是从数据中提取价值，支持决策制定，创造商业机会，甚至直接作为产品或服务出售。</p>
            <br>
            <p>无币公链："无币公链"是指一种公共区块链技术的实现，其中不发行任何原生加密货币或代币。<br>
                这与众多知名的区块链平台不同，后者通常都有自己的内置代币，如比特币、以太坊等。<br>
                无币公链的特点和应用场景如下:</p>
            <p>More content here...</p>
            <p>More content here...</p>
            <p>More content here...</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            picture: [
                require("D:/UtilityRoom/picture/680aa819c894e632d3ce71e1ef533ea.png"),
                require("D:/UtilityRoom/picture/d7dfc57d557f18490d2d00ba5f9f8af.png"),
                require("D:/UtilityRoom/picture/PixPin_2024-05-25_17-46-05.jpg")
            ],
        }
    },
}
</script>

<style>
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

.responsive-img {
    max-width: 100%;
    height: auto;
}

.container {
    margin: 2px;
    padding-top: 80px;
}

.navbar {
    background-color: #fff;
    border-bottom: 1px solid #e6e8ec;
    padding: 10px 20px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
}

.navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}

.navbar-logo {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    text-decoration: none;
}

.logo-image {
    height: 40px;
    /* Adjust the height to your logo size */
    margin-right: 10px;
    /* Space between logo and text */
}

.navbar-search {
    display: flex;
    align-items: center;
    margin-left: 20px;
    margin-right: auto;
    position: relative;
}

.search-icon {
    position: relative;
}

.search-input {
    padding: 8px 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: border-color 0.3s;
}

.search-input:focus {
    outline: none;
    border-color: #aaa;
}

.el-icon-search {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: #555;
    cursor: pointer;
}

.navbar-menu {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
}

.navbar-menu li {
    margin: 0 15px;
}

.navbar-menu a {
    color: #1a73e8;
    text-decoration: none;
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
    transition: color 0.3s;
}

.navbar-menu a:hover {
    color: rgb(102, 229, 255);

}

.navbar-actions {
    display: flex;
    align-items: center;
}

.navbar-button {
    background-color: #1a73e8;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.navbar-button:hover {
    background-color: #155ab3;
}

.navbar-profile img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-left: 20px;
    cursor: pointer;
}

.content {
    font: "Microsoft YaHei";
    color: #edebeb;
}
</style>