import { PageHeader } from "@/components/PageHeader"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icons/Icon"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { NavLink, Navigate, Route, Routes } from "react-router-dom"
import { useState } from "react"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const operationTabs = [
    { label: "Ops Board", to: "/operations/ops-board" },
    { label: "Trip Search", to: "/operations/trip-search" },
    { label: "Flight Leg Search", to: "/operations/flight-leg-search" },
    { label: "Feasibility Search", to: "/operations/feasibility-search" },
    { label: "Cases", to: "/operations/cases" },
]

const flightLegs = [
    {
        route: "CYUL → CYYZ",
        aircraft: "N34T0",
        tripStage: "Booked",
        legStatus: "Active",
        departureLocal: "2025-10-02 14:30",
        departureUtc: "2025-10-02 18:30",
        crew: "Emily Carter, Michael Thompson",
        estimatedFlightTime: "0.83",
    },
    {
        route: "CYUL → RJAA",
        aircraft: "N34T0",
        tripStage: "Booked",
        legStatus: "Filed",
        departureLocal: "2025-10-02 14:30",
        departureUtc: "2025-10-02 18:30",
        crew: "Ava Martinez, Benjamin Garcia",
        estimatedFlightTime: "0.83",
    },
    {
        route: "EGGP → CYUL",
        aircraft: "N34T0",
        tripStage: "Booked",
        legStatus: "Arrived",
        departureLocal: "2025-10-02 14:30",
        departureUtc: "2025-10-02 18:30",
        crew: "Mia Rodriguez, Alexander Lee",
        estimatedFlightTime: "0.83",
    },
    {
        route: "OMDB → EGGP",
        aircraft: "N34T0",
        tripStage: "Booked",
        legStatus: "Arrived",
        departureLocal: "2025-10-02 14:30",
        departureUtc: "2025-10-02 18:30",
        crew: "Sophia Williams, Daniel Brown",
        estimatedFlightTime: "0.83",
    },
    {
        route: "CYUL → CYYZ",
        aircraft: "N34T0",
        tripStage: "Booked",
        legStatus: "In Review",
        departureLocal: "2025-10-02 14:30",
        departureUtc: "2025-10-02 18:30",
        crew: "Olivia Davis, James Wilson",
        estimatedFlightTime: "0.83",
    },
    {
        route: "CYUL → CYYZ",
        aircraft: "N34T0",
        tripStage: "Booked",
        legStatus: "Active",
        departureLocal: "2025-10-02 14:30",
        departureUtc: "2025-10-02 18:30",
        crew: "Isabella Hernandez, William King",
        estimatedFlightTime: "0.83",
    },
    {
        route: "OMDB → EGGP",
        aircraft: "N34T0",
        tripStage: "Booked",
        legStatus: "Arrived",
        departureLocal: "2025-10-02 14:30",
        departureUtc: "2025-10-02 18:30",
        crew: "Charlotte Wright, Noah Scott",
        estimatedFlightTime: "0.83",
    },
    {
        route: "CYUL → RJAA",
        aircraft: "N34T0",
        tripStage: "Booked",
        legStatus: "Filed",
        departureLocal: "2025-10-02 14:30",
        departureUtc: "2025-10-02 18:30",
        crew: "Evelyn Baker, Mason Nelson",
        estimatedFlightTime: "0.83",
    },
    {
        route: "OMDB → EGGP",
        aircraft: "N34T0",
        tripStage: "Booked",
        legStatus: "Arrived",
        departureLocal: "2025-10-02 14:30",
        departureUtc: "2025-10-02 18:30",
        crew: "Amelia Young, Lucas Hall",
        estimatedFlightTime: "0.83",
    },
    {
        route: "OMDB → EGGP",
        aircraft: "N34T0",
        tripStage: "Booked",
        legStatus: "Arrived",
        departureLocal: "2025-10-02 14:30",
        departureUtc: "2025-10-02 18:30",
        crew: "Harper Allen, Elijah Adams",
        estimatedFlightTime: "0.83",
    },
]

const legStatusStyles: Record<string, string> = {
    Active: "bg-sky-400",
    Filed: "bg-violet-400",
    Arrived: "bg-emerald-400",
    "In Review": "bg-amber-400",
}

function PlaceholderSection({ title }: { title: string }) {
    return (
        <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
            {title} content goes here.
        </div>
    )
}

