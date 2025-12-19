import { Navigate, Route, Routes } from "react-router-dom"
import { Nav } from "./components/Nav"
import CreateTripQuote from "./pages/CreateTripQuote"
import { PlaceholderPage } from "./pages/PlaceholderPage"


function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center overflow-hidden">
      <Nav />
      <main className="flex flex-1 w-full">
        <Routes>
          <Route path="/" element={<Navigate to="/schedule" replace />} />
          <Route path="/schedule" element={<PlaceholderPage title="Schedule" />} />
          <Route path="/sales" element={<CreateTripQuote />} />
          <Route path="/customers" element={<PlaceholderPage title="Customers" />} />
          <Route path="/operations" element={<PlaceholderPage title="Operations" />} />
          <Route path="/airports" element={<PlaceholderPage title="Airports" />} />
          <Route path="/maintenance" element={<PlaceholderPage title="Maintenance" />} />
          <Route path="/crew" element={<PlaceholderPage title="Crew" />} />
          <Route path="/finance" element={<PlaceholderPage title="Finance" />} />
          <Route
            path="/aircraft-vendors"
            element={<PlaceholderPage title="Aircraft & Vendors" />}
          />
          <Route path="/users" element={<PlaceholderPage title="Users" />} />
          <Route path="/company" element={<PlaceholderPage title="Company" />} />
        </Routes>
      </main>

    </div>
  )
}

export default App
