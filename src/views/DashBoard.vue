<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';
import LoginPanel from '../components/LoginPanel.vue'; 
import SalesChart from '../components/SalesChart.vue'; 
import ComparisonTable from '../components/ComparisonTable.vue'; 

export default defineComponent({
  name: 'Dashboard',
  components: {
    LoginPanel,
    SalesChart,
    ComparisonTable
  },
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch('fetchUserInformation');
    });
  }
});
</script>
