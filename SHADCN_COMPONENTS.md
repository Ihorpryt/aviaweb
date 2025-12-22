# Shadcn UI Components

This document lists all the components imported from the [shadcn/ui](https://ui.shadcn.com/) library in this project.

---

## Installed Components

The following shadcn/ui components are installed in `/src/components/ui/`:

| Component | File | Description |
|-----------|------|-------------|
| **Avatar** | `avatar.tsx` | User avatar with image and fallback support |
| **Button** | `button.tsx` | Button component with multiple variants |
| **Button Group** | `button-group.tsx` | Grouped button component |
| **Calendar** | `calendar.tsx` | Date picker calendar component |
| **Combobox** | `combobox.tsx` | Searchable select/autocomplete component |
| **Command** | `command.tsx` | Command menu component (uses cmdk) |
| **Dialog** | `dialog.tsx` | Modal dialog component |
| **Dropdown Menu** | `dropdown-menu.tsx` | Dropdown menu with submenus support |
| **Input** | `input.tsx` | Text input field component |
| **Label** | `label.tsx` | Form label component |
| **Navigation Menu** | `navigation-menu.tsx` | Main navigation component |
| **Popover** | `popover.tsx` | Floating popover component |
| **Select** | `select.tsx` | Select dropdown component |
| **Separator** | `separator.tsx` | Visual separator line |
| **Table** | `table.tsx` | Table component with header, body, rows, cells |
| **Tabs** | `tabs.tsx` | Tabbed interface component |
| **Tooltip** | `tooltip.tsx` | Tooltip component |

---

## Usage by File

### Pages

#### `CreateTripQuote.tsx`
```tsx
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Combobox } from "@/components/ui/combobox"
import { Icon } from "@/components/ui/icons/Icon"
```

#### `CreateTripQuote/FlightLegRow.tsx`
```tsx
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Icon } from "@/components/ui/icons/Icon"
import { ButtonGroup } from "@/components/ui/button-group"
```

#### `Operations.tsx`
```tsx
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icons/Icon"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
```

#### `PlaceholderPage.tsx`
```tsx
import { type IconName } from "@/components/ui/icons"
```

---

### Components

#### `Nav.tsx`
```tsx
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icons/Icon"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
```

#### `PageHeader.tsx`
```tsx
import { Icon } from "@/components/ui/icons/Icon"
import { type IconName } from "@/components/ui/icons"
```

---

## Internal Component Dependencies

Some shadcn components internally use other shadcn components:

| Component | Dependencies |
|-----------|--------------|
| `combobox.tsx` | Button, Command, Popover |
| `command.tsx` | Dialog |
| `button-group.tsx` | Separator |
| `calendar.tsx` | Button |

---

## Icons

The project also includes a custom icons system in `/src/components/ui/icons/` with the main `Icon` component exported from `Icon.tsx`.

---

*Generated on: 2025-12-22*
