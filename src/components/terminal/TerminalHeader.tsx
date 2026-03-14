import { useEffect, useState } from 'react';

const TerminalHeader = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="terminal-box mx-3 mt-3 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-terminal-yellow text-sm">⚡</span>
        <span className="text-sm text-primary glow-cyan font-bold">QUANTBOT</span>
        <span className="text-sm text-terminal-yellow">◆</span>
        <span className="text-sm text-terminal-yellow">PAPER</span>
      </div>
      <span className="text-sm text-muted-foreground tabular-nums">
        {time.toTimeString().slice(0, 8)}
      </span>
    </header>
  );
};

export default TerminalHeader;
