import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Check } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { Combobox } from "@/components/ui/combobox"
import { Icon } from "@/components/ui/icons/Icon"

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
]

export default function CreateTripQuote() {
    const [fromOpen, setFromOpen] = useState(false)
    const [toOpen, setToOpen] = useState(false)
    const [datePickerOpen, setDatePickerOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [fromValue, setFromValue] = useState("")
    const [toValue, setToValue] = useState("")
    const [aircraftOpen, setAircraftOpen] = useState(false)
    const [accountOpen, setAccountOpen] = useState(false)
    const [contactOpen, setContactOpen] = useState(false)
    const [tripTypeOpen, setTripTypeOpen] = useState(false)
    const [contractOpen, setContractOpen] = useState(false)
    const [aircraftValue, setAircraftValue] = useState("")
    const [accountValue, setAccountValue] = useState("")
    const [contactValue, setContactValue] = useState("")
    const [tripTypeValue, setTripTypeValue] = useState("")
    const [contractValue, setContractValue] = useState("")

    const selectOptions = [
        { value: "light", label: "Light" },
        { value: "dark", label: "Dark" },
        { value: "system", label: "System" },
    ]

    return (
        <div className="flex flex-col gap-4 p-4 bg-background w-full">

            <div className="flex flex-row items-center justify-between">
                <h3 className="font-cal-sans text-xl">Create Quote & Trip Request</h3>
                <Tabs defaultValue="quote-trip">
                    <TabsList>
                        <TabsTrigger value="quote-only">Quote Only</TabsTrigger>
                        <TabsTrigger value="trip-only">Trip Only</TabsTrigger>
                        <TabsTrigger value="quote-trip">Quote & Trip</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div className="flex flex-col border-border border rounded-lg overflow-hidden">
                <div className="flex flex-row border-border border-b p-4 gap-2 bg-bg-3 justify-between">

                    <div className="flex flex-row gap-2">
                        <Combobox
                            open={aircraftOpen}
                            onOpenChange={setAircraftOpen}
                            value={aircraftValue}
                            onValueChange={setAircraftValue}
                            options={selectOptions}
                            placeholder="Select Aircraft"
                            searchPlaceholder="Search aircraft..."
                            emptyText="No aircraft found."
                            triggerClassName="w-[348px]"
                        />

                        <Combobox
                            open={accountOpen}
                            onOpenChange={setAccountOpen}
                            value={accountValue}
                            onValueChange={setAccountValue}
                            options={selectOptions}
                            placeholder="Select Account"
                            searchPlaceholder="Search account..."
                            emptyText="No account found."
                            triggerClassName="w-[164px]"
                        />

                        <Combobox
                            open={contactOpen}
                            onOpenChange={setContactOpen}
                            value={contactValue}
                            onValueChange={setContactValue}
                            options={selectOptions}
                            placeholder="Select Contact"
                            searchPlaceholder="Search contact..."
                            emptyText="No contact found."
                            triggerClassName="w-[164px]"
                        />
                    </div>

                    <div className="flex flex-row gap-2">

                        <Combobox
                            open={tripTypeOpen}
                            onOpenChange={setTripTypeOpen}
                            value={tripTypeValue}
                            onValueChange={setTripTypeValue}
                            options={selectOptions}
                            placeholder="Select Trip Type"
                            searchPlaceholder="Search trip type..."
                            emptyText="No trip type found."
                            triggerClassName="w-[170px]"
                        />

                        <Combobox
                            open={contractOpen}
                            onOpenChange={setContractOpen}
                            value={contractValue}
                            onValueChange={setContractValue}
                            options={selectOptions}
                            placeholder="Select Contract"
                            searchPlaceholder="Search contract..."
                            emptyText="No contract found."
                            triggerClassName="w-[270px]"
                        />

                        <Tabs defaultValue="retail">
                            <TabsList>
                                <TabsTrigger value="retail">Retail</TabsTrigger>
                                <TabsTrigger value="wholesale">Wholesale</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                </div>
                <div className="flex flex-col bg-bg-2 border-border border-b gap-2.5 p-4 bg-bg-2">
                    <div className="flex flex-row gap-2">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="from">From:</Label>
                            <Popover open={fromOpen} onOpenChange={setFromOpen}>
                                <PopoverTrigger asChild id="from">
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={fromOpen}
                                        className="w-[308px] justify-between text-muted-foreground font-normal"
                                    >
                                        {fromValue
                                            ? frameworks.find((framework) => framework.value === fromValue)?.label
                                            : "e.g. KJFK"}
                                        <Icon name="location" className="text-icon size-4" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[308px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search framework..." className="h-9" />
                                        <CommandList>
                                            <CommandEmpty>No framework found.</CommandEmpty>
                                            <CommandGroup>
                                                {frameworks.map((framework) => (
                                                    <CommandItem
                                                        key={framework.value}
                                                        value={framework.value}
                                                        onSelect={(currentValue) => {
                                                            setFromValue(currentValue === fromValue ? "" : currentValue)
                                                            setFromOpen(false)
                                                        }}
                                                    >
                                                        {framework.label}
                                                        <Check
                                                            className={cn(
                                                                "ml-auto",
                                                                fromValue === framework.value ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="to">To:</Label>
                            <Popover open={toOpen} onOpenChange={setToOpen}>
                                <PopoverTrigger asChild id="to">
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={toOpen}
                                        className="w-[308px] justify-between text-muted-foreground font-normal"
                                    >
                                        {toValue
                                            ? frameworks.find((framework) => framework.value === toValue)?.label
                                            : "e.g. KLAX"}
                                        <Icon name="location" className="text-icon size-4" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[308px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search framework..." className="h-9" />
                                        <CommandList>
                                            <CommandEmpty>No framework found.</CommandEmpty>
                                            <CommandGroup>
                                                {frameworks.map((framework) => (
                                                    <CommandItem
                                                        key={framework.value}
                                                        value={framework.value}
                                                        onSelect={(currentValue) => {
                                                            setToValue(currentValue === toValue ? "" : currentValue)
                                                            setToOpen(false)
                                                        }}
                                                    >
                                                        {framework.label}
                                                        <Check
                                                            className={cn(
                                                                "ml-auto",
                                                                toValue === framework.value ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="depart">Depart / Arrive:</Label>

                            <div className="flex flex-row gap-2">
                                <Select>
                                    <SelectTrigger className="w-[115px]" id="depart">
                                        <SelectValue placeholder="Depart At" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">Light</SelectItem>
                                        <SelectItem value="dark">Dark</SelectItem>
                                        <SelectItem value="system">System</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            id="date-picker"
                                            className="w-32 justify-between text-muted-foreground font-normal"
                                        >
                                            {date ? date.toLocaleDateString() : "Select date"}
                                            <Icon name="chevronDown" className="text-icon size-4" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            captionLayout="dropdown"
                                            onSelect={(date) => {
                                                setDate(date)
                                                setDatePickerOpen(false)
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>

                                <Input
                                    type="time"
                                    id="time-picker"
                                    step="1"
                                    defaultValue="10:30:00"
                                    className="w-fit bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                />

                                <Tabs defaultValue="pax">
                                    <TabsList>
                                        <TabsTrigger value="pax">PAX</TabsTrigger>
                                        <TabsTrigger value="pos">POS</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                    <Button asChild size="default" variant="outline" className="w-fit">
                        <Link to="#">
                            <Icon name="add" className="text-foreground size-4" />
                            Add Next Flight
                        </Link>
                    </Button>
                </div>
                <div className="grid grid-cols-5 bg-bg-2 border-border border-b gap-2 pt-6 pb-8">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <span className="text-[#6C757D] text-[13px] font-bold leading-[18px] uppercase">DISTANCE</span>
                        <span className="font-cal-sans text-[24px] font-normal leading-[18px] tracking-[0.6px]">1380 NM</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2">
                        <span className="text-[#6C757D] text-[13px] font-bold leading-[18px] uppercase">FLIGHT / BLOCK</span>
                        <span className="font-cal-sans text-[24px] font-normal leading-[18px] tracking-[0.6px]">4:24 / 4:24</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2">
                        <span className="text-[#6C757D] text-[13px] font-bold leading-[18px] uppercase">TRAVEL TIME</span>
                        <span className="font-cal-sans text-[24px] font-normal leading-[18px] tracking-[0.6px]">5:06</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2">
                        <span className="text-[#6C757D] text-[13px] font-bold leading-[18px] uppercase">DAYS</span>
                        <span className="font-cal-sans text-[24px] font-normal leading-[18px] tracking-[0.6px]">2</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2">
                        <span className="text-[#6C757D] text-[13px] font-bold leading-[18px] uppercase">OVERNIGHTS</span>
                        <span className="font-cal-sans text-[24px] font-normal leading-[18px] tracking-[0.6px]">0</span>
                    </div>
                </div>
                <div className="flex flex-row p-4 justify-center gap-2 bg-bg-3">
                    <Button asChild size="default" className="min-w-[90px]">
                        <Link to="#">Create</Link>
                    </Button>
                    <Button asChild size="default" variant="outline" className="min-w-[90px]">
                        <Link to="#">Reset</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
