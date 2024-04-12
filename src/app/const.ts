import { APP_URL } from "./env";
import { constructCastActionUrl } from "./utils";

export const installActionUrl = constructCastActionUrl({
  actionUrl: `${APP_URL}/frames/action`,
});
