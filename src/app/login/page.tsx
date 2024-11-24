'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckLogin, Login } from "@/lib/user";
import { Button, Input, Link } from "@nextui-org/react";

export default function Page() {
  const router = useRouter();
  const home = () => router.push('/');

  useEffect(() => {
    (async () => {
      if (!await CheckLogin()) home(); // もしログイン済ならhomeに戻る
    })();
  }, []);

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const LoginButton = () => {
    Login({ id, password }).then(msg => {
      if (msg) window.alert(msg);
      else home();
    });
  }

  return (
    <div style={{ margin: '30px' }}>
      <p id="id">id</p>
      <Input type="text" onChange={e => setId(e.target.value)} />
      <p id="password">password</p>
      <Input type="text" onChange={e => setPassword(e.target.value)} />
      <div style={{ margin: '10px' }}>
        <Button type="button" onClick={LoginButton}>Login</Button>
      </div>
      <Link href={'/user/create'}>Create User</Link>
    </div >
  );
};
