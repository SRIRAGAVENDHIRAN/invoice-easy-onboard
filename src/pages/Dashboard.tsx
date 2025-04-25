
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { ArrowUpRight, FileInvoice, Plus, User, Users } from "lucide-react";
import { Link } from "react-router-dom";

const data = [
  { name: 'Jan', amount: 4000 },
  { name: 'Feb', amount: 3000 },
  { name: 'Mar', amount: 2000 },
  { name: 'Apr', amount: 2780 },
  { name: 'May', amount: 1890 },
  { name: 'Jun', amount: 2390 },
];

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-500">Welcome back to your dashboard</p>
          </div>
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <Button asChild>
              <Link to="/invoices/create">
                <FileInvoice className="mr-2 h-4 w-4" />
                New Invoice
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/clients/create">
                <User className="mr-2 h-4 w-4" />
                Add Client
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white shadow-sm animate-slide-in">
            <CardHeader className="pb-2">
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle className="text-2xl">$24,780.00</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm flex items-center text-green-500">
                <ArrowUpRight className="mr-1 h-4 w-4" /> 
                <span>12% from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm animate-slide-in [animation-delay:100ms]">
            <CardHeader className="pb-2">
              <CardDescription>Outstanding Invoices</CardDescription>
              <CardTitle className="text-2xl">$5,230.00</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-amber-500">8 invoices pending</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm animate-slide-in [animation-delay:200ms]">
            <CardHeader className="pb-2">
              <CardDescription>Total Clients</CardDescription>
              <CardTitle className="text-2xl">24</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-primary">3 new this month</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-1 lg:col-span-2 bg-white shadow-sm">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Monthly revenue for current year</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${value}`, 'Revenue']}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Bar dataKey="amount" fill="#7E69AB" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Recent Clients</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/clients">View all</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Apple Inc.', 'Google LLC', 'Microsoft Corporation'].map((client, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                        {client.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{client}</div>
                        <div className="text-xs text-gray-500">Added {3 - i} days ago</div>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" asChild>
                      <Link to={`/clients/${i}`}>View</Link>
                    </Button>
                  </div>
                ))}
                
                <Button asChild variant="outline" className="w-full">
                  <Link to="/clients/create" className="flex items-center justify-center">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Client
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
