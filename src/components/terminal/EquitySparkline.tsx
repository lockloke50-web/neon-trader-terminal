import { equityHistory } from '@/lib/mockData';
import { Bar, BarChart, ResponsiveContainer, YAxis } from 'recharts';

interface EquitySparklineProps {
  highlightIndex?: number | null;
}

const EquitySparkline = ({ highlightIndex }: EquitySparklineProps) => {
  // Transform to delta-based bars for a bar chart look
  const baseEquity = equityHistory[0].equity;
  const data = equityHistory.map((d, i) => ({
    ...d,
    delta: d.equity - baseEquity,
    fill: highlightIndex === i ? 'hsl(180, 100%, 50%)' : 'hsl(145, 100%, 64%)',
  }));

  return (
    <div className="terminal-box p-3 pt-5 relative">
      <span className="terminal-box-label">EQUITY PERFORMANCE</span>
      <div className="h-[60px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
            <YAxis domain={['dataMin', 'dataMax']} hide />
            <Bar
              dataKey="delta"
              isAnimationActive={false}
              radius={0}
            >
              {data.map((entry, index) => (
                <rect key={index} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EquitySparkline;
