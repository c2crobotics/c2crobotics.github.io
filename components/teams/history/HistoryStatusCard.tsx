import { Card, CardContent } from "@/components/ui/card"

interface HistoryStatusCardProps {
  icon: React.ReactNode
  title: string
  description: React.ReactNode
  action?: React.ReactNode
}

export default function HistoryStatusCard({
  icon,
  title,
  description,
  action,
}: HistoryStatusCardProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <Card className="bg-white shadow-lg border-0 p-8 max-w-md w-full">
        <CardContent className="text-center">
          {icon}
          <h3 className="text-xl font-bold text-[#1a1a1f] mb-2 uppercase tracking-wide">
            {title}
          </h3>
          <div className="text-gray-500 text-sm mt-4 space-y-4">{description}</div>
          {action && <div className="mt-4">{action}</div>}
        </CardContent>
      </Card>
    </div>
  )
}
