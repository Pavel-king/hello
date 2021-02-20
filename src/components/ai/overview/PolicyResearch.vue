<template>
    <div class="policy-research-container" v-if="isShow">
        <div class="top-box">
            <div class="left-box">
                <div class="box-title">
                    <div class="main-title">重点政策</div>
                    <div class="more">更多<i class="el-icon-arrow-right"></i></div>
                </div>
                <div class="policy-body" v-for="(item, index) in policy" :key="index">
                    <div class="policy-content">{{ item.title }}</div>
                    <div class="policy-footer">
                        <span class="policy-type">[{{ item.type }}]</span>
                        <span class="policy-publisher">{{item.publisher }}</span>
                        <span class="policy-time">{{ item.time }}</span>
                    </div>
                </div>
            </div>
            <div class="right-box">
                <div class="box-title">
                    <div class="main-title">专家观点</div>
                    <div class="more">更多<i class="el-icon-arrow-right"></i></div>
                </div>
                <div class="experts-body" v-for="(item, index) in experts" :key="index">
                    <div class="pic"><img :src="item.src"/></div>
                    <div class="desc">
                        <div class="desc-title">{{ item.title }}</div>
                        <div class="desc-content">{{ item.content }}</div>
                        <div class="desc-footer"><span>{{ item.time }}</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom-box">
            <div class="left-box">
                <div class="box-title">
                    <div class="main-title">产业研报</div>
                    <div class="more">更多<i class="el-icon-arrow-right"></i></div>
                </div>
                <div class="industry-body" v-for="(item, index) in industry" :key="index">
                    <div class="pic"><img :src="item.src"/></div>
                    <div class="desc">
                        <div class="desc-title">{{ item.title }}</div>
                        <div class="desc-content">{{ item.content }}</div>
                        <div class="desc-footer">
                            <span class="desc-type">[{{ item.type }}]</span>
                            <span class="desc-publisher">{{ item.publisher }}</span>
                            <span class="desc-time">{{ item.time }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-box">
                <div class="box-title">
                    <div class="main-title">机构研报</div>
                    <div class="more">更多<i class="el-icon-arrow-right"></i></div>
                </div>
                <div class="institution-body" v-for="(item, index) in institution" :key="index">
                    <div class="desc-title">{{ item.title }}</div>
                    <div class="desc-content">{{ item.content }}</div>
                    <div class="desc-footer">
                        <span class="desc-type">[{{ item.type }}]</span>
                        <span class="desc-publisher">{{ item.publisher }}</span>
                        <span class="desc-time">{{ item.time }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IO from '@/common/util';
import API from '@/config/api';

export default {
    name: 'ai-overview-policy-research',
    data() {
        return {
            isShow: false,
            policy: [],
            experts: [],
            industry: [],
            institution: []
        };
    },
    created() {
        this.getData();
    },
    methods: {
        async getData() {
            try {
                this.isShow = false;
                const data = await IO.get(API.aiIndustryOverviewPolicyResearch);
                if (!data || !data.length) {
                    return;
                }
                const {policy, experts, industry, institution} = data[0];
                this.policy = policy || [];
                this.experts = experts || [];
                this.industry = industry || [];
                this.institution = institution || [];
                this.isShow = true;
            } catch (e) {
                console.error(e);
            }
        },
    }
}
</script>

<style lang="less" scoped>
.policy-research-container {
    // margin-top: 10px;
    .top-box, .bottom-box {
        width: 100%;
        display: flex;
        margin: 10px 0;
    }
    .left-box {
        flex: 1 1 0px;
        background: #fff;
        margin-right: 10px;
    }
    .right-box {
        flex: 1 1 0px;
        background: #fff;
    }
    .box-title {
        text-align: left;
        padding: 10px 20px;
        // height: 24px;
        // line-height: 24px;
        border-bottom: 1px solid #eee;
        .main-title {
            float: left;
            font-weight: bold;
            cursor: pointer;
        }
        .more {
            float: right;
            font-size: 14px;
            color: #409eff;
            cursor: pointer;
        }
        &::after {
            display: block;
            content: '';
            clear: both;
        }
    }
    .policy-body {
        text-align: left;
        margin: 20px 20px;
        border-bottom: 1px solid #eee;
        cursor: pointer;
        .policy-content {
            font-weight: bold;
            padding: 10px 0;
        }
        .policy-footer {
            color: gray;
            padding-bottom: 10px;
            .policy-type {
                font-size: 14px;
                margin-right: 20px;
            }
            .policy-publisher {
                font-size: 14px;
                margin-right: 20px;
            }
            .policy-time {
                font-size: 14px;
            }
        }
    }
    .experts-body {
        display: flex;
        padding: 20px 20px;
        text-align: left;
        border-bottom: 1px solid #eee;
        .pic {
            width: 150px;
            // height: 130px;
            flex: 0 0 150px;
            // margin-top: 10px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .desc {
            flex: 1 1 0px;
            margin-left: 10px;
            .desc-title {
                font-weight: bold;
                margin-bottom: 10px;
                cursor: pointer;
            }
            .desc-content {
                font-size: 13px;
                line-height: 20px;
                color: gray;
                cursor: pointer;
            }
            .desc-footer {
                margin-top: 5px;
                font-size: 13px;
                text-align: right;
                color: gray;
            }
        }
    }
    .industry-body {
        display: flex;
        padding: 20px 20px 5px 20px;
        text-align: left;
        border-bottom: 1px solid #eee;
        margin-bottom: 10px;
        .pic {
            width: 150px;
            // height: 130px;
            flex: 0 0 150px;
            // margin-top: 10px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .desc {
            flex: 1 1 0px;
            margin-left: 10px;
            .desc-title {
                font-weight: bold;
                margin-bottom: 10px;
                cursor: pointer;
            }
            .desc-content {
                font-size: 13px;
                line-height: 20px;
                color: gray;
                cursor: pointer;
            }
            .desc-footer {
                margin-top: 5px;
                font-size: 13px;
                text-align: right;
                color: gray;
                .desc-type, .desc-publisher {
                    margin-right: 20px;
                }
            }
        }
    }
    .institution-body {
        padding: 20px 20px 5px 20px;
        text-align: left;
        border-bottom: 1px solid #eee;
        margin-bottom: 10px;
        .desc-title {
            font-weight: bold;
            margin-bottom: 10px;
            cursor: pointer;
        }
        .desc-content {
            font-size: 13px;
            line-height: 20px;
            color: gray;
            cursor: pointer;
        }
        .desc-footer {
            margin-top: 20px;
            font-size: 13px;
            text-align: right;
            color: gray;
            .desc-type, .desc-publisher {
                margin-right: 20px;
            }
        }
    }
}
</style>