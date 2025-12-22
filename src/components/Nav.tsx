import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { Link, NavLink, useMatch } from "react-router-dom"
import avianisLogo from "@/assets/avianis.svg"
import avianisLightLogo from "@/assets/avianis_light.svg"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icons/Icon"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"


const links = [
  { to: "/schedule", label: "Schedule", icon: "schedule" as const },
  { to: "/sales", label: "Sales", icon: "sales" as const },
  { to: "/customers", label: "Customers", icon: "customers" as const },
  { to: "/operations", label: "Operations", icon: "operations" as const },
  { to: "/airports", label: "Airports", icon: "airports" as const },
  { to: "/maintenance", label: "Maintenance", icon: "maintenance" as const },
  { to: "/crew", label: "Crew", icon: "crew" as const },
  { to: "/finance", label: "Finance", icon: "finance" as const },
  { to: "/aircraft-vendors", label: "Aircraft & Vendors", icon: "aircraftVendors" as const },
  { to: "/users", label: "Users", icon: "users" as const },
  { to: "/company", label: "Company", icon: "company" as const },
]

function NavMenuItemLink({
  to,
  label,
  icon,
}: {
  to: string
  label: string
  icon: React.ComponentProps<typeof Icon>["name"]
}) {
  const match = useMatch({ path: to, end: true })
  const isActive = match != null

  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        asChild
        active={isActive}
        className={cn(
          navigationMenuTriggerStyle(),
          "gap-1.5",
          "data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground flex flex-row h-[30px] tracking-[-0.14px]"
        )}
      >
        <NavLink to={to} end>
          <Icon name={icon} className="text-icon size-4.5" />
          {label}
        </NavLink>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

export function Nav() {
  const { setTheme, theme } = useTheme()
  const [systemTheme, setSystemTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") {
      return "dark"
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  })

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const updateSystemTheme = () => {
      setSystemTheme(mediaQuery.matches ? "dark" : "light")
    }

    updateSystemTheme()
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateSystemTheme)
      return () => mediaQuery.removeEventListener("change", updateSystemTheme)
    }

    mediaQuery.addListener(updateSystemTheme)
    return () => mediaQuery.removeListener(updateSystemTheme)
  }, [])

  const resolvedTheme = theme === "system" ? systemTheme : theme
  const logoSrc = resolvedTheme === "light" ? avianisLightLogo : avianisLogo

  return (
    <header className="border-b flex items-center gap-2 px-4 h-12 w-full h-[48px] bg-bg-2 justify-between">

      <div className="flex flex-row gap-2 items-center">
        <NavLink to="/">
          <img src={logoSrc} alt="Avianis" className="h-6" />
        </NavLink>

        <NavigationMenu viewport={false} className="ml-2 w-full max-w-none justify-start">
          <NavigationMenuList className="w-full flex-nowrap justify-start overflow-x-auto">
            {links.map(({ to, label, icon }) => (
              <NavMenuItemLink key={to} to={to} label={label} icon={icon} />
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <Button asChild size="sm" variant="outline" className="w-fit">
          <Link to="#">
            <Icon name="checkmark" className="text-[#22C45D] size-4" />
            Check-In
          </Link>
        </Button>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button asChild size="icon-sm" variant="ghost">
              <Link to="#">
                <Icon name="recent" className="text-icon size-5" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={0}>
            Recent/Following
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button asChild size="icon-sm" variant="ghost">
              <Link to="#">
                <Icon name="help" className="text-icon size-5" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={0}>
            Help
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button asChild size="icon-sm" variant="ghost">
              <Link to="#">
                <Icon name="maximize" className="text-icon size-5" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={0}>
            Full Screen
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon-sm"
              variant="ghost"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="cursor-pointer"
            >
              <Icon name="darkMode" className="text-icon size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={0}>
            Dark Mode
          </TooltipContent>
        </Tooltip>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="relative">
              <Avatar>
                {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                <AvatarFallback>IP</AvatarFallback>
              </Avatar>
              <div className="h-[11px] w-[11px] bg-[#25F109] absolute bottom-0 right-0 rounded-full border border-bg-2"></div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Keyboard shortcuts
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                New Team
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>GitHub</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuItem disabled>API</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

    </header>
  )
}
