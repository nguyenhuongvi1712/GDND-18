<template>
  <div>
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardHeader> Công việc </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol :sm="12" :lg="6">
                <CRow>
                  <CCol :sm="6">
                    <div
                      class="border-start border-start-4 border-start-info py-1 px-3 mb-3"
                    >
                      <div class="text-medium-emphasis small">
                        Công việc mới
                      </div>
                      <div class="fs-5 fw-semibold">9,123</div>
                    </div>
                  </CCol>
                  <CCol :sm="6">
                    <div
                      class="border-start border-start-4 border-start-danger py-1 px-3 mb-3"
                    >
                      <div class="text-medium-emphasis small">
                        Công việc đã hoàn thành
                      </div>
                      <div class="fs-5 fw-semibold">22,643</div>
                    </div>
                  </CCol>
                </CRow>
                <hr class="mt-0" />
                <div class="mb-3 mt-3">Tiến độ công việc trong tuần qua:</div>
                <div class="mb-3 mt-3">
                  <CBadge style="margin-right: 5px" color="info">
                    Đang tiến hành</CBadge
                  >
                  <CBadge style="margin-right: 5px" color="success">
                    Đã hoàn thành</CBadge
                  >
                  <CBadge style="margin-right: 5px" color="warning">
                    Đang chờ
                  </CBadge>
                  <CBadge style="margin-right: 5px" color="danger">
                    Đã hủy</CBadge
                  >
                </div>
                <div
                  v-for="item in progressGroupExample1"
                  :key="item.title"
                  class="progress-group mb-4"
                >
                  <div class="progress-group-prepend">
                    <span class="text-medium-emphasis small">{{
                      item.title
                    }}</span>
                  </div>
                  <div class="progress-group-bars">
                    <CProgress
                      thin
                      color="info"
                      :value="item.value1"
                      show-value
                    />
                    <CProgress
                      thin
                      color="warning"
                      :value="item.value2"
                      show-value
                    />
                    <CProgress
                      thin
                      color="success"
                      :value="item.value3"
                      show-value
                    />
                    <CProgress
                      thin
                      color="danger"
                      :value="item.value4"
                      show-value
                    />
                  </div>
                </div>
              </CCol>
              <CCol :sm="12" :lg="6">
                <CRow>
                  <CCol :sm="6">
                    <div
                      class="border-start border-start-4 border-start-warning py-1 px-3 mb-3"
                    >
                      <div class="text-medium-emphasis small">
                        Công việc đang tiến hành
                      </div>
                      <div class="fs-5 fw-semibold">78,623</div>
                    </div>
                  </CCol>
                  <CCol :sm="6">
                    <div
                      class="border-start border-start-4 border-start-success py-1 px-3 mb-3"
                    >
                      <div class="text-medium-emphasis small">
                        Công việc đã hủy
                      </div>
                      <div class="fs-5 fw-semibold">49,123</div>
                    </div>
                  </CCol>
                </CRow>
                <hr class="mt-0" />
                <div class="mb-5"></div>
                <CRow>
                  <CChartPieExampleVue />
                </CRow>
              </CCol>
            </CRow>
            <br />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CCard>
      <CCardHeader> KPI Nhân công </CCardHeader>
      <CCardBody>
        <el-table :data="dataTableKPIUser" style="width: 100%">
          <el-table-column prop="name" label="Tên" width="180">
          </el-table-column>
          <el-table-column prop="avatar" label="Ảnh" width="100">
            <template v-slot="scope">
              <el-avatar shape="square" :src="scope.row.avatar"></el-avatar>
            </template>
          </el-table-column>
          <el-table-column
            prop="numOfAllTask"
            label="Tổng số công việc"
            width="180"
            sortable=""
          >
          </el-table-column>
          <el-table-column
            prop="numOfDoneTask"
            label="Số công việc đã hoàn thành"
            sortable=""
          >
          </el-table-column>
          <el-table-column prop="manHour" label="Số giờ công" sortable="">
          </el-table-column>
        </el-table>
        <div class="pagination-custom">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="kpiUser.length"
            :page-size="10"
            @current-change="handleOnChangePage"
          >
          </el-pagination>
        </div>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import avatar1 from '@/assets/images/avatars/1.jpg'
import avatar2 from '@/assets/images/avatars/2.jpg'
import avatar3 from '@/assets/images/avatars/3.jpg'
import avatar4 from '@/assets/images/avatars/4.jpg'
import avatar5 from '@/assets/images/avatars/5.jpg'
import avatar6 from '@/assets/images/avatars/6.jpg'
import CChartPieExampleVue from '../charts/CChartPieExample.vue'
import kpiUsers from '../../mock/kpi-user'

