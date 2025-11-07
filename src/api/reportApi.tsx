/** @format */

import API from "../api/api.js";

export const reportApi = {
  getBODKpis: () => API.get<BODKpiData>("/reports/bod-kpis"),
  getFinancialSummary: (period: string) =>
    API.get<FinancialData[]>(`/reports/financial-summary?period=${period}`),
  getOccupancyTrend: () =>
    API.get<OccupancyTrend[]>("/reports/occupancy-trend"),
  getRevenueByCategory: (period: string) =>
    API.get<RevenueByCategory[]>(
      `/reports/revenue-by-category?period=${period}`
    ),
  downloadReport: (
    reportType: string,
    format: "pdf" | "excel",
    filters?: any
  ) =>
    API.post(`/reports/download/${reportType}`, filters, {
      responseType: "blob",
      params: { format },
    }),
};

// Type definitions for the API responses
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
