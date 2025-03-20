<script setup>
import FriendListComponent from '@/components/FriendListComponent.vue'
import { getAllFriend } from '@/api/friendApi'
import { onMounted, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import router from '@/router'
const friendList = ref([
  {
    id: '',
    account: '',
  },
])
const friendsRes = ref({
  code: 0,
  data: {
    list: [],
    total: 0,
  },
  msg: '',
})
onMounted(async () => {
  friendsRes.value = await getAllFriend()
  friendList.value = friendsRes.value.data.list
})
// 搜索
const input = ref('')
</script>

<template>
  <div class="home">
    <div class="search">
      <div class="input">
        <el-input
          color="#4D6BFE"
          v-model="input"
          style="width: 100%"
          placeholder="搜索"
          :suffix-icon="Search"
        />
      </div>
      <div
        class="btn"
        @click="
          router.push({
            query: { account: input },
            path: '/search',
          })
        "
      >
        <el-button type="primary" color="#4d6bfe">
          <el-icon><Search /></el-icon>
        </el-button>
      </div>
    </div>
    <div class="title">好友列表</div>
    <FriendListComponent :friend-list="friendList" />
  </div>
</template>

<style lang="scss" scoped>
.home {
  .title {
    margin: 20px 0 12px;
  }
  .search {
    display: flex;
    .input {
      flex: 1;
      margin-right: 18px;
    }
    .btn:hover {
      cursor: pointer;
    }
  }
}
</style>
