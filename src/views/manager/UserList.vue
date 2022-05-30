<template>
  <h1>
    Danh sách nhân sự đội <span class="uppercase-text">{{ account.team }}</span>
  </h1>
  <el-row :gutter="20">
    <el-col :span="6" v-for="user in data_render" :key="user.id">
      <el-card :body-style="{ padding: '0px' }" class="card-container">
        <div>
          <el-avatar :src="user.avatar" size="large"></el-avatar>
        </div>
        <!-- <img :src="user.avatar" class="image" /> -->
        <div class="detail-info">
          <p class="detail-name">{{ user.name }}</p>
          <el-tag v-if="user.status === 'active'" type="success"
            >Đang hoạt động</el-tag
          >
          <el-tag v-else type="danger">Không hoạt động</el-tag>
          <hr />
          <div>
            <el-button class="view-btn" type="success">Xem thêm</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="users.length"
    :page-size="limit"
    @current-change="handleOnChangePage"
  >
  </el-pagination>
</template>
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
h1 {
  text-align: center;
  margin-bottom: 30px;
}
</style>

<script>
import USER_MOCK from '../../mock/user'
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
  },
}
</script>
