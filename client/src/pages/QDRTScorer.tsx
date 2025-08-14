import { useState } from "react";
import { Link } from "wouter";
import { BarChart3, Home, ChevronRight, Play } from "lucide-react";
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

export default function QDRTScorer() {
  const [formData, setFormData] = useState({
    designName: "",
    designCategory: "",
    qualityCriteria: "",
    designDescription: "",
    qualityAttributes: ""
  });
  const [isScoring, setIsScoring] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsScoring(true);

    // Validate required fields
    if (!formData.designName || !formData.designCategory || !formData.designDescription) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      setIsScoring(false);
      return;
    }

    try {
      // Simulate scoring process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Quality Assessment Complete",
        description: "Your design has been evaluated and scored against quality standards.",
      });
      
      // Here you would typically show results or navigate to a results page
    } catch (error) {
      toast({
        title: "Assessment Failed",
        description: "There was an error evaluating your design. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsScoring(false);
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
                <BreadcrumbPage className="text-sm font-medium text-amber-600">
                  QDRT Scorer
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
              <div className="flex items-center justify-center w-12 h-12 bg-amber-100 rounded-lg mr-4">
                <BarChart3 className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-enterprise-800" data-testid="text-page-title">
                  Quality Design Review Tester
                </h2>
                <p className="text-enterprise-600" data-testid="text-page-description">
                  Evaluate and score architecture designs against quality standards
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="designName" className="text-sm font-medium text-enterprise-700">
                    Design Name *
                  </Label>
                  <Input
                    id="designName"
                    type="text"
                    placeholder="Enter design name"
                    value={formData.designName}
                    onChange={(e) => handleInputChange("designName", e.target.value)}
                    className="border-enterprise-300 focus:ring-amber-500 focus:border-amber-500"
                    data-testid="input-design-name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designCategory" className="text-sm font-medium text-enterprise-700">
                    Design Category *
                  </Label>
                  <Select value={formData.designCategory} onValueChange={(value) => handleInputChange("designCategory", value)}>
                    <SelectTrigger className="border-enterprise-300 focus:ring-amber-500 focus:border-amber-500" data-testid="select-design-category">
                      <SelectValue placeholder="Select design category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system-architecture">System Architecture</SelectItem>
                      <SelectItem value="software-design">Software Design</SelectItem>
                      <SelectItem value="database-design">Database Design</SelectItem>
                      <SelectItem value="api-design">API Design</SelectItem>
                      <SelectItem value="security-design">Security Design</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="designDescription" className="text-sm font-medium text-enterprise-700">
                  Design Description *
                </Label>
                <Textarea
                  id="designDescription"
                  rows={5}
                  placeholder="Provide a detailed description of your design..."
                  value={formData.designDescription}
                  onChange={(e) => handleInputChange("designDescription", e.target.value)}
                  className="border-enterprise-300 focus:ring-amber-500 focus:border-amber-500"
                  data-testid="textarea-design-description"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualityCriteria" className="text-sm font-medium text-enterprise-700">
                  Quality Criteria Focus
                </Label>
                <Textarea
                  id="qualityCriteria"
                  rows={4}
                  placeholder="Specify quality criteria to focus on (e.g., performance, scalability, security)..."
                  value={formData.qualityCriteria}
                  onChange={(e) => handleInputChange("qualityCriteria", e.target.value)}
                  className="border-enterprise-300 focus:ring-amber-500 focus:border-amber-500"
                  data-testid="textarea-quality-criteria"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualityAttributes" className="text-sm font-medium text-enterprise-700">
                  Quality Attributes
                </Label>
                <Textarea
                  id="qualityAttributes"
                  rows={4}
                  placeholder="List specific quality attributes and requirements..."
                  value={formData.qualityAttributes}
                  onChange={(e) => handleInputChange("qualityAttributes", e.target.value)}
                  className="border-enterprise-300 focus:ring-amber-500 focus:border-amber-500"
                  data-testid="textarea-quality-attributes"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <Button type="button" variant="outline" asChild data-testid="button-cancel">
                  <Link href="/">Cancel</Link>
                </Button>
                <Button 
                  type="submit" 
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                  disabled={isScoring}
                  data-testid="button-run-assessment"
                >
                  {isScoring ? (
                    <>Running Assessment...</>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Run Quality Assessment
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
