import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";
import { APP_URL } from "./env";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Portfolio Worth Action",
    description:
      "Calculates the total portfolio worth of a user's connected addresses.",
    other: {
      ...(await fetchMetadata(new URL("/frames/install", APP_URL))),
    },
  };
}

export default async function Home() {
  return (
    <div>
      Portfolio Action - Calculates the total portfolio worth of a user's
      connected addresses.{" "}
    </div>
  );
}
