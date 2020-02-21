<template>
  <div>
    <el-tooltip effect="light" :content="selectFlag ? '单击取消选择' : '单击选择'" placement="bottom">
      <div
        v-if="selectCircleVisible"
        :class="selectFlag ? 'selectCircle selectCircleSelected' : 'selectCircle selectCircleUnSelect'"
        @click="selectCircleClick"
      />
    </el-tooltip>
    <el-card
      shadow="hover"
      :class="finishFlag ? 'plan-card finished-card' : 'plan-card unfinished-card'"
      @click.native="planCardClick"
    >
      <el-row class="plan-row">
        <el-col :span="3">
          <el-button
            v-if="finishFlag"
            type="success"
            icon="el-icon-check"
            circle
            autofocus
            @click.native.stop="unFinishPlan"
          />
          <el-button
            v-else
            icon="el-icon-time"
            circle
            autofocus
            @click.native.stop="finishPlan"
          />
        </el-col>
        <el-col :span="13">
          <div class="plan-content" :style="finishFlag ? 'textDecorationLine: line-through' : 'textDecorationLine: none'">
            {{ plan.content }}
          </div>
        </el-col>
        <el-col :span="8">
          <div class="plan-time" :style="finishFlag ? 'textDecorationLine: line-through' : 'textDecorationLine: none'">
            <span class="plan-start-time">
              {{ plan.startTime }}
            </span>
            -
            <span class="plan-stop-time">
              {{ plan.stopTime }}
            </span>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'DayPlan',
  props: {
    plan: {
      type: Object,
      default: function() {
        return { planId: '', finishFlag: false, content: '', startTime: '', stopTime: '' }
      }
    },
    selectCircleVisible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      finishFlag: false,
      selectFlag: false
    }
  },
  methods: {
    finishPlan() {
      this.finishFlag = true
      // 发送请求更新计划完成状态为true
    },
    unFinishPlan() {
      this.finishFlag = false
      // 发送请求更新计划完成状态为false
    },
    planCardClick() {
      this.$emit('planCardClick', this.plan)
    },
    selectCircleClick() {
      this.selectFlag = !this.selectFlag
      // 通知父组件，当前被选中的plan的id
      if (this.selectFlag) {
        console.log('selectPlan' + ':' + this.plan.planId)
        this.$emit('selectPlan', this.plan.planId)
      } else {
        console.log('unSelectPlan' + ':' + this.plan.planId)
        this.$emit('unSelectPlan', this.plan.planId)
      }
    }
  }
}
</script>

<style>
  .plan-card {
    margin: 10px auto;
  }
  .plan-card:hover {
    cursor: pointer;
  }
  .plan-row {
    height: 50px;
    line-height: 50px;
  }
  .plan-content {
    text-align: left;
    padding: 0 10px;
  }
  .plan-time{
    font-size: small;
  }
  .unfinished-card {
    background-color:aliceblue !important;
  }
  .finished-card {
    background-color:palegreen !important;
    text-decoration-line: line-through;
  }
  .selectCircle {
    width: 25px;
    height: 25px;
    border: 3px solid grey;
    border-radius: 50%;
    float: left;
    line-height: 50px;
    margin-top: 30px;
    margin-right: 10px;
  }
  .selectCircle:hover {
    cursor: pointer;
  }
  .selectCircleUnSelect {
    background-color:aliceblue;
  }
  .selectCircleSelected {
    background-color:grey;
  }
</style>
