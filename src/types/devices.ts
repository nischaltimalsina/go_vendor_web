export type TerminalType = "pos" | "scanner" | "printer" | "kiosk"
export type TerminalStatus = "online" | "offline" | "maintenance" | "inactive"

export interface Terminal {
  id: string
  name: string
  type: TerminalType
  status: TerminalStatus
  serialNumber: string
  lastActive: string
  location: string
  lastSyncedAt: string
  battery?: number
  transactions: number
  version: string
  assignedTo?: string
}
