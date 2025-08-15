import { 
  GitBranch,
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  Target
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function STPS() {
  return (
    <div className="min-h-screen bg-enterprise-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-enterprise-800" data-testid="text-page-title">
            Software Testing Process & Standards
          </h1>
          <p className="text-enterprise-600 mt-2" data-testid="text-page-subtitle">
            Manage testing processes and quality standards
          </p>
        </div>

        {/* STPS Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border border-enterprise-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-enterprise-600">
                Active Sprints
              </CardTitle>
              <GitBranch className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-enterprise-800" data-testid="text-stat-sprints">24</div>
              <p className="text-xs text-enterprise-500">Across 12 teams</p>
            </CardContent>
          </Card>

          <Card className="border border-enterprise-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-enterprise-600">
                Completed Stories
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-enterprise-800" data-testid="text-stat-stories">847</div>
              <p className="text-xs text-enterprise-500">This quarter</p>
            </CardContent>
          </Card>

          <Card className="border border-enterprise-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-enterprise-600">
                Pending Reviews
              </CardTitle>
              <Clock className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-enterprise-800" data-testid="text-stat-reviews">18</div>
              <p className="text-xs text-enterprise-500">Architecture reviews</p>
            </CardContent>
          </Card>

          <Card className="border border-enterprise-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-enterprise-600">
                Quality Gate
              </CardTitle>
              <Target className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-enterprise-800" data-testid="text-stat-quality">94%</div>
              <p className="text-xs text-enterprise-500">Pass rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Testing Phases */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border border-enterprise-200">
            <CardHeader>
              <CardTitle className="flex items-center text-enterprise-800">
                <GitBranch className="mr-2 h-5 w-5 text-blue-600" />
                Testing Phases
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-enterprise-25 rounded-lg">
                <span className="font-medium text-enterprise-700">Test Planning</span>
                <span className="text-emerald-600 font-medium">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-enterprise-25 rounded-lg">
                <span className="font-medium text-enterprise-700">Unit Testing</span>
                <span className="text-blue-600 font-medium">In Progress</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-enterprise-25 rounded-lg">
                <span className="font-medium text-enterprise-700">Integration Testing</span>
                <span className="text-amber-600 font-medium">Scheduled</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-enterprise-25 rounded-lg">
                <span className="font-medium text-enterprise-700">System Testing</span>
                <span className="text-enterprise-400 font-medium">Pending</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-enterprise-200">
            <CardHeader>
              <CardTitle className="flex items-center text-enterprise-800">
                <AlertTriangle className="mr-2 h-5 w-5 text-amber-600" />
                Quality Standards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-enterprise-25 rounded-lg">
                <span className="font-medium text-enterprise-700">Code Coverage</span>
                <span className="text-emerald-600 font-medium">85%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-enterprise-25 rounded-lg">
                <span className="font-medium text-enterprise-700">Test Standards</span>
                <span className="text-blue-600 font-medium">Compliant</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-enterprise-25 rounded-lg">
                <span className="font-medium text-enterprise-700">Quality Gates</span>
                <span className="text-amber-600 font-medium">In Review</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-enterprise-25 rounded-lg">
                <span className="font-medium text-enterprise-700">Performance Tests</span>
                <span className="text-enterprise-400 font-medium">Scheduled</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <Card className="border border-enterprise-200">
          <CardContent className="p-8">
            <div className="text-center py-12">
              <GitBranch className="mx-auto h-16 w-16 text-enterprise-400 mb-4" />
              <h2 className="text-2xl font-semibold text-enterprise-800 mb-4">
                Testing Process Management
              </h2>
              <p className="text-enterprise-600 max-w-2xl mx-auto">
                This section will provide comprehensive testing process management including 
                test automation, quality standards enforcement, coverage tracking, and integration with 
                testing tools. Features will include test templates, automation workflows, 
                and quality dashboards.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}