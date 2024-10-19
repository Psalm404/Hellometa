<template>
    <div id="app" >
      <div :class="{ 'guide-text-hidden': show }" class="guide-text" :style="{ color: textColor }">{{ guideText }}</div>
      <transition name="el-fade-in-linear">
        <div v-show="show" class="main-page" :style="{ backgroundColor: mainBackgroundColor }">
          <div>
            <router-view @trigger-login="showLoginModal"></router-view>
          </div>
          <!-- login -->
          <transition name="el-fade-in-linear">
            <div v-if="!isLoggedIn || activeButton === 'login'" class="login-modal" v-show="showLogin">
              <div class="login-box">
                <!-- 关闭按钮 -->
                <button class="close-button" @click="closeLogin" style="font-size: medium">关闭</button>
                <form @submit.prevent="login">
                  <h2>欢迎！👋</h2>
                  <h3>请先登录您的账号</h3>
                  <div class="login-input">
                    <span class="login-icon"></span>
                    <input class="login-username" v-model="username" required placeholder=" " @invalid="this.setCustomValidity('请填写您的账号id')" @input="this.setCustomValidity('')">
                    <label> <strong>用户名:</strong></label>
                  </div>
                  <div class="login-input">
                    <span class="login-icon"></span>
                    <input class="login-password" type="password" v-model="password" required placeholder=" " @invalid="this.setCustomValidity('请输入您的密码')" @input="this.setCustomValidity('')">
                    <label><strong>密码:</strong></label>
                  </div>
                  <div v-if="error" class="error-message">{{ error }}</div>
                  <button class="login-submit" type="submit">登录</button>
                </form>
                <a class="registerBT" @click="register">没有账号?注册一个👇</a>
              </div>
            </div>
          </transition>
          <!-- login -->
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'HellometaComponent',
    data() {
      return {
        username: '',
        password: '',
        error: '',
        show: true,
        showLogin: false,
        guideText: '',
        textColor: 'transparent',
        activeButton: '',
        isGuest: false, // 游客模式标志
        mainBackgroundColor: '#ffffff',
        wordColor: 'white',
        buttonColor:'blue',
      };
    },
    computed: {
      isLoggedIn() {
        return this.$store.state.isLoggedIn;
      },
      backgroundColor() {
        return this.$store.state.backgroundColor;
      }
    },
    watch: {
      isLoggedIn(newStatus) {
        if (newStatus) {
          this.showLogin = false;
          this.$router.push('/home');
        } else {
          this.showLogin = true;
        }
      },
      backgroundColor(newColor) {
        console.log(`背景颜色已更改为: ${newColor}`);
        this.mainBackgroundColor = newColor; 
      }
    },
    mounted() {
      // 每次加载组件时检查登录状态
      this.$store.dispatch('checkLoginStatus');
      console.log(this.isLoggedIn);
      if (!this.isLoggedIn) {
        if (this.$route.path !== '/intro') {
          this.$router.push('/intro');
        }
        setTimeout(() => {
          this.showLogin = true;
        }, 500);
      } else {
        if (this.$route.path !== '/u_intro') {
          this.$router.push('/u_intro');
        }
      }
    },
    methods: {
      login() {
        console.log('正在执行登录事件');
        const apiBaseUrl = process.env.VUE_APP_BACKEND_BASE_URL;
        console.log('apiBaseUrl::' + apiBaseUrl);
        axios.post(`${apiBaseUrl}/login`, {
            account: this.username,
            password: this.password
          })
          .then(response => {
            if (response.data.code === 200) {
              // 将返回的 balance 转换为 ETH
              const balanceInETH = response.data.user.balance / 1e18;
  
              // 更新 user 对象中的 balance
              const userWithETH = {
                ...response.data.user,
                balance: balanceInETH // 修改 balance 为以太币单位
              };
              this.$store.dispatch('login', {
                token: response.data.token,
                user: userWithETH
              });
              this.error = ''; // 清除错误信息
            } else {
              this.error = response.data.status || '登录失败，请检查您的账号和密码';
            }
          })
          .catch(error => {
            console.error('Login error:', error);
            this.error = '登录失败，请稍后再试';
          });
      },
      register() {
        this.showLogin = false;
        if (this.$route.path !== '/register') {
          this.$router.push('/register');
        }
      },
      closeLogin() {
        this.showLogin = false;
        this.isGuest = true;
        this.username = '';
        this.password = '';
        this.error = '';
      },
      showLoginModal() {
        this.showLogin = true; // 显示登录框
        console.log(this.showLogin);
      },
      changeBackgroundColor(newColor) {
        this.backgroundColor = newColor; // 更新背景颜色
      }
    }
  };
  </script>
  
  <style scoped>
  #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      height: 100vh;
      /* max-height: 100%; */
      text-align: center;
  }
  
  .main-page {
      min-height: 100vh;
      /* 确保主页面至少占满整个视口高度 */
      max-width: 100vw;
      /* 使主页面宽度占满整个视口宽度 */
      display: flex;
      flex-direction: column;
      /* 将内容垂直排列 */
      margin: 0;
      /* 移除任何默认外边距 */
      padding: 0;
      /* 移除任何默认内边距 */
      box-sizing: border-box;
      /* 确保内边距和边框不会影响元素的总宽度 */
      background-color: #292929;
  }
  
  .login-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      transition: background-color 0.5s ease;
      /* 添加渐变效果 */
  }
  
  .login-box {
      position: relative;
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
  
  /* 关闭按钮 */
  .close-button {
      position: flex;
      margin-top: 12px;
      margin-right: 12px;
      background: none;
      border: none;
      font-size: 2em;
      color: white;
      cursor: pointer;
  }
  
  .close-button:hover {
      color: #c64500;
  }
  
  h2 {
      font-size: 2em;
      color: white;
      text-align: center;
      margin-top: 50px;
  }
  
  h3 {
      font-size: 1.3em;
      color: #c64500;
      text-align: center;
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
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s ease;
  }
  
  .login-submit:hover {
      background-color: #c64500;
      color: #fff;
  }
  
  .error-message {
      color: red;
      margin-top: 10px;
  }
  
  .registerBT {
      color: #c64500;
      margin-top: 15px;
      text-decoration: none;
  }
  </style>