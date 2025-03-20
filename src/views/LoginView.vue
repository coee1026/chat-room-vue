<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { login } from '@/api/userApi'
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore()
const ruleForm = ref({
  account: '',
  password: '',
})
const vaildAccount = (rule, value, callback) => {
  if (value === '') {
    return callback(new Error('请输入账号'))
  } else if (value.length > 10 || value.length < 4) {
    return callback(new Error('账号应为4~10位'))
  } else {
    return callback()
  }
}
const vaildPass = (rule, value, callback) => {
  if (value === '') {
    return callback(new Error('请输入密码'))
  } else if (value.length > 16 || value.length < 8) {
    return callback(new Error('密码应为8~16位字母或数字'))
  }
}
const rules = ref({
  account: [{ validator: vaildAccount, trigger: 'blur' }],
  password: [{ validator: vaildPass, trigger: 'blur' }],
})
const checked = ref(true)
const ruleFormRef = ref()
const submit = async (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return
    }
  })
  if (!checked.value) {
    ElMessage({
      message: '请阅读并同意用户协议与隐私政策',
      type: 'warning',
    })
    return
  }
  const res = await login(ruleForm.value)
  authStore.setToken(res.data)
  console.log(ruleForm.value)

  authStore.setAccount(ruleForm.value.account)
  ElMessage.success('登陆成功')
  router.push('/home')
}
</script>
<template>
  <div class="login">
    <div class="form">
      <el-form
        ref="ruleFormRef"
        style="max-width: 290"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item prop="account">
          <el-input v-model="ruleForm.account" autocomplete="off" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            placeholder="请输入密码"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <div class="check">
            <el-checkbox v-model="checked"> 我已阅读并同意用户协议与隐私政策 </el-checkbox>
          </div>
          <div class="button" @click="submit(ruleFormRef)">
            <el-button style="width: 100%" color="#4D6BFE" :dark="isDark" width="290"
              >登录</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss">
.login {
  .check {
    margin-bottom: 12px;
    color: #000;
  }
  .button {
    width: 290px;
    text-align: center;
  }
}
</style>
