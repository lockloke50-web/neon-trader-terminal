import { useEffect, useState } from 'react';

const TerminalHeader = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-b border-primary/30 bg-card px-4 py-2 flex items-center justify-between flex-wrap gap-2">
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">QUANT_TERMINAL</span>
        <span className="text-xs text-primary glow-cyan">v2.4.1</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse-dot" />
          <span className="text-xs text-terminal-green">WS:CONNECTED</span>
        </div>
        <span className="text-xs text-terminal-yellow px-2 py-0.5 border border-terminal-yellow/40 rounded-sm">
          SIMULATION
        </span>
        <span className="text-xs text-muted-foreground tabular-nums">
          {time.toISOString().slice(0, 19).replace('T', ' ')} UTC
        </span>
      </div>
    </header>
  );
};

export default TerminalHeader;
