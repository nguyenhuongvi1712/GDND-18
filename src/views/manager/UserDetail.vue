<template>
  <div>
    <h1>Danh sách công việc</h1>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="Tên công việc" width="380">
      </el-table-column>
      <el-table-column prop="progress" label="Tiến độ" sortable>
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
      <el-table-column prop="manHour" label="Giờ công" sortable>
      </el-table-column>
      <el-table-column>
        <template v-slot="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >Cập nhật giờ công</el-button
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
    <CModal alignment="center" :visible="warningModal">
      <CModalHeader>
        <CModalTitle>Cập nhật giờ công</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <span style="margin-right: 10px">Giờ công hiện tại</span>
        <el-input-number
          v-model="manHour"
          controls-position="right"
          @change="handleChange"
          :min="0"
        ></el-input-number>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="secondary"
          @click="
            () => {
              warningModal = false
            }
          "
        >
          Đóng
        </CButton>
        <CButton color="success" @click="updateTask">Cập nhật giờ công</CButton>
      </CModalFooter>
    </CModal>
  </div>
</template>
<script>
import taskListMock from '../../mock/user-task'
export default {
  data() {
    return {
      taskList: taskListMock,
      limit: 10,
      tableData: [],
      warningModal: false,
      manHour: 0,
      taskFocus: [],
    }
  },
  created() {
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
    formatDate(deadline) {
      var date = new Date(deadline)
      return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
    },
    handleEdit(index, row) {
      this.manHour = row.manHour
      this.warningModal = true
      this.taskFocus = { ...row, index }
    },
    updateTask() {
      const index = this.tableData.findIndex((e) => e.id === this.taskFocus.id)
      if (index !== -1) {
        this.tableData[index].manHour = this.manHour
        this.$message({
          message: 'Cập nhật thành công!',
          type: 'success',
        })
      }
      this.warningModal = false
    },
  },
}
</script>
