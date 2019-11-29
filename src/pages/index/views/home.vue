<template>
    <div class="home">
        <img alt="Vue logo" src="../../../assets/logo.png">
        <h2>beego+vue简易服务</h2>
        <el-button @click.native="toUserManager">用户管理</el-button>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class Home extends Vue {
        toUserManager() {
            location.assign('../../user-manager/user-manager.html')
        }
    }
</script>
