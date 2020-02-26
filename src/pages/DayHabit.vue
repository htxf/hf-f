<template>
  <div class="container">
    <!-- 顶部按钮 -->
    <div class="header">
      <span class="date">
        <span class="boldFont">每日计划</span> ({{ formatDate }})
      </span>
      <div class="drawerButton">
        <i class="el-icon-s-operation" />
      </div>
      <el-tooltip effect="light" content="新增或删除" placement="bottom">
        <div v-show="!selectCircleVisible" class="editButton" @click="editButtonClick">
          <i class="el-icon-edit" />
        </div>
      </el-tooltip>
      <el-tooltip effect="light" content="删除" placement="bottom">
        <div v-show="selectCircleVisible" class="deleteButton" @click="deleteButtonClick">
          <i class="el-icon-delete" />
        </div>
      </el-tooltip>
      <el-tooltip effect="light" content="新增" placement="bottom">
        <div v-show="selectCircleVisible" class="plusButton" @click="plusButtonClick">
          <i class="el-icon-plus" />
        </div>
      </el-tooltip>
      <el-tooltip effect="light" content="取消" placement="bottom">
        <div v-show="selectCircleVisible" class="closeButton" @click="closeButtonClick">
          <i class="el-icon-close" />
        </div>
      </el-tooltip>
    </div>
    <!-- 计划展示区 -->
    <el-timeline>
      <el-timeline-item
        v-for="(timeZonePlans,index) in dayPlans"
        :key="index"
        :timestamp="timeZonePlans.timeZone"
        placement="top"
      >
        <DayPlan
          v-for="(plan, index2) in timeZonePlans.plans"
          ref="dayPlan"
          :key="index2"
          :plan="plan"
          :select-circle-visible="selectCircleVisible"
          @selectPlan="selectPlan"
          @unSelectPlan="unSelectPlan"
          @planCardClick="planCardClick"
        />
      </el-timeline-item>
    </el-timeline>
    <!-- 编辑对话框 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogStatus === 'edit' ? '编辑': '新增'"
    >
      <el-form ref="form" label-position="left" label-width="0" :model="planForm" :rules="rules">
        <el-form-item prop="content">
          <el-input v-model="planForm.content" placeholder="内容" clearable />
        </el-form-item>
        <el-form-item required="">
          <el-col :span="11">
            <el-form-item prop="startTime">
              <el-time-select
                v-model="planForm.startTime"
                placeholder="开始时间"
                :picker-options="{
                  start: '05:30',
                  step: '00:15',
                  end: '23:30'
                }"
                @change="editStartTimeChange"
              />
            </el-form-item>
          </el-col>
          <el-col :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="stopTime">
              <el-time-select
                v-model="planForm.stopTime"
                placeholder="结束时间"
                :picker-options="{
                  start: '05:30',
                  step: '00:15',
                  end: '23:30',
                  minTime: planForm.startTime
                }"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogStatus === 'edit' ? editConfirmButtonClick(): insertConfirmButtonClick()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import DayPlan from '../components/DayPlan'
import { getPlansApi, editPlanApi, insertPlanApi, deletePlansApi } from '../api/dayhabit'

