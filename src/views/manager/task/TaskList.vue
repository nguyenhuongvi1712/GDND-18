<template>
  <h1>
    Danh sách công việc đội
    <span class="uppercase-text">{{ account.team }}</span>
  </h1>

  <el-table
    :data="
      tableData.filter(
        (data) =>
          !search || data.name.toLowerCase().includes(search.toLowerCase()),
      )
    "
    stripe
    style="width: 100%"
  >
    <el-table-column prop="name" label="Nội dung công việc" width="500">
      <template v-slot="scope">
        <a class="link-custom" @click="onHandleRedirect(scope.row.id)">{{
          scope.row.name
        }}</a>
      </template>
    </el-table-column>
    <el-table-column prop="progress" label="Tiến độ (%)" sortable>
    </el-table-column>
    <el-table-column prop="numOfMember" label="Số lượng nhân công" sortable>
    </el-table-column>
    <el-table-column label="Thời hạn">
      <template v-slot="scope">
        <span style="margin-left: 10px">{{
          formatDate(scope.row.deadline)
        }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="status"
      label="Trạng thái"
      width="150"
      :filters="[
        { text: 'Đã xong', value: 'done' },
        { text: 'Đã hủy', value: 'cancel' },
        { text: 'Đang chờ', value: 'pending' },
        { text: 'Đang tiến hành', value: 'doing' },
      ]"
      :filter-method="filterTag"
      filter-placement="bottom-end"
    >
      <template v-slot="scope">
        <el-tag
          :type="checkRenderStatus(scope.row.status)"
          disable-transitions
          >{{ renderStatus(scope.row.status) }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column>
      <template v-slot:header="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="Type to search"
          :scope="scope"
        />
      </template>
      <template v-slot="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >Cập nhật</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination-custom">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="taskList.length"
      :page-size="limit"
      @current-change="handleOnChangePage"
    >
    </el-pagination>
  </div>
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
      <CModalTitle>Cập nhật báo cáo công việc</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <el-form
        label-width="100px"
        :model="formUpdateTask"
        label-position="left"
      >
        <el-form-item label="Tên công việc">
          <p>{{ focusTask.name }}</p>
        </el-form-item>
        <el-form-item label="Tiến độ">
          <el-input-number
            v-model="formUpdateTask.progress"
            controls-position="right"
            @change="handleChange"
            :min="0"
            :max="100"
            step="10"
          ></el-input-number>
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
          <p>{{ focusTask?.description }}</p>
        </el-form-item>
        <el-form-item label="Ngày bắt đầu">
          <p>{{ formatDate(focusTask?.start) }}</p>
        </el-form-item>

        <el-form-item label="Thời hạn hoàn thành">
          <p>{{ formatDate(focusTask?.deadline) }}</p>
        </el-form-item>
        <el-form-item
          label="Hình ảnh mô tả"
          v-if="focusTask.images && focusTask.images.length !== 0"
        >
          <p v-for="(img, index) in focusTask.images" :key="index">
            <el-image
              style="width: 100px; height: 100px"
              :src="img"
              fit="fill"
              :preview-src-list="focusTask.images"
            ></el-image>
          </p>
        </el-form-item>
        <el-form-item label="Ghi chú báo cáo">
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
import taskListMock from '../../../mock/task'
export default {
  data() {
    return {
      account: {},
      tableData: [],
      taskList: [],
      limit: 10,
      search: '',
      modalUpdateTask: false,
      status_option: [
        { value: 'done', label: 'Done' },
        { value: 'cancel', label: 'Cancel' },
        { value: 'pending', label: 'Pending' },
        { value: 'doing', label: 'Doing' },
      ],
      focusTask: [],
      formUpdateTask: {
        progress: 0,
        status: '',
        note: '',
      },
    }
  },
  created() {
    this.account = JSON.parse(localStorage.getItem('user'))
    this.taskList = taskListMock
    this.tableData = this.taskList.slice(0, this.limit)
  },
  methods: {
    checkRenderStatus(status) {
      if (status === 'doing') return 'primary'
      else if (status === 'pending') return 'info'
      else if (status === 'cancel') return 'danger'
      else return 'success'
    },
    renderStatus(status) {
      if (status === 'doing') return 'Đang tiến hành'
      else if (status === 'pending') return 'Đang chờ'
      else if (status === 'cancel') return 'Đã hủy'
      else return 'Đã hoàn thành'
    },
    filterTag(value, row) {
      return row.status === value
    },
    handleOnChangePage(currentPage) {
      var page_form = (currentPage - 1) * this.limit
      this.tableData = this.taskList.slice(page_form, page_form + this.limit)
    },
    onHandleRedirect(id) {
      this.$router.push(`/manager/task/${id}`)
    },
    formatDate(deadline) {
      var date = new Date(deadline)
      return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
    },
    handleEdit(index, row) {
      this.modalUpdateTask = true
      this.focusTask = { ...row, index }
      this.formUpdateTask.progress = this.focusTask.progress
      this.formUpdateTask.status = this.focusTask.status
      this.formUpdateTask.note = this.focusTask.note
      console.log(index, row)
    },
    updateTask() {
      console.log('>>>')
      const index = this.tableData.findIndex((e) => e.id === this.focusTask.id)
      if (index) {
        this.tableData[index].progress = this.formUpdateTask.progress
        this.tableData[index].status = this.formUpdateTask.status
        this.tableData[index].note = this.formUpdateTask.note

        this.formUpdateTask = {
          progress: 0,
          status: '',
          note: '',
        }

        this.focusTask = []
        this.$message({
          message: 'Cập nhật thành công!',
          type: 'success',
        })
      }
      this.modalUpdateTask = false
    },
  },
}
</script>
<style scoped>
.uppercase-text {
  text-transform: uppercase;
}
.pagination-custom {
  margin-top: 10px;
}
.link-custom {
  color: var(--cui-link-color, #321fdb);
  text-decoration: underline;
}
h1 {
  text-align: center;
  margin-bottom: 30px;
}
</style>
