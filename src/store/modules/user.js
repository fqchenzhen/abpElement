import Cookies from 'js-cookie';
import Util from '@/libs/util'
import appconst from 'static/appconst'
const user = {
  namespaced: true,
  state: {
    loading: false,//控制非dialog界面的loading
    currentUser: {},
    users: [],
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
    roles: []
  },
  mutations: {
    logout() {
      abp.auth.clearToken();
      location.reload();
    },
    setPageSize(state, size) {
      state.pageSize = size;
    },
    setCurrentPage(state, page) {
      state.currentPage = page;
    }
  },
  actions: {
    async login({ state }, payload) {
      let rep = await Util.ajax.post("/api/TokenAuth/Authenticate", payload.data);
      var tokenExpireDate = payload.data.rememberMe ? (new Date(new Date().getTime() + 1000 * rep.data.result.expireInSeconds)) : undefined;
      abp.auth.setToken(rep.data.result.accessToken, tokenExpireDate);
      abp.utils.setCookieValue(appconst.authorization.encrptedAuthTokenName, rep.data.result.encryptedAccessToken, tokenExpireDate, abp.appPath)
    },
    async get({ state }, payload) {
      let rep = await Util.ajax.get('/api/services/app/User/Get?Id=' + payload.data.id);
      state.currentUser = {};
      //下面的items把对象数组展开传入，这里只传入一个
      state.currentUser = rep.data.result;
    },
    async getAll({ state }, payload) {
      let page = {
        maxResultCount: state.pageSize,
        skipCount: (state.currentPage - 1) * state.pageSize
      }
      state.loading = true;
      let rep = await Util.ajax.get('/api/services/app/User/GetAll', { params: page });
      state.users = [];
      state.users.push(...rep.data.result.items);
      state.totalCount = rep.data.result.totalCount;
      state.loading = false;
    },
    async delete({ state }, payload) {
      state.loading = true;
      await Util.ajax.delete('/api/services/app/User/Delete?Id=' + payload.data.id);
      state.loading = false;
    },
    async create({ state }, payload) {
      await Util.ajax.post('/api/services/app/User/Create', payload.data);
    },
    async update({ state }, payload) {
      await Util.ajax.put('/api/services/app/User/Update', payload.data);
    },
    async getRoles({ state }) {
      state.loading = true;
      let rep = await Util.ajax.get('/api/services/app/User/GetRoles');
      state.roles = [];
      state.roles.push(...rep.data.result.items)
      state.loading = false;
    },
    async changeLanguage({ state }, payload) {
      let rep = await Util.ajax.post('/api/services/app/User/ChangeLanguage', payload.data);
      abp.utils.setCookieValue(
        'Abp.Localization.CultureName',
        payload.data.languageName,
        new Date(new Date().getTime() + 5 * 365 * 86400000),
        abp.appPath
      );
      window.location.reload();
    }
  }
};

export default user;
