import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAdminLoginMutation, useGetQuotesQuery } from "@/store/api";

const Admin = () => {
    const { toast } = useToast();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });

    const [adminLogin, { isLoading: isLoggingIn }] = useAdminLoginMutation();
    const [page, setPage] = useState(0);
    const pageSize = 20;

    const {
        data: quotesData,
        isLoading: isLoadingQuotes,
        isFetching: isFetchingQuotes,
        refetch,
    } = useGetQuotesQuery({ page, size: pageSize }, { skip: !isLoggedIn });

    const quotes = quotesData?.items ?? [];
    const totalPages = quotesData?.totalPages ?? 0;

    // Check for existing token on component mount
    useEffect(() => {
        const savedToken = localStorage.getItem('adminToken');
        if (savedToken) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result = await adminLogin(loginData).unwrap();

            localStorage.setItem('adminToken', result);
            setIsLoggedIn(true);
            toast({
                title: "Login Successful",
                description: "Welcome to the admin panel",
            });
        } catch (error) {
            console.error('Login error:', error);
            toast({
                title: "Login Failed",
                description: error?.data?.message || "Invalid credentials or server error",
                variant: "destructive"
            });
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('adminToken');
        setLoginData({ username: "", password: "" });
        toast({
            title: "Logged Out",
            description: "You have been successfully logged out",
        });
    };

    const handleNextPage = () => {
        setPage(prev => (prev + 1 < totalPages ? prev + 1 : prev));
    };

    const handlePrevPage = () => {
        setPage(prev => (prev > 0 ? prev - 1 : 0));
    };

    // refetch when page changes
    useEffect(() => {
        if (isLoggedIn) {
            refetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    value={loginData.username}
                                    onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                                    required
                                    className="mt-2"
                                    placeholder="Enter username"
                                />
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={loginData.password}
                                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                                    required
                                    className="mt-2"
                                    placeholder="Enter password"
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoggingIn}>
                                {isLoggingIn ? "Signing in..." : "Login"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
                    <div className="flex items-center gap-4">
                        <Button onClick={() => refetch()} variant="outline" disabled={isFetchingQuotes}>
                            {isFetchingQuotes ? "Refreshing..." : "Refresh Quotes"}
                        </Button>
                        <Button onClick={handleLogout} variant="outline">
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Quote Requests</CardTitle>
                        <p className="text-gray-600">Manage and review submitted quote requests</p>
                    </CardHeader>
                    <CardContent>
                        {isLoadingQuotes || isFetchingQuotes ? (
                            <div className="text-center py-8">Loading quotes...</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Contact</TableHead>
                                            <TableHead>Business Type</TableHead>
                                            <TableHead>Services</TableHead>
                                            <TableHead>Comments</TableHead>
                                            <TableHead>Submitted</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {quotes.map((quote) => (
                                            <TableRow key={quote.id}>
                                                <TableCell className="font-medium">{quote.id}</TableCell>
                                                <TableCell>{quote.name}</TableCell>
                                                <TableCell>
                                                    <div className="space-y-1">
                                                        <div>{quote.phoneNumber}</div>
                                                        <div className="text-sm text-gray-600">{quote.email}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {quote.businessType && <Badge variant="outline">{quote.businessType}</Badge>}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="space-y-1">
                                                        {quote.servicesNeeded.map((service, index) => (
                                                            <Badge key={index} variant="secondary" className="text-xs mr-1">
                                                                {service}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="max-w-xs truncate" title={quote.comment}>
                                                        {quote.comment || "No comments"}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-sm text-gray-600">
                                                    {new Date(quote.createdAt).toLocaleString()}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}

                        {quotes.length === 0 && !isLoadingQuotes && !isFetchingQuotes && (
                            <div className="text-center py-8 text-gray-500">
                                No quote requests found.
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination Controls */}
                {isLoggedIn && (
                    <div className="flex justify-between items-center mt-4">
                        <Button variant="outline" onClick={handlePrevPage} disabled={page === 0 || isLoadingQuotes || isFetchingQuotes}>
                            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                        </Button>
                        <span className="text-sm text-gray-600">Page {page + 1}</span>
                        <Button variant="outline" onClick={handleNextPage} disabled={isLoadingQuotes || isFetchingQuotes || page + 1 >= totalPages}>
                            Next <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Admin;
