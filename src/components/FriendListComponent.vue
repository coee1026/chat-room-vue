<script setup>
import router from '@/router'

defineProps({
  friendList: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="list">
    <div class="item" v-for="item in friendList" :key="item.id">
      <div class="account">{{ item.account }}</div>
      <div
        class="add"
        @click="
          router.push({
            path: '/chat/' + item.id,
            query: { account: item.account },
          })
        "
      >
        <el-button color="#4D6BFE">聊天</el-button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.list {
  .item {
    display: flex;
    justify-content: space-between;
    color: #222;
    padding: 0 12px;
    height: 48px;
    line-height: 48px;
    background-color: rgba($color: #eee, $alpha: 0.5);
    border-radius: 10px;
    margin-bottom: 4px;
    transition: background-color 0.4s ease; // 过渡效果
  }
  .item:hover {
    cursor: pointer;
    background-color: rgba($color: #ccc, $alpha: 0.7);
    color: #000;
  }
}
</style>
