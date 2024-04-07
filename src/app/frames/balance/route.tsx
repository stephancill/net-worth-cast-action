import { farcasterHubContext } from "frames.js/middleware";
import { calculateTotalNetWorth, formatUsdDisplay } from "../../utils";
import { frames } from "../frames";
import { Button } from "frames.js/next";
import { installActionUrl } from "../../const";

export const POST = frames(
  async (ctx) => {
    if (!ctx.message?.castId?.fid) {
      throw new Error("FID not found");
    }

    const result = await calculateTotalNetWorth(
      ctx.message.requesterVerifiedAddresses
    );

    const pctChange = (result.aggregateChange1d / result.totalNetWorth) * 100;

    return {
      image: (
        <div tw="flex flex-col">
          <div tw="text-4xl text-[64px] flex">Total Net Worth</div>
          <div tw="text-2xl text-[52px] mt-10 flex mb-4">
            ${formatUsdDisplay(result.totalNetWorth)} (
            {pctChange > 0 ? "+" : ""}
            {pctChange.toFixed(2)}%)
          </div>
          {ctx.message.requesterVerifiedAddresses.map((address) => (
            <div tw="text-lg flex text-[32px] mt-2 text-gray-500" key={address}>
              {address.slice(0, 6)}...{address.slice(-4)}
            </div>
          ))}
        </div>
      ),
      buttons: [
        <Button action="link" target={installActionUrl}>
          Install
        </Button>,
      ],
    };
  },
  {
    middleware: [farcasterHubContext()],
  }
);
