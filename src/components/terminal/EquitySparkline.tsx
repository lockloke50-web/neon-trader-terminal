import { equityHistory } from '@/lib/mockData';
import { Area, AreaChart, ResponsiveContainer, YAxis } from 'recharts';

interface EquitySparklineProps {
  highlightIndex?: number | null;
}

const EquitySparkline = ({ highlightIndex }: EquitySparklineProps) => {
  const data = highlightIndex !== null && highlightIndex !== undefined
    ? equityHistory.map((d, i) => ({ ...d, highlight: i === highlightIndex ? d.equity : undefined }))
    : equityHistory;

  return (
    <div className="border border-primary/30 bg-card p-3 rounded-sm border-glow relative scanline">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] text-muted-foreground tracking-widest">▸ EQUITY CURVE</span>
        <span className="text-xs text-terminal-green glow-green">
          +{((equityHistory[equityHistory.length - 1].equity - equityHistory[0].equity) / equityHistory[0].equity * 100).toFixed(2)}%
        </span>
      </div>
      <div className="h-[72px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
            <defs>
              <linearGradient id="eqGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(180, 100%, 50%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(180, 100%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <YAxis domain={['dataMin - 100', 'dataMax + 100']} hide />
            <Area
              type="monotone"
              dataKey="equity"
              stroke="hsl(180, 100%, 50%)"
              strokeWidth={1.5}
              fill="url(#eqGradient)"
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EquitySparkline;
