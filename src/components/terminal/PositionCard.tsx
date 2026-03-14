import { Position } from '@/lib/mockData';
import { useEffect, useState, useMemo } from 'react';

const PositionCard = ({ position }: { position: Position }) => {
  const { symbol, side, leverage, margin, entry_price, stop_loss, take_profit, duration } = position;
  const [currentPrice, setCurrentPrice] = useState(position.current_price);
  const [pnl, setPnl] = useState(position.unrealized_pnl);
  const [priceHistory, setPriceHistory] = useState<number[]>([position.current_price]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice(prev => {
        const delta = (Math.random() - 0.48) * entry_price * 0.0005;
        const next = prev + delta;
        const newPnl = side === 'LONG'
          ? (next - entry_price) / entry_price * margin * leverage
          : (entry_price - next) / entry_price * margin * leverage;
        setPnl(newPnl);
        setPriceHistory(h => [...h.slice(-40), next]);
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [entry_price, margin, leverage, side]);

  const range = take_profit - stop_loss;
  const entryPct = ((entry_price - stop_loss) / range) * 100;
  const pricePct = Math.max(0, Math.min(100, ((currentPrice - stop_loss) / range) * 100));
  const isProfit = pnl >= 0;
  const sideColor = side === 'LONG' ? 'text-terminal-green' : 'text-terminal-red';
  const sideArrow = side === 'LONG' ? '▲' : '▼';

  // Mini sparkline as ASCII dots
  const sparkline = useMemo(() => {
    if (priceHistory.length < 2) return '';
    const min = Math.min(...priceHistory);
    const max = Math.max(...priceHistory);
    const range = max - min || 1;
    const chars = '▁▂▃▄▅▆▇█';
    return priceHistory.map(p => {
      const idx = Math.floor(((p - min) / range) * (chars.length - 1));
      return chars[idx];
    }).join('');
  }, [priceHistory]);

  return (
    <div className="terminal-box p-3 pt-5 relative">
      {/* Label */}
      <span className="terminal-box-label">
        <span className={sideColor}>{sideArrow} {side}</span>
        <span className="text-secondary-foreground ml-2">{symbol.replace('/', '')}</span>
      </span>

      {/* Header line */}
      <div className="text-[11px] mb-1">
        <span className="text-muted-foreground">Entry: </span>
        <span className="text-secondary-foreground">{entry_price}</span>
        <span className="text-muted-foreground ml-3">Now: </span>
        <span className="text-secondary-foreground">{currentPrice.toFixed(5)}</span>
        <span className="text-muted-foreground ml-3">({duration})</span>
      </div>

      {/* Margin/Lev/PnL line */}
      <div className="text-[11px] mb-2">
        <span className="text-muted-foreground">Margin: </span>
        <span className="text-secondary-foreground">${margin.toFixed(2)}</span>
        <span className="text-muted-foreground ml-2">Lev: </span>
        <span className="text-secondary-foreground">{leverage}x</span>
        <span className="text-muted-foreground ml-2">PnL: </span>
        <span className={isProfit ? 'text-terminal-green' : 'text-terminal-red'}>
          {isProfit ? '+' : ''}{pnl.toFixed(4)} USDT
        </span>
      </div>

      {/* Mini sparkline */}
      <div className="text-[10px] text-terminal-green leading-none mb-1 overflow-hidden whitespace-nowrap opacity-60">
        {sparkline}
      </div>

      {/* Exits button */}
      <div className="flex justify-end mb-1">
        <span className="text-[10px] text-terminal-yellow cursor-pointer hover:underline">← EXITS</span>
      </div>

      {/* ASCII Price Track */}
      <div className="text-[11px] mb-0.5">
        <span className="text-muted-foreground">Price: </span>
        <span className="text-muted-foreground">[</span>
        <span className={side === 'LONG' ? 'text-terminal-red' : 'text-terminal-green'}>
          {side === 'LONG' ? 'S' : 'T'}
        </span>
        <span className="text-muted-foreground">]</span>

        {/* Track visualization */}
        <span className="inline-block relative" style={{ width: '60%' }}>
          <span className="text-muted-foreground">
            {'─'.repeat(Math.max(0, Math.floor(entryPct / 3)))}
          </span>
          <span className="text-muted-foreground">[E]</span>
          <span className="text-muted-foreground">
            {'─'.repeat(Math.max(0, Math.floor((100 - entryPct) / 3) - 4))}
          </span>
          {/* PnL value on the track */}
          <span className={`${isProfit ? 'text-terminal-green' : 'text-terminal-red'}`}>
            {isProfit ? '+' : ''}{pnl.toFixed(2)}
          </span>
          <span className="text-muted-foreground">
            {'─'.repeat(3)}
          </span>
        </span>

        <span className="text-muted-foreground">[</span>
        <span className={side === 'LONG' ? 'text-terminal-green' : 'text-terminal-red'}>
          {side === 'LONG' ? 'T' : 'S'}
        </span>
        <span className="text-muted-foreground">]</span>
      </div>

      {/* Entry / Now labels */}
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>entry</span>
        <span>now</span>
      </div>
    </div>
  );
};

export default PositionCard;
