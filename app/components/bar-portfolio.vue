<template>
  <div class="relative h-11/13 w-full">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const { chartData, maxData } = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
  maxData: {
    type: Number,
    required: true,
  }
});

const chartOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      ticks: {
        drawTicks: false,
      },
    },
    y: {
      min: 0,
      max: maxData,
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      ticks: {
        drawTicks: false,
        stepSize: 1,
        callback: function(value) {
          return Number.isInteger(value) ? value : null;
        }
      },
    },
  },
};
</script>
