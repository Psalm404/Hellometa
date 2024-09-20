import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    token: '',
    user: null,
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
      localStorage.removeItem('account');
      // 清除 localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userInfo');
      localStorage.removeItem('account');
    },
    login({ commit }, { token, user }) {
        commit('setLoginStatus', true);
        commit('setToken', token);
        commit('setUser', user);


        // 确保这里是将数据存储到 localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('userInfo', JSON.stringify(user));
        localStorage.setItem('account', user.account);

        // 可以在这里打印输出看看数据是否正确
        console.log('Logged in user:', user);
    },
    checkLoginStatus({ commit }) {
        const token = localStorage.getItem('authToken');
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

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
  },
});