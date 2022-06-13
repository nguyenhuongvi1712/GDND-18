import { faker } from '@faker-js/faker'
// import { sample } from 'lodash'

const STAFF_LIST_MOCK = [
  {
    id: faker.datatype.uuid(),
    name: 'Nhan vien A dau om',
    month: 'T10',
    up_day: '10/10/2010',
    link: 'salary.docx',
  },
  {
    id: faker.datatype.uuid(),
    name: 'Nhan vien B gay tay',
    month: 'T11',
    up_day: '10/11/2010',
    link: 'salary.docx',
  },
  {
    id: faker.datatype.uuid(),
    name: 'Nhan vien C de con',
    month: 'T12',
    up_day: '10/12/2010',
    link: 'salary.docx',
  },
]
export default STAFF_LIST_MOCK
