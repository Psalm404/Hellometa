<template>
<div class="login-container">
    <transition name="el-fade-in-linear">
        <div class="login-box"  v-show="show1">
            <form @submit.prevent="login">
                <h2>HelloMeta</h2>
                <div class="login-input">
                    <span class="login-icon"></span>
                    <input class="login-username" v-model="username" required>
                    <label> <strong> 用户id </strong></label>
                </div>
                <div class="login-input">
                    <span class="login-icon"></span>
                    <input class="login-password" type="password" v-model="password" required>
                    <label> <strong>密码</strong> </label>
                </div>
                <div v-if="error" class="error-message">{{ error }}</div>
                <button class="login-submit" type="submit" @click="login">登录</button>
            </form>
            <a class="registerBT" @click="register">注册一个账号</a>
        </div>
    </transition>
</div>
</template>

<script>
// import axios from 'axios';
export default {
    mounted() {
        setTimeout(() => {
            this.show1 = true;
        }, 200)
    },
    beforeDestroy() {
        setTimeout(() => {
            this.show1 = false;
        }, 200)
    },
    data() {
        return {
            username: 'admin',
            password: 'password',
            error: '',
            show1: false,
        };
    },
    methods: {
        login() {
            // axios.post('http://127.0.0.1:4523/m1/4236807-0-default/login', {
            //         username: this.username,
            //         password: this.password
            //     })
            //     .then(res => {
            //         console.log('登录返回数据', res)

            // if (res.data.status === true) {  ！
            this.$store.state.isLogin = true;
            if (this.$store.state.isLogin) { //后面记得改！！！
                // this.$store.state.accountName = this.username;
                // console.log(this.$store.state.accountName);
                if (this.$route.path !== '/home')
                    this.$router.replace('/home');

            } else {
                // this.error = res.data.msg;
            }
            // })
        },
        register() {
            this.$router.push('/register');
        }
    }
};
</script>

<style>
.login-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    min-width: 100vw;
}
.login-box {
    /* position: abs; */

    width: 400px;
    height: 450px;
    background-color: transparent;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(15px);
}

h2 {
    font-size: 2em;
    color: white;
    text-align: center;
    margin-bottom: 50px;
}

.login-input {
    position: relative;
    width: 310px;
    margin: 30px 0;
    border-bottom: 2px solid white;
}

.login-input label {
    position: absolute;
    top: 50%;
    left: 0px;
    transform: translateY(-50%);
    font-size: 15px;
    color: white;
    pointer-events: none;
    transition: .5s;
}

.login-input input {
    -webkit-text-fill-color: white;
    width: 100%;
    margin-top: 15px;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    color: white;
}

input:-webkit-autofill {
    transition: background-color 5000s ease-in-out 0s;
}

.login-input input:focus~label,
.login-input input:valid~label,
.login-input input:not(:placeholder-shown)~label {
    top: -3px;
}

.login-submit {
    width: 100%;
    height: 40px;
    background: #fff;
    border: none;
    outline: none;
    border-radius: 40px;
    cursor: pointer;
    font-size: 1em;
    color: black;
    font-weight: 500;
}

.error-message {
    color: red;
    margin-bottom: 10px;
}

.registerBT {
    text-decoration: underline;
    margin-right: 230px;
    margin-top: 25px;
    color: white;
}
</style>
