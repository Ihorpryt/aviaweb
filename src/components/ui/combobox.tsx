import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { Icon } from "./icons/Icon"

export function Combobox({
  id,
  open,
  onOpenChange,
  value,
  onValueChange,
  options,
  groups,
  placeholder,
  searchPlaceholder,
  emptyText,
  triggerClassName,
}: {
  id?: string
  open: boolean
  onOpenChange: (open: boolean) => void
  value: string
  onValueChange: (value: string) => void
  options?: Array<{ value: string; label: string }>
  groups?: Array<{ label: string; options: Array<{ value: string; label: string }> }>
  placeholder: string
  searchPlaceholder: string
  emptyText: string
  triggerClassName: string
}) {
  const resolvedOptions =
    groups?.flatMap((group) => group.options) ?? options ?? []
  const selectedLabel = value
    ? resolvedOptions.find((option) => option.value === value)?.label
    : undefined

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild id={id}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(triggerClassName, "relative justify-between font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(0.5rem-1px)] before:shadow-[0_-1px_0_rgba(255,255,255,0.25)]")}
        >
          <span className={cn(!selectedLabel && "text-muted-foreground", "truncate")}>
            {selectedLabel ?? placeholder}
          </span>
          {/* <ChevronsUpDown className="opacity-50" /> */}
          <Icon name="chevronDown" className="text-icon size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn(triggerClassName, "p-0")}>
        <Command>
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            {groups ? (
              groups.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {group.options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={(currentValue) => {
                        onValueChange(currentValue === value ? "" : currentValue)
                        onOpenChange(false)
                      }}
                    >
                      {option.label}
                      <Check
                        className={cn(
                          "ml-auto text-primary",
                          value === option.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))
            ) : (
              <CommandGroup>
                {(options ?? []).map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      onValueChange(currentValue === value ? "" : currentValue)
                      onOpenChange(false)
                    }}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto text-primary",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
