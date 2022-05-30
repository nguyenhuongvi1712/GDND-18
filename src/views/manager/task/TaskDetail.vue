<template>
  <h1>Nội dung công việc</h1>
  <el-row :gutter="20">
    <el-col :span="6" v-for="task in taskDetail" :key="task.id">
      <el-card :body-style="{ padding: '0px' }" class="card-container">
        <div class="detail-info">
          <p class="detail-name">{{ task.name }}</p>
          <el-progress
            type="circle"
            :percentage="task.progress"
            :status="checkStatus(task.status)"
          ></el-progress>
          <p>{{ task.progress }} %</p>
          <hr />
          <div class="assign-info">
            <p>Người làm ({{ task.assign.length }})</p>
            <el-tooltip
              v-for="user in task.assign"
              :key="user.id"
              class="item"
              effect="dark"
              :content="user.name"
              placement="top-start"
            >
              <el-avatar
                size="small"
                :src="user.avatar"
                style="margin: 5px"
              ></el-avatar>
            </el-tooltip>
            <!-- <el-avatar
              v-for="user in task.assign"
              :key="user.id"
              size="small"
              :src="user.avatar"
              style="margin: 5px"
            ></el-avatar> -->
          </div>
          <div>
            <el-button class="view-btn" type="success">Update</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import taskListMock from '../../../mock/task'
import taskDetailMock from '../../../mock/taskDetail'
export default {
  data() {
    return {
      taskList: [],
      taskDetail: [],
    }
  },
  methods: {
    checkStatus(status) {
      if (status === 'doing') return ''
      else if (status === 'pending') return 'warning'
      else if (status === 'cancel') return 'exception'
      else return 'success'
    },
  },
  created() {
    this.taskList = taskListMock
    this.taskDetail = taskDetailMock
  },
}
</script>
<style scope>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
.detail-info {
  text-align: center;
}
.detail-name {
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  padding: 10px;
}
.view-btn {
  padding: 10px 15px;
}
.card-container {
  padding: 10px;
  text-align: center;
}
.el-col {
  margin-bottom: 15px;
}
.uppercase-text {
  text-transform: uppercase;
}
.assign-info {
  text-align: left;
}
h1 {
  text-align: center;
  margin-bottom: 30px;
}
</style>
