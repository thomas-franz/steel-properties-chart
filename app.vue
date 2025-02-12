<template>
  <div class="p-[5vw] bg-white">
    <highchart
      style="width: 100%"
      :options="{
        chart: {
          type: 'bar',
          height: chartHeight,
        },
        title: {
          text: 'Steel Properties Chart',
          align: 'center',
        },
        xAxis: {
          categories: steelTypes,
        },
        yAxis: {
          min: 0,
          title: {
            text: '',
          },
        },
        legend: {
          reversed: true,
        },
        plotOptions: {
          series: {
            events: {
              legendItemClick: function () {
                const chart = this.chart;
                let series = chart.series.filter(
                  (s) => s.visible || s.userOptions.visible !== false
                );

                // Recalculate stacked values per category
                let stackedValues = {};

                const sortProperty = series[series.length - 1].name;
                sortSteelsForProp(sortProperty);

                chart.redraw();
              },
            },
            stacking: 'normal',
            dataLabels: {
              enabled: true,
            },
          },
        },
        series: series,
      }"
      :update="['options.title', 'options.series', 'options.xAxis']"
    />
  </div>
</template>

<script setup>
import data from '~/assets/data/steels.json';

const steels = ref([...data]);

const sortPropStart = Object.keys(data[0].properties)[0];
const steelTypes = ref([]);
const properties = ref({});
const series = ref([]);

const sortSteelsForProp = (prop) => {
  steels.value.sort((a, b) => {
    const ap = a.properties[prop];
    const bp = b.properties[prop];

    if (ap > bp) {
      return -1;
    }
    if (ap < bp) {
      return 1;
    }
    return 0;
  });
  steelTypes.value = steels.value.map((steel) => steel.name);
  properties.value = Object.keys(steels.value[0].properties);
  series.value = properties.value
    .map((property) => ({
      name: property,
      data: steels.value.map((steel) => steel.properties[property]),
    }))
    .reverse();
};

sortSteelsForProp(sortPropStart);

let chartHeight = ref(steels.value.length * 24 + 120);
</script>
