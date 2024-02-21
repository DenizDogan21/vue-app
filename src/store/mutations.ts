const mutations = {
    setAccessToken(state: any, token: string) {
      state.accessToken = token;
    },
    setMarketplaceName(state: any, name: string) {
      state.marketplaceName = name;
    },
    setSellerId(state: any, id: string) {
      state.sellerId = id;
    }
  };
  
  export default mutations;