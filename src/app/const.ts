import { APP_URL } from "./env";
import { constructCastActionUrl } from "./utils";

export const actionMetadata = {
  action: {
    type: "post",
  },
  icon: "credit-card",
  name: "Check Portfolio",
  aboutUrl: APP_URL!,
  description: "Check the total value of the user's connected wallets.",
};

export const installActionUrl = constructCastActionUrl({
  actionType: "post",
  description: actionMetadata.description,
  name: actionMetadata.name,
  icon: actionMetadata.icon,
  postUrl: `${APP_URL}/frames/action`,
  actionUrl: `${APP_URL}/frames/action`,
});
