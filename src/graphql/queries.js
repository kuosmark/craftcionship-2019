// eslint-disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    date
    name
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      date
      name
    }
    nextToken
  }
}
`;
export const getMeme = `query GetMeme($id: ID!) {
  getMeme(id: $id) {
    id
    url
    name
  }
}
`;
export const listMemes = `query ListMemes(
  $filter: ModelMemeFilterInput
  $limit: Int
  $nextToken: String
) {
  listMemes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      url
      name
    }
    nextToken
  }
}
`;
