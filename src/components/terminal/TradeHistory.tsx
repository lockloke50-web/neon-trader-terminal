import { tradeHistory } from '@/lib/mockData';

interface TradeHistoryProps {
  onHoverTrade: (index: number | null) => void;
}

const TradeHistory = ({ onHoverTrade }: TradeHistoryProps) => {
  return (
    <div className="terminal-box p-3 pt-5 relative">
      <span className="terminal-box-label">TRADE HISTORY</span>
      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-[11px]">
        {tradeHistory.map((t, i) => (
          <div
            key={t.id}
            className="flex items-center gap-2 hover:bg-primary/5 cursor-pointer px-1"
            onMouseEnter={() => onHoverTrade(i)}
            onMouseLeave={() => onHoverTrade(null)}
          >
            <span className="text-muted-foreground">{t.time}</span>
            <span className="text-secondary-foreground">{t.symbol.replace('/USDT', 'USDT').replace('/', '')}</span>
            <span className={t.side === 'LONG' ? 'text-terminal-green' : 'text-terminal-red'}>
              {t.side}
            </span>
            <span className={t.pnl >= 0 ? 'text-terminal-green' : 'text-terminal-red'}>
              {t.pnl >= 0 ? '✔' : '✖'}
            </span>
            <span className={`ml-auto tabular-nums ${t.pnl >= 0 ? 'text-terminal-green' : 'text-terminal-red'}`}>
              {t.pnl >= 0 ? '+' : ''}{t.pnl.toFixed(4)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradeHistory;
