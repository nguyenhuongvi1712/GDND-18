import { faker } from '@faker-js/faker'
// ----------------------------------------------------------------------

const kpiUsers = [...Array(50)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.findName(),
  numOfAllTask: Math.floor(Math.random() * 100) + 50,
  numOfDoneTask: Math.floor(Math.random() * 50) + 1,
  manHour: Math.floor(Math.random() * 1000) + 1,
  avatar: faker.image.avatar(),
}))

export default kpiUsers
