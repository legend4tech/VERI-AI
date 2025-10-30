"use client"

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
                <span className="text-sm font-bold text-white">BC</span>
              </div>
              <span className="font-bold text-gray-900">BrickChain</span>
            </div>
            <p className="text-sm text-gray-600">Democratizing real estate investment through blockchain technology.</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                  Properties
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                  Marketplace
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">© 2025 BrickChain. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Twitter
            </a>
            <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Discord
            </a>
            <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
