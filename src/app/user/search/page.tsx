'use client'

import { AddFriendResponse, SearchResponse } from "@/lib/user";
import { LoginInfo, UserInfo } from "@/lib/user";
import { Button, Input, Link, User } from "@nextui-org/react";
import { useState } from "react";

type FriendStatus = { status: boolean };

export type SearchInfo = UserInfo & FriendStatus;

export default function SearchUser() {
  const [saerch_name, setSearchName] = useState('');
  const [users, setUsers] = useState<Array<SearchInfo>>([]);

  const Search = (name: string) => {
    setSearchName(name);
    (async () => {
      const search_info = await SearchResponse(name);
      if (search_info) setUsers(search_info);
    })();
  };

  return (
    <div style={{ margin: '30px' }}>
      <p style={{ textAlign: 'center', marginBottom: '15px' }}>id or name</p>
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
              {!status && <Button color='primary' onClick={async _ => {
                if (await AddFriendResponse(user)) {
                  Search(saerch_name);
                }
              }}>+</Button>}
            </div>
          );
        })}
      </div>
    </div >
  );
}

export type AddFriend = {
  user: LoginInfo,
  friend: UserInfo
};
