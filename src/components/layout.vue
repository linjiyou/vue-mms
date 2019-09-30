<template>
   <div>
     <app-header></app-header>
      <app-left></app-left>
      <app-section></app-section>
     
   </div>
    
</template>
<script>
import AppHeader from './AppHeader';
import AppLeft from './AppLeft';
import AppSection from './AppSection'
export default {
    components:{
     AppHeader,
     AppLeft,
     AppSection
    }
}
</script>
<style scoped >
   .header{
       position: absolute;
       line-height: 50px;
       padding: 0px;
       left: 0px;
       top: 0px;
       right: 0px;
       background-color: #2d2d2d;
   }
   .navBox{
     position: absolute;
     width: 230px;
     top: 50px;
     left: 0px;
     bottom: 0px;
     overflow-y: auto;;
     background-color: #dddddd;
   }
   .section{
       position: absolute;
       left: 230px;
       top: 50px;
       right: 0px;
       bottom: 0px;
       padding: 10px;
       overflow-y: auto;
       background-color:aliceblue;
   }
</style>