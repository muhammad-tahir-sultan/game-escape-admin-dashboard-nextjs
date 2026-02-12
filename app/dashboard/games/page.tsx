import { getGames } from '@/app/actions/games';
import GamesList from '@/components/games/GamesList';

export default async function GamesPage() {
    const result = await getGames();

    // Ensure we have a valid structure for initialData
    const initialData = {
        games: result.games || [],
        pagination: result.pagination || { total: 0, page: 1, limit: 6, totalPages: 0 }
    };

    return <GamesList initialData={initialData} />;
}
