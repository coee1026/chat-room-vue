<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { ref } from 'vue'
const authStore = useAuthStore()
const account = ref('')
account.value = authStore.account
console.log(account.value)
</script>

<template>
  <div class="layout">
    <el-container>
      <el-header class="head">
        <div class="account">
          <div v-if="account === ''">
            <RouterLink to="/login">登录</RouterLink>
          </div>
          <div v-else>账号: {{ account }}</div>
        </div>
        <div class="title">CHAT</div>
      </el-header>
      <el-main class="main"><RouterView /></el-main>
    </el-container>
  </div>
</template>

<style lang="scss">
.layout {
  width: 420px;
  // background-color: skyblue;
  margin: 36px auto;
  .head {
    display: flex;
    height: 64px;
    line-height: 64px;
    border-bottom: 4px solid rgb(77, 107, 254);
    .account {
      font-style: oblique;
      width: 220px;
    }
    .title {
      font-size: large;
      font-style: italic;
      color: rgb(77, 107, 254);
      background-color: #fff;
    }
  }
}
</style>
