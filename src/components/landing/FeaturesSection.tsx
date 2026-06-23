import { Shield, Zap, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: Shield,
    iconBg: 'bg-emerald-50 dark:bg-emerald-500/10',
    iconColor: 'text-emerald-500',
    title: 'Privacy by Design',
    description: 'Your data never touches our servers. We literally cannot see your information. Export your data as JSON anytime.',
  },
  {
    icon: Zap,
    iconBg: 'bg-blue-50 dark:bg-blue-500/10',
    iconColor: 'text-blue-500',
    title: 'Works Offline',
    description: 'No internet? No problem. Track time in a coffee shop, generate invoices on a plane. Your data stays on your device.',
  },
  {
    icon: BarChart3,
    iconBg: 'bg-purple-50 dark:bg-purple-500/10',
    iconColor: 'text-purple-500',
    title: 'Know Your Real Hourly Rate',
    description: 'Stop guessing. See exactly how much you earn per hour after expenses, automatically calculated from your tracked time.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Everything you need, nothing you don't
          </h2>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            A focused toolkit for independent workers. No bloat, no enterprise complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className={`w-12 h-12 rounded-lg ${feature.iconBg} flex items-center justify-center mb-6`}>
                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}