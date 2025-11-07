/** @format */

import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export interface BarChartYKey {
  key: string; // data key
  color?: string; // optional bar color
  label?: string; // optional legend label
}

export interface BarChartProps {
  data: any[];
  xKey: string;
  yKeys: BarChartYKey[]; // ✅ changed from string[]
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  stack?: boolean;
  barSize?: number;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  xKey,
  yKeys,
  height = 300,
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  stack = false,
  barSize = 30,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="chart-container" style={{ height }}>
        <div className="chart-placeholder">No data available</div>
      </div>
    );
  }

  return (
    <div className="chart-container" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
          <XAxis
            dataKey={xKey}
            tick={{ fill: "#666", fontSize: 12 }}
            axisLine={{ stroke: "#ddd" }}
          />
          <YAxis
            tick={{ fill: "#666", fontSize: 12 }}
            axisLine={{ stroke: "#ddd" }}
            tickFormatter={(value) => {
              if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
              if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
              return `$${value}`;
            }}
          />
          {showTooltip && (
            <Tooltip
              formatter={(value: number) => [
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(value),
                "Value",
              ]}
              labelFormatter={(label) => `Period: ${label}`}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
          )}
          {showLegend && <Legend />}
          {yKeys.map((y, index) => (
            <Bar
              key={y.key}
              dataKey={y.key}
              fill={y.color || "#8884d8"}
              stackId={stack ? "stack" : undefined}
              barSize={barSize}
              radius={[4, 4, 0, 0]}
              name={y.label || y.key} // legend label
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
