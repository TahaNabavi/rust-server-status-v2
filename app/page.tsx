"use client";
import { useEffect, useState } from "react";
import { General, Player } from "./components/types/general";
import getStatus from "./components/actions/status";
import fetchSteamAvatar from "./components/actions/avatar";
import { Lens } from "./components/ui/lens";
import { mapLink } from "config";

function PlayerCard({ data }: { data: Player }) {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const res = await fetchSteamAvatar(data.SteamID);
        setAvatar(res.avatar);
      } catch (err) {
        console.error("Error fetching avatar:", err);
      }
    };

    fetchAvatar();

    setIsVisible(true);

    return () => {
      setIsVisible(false);
    };
  }, [data.SteamID]);

  return (
    <div
      className={`bg-gray-700 transition-all py-3 px-2 rounded-lg flex items-center space-x-4 w-full md:w-2/4 lg:w-2/6 border-4 border-white border-opacity-10 relative
      ${
        isVisible
          ? " player-enter player-enter-active "
          : " player-exit player-exit-active "
      }
      ${data.Admin && " border-green-600 admin "}`}
    >
      {avatar && <img className="w-16 h-16 rounded-full" src={avatar} alt="" />}
      <div className="w-full text-hidden">
        <div className="flex items-center justify-center mb-2 w-full">
          <a
            href={`https://steamcommunity.com/profiles/${data.SteamID}`}
            target="_blank"
            rel="noreferrer"
            className="text-2xl text-white me-2 text-hidden"
          >
            {data.Name}
          </a>
          <div className="flex space-x-2 mt-1 mb-1">
            {data.Admin ? (
              <span className="text-green-600 py-2 px-3 bg-green-950 border-2 rounded-md border-green-800 text-xs uppercase f-2">
                Admin
              </span>
            ) : (
              <>
                {data.VIP && (
                  <span className="text-yellow-500 py-2 px-3 bg-yellow-500 bg-opacity-10 border-2 rounded-md border-yellow-300 text-xs uppercase f-2">
                    VIP
                  </span>
                )}
                {data.Prem && (
                  <span className="text-purple-300 py-2 px-3 bg-purple-500 bg-opacity-10 border-2 rounded-md border-purple-300 text-xs uppercase f-2">
                    Premium
                  </span>
                )}
              </>
            )}
          </div>
        </div>
        <div className="text-white f-2">
          <span className="f-1">PING</span>: {data.Ping}
        </div>
      </div>
    </div>
  );
}
function MapImg() {
  const [hovering, setHovering] = useState(false);
  return (
    <Lens hovering={hovering} setHovering={setHovering}>
      <a href={mapLink} target="_blank" rel="noreferrer">
        <img
          src={mapLink}
          alt=""
          className="rounded-lg border-4 border-white border-opacity-10 h-72"
        />
      </a>
    </Lens>
  );
}

export default function Page() {
  const [status, setStatus] = useState<General | null | undefined>();

  useEffect(() => {
    const FS = async () => {
      const fetchStatus = await getStatus();
      if (fetchStatus) setStatus(fetchStatus);
      else setStatus(null);
    };
    const i = setInterval(() => {
      FS();
    }, 10000);
    return () => clearInterval(i);
  }, []);

  return status ? (
    <div className="min-h-screen flex flex-col items-center bg-gray-800 pt-3">
      <div
        className="rounded-[20px_100px_20px_100px] overflow-hidden mx-2 mt-4"
        style={{
          backgroundImage: `url(./bg1.jpg)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          outline: "4px solid black",
          outlineOffset: "4px",
        }}
      >
        <div className="bg-black bg-opacity-50 p-3 w-full h-full flex items-center justify-center relative flex-col lg:flex-row">
          <div className="flex items-center justify-center px-4">
            <img src="./logo.png" alt="" className="p2-3 pb-3 h-[100px] ms-4" />
            <div className="relative mb-[50px] me-auto ms-3">
              <p className="text-3xl text-white m-0">{status.ServerName}</p>
              {/* <div className="absolute text-2xl px-3">
                <a
                  href="https://dark-game.ir/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white text-opacity-60 hover:text-opacity-90 transition-all mx-1"
                >
                  <i className="bi bi-globe"></i>
                </a>
              </div> */}
            </div>
          </div>
          <div className="flex items-center justify-center me-4">
            <div className="relative flex items-center justify-end z-1 p-2 rounded-md backdrop-blur-md bg-white bg-opacity-10 text-3xl">
              <div className="opacity-30 text-white f-2">00</div>
              <span className="f-2 absolute text-white">
                {status.CurrentPlayers}
              </span>
            </div>
            <div className="f-2 mx-1 text-2xl text-white text-opacity-20">
              /
            </div>
            <div className="relative flex items-center justify-end z-1 p-2 rounded-md backdrop-blur-md bg-white bg-opacity-10 text-3xl">
              <div className="opacity-30 text-white f-2">00</div>
              <span className="f-2 absolute text-white">
                {status.MaxPlayers}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-10 w-full">
        {status.Players.map((player, i) => (
          <PlayerCard data={player} key={i} />
        ))}
      </div>
      <div className="my-4">
        <MapImg />
      </div>
    </div>
  ) : status === undefined ? (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-800 text-4xl font-bold f-1 uppercase flex-col">
        Loading
        <div className="loading relative flex items-center justify-center">
          <div className="absolute opacity-20 f-2">.............</div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-800 text-4xl font-bold f-2 uppercase">
        server is offline
      </div>
    </>
  );
}
