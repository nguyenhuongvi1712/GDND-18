import { faker } from '@faker-js/faker'
import { sample } from 'lodash'

// ----------------------------------------------------------------------
const TASK_DETAIL_MOCK = [
  {
    id: faker.datatype.uuid(),
    name: 'Dọn cỏ',
    progress: 20,
    assign: [
      {
        name: 'Nguyễn Văn A',
        id: faker.datatype.uuid(),
        avatar: faker.image.avatar(),
      },
    ],
    status: sample(['done', 'cancel', 'pending', 'doing']),
  },
  {
    id: faker.datatype.uuid(),
    name: 'Cải tạo đất trồng',
    progress: 40,
    assign: [
      {
        name: 'Nguyễn Văn A',
        id: faker.datatype.uuid(),
        avatar: faker.image.avatar(),
      },
      {
        name: 'Nguyễn Văn B',
        id: faker.datatype.uuid(),
        avatar: faker.image.avatar(),
      },
      {
        name: 'Nguyễn Văn C',
        id: faker.datatype.uuid(),
        avatar: faker.image.avatar(),
      },
    ],
    status: sample(['done', 'cancel', 'pending', 'doing']),
  },
  {
    id: faker.datatype.uuid(),
    name: 'Trồng hoa',
    progress: 40,
    assign: [
      {
        name: 'Nguyễn Văn A',
        id: faker.datatype.uuid(),
        avatar: faker.image.avatar(),
      },
      {
        name: 'Nguyễn Văn B',
        id: faker.datatype.uuid(),
        avatar: faker.image.avatar(),
      },
    ],
    status: sample(['done', 'cancel', 'pending', 'doing']),
  },
  {
    id: faker.datatype.uuid(),
    name: 'Dựng hàng rào',
    progress: 100,
    assign: [
      {
        name: 'Nguyễn Văn A',
        id: faker.datatype.uuid(),
        avatar: faker.image.avatar(),
      },
      {
        name: 'Nguyễn Văn B',
        id: faker.datatype.uuid(),
        avatar: faker.image.avatar(),
      },
      {
        name: 'Nguyễn Văn C',
        id: faker.datatype.uuid(),
        avatar: faker.image.avatar(),
      },
    ],
    status: sample(['done', 'cancel', 'pending', 'doing']),
  },
  {
    id: faker.datatype.uuid(),
    name: 'Bón phân',
    progress: 80,
    assign: [
      {
        name: 'Nguyễn Văn A',
        id: faker.datatype.uuid(),
        avatar: faker.image.avatar(),
      },
      {
        name: 'Nguyễn Văn B',
        id: faker.datatype.uuid(),
        avatar: faker.image.avatar(),
      },
    ],
    status: sample(['done', 'cancel', 'pending', 'doing']),
  },
]

export default TASK_DETAIL_MOCK
