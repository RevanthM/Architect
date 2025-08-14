import { useState } from "react";
import { Link } from "wouter";
import { Shield, Home, ChevronRight, Download } from "lucide-react";
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

export default function SESGenerator() {
  const [formData, setFormData] = useState({
    systemName: "",
    complianceFramework: "",
    securityRequirements: "",
    riskAssessment: "",
    controlMeasures: ""
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
    if (!formData.systemName || !formData.complianceFramework || !formData.securityRequirements) {
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
        title: "SES Generated Successfully",
        description: "Your Security Evaluation Summary document has been generated and is ready for download.",
      });
      
      // Here you would typically trigger a download or navigate to a preview
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating your SES. Please try again.",
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
                <BreadcrumbPage className="text-sm font-medium text-rose-600">
                  SES Generator
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
              <div className="flex items-center justify-center w-12 h-12 bg-rose-100 rounded-lg mr-4">
                <Shield className="h-6 w-6 text-rose-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-enterprise-800" data-testid="text-page-title">
                  Security Evaluation Summary Generator
                </h2>
                <p className="text-enterprise-600" data-testid="text-page-description">
                  Generate SES documents with compliance frameworks and security evaluation standards
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="systemName" className="text-sm font-medium text-enterprise-700">
                    System Name *
                  </Label>
                  <Input
                    id="systemName"
                    type="text"
                    placeholder="Enter system name"
                    value={formData.systemName}
                    onChange={(e) => handleInputChange("systemName", e.target.value)}
                    className="border-enterprise-300 focus:ring-rose-500 focus:border-rose-500"
                    data-testid="input-system-name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complianceFramework" className="text-sm font-medium text-enterprise-700">
                    Compliance Framework *
                  </Label>
                  <Select value={formData.complianceFramework} onValueChange={(value) => handleInputChange("complianceFramework", value)}>
                    <SelectTrigger className="border-enterprise-300 focus:ring-rose-500 focus:border-rose-500" data-testid="select-compliance-framework">
                      <SelectValue placeholder="Select compliance framework" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nist-cybersecurity">NIST Cybersecurity Framework</SelectItem>
                      <SelectItem value="iso-27001">ISO 27001</SelectItem>
                      <SelectItem value="soc-2">SOC 2</SelectItem>
                      <SelectItem value="fisma">FISMA</SelectItem>
                      <SelectItem value="gdpr">GDPR</SelectItem>
                      <SelectItem value="hipaa">HIPAA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="securityRequirements" className="text-sm font-medium text-enterprise-700">
                  Security Requirements *
                </Label>
                <Textarea
                  id="securityRequirements"
                  rows={5}
                  placeholder="Describe the security requirements and objectives..."
                  value={formData.securityRequirements}
                  onChange={(e) => handleInputChange("securityRequirements", e.target.value)}
                  className="border-enterprise-300 focus:ring-rose-500 focus:border-rose-500"
                  data-testid="textarea-security-requirements"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="riskAssessment" className="text-sm font-medium text-enterprise-700">
                  Risk Assessment
                </Label>
                <Textarea
                  id="riskAssessment"
                  rows={4}
                  placeholder="Provide risk assessment details and threat analysis..."
                  value={formData.riskAssessment}
                  onChange={(e) => handleInputChange("riskAssessment", e.target.value)}
                  className="border-enterprise-300 focus:ring-rose-500 focus:border-rose-500"
                  data-testid="textarea-risk-assessment"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="controlMeasures" className="text-sm font-medium text-enterprise-700">
                  Control Measures
                </Label>
                <Textarea
                  id="controlMeasures"
                  rows={4}
                  placeholder="List security control measures and safeguards..."
                  value={formData.controlMeasures}
                  onChange={(e) => handleInputChange("controlMeasures", e.target.value)}
                  className="border-enterprise-300 focus:ring-rose-500 focus:border-rose-500"
                  data-testid="textarea-control-measures"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <Button type="button" variant="outline" asChild data-testid="button-cancel">
                  <Link href="/">Cancel</Link>
                </Button>
                <Button 
                  type="submit" 
                  className="bg-rose-600 hover:bg-rose-700 text-white"
                  disabled={isGenerating}
                  data-testid="button-generate-ses"
                >
                  {isGenerating ? (
                    <>Generating...</>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Generate SES
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
