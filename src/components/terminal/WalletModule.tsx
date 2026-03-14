import { wallet } from '@/lib/mockData';

const WalletModule = () => {
  return (
    <div className="border border-primary/30 bg-card p-3 rounded-sm border-glow relative scanline">
      <div className="text-[10px] text-muted-foreground mb-2 tracking-widest">▸ WALLET</div>
      <div className="space-y-1.5">
        <Row label="Total Equity" value={`$${wallet.total_equity.toLocaleString()}`} accent />
        <Row label="Available" value={`$${wallet.available_usdt.toLocaleString()}`} />
        <Row label="Locked" value={`$${wallet.locked_usdt.toLocaleString()}`} />
        <Row
          label="Unrealized PnL"
          value={`${wallet.unrealized_pnl >= 0 ? '+' : ''}$${wallet.unrealized_pnl.toLocaleString()}`}
          positive={wallet.unrealized_pnl >= 0}
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
      positive !== undefined ? (positive ? 'text-terminal-green glow-green' : 'text-terminal-red glow-red') :
      'text-secondary-foreground'
    }>
      {value}
    </span>
  </div>
);

export default WalletModule;
