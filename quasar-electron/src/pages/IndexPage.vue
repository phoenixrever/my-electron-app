<template>
  <q-page class="flex flex-center column">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    />
    <div class="text-caption text-center q-mt-lg text-primary bg-positive">
      you are the choosen one!
    </div>
    <p class="demo q-pa-xs-md q-pa-sm-sm q-px-md-lg q-py-md-md">
      何を考えてる！
    </p>

    <q-toggle v-model="value" @click="changeDark" />

    <div class="flex bg-negative">
      <div>div1</div>
      <div>div2</div>
      <div>div3</div>
    </div>

    <q-btn class="q-mt-lg" color="deep-orange" glossy label="Deep Orange" @click="$router.push('/icon')"/>
  </q-page>
</template>

<script setup>
import { ref, defineComponent ,onMounted,nextTick} from 'vue';
import {useRouter} from 'vue-router'
import { useQuasar } from 'quasar';

const $router=useRouter();

defineComponent({
  name: 'IndexPage',
});

const value = ref(false);

const $q = useQuasar();

// get status
console.log($q.dark.isActive); // true, false

// get configured status
console.log($q.dark.mode); // "auto", true, false

// set status
// $q.dark.set(true); // or false or "auto"


onMounted(() => {
  //$q.dark.toggle();
  console.log('----------------------');
});

nextTick(()=>{
    // $q.dark.toggle();
})

function changeDark() {
  // toggle
  $q.dark.toggle();
}
</script>

<style lang="scss">
.demo {
  color: $deep-orange;
  background-color: $teal-11;
}
</style>
