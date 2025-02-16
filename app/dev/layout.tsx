import Link from "next/link";

export default function DevLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen">
            <aside className="w-64 border-r bg-gray-50/40 p-4">
                <nav className="space-y-6">
                    <div>
                        <h2 className="mb-2 text-lg font-semibold">OpenAI</h2>
                        <ul className="space-y-1">
                            <li>
                                <Link
                                    href="/dev/oai"
                                    className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                                >
                                    Models
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dev/oai/usage"
                                    className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                                >
                                    API Usage
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="mb-2 text-lg font-semibold">Anthropic</h2>
                        <ul className="space-y-1">
                            <li>
                                <Link
                                    href="/dev/anthropic"
                                    className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                                >
                                    Models
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dev/anthropic/usage"
                                    className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                                >
                                    API Usage
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </aside>
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}