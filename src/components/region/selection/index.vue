<template>
    <div class="region-selection-container">
        <el-form
            :model="formData"
            ref="form"
            :rules="rules"
            label-width="120px"
            class="form-elem"
        >
            <el-form-item
                label="5A模型系数"
                prop="fiveAModel"
            >
                <el-input
                    v-model="formData.fiveAModel"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item
                label="优秀企业系数"
                prop="excellentEnterprises"
            >
                <el-input
                    v-model="formData.excellentEnterprises"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item
                label="合作强度系数"
                prop="cooperationIntensity"
            >
                <el-input
                    v-model="formData.cooperationIntensity"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">甄选</el-button>
            </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <div class="selection-charts-container">
            <div class="left-chart">
                <common-chart :option="colChartOption"/>
            </div>
            <div class="right-chart">
                <common-chart :option="pieChartOption"/>
            </div>
        </div>
    </div>
</template>

<script>
import CommonChart from '@/components/common/CommonCharts.vue';
import IO from '@/common/util';
import API from '@/config/api';

export default {
    name: 'region-selection',
    components: {
        'common-chart': CommonChart
    },
    data() {
        const checkFloat = (rule, value, callback) => {
            // console.log(rule, value, callback);
            const map2Str = {
                fiveAModel: '5A模型',
                excellentEnterprises: '优秀企业',
                cooperationIntensity: '合作强度'
            }
            value = Number(value);
            if (Number.isNaN(value)) {
                callback(new Error(map2Str[rule.field] + '系数必须为数字值'));
            }
            else if (value < 0 || value > 1) {
                callback(new Error(map2Str[rule.field] + '系数必须为0到1之间小数'));
            }
            else {
                callback();
            }
        }
        return {
            rules: {
                fiveAModel: [
                    { required: true, message: '5A模型系数不能为空' },
                    { validator: checkFloat, trigger: ['blur'] }
                ],
                excellentEnterprises: [
                    { required: true, message: '优秀企业系数不能为空'},
                    { validator: checkFloat, trigger: ['blur'] }
                ],
                cooperationIntensity: [
                    { required: true, message: '合作强度系数不能为空'},
                    { validator: checkFloat, trigger: ['blur'] }
                ]
            },
            formData: {
                fiveAModel: 0.30,
                excellentEnterprises: 0.30,
                cooperationIntensity: 0.40
            },
            colorConfig: ['#00008b', '#f93', '#ffde00', '#002a8f', '#003580', '#d52b1e', '#000', '#003897', '#f93', '#bc002d', '#024fa2', '#000', '#00247d', '#ef2b2d', '#dc143c', '#e30a17', '#00247d', '#b22234'],
            colorMap: {},
            chartsData: [],
            colChartOption: null,
            pieChartOption: null
        };
    },
    created() {
        this.getData();
    },
    methods: {
        submitForm() {
            this.$refs.form.validate((valid) => {
                if (!valid) {
                    return false;
                }
                const {fiveAModel, excellentEnterprises, cooperationIntensity} = this.formData;
                if (Math.abs((+fiveAModel) + (+excellentEnterprises) + (+cooperationIntensity) - 1) > 1e-7) {
                    this.$message({
                        message: '三者系数之和必须为1',
                        type: 'error'
                    });
                    return false;
                }
                this.generateCharts();
            });
        },
        async getData() {
            this.chartsData = await IO.get(API.regionSelection);
            let colorMap = {};
            this.chartsData.forEach((item, index) => {
                colorMap[item.industry] = this.colorConfig[index];
            });
            this.colorMap = colorMap;
            setTimeout(() => {
                this.generateCharts();
            }, 2000);
            
        },
        generateCharts() {
            const {fiveAModel, excellentEnterprises, cooperationIntensity} = this.formData;
            const data = this.chartsData.map(item => ({
                industry: item.industry,
                score: (Number(fiveAModel) * item.fiveAModel
                    + Number(excellentEnterprises) * item.excellentEnterprises
                    + Number(cooperationIntensity) * item.cooperationIntensity).toFixed(2)
            })).sort((a, b) => (b.score - a.score));
            this.colChartOption = {
                grid: {
                    // top: 10,
                    // bottom: 30,
                    left: '20%',
                    // right: 80
                },
                xAxis: {
                    max: 'dataMax',
                    type: 'value'
                },
                yAxis: {
                    type: 'category',
                    inverse: true,
                    // max: 7,
                    data: data.map(item => item.industry),
                    axisLabel: {
                        show: true,
                        textStyle: {
                            fontSize: 12
                        },
                        formatter: function (value) {
                            if (value.length < 6) {
                                return value;
                            }
                            let index = Math.floor(value.length / 2);
                            return value.slice(0, index) + '\n' + value.slice(index);
                        },
                        rich: {
                            flag: {
                                fontSize: 14,
                                padding: 5
                            }
                        }
                    },
                    animationDuration: 300,
                    animationDurationUpdate: 300
                },
                series: [{
                    realtimeSort: true,
                    type: 'bar',
                    data: data.map(item => item.score),
                    itemStyle: {
                        color: param => this.colorMap[param.name] || '#b22234'
                    },
                    label: {
                        show: true,
                        precision: 2,
                        position: 'right',
                        valueAnimation: true,
                        fontFamily: 'monospace'
                    }
                }],
                animationDuration: 0,
                animationDurationUpdate: 1000,
                animationEasing: 'linear',
                animationEasingUpdate: 'linear'
            };
            this.pieChartOption = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {d}%'
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: [20, 140],
                        center: ['50%', 220],
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: 5,
                            color: param => this.colorMap[param.name] || '#b22234'
                        },
                        // label: {
                        //     show: false
                        // },
                        data: data.map(item => ({
                            value: item.score,
                            name: item.industry
                        }))
                    }
                ]
            };
        }
    }
}
</script>

<style lang="less">
.region-selection-container {
    padding: 10px 0;
    background: #fff;
    min-width: 1000px;
    .form-elem {
        width: 400px;
        padding-left: 40px;
    }
    .selection-charts-container {
        // width: 100%;
        min-width: 1000px;
        height: 500px;
        display: flex;
        .left-chart {
            // width: 50%;
            flex: 1 1 0px;
        }
        .right-chart {
            // width: 50%;
            flex: 1 1 0px;
        }
    }
}
</style>
