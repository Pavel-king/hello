<template>
    <div class="industry-map-container" v-if="isShow">
        <div class="pie-charts-container">
            <div class="pie-charts-top">
                <common-chart :option="pieDoughnutOption"/>
            </div>
            <div class="pie-charts-bottom">
                <common-chart :option="stackedColumnOption"/>
            </div>
        </div>
        <div class="industry-map-china">
            <common-chart :option="mapOption"/>
        </div>
        <div class="industry-map-event">
            <el-card class="box-card" shadow="never">
                <div slot="header" class="box-card-header">
                    <el-tag effect="plain" type="">事件动态</el-tag>
                </div>
                <div class="box-card-body">
                    <div
                        v-for="(v, i) in eventData"
                        :key="i"
                        class="box-card-item"
                    >
                        <div class="box-card-item-title">{{ v.title }}</div>
                        <div class="box-card-item-content">{{ v.content }}</div>
                    </div>
                </div>
                <div class="box-card-footer"><span>更多...</span></div>
            </el-card>
        </div>
    </div>
</template>

<script>
// import * as echarts from 'echarts';
import CommonChart from '@/components/common/CommonCharts.vue';
import IO from '@/common/util';
import API from '@/config/api';

export default {
    name: 'ai-overview-industry-map',
    components: {
        'common-chart': CommonChart
    },
    data() {
        return {
            isShow: false,
            pieDoughnutOption: null,
            mapOption: null,
            stackedColumnOption: null,
            eventData: []
        };
    },
    created() {
        this.getData();
    },
    methods: {
        async getData() {
            try {
                this.isShow = false;
                const {industryRate, industryIncrease, map, event} = await IO.get(API.aiIndustryOverviewIndustryMap);
                this.setPieChartOption(industryRate);
                this.setStackedColumnOption(industryIncrease);
                this.setMapChartOption(map);
                this.eventData = event;
                this.isShow = true;
            } catch (e) {
                console.error(e);
            }
        },
        setPieChartOption(industryRate) {
            if (!Array.isArray(industryRate)) {
                return;
            }
            this.pieDoughnutOption = {
                title: {
                    text: "中国人工智能企业分布地图",
                    left: "center",
                    top: 10,
                    textStyle: {
                        fontSize: 14
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {d}%'
                },
                legend: {
                    top: 40,
                    left: '5%',
                    orient: 'vertical',
                    itemWidth: 16,
                    itemHeight: 12
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: ['30%', '50%'],
                        center: ['70%', '45%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '12',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: industryRate
                    }
                ]
            };
        },
        setStackedColumnOption(data) {
            if (!data) {
                return;
            }
            const {x, y} = data;
            this.stackedColumnOption = {
                title: {
                    text: "中国人工智能细分领域企业增长趋势",
                    left: "center",
                    top: 0,
                    textStyle: {
                        fontSize: 14
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: y.map(item => item.name),
                    top: '15%',
                    left: '5%',
                    itemWidth: 16,
                    itemHeight: 12
                },
                grid: {
                    left: '6%',
                    right: '4%',
                    bottom: '3%',
                    top: '38%',
                    containLabel: true
                },
                yAxis: {
                    type: 'value'
                },
                xAxis: {
                    type: 'category',
                    data: x
                },
                series: y.map(item => ({
                    name: item.name,
                    type: 'bar',
                    stack: 'total',
                    data: item.data
                }))
            };
        },
        setMapChartOption(data) {
            if (!Array.isArray(data)) {
                return;
            }
            let maxValue = data.length > 0 ? data[0].value : 0;
            data.forEach(item => {
                if (item.value > maxValue) {
                    maxValue = item.value;
                }
            });
            this.mapOption = {
                title: {
                    text: "中国人工智能企业分布地图",
                    left: "center",
                    top: 50
                },
                tooltip: {
                    trigger: "item"
                },
                //左侧小导航图标
                visualMap: {
                    min: 0,
                    max: maxValue,
                    left: "10%",
                    top: "bottom",
                    text: ["高", "低"],
                    calculable: true
                },
                series: [
                    {
                        name: "企业数量",
                        type: "map",
                        mapType: "china",
                        // zoom: 0.5,
                        roam: false, //是否开启鼠标缩放和平移漫游
                        label: {
                            // normal: {
                            //     show: false //显示省份
                            // },
                            emphasis: {
                                show: false
                            }
                        },
                        data
                    }
                ]
            };
        }
    }
}
</script>

<style lang="less" scoped>
.industry-map-container {
    // width: 100%;
    height: 500px;
    // box-sizing: border-box;
    // padding-right: 10px;
    display: flex;
    background: #fff;
    padding: 30px;
    margin-top: 10px;
    .pie-charts-container {
        // border: 1px solid black;
        flex: 2 3 0px;
        display: flex;
        flex-direction: column;
        .pie-charts-top {
            flex: 1 1 0%;
        }
        .pie-charts-bottom {
            flex: 1 1 0;
        }
    }
    .industry-map-china {
        // border: 1px solid black;
        flex: 3 2 0px;
    }
    .industry-map-event {
        // border: 1px solid black;
        flex: 2 3 0px;
        // margin-right: 10px;
        .box-card {
            .box-card-header {
                text-align: left;
            }
            .box-card-body {
                width: 100%;
                max-height: 400px;
                min-height: 300px;
                overflow: hidden;
            }
            .box-card-footer {
                color: teal;
                font-size: 12px;
                padding: 10px 20px 20px 0;
                text-align: right;
                span {
                    cursor: pointer;
                }
            }
            .box-card-item {
                text-align: left;
                border-bottom: 1px solid #DCDFE6;
                margin: 10px 0;
                padding-bottom: 10px;
                .box-card-item-title {
                    font-size: 14px;
                    font-weight: bold;
                    width: 100%;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    cursor: pointer;
                }
                .box-card-item-content {
                    font-size: 12px;
                    display: -webkit-box;
                    overflow: hidden;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    text-overflow: ellipsis;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>

<style lang="less">
.industry-map-container {
    .el-card__body {
        padding: 0 20px;
    }
}
</style>