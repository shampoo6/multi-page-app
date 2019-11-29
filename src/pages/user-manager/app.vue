<template>
    <div id="app">
        <UserManager></UserManager>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import UserManager from './views/user-manager.vue'

    @Component({
        components: {
            UserManager
        }
    })
    export default class App extends Vue {
    }
</script>
