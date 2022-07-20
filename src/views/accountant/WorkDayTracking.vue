<template>
  <h1>
    Danh sách ngày công
    <span class="uppercase-text">{{ account.team }}</span>
  </h1>

  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="name" label="Nhân viên" sortable>
      <template v-slot="scope">
        <a class="link-custom">{{ scope.row.name }}</a>
      </template>
    </el-table-column>
    <el-table-column prop="shift" label="Ca làm" sortable></el-table-column>
    <el-table-column prop="late" label="Đến muộn" sortable></el-table-column>
    <el-table-column prop="early" label="Về sớm" sortable></el-table-column>
    <el-table-column prop="ot" label="Làm thêm giờ" sortable></el-table-column>
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
    <el-table-column label="Confirm">
      <template v-slot="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >Xác nhận</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <div class="pagination-custom">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="staffList.length"
      :page-size="limit"
      @current-change="handleOnChangePage"
    >
    </el-pagination>
  </div>
</template>

<style scope>
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

<script>
import staffListMock from '../../mock/staff'
export default {
  data() {
    return {
      account: {},
      staffList: [],
      tableData: [],
      limit: 10,
    }
  },
  created() {
    this.account = JSON.parse(localStorage.getItem('user'))
    this.staffList = staffListMock
    this.tableData = this.staffList.slice(0, this.limit)
  },
  methods: {
    handleOnChangePage(currentPage) {
      var page_form = (currentPage - 1) * this.limit
      this.tableData = this.staffList.slice(page_form, page_form + this.limit)
    },
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
  },
}
</script>
