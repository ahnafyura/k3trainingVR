import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="text-center space-y-8">
        <h1 className="text-6xl font-bold text-white">
          K3 VR 360° Training
        </h1>
        <p className="text-xl text-blue-200">
          Aplikasi Pelatihan Keselamatan dan Kesehatan Kerja
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link 
            href="/login" 
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold transition-all"
          >
            Login
          </Link>
          <Link 
            href="/register" 
            className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white rounded-2xl font-semibold transition-all"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
