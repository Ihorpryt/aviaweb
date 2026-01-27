import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

type TabsVariant = "default" | "glass"
type TabsSize = "default" | "xsmall"

type TabsContextValue = {
  variant: TabsVariant
  size: TabsSize
}

const TabsContext = React.createContext<TabsContextValue>({
  variant: "default",
  size: "default",
})

function Tabs({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root> & {
  variant?: TabsVariant
  size?: TabsSize
}) {
  return (
    <TabsContext.Provider value={{ variant, size }}>
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
  const { variant, size } = React.useContext(TabsContext)

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "text-muted-foreground inline-flex w-fit items-center justify-center rounded-lg p-[3px]",
        size === "xsmall" ? "h-[22px] p-[2px] rounded-md" : "h-9",
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
  const { variant, size } = React.useContext(TabsContext)

  const baseStyles = "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer"

  const sizeStyles = size === "xsmall" ? "text-xs rounded-sm h-[18px] px-1" : "text-sm"

  const variantStyles = variant === "glass"
    ? "data-[state=active]:bg-bg-glass-light data-[state=active]:text-white text-white/70 dark:data-[state=active]:text-white dark:text-white/70 dark:data-[state=active]:border-input dark:data-[state=active]:bg-bg-glass-light"
    : "data-[state=active]:bg-[#FFFFFF] dark:data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30"

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        baseStyles,
        sizeStyles,
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
