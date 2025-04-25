
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, Check } from "lucide-react";

const steps = [
  {
    id: "business",
    name: "Business Information",
  },
  {
    id: "branding",
    name: "Branding",
  },
  {
    id: "preferences",
    name: "Preferences",
  },
  {
    id: "complete",
    name: "Complete",
  },
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-primary">Welcome to InvoiceEasy</h1>
          <p className="text-gray-500 max-w-md mx-auto">Let's set up your account to get you started with creating professional invoices</p>
        </div>
        
        {/* Step Progress Indicator */}
        <div className="w-full flex justify-center">
          <nav className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className={`flex flex-col items-center ${index <= currentStep ? 'text-primary' : 'text-gray-300'}`}>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    index < currentStep 
                      ? 'bg-primary text-white' 
                      : index === currentStep 
                      ? 'border-2 border-primary text-primary' 
                      : 'border-2 border-gray-300 text-gray-300'
                  }`}>
                    {index < currentStep ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <span className={`text-xs mt-1 ${index <= currentStep ? 'text-gray-700' : 'text-gray-400'}`}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-10 h-1 ${index < currentStep ? 'bg-primary' : 'bg-gray-300'}`} />
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
        
        <Card>
          {currentStep === 0 && (
            <>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>
                  Tell us about your business
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input id="businessName" placeholder="Your Business Name" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type</Label>
                    <Select>
                      <SelectTrigger id="businessType">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="soleProprietor">Sole Proprietor</SelectItem>
                        <SelectItem value="llc">LLC</SelectItem>
                        <SelectItem value="corporation">Corporation</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select>
                      <SelectTrigger id="industry">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessEmail">Business Email</Label>
                  <Input id="businessEmail" type="email" placeholder="business@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessPhone">Business Phone</Label>
                  <Input id="businessPhone" type="tel" placeholder="+1 (555) 000-0000" />
                </div>
              </CardContent>
            </>
          )}
          
          {currentStep === 1 && (
            <>
              <CardHeader>
                <CardTitle>Branding</CardTitle>
                <CardDescription>
                  Customize your invoice appearance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="logoUpload">Logo</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="space-y-2">
                      <div className="flex justify-center">
                        <svg className="h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <div className="flex justify-center text-sm">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-primary" />
                    <Input id="primaryColor" type="text" defaultValue="#7E69AB" />
                    <Input id="colorPicker" type="color" defaultValue="#7E69AB" className="w-10 p-1 h-10" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="invoiceTemplate">Invoice Template</Label>
                  <Select defaultValue="modern">
                    <SelectTrigger id="invoiceTemplate">
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="classic">Classic</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </>
          )}
          
          {currentStep === 2 && (
            <>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Set your invoicing preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD - US Dollar</SelectItem>
                      <SelectItem value="eur">EUR - Euro</SelectItem>
                      <SelectItem value="gbp">GBP - British Pound</SelectItem>
                      <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
                      <SelectItem value="aud">AUD - Australian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">Default Payment Terms</Label>
                  <Select defaultValue="15">
                    <SelectTrigger id="paymentTerms">
                      <SelectValue placeholder="Select payment terms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Due immediately</SelectItem>
                      <SelectItem value="7">Due in 7 days</SelectItem>
                      <SelectItem value="15">Due in 15 days</SelectItem>
                      <SelectItem value="30">Due in 30 days</SelectItem>
                      <SelectItem value="60">Due in 60 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Default Tax Rate (%)</Label>
                  <Input id="taxRate" type="number" defaultValue="0" min="0" max="100" />
                </div>
              </CardContent>
            </>
          )}
          
          {currentStep === 3 && (
            <>
              <CardHeader>
                <CardTitle className="text-center">All set!</CardTitle>
                <CardDescription className="text-center">
                  Your account has been successfully set up
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex flex-col items-center justify-center py-6">
                <div className="bg-green-100 rounded-full p-4">
                  <Check className="h-12 w-12 text-green-500" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-medium">Ready to go!</h3>
                  <p className="text-gray-500 max-w-md">
                    You've completed the onboarding process. You can now start creating invoices and managing your clients.
                  </p>
                </div>
              </CardContent>
            </>
          )}
          
          <CardFooter className="flex justify-between">
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Back
              </Button>
            )}
            <Button 
              className={currentStep === 0 || currentStep === steps.length - 1 ? "w-full" : ""}
              onClick={handleNextStep}
            >
              {currentStep === steps.length - 1 ? (
                "Go to Dashboard"
              ) : (
                <>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
