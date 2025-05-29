import { Badge } from "@/components/ui/badge"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  badge: string
}

export function SectionHeader({ title, subtitle, badge }: SectionHeaderProps) {
  return (
    <div className="text-center space-y-4 mb-12">
      <Badge variant="outline" className="px-4 py-1 text-sm">
        {badge}
      </Badge>
      <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
      {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}
