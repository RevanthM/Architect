import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Dashboard from "@/pages/Dashboard";
import Tools from "@/pages/Tools";
import Projects from "@/pages/Projects";
import SDLC from "@/pages/SDLC";
import BRDGenerator from "@/pages/BRDGenerator";
import AVDGenerator from "@/pages/AVDGenerator";
import SADGenerator from "@/pages/SADGenerator";
import QDRTInteractive from "@/pages/QDRTInteractive";
import ProjectEstimator from "@/pages/ProjectEstimator";
import SESGenerator from "@/pages/SESGenerator";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/tools" component={Tools} />
      <Route path="/projects" component={Projects} />
      <Route path="/sdlc" component={SDLC} />
      <Route path="/tools/brd" component={BRDGenerator} />
      <Route path="/tools/avd" component={AVDGenerator} />
      <Route path="/tools/sad" component={SADGenerator} />
      <Route path="/tools/qdrt" component={QDRTInteractive} />
      <Route path="/tools/estimator" component={ProjectEstimator} />
      <Route path="/tools/ses" component={SESGenerator} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col bg-enterprise-50">
          <Header />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
