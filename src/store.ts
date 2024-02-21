import type { InjectionKey } from 'vue'; // Import as type
import { createStore, useStore as baseUseStore, Store } from 'vuex';

export interface State {
  accessToken: string;
  marketplaceName: string;
  sellerId: string;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    accessToken: '',
    marketplaceName: '',
    sellerId: ''
  },
  mutations: {
    setAccessToken(state, token: string) {
      state.accessToken = token;
    },
    setMarketplaceName(state, name: string) {
      state.marketplaceName = name;
    },
    setSellerId(state, id: string) {
      state.sellerId = id;
    }
  }
});

export function useStore() {
  return baseUseStore(key);
}
