import { stats } from '@/lib/mockData';

const StatsModule = () => {
  return (
    <div className="border border-primary/30 bg-card p-3 rounded-sm border-glow relative scanline">
      <div className="text-[10px] text-muted-foreground mb-2 tracking-widest">▸ STATISTICS</div>
      <div className="space-y-1.5">
        <Row label="Total Trades" value={stats.total_trades.toString()} />
        <Row label="Wins / Losses" value={`${stats.win_count} / ${stats.loss_count}`} />
        <Row label="Win Rate" value={`${stats.win_rate_percentage}%`} accent />
        <Row
          label="Realized Profit"
          value={`+$${stats.realized_profit.toLocaleString()}`}
          positive
        />
      </div>
    </div>
  );
};

const Row = ({ label, value, accent, positive }: { label: string; value: string; accent?: boolean; positive?: boolean }) => (
  <div className="flex justify-between text-xs">
    <span className="text-muted-foreground">{label}</span>
    <span className={
      accent ? 'text-primary glow-cyan font-semibold' :
      positive ? 'text-terminal-green glow-green' :
      'text-secondary-foreground'
    }>
      {value}
    </span>
  </div>
);

export default StatsModule;
