import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import GridBackground from "@/components/GridBackground";

const changelog = [
  {
    version: "0.4",
    title: "Beta v0.4",
    date: "January 2025",
    changes: [
      "Added support contact information",
      "Added donation link for CS2 skins",
    ],
  },
  {
    version: "0.3",
    title: "Beta v0.3",
    date: "January 2025",
    changes: [
      "Added Reaction Test tool",
      "Improved market fee calculation formula with increased accuracy",
    ],
  },
  {
    version: "0.2",
    title: "Beta v0.2",
    date: "January 2025",
    changes: [
      "Added website banner and icon",
      "Improved page descriptions",
      "Added 'Back to Tools' navigation button",
    ],
  },
  {
    version: "0.1",
    title: "Beta v0.1",
    date: "January 2025",
    changes: [
      "Website launched",
      "Initial release with Drop Timer",
      "Added Market Fee Calculator",
    ],
  },
];

const Changelog = () => {
  return (
    <div className="min-h-screen relative">
      <GridBackground />
      
      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Logo />
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-cs-orange transition-colors font-rajdhani"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Tools</span>
          </Link>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="font-orbitron text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Changelog
            </h1>
            <p className="text-muted-foreground text-lg">
              Track all updates and new features
            </p>
          </div>
          
          {/* Changelog List */}
          <div className="space-y-6">
            {changelog.map((release, index) => (
              <div 
                key={release.version}
                className="clip-corner bg-gradient-card border-2 border-cs-orange/20 hover:border-cs-orange/40 transition-all duration-300 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-orbitron text-xl font-bold text-cs-orange">
                    {release.title}
                  </h2>
                  <span className="text-muted-foreground text-sm font-rajdhani">
                    {release.date}
                  </span>
                </div>
                <ul className="space-y-2">
                  {release.changes.map((change, changeIndex) => (
                    <li 
                      key={changeIndex}
                      className="flex items-start gap-3 text-foreground/80 font-rajdhani"
                    >
                      <span className="text-cs-orange mt-1.5">•</span>
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
                {index === 0 && (
                  <div className="mt-4 inline-block px-3 py-1 bg-cs-orange/20 text-cs-orange text-xs font-rajdhani font-semibold tracking-wider uppercase rounded">
                    Latest
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-4 py-8 mt-auto">
        <div className="text-center">
          <p className="text-muted-foreground text-sm font-rajdhani">
            More updates coming soon!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Changelog;
