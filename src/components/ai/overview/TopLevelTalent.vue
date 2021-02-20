<template>
    <div class="top-level-talent-container" v-if="isShow">
        <div class="item-container map">
            <common-chart :option="mapOption"/>
        </div>
        <div class="item-container pie">
            <common-chart :option="nightingaleRoseOption"/>
        </div>
        <div class="item-container profile">
            <div class="profile-tab"><span class="active">人才动态</span><span>人才搜索</span></div>
            <div class="talent-info-box" v-for="(item, index) in talentsInfo" :key="index">
                <div class="pic"><img :src="item.src"/></div>
                <div class="desc">
                    <h4 class="name">{{ item.name }}</h4>
                    <p class="text"><span class="bold">个人简介：</span>{{ item.profile }}</p>
                    <p class="text"><span class="bold">新闻动态：</span>{{ item.news }}</p>
                </div>
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
    name: 'ai-overview-top-level-talent',
    components: {
        'common-chart': CommonChart
    },
    data() {
        return {
            isShow: false,
            mapOption: null,
            nightingaleRoseOption: null,
            talentsInfo: [],
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
                const {map, talentRate, talentsInfo, tanlentsNumber} = await IO.get(API.aiIndustryOverviewTopLevelTalent);
                this.setMapChartOption(map);
                this.setNightingaleRoseOption(talentRate);
                this.talentsInfo = talentsInfo || [];
                this.setBarOption(tanlentsNumber);
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
                    text: "中国人工智能人才分布地图",
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
                        name: "人才数量",
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
        setNightingaleRoseOption(data) {
            this.nightingaleRoseOption = {
                title: {
                    text: '中国人工智能人才领域分布',
                    left: 'center',
                    top: 10
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {d}%'
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: [20, 140],
                        center: ['50%', 200],
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: 5
                        },
                        // label: {
                        //     show: false
                        // },
                        data
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
                    text: '人工智能人才投入量排名(TOP20)',
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
                    type: 'value',
                    name: '总数'
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
.top-level-talent-container {
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
        &.pie {
            height: 400px;
        }
        &.profile {
            border: 1px solid #ddd;
            margin-bottom: 20px;
        }
        &.bar {
            height: 500px;
        }
    }
    .profile-tab {
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
    .talent-info-box {
        width: 100%;
        height: 130px;
        margin: 10px 0;
        // overflow: hidden;
        .pic {
            width: 80px;
            height: 100%;
            float: left;
            margin-left: 10px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .desc {
            width: calc(100% - 124px);
            height: 100%;
            float: left;
            text-align: left;
            margin: 0 20px 0 14px;
            .name {
                font-size: 14px;
                margin-bottom: 7px;
            }
            .text {
                font-size: 12px;
                margin-bottom: 5px;
            }
            .bold {
                font-weight: bold;
            }
        }
        &::after {
            display: block;
            content: '';
            clear: both;
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