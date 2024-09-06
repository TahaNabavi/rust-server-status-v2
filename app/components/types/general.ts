export type Player = {
  SteamID: string;
  Name: string;
  VIP: boolean;
  Prem: boolean;
  Admin: boolean;
  Ping: number;
  Avatar: string | undefined;
};
export type General = {
  ServerName: string;
  MaxPlayers: number;
  CurrentPlayers: number;
  Players: Player[];
};
