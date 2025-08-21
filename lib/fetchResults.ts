import { Result } from "@/typings";
import { SearchParams } from "@/app/search/page";

export async function fetchResults(searchParams: SearchParams) {
  const username = process.env.OXYLABS_USERNAME!;
  const password = process.env.OXYLABS_PASSWORD!;

  // Convert to URL instance
  const url = new URL(searchParams.url);

  // Append query params
  Object.keys(searchParams).forEach((key) => {
    if (key === "url") return;
    const value = searchParams[key as keyof SearchParams];
    if (typeof value === "string") {
      url.searchParams.append(key, value);
    }
  });

  console.log("scraping url>>>", url.href);

  const body = {
    source: "universal",
    url: url.href,
    parse: true,
    render: "html",
    parsing_instructions: {
      listings: {
        _fns: [
          {
            _fn: "xpath",
            _args: ["//div[@data-testid='property-card-container']"],
          },
        ],
        _items: {
          title: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [".//div[@data-testid='title']/text()"],
              },
            ],
          },
          description: {
            _fns: [{ _fn: "xpath_one", _args: [".//h4/text()"] }],
          },
          price: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [".//span[contains(@class,'f6431b446c')]/text()"],
              },
            ],
          },
          link: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [".//a[contains(@class,'a78ca197d0')]/@href"],
              },
            ],
          },
          rating_word: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [".//div[contains(@class,'a3b8729ab1')]/text()"],
              },
            ],
          },
          rating_count: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [".//div[contains(@class,'d935416c47')]/text()"],
              },
            ],
          },
        },
      },
      total_listings: {
        _fns: [
          {
            _fn: "xpath_one",
            _args: ["//h1[contains(text(),'properties found')]/text()"], // ✅ updated selector
          },
        ],
      },
    },
  };

  try {
    const response = await fetch("https://realtime.oxylabs.io/v1/queries", {
      method: "POST",
      body: JSON.stringify(body),
      next: { revalidate: 60 * 60 },
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
      },
    });

    const data = await response.json();

    if (!data.results?.length) return null;

    const result: Result = data.results[0];
    return result;
  } catch (err) {
    console.error("Fetch error", err);
    return null;
  }
}
