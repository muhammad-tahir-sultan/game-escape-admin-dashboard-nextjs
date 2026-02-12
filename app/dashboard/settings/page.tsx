import Card from '@/components/ui/Card';
import { Settings as SettingsIcon } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gradient mb-2">Settings</h1>
                <p className="text-muted-foreground">Configure your dashboard preferences</p>
            </div>

            <Card className="text-center py-12">
                <SettingsIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                <p className="text-muted-foreground">Settings panel will be available soon.</p>
            </Card>
        </div>
    );
}
