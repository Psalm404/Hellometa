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
          // console.error('用户状态未初始化');
          // 可以选择初始化 state.user 或者直接返回错误
          state.user = { avatar: avatarUrl }; // 如果你选择初始化用户
      }
    },
    
  },
  actions: {
    // login({ commit }, { token, user }) {
    //   const date = new Date();
    //   date.setDate(date.getDate() + 1); // 设置 cookie 的过期时间为 1 天后

    //   // 保存 token 和用户信息到 cookie，有效期为 1 天
    //   document.cookie = `loggedIn=true; path=/; expires=${date.toUTCString()}`;
    //   document.cookie = `token=${token}; path=/; expires=${date.toUTCString()}`;
    //   document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; path=/; expires=${date.toUTCString()}`;

    //   // 更新 Vuex 状态
    //   commit('setLoginStatus', true);
    //   commit('setToken', token);
    //   commit('setUser', user);

    //   // 将 token 和用户信息存储到 localStorage
    //   localStorage.setItem('authToken', token);
    //   // 保存 account 到 localStorage
    //   localStorage.setItem('account', user.account);
    //   localStorage.setItem('userInfo', JSON.stringify(user));
    //   // localStorage.setItem(`avatar_${user.account}`, user.avatar);

    // },
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
  },
});