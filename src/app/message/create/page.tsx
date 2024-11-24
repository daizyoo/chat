'use client'

import { CreateRoom } from "@/lib/room";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Create() {
  const router = useRouter();
  const home = () => router.push('/');
  const [member, setMember] = useState('');

  return (
    <div>
      <p>input member</p>
      <div style={{ display: 'flex', margin: '30px' }}>
        <Input type="text" onChange={e => setMember(e.target.value)}></Input>
        <Button color="primary" onClick={async () => {
          await CreateRoom([member])
            .then(res => {
              console.log(res?.data);
              if (res?.status) home();
            });
        }}>Create</Button>
      </div>
    </div>
  );
}
