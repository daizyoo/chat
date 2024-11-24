'use client'

import { GetRooms, Room } from "@/lib/room";
import { GetUserId } from "@/lib/user";
import { Link, User } from "@nextui-org/react";
import { Suspense, useEffect, useState } from "react";
import Loading from "./loading";

export default function Home() {
  const [id, setId] = useState<string>();
  const [rooms, setRooms] = useState<Array<Room>>([]);

  useEffect(() => {
    (async () => {
      const id = await GetUserId();
      if (id) {
        setId(id);
        let rooms = await GetRooms();
        if (typeof rooms?.data != 'string' && rooms?.data) setRooms(rooms.data);
        else console.log(rooms?.data)
      }
    })();
  }, []);

  if (!id) return (
    <div>
      <Link href="/login">Login</Link>
    </div>
  );

  return (
    <div>
      <Suspense fallback={<Loading />}></Suspense>
      <div>
        <Link href="user/search">Search User</Link>
      </div>
      <div>
        <Link href={`/${id}`}>my page</Link>
      </div>
      <div>
        {rooms.map((room, index) => (
          <div key={index}>
            <div style={{ display: 'flex' }}>
              {room.members.map((user, i) => (
                <Link key={i} href={`/message/${room.id}`}>
                  <User name={user.name} description={user.id}
                    avatarProps={{ name: user.name }}>
                  </User>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Link href={'/message/create'}>create room</Link>
    </div >
  );
}
