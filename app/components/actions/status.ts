"use server";

import { apiLink } from "config";
import { General } from "../types/general";

export default async function getStatus() {
  try {
    const res = await fetch(apiLink, {
      next: { revalidate: 10 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch server status");
    }

    const data: General = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching server status:", error);
    return null;
  }
}
