'use server'

import { cookies } from "next/headers";
import { CREATE_USER, LOGIN } from "../types/url";
import { ApiResponse, GetApiResponse, Response } from "@/lib/api";
import { CheckSpace } from "@/types/app";
import { AddFriend, SearchInfo } from "@/app/user/search/page";

export const CheckLogin = async (): Promise<boolean> => {
  const cookie = await cookies();
  return !cookie.get('user_id') && !cookie.get('password');
};

export const GetLoginInfo = async (): Promise<LoginInfo | undefined> => {
  const id = await GetUserId();
  const password = await GetUserPassword();
  if (!id || !password) return undefined;

  return { id: id, password: password }
};

export const GetUserPassword = async (): Promise<string | undefined> => {
  const password = (await cookies()).get('password');
  return password?.value;
};

export const GetUserId = async (): Promise<string | undefined> => {
  const id = (await cookies()).get('user_id');
  return id?.value;
};

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

export const SearchResponse = async (name: string) => {
  if (CheckSpace(name)) return [];
  let user_info: UserInfo = { id: name, name: name };
  let res: Response<Array<SearchInfo>> = await ApiResponse(`user/search?id=${user_info.id}&name=${user_info.name}`, { id: await GetUserId() })
  return res.data;
};

export const AddFriendResponse = async (user: SearchInfo) => {
  let login_info = await GetLoginInfo();
  if (login_info) {
    let add_friend: AddFriend = {
      user: login_info,
      friend: user,
    };
    let res: Response<string> = await ApiResponse('friend/add', add_friend);
    console.log(res);
    return res.status;
  }
  console.log('not found login info');
  return false;
};
