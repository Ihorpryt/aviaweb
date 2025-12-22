import { PageHeader } from "@/components/PageHeader"
import { type IconName } from "@/components/ui/icons"

export function PlaceholderPage({ title, icon }: { title: string, icon?: IconName }) {
  return (
    <div className="flex flex-col gap-4 bg-background w-full">
      <PageHeader icon={icon} title={title} />
      <div className="p-6">{title} content goes here...</div>
    </div>
  )
}

