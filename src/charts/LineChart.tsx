/** @format */

import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  type TooltipProps,
} from "recharts";

// Custom Tooltip props (simplified to avoid strict type mismatch)
interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export interface LineChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  color?: string;
  height?: number;
  strokeWidth?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  customTooltip?: React.FC<CustomTooltipProps>;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  xKey,
  yKey,
  color = "#667eea",
  height = 300,
  strokeWidth = 2,
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  customTooltip: CustomTooltipComponent,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="chart-container" style={{ height }}>
        <div className="chart-placeholder">No data available</div>
      </div>
    );
  }

  // ✅ Default tooltip
  const DefaultTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="font-semibold">{`Period: ${label}`}</p>
          <p className="text-blue-600">
            {`Value: ${new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(payload[0].value)}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
              // ✅ Correct rendering approach
              content={
                CustomTooltipComponent ? (
                  <CustomTooltipComponent />
                ) : (
                  <DefaultTooltip />
                )
              }
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
          )}

          {showLegend && <Legend />}

          <Line
            type="monotone"
            dataKey={yKey}
            stroke={color}
            strokeWidth={strokeWidth}
            dot={{ fill: color, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: color }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};
