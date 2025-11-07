/** @format */

// src/components/HomePage.tsx
import React from "react";
import {
  Building,
  Users,
  FileText,
  BarChart3,
  DollarSign,
  Shield,
  Calendar,
  Bell,
  Settings,
  LogIn,
  UserPlus,
} from "lucide-react";

const Home: React.FC = () => {
  const features = [
    {
      icon: <Building className="w-8 h-8" />,
      title: "Property Management",
      description:
        "Manage buildings, levels, and rooms with detailed space information and availability tracking.",
      color: "bg-blue-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Tenant Management",
      description:
        "Handle complete tenant lifecycle from lease creation to termination with security deposit management.",
      color: "bg-green-500",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Lease Contracts",
      description:
        "Create, update, and manage lease agreements with automated contract alerts and renewals.",
      color: "bg-purple-500",
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Billing & Invoicing",
      description:
        "Automated rent and utility billing with advanced calculation for electricity, water, and CAM fees.",
      color: "bg-yellow-500",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Financial Reports",
      description:
        "Comprehensive reporting including quarterly summaries, occupancy rates, and revenue analysis.",
      color: "bg-indigo-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Role-based Access",
      description:
        "Secure access control for BOD, Managers, Accountants, Tenants, and Administrators.",
      color: "bg-red-500",
    },
  ];

  const stats = [
    {
      label: "Active Tenants",
      value: "150+",
      description: "Currently managed leases",
    },
    {
      label: "Properties",
      value: "5",
      description: "Buildings under management",
    },
    {
      label: "Monthly Revenue",
      value: "$2.5M",
      description: "Total collections",
    },
    {
      label: "Occupancy Rate",
      value: "98%",
      description: "Current space utilization",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              {/* <Building className="h-8 w-8 text-blue-600" /> */}
              {/* <span className="ml-2 text-xl font-bold text-gray-800">
                Sein Gay Har MMS
              </span> */}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <a
                href="#features"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Features
              </a>
              <a
                href="#dashboard"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </a>
              <a
                href="#reports"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Reports
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </button>
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium flex items-center">
                <UserPlus className="w-4 h-4 mr-2" />
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Mall Management</span>
                  <span className="block text-blue-600">Simplified</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Streamline your commercial property management with our
                  comprehensive web-based platform. Automate leases, billing,
                  payments, and reporting in one integrated system.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get Started
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                    >
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 w-full bg-gradient-to-r from-blue-400 to-indigo-600 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
            <div className="text-white text-center p-8">
              <Building className="w-24 h-24 mx-auto mb-4 opacity-80" />
              <h3 className="text-2xl font-bold">
                Complete Management Solution
              </h3>
              <p className="mt-2 opacity-90">
                From lease to payment, all in one platform
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-lg font-medium text-gray-600">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to manage your mall
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Based on comprehensive user stories and real-world property
              management needs
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div
                      className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Role-based Access Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              Role-based Access
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Tailored experience for every user
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Board of Directors
                </h3>
              </div>
              <p className="text-gray-600">
                High-level financial summaries, occupancy reports, and strategic
                analytics without operational details.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Property Manager
                </h3>
              </div>
              <p className="text-gray-600">
                Complete operational control including lease management, tenant
                relations, and property oversight.
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <div className="flex items-center mb-4">
                <DollarSign className="w-6 h-6 text-purple-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Accountant
                </h3>
              </div>
              <p className="text-gray-600">
                Financial transaction management, payment processing, receipt
                generation, and daily collection reports.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">
              Ready to transform your mall management?
            </span>
            <span className="block text-blue-200">
              Start your digital transformation today.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Get Started
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <div className="flex items-center">
                <Building className="h-8 w-8 text-white" />
                <span className="ml-2 text-xl font-bold text-white">
                  Sein Gay Har MMS
                </span>
              </div>
              <p className="text-gray-300 text-base">
                Comprehensive mall management solution streamlining operations,
                billing, and tenant relations.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    Solutions
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-300 hover:text-white"
                      >
                        Property Management
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-300 hover:text-white"
                      >
                        Tenant Management
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-300 hover:text-white"
                      >
                        Billing & Invoicing
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    Support
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-300 hover:text-white"
                      >
                        Documentation
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-300 hover:text-white"
                      >
                        Guides
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-300 hover:text-white"
                      >
                        API Status
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 xl:text-center">
              &copy; 2024 Sein Gay Har Mall Management System. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
