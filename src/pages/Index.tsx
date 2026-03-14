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
        {/* Top Row: 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <WalletModule />
          <StatsModule />
          <EquitySparkline highlightIndex={hoveredTrade} />
        </div>

        {/* Middle Row: Trade History + System Log */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3" style={{ minHeight: '220px' }}>
          <TradeHistory onHoverTrade={setHoveredTrade} />
          <SystemLog />
        </div>

        {/* Bottom: Active Positions */}
        <div>
          <div className="text-[10px] text-muted-foreground tracking-widest mb-2 px-1">
            ▸ ACTIVE POSITIONS ({positions.length})
          </div>
          <div className="space-y-3">
            {positions.map(pos => (
              <PositionCard key={pos.id} position={pos} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-primary/20 px-4 py-1.5 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>QUANT_ENGINE :: ALPHA_BUILD</span>
        <div className="flex items-center gap-3">
          <span>LATENCY: 12ms</span>
          <span>MEM: 847MB</span>
          <span className="text-terminal-green">● OPERATIONAL</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
