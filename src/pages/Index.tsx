import { useState } from 'react';
import { positions } from '@/lib/mockData';
import TerminalHeader from '@/components/terminal/TerminalHeader';
import WalletModule from '@/components/terminal/WalletModule';
import StatsModule from '@/components/terminal/StatsModule';
import EquitySparkline from '@/components/terminal/EquitySparkline';
import TradeHistory from '@/components/terminal/TradeHistory';
import SystemLog from '@/components/terminal/SystemLog';
import PositionCard from '@/components/terminal/PositionCard';

const Index = () => {
  const [hoveredTrade, setHoveredTrade] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TerminalHeader />

      <div className="flex-1 p-3 space-y-3 overflow-auto">
        {/* Wallet + Stats combined row */}
        <div className="terminal-box p-3 pt-5 relative">
          <div className="absolute top-[-0.6em] left-3 bg-background px-1">
            <span className="text-[11px] text-primary">WALLET</span>
            <span className="text-[11px] text-muted-foreground mx-4">│</span>
            <span className="text-[11px] text-primary">STATISTICS</span>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <WalletModule />
            <StatsModule />
          </div>
        </div>

        {/* Trade History */}
        <TradeHistory onHoverTrade={setHoveredTrade} />

        {/* Equity Performance */}
        <EquitySparkline highlightIndex={hoveredTrade} />

        {/* System Log */}
        <SystemLog />

        {/* Active Positions */}
        <div className="space-y-3">
          {positions.map(pos => (
            <PositionCard key={pos.id} position={pos} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
