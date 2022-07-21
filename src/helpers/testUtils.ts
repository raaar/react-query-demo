import { faker } from '@faker-js/faker';
import { Character } from '../models';

export const buildCharacter = (overrides: Partial<Character> = {}): Character => ({
  id: faker.datatype.number(),
  name: faker.lorem.word(),
  description: faker.lorem.word(),
  modified: faker.lorem.word(),
  resourceURI: faker.lorem.word(),
  urls: [
    {
      type: faker.lorem.word(),
      url: faker.internet.url()
    }
  ],
  thumbnail: {
    path: faker.internet.url(),
    extension: faker.system.fileExt()
  },
  comics: {
    available: faker.datatype.number(),
    returned: faker.datatype.number(),
    collectionURI: faker.internet.url(),
    items: [
      {
        resourceURI: faker.internet.url(),
        name: faker.lorem.word()
      }
    ]
  },
  stories: {
    available: faker.datatype.number(),
    returned: faker.datatype.number(),
    collectionURI: faker.lorem.word(),
    items: [
      {
        resourceURI: faker.lorem.word(),
        name: faker.lorem.word(),
        type: faker.lorem.word()
      }
    ]
  },
  events: {
    available: faker.datatype.number(),
    returned: faker.datatype.number(),
    collectionURI: faker.lorem.word(),
    items: [
      {
        resourceURI: faker.lorem.word(),
        name: faker.lorem.word()
      }
    ]
  },
  series: {
    available: faker.datatype.number(),
    returned: faker.datatype.number(),
    collectionURI: faker.lorem.word(),
    items: [
      {
        resourceURI: faker.lorem.word(),
        name: faker.lorem.word()
      }
    ]
  },
  ...overrides
})