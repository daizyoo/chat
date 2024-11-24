'use server'

import { cookies } from "next/headers";
import { CREATE_USER, LOGIN } from "../types/url";
import { ApiResponse, GetApiResponse, Response } from "@/lib/api";
import { CheckSpace } from "@/types/app";

export const CheckLogin = async (): Promise<boolean> => {
  const cookie = await cookies();
  return !cookie.get('user_id') && !cookie.get('password');
};

export const GetUserId = async (): Promise<string | undefined> => {
  const id = (await cookies()).get('user_id');
  return id?.value;
}

export type LoginInfo = Omit<User, 'name'>;

export type UserInfo = Omit<User, 'password'>;

export type User = {
  name: string,
  id: string,
  password: string,
};

type Account = {
  friends: Array<UserInfo>,
};

export type AccountInfo = Account & UserInfo;

export async function Login(login: LoginInfo) {
  console.log(login)
  if (CheckSpace(login.id) && CheckSpace(login.password)) {
    return 'id or password is space';
  }
  let res: Response<LoginInfo | string> = await ApiResponse(LOGIN, login);

  if (res.data && typeof res.data == 'string') {
    return res.data;
  } else if (res.data && typeof res.data != 'string') {
    let user = res.data;
    (await cookies()).set('user_id', user.id).set('password', user.password);
  }
}

export async function CreateUser(user: User) {
  let res: Response<User | string> = await ApiResponse(CREATE_USER, user);
  if (typeof res.data == 'string') return res.data;
  else if (res.data) {
    let { id, password } = res.data;
    await Login({ id, password }).then(res => console.log(res));
  }
}

export async function GetUserInfo(id: string) {
  let res: Response<AccountInfo | string> = await GetApiResponse(`user/${id}`);
  if (typeof res.data == 'string') return res.data;
  else if (res.data) return res.data;
  return 'e'
}
