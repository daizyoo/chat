'use client'

import { ApiResponse, Response } from "@/lib/api";
import { GetLoginInfo } from "@/lib/message";
import { GetUserId, LoginInfo, UserInfo } from "@/lib/user";
import { CheckSpace } from "@/types/app";
import { Button, Input, Link, User } from "@nextui-org/react";
import { MouseEvent, MouseEventHandler, useState } from "react";

type FriendStatus = { status: boolean };

type SearchInfo = UserInfo & FriendStatus;

export default function SearchUser() {
  const [users, setUsers] = useState<Array<SearchInfo>>([]);

  const Search = (name: string) => {
    (async () => {
      if (CheckSpace(name)) {
        setUsers([]);
        return;
      }
      let user_info: UserInfo = { id: name, name: name };
      let res: Response<Array<SearchInfo>> = await ApiResponse(`user/search?id=${user_info.id}&name=${user_info.name}`, { id: await GetUserId() })
      if (res.data) setUsers(res.data);
    })();
  };

  return (
    <div style={{ margin: '30px' }}>
      <p>id or name</p>
      <Input onChange={e => { Search(e.target.value); }} />
      <div>
        {users.map((user: SearchInfo, index) => {
          const { id, name, status }: SearchInfo = user;
          return (
            <div key={index}>
              <Link href={`/${id}`} style={{ margin: '10px' }}>
                <User name={name} description={id}
                  avatarProps={{ name: name }}>
                </User>
              </Link>
              <Button color={status ? 'default' : 'primary'} onClick={status ? undefined : async _ => {
                let login_info = await GetLoginInfo();
                if (login_info) {
                  let add_friend: AddFriend = {
                    user: login_info,
                    friend: user,
                  };
                  let res = await ApiResponse('friend/add', add_friend);
                  console.log(res);
                }
              }}>+</Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

type AddFriend = {
  user: LoginInfo,
  friend: UserInfo
};
