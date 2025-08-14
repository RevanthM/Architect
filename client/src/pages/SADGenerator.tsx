import { useState } from "react";
import { Link } from "wouter";
import { Network, Home, ChevronRight, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { useToast } from "@/hooks/use-toast";

export default function SADGenerator() {
  const [formData, setFormData] = useState({
    solutionName: "",
    solutionType: "",
    architecturalApproach: "",
    technicalRequirements: "",
    integrationPoints: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    // Validate required fields
    if (!formData.solutionName || !formData.solutionType || !formData.architecturalApproach) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      setIsGenerating(false);
      return;
    }

    try {
      // Simulate document generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "SAD Generated Successfully",
        description: "Your Solution Architecture Document has been generated and is ready for download.",
      });
      
      // Here you would typically trigger a download or navigate to a preview
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating your SAD. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-enterprise-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" data-testid="link-breadcrumb-home">
                    <div className="flex items-center">
                      <Home className="h-4 w-4 text-enterprise-400" />
                      <span className="ml-2 text-sm font-medium text-enterprise-600">Dashboard</span>
                    </div>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4 text-enterprise-400" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm font-medium text-emerald-600">
                  Simple SAD Generator
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border border-enterprise-200">
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-lg mr-4">
                <Network className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-enterprise-800" data-testid="text-page-title">
                  Simple Solution Architecture Document Generator
                </h2>
                <p className="text-enterprise-600" data-testid="text-page-description">
                  Generate simple solution architecture documents with standardized frameworks
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="solutionName" className="text-sm font-medium text-enterprise-700">
                    Solution Name *
                  </Label>
                  <Input
                    id="solutionName"
                    type="text"
                    placeholder="Enter solution name"
                    value={formData.solutionName}
                    onChange={(e) => handleInputChange("solutionName", e.target.value)}
                    className="border-enterprise-300 focus:ring-emerald-500 focus:border-emerald-500"
                    data-testid="input-solution-name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="solutionType" className="text-sm font-medium text-enterprise-700">
                    Solution Type *
                  </Label>
                  <Select value={formData.solutionType} onValueChange={(value) => handleInputChange("solutionType", value)}>
                    <SelectTrigger className="border-enterprise-300 focus:ring-emerald-500 focus:border-emerald-500" data-testid="select-solution-type">
                      <SelectValue placeholder="Select solution type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web-application">Web Application</SelectItem>
                      <SelectItem value="mobile-application">Mobile Application</SelectItem>
                      <SelectItem value="api-service">API Service</SelectItem>
                      <SelectItem value="data-platform">Data Platform</SelectItem>
                      <SelectItem value="integration-solution">Integration Solution</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="architecturalApproach" className="text-sm font-medium text-enterprise-700">
                  Architectural Approach *
                </Label>
                <Textarea
                  id="architecturalApproach"
                  rows={5}
                  placeholder="Describe the architectural approach and design patterns..."
                  value={formData.architecturalApproach}
                  onChange={(e) => handleInputChange("architecturalApproach", e.target.value)}
                  className="border-enterprise-300 focus:ring-emerald-500 focus:border-emerald-500"
                  data-testid="textarea-architectural-approach"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="technicalRequirements" className="text-sm font-medium text-enterprise-700">
                  Technical Requirements
                </Label>
                <Textarea
                  id="technicalRequirements"
                  rows={4}
                  placeholder="List technical requirements and constraints..."
                  value={formData.technicalRequirements}
                  onChange={(e) => handleInputChange("technicalRequirements", e.target.value)}
                  className="border-enterprise-300 focus:ring-emerald-500 focus:border-emerald-500"
                  data-testid="textarea-technical-requirements"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="integrationPoints" className="text-sm font-medium text-enterprise-700">
                  Integration Points
                </Label>
                <Textarea
                  id="integrationPoints"
                  rows={4}
                  placeholder="Describe integration points and dependencies..."
                  value={formData.integrationPoints}
                  onChange={(e) => handleInputChange("integrationPoints", e.target.value)}
                  className="border-enterprise-300 focus:ring-emerald-500 focus:border-emerald-500"
                  data-testid="textarea-integration-points"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <Button type="button" variant="outline" asChild data-testid="button-cancel">
                  <Link href="/">Cancel</Link>
                </Button>
                <Button 
                  type="submit" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  disabled={isGenerating}
                  data-testid="button-generate-sad"
                >
                  {isGenerating ? (
                    <>Generating...</>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Generate SAD
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
