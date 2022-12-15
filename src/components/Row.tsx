import React from 'react';
import { Player } from '../lib/player'
import { getRank } from '../lib/ranks'

interface Props {
  rank: number,
  player: Player
}

export function Row({ rank, player }: Props) {

  const codeToUrlSlug = (code: string) => {
    const parts = code.split('#')
    return `https://slippi.gg/user/${parts[0].toLowerCase()}-${parts[1]}`
  }

  const playerRank = getRank(player)
  const isActive = playerRank.name !== 'None';

  const onProfileClick = () => {
    window.open(codeToUrlSlug(player.connectCode.code), '_blank', 'noreferrer');
  }
  return (
    <tr className={`${playerRank.bgClass} border-separate border-spacing-2 border-b-2 border-gray-600 hover:bg-indigo-900`}
      onClick={onProfileClick}>
      <td className="md:text-2xl text-gray-300 md:px-6 md:py-4 p-1 whitespace-nowrap">
        {isActive && `#${rank}`}
      </td>
      <td className="text-gray-100 md:px-6 md:py-4 p-1 whitespace-nowrap text-center overflow-hidden md:max-w-full max-w-[7rem] text-elipses">
        <div className="md:text-xl text-sm max-w-xs text-gray-300">{player.displayName}</div>
        <div className="text-gray-300 text-xs">{player.connectCode.code}</div>
      </td>
      <td className="md:text-xl text-sm text-gray-900 md:px-6 md:py-4 p-1 whitespace-nowrap text-center">

        {playerRank.iconUrl && <div className="flex items-center justify-center">
          <img className="h-10 w-10" src={playerRank.iconUrl} />
        </div>}
        <div className="md:text-lg text-sm max-w-xs text-gray-300 uppercase">
          {playerRank.name}
        </div>
        <div className="text-gray-300 md:text-sm">
          {isActive && Math.floor(player.rankedNetplayProfile.ratingOrdinal)}
        </div>
      </td>
      <td className="md:text-sm text-xs md:max-w-full max-w-[5rem] text-gray-300 md:px-6 md:py-4 p-1">
        {player.rankedNetplayProfile.characters.map((c) => c.character.replace('_', ' ')).join(', ')}
      </td>
      <td className="md:text-xl text-gray-300 text-sm md:px-6 md:py-4 p-1 whitespace-nowrap">
        {(player.rankedNetplayProfile.wins || player.rankedNetplayProfile.losses) && <><span className="text-green-500">{player.rankedNetplayProfile.wins ?? 0}</span><span className="md:p-1">/</span>
        <span className="text-red-500">{player.rankedNetplayProfile.losses ?? 0}</span>
      </>}
      </td>
    </tr>
  );
}
