import { getGames } from '@/app/actions/games';
import DashboardContent from './DashboardContent';

export default async function DashboardPage() {
    const gamesResult = await getGames();
    const games = gamesResult.games || [];

    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const stats = {
        totalGames: games.length,
        activeGames: games.filter((g: any) => g.isActive).length,
        totalValue: games.reduce((sum: number, g: any) => sum + g.price, 0),
        difficultyRate: games.length > 0
            ? Math.round(games.filter((g: any) => g.difficulty === 'Hard' || g.difficulty === 'Expert').length / games.length * 100)
            : 0,
        recentGames: games.slice(0, 3),
        distribution: {
            Easy: games.length > 0 ? Math.round((games.filter((g: any) => g.difficulty === 'Easy').length / games.length) * 100) : 0,
            Medium: games.length > 0 ? Math.round((games.filter((g: any) => g.difficulty === 'Medium').length / games.length) * 100) : 0,
            Hard: games.length > 0 ? Math.round((games.filter((g: any) => g.difficulty === 'Hard' || g.difficulty === 'Expert').length / games.length) * 100) : 0,
        },
        activePercentage: games.length > 0 ? Math.round((games.filter((g: any) => g.isActive).length / games.length) * 100) : 0,
        newGamesCount: games.filter((g: any) => new Date(g.createdAt) >= sevenDaysAgo).length,
        avgPrice: games.length > 0 ? (games.reduce((sum: number, g: any) => sum + g.price, 0) / games.length).toFixed(2) : 0,
    };

    return <DashboardContent stats={stats} />;
}
