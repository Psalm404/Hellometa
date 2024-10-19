import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 常量定义
const AUTH_TOKEN_KEY = 'authToken';
const USER_INFO_KEY = 'userInfo';
const ACCOUNT_KEY = 'account';

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    token: '',
    user: null,
    isAccountMatched: false, // 小账号所属检测
    backgroundColor: '#ffffff', // 默认背景颜色
    buttonColor: '#409eff',
    textColor: 'black',
    modeValue: false,
  },
  mutations: {
    setLoginStatus(state, status) {
      state.isLoggedIn = status;
    },
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    },
    setUserAvatar(state, avatarUrl) {
      if (state.user) {
        state.user.avatar = avatarUrl;
      } else {
        state.user = { avatar: avatarUrl }; 
      }
    },
    setUserBalance(state, balance) { // 新增的 mutation
      state.user.balance = balance;
    },
    setAccountMatched(state, matched) {
      state.isAccountMatched = matched;
    },
    setColor(state, { backgroundColor, buttonColor, textColor }) { // 修改为接收对象
      state.backgroundColor = backgroundColor;
      state.buttonColor = buttonColor;
      state.textColor = textColor;
      state.modeValue = !state.modeValue;
    },
  },
  actions: {
    logout({ commit }) {
      // 清除 cookie 中的登录状态、token 和用户信息
      document.cookie = 'loggedIn=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      // 更新 Vuex 状态
      commit('setLoginStatus', false);
      commit('setToken', '');
      commit('setUser', null);
      // 清除 localStorage 中的 account
      localStorage.removeItem(ACCOUNT_KEY);
      // 清除 localStorage
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(USER_INFO_KEY);
    },
    login({ commit }, { token, user }) {
      commit('setLoginStatus', true);
      commit('setToken', token);
      commit('setUser', user);

      // 存储数据到 localStorage
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
      localStorage.setItem(ACCOUNT_KEY, user.account);

      // 打印输出看看数据是否正确
      console.log('Logged in user:', user);
    },
    checkLoginStatus({ commit }) {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      const userInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY));

      if (token && userInfo) {
        commit('setLoginStatus', true);
        commit('setToken', token);
        commit('setUser', userInfo);
      } else {
        commit('setLoginStatus', false);
        commit('setToken', '');
        commit('setUser', null);
      }
    },
    updateUserBalance({ commit }, balance) { // 新增的 action
      commit('setUserBalance', balance);
    },
    changeColor({ commit }, { backgroundColor, buttonColor, textColor }) { // 修改为接收对象
      commit('setColor', { backgroundColor, buttonColor, textColor });
    },
  },
});
