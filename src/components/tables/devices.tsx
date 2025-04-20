"use client"
import { Card } from "@/components/ui/card"
import { Table } from "@/components/ui/table"
import { Terminal, TerminalStatus, TerminalType } from "@/types/devices"
import {
  IconCircleCheck,
  IconCircleMinus,
  IconClock,
  IconDatabase,
  IconDeviceDesktop,
  IconDevicePhone,
  IconEye,
  IconGear,
  IconMap,
  IconRefresh,
  IconService,
  IconTriangleExclamation,
} from "@intentui/icons"
import { Badge } from "../ui"

const getTimeAgo = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffDay > 30) {
    return `${Math.floor(diffDay / 30)} months ago`
  } else if (diffDay > 0) {
    return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`
  } else if (diffHour > 0) {
    return `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`
  } else if (diffMin > 0) {
    return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`
  } else {
    return "Just now"
  }
}

function getStatusBadgeIntent(
  status: TerminalStatus
): "success" | "warning" | "danger" | "primary" | "secondary" | "info" {
  switch (status) {
    case "online":
      return "success"
    case "offline":
      return "warning"
    case "inactive":
      return "danger"
    case "maintenance":
      return "info"
    default:
      return "primary"
  }
}

// Get status icon
const getStatusIcon = (status: TerminalStatus) => {
  switch (status) {
    case "online":
      return <IconCircleCheck className="h-4 w-4" />
    case "offline":
      return <IconCircleMinus className="h-4 w-4" />
    case "maintenance":
      return <IconService className="h-4 w-4" />
    case "inactive":
      return <IconTriangleExclamation className="h-4 w-4" />
    default:
      return null
  }
}

const getTerminalIcon = (type: TerminalType) => {
  switch (type) {
    case "pos":
      return <IconDeviceDesktop className="h-5 w-5" />
    case "scanner":
      return <IconDevicePhone className="h-5 w-5" />
    case "printer":
      return <IconDatabase className="h-5 w-5" />
    case "kiosk":
      return <IconDeviceDesktop className="h-5 w-5" />
    default:
      return <IconDeviceDesktop className="h-5 w-5" />
  }
}

const mockTerminals: Terminal[] = [
  {
    id: "term-1001",
    name: "Main Office POS",
    type: "pos",
    status: "online",
    serialNumber: "POS-KTM-001",
    lastActive: "2025-04-19T10:30:15Z",
    location: "Reception Desk, Kathmandu Office",
    lastSyncedAt: "2025-04-19T10:15:22Z",
    transactions: 1254,
    version: "2.5.3",
    assignedTo: "Rajesh Kumar",
  },
  {
    id: "term-1002",
    name: "Pokhara Kiosk",
    type: "kiosk",
    status: "online",
    serialNumber: "KSK-PKR-001",
    lastActive: "2025-04-19T09:45:10Z",
    location: "Lakeside Office, Pokhara",
    lastSyncedAt: "2025-04-19T09:30:05Z",
    transactions: 874,
    version: "2.5.3",
    assignedTo: "Sunita Sharma",
  },
  {
    id: "term-1003",
    name: "Mobile POS #1",
    type: "pos",
    status: "online",
    serialNumber: "POS-MOB-001",
    lastActive: "2025-04-19T08:20:30Z",
    location: "Annapurna Base Camp Trek",
    lastSyncedAt: "2025-04-19T08:15:12Z",
    battery: 85,
    transactions: 362,
    version: "2.5.2",
    assignedTo: "Dipak Rai",
  },
  {
    id: "term-1004",
    name: "Receipt Printer #1",
    type: "printer",
    status: "offline",
    serialNumber: "PRT-KTM-001",
    lastActive: "2025-04-18T15:10:22Z",
    location: "Reception Desk, Kathmandu Office",
    lastSyncedAt: "2025-04-18T15:10:22Z",
    transactions: 1125,
    version: "1.2.0",
  },
  {
    id: "term-1005",
    name: "Ticket Scanner",
    type: "scanner",
    status: "maintenance",
    serialNumber: "SCN-KTM-001",
    lastActive: "2025-04-17T14:30:45Z",
    location: "Entrance, Kathmandu Office",
    lastSyncedAt: "2025-04-17T14:30:45Z",
    transactions: 2540,
    version: "1.8.5",
    assignedTo: "Technical Team",
  },
  {
    id: "term-1006",
    name: "Chitwan Mobile POS",
    type: "pos",
    status: "offline",
    serialNumber: "POS-CHT-001",
    lastActive: "2025-04-18T11:25:30Z",
    location: "Chitwan Safari Office",
    lastSyncedAt: "2025-04-18T11:20:15Z",
    battery: 12,
    transactions: 758,
    version: "2.5.3",
    assignedTo: "Anish Gurung",
  },
  {
    id: "term-1007",
    name: "Backup POS",
    type: "pos",
    status: "inactive",
    serialNumber: "POS-KTM-002",
    lastActive: "2025-03-30T09:45:22Z",
    location: "Storage, Kathmandu Office",
    lastSyncedAt: "2025-03-30T09:45:22Z",
    battery: 100,
    transactions: 125,
    version: "2.4.8",
  },
]

