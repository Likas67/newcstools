import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
      {/* CS2 style logo mark */}
      <div className="relative w-12 h-12 clip-corner bg-cs-orange/20 border border-cs-orange/50 flex items-center justify-center">
        <span className="font-orbitron font-black text-xl text-cs-orange">CS</span>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-cs-orange clip-corner-sm" />
      </div>
      <div className="flex flex-col">
        <span className="font-orbitron font-bold text-lg tracking-wider text-foreground">
          CS2 <span className="text-cs-orange">TOOLS</span>
        </span>
        <span className="text-xs text-muted-foreground tracking-widest uppercase">
          Utility Hub
        </span>
      </div>
    </Link>
  );
};

export default Logo;
