<script setup></script>

<template>
  <div class="login-register">
    <div class="title">CHAT</div>
    <div class="tab">
      <RouterLink exact-active-class="my-exact-active-class" class="link" to="/login"
        >登录</RouterLink
      >
      <RouterLink class="link" exact-active-class="my-exact-active-class" to="/register"
        >注册</RouterLink
      >
    </div>
    <div class="router-view">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss">
.login-register {
  width: 360px;
  // background-color: pink;
  margin: 148px auto;
  height: 400px;
  .title {
    font-size: large;
    font-style: italic;
    color: rgb(77, 107, 254);
    width: 200px;
    text-align: center;
    margin: auto;
  }
  .tab {
    display: flex;
    justify-content: space-between;
    width: 180px;
    margin: auto;
    .link {
      color: #000;
      height: 28px;
      line-height: 28px;
      text-align: center;
      text-decoration: none;
      margin: 36px 0 28px;
    }
    .my-exact-active-class {
      color: rgb(77, 107, 254);
      border-bottom: 4px solid rgb(77, 107, 254);
    }
  }
  .router-view {
    padding: 0 35px;
  }
}
</style>
