import { ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  variant?: "orange" | "blue" | "disabled";
  isInternal?: boolean;
}

const ToolCard = ({ title, description, href, icon, variant = "orange", isInternal = false }: ToolCardProps) => {
  const isOrange = variant === "orange";
  const isDisabled = variant === "disabled";
  
  const cardContent = (
    <>
      {/* Corner accent */}
      <div className={`
        absolute top-0 right-0 w-8 h-8
        ${isDisabled ? "bg-muted/20" : isOrange ? "bg-cs-orange/20" : "bg-cs-blue/20"}
        clip-path-[polygon(100%_0,_0_0,_100%_100%)]
      `} />
      
      {/* Shimmer effect on hover */}
      {!isDisabled && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`
            absolute inset-0 
            bg-gradient-to-r from-transparent ${isOrange ? "via-cs-orange/5" : "via-cs-blue/5"} to-transparent
            animate-shimmer bg-[length:200%_100%]
          `} />
        </div>
      )}
      
      <div className="relative p-6 sm:p-8">
        {/* Icon */}
        <div className={`
          inline-flex items-center justify-center w-14 h-14 mb-6
          clip-corner-sm transition-all duration-300
          ${isDisabled 
            ? "bg-muted/10 text-muted-foreground"
            : isOrange 
              ? "bg-cs-orange/10 text-cs-orange group-hover:bg-cs-orange/20" 
              : "bg-cs-blue/10 text-cs-blue group-hover:bg-cs-blue/20"
          }
        `}>
          {icon}
        </div>
        
        {/* Content */}
        <h3 className={`font-orbitron text-xl sm:text-2xl font-bold mb-3 tracking-wide ${isDisabled ? "text-muted-foreground" : "text-foreground"}`}>
          {title}
        </h3>
        
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6">
          {description}
        </p>
        
        {/* Link indicator */}
        {!isDisabled && (
          <div className={`
            inline-flex items-center gap-2 font-semibold text-sm uppercase tracking-wider
            transition-all duration-300
            ${isOrange 
              ? "text-cs-orange group-hover:text-cs-orange-glow" 
              : "text-cs-blue group-hover:text-accent"
            }
          `}>
            <span>{isInternal ? "Open Tool" : "Launch Tool"}</span>
            {isInternal ? (
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            ) : (
              <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            )}
          </div>
        )}
      </div>
      
      {/* Bottom accent line */}
      {!isDisabled && (
        <div className={`
          absolute bottom-0 left-0 h-1 w-0 group-hover:w-full
          transition-all duration-500 ease-out
          ${isOrange ? "bg-cs-orange" : "bg-cs-blue"}
        `} />
      )}
    </>
  );

  const cardClassName = `
    group relative block overflow-hidden clip-corner
    bg-gradient-card border-2 transition-all duration-300
    ${isDisabled 
      ? "border-muted/20 cursor-default opacity-70"
      : isOrange 
        ? "border-cs-orange/20 hover:border-cs-orange/60 hover:shadow-glow" 
        : "border-cs-blue/20 hover:border-cs-blue/60 hover:shadow-glow-blue"
    }
  `;

  if (isDisabled) {
    return (
      <div className={cardClassName}>
        {cardContent}
      </div>
    );
  }

  if (isInternal) {
    return (
      <Link to={href} className={cardClassName}>
        {cardContent}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClassName}
    >
      {cardContent}
    </a>
  );
};

export default ToolCard;
