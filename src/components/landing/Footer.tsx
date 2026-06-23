import { Github, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-12 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            © 2026 SoloDesk. Built with privacy in mind.
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://github.com/zhang1-CPU/solodesk" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}