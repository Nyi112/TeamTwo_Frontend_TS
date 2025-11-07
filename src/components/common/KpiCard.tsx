/** @format */

import React from "react";

export interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: number;
  icon?: string | React.ReactNode;
  color?: string;
  loading?: boolean;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  icon,
  color = "#667eea",
  loading = false,
}) => {
  const getTrendInfo = () => {
    if (trend === undefined || trend === null) return null;

    const isPositive = trend > 0;
    const isNegative = trend < 0;
    const trendValue = Math.abs(trend);

    return {
      icon: isPositive ? "↗️" : isNegative ? "↘️" : "➡️",
      color: isPositive ? "#4caf50" : isNegative ? "#ff6b6b" : "#666",
      text: `${trendValue}%`,
    };
  };

  const trendInfo = getTrendInfo();

  if (loading) {
    return (
      <div className="kpi-card loading">
        <div className="kpi-content">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-value"></div>
          <div className="skeleton skeleton-subtitle"></div>
        </div>
        <div className="kpi-icon skeleton skeleton-icon"></div>
      </div>
    );
  }

  return (
    <div className="kpi-card" style={{ borderLeftColor: color }}>
      <div className="kpi-content">
        <h3 className="kpi-title">{title}</h3>
        <div className="kpi-value">{value}</div>
        {subtitle && <div className="kpi-subtitle">{subtitle}</div>}
        {trendInfo && (
          <div className="kpi-trend" style={{ color: trendInfo.color }}>
            <span className="trend-icon">{trendInfo.icon}</span>
            <span className="trend-text">{trendInfo.text}</span>
          </div>
        )}
      </div>
      {icon && (
        <div className="kpi-icon" style={{ color }}>
          {typeof icon === "string" ? (
            <span className="icon-emoji">{icon}</span>
          ) : (
            icon
          )}
        </div>
      )}
    </div>
  );
};