function FlightLegSearch() {
    const [showFilters, setShowFilters] = useState(true)

    return (
        <div className="flex flex-1 min-h-0 flex-col">
            <div className="flex flex-1 min-h-0">
                <aside
                    className={cn(
                        "hidden lg:flex flex-col border-r border-border bg-bg-3 transition-all duration-300 ease-in-out overflow-hidden",
                        showFilters ? "w-56 opacity-100" : "w-0 opacity-0 border-r-0"
                    )}
                >
                    <div className="w-56 flex flex-col gap-4 px-4 py-4 text-sm text-muted-foreground">
                        <span className="uppercase text-[11px] tracking-[0.18em] whitespace-nowrap">Filter</span>
                        <Button variant="outline" size="sm" className="justify-start whitespace-nowrap">
                            Add Filter
                        </Button>
                        <div className="text-xs text-muted-foreground/70 min-w-[192px]">
                            Filter by aircraft, status, crew, or date range.
                        </div>
                    </div>
                </aside>
                <div className="flex flex-1 min-h-0 flex-col">
                    <div className="flex flex-row items-center justify-between gap-4 border-b border-border bg-background px-4 py-2">
                        <div className="flex items-center gap-2">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        onClick={() => setShowFilters(!showFilters)}
                                        className="cursor-pointer"
                                    >
                                        <Icon name="sidebar" className="text-icon size-5" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" sideOffset={0}>
                                    {showFilters ? "Hide Filters" : "Show Filters"}
                                </TooltipContent>
                            </Tooltip>
                            <Button variant="outline" size="sm" className="bg-background/60 rounded-full">
                                <Icon name="settings" className="text-icon size-4" />
                                Columns
                            </Button>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative w-60">
                                <Icon
                                    name="search"
                                    className="text-icon size-4 absolute left-2.5 top-1/2 -translate-y-1/2"
                                />
                                <Input className="h-7 pl-8 rounded-lg pb-[6px]" placeholder="Search" />
                            </div>
                            <Button size="sm">
                                <Icon name="add" className="text-[#FFFFFF] size-4" />
                                Create
                            </Button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-auto">
                        <Table>
                            <TableHeader className="bg-bg-3">
                                <TableRow>
                                    <TableHead className="w-[140px]">Route</TableHead>
                                    <TableHead className="w-[120px]">Aircraft</TableHead>
                                    <TableHead className="w-[140px]">Trip Stage</TableHead>
                                    <TableHead className="w-[150px]">Leg Status</TableHead>
                                    <TableHead className="w-[170px]">Departure Local</TableHead>
                                    <TableHead className="w-[170px]">Departure UTC</TableHead>
                                    <TableHead className="min-w-[240px]">Crew</TableHead>
                                    <TableHead className="w-[170px]">Estimated Flight Time</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {flightLegs.map((leg, index) => (
                                    <TableRow key={`${leg.route}-${index}`}>
                                        <TableCell className="text-sky-400">{leg.route}</TableCell>
                                        <TableCell>{leg.aircraft}</TableCell>
                                        <TableCell>{leg.tripStage}</TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/50 px-2 py-0.5 text-xs text-foreground">
                                                <span
                                                    className={cn(
                                                        "h-1.5 w-1.5 rounded-full",
                                                        legStatusStyles[leg.legStatus] ?? "bg-muted-foreground"
                                                    )}
                                                />
                                                {leg.legStatus}
                                            </span>
                                        </TableCell>
                                        <TableCell>{leg.departureLocal}</TableCell>
                                        <TableCell>{leg.departureUtc}</TableCell>
                                        <TableCell>{leg.crew}</TableCell>
                                        <TableCell>{leg.estimatedFlightTime}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Operations() {
    return (
        <div className="flex flex-1 min-h-0 flex-col bg-background w-full">
            <PageHeader icon="operations" title="Operations" />
            <div className="flex flex-row gap-6 border-b border-border/80 px-4">
                {operationTabs.map((tab) => (
                    <NavLink
                        key={tab.to}
                        to={tab.to}
                        className={({ isActive }) =>
                            cn(
                                "pb-3 text-sm font-medium text-muted-foreground border-b-2 border-transparent",
                                isActive && "text-foreground border-primary"
                            )
                        }
                    >
                        {tab.label}
                    </NavLink>
                ))}
            </div>
            <div className="flex flex-1 min-h-0 overflow-hidden">
                <Routes>
                    <Route index element={<Navigate to="flight-leg-search" replace />} />
                    <Route path="ops-board" element={<PlaceholderSection title="Ops Board" />} />
                    <Route path="trip-search" element={<PlaceholderSection title="Trip Search" />} />
                    <Route path="flight-leg-search" element={<FlightLegSearch />} />
                    <Route path="feasibility-search" element={<PlaceholderSection title="Feasibility Search" />} />
                    <Route path="cases" element={<PlaceholderSection title="Cases" />} />
                </Routes>
            </div>
        </div>
    )
}
