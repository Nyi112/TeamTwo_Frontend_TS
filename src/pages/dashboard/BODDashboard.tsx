/** @format */

import React, { useState, useEffect } from "react";
import { LineChart } from "../../charts/LineChart.js";
import { BarChart } from "../../charts/BarChart.js";
import { PieChart } from "../../charts/PieChart.js";
import { KpiCard } from "../../components/common/KpiCard.js";
import { LoadingSpinner } from "../../components/common/LoadingSpinner.js";
import { reportApi } from "../../api/reportApi.js";

import "../../assets/css/bodDashboard.css";

interface BODKpiData {
  occupancyRate: number;
  totalRevenue: number;
  netProfit: number;
  collectionRate: number;
  totalShops: number;
  occupiedShops: number;
  vacantShops: number;
}

interface FinancialData {
  period: string;
  revenue: number;
  expenses: number;
  profit: number;
}

interface OccupancyTrend {
  month: string;
  occupancyRate: number;
}

interface RevenueByCategory {
  category: string;
  revenue: number;
  percentage: number;
}

export const BODDashboard: React.FC = () => {
  const [kpiData, setKpiData] = useState<BODKpiData | null>(null);
  const [financialData, setFinancialData] = useState<FinancialData[]>([]);
  const [occupancyTrend, setOccupancyTrend] = useState<OccupancyTrend[]>([]);
  const [revenueByCategory, setRevenueByCategory] = useState<
    RevenueByCategory[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<"quarterly" | "yearly">(
    "quarterly"
  );

  useEffect(() => {
    fetchDashboardData();
  }, [selectedPeriod]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [
        kpiResponse,
        financialResponse,
        occupancyResponse,
        revenueResponse,
      ] = await Promise.all([
        reportApi.getBODKpis(),
        reportApi.getFinancialSummary(selectedPeriod),
        reportApi.getOccupancyTrend(),
        reportApi.getRevenueByCategory(selectedPeriod),
      ]);

      setKpiData(kpiResponse.data);
      setFinancialData(financialResponse.data);
      setOccupancyTrend(occupancyResponse.data);
      setRevenueByCategory(revenueResponse.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="bod-dashboard space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Board of Directors Dashboard
        </h1>
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-lg ${
              selectedPeriod === "quarterly"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSelectedPeriod("quarterly")}
          >
            Quarterly
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              selectedPeriod === "yearly"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSelectedPeriod("yearly")}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Occupancy Rate"
          value={`${kpiData?.occupancyRate || 0}%`}
          subtitle="Current mall occupancy"
          trend={2.5}
          icon="🏢"
        />
        <KpiCard
          title="Total Revenue"
          value={`$${(kpiData?.totalRevenue || 0).toLocaleString()}`}
          subtitle={`${
            selectedPeriod === "quarterly" ? "This quarter" : "This year"
          }`}
          trend={8.2}
          icon="💰"
        />
        <KpiCard
          title="Net Profit"
          value={`$${(kpiData?.netProfit || 0).toLocaleString()}`}
          subtitle="After expenses"
          trend={12.1}
          icon="📈"
        />
        <KpiCard
          title="Collection Rate"
          value={`${kpiData?.collectionRate || 0}%`}
          subtitle="Payment collection efficiency"
          trend={1.8}
          icon="🎯"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Expenses Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Revenue vs Expenses</h2>
          <BarChart
            data={financialData}
            xKey="period"
            yKeys={[
              { key: "revenue", color: "#4CAF50", label: "Revenue" },
              { key: "expenses", color: "#F44336", label: "Expenses" },
            ]}
            height={300}
          />
        </div>

        {/* Occupancy Trend Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Occupancy Trend</h2>
          <LineChart
            data={occupancyTrend}
            xKey="month"
            yKey="occupancyRate"
            color="#667eea"
            height={300}
            showTooltip={true}
            showGrid={true}
          />
        </div>
      </div>

      {/* Second Row Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue by Category */}
        <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Revenue by Category</h2>
          <div className="h-64">
            <PieChart
              data={revenueByCategory}
              dataKey="revenue"
              nameKey="category"
              height={250}
              showLabel={true}
            />
          </div>
        </div>

        {/* Shop Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Shop Distribution</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Shops</span>
              <span className="font-semibold">{kpiData?.totalShops || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-green-600">Occupied</span>
              <span className="font-semibold">
                {kpiData?.occupiedShops || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-red-600">Vacant</span>
              <span className="font-semibold">{kpiData?.vacantShops || 0}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{
                  width: `${
                    kpiData
                      ? (kpiData.occupiedShops / kpiData.totalShops) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>
            <div className="text-center text-sm text-gray-500">
              {kpiData?.occupancyRate || 0}% Occupied
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-700 mb-2">
            Average Rent per Sq Ft
          </h3>
          <p className="text-2xl font-bold text-blue-600">$45.50</p>
          <p className="text-sm text-gray-500">
            +2.3% from last {selectedPeriod}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-700 mb-2">
            Utility Efficiency
          </h3>
          <p className="text-2xl font-bold text-green-600">$3.20/sq ft</p>
          <p className="text-sm text-gray-500">-5.1% cost reduction</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-700 mb-2">Tenant Retention</h3>
          <p className="text-2xl font-bold text-purple-600">92%</p>
          <p className="text-sm text-gray-500">+3% from last year</p>
        </div>
      </div>
    </div>
  );
};
