
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface Quote {
  id: string;
  name: string;
  phone: string;
  email: string;
  businessType: string;
  services: string[];
  comments: string;
  orderNumber: string;
  submittedAt: string;
}

const Admin = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  // Mock quotes data - in a real app, this would come from a database
  const [quotes] = useState<Quote[]>([
    {
      id: "1",
      name: "John Smith",
      phone: "(555) 123-4567",
      email: "john@example.com",
      businessType: "LLC",
      services: ["DOT Number", "MC Number", "EIN Registration"],
      comments: "Need to get started as soon as possible",
      orderNumber: "ORD123456",
      submittedAt: "2024-01-15 10:30 AM"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      phone: "(555) 987-6543",
      email: "sarah@trucking.com",
      businessType: "Corporation",
      services: ["BOC-3", "UCR", "Broker Authority"],
      comments: "Looking to expand our operations",
      orderNumber: "ORD789012",
      submittedAt: "2024-01-14 2:15 PM"
    }
  ]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('https://carrier-api-s6c9.onrender.com/admin/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login response:', data);
        
        if (data.token) {
          setAuthToken(data.token);
          localStorage.setItem('adminToken', data.token);
          setIsLoggedIn(true);
          toast({
            title: "Login Successful",
            description: "Welcome to the admin panel",
          });
        } else {
          throw new Error('No token received');
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid credentials or server error",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthToken(null);
    localStorage.removeItem('adminToken');
    setLoginData({ username: "", password: "" });
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  // Check for existing token on component mount
  useState(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      setAuthToken(savedToken);
      setIsLoggedIn(true);
    }
  });

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
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Login"}
              </Button>
            </form>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>API credentials:</p>
              <p>Username: admin</p>
              <p>Password: admin!@</p>
            </div>
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
            <span className="text-sm text-gray-600">Token: {authToken?.substring(0, 20)}...</span>
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
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order #</TableHead>
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
                      <TableCell className="font-medium">{quote.orderNumber}</TableCell>
                      <TableCell>{quote.name}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div>{quote.phone}</div>
                          <div className="text-sm text-gray-600">{quote.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{quote.businessType}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {quote.services.map((service, index) => (
                            <Badge key={index} variant="secondary" className="text-xs mr-1">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate" title={quote.comments}>
                          {quote.comments || "No comments"}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {quote.submittedAt}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {quotes.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No quote requests found.
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Admin;