export function YourDevicesTable() {
  return (
    <Card className="pb-0">
      <Card.Header>
        <Card.Title>Your Terminals</Card.Title>
        <Card.Description>7 terminals found</Card.Description>
        <Card.Action>View All</Card.Action>
      </Card.Header>
      <Table allowResize aria-label="Recent Transaction">
        <Table.Header className="border-t">
          <Table.Column isRowHeader isResizable className="min-w-32">
            Terminal
          </Table.Column>
          <Table.Column isResizable>Status</Table.Column>
          <Table.Column isResizable>Location</Table.Column>
          <Table.Column>Last Activity</Table.Column>
          <Table.Column>Assigned To</Table.Column>
          <Table.Column>Transactions</Table.Column>
          <Table.Column>Actions</Table.Column>
        </Table.Header>
        <Table.Body items={mockTerminals}>
          {(terminal) => {
            console.log(terminal)
            return (
              <Table.Row className="whitespace-nowrap" id={terminal.id}>
                <Table.Cell>
                  <div className="flex items-center">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center">
                      {getTerminalIcon(terminal.type as TerminalType)}
                    </div>
                    <div className="ml-2">
                      <div className="text-muted-fg text-sm font-medium">{terminal.name}</div>
                      <div className="text-sm text-gray-500">
                        {terminal.serialNumber} • v{terminal.version}
                      </div>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Badge
                    intent={getStatusBadgeIntent(terminal.status)}
                    className="truncate capitalize"
                  >
                    {getStatusIcon(terminal.status)}
                    {terminal.status}
                  </Badge>
                  {terminal.battery !== undefined && (
                    <div className="mt-1 text-xs text-gray-500">Battery: {terminal.battery}%</div>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <div className="text-muted-fg flex items-center text-sm">
                    <IconMap className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                    {terminal.location}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  {" "}
                  <div className="text-muted-fg flex items-center text-sm">
                    <IconClock className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                    {getTimeAgo(terminal.lastActive)}
                  </div>
                  <div className="text-xs text-gray-500">
                    Last synced: {getTimeAgo(terminal.lastSyncedAt)}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="text-muted-fg text-sm">{terminal.assignedTo || "Unassigned"}</div>
                </Table.Cell>
                <Table.Cell>{terminal.transactions.toLocaleString()}</Table.Cell>
                <Table.Cell>
                  {" "}
                  <div className="flex justify-end space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      <IconGear className="h-4 w-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      <IconRefresh className="h-4 w-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <IconEye className="h-4 w-4" />
                    </button>
                  </div>
                </Table.Cell>
              </Table.Row>
            )
          }}
        </Table.Body>
      </Table>
    </Card>
  )
}
