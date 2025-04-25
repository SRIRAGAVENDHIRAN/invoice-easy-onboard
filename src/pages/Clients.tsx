
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Edit, MoreHorizontal, Plus, Search, TrashX, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  invoiceCount: number;
  totalBilled: number;
};

const initialClients: Client[] = [
  {
    id: "1",
    name: "Jane Smith",
    email: "jane@apple.com",
    phone: "(555) 123-4567",
    company: "Apple Inc.",
    invoiceCount: 12,
    totalBilled: 24750.00,
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@google.com",
    phone: "(555) 987-6543",
    company: "Google LLC",
    invoiceCount: 8,
    totalBilled: 16320.00,
  },
  {
    id: "3",
    name: "Sarah Johnson",
    email: "sarah@microsoft.com",
    phone: "(555) 456-7890",
    company: "Microsoft Corporation",
    invoiceCount: 5,
    totalBilled: 9840.00,
  },
  {
    id: "4",
    name: "Michael Brown",
    email: "michael@amazon.com",
    phone: "(555) 321-6547",
    company: "Amazon.com Inc.",
    invoiceCount: 3,
    totalBilled: 5260.00,
  },
];

const Clients = () => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteClientId, setDeleteClientId] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteClient = (id: string) => {
    setClients(clients.filter(client => client.id !== id));
    setDeleteClientId(null);
    
    toast({
      title: "Client deleted",
      description: "The client has been successfully deleted.",
    });
  };

  const confirmDeleteClient = (id: string) => {
    setDeleteClientId(id);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold">Clients</h1>
            <p className="text-gray-500">Manage your client relationships</p>
          </div>
          <Button asChild className="mt-4 sm:mt-0">
            <Link to="/clients/create">
              <Plus className="mr-2 h-4 w-4" />
              Add Client
            </Link>
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search clients..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead className="text-right">Total Invoiced</TableHead>
                  <TableHead className="w-14"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.length > 0 ? (
                  filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>
                        <div className="font-medium">{client.name}</div>
                      </TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.phone}</TableCell>
                      <TableCell>{client.company}</TableCell>
                      <TableCell className="text-right">
                        ${client.totalBilled.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                        <div className="text-xs text-gray-500">{client.invoiceCount} invoices</div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link to={`/clients/${client.id}`} className="flex items-center cursor-pointer">
                                <User className="mr-2 h-4 w-4" />
                                View Profile
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/clients/${client.id}/edit`} className="flex items-center cursor-pointer">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Client
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="flex items-center text-red-500 focus:bg-red-50 focus:text-red-500"
                              onClick={() => confirmDeleteClient(client.id)}
                            >
                              <TrashX className="mr-2 h-4 w-4" />
                              Delete Client
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No clients found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {filteredClients.length > 0 && (
            <div className="p-4 border-t">
              <div className="text-sm text-gray-500">
                Showing {filteredClients.length} of {clients.length} clients
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Client Confirmation Dialog */}
      <AlertDialog open={deleteClientId !== null} onOpenChange={() => setDeleteClientId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the client and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
              onClick={() => deleteClientId && handleDeleteClient(deleteClientId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  );
};

export default Clients;
