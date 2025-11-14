"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group bg-[hsl(var(--popover))] border-[hsl(var(--border))] text-[hsl(var(--popover-foreground))] rounded-[var(--radius)] shadow-lg",
          success:
            "border-[hsl(var(--success))] text-[hsl(var(--success-foreground))] group-[.toaster]:bg-[hsl(var(--success))]",
          error:
            "border-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))] group-[.toaster]:bg-[hsl(var(--destructive))]",
          warning:
            "border-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] group-[.toaster]:bg-[hsl(var(--warning))]",
          info:
            "border-[hsl(var(--info))] text-[hsl(var(--info-foreground))] group-[.toaster]:bg-[hsl(var(--info))]",
          loading:
            "border-[hsl(var(--border))] text-[hsl(var(--popover-foreground))] group-[.toaster]:bg-[hsl(var(--popover))]",
          title: "text-sm font-medium text-inherit",
          description: "text-xs text-inherit",
          icon: "size-4 shrink-0",
        },
      }}
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "hsl(var(--popover))",
          "--normal-text": "hsl(var(--popover-foreground))",
          "--normal-border": "hsl(var(--border))",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };