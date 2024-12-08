// we should add this to ENV variables but just for the sake of the task i'll leave it here
export const HOSTNAME = 'https://674c7db754e1fca9290cb859.mockapi.io/rexpns';

enum user {
  profile = '/userProfile',
}

enum expenses {
  all = '/expenses',
}

export const endpoints = {
  user: user,
  expenses: expenses,
};

export enum FetchMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
