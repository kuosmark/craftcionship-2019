// eslint-disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    date
    name
    winner
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    date
    name
    winner
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    date
    name
    winner
  }
}
`;
export const createMeme = `mutation CreateMeme($input: CreateMemeInput!) {
  createMeme(input: $input) {
    id
    url
    name
  }
}
`;
export const updateMeme = `mutation UpdateMeme($input: UpdateMemeInput!) {
  updateMeme(input: $input) {
    id
    url
    name
  }
}
`;
export const deleteMeme = `mutation DeleteMeme($input: DeleteMemeInput!) {
  deleteMeme(input: $input) {
    id
    url
    name
  }
}
`;
