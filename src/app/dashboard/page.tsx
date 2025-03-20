import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="px-4 lg:px-6 h-14 flex items-center">
                <Link className="flex items-center justify-center" href="/">
                    <span className="font-bold">SaaS Template</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Link
                        className="text-sm font-medium hover:underline underline-offset-4"
                        href="/dashboard"
                    >
                        Dashboard
                    </Link>
                    <Link
                        className="text-sm font-medium hover:underline underline-offset-4"
                        href="/settings"
                    >
                        Settings
                    </Link>
                    <Button variant="ghost" size="sm">
                        Logout
                    </Button>
                </nav>
            </header>
            <main className="flex-1 p-4 md:p-6">
                <div className="container mx-auto">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold">Dashboard</h1>
                            <Button>New Project</Button>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Total Projects</CardTitle>
                                    <CardDescription>Your active projects</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">12</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Active Users</CardTitle>
                                    <CardDescription>Users in your projects</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">48</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Storage Used</CardTitle>
                                    <CardDescription>Total storage consumption</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">2.4 GB</div>
                                </CardContent>
                            </Card>
                        </div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>Your latest actions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-2 w-2 rounded-full bg-green-500" />
                                        <div>
                                            <p className="text-sm font-medium">New project created</p>
                                            <p className="text-sm text-gray-500">2 hours ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                                        <div>
                                            <p className="text-sm font-medium">User added to project</p>
                                            <p className="text-sm text-gray-500">4 hours ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="h-2 w-2 rounded-full bg-yellow-500" />
                                        <div>
                                            <p className="text-sm font-medium">Project updated</p>
                                            <p className="text-sm text-gray-500">6 hours ago</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    © 2024 SaaS Template. All rights reserved.
                </p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link
                        className="text-xs hover:underline underline-offset-4"
                        href="/terms"
                    >
                        Terms of Service
                    </Link>
                    <Link
                        className="text-xs hover:underline underline-offset-4"
                        href="/privacy"
                    >
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    );
} 