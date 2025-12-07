import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            About Nestora Estate
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Nestora Estate is a modern, user-first real estate marketplace that brings clarity, speed, and trust to finding your next home. Renting, buying, or listing a property has never been simpler.
          </p>
        </header>

        {/* Sections */}
        <section className="space-y-12">

          {/* 1. Mission */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 border-l-4 border-emerald-500 pl-3">
              Our Mission & Purpose
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              Our goal is simple: make property searching effortless, transparent, and trustworthy. Outdated listings, scattered details, and slow communication frustrate users. Nestora Estate solves this with fast discovery, clear information, and instant communication between users and landlords, making renting, buying, or selling smooth and stress-free.
            </p>
          </div>

          {/* 2. What We Offer */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-6 border-l-4 border-emerald-500 pl-3">
              What We Offer
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 border-l-4 border-emerald-500">
                <h3 className="font-semibold text-slate-800 mb-2">✅ Verified Listings & Real-Time Updates</h3>
                <p className="text-slate-600">Accurate property details, high-quality photos, and frequent updates.</p>
              </div>
              <div className="p-4 border-l-4 border-emerald-500">
                <h3 className="font-semibold text-slate-800 mb-2">🔎 Smart Search & Filters</h3>
                <p className="text-slate-600">Filter by budget, location, type, and category — find the perfect home faster.</p>
              </div>
              <div className="p-4 border-l-4 border-emerald-500">
                <h3 className="font-semibold text-slate-800 mb-2">🔐 Secure Accounts</h3>
                <p className="text-slate-600">JWT + Google OAuth ensures safe, secure authentication.</p>
              </div>
              <div className="p-4 border-l-4 border-emerald-500">
                <h3 className="font-semibold text-slate-800 mb-2">🧾 Listing Management & Direct Contact</h3>
                <p className="text-slate-600">Owners can create/manage listings; users can contact landlords instantly.</p>
              </div>
            </div>
          </div>

          {/* 3. Why We Stand Out */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-6 border-l-4 border-emerald-500 pl-3">
              Why Nestora Estate Stands Out
            </h2>
            <ul className="space-y-3 text-slate-600 text-lg list-disc list-inside">
              <li><strong>Performance:</strong> Fast APIs and optimized backend for smooth browsing.</li>
              <li><strong>User Experience:</strong> Clean, responsive interface across all devices.</li>
              <li><strong>Security & Trust:</strong> Encrypted data, secure login, verified activities.</li>
              <li><strong>Real Impact:</strong> Designed for real-world users — families, students, owners.</li>
              <li><strong>Transparency:</strong> Clear information, honest listings, no hidden details.</li>
            </ul>
          </div>

        </section>

        {/* CTA Section */}
        <footer className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-slate-200 pt-8">
          <div>
            <p className="text-slate-800 font-semibold text-lg">Ready to find your next home?</p>
            <p className="text-slate-600 text-sm">Explore listings, save favorites, and contact owners — all in one place.</p>
          </div>

          <div>
            <Link
              to="/sign-in"
              className="inline-block border border-slate-300 text-slate-700 px-5 py-2 rounded-md font-medium hover:bg-slate-50 transition"
            >
              Create an Account
            </Link>
          </div>
        </footer>

        {/* Footer Note */}
        <p className="mt-12 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Nestora Estate — Built to help you find the place you’ll call home.
        </p>
      </div>
    </main>
  );
};

export default About;
