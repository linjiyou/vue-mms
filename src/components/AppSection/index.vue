<template>
  <section class="section">
   <app-link v-show="$route.path!=='/home'"></app-link>

    <router-view></router-view>
  </section>
</template>
<script>
import AppLink from './Link' 
export default {
      components:{
            AppLink
      }
}
</script>