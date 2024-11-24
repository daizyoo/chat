'use server'

import { cookies } from "next/headers";
import { LoginInfo, UserInfo } from "./user";
import { ApiResponse, Response } from "./api";

export type Room = {
  id: number,
  members: [UserInfo]
};

export type CreateRoomInfo = {
  user: LoginInfo,
  members: [string]
};

export async function GetRooms() {
  const cookie = await cookies();
  const id = cookie.get('user_id')?.value;
  const password = cookie.get('password')?.value;

  if (id && password) {
    let user: LoginInfo = { id: id, password: password };
    console.log(user);
    let res: Response<[Room] | string> = await ApiResponse('room/get', user);
    return res;
  }
}

export async function CreateRoom(members: [string]) {
  const cookie = await cookies();
  const id = cookie.get('user_id')?.value;
  const password = cookie.get('password')?.value;

  if (id && password) {
    let user: LoginInfo = { id: id, password: password };
    let create_room: CreateRoomInfo = { user: user, members: members };
    console.log(create_room);
    let res: Response<string> = await ApiResponse('room/create', create_room);
    return res;
  }
}
