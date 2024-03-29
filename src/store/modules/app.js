const state = {
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
};

const getters = {
  isCollapse: (state) => state.isCollapse,
};

const mutations = {
  // 必须的  同步 没有回调处理事情
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse;
    // html5本地储存
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
