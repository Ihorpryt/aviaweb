import Add from "./svgs/add.svg?react"
import Close from "./svgs/close.svg?react"
import Search from "./svgs/search.svg?react"
import Location from "./svgs/location.svg?react"
import ChevronDown from "./svgs/chevron-down.svg?react"
import Checkmark from "./svgs/checkmark.svg?react"

import Customers from "./menu/customers.svg?react"
import Home from "./svgs/home.svg?react"
import Sales from "./menu/sales.svg?react"
import Settings from "./svgs/settings.svg?react"
import Schedule from "./menu/schedule.svg?react"
import Users from "./menu/users.svg?react"
import Wrench from "./svgs/wrench.svg?react"
import Dollar from "./svgs/dollar.svg?react"
import Aircraft from "./svgs/aircraft.svg?react"
import Operations from "./menu/operations.svg?react"
import Building from "./svgs/building.svg?react"
import Airports from "./menu/airports.svg?react"
import Maintenance from "./menu/maintenance.svg?react"
import Crew from "./menu/crew.svg?react"
import Finance from "./menu/finance.svg?react"
import Company from "./menu/company.svg?react"
import AircraftVendors from "./menu/aircraft-vendors.svg?react"
import Recent from "./svgs/recent.svg?react"
import Help from "./svgs/help.svg?react"
import Maximize from "./svgs/maximize.svg?react"
import DarkMode from "./svgs/dark-mode.svg?react"

export const icons = {
  add: Add,
  close: Close,
  search: Search,
  location: Location,
  chevronDown: ChevronDown,
  customers: Customers,
  home: Home,
  sales: Sales,
  settings: Settings,
  schedule: Schedule,
  users: Users,
  wrench: Wrench,
  dollar: Dollar,
  aircraft: Aircraft,
  building: Building,
  operations: Operations,
  airports: Airports,
  maintenance: Maintenance,
  crew: Crew,
  finance: Finance,
  company: Company,
  aircraftVendors: AircraftVendors,
  checkmark: Checkmark,
  recent: Recent,
  help: Help,
  maximize: Maximize,
  darkMode: DarkMode,
} as const

export type IconName = keyof typeof icons
