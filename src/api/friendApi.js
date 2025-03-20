import request from '@/utils/request'

// 获取好友列表
export const getAllFriend = async () => {
  return await request({
    url: '/friend',
  })
}

// 搜索用户
export const search = async (params) => {
  return await request({
    url: '/user',
    params,
  })
}
// 添加好友
export const addFriend = async (id) => {
  return await request({
    url: '/add/' + id,
    method: 'PUT',
  })
}
// 查询聊天记录
export const getMessages = async (id) => {
  return await request({
    url: '/chat/' + id,
  })
}
// 发消息
// {
//   "content": "hello11111111",
//   "chatId": "1902680285249478658"
// }
export const send = async (data) => {
  return await request({
    url: '/send',
    method: 'POST',
    data,
  })
}

// 获取聊天室id
export const getChatId = async (friendId) => {
  return await request({
    url: '/chat/friend/' + friendId,
  })
}
