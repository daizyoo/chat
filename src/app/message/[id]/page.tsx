'use server'

import { ChatPage } from "@/components/message_page";
import { Params } from "@/types/app";
import { GetUserId } from "@/lib/user";

export default async function Page({ params }: Params<{ id: number }>) {
  const id = (await params).id;
  const user_id = await GetUserId();
  if (user_id == undefined) return (<div><p>not get user_id</p></div>);

  return (
    <div style={{ marginLeft: '50px', marginRight: '50px' }}>
      <ChatPage room_id={id} user_id={user_id} />
    </ div>
  );
}
