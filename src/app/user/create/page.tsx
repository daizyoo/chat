'use client'

import { CheckLogin, CreateUser } from "@/lib/user";
import { Button, Input, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const home = () => router.push('/');

  useEffect(() => {
    (async () => {
      if (!await CheckLogin()) home(); // もしログイン済ならhomeに戻る
    })();
  }, []);

  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={{ margin: '30px' }}>
      <p>name</p>
      <Input type="text" onChange={e => setName(e.target.value)} />
      <p>id</p>
      <Input type="text" onChange={e => setId(e.target.value)} />
      <p>password</p>
      <Input type="text" onChange={e => setPassword(e.target.value)} />
      <div style={{ marginLeft: '49px', marginTop: '6px' }}>
        <Button type="button" onClick={async () => {
          if (!await CreateUser({ name, id, password })) home();
        }}>Create</Button>
      </div>
      <Link href={'/login'}>Login</Link>
    </div>
  );
}
