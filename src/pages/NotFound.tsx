import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="text-6xl mb-4">🔍</div>
      <h1 className="text-2xl font-bold mb-2">الصفحة غير موجودة</h1>
      <p className="text-sm text-neutral-500 mb-6">
        الرابط اللي جربتيه ما موجود.
      </p>
      <Link to="/" className="btn-primary">
        <Home size={18} />
        العودة للرئيسية
      </Link>
    </div>
  );
}