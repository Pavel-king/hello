<template>
  <div class="ai-overview-container">
    <div class="tab-container">
        <el-tabs v-model="activeTab" type="card">
            <el-tab-pane
                v-for="item in tabs"
                :key="item.name"
                :label="item.label"
                :name="item.name"
            />
        </el-tabs>
    </div>
    <div class="body-container">
        <industry-map v-if="activeTab === 'industryMap'"/>
        <industry-chain-map v-if="activeTab === 'industryChainMap'"/>
        <top-level-talent v-if="activeTab === 'topLevelTalent'"/>
        <intellectual-property-right v-if="activeTab === 'intellectualPropertyRight'"/>
        <policy-research v-if="activeTab === 'policyResearch'"/>
    </div>
  </div>
</template>

<script>
// import * as echarts from 'echarts';
import IndustryMap from './IndustryMap';
import IndustryChainMap from './IndustryChainMap';
import TopLevelTalent from './TopLevelTalent';
import IntellectualPropertyRight from './IntellectualPropertyRight';
import PolicyResearch from './PolicyResearch';

export default {
    name: 'ai-overview',
    components: {
        'industry-map': IndustryMap,
        'industry-chain-map': IndustryChainMap,
        'top-level-talent': TopLevelTalent,
        'intellectual-property-right': IntellectualPropertyRight,
        'policy-research': PolicyResearch
    },
    data() {
        return {
            activeTab: 'industryMap',
            tabs: [
                {label: '产业地图', name: 'industryMap'},
                {label: '产业链图', name: 'industryChainMap'},
                {label: '高端人才', name: 'topLevelTalent'},
                {label: '知识产权', name: 'intellectualPropertyRight'},
                {label: '政策研判', name: 'policyResearch'}
            ],
            mapOption: null
        };
    }
}
</script>

<style lang="less">
.ai-overview-container {
    background: transparent;
    width: 100%;
    min-height: calc(100vh - 110px);
    .tab-container {
        padding: 30px 30px 0 30px;
        min-width: 300px;
        background: #fff;
    }
    .body-container {
        width: 100%;
        box-sizing: border-box;
        // padding: 0 30px;
    }
}
</style>
