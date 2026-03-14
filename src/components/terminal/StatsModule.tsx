import { stats } from '@/lib/mockData';

const StatsModule = () => {
  return (
    <div className="flex-1">
      <div className="text-[11px] leading-relaxed">
        <div className="flex gap-2">
          <span className="text-muted-foreground">Trades</span>
          <span className="text-secondary-foreground">{stats.total_trades}</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-terminal-green">✔ {stats.win_count}W</span>
          <span className="text-terminal-red">✖ {stats.loss_count}L</span>
          <span className="text-muted-foreground">Rate</span>
          <span className="text-secondary-foreground">{stats.win_rate_percentage}%</span>
        </div>
        <div className="flex gap-2">
          <span className="text-muted-foreground">Realized</span>
          <span className="text-terminal-green">+{stats.realized_profit.toFixed(4)} USDT</span>
        </div>
      </div>
    </div>
  );
};

export default StatsModule;
