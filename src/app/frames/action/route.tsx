import { APP_URL } from "../../env";
import { calculateTotalNetWorth, formatUsdDisplay } from "../../utils";
import { frames } from "../frames";
import { getAddressesForFid } from "frames.js";

type ActionMetadata = {
  /** The action name. Must be less than 30 characters. */
  name: string;
  /** An [Octicons](https://primer.style/foundations/icons) icon name. */
  icon: string;
  /** A short description up to 80 characters. */
  description: string;
  /** External link to an "about" page for extended description. */
  aboutUrl: string;
  /** The action type. (Same type options as frame buttons). Only post is accepted in V1. */
  action: {
    type: "post";
  };
};

export const GET = () => {
  const metadata: ActionMetadata = {
    action: {
      type: "post",
    },
    icon: "credit-card",
    name: "Check Portfolio",
    aboutUrl: APP_URL!,
    description: "Check the total value of the user's connected wallets.",
  };

  return Response.json(metadata);
};

export const POST = frames(async (ctx) => {
  if (!ctx.message?.castId?.fid) {
    throw new Error("FID not found");
  }

  const verifiedAddresses = (
    await getAddressesForFid({
      fid: ctx.message.castId.fid,
    })
  )
    .filter((address) => address.type === "verified")
    .map((address) => address.address);

  if (!verifiedAddresses.length) {
    return Response.json({
      message: "No verified addresses found",
    });
  }

  const result = await calculateTotalNetWorth(verifiedAddresses);

  const pctChange = (result.aggregateChange1d / result.totalNetWorth) * 100;

  return Response.json({
    message: `$${formatUsdDisplay(result.totalNetWorth)} (${
      pctChange > 0 ? "+" : ""
    }${pctChange.toFixed(2)}%)`,
  });
});
