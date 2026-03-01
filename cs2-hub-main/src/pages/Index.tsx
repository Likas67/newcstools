import { Timer, Calculator, Crosshair, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import ToolCard from "@/components/ToolCard";
import Logo from "@/components/Logo";
import GridBackground from "@/components/GridBackground";

const Index = () => {
  const tools = [
    {
      title: "Drop Timer",
      description: "Track your CS2 drop timers and never miss a weekly drop. Stay on top of your case and a brand-new skin drops.",
      href: "/drop-timer",
      icon: <Timer className="w-7 h-7" />,
      variant: "orange" as const,
      isInternal: true,
    },
    {
      title: "Market Fee Calculator",
      description: "Calculate Steam market fees instantly. Know exactly how much you'll receive after Valve's cut.",
      href: "/market-fee-calculator",
      icon: <Calculator className="w-7 h-7" />,
      variant: "orange" as const,
      isInternal: true,
    },
    {
      title: "Reaction Test",
      description: "Test your reflexes and measure your reaction time in milliseconds. Essential for competitive play.",
      href: "/reaction-test",
      icon: <Zap className="w-7 h-7" />,
      variant: "orange" as const,
      isInternal: true,
    },
    {
      title: "Coming Soon",
      description: "More tools are on the way. Stay tuned for crosshair generators, sensitivity converters, and more.",
      href: "#",
      icon: <Crosshair className="w-7 h-7" />,
      variant: "disabled" as const,
      isInternal: true,
    },
  ];

  return (
    <div className="min-h-screen relative">
      <GridBackground />
      
      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6">
        <Logo />
      </header>
      
      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-4 py-12 sm:py-20">
        <div className="text-center mb-16 sm:mb-24">
          {/* Decorative element */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cs-orange/50" />
            <Crosshair className="w-5 h-5 text-cs-orange animate-pulse-slow" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-cs-orange/50" />
          </div>
          
          <h1 className="font-orbitron text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
            <span className="text-foreground">COUNTER-STRIKE</span>
            <br />
            <span className="text-gradient-primary">UTILITY TOOLS</span>
          </h1>
          
          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Essential tools for the dedicated CS2 player. 
            Track drops, calculate fees, and optimize your gameplay.
          </p>
        </div>
        
        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {tools.map((tool) => (
            <ToolCard key={tool.title} {...tool} />
          ))}
        </div>
        
        {/* Bottom accent */}
        <div className="flex items-center justify-center gap-2 mt-20 sm:mt-32">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
          <div className="w-2 h-2 rotate-45 bg-cs-orange/30" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-4 py-8 mt-auto">
        <div className="text-center space-y-4">
          {/* Contact & Donation Info */}
          <div className="max-w-xl mx-auto space-y-3">
            <p className="text-muted-foreground text-sm font-rajdhani">
              <span className="text-foreground/80">Found a bug or have suggestions?</span>{" "}
              Contact us at{" "}
              <a 
                href="mailto:etec.app@outlook.com" 
                className="text-cs-orange hover:text-cs-orange-light transition-colors"
              >
                etec.app@outlook.com
              </a>
            </p>
            <p className="text-muted-foreground text-sm font-rajdhani">
              <span className="text-foreground/80">Want to support us?</span>{" "}
              Donation page is under construction. For now, you can donate CS2 skins:{" "}
              <a 
                href="https://steamcommunity.com/tradeoffer/new/?partner=1262090403&token=CW2KPLJi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cs-orange hover:text-cs-orange-light transition-colors"
              >
                Steam Trade Link
              </a>
            </p>
          </div>
          
          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-border to-transparent" />
          
          <Link 
            to="/changelog"
            className="text-muted-foreground hover:text-cs-orange text-sm font-rajdhani tracking-wider transition-colors cursor-pointer"
          >
            Beta v0.4
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Index;
