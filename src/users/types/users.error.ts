export enum UsersError {
  USER_ALREADY_EXIST = 'USER_ALREADY_EXIST',
  USER_NOT_EXIST = 'USER_NOT_EXIST',
  PASSWORD_NOT_MATCH = 'PASSWORD_NOT_MATCH',
}

export type UsersErrorMessage = {
  message: UsersError[];
};
