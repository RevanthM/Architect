import { 
  FileText, 
  FileCode, 
  FileSearch, 
  BarChart3, 
  Calculator, 
  Shield,
  ArrowRight 
} from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";

export default function Tools() {
  const tools = [
    {
      id: "brd",
      title: "BRD Generator",
      description: "Create comprehensive Business Requirements Documents with AI assistance",
      icon: FileText,
      color: "blue",
      path: "/tools/brd"
    },
    {
      id: "avd",
      title: "AVD Generator",
      description: "Generate Architecture Vision Documents aligned with enterprise standards",
      icon: FileCode,
      color: "emerald",
      path: "/tools/avd"
    },
    {
      id: "sad",
      title: "SAD Generator",
      description: "Build detailed Solution Architecture Documents efficiently",
      icon: FileSearch,
      color: "purple",
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
      description: "Calculate accurate project timelines and resource requirements",
      icon: Calculator,
      color: "rose",
      path: "/tools/estimator"
    },
    {
      id: "ses",
      title: "SES Generator",
      description: "Create Security & Compliance documents with best practices",
      icon: Shield,
      color: "cyan",
      path: "/tools/ses"
    }
  ];

  const colorMap = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      hover: "hover:text-blue-700"
    },
    emerald: {
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      hover: "hover:text-emerald-700"
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      hover: "hover:text-purple-700"
    },
    amber: {
      bg: "bg-amber-100",
      text: "text-amber-600",
      hover: "hover:text-amber-700"
    },
    rose: {
      bg: "bg-rose-100",
      text: "text-rose-600",
      hover: "hover:text-rose-700"
    },
    cyan: {
      bg: "bg-cyan-100",
      text: "text-cyan-600",
      hover: "hover:text-cyan-700"
    }
  };

  return (
    <div className="min-h-screen bg-enterprise-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-enterprise-800 mb-4" data-testid="text-page-title">
            Architecture Deliverable Tools
          </h1>
          <p className="text-xl text-enterprise-600 max-w-3xl mx-auto" data-testid="text-page-subtitle">
            Comprehensive suite of enterprise architecture tools for creating professional documentation and assessments
          </p>
        </div>

        {/* Tools Grid */}
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