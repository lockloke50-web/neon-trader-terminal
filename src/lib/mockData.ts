export interface Position {
  id: string;
  symbol: string;
  side: 'LONG' | 'SHORT';
  leverage: number;
  margin: number;
  entry_price: number;
  current_price: number;
  stop_loss: number;
  take_profit: number;
  unrealized_pnl: number;
  duration: string;
}

export interface Trade {
  id: string;
  time: string;
  symbol: string;
  side: 'LONG' | 'SHORT';
  entry: number;
  exit: number;
  pnl: number;
  result: 'WIN' | 'LOSS';
}

export interface LogEntry {
  id: string;
  time: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  message: string;
}

export const wallet = {
  available_usdt: 12847.32,
  locked_usdt: 4200.00,
  unrealized_pnl: 342.18,
  total_equity: 17389.50,
};

export const stats = {
  total_trades: 247,
  win_count: 164,
  loss_count: 83,
  win_rate_percentage: 66.4,
  realized_profit: 8412.67,
};

export const positions: Position[] = [
  {
    id: 'p1',
    symbol: 'BTC/USDT',
    side: 'LONG',
    leverage: 30,
    margin: 1500,
    entry_price: 67234.50,
    current_price: 67892.10,
    stop_loss: 66100.00,
    take_profit: 69500.00,
    unrealized_pnl: 293.12,
    duration: '02:14:37',
  },
  {
    id: 'p2',
    symbol: 'ETH/USDT',
    side: 'SHORT',
    leverage: 20,
    margin: 800,
    entry_price: 3842.20,
    current_price: 3801.45,
    stop_loss: 3950.00,
    take_profit: 3650.00,
    unrealized_pnl: 169.44,
    duration: '00:47:12',
  },
  {
    id: 'p3',
    symbol: 'SOL/USDT',
    side: 'LONG',
    leverage: 15,
    margin: 600,
    entry_price: 148.32,
    current_price: 146.90,
    stop_loss: 143.00,
    take_profit: 158.00,
    unrealized_pnl: -57.36,
    duration: '01:33:05',
  },
];

export const tradeHistory: Trade[] = [
  { id: 't1', time: '14:32:01', symbol: 'BTC/USDT', side: 'LONG', entry: 66980.00, exit: 67450.20, pnl: 211.40, result: 'WIN' },
  { id: 't2', time: '14:18:44', symbol: 'ETH/USDT', side: 'SHORT', entry: 3890.10, exit: 3842.30, pnl: 95.60, result: 'WIN' },
  { id: 't3', time: '13:55:12', symbol: 'SOL/USDT', side: 'LONG', entry: 150.20, exit: 148.10, pnl: -63.00, result: 'LOSS' },
  { id: 't4', time: '13:41:09', symbol: 'BTC/USDT', side: 'SHORT', entry: 67100.00, exit: 67320.50, pnl: -132.30, result: 'LOSS' },
  { id: 't5', time: '13:22:30', symbol: 'DOGE/USDT', side: 'LONG', entry: 0.1245, exit: 0.1298, pnl: 42.57, result: 'WIN' },
  { id: 't6', time: '13:05:17', symbol: 'ETH/USDT', side: 'LONG', entry: 3810.00, exit: 3878.40, pnl: 179.52, result: 'WIN' },
  { id: 't7', time: '12:48:55', symbol: 'BTC/USDT', side: 'LONG', entry: 66750.00, exit: 66920.10, pnl: 76.53, result: 'WIN' },
  { id: 't8', time: '12:31:22', symbol: 'SOL/USDT', side: 'SHORT', entry: 151.40, exit: 152.80, pnl: -42.00, result: 'LOSS' },
];

export const equityHistory = [
  { time: '12:00', equity: 16800 },
  { time: '12:15', equity: 16850 },
  { time: '12:30', equity: 16920 },
  { time: '12:45', equity: 16880 },
  { time: '13:00', equity: 17050 },
  { time: '13:15', equity: 16990 },
  { time: '13:30', equity: 17100 },
  { time: '13:45', equity: 17020 },
  { time: '14:00', equity: 17200 },
  { time: '14:15', equity: 17150 },
  { time: '14:30', equity: 17390 },
];

export const systemLogs: LogEntry[] = [
  { id: 'l1', time: '14:32:01', level: 'INFO', message: 'Order filled: BUY BTC/USDT @ 67234.50 x30' },
  { id: 'l2', time: '14:32:00', level: 'INFO', message: 'Signal detected: BTC RSI oversold bounce' },
  { id: 'l3', time: '14:31:58', level: 'WARN', message: 'Slippage on ETH/USDT: 0.03% above limit' },
  { id: 'l4', time: '14:31:55', level: 'INFO', message: 'Position closed: ETH/USDT SHORT +$95.60' },
  { id: 'l5', time: '14:31:50', level: 'ERROR', message: 'Rate limit hit on exchange API, retrying...' },
  { id: 'l6', time: '14:31:45', level: 'INFO', message: 'Websocket reconnected to Binance stream' },
  { id: 'l7', time: '14:31:40', level: 'INFO', message: 'Heartbeat OK — latency: 12ms' },
  { id: 'l8', time: '14:31:35', level: 'WARN', message: 'Margin utilization at 78%, approaching limit' },
  { id: 'l9', time: '14:31:30', level: 'INFO', message: 'Strategy recalibrated: momentum factor +0.2' },
  { id: 'l10', time: '14:31:25', level: 'INFO', message: 'New candle: BTC 1m close @ 67210.80' },
];
