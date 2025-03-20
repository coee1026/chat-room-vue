<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { register } from '@/api/userApi'
import router from '@/router'
const ruleForm = ref({
  account: '',
  password: '',
  rePassword: '',
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
const vaildRepass = (rule, value, callback) => {
  if (value === '') {
    return callback(new Error('请再次输入密码'))
  } else if (value != ruleForm.value.password) {
    return callback(new Error('两次输入的密码不一致'))
  }
}
const rules = ref({
  account: [{ validator: vaildAccount, trigger: 'blur' }],
  password: [{ validator: vaildPass, trigger: 'blur' }],
  rePassword: [{ validator: vaildRepass, trigger: 'blur' }],
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
  // TODO 注册
  await register(ruleForm.value)
  ElMessage.success('注册成功，前往登录')
  router.push('/login')
}
</script>
<template>
  <div class="register">
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
        <el-form-item prop="rePassword">
          <el-input
            v-model="ruleForm.rePassword"
            type="password"
            placeholder="请再次输入密码确认"
          />
        </el-form-item>
        <el-form-item>
          <div class="check">
            <el-checkbox v-model="checked"> 我已阅读并同意用户协议与隐私政策 </el-checkbox>
          </div>
          <div class="button" @click="submit(ruleFormRef)">
            <el-button style="width: 100%" color="#4D6BFE" :dark="isDark" width="290"
              >注册</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss">
.register {
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
