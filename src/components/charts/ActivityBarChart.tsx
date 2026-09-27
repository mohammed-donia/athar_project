import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import type { Entry } from '../../types';

interface ActivityBarChartProps {
  entries: Entry[];
  color: string;
}

export function ActivityBarChart({ entries, color }: ActivityBarChartProps) {
  // آخر 7 أيام
  const data = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayEntries = entries.filter((e) => e.date === dateStr);
    const total = dayEntries.reduce((sum, e) => sum + e.value, 0);

    const dayNames = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
   data.push({
  day: dayNames[d.getDay()],
  value: total,
  fill: total > 0 ? color : 'transparent', 
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
        <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
          <XAxis
            dataKey="day"
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
          <Bar dataKey="value" fill={color} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}