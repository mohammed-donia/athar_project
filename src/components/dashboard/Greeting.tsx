export function Greeting() {
  const now = new Date();
  const hour = now.getHours();

  let greeting = 'مساء الخير';
  if (hour < 12) greeting = 'صباح الخير';
  else if (hour < 17) greeting = 'مساء الخير';

  const dateStr = now.toLocaleDateString('ar', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="mb-6">
      <h1 className="text-2xl md:text-3xl font-bold">
        {greeting} 👋
      </h1>
      <p className="text-sm text-neutral-500 mt-1">{dateStr}</p>
    </div>
  );
}