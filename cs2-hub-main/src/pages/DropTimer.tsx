import { useState, useEffect } from "react";
import { ArrowLeft, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import GridBackground from "@/components/GridBackground";
import Logo from "@/components/Logo";

const DropTimer = () => {
  const [untilDrop, setUntilDrop] = useState("--");
  const [sinceDrop, setSinceDrop] = useState("--");
  const [localTime, setLocalTime] = useState("--:--:--");

  useEffect(() => {
    // Tuesday 8 PM CT = Wednesday 02:00 UTC (CT is UTC-6)
    const DROP_HOUR_UTC = 2; // 8 PM CT = 02:00 UTC next day
    const DROP_DAY_UTC = 3; // Wednesday in UTC (Tuesday 8 PM CT)

    const getNextDrop = () => {
      const now = new Date();
      const dayOfWeek = now.getUTCDay();
      let daysUntilDrop = (DROP_DAY_UTC - dayOfWeek + 7) % 7;
      
      const nextDrop = new Date(now);
      nextDrop.setUTCDate(now.getUTCDate() + daysUntilDrop);
      nextDrop.setUTCHours(DROP_HOUR_UTC, 0, 0, 0);
      
      // If we're past the drop time today (Wednesday), go to next week
      if (nextDrop.getTime() <= now.getTime()) {
        nextDrop.setUTCDate(nextDrop.getUTCDate() + 7);
      }
      
      return nextDrop;
    };

    const getLastDrop = () => {
      const now = new Date();
      const dayOfWeek = now.getUTCDay();
      let daysSinceDrop = (dayOfWeek - DROP_DAY_UTC + 7) % 7;
      
      const lastDrop = new Date(now);
      lastDrop.setUTCDate(now.getUTCDate() - daysSinceDrop);
      lastDrop.setUTCHours(DROP_HOUR_UTC, 0, 0, 0);
      
      // If we haven't reached drop time yet today, go back a week
      if (lastDrop.getTime() > now.getTime()) {
        lastDrop.setUTCDate(lastDrop.getUTCDate() - 7);
      }
      
      return lastDrop;
    };

    const formatDuration = (ms: number) => {
      const totalSeconds = Math.floor(ms / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const pad = (n: number) => n.toString().padStart(2, "0");

      if (days > 0) {
        return `${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
      }
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    const updateTimers = () => {
      const now = new Date();
      const nextDrop = getNextDrop();
      const lastDrop = getLastDrop();

      const msUntil = nextDrop.getTime() - now.getTime();
      const msSince = now.getTime() - lastDrop.getTime();

      setUntilDrop(formatDuration(msUntil));
      setSinceDrop(formatDuration(msSince));
      setLocalTime(now.toLocaleTimeString());
    };

    updateTimers();
    const interval = setInterval(updateTimers, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative">
      <GridBackground />
      
      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Logo />
          <Link 
            to="/" 
            className="flex items-center gap-2 text-muted-foreground hover:text-cs-orange transition-colors font-rajdhani font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Tools</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12 sm:py-20">
        <div className="text-center mb-12">
          {/* Decorative element */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cs-orange/50" />
            <Timer className="w-5 h-5 text-cs-orange animate-pulse-slow" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-cs-orange/50" />
          </div>
          
          <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4">
            <span className="text-gradient-primary">CS2 WEEKLY DROP</span>
          </h1>
          
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Track your weekly item drops and never miss a case or a brand-new skin.
          </p>
        </div>

        {/* Timer Card */}
        <div className="max-w-md mx-auto">
          <div className="clip-corner bg-gradient-card border-2 border-cs-orange/20 hover:border-cs-orange/40 transition-all duration-300 hover:shadow-glow p-8 sm:p-10">
            {/* Time until next drop */}
            <div className="text-center mb-8">
              <p className="font-rajdhani text-sm tracking-widest uppercase text-muted-foreground mb-3">
                Time until next drop
              </p>
              <p className="font-orbitron text-4xl sm:text-5xl font-bold text-cs-orange drop-shadow-[0_0_20px_rgba(255,107,0,0.4)]">
                {untilDrop}
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-cs-orange/30" />
              <div className="w-2 h-2 rotate-45 bg-cs-orange/40" />
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-cs-orange/30" />
            </div>

            {/* Time since last drop */}
            <div className="text-center">
              <p className="font-rajdhani text-sm tracking-widest uppercase text-muted-foreground mb-3">
                Time since last drop
              </p>
              <p className="font-orbitron text-xl sm:text-2xl font-semibold text-foreground/70">
                {sinceDrop}
              </p>
            </div>
          </div>
        </div>

        {/* Local time */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground text-sm font-rajdhani">
            Local time: <span className="text-foreground">{localTime}</span>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-4 py-8 mt-auto">
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            Drops reset every Tuesday at 8 PM Central Time (CT)
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DropTimer;
