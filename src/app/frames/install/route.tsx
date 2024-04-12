import { Button } from "frames.js/next";
import { installActionUrl } from "../../const";
import { frames } from "../frames";

export const GET = frames(async (ctx) => {
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
        My Portfolio
      </Button>,
      <Button action="link" target={installActionUrl}>
        Install
      </Button>,
    ],
  };
});
