import { tradeHistory } from '@/lib/mockData';

interface TradeHistoryProps {
  onHoverTrade: (index: number | null) => void;
}

const TradeHistory = ({ onHoverTrade }: TradeHistoryProps) => {
  return (
    <div className="border border-primary/30 bg-card rounded-sm border-glow relative scanline flex flex-col">
      <div className="text-[10px] text-muted-foreground tracking-widest p-3 pb-1">▸ TRADE HISTORY</div>
      <div className="overflow-auto flex-1 px-3 pb-2">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="text-muted-foreground border-b border-primary/20">
              <th className="text-left py-1 font-normal">TIME</th>
              <th className="text-left py-1 font-normal">PAIR</th>
              <th className="text-left py-1 font-normal">SIDE</th>
              <th className="text-right py-1 font-normal">ENTRY</th>
              <th className="text-right py-1 font-normal">EXIT</th>
              <th className="text-right py-1 font-normal">PNL</th>
            </tr>
          </thead>
          <tbody>
            {tradeHistory.map((t, i) => (
              <tr
                key={t.id}
                className="border-b border-primary/10 hover:bg-primary/5 cursor-pointer transition-colors"
                onMouseEnter={() => onHoverTrade(i)}
                onMouseLeave={() => onHoverTrade(null)}
              >
                <td className="py-1 text-muted-foreground">{t.time}</td>
                <td className="py-1 text-secondary-foreground">{t.symbol}</td>
                <td className={`py-1 ${t.side === 'LONG' ? 'text-terminal-green' : 'text-terminal-red'}`}>
                  {t.side}
                </td>
                <td className="py-1 text-right text-secondary-foreground">{t.entry.toLocaleString()}</td>
                <td className="py-1 text-right text-secondary-foreground">{t.exit.toLocaleString()}</td>
                <td className={`py-1 text-right font-semibold ${t.pnl >= 0 ? 'text-terminal-green' : 'text-terminal-red'}`}>
                  {t.pnl >= 0 ? '+' : ''}{t.pnl.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradeHistory;
