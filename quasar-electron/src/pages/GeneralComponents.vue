<template>
    <div class="q-pa-md q-gutter-sm">
      <div>111112211</div>
    <q-btn color="white" text-color="black" label="Standard" />
    <q-btn color="primary" loading :percentage="20" dark-percentage label="Primary" />
    <q-btn color="secondary" label="Secondary" ref="btn"  @click="pop"/>
    <q-btn color="amber" glossy label="Amber"  @click="triggerBtn"/>
    <q-btn color="brown-5" label="Brown 5" />
    <q-btn color="deep-orange" glossy label="Deep Orange" />
    <q-btn color="purple" label="Purple" />
    <q-btn color="black" label="Black" />
    <q-btn color="black" label="toIconpage" to="/icon" />

    <q-btn loading color="primary"  style="width: 150px" :percentage="50">
      Button
      <!-- v-slot 可以写成#loading -->
      <template v-slot:loading>
        <q-spinner-hourglass class="on-left" />
        Loading...
      </template>
    </q-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const btn=ref()

function pop(){
  alert('hahahaha')
}
function triggerBtn(){
  console.log("触发btn里面的click方法");
  btn.value?.click();
}
</script>

<style lang="scss" scoped>

</style>
