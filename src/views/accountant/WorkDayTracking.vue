<template>
  <h1>
    Danh sách ngày công <span class="uppercase-text">{{ account.team }}</span>
  </h1>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="name" label="Nhân viên" sortable></el-table-column>
    <el-table-column prop="shift" label="Ca làm" sortable></el-table-column>
    <el-table-column prop="late" label="Đến muộn" sortable></el-table-column>
    <el-table-column prop="early" label="Về sớm" sortable></el-table-column>
    <el-table-column prop="ot" label="Làm thêm giờ" sortable></el-table-column>
    <el-table-column prop="status" label="Trạng thái" sortable>
    </el-table-column>
  </el-table>
</template>

<style scope></style>

<script>
import USER_MOCK from '../../mock/user'
import staffListMock from '../../mock/staff'
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
