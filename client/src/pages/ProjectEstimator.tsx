import { useState } from "react";
import { Link } from "wouter";
import { Calculator, Home, ChevronRight, DollarSign } from "lucide-react";
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

export default function ProjectEstimator() {
  const [formData, setFormData] = useState({
    projectName: "",
    projectComplexity: "",
    teamSize: "",
    projectDuration: "",
    projectScope: "",
    riskFactors: ""
  });
  const [isEstimating, setIsEstimating] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEstimating(true);

    // Validate required fields
    if (!formData.projectName || !formData.projectComplexity || !formData.teamSize || !formData.projectDuration) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      setIsEstimating(false);
      return;
    }

    try {
      // Simulate estimation process
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      toast({
        title: "Project Estimation Complete",
        description: "Your project cost estimation has been calculated and is ready for review.",
      });
      
      // Here you would typically show results or navigate to a results page
    } catch (error) {
      toast({
        title: "Estimation Failed",
        description: "There was an error calculating your project estimate. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsEstimating(false);
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
                <BreadcrumbPage className="text-sm font-medium text-purple-600">
                  Project Estimator
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
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mr-4">
                <Calculator className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-enterprise-800" data-testid="text-page-title">
                  Project Cost Estimator
                </h2>
                <p className="text-enterprise-600" data-testid="text-page-description">
                  Estimate project costs with comprehensive analysis of resources, timeline, and complexity
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
                    className="border-enterprise-300 focus:ring-purple-500 focus:border-purple-500"
                    data-testid="input-project-name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectComplexity" className="text-sm font-medium text-enterprise-700">
                    Project Complexity *
                  </Label>
                  <Select value={formData.projectComplexity} onValueChange={(value) => handleInputChange("projectComplexity", value)}>
                    <SelectTrigger className="border-enterprise-300 focus:ring-purple-500 focus:border-purple-500" data-testid="select-project-complexity">
                      <SelectValue placeholder="Select complexity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Complexity</SelectItem>
                      <SelectItem value="medium">Medium Complexity</SelectItem>
                      <SelectItem value="high">High Complexity</SelectItem>
                      <SelectItem value="very-high">Very High Complexity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="teamSize" className="text-sm font-medium text-enterprise-700">
                    Estimated Team Size *
                  </Label>
                  <Input
                    id="teamSize"
                    type="number"
                    placeholder="Enter team size"
                    value={formData.teamSize}
                    onChange={(e) => handleInputChange("teamSize", e.target.value)}
                    className="border-enterprise-300 focus:ring-purple-500 focus:border-purple-500"
                    data-testid="input-team-size"
                    min="1"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectDuration" className="text-sm font-medium text-enterprise-700">
                    Project Duration (months) *
                  </Label>
                  <Input
                    id="projectDuration"
                    type="number"
                    placeholder="Enter duration in months"
                    value={formData.projectDuration}
                    onChange={(e) => handleInputChange("projectDuration", e.target.value)}
                    className="border-enterprise-300 focus:ring-purple-500 focus:border-purple-500"
                    data-testid="input-project-duration"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectScope" className="text-sm font-medium text-enterprise-700">
                  Project Scope Description
                </Label>
                <Textarea
                  id="projectScope"
                  rows={4}
                  placeholder="Describe the project scope and major deliverables..."
                  value={formData.projectScope}
                  onChange={(e) => handleInputChange("projectScope", e.target.value)}
                  className="border-enterprise-300 focus:ring-purple-500 focus:border-purple-500"
                  data-testid="textarea-project-scope"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="riskFactors" className="text-sm font-medium text-enterprise-700">
                  Risk Factors
                </Label>
                <Textarea
                  id="riskFactors"
                  rows={4}
                  placeholder="Identify potential risk factors that may impact cost..."
                  value={formData.riskFactors}
                  onChange={(e) => handleInputChange("riskFactors", e.target.value)}
                  className="border-enterprise-300 focus:ring-purple-500 focus:border-purple-500"
                  data-testid="textarea-risk-factors"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <Button type="button" variant="outline" asChild data-testid="button-cancel">
                  <Link href="/">Cancel</Link>
                </Button>
                <Button 
                  type="submit" 
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  disabled={isEstimating}
                  data-testid="button-calculate-estimate"
                >
                  {isEstimating ? (
                    <>Calculating...</>
                  ) : (
                    <>
                      <DollarSign className="mr-2 h-4 w-4" />
                      Calculate Estimate
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
