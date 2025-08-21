import { fetchResults } from "@/lib/fetchResults";
import { notFound } from "next/navigation";
import { URL } from "url";

type Props = {
  searchParams: SearchParams;
};

export type SearchParams = {
  url?: URL;
  // location: string;
  group_adults?: string;
  group_children?: string;
  no_rooms?: string;
  checkin?: string;
  checkout?: string;
};
export default async function SearchPage({ searchParams }: Props) {
  if (!searchParams.url) return notFound();

  const results = await fetchResults(searchParams);

  if (!results) return <div>No results...</div>;

  return (
    <section>
      <div className="mx-auto max-w-7xl p-6 lg:px-8">
        <h1 className="text-4xl font-bold pb-3">Your Trip Results</h1>

        <h2 className="pb-3">
          Dates of trip:
          <span className="italic ml-2">
            {searchParams.checkin} to {searchParams.checkout}
          </span>
        </h2>

        <hr className="mb-5" />

        <h1 className="font-semibold text-xl">
          {results.content.total_listings}
        </h1>

        {/* <div className="space-y-2 mt-5">
          {results.content.listings.map((item, i) => (
            <div key={i}>
              <img
                src={item.url ?? "/placeholder.png"}
                alt={item.title ?? "image of property"}
                className="h-44 w-44 rounded-lg"
              />
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}
