import { APP_URL } from "./env";
import { constructCastActionUrl } from "./utils";

export const installActionUrl = constructCastActionUrl({
  actionType: "post",
  icon: "credit-card",
  name: "Check Portfolio",
  postUrl: `${APP_URL}/frames`,
  description: "Check the total value of the user's connected wallets.",
});
