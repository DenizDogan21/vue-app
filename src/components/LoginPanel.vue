<template>
  <div>
    <input type="email" v-model="email" placeholder="Email">
    <input type="password" v-model="password" placeholder="Password">
    <button @click="login">Login</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: 'homework@eva.guru',
      password: 'Homeworkeva1**'
    };
  },
  methods: {
    async login() {
      try {
        const response = await this.$axios.post('/oauth/token', {
          Email: this.email,
          Password: this.password,
          GrantType: 'password',
          Scope: 'amazon_data',
          ClientId: 'C0001',
          ClientSecret: 'SECRET0001',
          RedirectUri: 'https://api.eva.guru'
        });
        const accessToken = response.data.AccessToken;
        this.$store.commit('setAccessToken', accessToken);
        // Fetch user information after successful login
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Login failed', error);
      }
    }
  }
};
</script>
