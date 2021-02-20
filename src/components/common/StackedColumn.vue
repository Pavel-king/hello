<template>
    <div class="stacked-column-container">
        <div class="main" ref="chart"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    name: 'echarts-stacked-column',
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
.stacked-column-container {
    width: 100%;
    height: 100%;
    .main {
        width: 100%;
        height: 100%;
    }
}
</style>