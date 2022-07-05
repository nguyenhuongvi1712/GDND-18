<template>
  <h1>
    Danh sách công việc đội
    <span class="uppercase-text">{{ account.team }}</span>
  </h1>

  <el-table :data="tableData" stripe style="width: 100%">
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
    <el-table-column prop="deadline" label="Thời hạn"> </el-table-column>
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
    <el-table-column label="Operations">
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
