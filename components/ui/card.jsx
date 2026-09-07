import * as React from "react"

import { cn } from "@/lib/utils"

function Card({
  className = "",
  size = "default",
  ...props
}) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card text-sm text-card-foreground shadow-sm transition-shadow duration-300 hover:shadow-md has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:rounded-xl *:[img:first-child]:rounded-t-2xl *:[img:last-child]:rounded-b-2xl",
        className
      )}
      {...props} />
  );
}

function CardHeader({
  className = "",
  ...props
}) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header flex min-w-0 flex-col gap-1 px-5 py-5 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4",
        className
      )}
      {...props} />
  );
}

function CardTitle({
  className = "",
  ...props
}) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-display text-base font-semibold leading-snug group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props} />
  );
}

function CardDescription({
  className = "",
  ...props
}) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props} />
  );
}

function CardAction({
  className = "",
  ...props
}) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props} />
  );
}

function CardContent({
  className = "",
  ...props
}) {
  return (
    <div
      data-slot="card-content"
      className={cn("min-w-0 px-5 pb-5", className)}
      {...props} />
  );
}

function CardFooter({
  className = "",
  ...props
}) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-2xl border-t bg-muted/50 px-5 py-4",
        className
      )}
      {...props} />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
