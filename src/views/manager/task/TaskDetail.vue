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
          <div class="task-info">
            <p>Thời hạn: {{ formatDate(task.deadline) }}</p>
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
          <hr />
          <div>
            <el-button
              class="view-btn"
              type="success"
              size="small"
              @click="handleEdit(task_index, task)"
              >Update</el-button
            >
            <el-button
              class="view-btn"
              type="danger"
              size="small"
              @click="handleOnDeleteTask(task_index)"
              >Delete</el-button
            >
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
        :model="formAddNewTask"
        label-position="left"
      >
        <el-form-item label="Tên công việc">
          <el-input v-model="formAddNewTask.name"></el-input>
        </el-form-item>
        <el-form-item label="Nội dung cụ thể">
          <el-input
            v-model="formAddNewTask.description"
            type="textarea"
            rows="5"
          ></el-input>
        </el-form-item>
        <el-form-item label="Ngày bắt đầu">
          <el-date-picker
            v-model="formAddNewTask.startDay"
            type="date"
            placeholder="Chọn ngày"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="Thời hạn hoàn thành">
          <el-date-picker
            v-model="formAddNewTask.deadline"
            type="date"
            placeholder="Chọn ngày"
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
  <CModal
    alignment="center"
    :visible="modalUpdateTask"
    @close="
      () => {
        modalUpdateTask = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Sửa đổi công việc</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <el-form
        label-width="100px"
        :model="formUpdateTask"
        label-position="left"
      >
        <el-form-item label="Tên công việc">
          <el-input v-model="formUpdateTask.name"></el-input>
        </el-form-item>
        <el-form-item label="Trạng thái">
          <el-radio-group v-model="formUpdateTask.status">
            <el-radio
              v-for="item in status_option"
              :label="item.value"
              :key="item"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Nội dung cụ thể">
          <el-input
            v-model="formUpdateTask.description"
            type="textarea"
            rows="5"
          ></el-input>
        </el-form-item>
        <el-form-item label="Ngày bắt đầu">
          <el-date-picker
            v-model="formUpdateTask.startDay"
            type="date"
            placeholder="Chọn ngày"
            :default-value="formUpdateTask.startDay"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="Thời hạn hoàn thành">
          <el-date-picker
            v-model="formUpdateTask.deadline"
            type="date"
            placeholder="Chọn ngày"
            default-value="2010-10-01"
          >
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="Ghi chú">
          <el-input
            v-model="formUpdateTask.note"
            type="textarea"
            rows="5"
          ></el-input>
        </el-form-item>
      </el-form>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="secondary"
        @click="
          () => {
            modalUpdateTask = false
          }
        "
      >
        Đóng
      </CButton>
      <CButton color="success" @click="updateTask">Cập nhật công việc</CButton>
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
      modalUpdateTask: false,
      users: [],
      checkList: ['selected and disabled', 'Option A'],
      task_focus: 0,
      formAddNewTask: { name: '', description: '', deadline: '', startDay: '' },
      formUpdateTask: {
        name: '',
        progress: 0,
        status: '',
        deadline: '',
        startDay: '',
        description: '',
        note: '',
      },
      status_option: [
        { value: 'done', label: 'Done' },
        { value: 'cancel', label: 'Cancel' },
        { value: 'pending', label: 'Pending' },
        { value: 'doing', label: 'Doing' },
      ],
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
        name: this.formAddNewTask.name,
        progress: 0,
        assign: [],
        status: 'pending',
        deadline: this.formAddNewTask.deadline,
        startDay: this.formAddNewTask.startDay,
      }
      this.taskDetail.push(task_new)
    },
    handleOnDeleteTask(task_index) {
      this.$confirm(
        'Hành động này sẽ xóa công việc này vĩnh viễn. Tiếp tục?',
        'Cảnh báo',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Hủy',
          type: 'warning',
        },
      )
        .then(() => {
          this.taskDetail.splice(task_index, 1)
          this.$message({
            type: 'success',
            message: 'Xóa thành công',
          })
        })
        .catch(() => {})
    },
    formatDate(deadline) {
      var date = new Date(deadline)
      return (
        date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
      )
    },
    handleEdit(index, row) {
      this.modalUpdateTask = true
      this.focusTask = { ...row, index }
      this.formUpdateTask.name = this.focusTask.name
      this.formUpdateTask.description = this.focusTask.description
      this.formUpdateTask.status = this.focusTask.status
      this.formUpdateTask.note = this.focusTask.note
      this.formAddNewTask.startDay = new Date(this.focusTask.startDay)
      this.formAddNewTask.deadline = new Date(this.focusTask.deadline)
      console.log(this.formAddNewTask)
    },
    updateTask() {
      const index = this.taskDetail.findIndex((e) => e.id === this.focusTask.id)
      if (index) {
        this.taskDetail[index].name = this.formUpdateTask.name
        this.taskDetail[index].status = this.formUpdateTask.status
        this.taskDetail[index].description = this.formUpdateTask.description
        this.taskDetail[index].note = this.formUpdateTask.note
        this.taskDetail[index].startDay = this.formAddNewTask.startDay
        this.taskDetail[index].deadline = this.formAddNewTask.deadline

        if (this.taskDetail[index].status === 'done')
          this.taskDetail[index].progress = 100
        this.formUpdateTask = {
          name: '',
          progress: 0,
          status: '',
          deadline: '',
          startDay: '',
          description: '',
          note: '',
        }

        this.focusTask = []
        this.$message({
          message: 'Cập nhật thành công!',
          type: 'success',
        })
        this.modalUpdateTask = false
      }
    },
  },
  created() {
    this.taskList = taskListMock
    this.taskDetail = taskDetailMock
    // console.log('task detail', this.taskDetail)
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
.task-info {
  text-align: left;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
