<script setup>
import { addFriend, search } from '@/api/friendApi'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
const route = useRoute()
const userList = ref([])
onMounted(async () => {
  const res = await search({ account: route.query.account })
  userList.value = res.data.list
})
// 添加
const add = (id) => {
  ElMessageBox.confirm('确认添加该用户?', '', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      console.log(id)
      await addFriend(id)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消',
      })
    })
}
</script>

<template>
  <div class="search">
    <div class="back" @click="$router.go(-1)">
      <el-icon><ArrowLeftBold /></el-icon>
    </div>
    <div class="title">搜索结果</div>
    <div class="list">
      <div class="item" v-for="item in userList" :key="item.id">
        <div class="account">{{ item.account }}</div>
        <div class="add" @click="add(item.id)">
          <el-button color="#4D6BFE">添加</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search {
  .back {
    cursor: pointer;
  }
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
  .title {
    margin: 20px 0 12px;
  }
}
</style>
