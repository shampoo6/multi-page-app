<template>
    <div id="user-manager">
        <el-container>
            <el-header>
                <el-form ref="form" :model="form" label-width="80px" inline>
                    <el-form-item label="姓名">
                        <el-input v-model="form.Name"/>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-select v-model="form.SexValue">
                            <el-option value="不限"/>
                            <el-option value="男"/>
                            <el-option value="女"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input v-model="form.Age" @change="onAgeChange" clearable/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click.native="search">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main>
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            prop="Name"
                            label="姓名"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="Sex"
                            label="性别"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="Age"
                            label="年龄">
                    </el-table-column>
                    <el-table-column
                            prop="Mobile"
                            label="手机号">
                    </el-table-column>
                    <el-table-column
                            prop="Email"
                            label="邮箱">
                    </el-table-column>
                    <el-table-column
                            prop="Address"
                            label="地址">
                    </el-table-column>
                </el-table>
            </el-main>
            <el-footer>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pager.page"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="pager.size"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pager.totalElement">
                </el-pagination>
            </el-footer>
        </el-container>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {User} from "@/model/user";
    import qs from 'qs'
    import {Pager} from "@/model/pager";
    import {request} from "@/utils/request";

    @Component
    export default class UserManager extends Vue {
        form: User = {
            Name: '',
            Sex: null,
            SexValue: null,
            Age: null
        }

        pager: Pager = {
            page: 0,
            size: 5,
            totalElement: 0,
            totalPage: 0,
            sort: []
        }

        tableData: any = null

        created() {
            this.search(0)
        }

        @Watch('form.SexValue')
        watchSexValue(sexValue: any) {
            this.form.Sex = sexValue == '不限' ? null : (sexValue == '男' ? 'Male' : 'Female')
        }

        onAgeChange(val: any) {
            if (isNaN(Number(val)))
                this.form.Age = null
        }

        search(page: number) {
            this.pager.page = page ? page : 0
            console.log(this.form)

            let data: any = {}
            let form: any = this.form
            for (let key in form) {
                let value = form[key]
                if (value)
                    data[key] = value
            }
            let pager: any = this.pager
            for (let key in pager) {
                let value = pager[key]
                if (value)
                    data[key] = value
            }

            data = qs.stringify(data)
            console.log(data)

            request('/user/page', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    // 'Access-Control-Request-Headers': 'Authorization'
                }
            }).then(res => {
                console.log(res.data)
                this.tableData = res.data.content.Data
                this.setPage(res.data.content.PageInfo)
            })
        }

        setPage(pageInfo: any) {
            console.log(pageInfo)
            let pager: any = this.pager
            for (let key in pageInfo) {
                let value = pageInfo[key]
                if (value)
                    pager[key] = value
            }
        }

        handleSizeChange(val: any) {
            console.log(val)
        }

        handleCurrentChange(val: any) {
            console.log(val)
        }
    }

</script>

<style scoped>

</style>