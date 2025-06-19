
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export const AnalyticsView = () => {
  const subscriptionData = [
    { month: 'Jan', subscribers: 2400, revenue: 38400, churn: 120 },
    { month: 'Feb', subscribers: 2210, revenue: 35360, churn: 98 },
    { month: 'Mar', subscribers: 2290, revenue: 36640, churn: 85 },
    { month: 'Apr', subscribers: 2000, revenue: 32000, churn: 105 },
    { month: 'May', subscribers: 2181, revenue: 34896, churn: 92 },
    { month: 'Jun', subscribers: 2500, revenue: 40000, churn: 78 },
  ];

  const planDistribution = [
    { name: 'Basic', value: 1245, color: '#6B7280' },
    { name: 'Pro', value: 856, color: '#3B82F6' },
    { name: 'Premium', value: 746, color: '#8B5CF6' },
  ];

  const keyMetrics = [
    {
      title: 'Subscriber Growth Rate',
      value: '15.2%',
      description: 'Monthly growth in subscribers',
      trend: 'up',
      color: 'text-green-400',
    },
    {
      title: 'Average Subscription Length',
      value: '8.4 months',
      description: 'Median time customers stay subscribed',
      trend: 'up',
      color: 'text-blue-400',
    },
    {
      title: 'Churn Rate',
      value: '3.4%',
      description: 'Percentage of subscribers who cancel',
      trend: 'down',
      color: 'text-red-400',
    },
    {
      title: 'Customer Lifetime Value',
      value: '$247',
      description: 'Average revenue per customer',
      trend: 'up',
      color: 'text-purple-400',
    },
    {
      title: 'Monthly Recurring Revenue',
      value: '$47,892',
      description: 'Predictable monthly income',
      trend: 'up',
      color: 'text-green-400',
    },
    {
      title: 'Revenue per User',
      value: '$16.83',
      description: 'Average monthly revenue per subscriber',
      trend: 'up',
      color: 'text-blue-400',
    },
  ];

  const COLORS = ['#6B7280', '#3B82F6', '#8B5CF6'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Analytics & Insights</h1>
        <p className="text-gray-400 mt-2">Track performance and gain insights into your subscription business</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {keyMetrics.map((metric, index) => (
          <Card key={index} className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                {metric.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${metric.color} mb-1`}>
                {metric.value}
              </div>
              <p className="text-xs text-gray-500">{metric.description}</p>
              <Badge 
                variant="outline" 
                className={`mt-2 ${metric.color} border-current`}
              >
                {metric.trend === 'up' ? '↑' : '↓'} Trending {metric.trend}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subscriber Growth Chart */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Subscriber Growth</CardTitle>
            <CardDescription className="text-gray-400">
              Monthly subscriber count over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={subscriptionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="subscribers" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Plan Distribution */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Plan Distribution</CardTitle>
            <CardDescription className="text-gray-400">
              Breakdown of subscribers by plan type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={planDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {planDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {planDistribution.map((plan, index) => (
                <div key={plan.name} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: plan.color }}
                  ></div>
                  <span className="text-sm text-gray-300">{plan.name}: {plan.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue and Churn Chart */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Revenue vs Churn Analysis</CardTitle>
          <CardDescription className="text-gray-400">
            Monthly revenue trends and churn rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={subscriptionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="revenue" fill="#10B981" name="Revenue ($)" />
              <Bar dataKey="churn" fill="#EF4444" name="Churn" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
