<template>
  <div id="app">
    <keep-alive exclude="movieDetail,userCenter1">
      <router-view></router-view>   
    </keep-alive>
    <tab v-show="this.$route.path==='/hot-show'||this.$route.path==='/among'||this.$route.path==='/user-center'"></tab>
  </div>
</template>

<script type="text/ecmascript-6">
import Tab from 'components/tab/tab'

export default {
  components: {
    Tab
  }
}
</script>

<style>
</style>
