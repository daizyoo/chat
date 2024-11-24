'use client'

import { Params } from "@/types/app";
import { AccountInfo, GetUserInfo } from "@/lib/user";
import { Link, User } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function UserInfo({ params }: Params<{ id: string }>) {
  const [info, setInfo] = useState<AccountInfo>();
  const [id, setId] = useState('');

  useEffect(() => {
    (async () => {
      const id = (await params).id;
      setId(id);
      await GetUserInfo(id)
        .then(res => {
          console.log(res);
          if (typeof res != 'string') setInfo(res)
        });
    })();
  }, []);

  console.log(info);
  if (!info) return (
    <div>
      <p>not found user {id}</p>
    </div>
  );

  return (
    <div style={{ padding: '44px', justifyItems: 'center' }}>
      <User style={{ marginBottom: '24px' }} name={info.name} description={info.id} avatarProps={{ name: info.name }} />
      <p style={{ fontSize: '1.7em' }}>Friends</p>
      <ul>
        {info.friends.map((user, index) => (
          <li key={index}>
            <User
              name={user.name}
              description={(
                <Link href={`/${user.id}`} size="sm">{user.id}</Link>
              )}
              avatarProps={{ name: user.name }}>
            </User>
          </li>
        ))}
      </ul>
    </div>
  );
}