import Cookies from 'js-cookie';
import Util from '@/libs/util'
import appconst from 'static/appconst'
const tenant = {
  namespaced: true,
  state: {
    loading: false,//控制非dialog界面的loading
    tenants: [],
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
    editEntity: {}
  },
  mutations: {
    setPageSize(state, size) {
      state.pageSize = size;
    },
    setCurrentPage(state, page) {
      state.currentPage = page;
    },
  },
  actions: {
    async getAll({ state }, payload) {
      let page = {
        maxResultCount: state.pageSize,
        skipCount: (state.currentPage - 1) * state.pageSize
      }
      state.loading = true;
      let rep = await Util.ajax.get('/api/services/app/Tenant/GetAll', { params: page });
      state.tenants = [];
      state.tenants.push(...rep.data.result.items);
      state.totalCount = rep.data.result.totalCount;
      state.loading = false;
    },
    async delete({ state }, payload) {
      state.loading = true;
      await Util.ajax.delete('/api/services/app/Tenant/Delete?Id=' + payload.data.id);
      state.loading = false;
    },
    async create({ state }, payload) {
      await Util.ajax.post('/api/services/app/Tenant/Create', payload.data);
    },
    async update({ state }, payload) {
      await Util.ajax.put('/api/services/app/Tenant/Update', payload.data);
    }
  }
};

export default tenant;