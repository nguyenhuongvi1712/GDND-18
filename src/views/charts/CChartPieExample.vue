<template>
  <CChartPie :data="defaultData" />
</template>

<script>
import { CChartPie } from '@coreui/vue-chartjs'
export default {
  name: 'CChartPieExample',
  components: { CChartPie },
  computed: {
    defaultData() {
      return {
        labels: ['Đã hoàn thành', 'Đang tiến hành', 'Đang chờ', 'Đã hủy'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: [40, 20, 80, 10],
          },
        ],
      }
    },
  },
}
</script>
