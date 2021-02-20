<template>
    <div class="industry-chain-map-container">
        <div class="basic-tech">
            <div class="title">
                <h3 class="title-inner">基础技术</h3>
            </div>
            <div class="content">
                <div class="general-ai">
                    <div class="item-head">通用人工智能技术</div>
                    <div class="item-body">
                        <el-tag
                            v-for="(v, i) in techGeneralAi"
                            :key="v"
                            :type="color[i % 5]"
                        >{{ v }}</el-tag>
                    </div>
                </div>
                <div class="area-ai">
                    <div class="item-head">领域人工智能技术</div>
                    <div class="item-body">
                        <el-tag
                            v-for="(v, i) in techAreaAi"
                            :key="v"
                            :type="color[i % 5]"
                        >{{ v }}</el-tag>
                    </div>
                </div>
            </div>
        </div>
        <el-divider/>
        <div class="basic-resource">
            <div class="title">
                <h3 class="title-inner">基础资源</h3>
            </div>
            <div class="content">
                <div class="data">
                    <div class="item-head">数据</div>
                    <div class="item-body">
                        <el-tag
                            v-for="(v, i) in resourceData"
                            :key="v"
                            :type="color[i % 5]"
                        >{{ v }}</el-tag>
                    </div>
                </div>
                <div class="algorithm">
                    <div class="item-head">算法</div>
                    <div class="item-body">
                        <el-tag
                            v-for="(v, i) in resourceAlgorithm"
                            :key="v"
                            :type="color[i % 5]"
                        >{{ v }}</el-tag>
                    </div>
                </div>
                <div class="power">
                    <div class="item-head">算力</div>
                    <div class="item-body">
                        <el-tag
                            v-for="(v, i) in resourcePower"
                            :key="v"
                            :type="color[i % 5]"
                        >{{ v }}</el-tag>
                    </div>
                </div>
            </div>
        </div>
        <el-divider/>
        <div class="basic-area">
            <div class="title">
                <h3 class="title-inner">应用领域</h3>
            </div>
            <div class="content">
                <div class="system">
                    <div class="item-head">系统应用</div>
                    <div class="item-body">
                        <el-tag
                            v-for="(v, i) in areaSystem"
                            :key="v"
                            :type="color[i % 5]"
                        >{{ v }}</el-tag>
                    </div>
                </div>
                <div class="government">
                    <div class="item-head">政企应用</div>
                    <div class="item-body">
                        <el-tag
                            v-for="(v, i) in areaGovernment"
                            :key="v"
                            :type="color[i % 5]"
                        >{{ v }}</el-tag>
                    </div>
                </div>
                <div class="industry">
                    <div class="item-head">行业应用</div>
                    <div class="item-body">
                        <el-tag
                            v-for="(v, i) in areaIndustry"
                            :key="v"
                            :type="color[i % 5]"
                        >{{ v }}</el-tag>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ai-overview-industry-chain-map',
    data() {
        return {
            color: ['', 'success', 'info', 'warning', 'danger'],
            techGeneralAi: ['计算机视觉', '物联网技术', '智能语音',
                '知识图谱', '自然语言处理', '区块链技术', '云计算与大数据'],
            techAreaAi: ['搜索引擎', '生物信息', '用户画像', '纳米技术', '精准推荐', '量子计算',
                '智能问答', '网络安全', '人机交互', '开源平台', '定位导航'],
            resourceData: ['数据采集', '数据加工', '数据挖掘', '数据库', '数据可视化'],
            resourceAlgorithm: ['机器学习算法', '神经网络算法', '前沿理论研究'],
            resourcePower: ['GPU', 'FPGA', 'ASIC', '类闹芯', '传感器'],
            areaSystem: ['机器人', '无人机', '自动驾驶', '移动设备', '软件系统'],
            areaGovernment: ['智能营销', '智能办公', '智能客服', '智能风控', '智能人力', '智能政务'],
            areaIndustry: ['智慧农业', '智慧医疗', '智慧楼宇', '智慧制造', '智慧安防', '智慧设计',
                '智慧物流', '智慧零售', '智慧资讯', '智慧通信', '智慧家居', '智慧教育', '智慧出行',
                '智慧司法', '智慧文娱', '智慧金融', '智慧国防', '智慧生活']
        };
    }
}
</script>

<style lang="less" scoped>
.industry-chain-map-container {
    // width: 100%;
    // height: 100%;
    padding: 30px;
    margin-top: 10px;
    background: #fff;
    .title {
        flex: 0 0 20px;
        width: 20px;
        padding: 0px 30px;
        // margin-top: 50px;
        // position: relative;
        // top: 50%;
        // transform: translateY(-50%);
        .title-inner {
            position: relative;
            top: 50%;
            transform: translateY(-50%);
        }
    }
    .content {
        flex: 1 1 0px;
        display: flex;
        justify-content: space-around;
    }
    .item-head {
        text-align: center;
        padding: 10px 0px;
        border-bottom: 1px solid #dcdfe6;
    }
    .item-body {
        padding: 10px;
    }
    .basic-tech {
        display: flex;
        .general-ai {
            flex: 0 0 300px;
            // margin: 10px 80px 10px 80px;
            border: 1px solid #dcdfe6;
            border-radius: 10px;
        }
        .area-ai {
            flex: 0 0 300px;
            // margin: 10px 80px 10px 80px;
            border: 1px solid #dcdfe6;
            border-radius: 10px;
        }
    }
    .basic-resource {
        display: flex;
        .data {
            flex: 0 0 200px;
            border: 1px solid #dcdfe6;
            border-radius: 8px;
            // margin: 10px 50px;
        }
        .algorithm {
            flex: 0 0 200px;
            border: 1px solid #dcdfe6;
            border-radius: 8px;
            // margin: 10px 50px;
        }
        .power {
            flex: 0 0 200px;
            border: 1px solid #dcdfe6;
            border-radius: 8px;
            // margin: 10px 50px;
        }
    }
    .basic-area {
        display: flex;
        .system {
            flex: 0 0 200px;
            border: 1px solid #dcdfe6;
            border-radius: 8px;
            // margin: 10px 20px;
        }
        .government {
            flex: 0 0 200px;
            border: 1px solid #dcdfe6;
            border-radius: 8px;
            // margin: 10px 20px;
        }
        .industry {
            flex: 0 0 450px;
            border: 1px solid #dcdfe6;
            border-radius: 8px;
            // margin: 10px 0px 10px 20px;
        }
    }
}
</style>

<style lang="less">
.industry-chain-map-container {
    .el-tag {
        margin: 5px;
    }
}
</style>