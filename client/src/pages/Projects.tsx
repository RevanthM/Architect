import { 
  FolderOpen,
  Calendar,
  Users,
  Clock,
  BarChart3
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Projects() {
  return (
    <div className="min-h-screen bg-enterprise-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-enterprise-800" data-testid="text-page-title">
            Projects
          </h1>
          <p className="text-enterprise-600 mt-2" data-testid="text-page-subtitle">
            Manage and track your architecture projects
          </p>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border border-enterprise-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-enterprise-600">
                Active Projects
              </CardTitle>
              <FolderOpen className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-enterprise-800" data-testid="text-stat-active-projects">89</div>
              <p className="text-xs text-enterprise-500">+5 new this week</p>
            </CardContent>
          </Card>

          <Card className="border border-enterprise-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-enterprise-600">
                Due This Week
              </CardTitle>
              <Calendar className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-enterprise-800" data-testid="text-stat-due-week">12</div>
              <p className="text-xs text-enterprise-500">3 critical deliverables</p>
            </CardContent>
          </Card>

          <Card className="border border-enterprise-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-enterprise-600">
                Team Members
              </CardTitle>
              <Users className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-enterprise-800" data-testid="text-stat-team-members">47</div>
              <p className="text-xs text-enterprise-500">Across all projects</p>
            </CardContent>
          </Card>

          <Card className="border border-enterprise-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-enterprise-600">
                Avg. Completion
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-enterprise-800" data-testid="text-stat-completion">73%</div>
              <p className="text-xs text-enterprise-500">+8% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <Card className="border border-enterprise-200">
          <CardContent className="p-8">
            <div className="text-center py-12">
              <FolderOpen className="mx-auto h-16 w-16 text-enterprise-400 mb-4" />
              <h2 className="text-2xl font-semibold text-enterprise-800 mb-4">
                Project Management
              </h2>
              <p className="text-enterprise-600 max-w-2xl mx-auto">
                This section will include project tracking, timeline management, resource allocation, 
                and collaboration tools for architecture teams. Features will include project templates, 
                milestone tracking, and integration with architecture deliverable tools.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}