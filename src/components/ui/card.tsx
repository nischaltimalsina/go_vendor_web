import { twMerge } from "tailwind-merge"

const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      data-slot="card"
      className={twMerge(
        "group/card bg-bg text-fg **:data-[slot=table-header]:bg-muted/50 flex flex-col gap-(--card-spacing) rounded border py-(--card-spacing) shadow-xs [--card-spacing:theme(spacing.4)] has-[table]:overflow-hidden has-[table]:**:data-[slot=card-footer]:border-t **:[table]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
}

const CardHeader = ({ className, title, description, children, ...props }: HeaderProps) => (
  <div
    data-slot="card-header"
    className={twMerge(
      "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-(--card-spacing) has-[[data-slot=card-action]]:grid-cols-[1fr_auto]",
      className
    )}
    {...props}
  >
    {title && <CardTitle>{title}</CardTitle>}
    {description && <CardDescription>{description}</CardDescription>}
    {!title && typeof children === "string" ? <CardTitle>{children}</CardTitle> : children}
  </div>
)

const CardTitle = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-title"
      className={twMerge("text-lg leading-none font-semibold tracking-tight", className)}
      {...props}
    />
  )
}

const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      data-slot="card-description"
      className={twMerge("text-muted-fg row-start-2 text-sm text-pretty", className)}
      {...props}
    />
  )
}

const CardAction = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      data-slot="card-action"
      className={twMerge(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      data-slot="card-content"
      className={twMerge(
        "has-[[data-slot=table-header]]:bg-muted/40 px-(--card-spacing) group-has-[table]/card:border-t has-[table]:p-0 **:data-[slot=table-cell]:px-(--card-spacing) **:data-[slot=table-column]:px-(--card-spacing) [&:has(table)+[data-slot=card-footer]]:pt-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      data-slot="card-footer"
      className={twMerge("flex items-center px-(--card-spacing) [.border-t]:pt-4", className)}
      {...props}
    />
  )
}

Card.Content = CardContent
Card.Description = CardDescription
Card.Footer = CardFooter
Card.Header = CardHeader
Card.Title = CardTitle
Card.Action = CardAction

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardAction }
