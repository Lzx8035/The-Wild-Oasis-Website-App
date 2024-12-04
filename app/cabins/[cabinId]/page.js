import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

// not ideal
// export const metadata = {
//   title: "Cabin",
// };
// 👇
// Convention
export async function generateMetadata({ params }) {
  // FIXED with DOC
  const { cabinId } = await params;
  const { name } = await getCabin(cabinId);
  return { title: `Cabin ${name}` };
}

// !!!
// Pre-generates all cabin detail pages at build time (during npm run build)
export async function generateStaticParams() {
  // 1. Fetch all cabins data
  const cabins = await getCabins();
  // 2. Transform each cabin id into route parameters format
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
  // 3. Return all possible route parameters
  return ids;
}

//// Benefits:
// Better SEO - all pages are pre-rendered
// Faster page loads - no server-side rendering wait time
// Reduced server load - pages are already generated

//// Ideal for:
// Product detail pages
// Blog posts
// Documentation pages
// Any static content pages based on ID or slug

export default async function Page({ params }) {
  // FIXED with DOC
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