export default {
  name: 'Dashboard',
  components: {
    CChartPieExampleVue,
  },
  data() {
    return {
      kpiUser: kpiUsers,
      dataTableKPIUser: [],
    }
  },
  setup() {
    const progressGroupExample1 = [
      { title: 'Monday', value1: 34, value2: 78, value3: 10, value4: 10 },
      { title: 'Tuesday', value1: 56, value2: 94 },
      { title: 'Wednesday', value1: 12, value2: 67 },
      { title: 'Thursday', value1: 43, value2: 91 },
      { title: 'Friday', value1: 22, value2: 73 },
      { title: 'Saturday', value1: 53, value2: 82 },
      { title: 'Sunday', value1: 9, value2: 69 },
    ]
    const progressGroupExample2 = [
      { title: 'Male', icon: 'cil-user', value: 53 },
      { title: 'Female', icon: 'cil-user-female', value: 43 },
    ]
    const progressGroupExample3 = [
      {
        title: 'Organic Search',
        icon: 'cib-google',
        percent: 56,
        value: '191,235',
      },
      { title: 'Facebook', icon: 'cib-facebook', percent: 15, value: '51,223' },
      { title: 'Twitter', icon: 'cib-twitter', percent: 11, value: '37,564' },
      { title: 'LinkedIn', icon: 'cib-linkedin', percent: 8, value: '27,319' },
    ]
    const tableExample = [
      {
        avatar: { src: avatar1, status: 'success' },
        user: {
          name: 'Yiorgos Avraamu',
          new: true,
          registered: 'Jan 1, 2021',
        },
        country: { name: 'USA', flag: 'cif-us' },
        usage: {
          value: 50,
          period: 'Jun 11, 2021 - Jul 10, 2021',
          color: 'success',
        },
        payment: { name: 'Mastercard', icon: 'cib-cc-mastercard' },
        activity: '10 sec ago',
      },
      {
        avatar: { src: avatar2, status: 'danger' },
        user: {
          name: 'Avram Tarasios',
          new: false,
          registered: 'Jan 1, 2021',
        },
        country: { name: 'Brazil', flag: 'cif-br' },
        usage: {
          value: 22,
          period: 'Jun 11, 2021 - Jul 10, 2021',
          color: 'info',
        },
        payment: { name: 'Visa', icon: 'cib-cc-visa' },
        activity: '5 minutes ago',
      },
      {
        avatar: { src: avatar3, status: 'warning' },
        user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021' },
        country: { name: 'India', flag: 'cif-in' },
        usage: {
          value: 74,
          period: 'Jun 11, 2021 - Jul 10, 2021',
          color: 'warning',
        },
        payment: { name: 'Stripe', icon: 'cib-cc-stripe' },
        activity: '1 hour ago',
      },
      {
        avatar: { src: avatar4, status: 'secondary' },
        user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021' },
        country: { name: 'France', flag: 'cif-fr' },
        usage: {
          value: 98,
          period: 'Jun 11, 2021 - Jul 10, 2021',
          color: 'danger',
        },
        payment: { name: 'PayPal', icon: 'cib-cc-paypal' },
        activity: 'Last month',
      },
      {
        avatar: { src: avatar5, status: 'success' },
        user: {
          name: 'Agapetus Tadeáš',
          new: true,
          registered: 'Jan 1, 2021',
        },
        country: { name: 'Spain', flag: 'cif-es' },
        usage: {
          value: 22,
          period: 'Jun 11, 2021 - Jul 10, 2021',
          color: 'primary',
        },
        payment: { name: 'Google Wallet', icon: 'cib-cc-apple-pay' },
        activity: 'Last week',
      },
      {
        avatar: { src: avatar6, status: 'danger' },
        user: {
          name: 'Friderik Dávid',
          new: true,
          registered: 'Jan 1, 2021',
        },
        country: { name: 'Poland', flag: 'cif-pl' },
        usage: {
          value: 43,
          period: 'Jun 11, 2021 - Jul 10, 2021',
          color: 'success',
        },
        payment: { name: 'Amex', icon: 'cib-cc-amex' },
        activity: 'Last week',
      },
    ]

    return {
      tableExample,
      progressGroupExample1,
      progressGroupExample2,
      progressGroupExample3,
    }
  },
  methods: {
    handleOnChangePage(currentPage) {
      var page_form = (currentPage - 1) * 10
      this.dataTableKPIUser = this.kpiUser.slice(page_form, page_form + 10)
    },
  },
  created() {
    this.dataTableKPIUser = this.kpiUser.slice(0, 10)
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
