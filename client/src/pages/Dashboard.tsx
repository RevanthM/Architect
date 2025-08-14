import { 
  TrendingUp,
  Users,
  Activity,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-enterprise-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-enterprise-800" data-testid="text-page-title">
            Dashboard
          </h1>
          <p className="text-enterprise-600 mt-2" data-testid="text-page-subtitle">
            Welcome to SCE Architecture Platform
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border border-enterprise-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-enterprise-600">
                Total Documents
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-enterprise-800" data-testid="text-stat-total-docs">1,247</div>
              <p className="text-xs text-enterprise-500">+20.1% from last month</p>
            </CardContent>
          </Card>

          <Card className="border border-enterprise-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-enterprise-600">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-enterprise-800" data-testid="text-stat-users">324</div>
              <p className="text-xs text-enterprise-500">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="border border-enterprise-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-enterprise-600">
                Projects Active
              </CardTitle>
              <Activity className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-enterprise-800" data-testid="text-stat-projects">89</div>
              <p className="text-xs text-enterprise-500">+5 new this week</p>
            </CardContent>
          </Card>

          <Card className="border border-enterprise-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-enterprise-600">
                Time Saved
              </CardTitle>
              <Clock className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-enterprise-800" data-testid="text-stat-time">342h</div>
              <p className="text-xs text-enterprise-500">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <Card className="border border-enterprise-200">
          <CardContent className="p-8">
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-enterprise-800 mb-4">
                Welcome to Your Dashboard
              </h2>
              <p className="text-enterprise-600 max-w-2xl mx-auto">
                This dashboard will be expanded with more features including recent activity, 
                project insights, and personalized recommendations. Navigate to the Tools section 
                to access all architecture deliverable tools.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}