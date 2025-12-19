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
import { ButtonGroup } from "@/components/ui/button-group"

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

const aircraftGroups = [
    {
        label: "Managed",
        options: [
            { value: "A321-200 - N131NN", label: "A321-200 - N131NN" },
            { value: "Boeing 737 - N3730B", label: "Boeing 737 - N3730B" },
            { value: "Boeing 737 - N925NN", label: "Boeing 737 - N925NN" },
            { value: "Boeing 787 - N17002", label: "Boeing 787 - N17002" },
            {
                value: "Bombardier Global 6000 - N1CE",
                label: "Bombardier Global 6000 - N1CE",
            },
            {
                value: "Bombardier Global Express XRS - N2900D",
                label: "Bombardier Global Express XRS - N2900D",
            },
            { value: "Challenger 650 - N1DPJ", label: "Challenger 650 - N1DPJ" },
            { value: "Falcon 8X - N07IS", label: "Falcon 8X - N07IS" },
            { value: "Global 7500 - N17WT", label: "Global 7500 - N17WT" },
            { value: "Gulfstream G600 - N3WR", label: "Gulfstream G600 - N3WR" },
            { value: "Gulfstream G650 - N34T0", label: "Gulfstream G650 - N34T0" },
            { value: "Pilatus PC-12 - N1GL", label: "Pilatus PC-12 - N1GL" },
            { value: "Sikorsky S92 - N33DY", label: "Sikorsky S92 - N33DY" },
        ],
    },
    {
        label: "Vendor",
        options: [
            {
                value: "Bombardier Challenger 605 - G1BLY (Howl's Moving Castle)",
                label: "Bombardier Challenger 605 - G1BLY (Howl's Moving Castle)",
            },
            { value: "Challenger 600 - N44JP (Jupiter Jets)", label: "Challenger 600 - N44JP (Jupiter Jets)" },
            {
                value: "Challenger 650 - T070RO (Howl's Moving Castle)",
                label: "Challenger 650 - T070RO (Howl's Moving Castle)",
            },
            { value: "Citation X - N00UM (Jupiter Jets)", label: "Citation X - N00UM (Jupiter Jets)" },
        ],
    },
    {
        label: "Fleets",
        options: [
            {
                value: "Gulfstream G650 - BOOKED AS SUPER-MID",
                label: "Gulfstream G650 - BOOKED AS SUPER-MID",
            },
            {
                value: "Bombardier Challenger 604 - CL-604-1",
                label: "Bombardier Challenger 604 - CL-604-1",
            },
            {
                value: "Bombardier/Canadair Regional Jet - CRJ-100",
                label: "Bombardier/Canadair Regional Jet - CRJ-100",
            },
            {
                value: "Pilatus PC-24 - East Coast Light Jets",
                label: "Pilatus PC-24 - East Coast Light Jets",
            },
            {
                value: "Global 7500 - Long Range Aircraft",
                label: "Global 7500 - Long Range Aircraft",
            },
        ],
    },
]

