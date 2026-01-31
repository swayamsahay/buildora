import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-slate-900 dark:text-slate-50">
                Buildora
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Building the future of SaaS, one component at a time.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-50">
              Product
            </h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/services" className="hover:text-slate-900 dark:hover:text-slate-50">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-slate-900 dark:hover:text-slate-50">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-50">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/about" className="hover:text-slate-900 dark:hover:text-slate-50">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-slate-900 dark:hover:text-slate-50">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-50">
              Legal
            </h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-slate-50">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-slate-900 dark:hover:text-slate-50">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
          © {new Date().getFullYear()} Buildora. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
