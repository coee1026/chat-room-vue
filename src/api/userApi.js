import request from '@/utils/request'

export const login = async (data) => {
  return await request({
    url: '/login',
    method: 'POST',
    data,
  })
}

export const register = async (data) => {
  return await request({
    url: '/register',
    method: 'POST',
    data,
  })
}
