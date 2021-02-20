<template>
    <div class="pie-doughnut-container">
        <div class="pie-doughnut" ref="chart"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    name: 'echarts-pie-doughnut',
    props: {
        option: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    watch: {
        'option'(v) {
            if (v) {
                if (this.myChart) {
                    this.myChart.setOption(v, true);
                }
                else {
                    this.$nextTick(() => {
                        this.myChart = echarts.init(this.$refs.chart);
                        this.myChart.setOption(v, true);
                    });
                }
            }
        }
    },
    data() {
        return {
            myChart: null
        };
    },
    mounted() {
        this.myChart = echarts.init(this.$refs.chart);
        this.option && this.myChart.setOption(this.option, true);
    }
}
</script>

<style lang="less">
.pie-doughnut-container {
    width: 100%;
    height: 100%;
    .pie-doughnut {
        width: 100%;
        height: 100%;
    }
}
</style>