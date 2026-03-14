import { wallet } from '@/lib/mockData';

const WalletModule = () => {
  return (
    <div className="flex-1">
      <div className="text-[11px] leading-relaxed">
        <div className="flex gap-2">
          <span className="text-muted-foreground">Available$</span>
          <span className="text-secondary-foreground">{wallet.available_usdt.toFixed(2)} USDT</span>
        </div>
        <div className="flex gap-2">
          <span className="text-muted-foreground">Locked   $</span>
          <span className="text-secondary-foreground">{wallet.locked_usdt.toFixed(2)} USDT</span>
        </div>
        <div className="flex gap-2">
          <span className="text-muted-foreground">uPnL</span>
          <span className={wallet.unrealized_pnl >= 0 ? 'text-terminal-green' : 'text-terminal-red'}>
            {wallet.unrealized_pnl >= 0 ? '+' : ''}{wallet.unrealized_pnl.toFixed(4)} USDT
          </span>
        </div>
        <div className="flex gap-2">
          <span className="text-muted-foreground">Equity   $</span>
          <span className="text-secondary-foreground">{wallet.total_equity.toFixed(2)} USDT</span>
        </div>
      </div>
    </div>
  );
};

export default WalletModule;
