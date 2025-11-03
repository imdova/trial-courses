import { Card, CardContent } from "./card";

type StatsCardProps = {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
};

export default function StatsCard({
  title,
  value,
  change,
  icon,
  iconBg,
  iconColor,
}: StatsCardProps) {
  return (
    <Card className="py-3 shadow-sm">
      <CardContent className="flex items-center gap-4 px-3">
        <div
          className={`flex h-16 min-w-16 items-center justify-center rounded-md ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>
        <div>
          <span className="block text-sm">{title}</span>
          <h1 className="font-bold">{value}</h1>
          <span className="text-primary block text-xs line-clamp-1 text-nowrap max-w-28 ">{change}</span>
        </div>
      </CardContent>
    </Card>
  );
}
