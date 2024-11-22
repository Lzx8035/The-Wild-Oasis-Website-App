import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Welcome to paradise</h1>
      {/* <a href="/cabins">Explore Luxury Cabins</a> The below is without hard reload*/}
      <Link href="/cabins">Explore Luxury Cabins</Link>
    </div>
  );
}
