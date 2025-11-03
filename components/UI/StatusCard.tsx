import { TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

// TypeScript interfaces
interface StatusCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  change?: number;
  changeText?: string;
}

// Status Card Component
const StatusCard: React.FC<StatusCardProps & { isLoading?: boolean }> = ({
  title,
  value,
  icon,
  color,
  change,
  changeText,
  isLoading = false,
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  // Animate value changes
  useEffect(() => {
    if (isLoading) return;

    const duration = 1000; // ms
    const frameDuration = 1000 / 60; // ~60fps
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const startValue = displayValue;
    const valueDifference = value - startValue;

    const counter = setInterval(() => {
      frame++;

      const progress = frame / totalFrames;
      const currentValue = startValue + valueDifference * progress;

      setDisplayValue(Math.floor(currentValue));

      if (frame === totalFrames) {
        clearInterval(counter);
        setDisplayValue(value);
      }
    }, frameDuration);

    return () => clearInterval(counter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, isLoading]);

  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat("en-US").format(value);
  };
  return (
    <div className="group relative">
      <div className="relative flex h-full flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 transition-all duration-300">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-gray-700">{title}</h3>
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full ${color} mb-4 text-white`}
          >
            {icon}
          </div>
        </div>

        <div>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold text-gray-800">
              {isLoading ? (
                <div className="h-8 w-20 animate-pulse rounded bg-gray-200"></div>
              ) : (
                formatNumber(displayValue)
              )}
            </span>

            {change !== undefined && (
              <div className="flex items-center text-sm">
                {isLoading ? (
                  <div className="h-5 w-16 animate-pulse rounded bg-gray-200"></div>
                ) : (
                  <>
                    {change > 0 ? (
                      <TrendingUp size={16} className="mr-1 text-green-500" />
                    ) : (
                      <TrendingDown size={16} className="mr-1 text-red-500" />
                    )}
                    <span
                      className={change > 0 ? "text-green-600" : "text-red-600"}
                    >
                      {change > 0 ? "+" : ""}
                      {change.toFixed(1)}%
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          {changeText && !isLoading && (
            <p className="mt-2 text-xs text-gray-500">{changeText}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
