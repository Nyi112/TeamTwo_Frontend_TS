/** @format */

export interface OccupancyReport {
  overallOccupancyRate: number;
  totalUnits: number;
  occupiedUnits: number;
  vacantUnits: number;
  monthlyTrend: { month: string; occupancyRate: number }[];
  buildingBreakdown: {
    buildingName: string;
    occupancyRate: number;
    totalUnits: number;
    occupiedUnits: number;
  }[];
}
