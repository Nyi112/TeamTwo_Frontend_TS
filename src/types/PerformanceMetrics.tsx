/** @format */

export interface PerformanceMetrics {
  collectionRate: number;
  collectionTrend: number;
  occupancyTrend: number;
  utilityEfficiencyTrend: number;
  averageRentPerSqFt: number;
  utilityCostPerSqFt: number;
  camRecoveryRate: number;
  averageTenantSize: number;
  collectionHistory: { period: string; collectionRate: number }[];
  utilityEfficiencyHistory: { period: string; costPerSqFt: number }[];
}
