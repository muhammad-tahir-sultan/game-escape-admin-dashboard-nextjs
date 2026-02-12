import { getGames } from '@/app/actions/games';
import GamesList from '@/components/games/GamesList';

export default async function GamesPage() {
    const result = await getGames();
    const games = result.games || [];

    return <GamesList initialGames={games} />;
}
