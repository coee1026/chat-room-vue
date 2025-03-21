<script setup>
import { getMessages, getChatId, send } from '@/api/friendApi'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const id = ref('')
id.value = route.params.id
const account = ref('')
account.value = route.query.account
const messageList = ref([])
const chatId = ref('')
// 获取消息
const getMsg = async () => {
  const res = await getMessages(id.value)
  messageList.value = res.data.list
}

onMounted(async () => {
  getMsg()
  // 获取聊天室id
  const res1 = await getChatId(id.value)
  chatId.value = res1.data
})
const content = ref('')
// 发送消息
const doSend = async () => {
  await send({ chatId: chatId.value, content: content.value })
  getMsg()
  content.value = ''
}
const doReceive = async () => {
  getMsg()
}
</script>
<template>
  <div class="chat">
    <div class="back" @click="$router.go(-1)">
      <el-icon><ArrowLeftBold /></el-icon>
    </div>
    <div class="title">聊天列表</div>
    <div class="p">{{ account }}</div>
    <div class="send">
      <div class="input">
        <el-input v-model="content"></el-input>
      </div>
      <div class="btn" @click="doSend">
        <el-button color="#4D6BFE">发送</el-button>
      </div>
      <div class="btn1" @click="doReceive">
        <el-button color="#4D6BFE">接收</el-button>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="item in messageList" :key="item.id">
        <div class="your" v-if="item.userId == id">
          <div>{{ account }}</div>
          {{ item.body }}
        </div>
        <div class="my" v-else>
          <div>自己</div>
          {{ item.body }}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.chat {
  .back {
    cursor: pointer;
  }
  .title {
    margin: 20px 0 12px;
  }
  .p {
    margin-bottom: 18px;
    text-align: center;
    font-size: large;
  }
  .send {
    display: flex;
    margin-bottom: 18px;
    .input {
      flex: 1;
      margin-right: 12px;
    }
    .btn {
      margin-right: 12px;
    }
  }
  .list {
    .item {
      color: #222;
      padding: 0 12px;
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
  // .item:hover {
  //   cursor: pointer;
  //   background-color: rgba($color: #ccc, $alpha: 0.7);
  //   color: #000;
  // }
}
</style>
