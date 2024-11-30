'use server'

import { ApiResponse, Response } from "@/lib/api";
import { MESSAGE_GET, MESSAGE_SEND } from "@/types/url";
import { CheckSpace } from "@/types/app";
import { GetLoginInfo, LoginInfo, UserInfo } from "./user";

export type Message = {
  text: string,
  user: UserInfo,
};

export async function GetMessageApi({ room_id }: { room_id: number }): Promise<Response<Message[] | string>> {
  const login_info = await GetLoginInfo();

  if (login_info) {
    let res: Response<Message[] | string> = await ApiResponse(MESSAGE_GET, {
      room_id: room_id,
      user: login_info,
    });
    return res;
  } else {
    return { data: "not found id and password", status: false };
  }
}

type MessageInfo = {
  room: number,
  text: string,
  user: LoginInfo,
};

export async function SendMessage({ room_id, text }: { room_id: number, text: string }) {
  if (!CheckSpace(text)) {
    const login_info = await GetLoginInfo();
    if (login_info) {
      let message_info: MessageInfo = {
        room: Number(room_id),
        text: text,
        user: {
          id: login_info.id,
          password: login_info.password
        }
      };

      let res: Response<string> = await ApiResponse(MESSAGE_SEND, message_info);

      return res.data;
    } else {
      return 'not get login_info'
    }
  } else {
    return 'text is space';
  }
}
