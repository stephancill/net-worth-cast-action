import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";
import { APP_URL } from "./env";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Net Worth Action",
    description: "Calculates the net worth of a user's connected addresses.",
    other: {
      ...(await fetchMetadata(new URL("/frames", APP_URL))),
    },
  };
}

export default async function Home() {
  return <div>Net Worth Action</div>;
}
