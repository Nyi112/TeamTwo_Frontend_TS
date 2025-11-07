/** @format */

import React from "react";
import { Building2, Users, FileText, BarChart3 } from "lucide-react";

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">
            Mall management and operations overview
          </p>
        </div>
        <div className="flex items-center space-x-2 text-primary-600">
          <Building2 className="h-6 w-6" />
          <span className="font-semibold">Administrator</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Active Tenants
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">89</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Occupancy Rate
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">92%</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Pending Contracts
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">5</p>
            </div>
            <div className="p-3 bg-accent-50 rounded-lg">
              <FileText className="h-6 w-6 text-accent-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Monthly Revenue
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">$245K</p>
            </div>
            <div className="p-3 bg-primary-50 rounded-lg">
              <Building2 className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-primary-50 border border-primary-200 rounded-lg text-left hover:bg-primary-100 transition-colors">
            <Building2 className="h-6 w-6 text-primary-600 mb-2" />
            <h4 className="font-medium text-gray-900">Manage Branches</h4>
            <p className="text-sm text-gray-600 mt-1">
              Add or edit branch information
            </p>
          </button>
          <button className="p-4 bg-primary-50 border border-primary-200 rounded-lg text-left hover:bg-primary-100 transition-colors">
            <Users className="h-6 w-6 text-primary-600 mb-2" />
            <h4 className="font-medium text-gray-900">Tenant Management</h4>
            <p className="text-sm text-gray-600 mt-1">
              Manage tenant accounts and leases
            </p>
          </button>
          <button className="p-4 bg-primary-50 border border-primary-200 rounded-lg text-left hover:bg-primary-100 transition-colors">
            <FileText className="h-6 w-6 text-primary-600 mb-2" />
            <h4 className="font-medium text-gray-900">View Reports</h4>
            <p className="text-sm text-gray-600 mt-1">
              Generate financial and occupancy reports
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
