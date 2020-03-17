<template>
  <div class="container">
    <div style="margin-bottom:20px">
      用户登录
    </div>
    <el-form ref="loginForm" label-position="left" label-width="20%" :model="user" :rules="rules">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="user.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="user.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginButtonClick">确定</el-button>
      </el-form-item>
    </el-form>
    <div>
      <router-link to="/signup">还没有用户，去注册 --></router-link>
      <br>
      <router-link to="/">忘记秘密？ --></router-link>
    </div>
  </div>
</template>

<script>
import { loginApi } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      user: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '用户名必输', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码必输', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginButtonClick() {
      // 1 校验表单填写
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          // 2 发起登录请求
          const postData = this.user
          loginApi(postData).then(response => {
            // 3 登录成功
            if (response.result) {
              this.$message({
                type: 'success',
                message: '登录成功'
              })
              // TODO 将用户信息存储到vuex中？
              // 跳转到每日习惯页面
              this.$router.push('/dayhabit')
            } else {
              // 4 登录失败
              this.$message({
                type: 'error',
                message: '用户名或密码错误'
              })
            }
          })
        } else {
          console.log('表单校验未通过')
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
    width: 600px;
    margin: 0 auto;
}
</style>
