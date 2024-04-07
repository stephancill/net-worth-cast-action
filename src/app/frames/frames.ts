import { createFrames } from "frames.js/next";
import { APP_URL } from "../env";

export const frames = createFrames({
  baseUrl: `${APP_URL}/frames`,
});
