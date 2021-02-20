<template>
    <div class="map-container">
        <div class="map-canvas" ref="map"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    name: 'echarts-china-map',
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
                        this.myChart = echarts.init(this.$refs.map);
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
        this.myChart = echarts.init(this.$refs.map);
        this.option && this.myChart.setOption(this.option, true);
    }
}
</script>

<style lang="less">
.map-container {
    width: 100%;
    height: 100%;
    .map-canvas {
        width: 100%;
        height: 100%;
    }
}
</style>