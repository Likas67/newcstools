import { useState, useCallback } from "react";
import { ArrowLeft, Calculator, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import GridBackground from "@/components/GridBackground";
import Logo from "@/components/Logo";

const MarketFeeCalculator = () => {
  const [inputType, setInputType] = useState<"buyer" | "seller">("buyer");
  const [amount, setAmount] = useState<string>("");

  // Steam formula: ROUNDDOWN(ROUND(value/11.5, 3), 2) for game fee, ROUNDDOWN(ROUND(value/23, 3), 2) for steam fee
  const calculateSteamFee = (buyerPays: number) => {
    // Steam fee: ROUNDDOWN(ROUND(A1/23, 3), 2) with min $0.01
    const rawSteamFee = Math.floor(Math.round((buyerPays / 23) * 1000) / 10) / 100;
    return Math.max(0.01, rawSteamFee);
  };

  const calculateGameFee = (buyerPays: number) => {
    // CS2/Game fee: ROUNDDOWN(ROUND(A1/11.5, 3), 2) with min $0.01
    const rawGameFee = Math.floor(Math.round((buyerPays / 11.5) * 1000) / 10) / 100;
    return Math.max(0.01, rawGameFee);
  };

  const calculateFees = useCallback((value: number, type: "buyer" | "seller") => {
    if (type === "buyer") {
      // Buyer pays X, calculate what seller receives
      const steamFee = calculateSteamFee(value);
      const gameFee = calculateGameFee(value);
      const totalFees = steamFee + gameFee;
      const sellerReceives = Math.round((value - totalFees) * 100) / 100;
      
      return {
        buyerPays: value,
        sellerReceives: Math.max(0.01, sellerReceives),
        steamFee,
        gameFee,
        totalFees: Math.round(totalFees * 100) / 100,
      };
    } else {
      // Seller wants X, find the minimum buyer price that gives seller >= X
      // Binary search or iterate to find exact buyer price
      let buyerPays = value;
      
      // Start from seller amount and increment until we find the right price
      while (true) {
        const steamFee = calculateSteamFee(buyerPays);
        const gameFee = calculateGameFee(buyerPays);
        const sellerGets = Math.round((buyerPays - steamFee - gameFee) * 100) / 100;
        
        if (sellerGets >= value) {
          return {
            buyerPays: Math.round(buyerPays * 100) / 100,
            sellerReceives: sellerGets,
            steamFee,
            gameFee,
            totalFees: Math.round((steamFee + gameFee) * 100) / 100,
          };
        }
        buyerPays = Math.round((buyerPays + 0.01) * 100) / 100;
        
        // Safety limit
        if (buyerPays > value * 2) break;
      }
      
      // Fallback
      const steamFee = calculateSteamFee(buyerPays);
      const gameFee = calculateGameFee(buyerPays);
      return {
        buyerPays: Math.round(buyerPays * 100) / 100,
        sellerReceives: value,
        steamFee,
        gameFee,
        totalFees: Math.round((steamFee + gameFee) * 100) / 100,
      };
    }
  }, []);

  const numAmount = parseFloat(amount) || 0;
  const results = numAmount > 0 ? calculateFees(numAmount, inputType) : null;

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
            <Calculator className="w-5 h-5 text-cs-orange animate-pulse-slow" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-cs-orange/50" />
          </div>
          
          <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4">
            <span className="text-gradient-primary">MARKET FEE CALCULATOR</span>
          </h1>
          
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Calculate Steam market fees instantly. Know exactly what you'll receive.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="max-w-md mx-auto">
          <div className="clip-corner bg-gradient-card border-2 border-cs-orange/20 hover:border-cs-orange/40 transition-all duration-300 hover:shadow-glow p-8 sm:p-10">
            
            {/* Input Type Toggle */}
            <div className="flex gap-2 mb-8">
              <button
                onClick={() => setInputType("buyer")}
                className={`flex-1 py-3 px-4 font-rajdhani font-semibold text-sm uppercase tracking-wider transition-all duration-300 clip-corner-sm ${
                  inputType === "buyer"
                    ? "bg-cs-orange text-cs-dark"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10"
                }`}
              >
                Buyer Pays
              </button>
              <button
                onClick={() => setInputType("seller")}
                className={`flex-1 py-3 px-4 font-rajdhani font-semibold text-sm uppercase tracking-wider transition-all duration-300 clip-corner-sm ${
                  inputType === "seller"
                    ? "bg-cs-orange text-cs-dark"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10"
                }`}
              >
                Seller Wants
              </button>
            </div>

            {/* Amount Input */}
            <div className="mb-8">
              <label className="font-rajdhani text-sm tracking-widest uppercase text-muted-foreground mb-3 block">
                {inputType === "buyer" ? "Buyer pays" : "Seller wants to receive"}
              </label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cs-orange" />
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-white/5 border-2 border-cs-orange/20 focus:border-cs-orange/60 rounded-none clip-corner-sm py-4 pl-12 pr-4 font-orbitron text-2xl text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-300"
                />
              </div>
            </div>

            {/* Results */}
            {results && (
              <div className="space-y-4 animate-fade-in">
                {/* Divider */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent to-cs-orange/30" />
                  <div className="w-2 h-2 rotate-45 bg-cs-orange/40" />
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent to-cs-orange/30" />
                </div>

                {/* Fee Breakdown */}
                <div className="space-y-3 py-4">
                  <div className="flex justify-between items-center">
                    <span className="font-rajdhani text-muted-foreground">Steam Fee (5%)</span>
                    <span className="font-orbitron text-foreground/70">-${results.steamFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-rajdhani text-muted-foreground">CS2 Fee (10%)</span>
                    <span className="font-orbitron text-foreground/70">-${results.gameFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-white/10">
                    <span className="font-rajdhani text-muted-foreground">Total Fees</span>
                    <span className="font-orbitron text-red-400">-${results.totalFees.toFixed(2)}</span>
                  </div>
                </div>

                {/* Final Results */}
                <div className="bg-white/5 clip-corner-sm p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-rajdhani text-sm uppercase tracking-wider text-muted-foreground">Buyer Pays</span>
                    <span className="font-orbitron text-xl font-bold text-foreground">${results.buyerPays.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-rajdhani text-sm uppercase tracking-wider text-muted-foreground">Seller Receives</span>
                    <span className="font-orbitron text-2xl font-bold text-cs-orange drop-shadow-[0_0_20px_rgba(255,107,0,0.4)]">
                      ${results.sellerReceives.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground text-sm font-rajdhani">
            Fees: Steam 5% + CS2 10% = 15% total
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-4 py-8 mt-auto">
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            Calculate before you sell
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MarketFeeCalculator;
