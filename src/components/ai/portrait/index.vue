<template>
    <div class="ai-portrait-container">
        <div class="filter">
            <el-input placeholder="请输入搜索内容" v-model="query" @change="handleSearch">
                <el-select v-model="type" slot="prepend" class="select">
                    <el-option
                        v-for="item in typeOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <el-table
            :data="tableData"
            class="company-table"
            stripe
            border
            @sort-change="tableSort"
            ref="table"
        >
            <el-table-column
                prop="_id"
                label="企业编号"
            />
            <el-table-column
                prop="name"
                label="企业名称"
            />
            <el-table-column
                prop="talent"
                label="人才"
                width="80"
                sortable
            />
            <el-table-column
                prop="trade"
                label="外贸"
                width="80"
                sortable
            />
            <el-table-column
                prop="innovation"
                label="创新"
                width="80"
                sortable
            />
            <el-table-column
                prop="brand"
                label="品牌"
                width="80"
                sortable
            />
            <el-table-column
                prop="competitionIndex"
                label="竞争力指数"
                width="120"
                sortable
            />
            <el-table-column
                prop="scoreSum"
                label="总分"
                width="90"
                sortable
            />
        </el-table>
        <el-pagination
            class="company-pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            :page-sizes="[10, 30, 50]"
            :page-size="size"
            layout="sizes, prev, pager, next"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
import IO from '@/common/util';
import API from '@/config/api';

export default {
    name: 'ai-portrait',
    data() {
        return {
            type: 'enterpriseName',
            typeOption: [
                {label: '企业名称', value: 'enterpriseName'},
                {label: 'AI产业', value: 'AIIndustry'},
                {label: '城市', value: 'city'}
            ],
            query: '',
            allTableData: [],
            tableData: [],
            // 分页
            page: 1,
            size: 10,
            total: 0
        };
    },
    created() {
        this.getData();
    },
    methods: {
        handleSearch() {
            this.getData();
        },
        async getData() {
            this.allTableData = await IO.post(API.aiIndustryPortraitCompany, {
                type: this.type,
                query: this.query
            });
            this.backupAllTableData = [...this.allTableData];
            this.$refs.table.clearSort();
            this.page = 1;
            this.tableData = this.allTableData.slice(0, this.size);
            this.total = this.allTableData.length;
        },
        tableSort({prop, order}) {
            if (!order) {
                this.allTableData = [...this.backupAllTableData];
            }
            else {
                this.allTableData.sort((a, b) => {
                    let v = (+a[prop]) - (+b[prop]);
                    return order === 'ascending' ? v : -v;
                });
            }
            this.tableData = this.allTableData.slice((this.page - 1) * this.size, this.page * this.size);
        },
        handleSizeChange(size) {
            this.size = size;
            this.page = 1;
            this.tableData = this.allTableData.slice((this.page - 1) * this.size, this.page * this.size);
        },
        handleCurrentChange() {
            this.tableData = this.allTableData.slice((this.page - 1) * this.size, this.page * this.size);
        }
    }
}
</script>

<style lang="less">
.ai-portrait-container {
    background: #fff;
    // width: 100%;
    padding: 10px 0px 10px 30px;
    // min-height: calc(100vh - 110px);
    .filter {
        width: 500px;
        .select {
            width: 120px;
        }
    }
    .company-table {
        width: 90%;
        margin: 10px 0;
    }
    .company-pagination {
        text-align: left;
    }
}
</style>
