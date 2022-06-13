<template>
  <h1>Báo cáo thu chi</h1>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="name" label="Chi phí dành cho" sortable>
    </el-table-column>
    <el-table-column prop="month" label="Tháng" sortable></el-table-column>
    <el-table-column prop="up_day" label="Ngày cập nhật" sortable>
    </el-table-column>
    <el-table-column prop="link" label="File báo cáo" sortable>
    </el-table-column>
  </el-table>
</template>

<style scope></style>

<script>
import USER_MOCK from '../../mock/user'
import staffListMock from '../../mock/cost'
export default {
  data() {
    return {
      users: USER_MOCK,
      data_render: [],
      limit: 12,
      account: {},
    }
  },
  methods: {
    handleOnChangePage(currentPage) {
      var page_form = (currentPage - 1) * this.limit
      this.data_render = this.users.slice(page_form, page_form + this.limit)
    },
  },
  mounted() {
    this.data_render = this.users.slice(0, this.limit)
    this.account = JSON.parse(localStorage.getItem('user'))
    this.staffList = staffListMock
    this.tableData = this.staffList.slice(0, this.limit)
  },
}
</script>
