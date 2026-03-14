import { Position } from '@/lib/mockData';
import { useEffect, useState } from 'react';

const PositionCard = ({ position }: { position: Position }) => {
  const { symbol, side, leverage, margin, entry_price, stop_loss, take_profit, duration } = position;
  const [currentPrice, setCurrentPrice] = useState(position.current_price);
  const [pnl, setPnl] = useState(position.unrealized_pnl);

  // Simulate price movement
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice(prev => {
        const delta = (Math.random() - 0.48) * entry_price * 0.0005;
        const next = prev + delta;
        const newPnl = side === 'LONG'
          ? (next - entry_price) / entry_price * margin * leverage
          : (entry_price - next) / entry_price * margin * leverage;
        setPnl(newPnl);
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [entry_price, margin, leverage, side]);

  // Calculate slider position: 0% = stop_loss, 100% = take_profit
  const range = take_profit - stop_loss;
  const entryPct = ((entry_price - stop_loss) / range) * 100;
  const pricePct = Math.max(0, Math.min(100, ((currentPrice - stop_loss) / range) * 100));

  const isProfit = pnl >= 0;
  const sideColor = side === 'LONG' ? 'text-terminal-green' : 'text-terminal-red';

  return (
    <div className="border border-primary/30 bg-card p-4 rounded-sm border-glow relative scanline">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-sm text-primary font-semibold glow-cyan">{symbol}</span>
          <span className={`text-xs font-semibold ${sideColor}`}>{side}</span>
          <span className="text-[10px] text-terminal-yellow border border-terminal-yellow/30 px-1.5 py-0.5 rounded-sm">
            {leverage}x
          </span>
        </div>
        <span className={`text-sm font-bold tabular-nums ${isProfit ? 'text-terminal-green glow-green' : 'text-terminal-red glow-red'}`}>
          {isProfit ? '+' : ''}{pnl.toFixed(2)} USDT
        </span>
      </div>

      {/* PnL Slider Track */}
      <div className="relative h-8 mb-3">
        {/* Track background */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-muted rounded-full" />

        {/* Colored fill from entry to current */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 h-1 rounded-full ${isProfit ? 'bg-terminal-green/60' : 'bg-terminal-red/60'}`}
          style={{
            left: `${Math.min(entryPct, pricePct)}%`,
            width: `${Math.abs(pricePct - entryPct)}%`,
          }}
        />

        {/* Stop Loss marker */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 flex flex-col items-center">
          <div className="w-px h-4 bg-terminal-red" />
          <span className="text-[9px] text-terminal-red mt-0.5">[S]</span>
        </div>

        {/* Entry marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
          style={{ left: `${entryPct}%` }}
        >
          <div className="w-px h-4 bg-muted-foreground" />
          <span className="text-[9px] text-muted-foreground mt-0.5">[E]</span>
        </div>

        {/* Take Profit marker */}
        <div className="absolute top-1/2 -translate-y-1/2 right-0 flex flex-col items-center">
          <div className="w-px h-4 bg-terminal-green" />
          <span className="text-[9px] text-terminal-green mt-0.5">[T]</span>
        </div>

        {/* Current price indicator */}
        <div
          className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ease-out"
          style={{ left: `${pricePct}%` }}
        >
          <div className={`w-2.5 h-2.5 rounded-full -translate-x-1/2 -translate-y-0 ${isProfit ? 'bg-terminal-green shadow-[0_0_8px_hsl(145,100%,64%,0.6)]' : 'bg-terminal-red shadow-[0_0_8px_hsl(0,100%,67%,0.6)]'}`} />
        </div>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-5 gap-2 text-[10px]">
        <MetaItem label="MARGIN" value={`$${margin}`} />
        <MetaItem label="ENTRY" value={entry_price.toLocaleString()} />
        <MetaItem label="MARK" value={currentPrice.toFixed(2)} highlight />
        <MetaItem label="SL / TP" value={`${stop_loss} / ${take_profit}`} />
        <MetaItem label="UPTIME" value={duration} />
      </div>
    </div>
  );
};

const MetaItem = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div>
    <div className="text-muted-foreground">{label}</div>
    <div className={`tabular-nums ${highlight ? 'text-primary' : 'text-secondary-foreground'}`}>{value}</div>
  </div>
);

export default PositionCard;
