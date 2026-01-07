import { useState, useMemo, type Ref } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Icon } from "@/components/ui/icons/Icon"
import { ButtonGroup } from "@/components/ui/button-group"

const AVERAGE_SPEED_KTS = 420
const MIN_DISTANCE_NM = 300
const DISTANCE_RANGE_NM = 1200

const formatMinutes = (minutes: number) => {
    const safeMinutes = Math.max(0, Math.round(minutes))
    const hours = Math.floor(safeMinutes / 60)
    const mins = safeMinutes % 60
    return `${hours}:${mins.toString().padStart(2, "0")}`
}

const hashString = (value: string) => {
    let hash = 0
    for (let i = 0; i < value.length; i += 1) {
        hash = (hash * 31 + value.charCodeAt(i)) % 100000
    }
    return hash
}

const airports = [
    {
        value: "KLAX - LOS ANGELES CALIFORNIA",
        label: "KLAX - LOS ANGELES CALIFORNIA",
    },
    {
        value: "KJFK - NEW YORK NEW YORK",
        label: "KJFK - NEW YORK NEW YORK",
    },
    {
        value: "KSFO - SAN FRANCISCO CALIFORNIA",
        label: "KSFO - SAN FRANCISCO CALIFORNIA",
    },
    {
        value: "KSEA - SEATTLE WASHINGTON",
        label: "KSEA - SEATTLE WASHINGTON",
    },
    {
        value: "KORD - CHICAGO ILLINOIS",
        label: "KORD - CHICAGO ILLINOIS",
    },
    {
        value: "KATL - ATLANTA GEORGIA",
        label: "KATL - ATLANTA GEORGIA",
    },
    {
        value: "KDEN - DENVER COLORADO",
        label: "KDEN - DENVER COLORADO",
    },
    {
        value: "KMIA - MIAMI FLORIDA",
        label: "KMIA - MIAMI FLORIDA",
    },
    {
        value: "KDFW - DALLAS FORT WORTH TEXAS",
        label: "KDFW - DALLAS FORT WORTH TEXAS",
    },
    {
        value: "KBOS - BOSTON MASSACHUSETTS",
        label: "KBOS - BOSTON MASSACHUSETTS",
    },
]

export interface Leg {
    id: string;
    fromValue: string;
    toValue: string;
    date: Date | undefined;
    departArriveValue: string;
    timeValue: string;
    tripModeValue: string;
}

type FlightLegRowProps = {
    leg: Leg;
    index: number;
    canMoveUp: boolean;
    canMoveDown: boolean;
    isNew: boolean;
    onUpdate: (updates: Partial<Leg>) => void;
    onRemove: () => void;
    onMoveUp: () => void;
    onMoveDown: () => void;
    fromRef?: Ref<HTMLButtonElement>;
    toRef?: Ref<HTMLButtonElement>;
    dateRef?: Ref<HTMLButtonElement>;
    removeRef?: Ref<HTMLButtonElement>;
}

