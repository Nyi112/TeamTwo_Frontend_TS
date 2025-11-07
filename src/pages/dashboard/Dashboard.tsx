/** @format */

import React from "react";
import {
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: "Total Branches",
      value: "12",
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+2",
    },
    {
      title: "Active Tenants",
      value: "156",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+12",
    },
    {
      title: "Monthly Revenue",
      value: "$245,678",
      icon: DollarSign,
      color: "text-primary-600",
      bgColor: "bg-primary-50",
      change: "+8.2%",
    },
    {
      title: "Occupancy Rate",
      value: "92%",
      icon: TrendingUp,
      color: "text-accent-600",
      bgColor: "bg-accent-50",
      change: "+3%",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New lease signed",
      tenant: "Fashion Store",
      time: "2 hours ago",
    },
    {
      id: 2,
      action: "Payment received",
      tenant: "Electronics Hub",
      time: "4 hours ago",
    },
    {
      id: 3,
      action: "Maintenance request",
      tenant: "Food Court #5",
      time: "6 hours ago",
    },
    {
      id: 4,
      action: "Contract renewal",
      tenant: "Supermarket",
      time: "1 day ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Admin!</h1>
        <p className="text-primary-100">
          Here's what's happening with your mall properties today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activities
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500">{activity.tenant}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-accent-500" />
            <h3 className="text-lg font-semibold text-gray-900">
              Important Alerts
            </h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm font-medium text-red-800">
                3 contracts expiring this week
              </p>
              <p className="text-sm text-red-600">Follow up for renewals</p>
            </div>
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm font-medium text-yellow-800">
                5 overdue payments
              </p>
              <p className="text-sm text-yellow-600">Send payment reminders</p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-800">
                Maintenance scheduled
              </p>
              <p className="text-sm text-blue-600">
                Common area cleaning tomorrow
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
