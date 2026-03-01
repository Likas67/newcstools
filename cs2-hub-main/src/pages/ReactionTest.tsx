import { useState, useRef, useCallback } from "react";
import { ArrowLeft, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import GridBackground from "@/components/GridBackground";
import { Button } from "@/components/ui/button";

type GameState = "idle" | "waiting" | "ready" | "result" | "too-early";

const ReactionTest = () => {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startTest = useCallback(() => {
    setGameState("waiting");
    setReactionTime(null);
    
    const randomDelay = Math.random() * 4000 + 1000; // 1-5 seconds
    
    timeoutRef.current = setTimeout(() => {
      startTimeRef.current = Date.now();
      setGameState("ready");
    }, randomDelay);
  }, []);

  const handleBoxClick = useCallback(() => {
    if (gameState === "waiting") {
      // Clicked too early
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setGameState("too-early");
    } else if (gameState === "ready") {
      const endTime = Date.now();
      const reaction = endTime - startTimeRef.current;
      setReactionTime(reaction);
      setGameState("result");
    }
  }, [gameState]);

  const getBoxStyles = () => {
    switch (gameState) {
      case "idle":
        return "bg-muted/20 border-muted/40";
      case "waiting":
        return "bg-red-600/80 border-red-500 cursor-pointer";
      case "ready":
        return "bg-green-500/80 border-green-400 cursor-pointer";
      case "result":
        return "bg-cs-orange/20 border-cs-orange/60";
      case "too-early":
        return "bg-red-900/50 border-red-700";
      default:
        return "bg-muted/20 border-muted/40";
    }
  };

  const getBoxContent = () => {
    switch (gameState) {
      case "idle":
        return <span className="text-muted-foreground text-lg">Press Test to start</span>;
      case "waiting":
        return <span className="text-white text-2xl font-bold">Wait...</span>;
      case "ready":
        return <span className="text-white text-2xl font-bold">CLICK!</span>;
      case "result":
        return (
          <div className="text-center">
            <span className="text-cs-orange text-4xl font-orbitron font-bold">{reactionTime}</span>
            <span className="text-cs-orange text-xl ml-1">ms</span>
          </div>
        );
      case "too-early":
        return <span className="text-red-400 text-xl font-bold">Too early!</span>;
      default:
        return null;
    }
  };

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
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-cs-orange/10 clip-corner-sm">
              <Zap className="w-8 h-8 text-cs-orange" />
            </div>
            <h1 className="font-orbitron text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Reaction Test
            </h1>
            <p className="text-muted-foreground text-lg">
              Test your reflexes. Click as fast as you can when the box turns green.
            </p>
          </div>
          
          {/* Reaction Box */}
          <div 
            onClick={handleBoxClick}
            className={`
              relative w-full aspect-[2/1] sm:aspect-[3/1] mb-6
              border-2 rounded-lg transition-all duration-200
              flex items-center justify-center
              ${getBoxStyles()}
              ${(gameState === "waiting" || gameState === "ready") ? "active:scale-[0.98]" : ""}
            `}
          >
            {getBoxContent()}
          </div>
          
          {/* Test Button */}
          <div className="flex justify-center">
            <Button
              onClick={startTest}
              disabled={gameState === "waiting" || gameState === "ready"}
              className="bg-cs-orange hover:bg-cs-orange-glow text-background font-orbitron font-bold px-8 py-6 text-lg disabled:opacity-50"
            >
              {gameState === "result" || gameState === "too-early" ? "Try Again" : "Test"}
            </Button>
          </div>
          
          {/* Stats Info */}
          {gameState === "result" && reactionTime && (
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                {reactionTime < 200 
                  ? "Excellent! You have great reflexes!" 
                  : reactionTime < 300 
                    ? "Good reaction time!" 
                    : reactionTime < 400 
                      ? "Average reaction time." 
                      : "Keep practicing!"}
              </p>
            </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-4 py-8 mt-auto">
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            Average human reaction time is around 250ms
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ReactionTest;
