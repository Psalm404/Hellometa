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
  },
  actions: {
    login({ commit }, { token, user }) {
      const date = new Date();
      date.setDate(date.getDate() + 1); // 设置 cookie 的过期时间为 1 天后

      // 保存 token 和用户信息到 cookie，有效期为 1 天
      document.cookie = `loggedIn=true; path=/; expires=${date.toUTCString()}`;
      document.cookie = `token=${token}; path=/; expires=${date.toUTCString()}`;
      document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; path=/; expires=${date.toUTCString()}`;

      // 保存 account 到 localStorage
      localStorage.setItem('account', user.account);

      // 更新 Vuex 状态
      commit('setLoginStatus', true);
      commit('setToken', token);
      commit('setUser', user);
    },
    logout({ commit }) {
      // 清除 cookie 中的登录状态、token 和用户信息
      document.cookie = 'loggedIn=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      // 清除 localStorage 中的 account
      localStorage.removeItem('account');

      // 更新 Vuex 状态
      commit('setLoginStatus', false);
      commit('setToken', '');
      commit('setUser', null);
    },
    checkLoginStatus({ commit }) {
      const isLoggedIn = document.cookie.includes('loggedIn=true');
      const tokenMatch = document.cookie.match(/token=([^;]+)/);
      const userMatch = document.cookie.match(/user=([^;]+)/);

      if (isLoggedIn && tokenMatch && userMatch) {
        const token = tokenMatch[1];
        const user = JSON.parse(decodeURIComponent(userMatch[1]));

        // 从 localStorage 获取 account 并同步到 user 对象中
        const accountFromLocalStorage = localStorage.getItem('account');
        if (accountFromLocalStorage) {
          user.account = accountFromLocalStorage;  // 确保 user 对象包含 account 字段
        }

        commit('setLoginStatus', true);
        commit('setToken', token);
        commit('setUser', user);
      } else {
        commit('setLoginStatus', false);
        commit('setToken', '');
        commit('setUser', null);
      }
    },
  },
});