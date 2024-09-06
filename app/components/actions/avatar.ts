"use server";

import { apiKey } from "config";

type CachedPlayer = {
  avatar: string;
  timestamp: number;
};

const avatarCache: Record<string, CachedPlayer> = {};
const CACHE_EXPIRATION = 60 * 60 * 1000;

export default async function fetchSteamAvatar(steamid: string) {
  if (!steamid || typeof steamid !== "string") {
    throw new Error("Steam ID is required");
  }

  const cachedData = avatarCache[steamid];
  const now = Date.now();

  if (cachedData && now - cachedData.timestamp < CACHE_EXPIRATION) {
    return { avatar: cachedData.avatar };
  }

  const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamid}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch Steam data");
    }

    const data = await response.json();
    const avatar = data.response.players[0]?.avatarfull || null;

    if (avatar) {
      avatarCache[steamid] = {
        avatar,
        timestamp: now,
      };
    }

    return { avatar };
  } catch (error) {
    console.error("Error fetching Steam data:", error);
    throw new Error("Failed to fetch data");
  }
}
