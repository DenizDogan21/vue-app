<template>
  <div>
    <div id="chart-container"></div>
    <select v-model="selectedDay" @change="fetchChartData">
      <option value="60">Last 60 Days</option>
      <option value="30">Last 30 Days</option>
      <option value="14">Last 14 Days</option>
      <option value="7">Last 7 Days</option>
    </select>
    <table>
      <thead>
        <tr>
          <th>SKU</th>
          <th>Profit</th>
          <th>FBA Sales</th>
          <th>FBM Sales</th>
          <th>Refund Rate</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData" :key="item.sku">
          <td>{{ item.sku }}</td>
          <td>{{ item.profit }}</td>
          <td>{{ item.fbaSales }}</td>
          <td>{{ item.fbmSales }}</td>
          <td>{{ item.refundRate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Highcharts from 'highcharts';

export default {
  data() {
    return {
      selectedDay: '60',
      chartData: [],
      tableData: []
    };
  },
  mounted() {
    this.fetchChartData();
    this.fetchTableData();
  },
  watch: {
    chartData() {
      this.renderChart();
    }
  },
  methods: {
    async fetchChartData() {
      try {
        const response = await this.$axios.get('/data/daily-sales-overview', {
          params: {
            customDateData: null,
            day: this.selectedDay,
            excludeYoYData: true,
            marketplace: this.$store.state.marketplaceName,
            requestStatus: 0,
            sellerId: this.$store.state.sellerId
          }
        });
        this.chartData = response.data;
      } catch (error) {
        console.error('Error fetching chart data', error);
      }
    },
    renderChart() {
      // Rendering chart using Highcharts
      Highcharts.chart('chart-container', {
        // Chart configuration using this.chartData
      });
    },
    async fetchTableData() {
      try {
        const response = await this.$axios.get('/data/daily-sales-sku-list', {
          params: {
            isDaysCompare: this.selectedColumns.length === 2 ? 1 : 0,
            marketplace: this.$store.state.marketplaceName,
            pageNumber: 1,
            pageSize: 30,
            salesDate: this.selectedColumns[0], // Adjust according to your logic
            salesDate2: this.selectedColumns[1] || '',
            sellerId: this.$store.state.sellerId
          }
        });
        this.tableData = response.data.skuList;
        this.fetchRefundRate();
      } catch (error) {
        console.error('Error fetching table data', error);
      }
    },
    async fetchRefundRate() {
      try {
        // Fetch refund rates for each SKU
        const promises = this.tableData.map(item => {
          return this.$axios.get('/data/get-sku-refund-rate', {
            params: {
              // Parameters for fetching refund rate
            }
          });
        });
        const responses = await Promise.all(promises);
        responses.forEach((response, index) => {
          this.tableData[index].refundRate = response.data.refundRate;
        });
      } catch (error) {
        console.error('Error fetching refund rates', error);
      }
    }
  }
};
</script>
