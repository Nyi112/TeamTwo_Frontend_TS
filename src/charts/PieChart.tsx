/** @format */

import React from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export interface PieChartProps<T = any> {
  data: T[];
  dataKey: keyof T;
  nameKey: keyof T;
  colors?: string[];
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  showLabel?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  legendPosition?: "top" | "bottom" | "left" | "right";
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  colors = ["#667eea", "#4caf50", "#ff9800", "#ff6b6b", "#2196f3", "#9c27b0"],
  height = 300,
  innerRadius = 0,
  outerRadius = 80,
  showLabel = false,
  showTooltip = true,
  showLegend = true,
  legendPosition = "bottom",
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="chart-container" style={{ height }}>
        <div className="chart-placeholder">No data available</div>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const renderLabel = ({ name, value, percent }: any) => {
    return `${name}: ${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div className="chart-container" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
            dataKey="value"
            label={showLabel ? renderLabel : false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
          </Pie>
          {showTooltip && (
            <Tooltip
              formatter={(value: number, name: string) => [
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(value),
                name,
              ]}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
          )}
          {showLegend && (
            <Legend
              layout={
                legendPosition === "left" || legendPosition === "right"
                  ? "vertical"
                  : "horizontal"
              }
              verticalAlign={
                legendPosition === "top"
                  ? "top"
                  : legendPosition === "bottom"
                  ? "bottom"
                  : "middle" // left/right
              }
              align={
                legendPosition === "left"
                  ? "left"
                  : legendPosition === "right"
                  ? "right"
                  : "center" // top/bottom
              }
              wrapperStyle={{ paddingTop: "20px" }}
            />
          )}
        </RechartsPieChart>
      </ResponsiveContainer>
      {total > 0 && (
        <div className="pie-total">
          Total:{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(total)}
        </div>
      )}
    </div>
  );
};
