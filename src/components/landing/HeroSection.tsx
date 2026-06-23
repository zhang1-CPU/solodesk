import { ArrowRight, Shield, WifiOff, Download } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center pt-16 pb-20 px-4 sm:px-6">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* 小标签 */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Now in public beta — free to use
        </div>

        {/* 主标题 */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
          Your Freelance Business,
          <br />
          <span className="text-emerald-500">Running in Your Browser</span>
        </h1>

        {/* 副标题 */}
        <p className="mt-6 text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          No accounts. No cloud. No monthly fees for basic use.
          Track clients, projects, time, and income — all stored locally on your device.
        </p>

        {/* CTA 按钮组 */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#/app/dashboard"
            className="group h-14 px-8 bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-semibold rounded-full shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
          >
            Start Free — No Signup Required
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#features"
            className="h-14 px-8 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-lg font-medium rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 flex items-center"
          >
            See How It Works
          </a>
        </div>

        {/* 信任标签 */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-emerald-500" />
            Privacy-first
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
          <span className="flex items-center gap-1.5">
            <WifiOff className="w-4 h-4 text-emerald-500" />
            Works offline
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
          <span className="flex items-center gap-1.5">
            <Download className="w-4 h-4 text-emerald-500" />
            Export anytime
          </span>
        </div>

        {/* 产品截图占位 */}
        <div className="mt-16 relative">
          <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden max-w-5xl mx-auto">
            {/* 浏览器标题栏 */}
            <div className="h-8 bg-slate-800 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <div className="flex-1 mx-4 h-5 bg-slate-700 rounded text-xs text-slate-400 flex items-center px-2">
                solodesk.app/dashboard
              </div>
            </div>
            {/* 模拟 Dashboard 内容 */}
            <div className="p-6 grid grid-cols-4 gap-4">
              {[
                { label: 'Monthly Income', value: '$3,240', color: 'text-emerald-400' },
                { label: 'Billable Hours', value: '45.5h', color: 'text-blue-400' },
                { label: 'Active Projects', value: '3', color: 'text-amber-400' },
                { label: 'Avg. Rate', value: '$71/h', color: 'text-purple-400' },
              ].map((stat) => (
                <div key={stat.label} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <p className="text-xs text-slate-400 mb-1">{stat.label}</p>
                  <p className={`text-2xl font-bold font-mono ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
          {/* 悬浮装饰 */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-emerald-500/20 blur-xl rounded-full" />
        </div>
      </div>
    </section>
  );
}