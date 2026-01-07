import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { Nav } from "./components/Nav"
import CreateTripQuote from "./pages/CreateTripQuote"
import { PlaceholderPage } from "./pages/PlaceholderPage"
import Operations from "./pages/Operations"
import Gradient from "./components/ui/gradient"

function App() {
  const location = useLocation()

  return (
    <div className="flex min-h-svh flex-col items-center justify-center overflow-hidden">
      <Gradient />
      <Nav />
      <main className="flex flex-1 w-full z-[2]">
        <div key={location.pathname} className="flex flex-col flex-1 min-h-0 w-full">
          <Routes location={location}>
            <Route path="/" element={<Navigate to="/schedule" replace />} />
            <Route path="/schedule" element={<PlaceholderPage title="Schedule" icon="schedule" />} />
            <Route path="/sales" element={<CreateTripQuote />} />
            <Route path="/customers" element={<PlaceholderPage title="Customers" icon="customers" />} />
            <Route path="/operations/*" element={<Operations />} />
            <Route path="/airports" element={<PlaceholderPage title="Airports" icon="airports" />} />
            <Route path="/maintenance" element={<PlaceholderPage title="Maintenance" icon="maintenance" />} />
            <Route path="/crew" element={<PlaceholderPage title="Crew" icon="crew" />} />
            <Route path="/finance" element={<PlaceholderPage title="Finance" icon="finance" />} />
            <Route
              path="/aircraft-vendors"
              element={<PlaceholderPage title="Aircraft & Vendors" icon="aircraftVendors" />}
            />
            <Route path="/users" element={<PlaceholderPage title="Users" icon="users" />} />
            <Route path="/company" element={<PlaceholderPage title="Company" icon="company" />} />
          </Routes>
        </div>
      </main>

    </div>
  )
}

export default App