export default function CreateTripQuote() {
    const [requestTab, setRequestTab] = useState("quote-trip")
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
    const tripTypeOptions = [
        { value: "n/a", label: "N/A" },
        { value: "wholesale", label: "Wholesale" },
        { value: "owner", label: "Owner" },
        { value: "charter", label: "Charter" },
        { value: "training", label: "Training" },
        { value: "maintenance", label: "Maintenance" },
    ]
    const contactOptions = [
        { value: "john-smith", label: "John Smith" },
        { value: "emily-johnson", label: "Emily Johnson" },
        { value: "michael-williams", label: "Michael Williams" },
        { value: "sarah-brown", label: "Sarah Brown" },
        { value: "david-jones", label: "David Jones" },
    ]
    const accountOptions = [
        { value: "account-one", label: "Account One" },
        { value: "account-two", label: "Account Two" },
        { value: "account-three", label: "Account Three" },
    ]
    const contractOptions = [
        { value: "default-contract", label: "Default Contract (Block Time)" },
    ]
    const requestTitles: Record<string, string> = {
        "quote-only": "Create Quote Request",
        "trip-only": "Create Trip Request",
        "quote-trip": "Create Quote & Trip Request",
    }
    const requestTitle = requestTitles[requestTab] ?? "Create Quote & Trip Request"

    return (
        <div className="flex flex-col gap-4 p-4 bg-background w-full">

            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-2">
                    <Icon name="sales" className="text-icon size-6" />
                    <h3 className="font-cal-sans text-xl">
                        <span
                            key={requestTab}
                            className="inline-block animate-in fade-in slide-in-from-bottom-1 duration-300"
                        >
                            {requestTitle}
                        </span>
                    </h3>
                </div>
                <Tabs value={requestTab} onValueChange={setRequestTab}>
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
                            groups={aircraftGroups}
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
                            options={accountOptions}
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
                            options={contactOptions}
                            placeholder="Select Contact"
                            searchPlaceholder="Search contact..."
                            emptyText="No contact found."
                            triggerClassName="w-[164px]"
                        />
                    </div>

                    <div className="flex flex-row gap-2">

                        {requestTab !== "quote-only" && (
                            <Combobox
                                open={tripTypeOpen}
                                onOpenChange={setTripTypeOpen}
                                value={tripTypeValue}
                                onValueChange={setTripTypeValue}
                                options={tripTypeOptions}
                                placeholder="Select Trip Type"
                                searchPlaceholder="Search trip type..."
                                emptyText="No trip type found."
                                triggerClassName="w-[170px]"
                            />
                        )}

                        {requestTab !== "trip-only" && (
                            <>
                                <Combobox
                                    open={contractOpen}
                                    onOpenChange={setContractOpen}
                                    value={contractValue}
                                    onValueChange={setContractValue}
                                    options={contractOptions}
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
                            </>
                        )}
                    </div>

                </div>
                <div className="flex flex-col bg-bg-2 border-border border-b gap-2.5 p-4 bg-bg-2">
                    <div className="flex flex-row gap-2">
                        <div className="flex flex-row items-end gap-2">
                            <ButtonGroup
                                orientation="vertical"
                                aria-label="Position controls"
                                className="h-9 w-9 self-end"
                            >
                                <Button variant="outline" size="icon" className="h-1/2 w-full p-0">
                                    <Icon name="chevronDown" className="size-3 rotate-180" />
                                </Button>
                                <Button variant="outline" size="icon" className="h-1/2 w-full p-0">
                                    <Icon name="chevronDown" className="size-3" />
                                </Button>
                            </ButtonGroup>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="from">From:</Label>
                            <Popover open={fromOpen} onOpenChange={setFromOpen}>
                                <PopoverTrigger asChild id="from">
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={fromOpen}
                                        className={cn(
                                            "w-[308px] justify-between font-normal",
                                            fromValue ? "text-foreground" : "text-muted-foreground"
                                        )}
                                    >
                                        {fromValue
                                            ? airports.find((airport) => airport.value === fromValue)?.label
                                            : "e.g. KJFK"}
                                        <Icon name="location" className="text-icon size-4" />
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
                                                            setFromValue(currentValue === fromValue ? "" : currentValue)
                                                            setFromOpen(false)
                                                        }}
                                                    >
                                                        {airport.label}
                                                        <Check
                                                            className={cn(
                                                                "ml-auto text-primary",
                                                                fromValue === airport.value ? "opacity-100" : "opacity-0"
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
                                        className={cn(
                                            "w-[308px] justify-between font-normal",
                                            toValue ? "text-foreground" : "text-muted-foreground"
                                        )}
                                    >
                                        {toValue
                                            ? airports.find((airport) => airport.value === toValue)?.label
                                            : "e.g. KLAX"}
                                        <Icon name="location" className="text-icon size-4" />
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
                                                            setToValue(currentValue === toValue ? "" : currentValue)
                                                            setToOpen(false)
                                                        }}
                                                    >
                                                        {airport.label}
                                                        <Check
                                                            className={cn(
                                                                "ml-auto text-primary",
                                                                toValue === airport.value ? "opacity-100" : "opacity-0"
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
                                <Select defaultValue="depart">
                                    <SelectTrigger className="w-[115px]" id="depart">
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
                                            variant="outline"
                                            id="date-picker"
                                            className={cn(
                                                "w-32 justify-between font-normal",
                                                date ? "text-foreground" : "text-muted-foreground"
                                            )}
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
