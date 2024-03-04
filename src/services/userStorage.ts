import { User } from "../types/types";

const USER_KEY = 'user';

export const readUser = () => {
  const userString = localStorage.getItem(USER_KEY);
  if (userString !== null) {
      return JSON.parse(userString);
  } else {
      return null;
  }
};
const saveUser = (user: User) => localStorage.setItem(USER_KEY, JSON.stringify(user));

export const getUser = () => {
  let user = readUser();
  if (user === null) {
    user = {};
  }
};

export const createUser = (user: User) =>  {
  saveUser(user);
};

export const updateUser = (updatedUser: User) => {
  saveUser({ ...updatedUser });
};