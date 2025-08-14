import { useState } from "react";
import { Link } from "wouter";
import { Eye, Home, ChevronRight, Download } from "lucide-react";
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

export default function AVDGenerator() {
  const [formData, setFormData] = useState({
    visionTitle: "",
    architectureDomain: "",
    strategicVision: "",
    keyPrinciples: ""
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
    if (!formData.visionTitle || !formData.architectureDomain || !formData.strategicVision) {
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
        title: "AVD Generated Successfully",
        description: "Your Architecture Vision Document has been generated and is ready for download.",
      });
      
      // Here you would typically trigger a download or navigate to a preview
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating your AVD. Please try again.",
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
                <BreadcrumbPage className="text-sm font-medium text-indigo-600">
                  AVD Generator
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
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mr-4">
                <Eye className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-enterprise-800" data-testid="text-page-title">
                  Architecture Vision Document Generator
                </h2>
                <p className="text-enterprise-600" data-testid="text-page-description">
                  Create strategic architecture vision documents
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="visionTitle" className="text-sm font-medium text-enterprise-700">
                    Vision Title *
                  </Label>
                  <Input
                    id="visionTitle"
                    type="text"
                    placeholder="Enter vision title"
                    value={formData.visionTitle}
                    onChange={(e) => handleInputChange("visionTitle", e.target.value)}
                    className="border-enterprise-300 focus:ring-indigo-500 focus:border-indigo-500"
                    data-testid="input-vision-title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="architectureDomain" className="text-sm font-medium text-enterprise-700">
                    Architecture Domain *
                  </Label>
                  <Select value={formData.architectureDomain} onValueChange={(value) => handleInputChange("architectureDomain", value)}>
                    <SelectTrigger className="border-enterprise-300 focus:ring-indigo-500 focus:border-indigo-500" data-testid="select-architecture-domain">
                      <SelectValue placeholder="Select architecture domain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enterprise-architecture">Enterprise Architecture</SelectItem>
                      <SelectItem value="solution-architecture">Solution Architecture</SelectItem>
                      <SelectItem value="technology-architecture">Technology Architecture</SelectItem>
                      <SelectItem value="data-architecture">Data Architecture</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="strategicVision" className="text-sm font-medium text-enterprise-700">
                  Strategic Vision *
                </Label>
                <Textarea
                  id="strategicVision"
                  rows={5}
                  placeholder="Describe the strategic architecture vision..."
                  value={formData.strategicVision}
                  onChange={(e) => handleInputChange("strategicVision", e.target.value)}
                  className="border-enterprise-300 focus:ring-indigo-500 focus:border-indigo-500"
                  data-testid="textarea-strategic-vision"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="keyPrinciples" className="text-sm font-medium text-enterprise-700">
                  Key Principles
                </Label>
                <Textarea
                  id="keyPrinciples"
                  rows={4}
                  placeholder="List key architecture principles..."
                  value={formData.keyPrinciples}
                  onChange={(e) => handleInputChange("keyPrinciples", e.target.value)}
                  className="border-enterprise-300 focus:ring-indigo-500 focus:border-indigo-500"
                  data-testid="textarea-key-principles"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <Button type="button" variant="outline" asChild data-testid="button-cancel">
                  <Link href="/">Cancel</Link>
                </Button>
                <Button 
                  type="submit" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  disabled={isGenerating}
                  data-testid="button-generate-avd"
                >
                  {isGenerating ? (
                    <>Generating...</>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Generate AVD
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
