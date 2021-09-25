export const state = () => ({
  memoryUsage: ``
});

export const getters = {
  getMemoryUsage(state) {
    return state.memoryUsage;
  }
};

export const mutations = {
  setMemoryUsage(state, data) {
    state.memoryUsage = data;
  }
};

export const actions = {
  async nuxtServerInit({ dispatch, commit }) {
    const {
      heapUsed: used,
      rss,
      heapTotal: tot,
      external: ext
    } = process.memoryUsage();
    const nowTime = new Date().toTimeString().substr(0, 8);
    const nowMinute = nowTime.split(":")[1];
    const f = value => (!value ? "-" : `${Math.round(value / 1048576)} MB`);
    const memoryUsage = `최초 SSR 요청 [${nowTime}] Memory usage: ${f(
      used
    )} (RSS: ${f(rss)}) - total heap: ${f(tot)} - external: ${f(ext)}  ${process
      .env.OT_HERMIONE | "none"}`;
    console.log(memoryUsage);
    commit("setMemoryUsage", memoryUsage);
  }
};
