import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import type { Entry } from '../../types';

interface TrendLineChartProps {
  entries: Entry[];
  color: string;
}

export function TrendLineChart({ entries, color }: TrendLineChartProps) {
 
  const data = [];
  const today = new Date();

  for (let i = 3; i >= 0; i--) {
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - i * 7 - today.getDay());
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);

    const weekEntries = entries.filter((e) => {
      const d = new Date(e.date);
      return d >= weekStart && d < weekEnd;
    });

    const total = weekEntries.reduce((sum, e) => sum + e.value, 0);

    data.push({
      week: i === 0 ? 'هذا الأسبوع' : `قبل ${i} أسابيع`,
      value: Math.round(total * 100) / 100,
    });
  }

  const hasData = data.some((d) => d.value > 0);

  if (!hasData) {
    return (
      <div className="h-48 flex items-center justify-center text-sm text-neutral-500">
        لا توجد بيانات لعرضها بعد
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
          <XAxis
            dataKey="week"
            tick={{ fontSize: 11, fill: '#9aa8a8' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#9aa8a8' }}
            axisLine={false}
            tickLine={false}
            width={30}
            orientation="right"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5ebeb',
              borderRadius: 12,
              fontSize: 12,
              direction: 'rtl',
            }}
            formatter={(value: number) => [value, 'القيمة']}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2.5}
            dot={{ r: 4, fill: color }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}