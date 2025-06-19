
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Send, StopCircle, Play } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const CustomersView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');

  const customers = [
    {
      id: 1,
      email: 'john@example.com',
      name: 'John Smith',
      plan: 'Premium',
      status: 'active',
      subscriptionDate: '2024-01-15',
      subscriptionDays: 158,
      nextPayment: '2024-07-15',
      paymentStatus: 'automated',
    },
    {
      id: 2,
      email: 'sarah@company.com',
      name: 'Sarah Johnson',
      plan: 'Basic',
      status: 'active',
      subscriptionDate: '2024-03-20',
      subscriptionDays: 94,
      nextPayment: '2024-07-20',
      paymentStatus: 'manual',
    },
    {
      id: 3,
      email: 'mike@startup.io',
      name: 'Mike Wilson',
      plan: 'Pro',
      status: 'pending',
      subscriptionDate: '2024-05-10',
      subscriptionDays: 44,
      nextPayment: '2024-07-10',
      paymentStatus: 'failed',
    },
    {
      id: 4,
      email: 'emma@design.co',
      name: 'Emma Davis',
      plan: 'Basic',
      status: 'cancelled',
      subscriptionDate: '2023-12-01',
      subscriptionDays: 201,
      nextPayment: null,
      paymentStatus: 'stopped',
    },
    {
      id: 5,
      email: 'alex@tech.com',
      name: 'Alex Brown',
      plan: 'Premium',
      status: 'active',
      subscriptionDate: '2024-02-28',
      subscriptionDays: 115,
      nextPayment: '2024-07-28',
      paymentStatus: 'automated',
    },
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    const matchesPlan = planFilter === 'all' || customer.plan === planFilter;
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const handlePaymentAction = (customerId: number, action: string) => {
    const customer = customers.find(c => c.id === customerId);
    toast({
      title: `Payment ${action}`,
      description: `Payment ${action} for ${customer?.name} has been processed.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600/20 text-green-400';
      case 'pending': return 'bg-yellow-600/20 text-yellow-400';
      case 'cancelled': return 'bg-red-600/20 text-red-400';
      default: return 'bg-gray-600/20 text-gray-400';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Premium': return 'border-purple-500 text-purple-400';
      case 'Pro': return 'border-blue-500 text-blue-400';
      case 'Basic': return 'border-gray-500 text-gray-400';
      default: return 'border-gray-500 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Customer Management</h1>
        <p className="text-gray-400 mt-2">Manage subscriptions and payment settings</p>
      </div>

      {/* Filters */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Search & Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-[150px] bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="Basic">Basic</SelectItem>
                <SelectItem value="Pro">Pro</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customer List */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Customers ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-white">{customer.name}</h3>
                      <Badge className={getStatusColor(customer.status)}>
                        {customer.status}
                      </Badge>
                      <Badge variant="outline" className={getPlanColor(customer.plan)}>
                        {customer.plan}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400">{customer.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-300">Subscribed for</p>
                    <p className="font-medium text-white">{customer.subscriptionDays} days</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Subscription Date</p>
                    <p className="text-sm text-gray-300">{customer.subscriptionDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Next Payment</p>
                    <p className="text-sm text-gray-300">{customer.nextPayment || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Payment Status</p>
                    <p className="text-sm text-gray-300 capitalize">{customer.paymentStatus}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {customer.paymentStatus === 'automated' ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-600 text-red-400 hover:bg-red-600/10"
                      onClick={() => handlePaymentAction(customer.id, 'stopped')}
                    >
                      <StopCircle className="h-4 w-4 mr-2" />
                      Stop Auto-Pay
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-600 text-green-400 hover:bg-green-600/10"
                      onClick={() => handlePaymentAction(customer.id, 'started')}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Auto-Pay
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-600 text-blue-400 hover:bg-blue-600/10"
                    onClick={() => handlePaymentAction(customer.id, 'link sent')}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Payment Link
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
