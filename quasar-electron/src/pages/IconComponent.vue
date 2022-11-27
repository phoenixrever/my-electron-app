<template>
  <q-page padding>
    <div class="text-purple q-gutter-md">
      <!-- Material Icons https://fonts.google.com/icons?icon.set=Material+Icons -->
      <q-icon left name="settings" color="teal" size="4.4em" tag="a" />

      <!--  Bootstrap Icons  https://icons.getbootstrap.com/ 注意这边是有bi前缀的 不同的组件库加什么前缀具体见文档-->
      <q-icon name="bi-airplane-engines" size="4.4em" color="red" />

      <q-icon name="today" class="text-orange" size="2em" />
      <q-icon name="today" color="dark" size="2em" />
      <q-icon name="today" color="lime-11" size="4em" />
      <q-icon name="today" color="negative" size="4em" />
      <q-icon :right="true" name="book" color="orange-14" size="4em" />

      <!-- Svg usage 下面的图标没用再config里面定义 不能直接使用必须import引入 -->
      <q-icon :name="matMenu" />
      <q-btn :icon="mdiAbTesting" />
      <q-icon :name="fasFont" />
    </div>

    <!-- 可以手机网络地址 也可以是public地址  -->
    <!-- TODO 怎么设置asset里面的图片 -->
    <div class="q-gutter-md q-mt-lg">
      <q-icon name="img:https://cdn.quasar.dev/logo-v2/svg/logo.svg"  />
      <!--使用 fontawesome-v6 需要再config里面打开 -->
      <q-icon name="fa-solid fa-ambulance" size="4.4em" />
      <q-btn icon="img:https://cdn.quasar.dev/logo-v2/svg/logo.svg"/>

      <q-icon name="img:https://pics.dmm.co.jp/digital/video/mdvr00232/mdvr00232jp-10.jpg" size="20em" />
    </div>
  </q-page>
</template>

<script setup>
import { matMenu } from '@quasar/extras/material-icons';
import { mdiAbTesting } from '@quasar/extras/mdi-v6';
import { fasFont } from '@quasar/extras/fontawesome-v5';
</script>
