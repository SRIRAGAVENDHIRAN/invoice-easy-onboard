
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically redirect after a short delay
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-purple-800 text-white">
      <div className="text-center space-y-8 max-w-2xl p-4">
        <div className="animate-slide-in space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold">InvoiceEasy</h1>
          <p className="text-xl md:text-2xl text-purple-100">
            Simple invoicing for freelancers and small businesses
          </p>
        </div>
        
        <div className="animate-slide-in [animation-delay:200ms] space-y-6">
          <p className="text-lg">
            Create professional invoices, manage clients, and get paid faster.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={() => navigate("/login")}
              size="lg"
              className="bg-white text-primary hover:bg-gray-100"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => navigate("/register")}
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/10"
            >
              Create Account
            </Button>
          </div>
        </div>
        
        <div className="text-sm animate-slide-in [animation-delay:400ms] text-purple-200">
          Redirecting to login page...
        </div>
      </div>
    </div>
  );
};

export default Index;
