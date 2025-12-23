import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label";
import { useEffect, useMemo, useRef, useState } from "react"
import { Combobox } from "@/components/ui/combobox"
import { Icon } from "@/components/ui/icons/Icon"
import { PageHeader } from "@/components/PageHeader"
import { FlightLegRow } from "@/pages/CreateTripQuote/FlightLegRow"
import type { Leg } from "@/pages/CreateTripQuote/FlightLegRow"

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

const getLegDistance = (leg: Leg) => {
    if (!leg.fromValue || !leg.toValue) {
        return 0
    }
    const seed = `${leg.fromValue}-${leg.toValue}`
    return MIN_DISTANCE_NM + (hashString(seed) % DISTANCE_RANGE_NM)
}

const getLegFlightMinutes = (leg: Leg) => {
    const distance = getLegDistance(leg)
    if (!distance) {
        return 0
    }
    return Math.round((distance / AVERAGE_SPEED_KTS) * 60)
}

export default function CreateTripQuote() {
    const [requestTab, setRequestTab] = useState("quote-trip")
    const [legs, setLegs] = useState<Leg[]>([
        {
            id: crypto.randomUUID(),
            fromValue: "",
            toValue: "",
            date: undefined,
            departArriveValue: "depart",
            timeValue: "18:30:00",
            tripModeValue: "pax",
        }
    ])
    const [animatedLegIds, setAnimatedLegIds] = useState<string[]>([])
    const [pendingFocus, setPendingFocus] = useState<{ type: "add" | "remove"; legId: string } | null>(null)
    const legRefs = useRef<Record<string, {
        from: HTMLButtonElement | null;
        to: HTMLButtonElement | null;
        date: HTMLButtonElement | null;
        remove: HTMLButtonElement | null;
    }>>({})

    const [aircraftOpen, setAircraftOpen] = useState(false)
    const [accountOpen, setAccountOpen] = useState(false)
    const [contactOpen, setContactOpen] = useState(false)
    const [tripTypeOpen, setTripTypeOpen] = useState(false)
    const [contractOpen, setContractOpen] = useState(false)
    const [pricingModeValue, setPricingModeValue] = useState("retail")
    const [aircraftValue, setAircraftValue] = useState("")
    const [accountValue, setAccountValue] = useState("")
    const [contactValue, setContactValue] = useState("")
    const [tripTypeValue, setTripTypeValue] = useState("")
    const [contractValue, setContractValue] = useState("")

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

    const metrics = useMemo(() => {
        const legDistances = legs.map(getLegDistance)
        const legFlightMinutes = legs.map(getLegFlightMinutes)
        const totalDistance = legDistances.reduce((sum, value) => sum + value, 0)
        const totalFlightMinutes = legFlightMinutes.reduce((sum, value) => sum + value, 0)
        const legsWithData = legDistances.filter((distance) => distance > 0).length
        const blockMinutes = totalFlightMinutes + legsWithData * 10
        // Travel time = block time + 30 min ground handling per leg
        const travelMinutes = blockMinutes + legsWithData * 30
        // Days = based on total travel time (assume ~8 hours per travel day)
        const days = legsWithData > 0 ? Math.max(1, Math.ceil(travelMinutes / 480)) : 0

        return {
            totalDistance,
            totalFlightMinutes,
            blockMinutes,
            travelMinutes,
            days,
        }
    }, [legs])

    const registerLegRef = (id: string, key: "from" | "to" | "date" | "remove") => (node: HTMLButtonElement | null) => {
        if (!legRefs.current[id]) {
            legRefs.current[id] = { from: null, to: null, date: null, remove: null }
        }
        legRefs.current[id][key] = node
    }

    useEffect(() => {
        if (!pendingFocus) {
            return
        }

        const refs = legRefs.current[pendingFocus.legId]
        const leg = legs.find((item) => item.id === pendingFocus.legId)
        if (!refs || !leg) {
            setPendingFocus(null)
            return
        }

        let target: HTMLButtonElement | null = null
        if (pendingFocus.type === "add") {
            if (!leg.fromValue) {
                target = refs.from
            } else if (!leg.toValue) {
                target = refs.to
            } else if (!leg.date) {
                target = refs.date
            } else {
                target = refs.from ?? refs.to ?? refs.date
            }
        } else {
            target = refs.remove ?? refs.from ?? refs.to ?? refs.date
        }

        if (target) {
            target.focus()
        }

        setPendingFocus(null)
    }, [legs, pendingFocus])

    const handleReset = () => {
        setAircraftOpen(false)
        setAccountOpen(false)
        setContactOpen(false)
        setTripTypeOpen(false)
        setContractOpen(false)
        setAircraftValue("")
        setAccountValue("")
        setContactValue("")
        setTripTypeValue("")
        setContractValue("")
        setPricingModeValue("retail")
        setLegs([
            {
                id: crypto.randomUUID(),
                fromValue: "",
                toValue: "",
                date: undefined,
                departArriveValue: "depart",
                timeValue: "18:30:00",
                tripModeValue: "pax",
            }
        ])
        setAnimatedLegIds([])
        setPendingFocus(null)
    }

    const addLeg = () => {
        const lastLeg = legs[legs.length - 1];
        const newLegId = crypto.randomUUID()
        setLegs([
            ...legs,
            {
                id: newLegId,
                fromValue: lastLeg.toValue,
                toValue: "",
                date: lastLeg.date,
                departArriveValue: "depart",
                timeValue: "18:30:00",
                tripModeValue: "pax",
            }
        ])
        setAnimatedLegIds((prev) => [...prev, newLegId])
        setPendingFocus({ type: "add", legId: newLegId })
        window.setTimeout(() => {
            setAnimatedLegIds((prev) => prev.filter((id) => id !== newLegId))
        }, 350)
    }

    const removeLeg = (id: string, index: number) => {
        if (legs.length > 1) {
            const remaining = legs.filter(leg => leg.id !== id)
            const fallbackId = remaining[remaining.length - 1]?.id
            const targetId = index > 1 ? legs[index - 1]?.id ?? fallbackId : fallbackId
            if (targetId) {
                setPendingFocus({ type: "remove", legId: targetId })
            }
            setLegs(remaining)
        }
    }

    const updateLeg = (id: string, updates: Partial<Leg>) => {
        setLegs(legs.map(leg => leg.id === id ? { ...leg, ...updates } : leg))
    }

    const moveLeg = (index: number, direction: "up" | "down") => {
        const nextIndex = direction === "up" ? index - 1 : index + 1
        if (nextIndex < 0 || nextIndex >= legs.length) {
            return
        }
        const next = [...legs]
            ;[next[index], next[nextIndex]] = [next[nextIndex], next[index]]
        setLegs(next)
    }

    return (
        <div className="flex flex-col bg-background w-full">

            <PageHeader icon="sales" title={requestTitle} animateKey={requestTab}>
                <Tabs value={requestTab} onValueChange={setRequestTab}>
                    <TabsList>
                        <TabsTrigger value="quote-only">Quote Only</TabsTrigger>
                        <TabsTrigger value="trip-only">Trip Only</TabsTrigger>
                        <TabsTrigger value="quote-trip">Quote & Trip</TabsTrigger>
                    </TabsList>
                </Tabs>
            </PageHeader>

            <div className="px-4 pb-4">
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
                                    <Tabs value={pricingModeValue} onValueChange={setPricingModeValue}>
                                        <TabsList>
                                            <TabsTrigger value="retail">Retail</TabsTrigger>
                                            <TabsTrigger value="wholesale">Wholesale</TabsTrigger>
                                        </TabsList>
                                    </Tabs>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col bg-bg-2 border-border border-b p-4">
                        {/* Headers */}
                        <div className="grid grid-cols-[1fr_400px] items-end pb-2">
                            <div className="flex flex-row gap-2">
                                <div className="w-9" />
                                <div className="w-[308px]"><Label>From:</Label></div>
                                <div className="w-[308px]"><Label>To:</Label></div>
                                <div className="w-fit"><Label>Depart / Arrive:</Label></div>
                            </div>
                            <div className="flex flex-row items-center text-center h-[18px] text-[14px] w-[400px]">
                                <div className="w-[60px] text-[#6C757D]" title="Flight Time">FLT</div>
                                <div className="w-[60px] text-[#6C757D]" title="Block Time">BLT</div>
                                <div className="w-[60px] text-[#6C757D]" title="Total Time">TT</div>
                                <div className="w-[60px] text-[#6C757D]" title="Duty Time">DT</div>
                                <div className="w-[60px] text-[#6C757D]" title="Rest Time">RT</div>
                                <div className="w-[100px] text-[#6C757D]" title="Distance">DST</div>
                            </div>
                        </div>

                        {/* Legs */}
                        <div className="flex flex-col">
                            {legs.map((leg, index) => (
                                <FlightLegRow
                                    key={leg.id}
                                    leg={leg}
                                    index={index}
                                    canMoveUp={index > 0}
                                    canMoveDown={index < legs.length - 1}
                                    isNew={animatedLegIds.includes(leg.id)}
                                    onUpdate={(updates) => updateLeg(leg.id, updates)}
                                    onRemove={() => removeLeg(leg.id, index)}
                                    onMoveUp={() => moveLeg(index, "up")}
                                    onMoveDown={() => moveLeg(index, "down")}
                                    fromRef={registerLegRef(leg.id, "from")}
                                    toRef={registerLegRef(leg.id, "to")}
                                    dateRef={registerLegRef(leg.id, "date")}
                                    removeRef={registerLegRef(leg.id, "remove")}
                                />
                            ))}
                        </div>

                        <div className="pt-4">
                            <Button size="default" variant="outline" className="w-fit" onClick={addLeg}>
                                <Icon name="add" className="text-foreground size-4" />
                                Add Next Flight
                            </Button>
                        </div>
                    </div>

                    {/* Global Metrics */}
                    <div className="grid grid-cols-5 bg-bg-2 border-border border-b gap-2 pt-6 pb-8">
                        <div className="flex flex-col items-center justify-center gap-2">
                            <span className="text-[#6C757D] text-[13px] font-bold leading-[18px] uppercase">DISTANCE</span>
                            <span className="font-cal-sans text-[24px] font-normal leading-[18px] tracking-[0.6px]">
                                {Math.round(metrics.totalDistance)} NM
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2">
                            <span className="text-[#6C757D] text-[13px] font-bold leading-[18px] uppercase">FLIGHT / BLOCK</span>
                            <span className="font-cal-sans text-[24px] font-normal leading-[18px] tracking-[0.6px]">
                                {formatMinutes(metrics.totalFlightMinutes)} / {formatMinutes(metrics.blockMinutes)}
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2">
                            <span className="text-[#6C757D] text-[13px] font-bold leading-[18px] uppercase">TRAVEL TIME</span>
                            <span className="font-cal-sans text-[24px] font-normal leading-[18px] tracking-[0.6px]">{formatMinutes(metrics.travelMinutes)}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2">
                            <span className="text-[#6C757D] text-[13px] font-bold leading-[18px] uppercase">DAYS</span>
                            <span className="font-cal-sans text-[24px] font-normal leading-[18px] tracking-[0.6px]">{metrics.days}</span>
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
                        <Button size="default" variant="outline" className="min-w-[90px]" onClick={handleReset}>
                            Reset
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
