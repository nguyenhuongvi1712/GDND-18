<template>
  <h1>Upload bảng lương</h1>
  <CForm>
    <div class="mb-3">
      <CFormLabel for="exampleFormControlInput1">Lương tháng</CFormLabel>
      <CFormInput
        type="email"
        id="exampleFormControlInput1"
        placeholder="T10/2022"
      />
      <CFormLabel for="exampleFormControlInput1">Ngày cập nhật</CFormLabel>
      <CFormInput
        type="email"
        id="exampleFormControlInput1"
        placeholder="T10/2022"
      />
    </div>
    <CFormLabel for="formFile">File báo cáo</CFormLabel>
    <CFormInput type="file" id="formFile" label="Default file input example" />
  </CForm>
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
import staffSalaryListMock from '../../../mock/staff_salary'
export default {
  data() {
    return {
      staffSalaryList: [],
      tableData: [],
      limit: 10,
      account: {},
    }
  },
  created() {
    this.account = JSON.parse(localStorage.getItem('user'))
    this.staffSalaryList = staffSalaryListMock
    this.tableData = this.staffSalaryList.slice(0, this.limit)
  },
  methods: {
    handleOnChangePage(currentPage) {
      var page_form = (currentPage - 1) * this.limit
      this.tableData = this.staffSalaryList.slice(
        page_form,
        page_form + this.limit,
      )
    },
  },
}
</script>
