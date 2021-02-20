<template>
    <div class="intellectual-property-right-container" v-if="isShow">
        <div class="item-container map">
            <common-chart :option="mapOption"/>
        </div>
        <div class="item-container ip-trend">
            <common-chart :option="ipTrendOption"/>
        </div>
        <div class="item-container ip-event">
            <div class="ip-event-tab"><span class="active">知识产权动态</span><span>知识产权搜索</span></div>
            <div class="ip-event-box" v-for="(item, index) in ipEvents" :key="index">
                <div class="ip-event-title">{{ item.title }}</div>
                <div class="ip-event-content">{{ item.content }}</div>
            </div>
            <div class="more"><span>更多...</span></div>
        </div>
        <div class="item-container bar">
            <common-chart :option="barOption"/>
        </div>
    </div>
</template>

<script>
import CommonChart from '@/components/common/CommonCharts.vue';
import IO from '@/common/util';
import API from '@/config/api';

export default {
    name: 'ai-overview-intellectual-property-right',
    components: {
        'common-chart': CommonChart
    },
    data() {
        return {
            isShow: false,
            mapOption: null,
            ipTrendOption: null,
            ipEvents: [],
            barOption: null
        };
    },
    created() {
        this.getData();
    },
    methods: {
        async getData() {
            try {
                this.isShow = false;
                const {map, ipNumbers, ipEvents, ipProduction} = await IO.get(API.aiIndustryOverviewIntellectualPropertyRight);
                this.setMapChartOption(map);
                this.setIPTrendOption(ipNumbers);
                this.ipEvents = ipEvents || [];
                this.setBarOption(ipProduction);
                this.isShow = true;
            } catch (e) {
                console.error(e);
            }
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
                    text: "中国人工智能知识产权分布地图",
                    left: "center",
                    top: 10
                },
                tooltip: {
                    trigger: "item"
                },
                //左侧小导航图标
                visualMap: {
                    min: 0,
                    max: maxValue,
                    left: "0%",
                    top: "bottom",
                    text: ["高", "低"],
                    calculable: true
                },
                series: [
                    {
                        name: "知识产权数量",
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
        },
        setIPTrendOption(data) {
            if (!Array.isArray(data)) {
                return;
            }
            let maxValue = 0;
            data.forEach(item => {
                maxValue = item.china > maxValue ? item.china : maxValue;
                maxValue = item.world > maxValue ? item.world : maxValue;
            })
            this.ipTrendOption = {
                title: {
                    text: `中国AI领域知识产权产出及其占全球占比发展趋势(${data[0].time}-${data[data.length-1].time})`,
                    left: "center",
                    top: 10
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function(params) {
                        let str = params[0].name + '年<br/>';
                        params.forEach(item => {
                            if (item.seriesName == "中国AI知识产权数占全球比例") {
                                str += item.marker + item.seriesName + ': ' + item.data + '%<br/>';
                            } else {
                                str += item.marker + item.seriesName + ': ' + item.data + '<br/>';
                            }
                        });
                        return str;
                    }
                },
                grid: {
                    top: 100
                },
                xAxis: [
                    {
                        type: 'category',
                        data: data.map(item => item.time),
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '数量',
                        min: 0,
                        max: maxValue,
                    },
                    {
                        type: 'value',
                        name: '占比',
                        // min: 0,
                        // max: 100,
                        // interval: 20,
                        axisLabel: {
                            formatter: '{value} %'
                        },
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        name: '中国AI知识产权数',
                        type: 'bar',
                        data: data.map(item => item.china)
                    },
                    {
                        name: '全球AI知识产权数',
                        type: 'bar',
                        data: data.map(item => item.world)
                    },
                    {
                        name: '中国AI知识产权数占全球比例',
                        type: 'line',
                        yAxisIndex: 1,
                        data: data.map(item => (item.china / item.world * 100).toFixed(1))
                    }
                ]
            };
        },
        setBarOption(data) {
            if (!Array.isArray(data)) {
                return;
            }
            this.barOption = {
                title: {
                    text: '中国AI领域知识产权产出排名',
                    subtext: '论文产出总数',
                    left: 'center',
                    top: 0
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'none'
                    }
                },
                grid: {
                    left: 120
                },
                xAxis: {
                    type: 'value'
                },
                yAxis: {
                    type: 'category',
                    data: data.map(item => item.name)
                },
                series: [{
                    data: data.map(item => item.value),
                    type: 'bar'
                }]
            };
        }
    }
}
</script>

<style lang="less" scoped>
.intellectual-property-right-container {
    // width: 100%;
    // height: 800px;
    padding: 30px;
    margin-top: 10px;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    .item-container {
        width: 50%;
        height: 50%;
        flex: 1 1 50%;
        box-sizing: border-box;
        &.map {
            height: 400px;
        }
        &.ip-trend {
            height: 400px;
        }
        &.ip-event {
            border: 1px solid #ddd;
            margin: 30px 0 20px 0;
        }
        &.bar {
            height: 500px;
        }
    }
    .ip-event-tab {
        font-size: 16px;
        text-align: left;
        span {
            display: inline-block;
            padding: 6px 30px;
            background: #ecf5ff;
            color: #409eff;
            cursor: pointer;
        }
        .active {
            background: #66b1ff;
            color: #fff;
        }
    }
    .ip-event-box {
        // width: 100%;
        // height: 130px;
        margin: 10px 0;
        // overflow: hidden;
        text-align: left;
        margin: 15px 30px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ccc;
        .ip-event-title {
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
        }
        .ip-event-content {
            font-size: 12px;
            cursor: pointer;
        }
    }
    .more {
        text-align: right;
        color: #409eff;
        font-size: 14px;
        padding-bottom: 10px;
        span {
            cursor: pointer;
            margin-right: 20px;
        }
    }
}
</style>