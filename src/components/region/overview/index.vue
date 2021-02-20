<template>
    <div class="region-overview-container">
        <div class="region-overview-title">
            <div class="city-label title-item">请选择城市</div>
            <el-select
                v-model="city"
                placeholder="请选择城市"
                @change="cityChange"
                class="title-item"
            >
                <el-option
                    v-for="item in cityOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select>
            <h3 class="title-item">{{city}}区域产业概览</h3>
        </div>
        <div class="tab-container">
            <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
                <el-tab-pane
                    v-for="item in tabs"
                    :key="item.name"
                    :label="item.label"
                    :name="item.name"
                />
            </el-tabs>
        </div>
        <div class="charts-container">
            <div id="region-main-charts"></div>
        </div>
        <div class="event-container">
            <div class="event-title">区域大事记</div>
            <div class="event-body">
                <div class="event-body-left">
                    <div class="event-body-title flex-box">
                        <span class="flex-item-left">重大政策发布</span>
                        <span class="more flex-item-right">
                            <span>more</span>
                            <i class="el-icon-d-arrow-right"/>
                        </span>
                    </div>
                    <ul class="event-body-ul">
                        <li
                            v-for="(item, index) in policyEventData"
                            :key="index"
                            class="flex-box event-body-li"
                        >
                            <div class="flex-item-left">{{ item.title }}</div>
                            <span class="flex-item-right">{{ item.time }}</span>
                        </li>
                    </ul>
                </div>
                <div class="event-body-right">
                    <div class="event-body-title flex-box">
                        <span class="flex-item-left">企业事件推送</span>
                        <span class="more flex-item-right">
                            <span>more</span>
                            <i class="el-icon-d-arrow-right"/>
                        </span>
                    </div>
                    <ul class="event-body-ul">
                        <li
                            v-for="(item, index) in companyEventData"
                            :key="index"
                            class="flex-box event-body-li"
                        >
                            <div class="flex-item-left">{{ item.title }}</div>
                            <div class="flex-item-right">
                                <span class="flex-item-right-brand">[{{ item.brand }}]</span>
                                <span>{{ item.time }}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import IO from '@/common/util';
import API from '@/config/api';

export default {
    name: "region-overview",
    data() {
        return {
            cityOptions: [
                {label: '南京', value: '南京'},
                {label: '东莞', value: '东莞'}
            ],
            city: '南京',
            activeTab: "recommendIndex",
            tabs: [
                { label: "推荐指数", name: 'recommendIndex'},
                { label: "政策大势", name: 'policyTrend'},
                { label: '需求趋势', name: 'demandTrend'},
                { label: '竞争优势', name: 'competitionEdge'},
                { label: '要素能势', name: 'elementEnergy'},
                { label: '产业协同', name: 'industrySynergy'}
            ],
            tabsMap: {
                'recommendIndex': '推荐指数',
                'policyTrend': '政策大势',
                'demandTrend': '需求趋势',
                'competitionEdge': '竞争优势',
                'elementEnergy': '要素能势',
                'industrySynergy': '产业协同'
            },
            mainCharts: null,
            chartsOption: null,
            companyEventData: [],
            policyEventData: []
        };
    },
    created() {
        // 请求数据
        this.getChartsData();
        this.getRegionEventData();
    },
    mounted() {
        this.initCharts();
    },
    methods: {
        cityChange() {
            this.getChartsData();
        },
        async getChartsData() {
            try {
                const data = await IO.post(API.regionIndustryOverviewCharts, {
                    type: this.activeTab,
                    city: this.city
                });
                if (!data || !data.length) {
                    return;
                }
                const {regionData} = data[0];
                const titleText = this.city + '区域产业' + this.tabsMap[this.activeTab] + '曲线';
                this.chartsOption = {
                    title: {
                        text: titleText,
                        // textAlign: 'center',
                        // top: 0,
                        left: 'center',
                        top: 0,
                    },
                    tooltip: {
                        trigger: 'axis',
                        order: 'valueDesc'
                    },
                    legend: {
                        data: regionData.yData.map(item => item.industryName),
                        top: '30px'
                    },
                    grid: {
                        top: 60,
                        left: '3%',
                        right: '4%',
                        // bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        name: '时间',
                        data: regionData.xData
                    },
                    yAxis: {
                        name: '值',
                        type: 'value'
                    },
                    series: regionData.yData.map(item => ({
                        name: item.industryName,
                        type: 'line',
                        data: item.data,
                        smooth: true
                    })),
                    dataZoom: [
                        {
                            type: 'inside',
                            show: true,
                            start: 0,
                            end: 100
                        },
                        {
                            type: 'slider',
                            show: true,
                            realtime: true,
                            start: 0,
                            end: 100
                        }
                    ]
                }
                this.initCharts();
            } catch (e) {
                console.error(e);
            }
        },
        initCharts() {
            if (!this.mainCharts) {
                let dom = document.getElementById('region-main-charts');
                this.mainCharts = dom ? echarts.init(dom) : null;
            }
            if (this.mainCharts && this.chartsOption) {
                this.mainCharts.setOption(this.chartsOption, true);
            }
        },
        handleClick() {
            this.chartsOption = null;
            this.getChartsData();
        },
        async getRegionEventData() {
            try {
                const data = await IO.get(API.regionIndustryOverviewEvent);
                if (!data || !data.length) {
                    return;
                }
                const {company, policy} = data[0];
                this.companyEventData = company;
                this.policyEventData = policy;
            } catch (e) {
                console.error(e);
            }
        },
    }
};
</script>

<style lang="less">
.region-overview-container {
    background: #fff;
    padding: 10px 0;
    .region-overview-title {
        min-width: 650px;
        height: 50px;
        line-height: 50px;
        margin: 10px 0 0 30px;
        h3 {
            font-size: 30px;
            margin-left: 20%;
        }
        .city-label {
            margin-right: 20px;
        }
        .title-item {
            float: left;
        }
        &::after {
            display: block;
            content: '';
            clear: both;
        }
    }
    .tab-container {
        margin: 20px 30px 20px 30px;
    }
    .charts-container {
        margin: 0 auto;
        width: 1000px;
        height: 55vh;
        #region-main-charts {
            width: 100%;
            height: 100%;
        }
    }
    .event-container {
        background: #eee;
        padding-top: 20px;
        text-align: left;
        .event-title {
            width: 100%;
            box-sizing: border-box;
            background: #fff;
            border-bottom: 1px solid #eee;
            padding: 10px 30px;
            font-weight: bold;
        }
        .event-body {
            padding: 10px 30px;
            background: #fff;
            display: flex;
            .event-body-left, .event-body-right {
                flex: 1 1 0px;
            }
            .event-body-title {
                height: 26px;
                line-height: 26px;
                // margin-right: 50px;
                .flex-item-left {
                    font-size: 14px;
                    font-weight: bold;
                }
                .more {
                    cursor: pointer;
                    i {
                        line-height: 22px;
                    }
                }
            }
            .event-body-ul {
                .event-body-li {
                    cursor: pointer;
                }
            }
            .event-body-right {
                .event-body-li {
                    .flex-item-right {
                        .flex-item-right-brand {
                            margin-right: 20px;
                        }
                    }
                }
            }
            .flex-box {
                display: flex;
                font-size: 12px;
                margin: 10px 0;
                .flex-item-left {
                    flex: 1 1 auto;
                }
                .flex-item-right {
                    // min-width: 100px;
                    width: 110px;
                    flex: 0 0 110px;
                    text-align: right;
                    margin-right: 20px;
                }
            }
        }
    }
}
</style>
