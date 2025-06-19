
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

export const OverviewView = () => {
  const stats = [
    {
      title: 'Total Subscribers',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: Users,
    },
    {
      title: 'Monthly Revenue',
      value: '$47,892',
      change: '+8.3%',
      changeType: 'positive',
      icon: DollarSign,
    },
    {
      title: 'Growth Rate',
      value: '15.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: TrendingUp,
    },
    {
      title: 'Churn Rate',
      value: '3.4%',
      change: '-0.5%',
      changeType: 'positive',
      icon: AlertCircle,
    },
  ];

  const recentActivity = [
    { id: 1, user: 'john@example.com', action: 'Upgraded to Premium', plan: 'Premium', time: '2 min ago' },
    { id: 2, user: 'sarah@company.com', action: 'New subscription', plan: 'Basic', time: '5 min ago' },
    { id: 3, user: 'mike@startup.io', action: 'Payment failed', plan: 'Pro', time: '12 min ago' },
    { id: 4, user: 'emma@design.co', action: 'Cancelled subscription', plan: 'Basic', time: '1 hour ago' },
    { id: 5, user: 'alex@tech.com', action: 'Renewed subscription', plan: 'Premium', time: '2 hours ago' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-gray-400 mt-2">Monitor your subscription metrics and recent activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge 
                    variant={stat.changeType === 'positive' ? 'default' : 'destructive'}
                    className={stat.changeType === 'positive' ? 'bg-green-600/20 text-green-400' : ''}
                  >
                    {stat.change}
                  </Badge>
                  <span className="text-xs text-gray-500">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
          <CardDescription className="text-gray-400">
            Latest subscription events and changes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-b-0">
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{activity.user}</p>
                  <p className="text-sm text-gray-400">{activity.action}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant="outline" 
                    className={`${
                      activity.plan === 'Premium' ? 'border-purple-500 text-purple-400' :
                      activity.plan === 'Pro' ? 'border-blue-500 text-blue-400' :
                      'border-gray-500 text-gray-400'
                    }`}
                  >
                    {activity.plan}
                  </Badge>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
