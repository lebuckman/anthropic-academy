"use client";

import { Loader2 } from "lucide-react";

interface ToolInvocation {
  toolName: string;
  args: Record<string, unknown>;
  state: string;
  result?: unknown;
}

interface ToolInvocationBadgeProps {
  toolInvocation: ToolInvocation;
}

export function getToolLabel(
  toolName: string,
  args: Record<string, unknown>
): string {
  const filename =
    typeof args.path === "string" ? args.path.split("/").at(-1) : null;
  const base = filename ?? "file";

  if (toolName === "str_replace_editor") {
    switch (args.command) {
      case "create":
        return `Creating ${base}`;
      case "str_replace":
        return `Editing ${base}`;
      case "insert":
        return `Editing ${base}`;
      case "view":
        return `Viewing ${base}`;
      case "undo_edit":
        return `Undoing edit in ${base}`;
      default:
        return `Editing ${base}`;
    }
  }

  if (toolName === "file_manager") {
    switch (args.command) {
      case "delete":
        return `Deleting ${base}`;
      case "rename":
        return `Renaming ${base}`;
      default:
        return "Managing files";
    }
  }

  return toolName;
}

export function ToolInvocationBadge({ toolInvocation }: ToolInvocationBadgeProps) {
  const { toolName, args, state, result } = toolInvocation;
  const label = getToolLabel(toolName, args);
  const isDone = state === "result" && result != null;

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs font-mono border border-neutral-200">
      {isDone ? (
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
      ) : (
        <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
      )}
      <span className="text-neutral-700">{label}</span>
    </div>
  );
}