export default {
  name: 'DayHabit',
  components: { DayPlan },
  data() {
    return {
      dayPlans: [],
      planForm: { planId: '', finishFlag: false, content: '', startTime: '', stopTime: '' },
      dialogVisible: false,
      rules: {
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { max: 10, message: '最长10个字', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '请选择开始时间', trigger: 'blur' }
        ],
        stopTime: [
          { required: true, message: '请选择结束时间', trigger: 'cblur' }
        ]
      },
      selectCircleVisible: false,
      selectPlans: [],
      dialogStatus: ''
    }
  },
  computed: {
    formatDate() {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const dayOfWeek = date.getDay()
      return year + '年' + month + '月' + day + '日' + ' - 周' + dayOfWeek
    }
  },
  async created() {
    await getPlansApi().then(response => {
      this.dayPlans = response.data
    })
  },
  methods: {
    // 子组件传递来的的计划card点击事件
    planCardClick(editPlan) {
      this.dialogVisible = true
      this.dialogStatus = 'edit'
      // this.planForm = editPlan
      this.planForm.planId = editPlan.planId
      this.planForm.finishFlag = editPlan.finishFlag
      this.planForm.content = editPlan.content
      this.planForm.startTime = editPlan.startTime
      this.planForm.stopTime = editPlan.stopTime
    },
    // 编辑时确定
    editConfirmButtonClick() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 发送更新计划请求 TODO
          const postData = {}
          postData.planId = this.planForm.planId
          postData.finishFlag = this.planForm.finishFlag
          postData.content = this.planForm.content
          postData.startTime = this.planForm.startTime
          postData.stopTime = this.planForm.stopTime
          editPlanApi(postData).then(response => {
            if (response.data === 'success') {
              // 改变页面对应计划内容；根据planId去dayPlans中修改对应的内容
              for (let i = 0; i < this.dayPlans.length; i++) {
                for (let j = 0; j < this.dayPlans[i].plans.length; j++) {
                  if (this.dayPlans[i].plans[j].planId === postData.planId) {
                    this.dayPlans[i].plans[j] = postData
                    // 还需要判断是否需要移动到其他区域
                    const editPlanStartTime = parseInt(postData.startTime.split(':').join(''))
                    if (i === 0 && !(parseInt('0530') <= editPlanStartTime && editPlanStartTime <= parseInt('1200'))) {
                      this.movePlanToTimeZone(i, j, postData)
                    }
                    if (i === 1 && !(parseInt('1200') <= editPlanStartTime && editPlanStartTime <= parseInt('1900'))) {
                      this.movePlanToTimeZone(i, j, postData)
                    }
                    if (i === 2 && !(parseInt('1900') <= editPlanStartTime && editPlanStartTime <= parseInt('2330'))) {
                      this.movePlanToTimeZone(i, j, postData)
                    }
                    break
                  }
                }
              }
              // 排序
              this.sortDayPlansByStartTime()
              // 关闭编辑对话框
              this.dialogVisible = false
              this.$message({
                type: 'success',
                message: '编辑成功!'
              })
            }
          })
        } else {
          console.log('未通过校验')
          return false
        }
      })
    },
    // 新增时确定
    insertConfirmButtonClick() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 发送新增请求
          const postData = {}
          // 后台给planId发号 or 随机数？
          // postData.planId = this.planForm.planId
          postData.finishFlag = this.planForm.finishFlag
          postData.content = this.planForm.content
          postData.startTime = this.planForm.startTime
          postData.stopTime = this.planForm.stopTime
          insertPlanApi(postData).then(response => {
            // 新增成功时要返回plan的Id
            postData.planId = response.data
            // 页面新增
            this.addPlanToTimeZone(postData)
            this.sortDayPlansByStartTime()
            // 关闭新增对话框
            this.dialogVisible = false
            this.$message({
              type: 'success',
              message: '新增成功!'
            })
          })
        } else {
          console.log('未通过校验')
          return false
        }
      })
    },
    // 把新增编辑框中的数据加到对应的time zone中
    addPlanToTimeZone(addedPlan) {
      const startTime = parseInt(addedPlan.startTime.split(':').join(''))
      let real = 0
      if (parseInt('0530') <= startTime && startTime <= parseInt('1200')) {
        real = 0
      } else if (parseInt('1200') <= startTime && startTime <= parseInt('1900')) {
        real = 1
      } else {
        real = 2
      }
      this.dayPlans[real].plans.push(addedPlan)
    },
    // 根据startTime，将对应的plan移动到dayPlans对应的三个区域
    movePlanToTimeZone(oldTimeZoneIndex, oldPlanIndex, newEditPlan) {
      // 从old中删掉，加到real中
      debugger
      this.dayPlans[oldTimeZoneIndex].plans.splice(oldPlanIndex, 1)
      this.addPlanToTimeZone(newEditPlan)
    },
    // 根据startTime，将dayPlans中三个区域的plans排序
    sortDayPlansByStartTime() {
      for (let i = 0; i < this.dayPlans.length; i++) {
        this.dayPlans[i].plans.sort(function(a, b) {
          const aTime = parseInt(a.startTime.split(':').join(''))
          const bTime = parseInt(b.startTime.split(':').join(''))
          return aTime - bTime
        })
      }
    },
    // 编辑时开始时间改变时事件
    editStartTimeChange() {
      // 如果开始、结束都有，并且结束时间小于开始时间，将结束时间置空
      const flag = this.planForm.startTime && this.planForm.stopTime && parseInt(this.planForm.startTime) >= parseInt(this.planForm.stopTime)
      if (flag) {
        this.planForm.stopTime = ''
      }
    },
    // 头部编辑按钮点击
    editButtonClick() {
      this.selectCircleVisible = true
      // 将子组件DayPlan中的选择框置为false
      for (let i = 0; i < this.$refs.dayPlan.length; i++) {
        this.$refs.dayPlan[i].selectFlag = false
      }
      // 将选择数组置空
      this.selectPlans = []
    },
    // 头部删除按钮点击
    deleteButtonClick() {
      // this.selectCircleVisible = false
      if (this.selectPlans.length < 1) {
        this.$message({
          message: '请先选择要删除的项',
          type: 'warning'
        })
        return
      }
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 待删除的id用,分割拼接成string
        const postData = {}
        postData.planIds = this.selectPlans.join(',')
        deletePlansApi(postData).then(response => {
          if (response.data === 'success') {
            // 页面上删除
            for (let i = 0; i < this.selectPlans.length; i++) {
              for (let j = 0; j < this.dayPlans.length; j++) {
                for (let m = 0; m < this.dayPlans[j].plans.length; m++) {
                  if (this.selectPlans[i] === this.dayPlans[j].plans[m].planId) {
                    this.dayPlans[j].plans.splice(m, 1)
                    break
                  }
                }
              }
            }
            // 将子组件DayPlan中的选择框置为false
            for (let i = 0; i < this.$refs.dayPlan.length; i++) {
              this.$refs.dayPlan[i].selectFlag = false
            }
            // 将选择数组置空
            this.selectPlans = []
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 头部关闭按钮点击
    closeButtonClick() {
      this.selectCircleVisible = false
    },
    // 子组件传递的选择事件
    selectPlan(planId) {
      this.selectPlans.push(planId)
    },
    // 子组件传递的取消选择事件
    unSelectPlan(planId) {
      let index = 0
      for (let i = 0; i < this.selectPlans.length; i++) {
        if (this.selectPlans[i] === planId) {
          index = i
          break
        }
      }
      this.selectPlans.splice(index, 1)
    },
    // 添加按钮点击
    plusButtonClick() {
      this.dialogVisible = true
      this.dialogStatus = 'create'
      // this.$refs.form.resetFields()
      this.planForm.planId = ''
      this.planForm.finishFlag = false
      this.planForm.content = ''
      this.planForm.startTime = ''
      this.planForm.stopTime = ''
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    }
  }
}
</script>

<style>
  .container {
    width: 600px;
    margin: 0 auto;
  }
  .el-timeline {
    clear: both;
  }
  .el-timeline-item__timestamp {
    text-align: left !important;
  }
  .header {
    margin-bottom: 20px;
    height: 30px;
    font-size: 24px;
    line-height: 30px;
    color: gray;
  }
  .header div {
    cursor: pointer;
  }
  .header div :hover {
    font-weight:bolder;
    cursor: pointer;
    color:teal;
  }
  .editButton {
    float: right;
    margin-right: 10px;
  }
  .drawerButton {
    float: right;
  }
  .el-dialog {
    width: 500px !important;
    border-radius: 6px !important;
  }
  .deleteButton {
    float: right;
    margin-right: 10px;
  }
  .plusButton {
    float: right;
    margin-right: 10px;
  }
  .closeButton {
    float: right;
    margin-right: 30px;
  }
  .el-dialog__header {
    text-align: left;
  }
  .el-form-item__content {
    margin-top: 5px;
  }
  .date {
    float: left;
    font-size: 20px;
    padding-left: 40px;
  }
  .boldFont {
    font-weight: bold;
    color: teal;
  }
</style>
