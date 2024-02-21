import type { ActionTree } from 'vuex';
import api from '@/services/api';

const actions: ActionTree<any, any> = {
  async fetchUserInformation({ commit }: { commit: Function }) {
    try {
      const response = await api.get('/user/user-information', {
        headers: {
          Authorization: `Bearer ${this.state.accessToken}`
        }
      });
      const { marketplaceName, storeId } = response.data;
      commit('setMarketplaceName', marketplaceName);
      commit('setSellerId', storeId);
    } catch (error) {
      console.error('Error fetching user information', error);
    }
  }
};

export default actions;