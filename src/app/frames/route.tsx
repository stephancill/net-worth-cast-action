/* eslint-disable react/jsx-key */
import { farcasterHubContext } from "frames.js/middleware";
import { Button } from "frames.js/next";
import { installActionUrl } from "../const";
import { calculateTotalNetWorth, formatUsdDisplay } from "../utils";
import { frames } from "./frames";
import { FramesMiddleware, FramesMiddlewareReturnType } from "frames.js/types";
import { getAddressesForFid } from "frames.js";

export const GET = frames(async (ctx) => {
  const currentUrl = new URL(ctx.url.toString());
  currentUrl.pathname = "/frames";

  return {
    image: (
      <div tw="flex flex-col">
        <div tw="text-4xl text-[48px] flex">Portfolio Action</div>
        <div tw="text-2xl text-[32px] mt-10 flex">
          Check the total value of a user's connected wallets.
        </div>
      </div>
    ),
    buttons: [
      <Button action="post" target={"/balance"}>
        Get My Balance
      </Button>,
      <Button action="link" target={installActionUrl}>
        Install
      </Button>,
    ],
  };
});

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
