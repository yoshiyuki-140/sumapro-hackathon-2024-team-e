import Link from "next/link";

export default function Home() {
  const chat_screen = "./chat"
  return (
    <div>
      <Link href={chat_screen}>チャット画面へ</Link>
    </div>
  );
}
