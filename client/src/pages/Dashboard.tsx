import { Link } from "wouter";
import { 
  FileText, 
  Eye, 
  Network, 
  BarChart3, 
  Calculator, 
  Shield,
  ArrowRight,
  Home
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";

const tools = [
  {
    id: "brd",
    title: "BRD Generator",
    description: "A tool which generates business requirements documents with standardized templates and best practices",
    icon: FileText,
    color: "blue",
    path: "/tools/brd"
  },
  {
    id: "avd",
    title: "AVD Generator", 
    description: "A tool which generates architecture vision documents to define strategic direction and goals",
    icon: Eye,
    color: "indigo",
    path: "/tools/avd"
  },
  {
    id: "sad",
    title: "Simple SAD Generator",
    description: "A tool which generates simple solution architecture documents with standardized frameworks",
    icon: Network,
    color: "emerald",
    path: "/tools/sad"
  },
  {
    id: "qdrt",
    title: "QDRT Scorer",
    description: "Quality Design Review Tester - evaluate and score architecture designs against quality standards",
    icon: BarChart3,
    color: "amber",
    path: "/tools/qdrt"
  },
  {
    id: "estimator",
    title: "Project Estimator",
    description: "Estimate project costs with comprehensive analysis of resources, timeline, and complexity factors",
    icon: Calculator,
    color: "purple",
    path: "/tools/estimator"
  },
  {
    id: "ses",
    title: "SES Generator",
    description: "Generate SES documents with compliance frameworks and security evaluation standards",
    icon: Shield,
    color: "rose",
    path: "/tools/ses"
  }
];

const colorMap = {
  blue: { bg: "bg-blue-100", text: "text-blue-600", hover: "hover:text-blue-600" },
  indigo: { bg: "bg-indigo-100", text: "text-indigo-600", hover: "hover:text-indigo-600" },
  emerald: { bg: "bg-emerald-100", text: "text-emerald-600", hover: "hover:text-emerald-600" },
  amber: { bg: "bg-amber-100", text: "text-amber-600", hover: "hover:text-amber-600" },
  purple: { bg: "bg-purple-100", text: "text-purple-600", hover: "hover:text-purple-600" },
  rose: { bg: "bg-rose-100", text: "text-rose-600", hover: "hover:text-rose-600" }
};

export default function Dashboard() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-enterprise-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <div className="flex items-center">
                  <Home className="h-4 w-4 text-enterprise-400" />
                  <BreadcrumbPage className="ml-2 text-sm font-medium text-enterprise-600">
                    Dashboard
                  </BreadcrumbPage>
                </div>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-enterprise-800 mb-2" data-testid="text-page-title">
            Architecture Deliverable Tools
          </h2>
          <p className="text-lg text-enterprise-600" data-testid="text-page-description">
            Generate professional architecture documents with approved templates and standards
          </p>
        </div>

        {/* Tool Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tools.map((tool) => {
            const colors = colorMap[tool.color as keyof typeof colorMap];
            const IconComponent = tool.icon;
            
            return (
              <Link key={tool.id} href={tool.path} data-testid={`link-tool-${tool.id}`}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border border-enterprise-200 group">
                  <CardContent className="p-6">
                    <div className={`flex items-center justify-center w-12 h-12 ${colors.bg} rounded-lg mb-4`}>
                      <IconComponent className={`h-6 w-6 ${colors.text}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-enterprise-800 mb-2" data-testid={`text-tool-title-${tool.id}`}>
                      {tool.title}
                    </h3>
                    <p className="text-enterprise-600 mb-4" data-testid={`text-tool-description-${tool.id}`}>
                      {tool.description}
                    </p>
                    <div className={`flex items-center ${colors.text} font-medium group-hover:${colors.hover}`}>
                      <span>Get Started</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Stats Section */}
        <Card className="border border-enterprise-200">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-enterprise-800 mb-6" data-testid="text-stats-title">
              Platform Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2" data-testid="text-stat-documents">
                  1,247
                </div>
                <div className="text-enterprise-600">Documents Generated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2" data-testid="text-stat-projects">
                  89
                </div>
                <div className="text-enterprise-600">Active Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2" data-testid="text-stat-time">
                  342h
                </div>
                <div className="text-enterprise-600">Time Saved</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
