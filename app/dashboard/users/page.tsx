import Card from '@/components/ui/Card';
import { Users as UsersIcon } from 'lucide-react';

export default function UsersPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gradient mb-2">Users Management</h1>
                <p className="text-muted-foreground">Manage your platform users</p>
            </div>

            <Card className="text-center py-12">
                <UsersIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                <p className="text-muted-foreground">User management features will be available soon.</p>
            </Card>
        </div>
    );
}
