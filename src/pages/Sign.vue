<template>
  <div class="container">
    <div style="margin-bottom:20px">
      用户注册
    </div>
    <el-form ref="signForm" label-position="left" label-width="20%" :model="signForm" :rules="rules">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="signForm.name" />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="signForm.pass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="signForm.checkPass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="signButtonClick">确定</el-button>
      </el-form-item>
    </el-form>
    <div>
      <router-link to="/login">已有用户，去登录 --></router-link>
    </div>
  </div>
</template>

<script>
import { signApi } from '@/api/user'
export default {
  name: 'Sign',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.signForm.checkPass !== '') {
          this.$refs.signForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.signForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      signForm: {
        name: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        name: [
          { required: true, message: '用户名必输', trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    signButtonClick() {
      // 1 校验表单填写
      this.$refs['signForm'].validate(valid => {
        if (valid) {
          // 2 发起注册请求
          const postData = this.signForm
          signApi(postData).then(response => {
            // 3 注册成功
            if (response.result) {
              this.$message({
                type: 'success',
                message: '注册成功'
              })
              // TODO 将用户信息存储到vuex中？
              // 跳转到每日习惯页面
              this.$router.push('/dayhabit')
            } else {
              // 4 注册失败
              this.$message({
                type: 'error',
                message: '注册失败'
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
