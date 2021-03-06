export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
      text: 'NEW',
    },
  },
  {
    component: 'CNavTitle',
    name: 'TEAM',
  },
  {
    component: 'CNavItem',
    name: 'Nhân viên',
    to: '/manager',
    icon: 'cil-user',
  },
  // {
  //   component: 'CNavTitle',
  //   name: 'Report',
  // },
  // {
  //   component: 'CNavItem',
  //   name: 'Advertisment',
  //   to: '/report/advertisment',
  //   icon: 'cil-drop',
  // },
  // {
  //   component: 'CNavItem',
  //   name: 'Promotion',
  //   to: '/report/promotion',
  //   icon: 'cil-pencil',
  // },
  // {
  //   component: 'CNavItem',
  //   name: 'Revenue',
  //   to: '/report/revenue',
  //   icon: 'cil-notes',
  // },
  // {
  //   component: 'CNavItem',
  //   name: 'Store',
  //   to: '/report/store',
  //   icon: 'cil-cursor',
  // },
  {
    component: 'CNavTitle',
    name: 'Quản lý công việc',
  },
  {
    component: 'CNavGroup',
    name: 'Quản lý tiến độ',
    to: '/manager/task',
    icon: 'cil-notes',
    items: [
      {
        component: 'CNavItem',
        name: 'Danh sách công việc',
        to: '/manager/task/list',
      },
      // {
      //   component: 'CNavItem',
      //   name: 'Thêm mới công việc',
      //   to: '/manager/task/create',
      // },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Quản lý KPI',
    to: '/manager/kpi',
    icon: 'cil-puzzle',
    items: [
      {
        component: 'CNavItem',
        name: 'Danh sách KPI',
        to: '/manager/kpi',
      },
      // {
      //   component: 'CNavItem',
      //   name: 'Accounts',
      //   to: '/users/accounts',
      // },
      // {
      //   component: 'CNavItem',
      //   name: 'Create new account',
      //   to: '/users/create',
      // },
    ],
  },
  // {
  //   component: 'CNavGroup',
  //   name: 'Promotions',
  //   to: '/promotions',
  //   icon: 'cil-calculator',
  //   items: [
  //     {
  //       component: 'CNavItem',
  //       name: 'List Promotions',
  //       to: '/promotions/list',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Create new account',
  //       to: '/promotions/create',
  //     },
  //   ],
  // },
  // {
  //   component: 'CNavGroup',
  //   name: 'Advertisements',
  //   to: '/advertisements',
  //   icon: 'cil-star',
  //   items: [
  //     {
  //       component: 'CNavItem',
  //       name: 'List Advertisements',
  //       to: '/advertisements/list',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Create new advertisement',
  //       to: '/advertisements/create',
  //     },
  //   ],
  // },
  // {
  //   component: 'CNavGroup',
  //   name: 'Store',
  //   to: '/stores',
  //   icon: 'cil-notes',
  //   items: [
  //     {
  //       component: 'CNavItem',
  //       name: 'List Product',
  //       to: '/products/list',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Create new product',
  //       to: '/products/create',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Create new category',
  //       to: '/products/categories/create',
  //     },
  //   ],
  // },
  // {
  //   component: 'CNavItem',
  //   name: 'Widgets',
  //   to: '/widgets',
  //   icon: 'cil-calculator',
  //   badge: {
  //     color: 'primary',
  //     text: 'NEW',
  //     shape: 'pill',
  //   },
  // },
  // {
  //   component: 'CNavTitle',
  //   name: 'Extras',
  // },
  // {
  //   component: 'CNavGroup',
  //   name: 'Pages',
  //   to: '/pages',
  //   icon: 'cil-star',
  //   items: [
  //     {
  //       component: 'CNavItem',
  //       name: 'Login',
  //       to: '/pages/login',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Register',
  //       to: '/pages/register',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Error 404',
  //       to: '/pages/404',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Error 500',
  //       to: '/pages/500',
  //     },
  //   ],
  // },
  // {
  //   component: 'CNavItem',
  //   name: 'Download CoreUI',
  //   href: 'http://coreui.io/vue/',
  //   icon: { name: 'cil-cloud-download', class: 'text-white' },
  //   _class: 'bg-success text-white',
  //   target: '_blank',
  // },
  // {
  //   component: 'CNavItem',
  //   name: 'Try CoreUI PRO',
  //   href: 'http://coreui.io/pro/vue/',
  //   icon: { name: 'cil-layers', class: 'text-white' },
  //   _class: 'bg-danger text-white',
  //   target: '_blank',
  // },
]
