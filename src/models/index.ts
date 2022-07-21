export type MarvelResponse<ResponseData> = {
  data: {
    count: number,
    limit: number,
    offset: number,
    results: ResponseData,
    total: number
  }
}

export type ThumbnailModel = {
  path: string,
  extension: string
}

export type Character = {
  id: number,
  name: string,
  description: string,
  modified: string,
  resourceURI: string,
  urls: [
    {
      type: string,
      url: string
    }
  ],
  thumbnail: ThumbnailModel,
  comics: {
    available: number,
    returned: number,
    collectionURI: string,
    items: [
      {
        resourceURI: string,
        name: string
      }
    ]
  },
  stories: {
    available: number,
    returned: number,
    collectionURI: string,
    items: [
      {
        resourceURI: string,
        name: string,
        type: string
      }
    ]
  },
  events: {
    available: number,
    returned: number,
    collectionURI: string,
    items: [
      {
        resourceURI: string,
        name: string
      }
    ]
  },
  series: {
    available: number,
    returned: number,
    collectionURI: string,
    items: [
      {
        resourceURI: string,
        name: string
      }
    ]
  }
}

export enum SORT_FILTER {
  BY_TITLE = 'SORT_BY_TITLE',
  BY_DATE = 'SORT_BY_DATE'
}