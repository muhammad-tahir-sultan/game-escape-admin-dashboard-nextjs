export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gradient mb-4">403</h1>
                <h2 className="text-2xl font-semibold mb-2">Unauthorized</h2>
                <p className="text-muted-foreground mb-6">
                    You don't have permission to access this page.
                </p>
                <a
                    href="/login"
                    className="inline-block px-6 py-3 gradient-primary text-white rounded-lg hover:shadow-lg transition-all"
                >
                    Go to Login
                </a>
            </div>
        </div>
    );
}
