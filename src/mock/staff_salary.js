import { faker } from '@faker-js/faker'
// import { sample } from 'lodash'

const STAFF_LIST_MOCK = [
  {
    id: faker.datatype.uuid(),
    month: 'T10',
    up_day: '15/10/2010',
    link: 'salary.docx',
  },
  {
    id: faker.datatype.uuid(),
    month: 'T11',
    up_day: '15/11/2010',
    link: 'salary.docx',
  },
  {
    id: faker.datatype.uuid(),
    month: 'T12',
    up_day: '15/12/2010',
    link: 'salary.docx',
  },
]
export default STAFF_LIST_MOCK
