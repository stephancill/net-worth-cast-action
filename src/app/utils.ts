import { ZERION_API_KEY } from "./env";

export function constructCastActionUrl({
  actionUrl,
}: {
  actionUrl: string;
}): string {
  // Construct the URL
  const baseUrl = "https://warpcast.com/~/add-cast-action";
  const urlParams = new URLSearchParams({
    url: actionUrl,
  });

  return `${baseUrl}?${urlParams.toString()}`;
}

export function numberWithCommas(x: string | number) {
  var parts = x.toString().split(".")!;
  parts[0] = parts[0]!.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export function formatUsdDisplay(usd: number | string) {
  const usdNumber = typeof usd === "string" ? parseFloat(usd) : usd;

  return numberWithCommas(usdNumber.toFixed(2));
}

type PortfolioResponse = {
  data: {
    attributes: {
      total: {
        positions: number;
      };
      changes: {
        absolute_1d: number;
      };
    };
  };
};

export async function calculateTotalNetWorth(
  walletAddresses: string[]
): Promise<{
  totalNetWorth: number;
  aggregateChange1d: number;
  cached?: boolean;
}> {
  let totalNetWorth = 0;
  let aggregateChange1d = 0;

  // Map each wallet address to a fetch promise
  const fetchPromises = walletAddresses.map((address) =>
    fetch(
      `https://api.zerion.io/v1/wallets/${address}/portfolio?currency=usd`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization: `Basic ${ZERION_API_KEY}`,
        },
      }
    )
      .then(async (response) => {
        const json = await response.json();
        // console.log(json);
        return json;
      })
      .then((data: PortfolioResponse) => {
        const { total, changes } = data.data.attributes;
        totalNetWorth += total.positions;
        aggregateChange1d += changes.absolute_1d;
      })
      .catch((error) =>
        console.error(`Failed to fetch data for address ${address}:`, error)
      )
  );

  // Wait for all fetch promises to resolve
  await Promise.all(fetchPromises);

  return { totalNetWorth, aggregateChange1d };
}
