import { getAddressesForFid } from "frames.js";
import { actionMetadata } from "../../const";
import { calculateTotalNetWorth, formatUsdDisplay } from "../../utils";
import { frames } from "../frames";

export const GET = () => {
  return Response.json(actionMetadata);
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
