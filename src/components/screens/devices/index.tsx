import { StatCard } from "@/components/cards/stat-card"
import { YourDevicesTable } from "@/components/tables/devices"
import { Button, Card } from "@/components/ui"
import { IconDevices, IconPlus, IconReceipt, IconRefresh } from "@intentui/icons"

export function Devices() {
  return (
    <section className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <StatCard value={4} title="Total Devices" icon={<IconDevices className="text-primary" />} />
        <StatCard
          value={3}
          title="Online Terminals"
          icon={<IconDevices className="text-success" />}
        />
        <StatCard
          value={1}
          title="Offline Terminals"
          icon={<IconDevices className="text-danger" />}
        />
        <StatCard
          value={1203}
          title="Total Transactions"
          icon={<IconReceipt className="text-warning" />}
        />
      </div>
      <Card>
        <Card.Header>
          <Card.Title>Device Management</Card.Title>
          <Card.Description>
            Monitor and manage all point-of-sale terminals and other hardware devices.
          </Card.Description>
        </Card.Header>
        <Card.Content className="flex justify-end gap-2">
          <Button size="small" intent="outline">
            <IconRefresh /> Refresh Status
          </Button>
          <Button size="small">
            <IconPlus /> Add Device
          </Button>
        </Card.Content>
      </Card>
      <YourDevicesTable />
      <Card>
        <Card.Header>
          <Card.Title>Support</Card.Title>
          <Card.Description>
            For any issues or inquiries regarding your terminals, please reach out to our support
            team.
          </Card.Description>
        </Card.Header>
        <Card.Content className="space-y-4">
          <div>
            <p className="text-sm font-medium">Terminal Support Hours</p>
            <p className="text-muted-fg mt-1 text-sm">24/7 emergency support available</p>
            <p className="text-muted-fg text-sm">Regular support: 9:00 AM - 6:00 PM NPT</p>
          </div>
          <div>
            <p className="text-sm font-medium">Contact Information</p>
            <p className="text-muted-fg mt-1 text-sm">Email: terminals@gonepal.com</p>
            <p className="text-muted-fg text-sm">Phone: +977-1-4XXXXXX</p>
          </div>
        </Card.Content>
        <Card.Footer>
          <Button size="small" className="w-full">
            <IconPlus /> Request Support
          </Button>
        </Card.Footer>
      </Card>
    </section>
  )
}
