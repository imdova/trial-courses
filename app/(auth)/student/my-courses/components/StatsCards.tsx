import { ReactNode } from "react";

// Type definitions
type ProgressCardProps = {
  title: string;
  subtitle: string;
  percentage: number;
  status: string;
  color: string;
};

type StatItemType = {
  icon: ReactNode;
  iconBg: string;
  title: string;
  value: number;
  progress: number;
  color: string;
};

type StatsCardProps = {
  title?: string;
  items: StatItemType[];
};

// Progress Card Component
export const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  subtitle,
  percentage,
  status,
  color,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h1 className="font-bold text-gray-800 flex items-center">{title}</h1>
      <h3 className="text-sm text-gray-500 mb-4">{subtitle}</h3>
      <div className="flex items-center justify-between">
        <div className="relative w-full h-32">
          <svg className="w-full h-full" viewBox="0 0 100 50">
            <path
              d="M 5,50 A 45,45 0 0 1 95,50"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="10"
            />
            <path
              d="M 5,50 A 45,45 0 0 1 95,50"
              fill="none"
              stroke={color}
              strokeWidth="10"
              strokeDasharray={Math.PI * 45}
              strokeDashoffset={Math.PI * 45 * (1 - percentage / 100)}
              strokeLinecap="round"
            />
          </svg>
          <div className="flex flex-col absolute inset-0 top-10 items-center justify-center">
            <span className="text-2xl font-bold text-gray-800">
              {percentage}%
            </span>
            <span className="text-sm font-bold text-gray-800">{status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stats Card Component
export const StatsCard: React.FC<StatsCardProps> = ({ title, items }) => {
  return (
    <div className="bg-white grid p-6 rounded-xl shadow-sm border border-gray-200">
      {title && <h3 className="font-medium text-gray-800 mb-4">{title}</h3>}
      <div className="flex flex-col justify-around gap-4 h-full">
        {items.map((item, index) => (
          <StatItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

// Stat Item Component
export const StatItem: React.FC<StatItemType> = ({
  icon,
  iconBg,
  title,
  value,
  progress,
  color,
}) => {
  return (
    <div className="flex items-center justify-between">
      <span
        className={`w-8 h-8 rounded-full flex justify-center items-center ${iconBg}`}
      >
        {icon}
      </span>
      <div className="flex-1 ml-3">
        <div className="text-sm font-medium">{title}</div>
      </div>
      <div className="relative w-8 h-8">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="3"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeDasharray="100"
            strokeDashoffset={100 - progress}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-xs text-gray-500">{value}</div>
        </div>
      </div>
    </div>
  );
};
