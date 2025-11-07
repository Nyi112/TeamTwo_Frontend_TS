/** @format */

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

export interface RevenueByCategory {
  category: string;
  revenue: number;
  percentage: number;
  trend?: number;
}

export interface RevenueChartProps {
  data: RevenueByCategory[];
  height?: number;
  showTrend?: boolean;
  colors?: string[];
}

export const RevenueChart: React.FC<RevenueChartProps> = ({
  data,
  height = 300,
  showTrend = true,
  colors = ["#667eea", "#4caf50", "#ff9800", "#ff6b6b", "#2196f3", "#9c27b0"],
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="chart-container" style={{ height }}>
        <div className="chart-placeholder">No revenue data available</div>
      </div>
    );
  }

  const sortedData = [...data].sort((a, b) => b.revenue - a.revenue);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{`${label}`}</p>
          <p className="tooltip-value">
            Revenue:{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(data.revenue)}
          </p>
          <p className="tooltip-percentage">
            Contribution: {data.percentage.toFixed(1)}%
          </p>
          {showTrend && data.trend && (
            <p className="tooltip-trend">
              Trend:{" "}
              <span style={{ color: data.trend > 0 ? "#4caf50" : "#ff6b6b" }}>
                {data.trend > 0 ? "↗" : "↘"} {Math.abs(data.trend).toFixed(1)}%
              </span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const getBarColor = (entry: RevenueByCategory, index: number) => {
    return colors[index % colors.length];
  };

  return (
    <div className="chart-container" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sortedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            type="number"
            tick={{ fill: "#666", fontSize: 12 }}
            axisLine={{ stroke: "#ddd" }}
            tickFormatter={(value) => {
              if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
              if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
              return `$${value}`;
            }}
          />
          <YAxis
            type="category"
            dataKey="category"
            tick={{ fill: "#666", fontSize: 12 }}
            axisLine={{ stroke: "#ddd" }}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            dataKey="revenue"
            name="Revenue"
            barSize={30}
            radius={[0, 4, 4, 0]}
          >
            {sortedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry, index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