export const FlightLegRow = ({
    leg,
    index,
    canMoveUp,
    canMoveDown,
    isNew,
    onUpdate,
    onRemove,
    onMoveUp,
    onMoveDown,
    fromRef,
    toRef,
    dateRef,
    removeRef,
}: FlightLegRowProps) => {
    const [fromOpen, setFromOpen] = useState(false)
    const [toOpen, setToOpen] = useState(false)
    const [datePickerOpen, setDatePickerOpen] = useState(false)

    const legMetrics = useMemo(() => {
        const hasRouteData = leg.fromValue && leg.toValue
        if (!hasRouteData) {
            return {
                flightTime: "0:00",
                blockTime: "0:00",
                totalTime: "0:00",
                dutyTime: "0:00",
                restTime: "0:00",
                distance: "0 NM",
            }
        }

        const seed = `${leg.fromValue}-${leg.toValue}`
        const distance = MIN_DISTANCE_NM + (hashString(seed) % DISTANCE_RANGE_NM)
        const flightMinutes = Math.round((distance / AVERAGE_SPEED_KTS) * 60)
        const blockMinutes = flightMinutes + 10

        return {
            flightTime: formatMinutes(flightMinutes),
            blockTime: formatMinutes(blockMinutes),
            totalTime: formatMinutes(blockMinutes),
            dutyTime: formatMinutes(blockMinutes + 60),
            restTime: formatMinutes(0),
            distance: `${distance} NM`,
        }
    }, [leg.fromValue, leg.toValue])

    return (
        <div
            className={cn(
                "grid grid-cols-[1fr_400px] items-center py-2",
                isNew && "animate-in fade-in slide-in-from-bottom-2 duration-300"
            )}
        >
            <div className="flex flex-row gap-2 items-center">
                <ButtonGroup
                    orientation="vertical"
                    aria-label="Position controls"
                    className="h-9 w-9"
                >
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-1/2 w-full p-0"
                        onClick={onMoveUp}
                        disabled={!canMoveUp}
                        aria-label="Move leg up"
                    >
                        <Icon name="chevronDown" className="size-3 rotate-180" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-1/2 w-full p-0"
                        onClick={onMoveDown}
                        disabled={!canMoveDown}
                        aria-label="Move leg down"
                    >
                        <Icon name="chevronDown" className="size-3" />
                    </Button>
                </ButtonGroup>

                <Popover open={fromOpen} onOpenChange={setFromOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            ref={fromRef}
                            variant="outline"
                            role="combobox"
                            className={cn(
                                "w-[308px] justify-between font-normal",
                                leg.fromValue ? "text-foreground" : "text-muted-foreground"
                            )}
                        >
                            <span className="truncate">
                                {leg.fromValue
                                    ? airports.find((airport) => airport.value === leg.fromValue)?.label
                                    : "e.g. KJFK"}
                            </span>
                            <Icon name="location" className="text-icon size-4 flex-shrink-0" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[308px] p-0">
                        <Command>
                            <CommandInput placeholder="Search airport..." className="h-9" />
                            <CommandList>
                                <CommandEmpty>No airport found.</CommandEmpty>
                                <CommandGroup>
                                    {airports.map((airport) => (
                                        <CommandItem
                                            key={airport.value}
                                            value={airport.value}
                                            onSelect={(currentValue) => {
                                                onUpdate({ fromValue: currentValue === leg.fromValue ? "" : currentValue });
                                                setFromOpen(false)
                                            }}
                                        >
                                            {airport.label}
                                            <Check
                                                className={cn(
                                                    "ml-auto text-primary",
                                                    leg.fromValue === airport.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

                <Popover open={toOpen} onOpenChange={setToOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            ref={toRef}
                            variant="outline"
                            role="combobox"
                            className={cn(
                                "w-[308px] justify-between font-normal",
                                leg.toValue ? "text-foreground" : "text-muted-foreground"
                            )}
                        >
                            <span className="truncate">
                                {leg.toValue
                                    ? airports.find((airport) => airport.value === leg.toValue)?.label
                                    : "e.g. KLAX"}
                            </span>
                            <Icon name="location" className="text-icon size-4 flex-shrink-0" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[308px] p-0">
                        <Command>
                            <CommandInput placeholder="Search airport..." className="h-9" />
                            <CommandList>
                                <CommandEmpty>No airport found.</CommandEmpty>
                                <CommandGroup>
                                    {airports.map((airport) => (
                                        <CommandItem
                                            key={airport.value}
                                            value={airport.value}
                                            onSelect={(currentValue) => {
                                                onUpdate({ toValue: currentValue === leg.toValue ? "" : currentValue });
                                                setToOpen(false)
                                            }}
                                        >
                                            {airport.label}
                                            <Check
                                                className={cn(
                                                    "ml-auto text-primary",
                                                    leg.toValue === airport.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

                <div className="flex flex-row gap-2">
                    <Select value={leg.departArriveValue} onValueChange={(val) => onUpdate({ departArriveValue: val })}>
                        <SelectTrigger className="w-[115px]">
                            <SelectValue placeholder="Depart At" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="depart">Depart At</SelectItem>
                            <SelectItem value="arrive">Arrive At</SelectItem>
                        </SelectContent>
                    </Select>

                    <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                ref={dateRef}
                                variant="outline"
                                className={cn(
                                    "w-32 justify-between font-normal",
                                    leg.date ? "text-foreground" : "text-muted-foreground"
                                )}
                            >
                                {leg.date ? leg.date.toLocaleDateString() : "Select date"}
                                <Icon name="chevronDown" className="text-icon size-4" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={leg.date}
                                captionLayout="dropdown"
                                onSelect={(d) => {
                                    onUpdate({ date: d });
                                    setDatePickerOpen(false)
                                }}
                            />
                        </PopoverContent>
                    </Popover>

                    <Input
                        type="time"
                        step="1"
                        value={leg.timeValue}
                        onChange={(event) => onUpdate({ timeValue: event.target.value })}
                        className="w-[110px] appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />

                    <Tabs value={leg.tripModeValue} onValueChange={(val) => onUpdate({ tripModeValue: val })}>
                        <TabsList>
                            <TabsTrigger value="pax">PAX</TabsTrigger>
                            <TabsTrigger value="pos">POS</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    {index > 0 ? (
                        <Button
                            ref={removeRef}
                            variant="destructive"
                            size="icon"
                            className="h-9 w-9"
                            onClick={onRemove}
                            aria-label="Remove leg"
                        >
                            <Icon name="close" className="size-4" />
                        </Button>
                    ) : (
                        <div className="w-9" />
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-1.5 pt-1 w-[400px]">
                <div className="flex flex-row items-center h-[32px]">
                    <div className="flex flex-row items-center text-center border-x border-border divide-x divide-border h-[14px] text-[14px]">
                        <div className="w-[60px] text-foreground leading-[1]">{legMetrics.flightTime}</div>
                        <div className="w-[60px] text-foreground leading-[1]">{legMetrics.blockTime}</div>
                        <div className="w-[60px] text-foreground leading-[1]">{legMetrics.totalTime}</div>
                        <div className="w-[60px] text-foreground leading-[1]">{legMetrics.dutyTime}</div>
                        <div className="w-[60px] text-foreground leading-[1]">{legMetrics.restTime}</div>
                        <div className="w-[100px] text-foreground leading-[1]">{legMetrics.distance}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
