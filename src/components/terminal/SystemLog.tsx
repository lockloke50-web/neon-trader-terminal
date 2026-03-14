import { systemLogs } from '@/lib/mockData';
import { useEffect, useRef, useState } from 'react';

const levelColor: Record<string, string> = {
  INFO: 'text-primary',
  WARN: 'text-terminal-yellow',
  ERROR: 'text-terminal-red',
};

const SystemLog = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [logs, setLogs] = useState(systemLogs);

  useEffect(() => {
    const msgs = [
      'Heartbeat OK — latency: 14ms',
      'New candle: ETH 1m close @ 3801.20',
      'Order book depth refreshed',
      'Strategy tick: no signal',
      'Funding rate update: BTC 0.0042%',
    ];
    const interval = setInterval(() => {
      setLogs(prev => {
        const newLog = {
          id: `l-${Date.now()}`,
          time: new Date().toISOString().slice(11, 19),
          level: 'INFO' as const,
          message: msgs[Math.floor(Math.random() * msgs.length)],
        };
        return [newLog, ...prev].slice(0, 30);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = 0;
  }, [logs]);

  return (
    <div className="terminal-box p-3 pt-5 relative">
      <span className="terminal-box-label">SYSTEM LOG</span>
      <div ref={ref} className="overflow-auto max-h-[120px]">
        {logs.map(log => (
          <div key={log.id} className="text-[11px] leading-5 flex gap-2">
            <span className="text-muted-foreground shrink-0">{log.time}</span>
            <span className={`shrink-0 ${levelColor[log.level]}`}>[{log.level}]</span>
            <span className="text-secondary-foreground truncate">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemLog;
