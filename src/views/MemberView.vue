<template>
  <n-row>
    <n-card title="会员列表" header-style="text-align:left">
        <n-space>
            <n-select v-model:value="value" :options="options" />
            <n-select v-model:value="value" :options="options" />
            <n-input v-model:value="value" type="textarea" placeholder="基本的 Input" />
             <n-button type="primary">查询</n-button>
        </n-space>
    </n-card>
  </n-row>
</template>

<script>
export default {

}
</script>

<style>

</style>
