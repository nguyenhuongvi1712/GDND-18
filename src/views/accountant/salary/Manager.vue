<template>
  <h1>Lương quản lý và giám đốc</h1>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="month" label="Lương tháng" sortable>
    </el-table-column>
    <el-table-column prop="up_day" label="Ngày cập nhật" sortable>
    </el-table-column>
    <el-table-column prop="link" label="File báo cáo" sortable>
      <template v-slot="scope">
        <a class="link-custom">{{ scope.row.link }}</a>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination-custom">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="managerSalaryList.length"
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
import managerSalaryListMock from '../../../mock/manager_salary'
export default {
  data() {
    return {
      managerSalaryList: [],
      tableData: [],
      limit: 10,
      account: {},
    }
  },
  created() {
    this.account = JSON.parse(localStorage.getItem('user'))
    this.managerSalaryList = managerSalaryListMock
    this.tableData = this.managerSalaryList.slice(0, this.limit)
  },
  methods: {
    handleOnChangePage(currentPage) {
      var page_form = (currentPage - 1) * this.limit
      this.tableData = this.managerSalaryList.slice(
        page_form,
        page_form + this.limit,
      )
    },
  },
}
</script>
