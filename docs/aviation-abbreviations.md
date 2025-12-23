# Aviation Abbreviations

This document explains the abbreviations used in the flight details section of the application.

## Flight Time Metrics

| Abbreviation | Full Name | Description |
|--------------|-----------|-------------|
| **FLT** | Flight Time | The actual time the aircraft is in the air, from takeoff to landing |
| **BLT** | Block Time | Total time from when the aircraft starts moving (pushback) until it stops at the arrival gate |
| **TT** | Total Time | The cumulative time for all flight segments |
| **DT** | Duty Time | The total time crew members are on duty, including pre-flight and post-flight activities |
| **RT** | Rest Time | Required rest period for crew between duty periods |

## Distance Metrics

| Abbreviation | Full Name | Description |
|--------------|-----------|-------------|
| **DST** | Distance | The total distance traveled for the flight segment |

## Usage

These abbreviations are displayed in the flight details section of the `CreateTripQuote.tsx` component (lines 408-413) as column headers for flight leg information.

## Notes

- **Block Time vs Flight Time**: Block time is always greater than flight time because it includes taxiing time on the ground
- **Duty Time**: Important for crew scheduling and regulatory compliance
- **Rest Time**: Mandated by aviation regulations to ensure crew safety
