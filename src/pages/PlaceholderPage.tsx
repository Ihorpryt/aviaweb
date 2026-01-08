import { PageHeader } from "@/components/PageHeader"
import { type IconName } from "@/components/ui/icons"

export function PlaceholderPage({ title, icon }: { title: string, icon?: IconName }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <PageHeader icon={icon} title={title} />
      <div className="p-6 text-foreground bg-background">{title} content goes here...</div>
    </div>
  )
}

