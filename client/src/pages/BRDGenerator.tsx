import { useState } from "react";
import { Link } from "wouter";
import { FileText, Home, ChevronRight, Download } from "lucide-react";
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

export default function BRDGenerator() {
  const [formData, setFormData] = useState({
    projectName: "",
    projectType: "",
    businessObjectives: "",
    scopeDescription: "",
    priorityLevel: "",
    expectedCompletion: ""
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
    if (!formData.projectName || !formData.projectType || !formData.businessObjectives) {
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
        title: "BRD Generated Successfully",
        description: "Your Business Requirements Document has been generated and is ready for download.",
      });
      
      // Here you would typically trigger a download or navigate to a preview
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating your BRD. Please try again.",
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
                <BreadcrumbPage className="text-sm font-medium text-blue-600">
                  BRD Generator
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
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mr-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-enterprise-800" data-testid="text-page-title">
                  Business Requirements Document Generator
                </h2>
                <p className="text-enterprise-600" data-testid="text-page-description">
                  Generate comprehensive BRDs with standardized templates
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="projectName" className="text-sm font-medium text-enterprise-700">
                    Project Name *
                  </Label>
                  <Input
                    id="projectName"
                    type="text"
                    placeholder="Enter project name"
                    value={formData.projectName}
                    onChange={(e) => handleInputChange("projectName", e.target.value)}
                    className="border-enterprise-300 focus:ring-blue-500 focus:border-blue-500"
                    data-testid="input-project-name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectType" className="text-sm font-medium text-enterprise-700">
                    Project Type *
                  </Label>
                  <Select value={formData.projectType} onValueChange={(value) => handleInputChange("projectType", value)}>
                    <SelectTrigger className="border-enterprise-300 focus:ring-blue-500 focus:border-blue-500" data-testid="select-project-type">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="software-development">Software Development</SelectItem>
                      <SelectItem value="infrastructure">Infrastructure</SelectItem>
                      <SelectItem value="business-process">Business Process</SelectItem>
                      <SelectItem value="integration">Integration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessObjectives" className="text-sm font-medium text-enterprise-700">
                  Business Objectives *
                </Label>
                <Textarea
                  id="businessObjectives"
                  rows={4}
                  placeholder="Describe the main business objectives..."
                  value={formData.businessObjectives}
                  onChange={(e) => handleInputChange("businessObjectives", e.target.value)}
                  className="border-enterprise-300 focus:ring-blue-500 focus:border-blue-500"
                  data-testid="textarea-business-objectives"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scopeDescription" className="text-sm font-medium text-enterprise-700">
                  Scope Description
                </Label>
                <Textarea
                  id="scopeDescription"
                  rows={4}
                  placeholder="Define project scope and boundaries..."
                  value={formData.scopeDescription}
                  onChange={(e) => handleInputChange("scopeDescription", e.target.value)}
                  className="border-enterprise-300 focus:ring-blue-500 focus:border-blue-500"
                  data-testid="textarea-scope-description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="priorityLevel" className="text-sm font-medium text-enterprise-700">
                    Priority Level
                  </Label>
                  <Select value={formData.priorityLevel} onValueChange={(value) => handleInputChange("priorityLevel", value)}>
                    <SelectTrigger className="border-enterprise-300 focus:ring-blue-500 focus:border-blue-500" data-testid="select-priority-level">
                      <SelectValue placeholder="Select priority level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expectedCompletion" className="text-sm font-medium text-enterprise-700">
                    Expected Completion
                  </Label>
                  <Input
                    id="expectedCompletion"
                    type="date"
                    value={formData.expectedCompletion}
                    onChange={(e) => handleInputChange("expectedCompletion", e.target.value)}
                    className="border-enterprise-300 focus:ring-blue-500 focus:border-blue-500"
                    data-testid="input-expected-completion"
                  />
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button type="button" variant="outline" asChild data-testid="button-cancel">
                  <Link href="/">Cancel</Link>
                </Button>
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isGenerating}
                  data-testid="button-generate-brd"
                >
                  {isGenerating ? (
                    <>Generating...</>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Generate BRD
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
