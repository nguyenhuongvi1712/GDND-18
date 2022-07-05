<template>
  <h1>Nội dung công việc</h1>
  <div style="margin-bottom: 10px; text-align: right">
    <el-button
      type="success"
      @click="
        () => {
          modalAddNewTask = true
        }
      "
      >Thêm công việc mới</el-button
    >
  </div>

  <el-row :gutter="20">
    <el-col :span="6" v-for="(task, task_index) in taskDetail" :key="task.id">
      <el-card :body-style="{ padding: '0px' }" class="card-container">
        <div class="detail-info">
          <p class="detail-name">{{ task.name }}</p>
          <el-progress
            type="circle"
            :percentage="task.progress"
            :status="checkStatus(task.status)"
            :color="colors"
          ></el-progress>
          <p>{{ task.progress }} %</p>
          <div>
            <el-button-group>
              <el-button
                :icon="Minus"
                @click="decrease(task.id)"
                size="small"
              />
              <el-button :icon="Plus" @click="increase(task.id)" size="small" />
            </el-button-group>
          </div>

          <hr />
          <div class="assign-info">
            <p>Người làm ({{ task.assign.length }})</p>
            <div>
              <el-tooltip
                v-for="(user, user_index) in task.assign"
                :key="user.id"
                class="item"
                effect="dark"
                :content="user.name"
                placement="top-start"
              >
                <div class="avar_block">
                  <el-avatar :src="user.avatar" style="margin: 5px"></el-avatar>
                  <el-button
                    :icon="Close"
                    size="small"
                    circle
                    class="avar_close"
                    @click="on_close(task_index, user_index)"
                  />
                </div>
              </el-tooltip>
              <el-tooltip class="item" content="Thêm người">
                <el-button
                  :icon="Plus"
                  circle
                  style="position: absolute"
                  @click="
                    () => {
                      visibleVerticallyCenteredDemo = true
                      task_focus = task_index
                    }
                  "
                />
              </el-tooltip>
            </div>
          </div>
          <div>
            <el-button class="view-btn" type="success">Update</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <CModal
    alignment="center"
    :visible="visibleVerticallyCenteredDemo"
    @close="
      () => {
        visibleVerticallyCenteredDemo = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Thêm nhân công</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <el-row v-for="user in users" :key="user.id" :gutter="20">
        <el-col :span="10"
          ><el-checkbox v-model="user.checked">{{ user.name }} </el-checkbox>
        </el-col>
        <el-col :span="10">
          <el-avatar :src="user.avatar" style="margin: 5px"></el-avatar>
        </el-col>
      </el-row>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="secondary"
        @click="
          () => {
            visibleVerticallyCenteredDemo = false
          }
        "
      >
        Đóng
      </CButton>
      <CButton color="success" @click="addNewWorker">Lưu thay đổi</CButton>
    </CModalFooter>
  </CModal>
  <CModal
    alignment="center"
    :visible="modalAddNewTask"
    @close="
      () => {
        modalAddNewTask = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Thêm mới công việc</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <el-form
        label-width="100px"
        :model="formLabelAlign"
        label-position="left"
      >
        <el-form-item label="Tên công việc">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="Nội dung cụ thể">
          <el-input
            v-model="formLabelAlign.description"
            type="textarea"
            rows="5"
          ></el-input>
        </el-form-item>
        <el-form-item label="Thời hạn hoàn thành">
          <el-date-picker
            v-model="formLabelAlign.deadline"
            type="date"
            placeholder="Pick a day"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="secondary"
        @click="
          () => {
            modalAddNewTask = false
          }
        "
      >
        Đóng
      </CButton>
      <CButton color="success" @click="addNewTask">Thêm mới công việc</CButton>
    </CModalFooter>
  </CModal>
</template>
<script>
import { faker } from '@faker-js/faker'

import taskListMock from '../../../mock/task'
import taskDetailMock from '../../../mock/taskDetail'
import userMock from '../../../mock/user'
import { Minus, Plus, Close } from '@element-plus/icons-vue'

export default {
  data() {
    return {
      taskList: [],
      taskDetail: [],
      Minus,
      Plus,
      Close,
      colors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 },
      ],
      visibleVerticallyCenteredDemo: false,
      modalAddNewTask: false,
      users: [],
      checkList: ['selected and disabled', 'Option A'],
      task_focus: 0,
      formLabelAlign: { name: '', description: '', deadline: '' },
    }
  },
  methods: {
    checkStatus(status) {
      if (status === 'doing') return ''
      else if (status === 'pending') return 'warning'
      else if (status === 'cancel') return 'exception'
      else return 'success'
    },
    increase(task_id) {
      const task_index = this.taskDetail.findIndex((task) => {
        return task.id === task_id
      })
      if (task_index !== -1) {
        const task_new = this.taskDetail[task_index]
        task_new.progress += 20
        if (task_new.progress > 100) {
          task_new.status = 'success'
          task_new.progress = 100
        }
        this.taskDetail[task_index] = task_new
      }
    },
    decrease(task_id) {
      const task_index = this.taskDetail.findIndex(
        (task) => task.id === task_id,
      )
      if (task_index !== -1) {
        const task_new = this.taskDetail[task_index]
        task_new.progress -= 20
        if (task_new.progress < 0) {
          task_new.status = 'pending'
          task_new.progress = 0
        }

        this.taskDetail[task_index] = task_new
      }
    },
    on_close(task_id, user_id) {
      this.taskDetail[task_id].assign.splice(user_id, 1)
    },
    addNewWorker() {
      const added_users = this.users.filter((u) => u.checked === true)
      this.taskDetail[this.task_focus].assign.push(...added_users)
      this.users = this.users.map((e) => {
        return {
          ...e,
          checked: false,
        }
      })
      this.visibleVerticallyCenteredDemo = false
    },
    addNewTask() {
      const task_new = {
        id: faker.datatype.uuid(),
        name: this.formLabelAlign.name,
        progress: 0,
        assign: [],
        status: 'pending',
      }
      this.taskDetail.push(task_new)
    },
  },
  created() {
    this.taskList = taskListMock
    this.taskDetail = taskDetailMock
    const user_map = userMock.slice(0, 9)
    this.users = user_map.map((e) => {
      return {
        ...e,
        checked: false,
      }
    })
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
.avar_block {
  position: relative;
  display: inline;
  margin-right: 20px;
}
.avar_close {
  position: absolute;
  right: -12px;
  padding: 5px !important;
}
h1 {
  text-align: center;
  margin-bottom: 30px;
}
</style>
