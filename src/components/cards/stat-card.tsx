import React from "react"
import { Badge, Card } from "@/components/ui/"
import { IconChartTrending, IconChartTrendingDown } from "@intentui/icons"

interface StatValueProps {
  value: number
  title: string
  description?: string | React.ReactNode
  growth?: number
  icon?: React.ReactNode
}
export function StatCard(props: StatValueProps) {
  const formatNumber = (num: number) => num.toLocaleString("en-US")
  return (
    <Card>
      <Card.Header>
        <Card.Title>{formatNumber(props.value)}</Card.Title>
        <Card.Description>{props.title}</Card.Description>
        <Card.Action>
          {props.growth && (
            <Badge intent={props.growth < 0 ? "danger" : "success"}>
              {props.growth < 0 ? <IconChartTrendingDown /> : <IconChartTrending />} {props.growth}%
            </Badge>
          )}
          {props.icon && props.icon}
        </Card.Action>
      </Card.Header>
      {props.description && <Card.Content>{props.description}</Card.Content>}
    </Card>
  )
}
