"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
// These three hooks often work together because:
// pathname keeps base path
// searchParams handles query parameters
// router combines both for navigation

function Filter() {
  const searchParams = useSearchParams(); // !!!
  // const searchParams = useSearchParams();
  // Returns a URLSearchParams-like object
  // Example: if URL is /home?search=test, can use searchParams.get('search') to get "test"

  const router = useRouter(); // !!!
  //   Main tool for client-side navigation
  // Provides navigation methods:

  // push: adds new route to history
  // replace: replaces current route (no history)
  // back: go to previous page
  // forward: go to next page

  // Can handle navigation options (like scroll)
  const pathname = usePathname(); // !!!
  // Gets path portion of current URL
  // Excludes query params and hash
  // Example: if URL is /products/123?sort=asc, returns /products/123

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        2&mdash;3 guests
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
