import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

type TabsVariant = "default" | "glass"

const TabsContext = React.createContext<TabsVariant>("default")

function Tabs({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root> & {
  variant?: TabsVariant
}) {
  return (
    <TabsContext.Provider value={variant}>
      <TabsPrimitive.Root
        data-slot="tabs"
        className={cn("flex flex-col gap-2", className)}
        {...props}
      />
    </TabsContext.Provider>
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const variant = React.useContext(TabsContext)

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        variant === "glass" ? "bg-bg-glass-dark" : "bg-black/5 dark:bg-black/20",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const variant = React.useContext(TabsContext)

  const baseStyles = "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer"

  const variantStyles = variant === "glass"
    ? "data-[state=active]:bg-bg-glass-light data-[state=active]:text-white text-white/70 dark:data-[state=active]:text-white dark:text-white/70 dark:data-[state=active]:border-input dark:data-[state=active]:bg-bg-glass-light"
    : "data-[state=active]:bg-[#FFFFFF] dark:data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30"

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        baseStyles,
        variantStyles,
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
