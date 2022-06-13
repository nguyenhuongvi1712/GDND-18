import { faker } from '@faker-js/faker'
// import { sample } from 'lodash'

const STAFF_LIST_MOCK = [
  {
    id: faker.datatype.uuid(),
    name: 'Nguyen Van A',
    shift: '8AM - 6PM',
    early: 10,
    late: 0,
    ot: '6PM - 9PM',
    status: 'done',
  },
  {
    id: faker.datatype.uuid(),
    name: 'Nguyen Van B',
    shift: '8AM - 6PM',
    early: 10,
    late: 0,
    ot: '6PM - 9PM',
    status: 'done',
  },
  {
    id: faker.datatype.uuid(),
    name: 'Nguyen Van C',
    shift: '8AM - 6PM',
    early: 10,
    late: 0,
    ot: '6PM - 9PM',
    status: 'done',
  },
  {
    id: faker.datatype.uuid(),
    name: 'Nguyen Van D',
    shift: '8AM - 6PM',
    early: 10,
    late: 0,
    ot: '6PM - 9PM',
    status: 'done',
  },
]
export default STAFF_LIST_MOCK
