import { createStore } from 'vuex';
import actions from './actions';
import mutations from './mutations';

export default createStore({
  state: {
    accessToken: '',
    marketplaceName: '', // Set marketplace name after fetching user information
    sellerId: '' // Set seller ID after fetching user information
  },
  mutations,
  actions
});