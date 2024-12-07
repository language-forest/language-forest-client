import { getHello } from "@repo/language-forest-api";

export default async function Home() {
  const aa = await getHello();

  return <div>
    <p>{aa}</p>
    <p>{aa}</p>
    <p>{aa}</p>
    <p>{aa}</p>
  </div>;
}
