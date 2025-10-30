
import { Footer } from "~~/components/landing/footer"
import { Header } from "~~/components/landing/header"
import { PropertiesList } from "~~/components/landing/properties-list"

export default function PropertiesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="bg-white px-4 py-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 text-balance">Browse All Properties</h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover premium real estate investment opportunities on Starknet
          </p>
        </div>
      </section>

      {/* Properties Section */}
      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <PropertiesList />
        </div>
      </section>

      <Footer />
    </main>
  )
}
