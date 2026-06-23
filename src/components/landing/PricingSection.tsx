import { Check } from 'lucide-react';

const freeFeatures = [
  'Up to 3 clients',
  'Up to 5 projects',
  'Basic time tracker',
  '1 invoice per month',
  'Income & expense logging',
  'Data export (JSON/CSV)',
];

const proFeatures = [
  'Unlimited clients',
  'Unlimited projects',
  'Advanced timer + manual entries',
  'Unlimited invoices',
  'AI quote suggestions',
  'Tax reports',
  'Cloud backup sync',
  'Priority support',
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Simple pricing
          </h2>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
            Start free. Upgrade when you need more power.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Free</h3>
            <div className="mt-4 flex items-baseline">
              <span className="text-4xl font-bold text-slate-900 dark:text-white">$0</span>
              <span className="ml-2 text-slate-500 dark:text-slate-400">/month</span>
            </div>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Perfect for getting started.
            </p>
            <ul className="mt-6 space-y-3">
              {freeFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#/app/dashboard"
              className="mt-8 block w-full h-12 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
            >
              Get Started
            </a>
          </div>

          {/* Pro Plan */}
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl border-2 border-emerald-500 p-8 shadow-lg shadow-emerald-500/10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">
                Popular
              </span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Pro</h3>
            <div className="mt-4 flex items-baseline">
              <span className="text-4xl font-bold text-slate-900 dark:text-white">$12</span>
              <span className="ml-2 text-slate-500 dark:text-slate-400">/month</span>
            </div>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              or $99/year (save 31%)
            </p>
            <ul className="mt-6 space-y-3">
              {proFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <button className="mt-8 block w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}