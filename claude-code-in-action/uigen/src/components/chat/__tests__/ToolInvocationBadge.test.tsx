import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import {
  ToolInvocationBadge,
  getToolLabel,
} from "../ToolInvocationBadge";

afterEach(() => {
  cleanup();
});

// --- getToolLabel unit tests ---

test("getToolLabel: str_replace_editor create", () => {
  expect(getToolLabel("str_replace_editor", { command: "create", path: "/src/App.tsx" })).toBe("Creating App.tsx");
});

test("getToolLabel: str_replace_editor str_replace", () => {
  expect(getToolLabel("str_replace_editor", { command: "str_replace", path: "/src/components/Button.tsx" })).toBe("Editing Button.tsx");
});

test("getToolLabel: str_replace_editor insert", () => {
  expect(getToolLabel("str_replace_editor", { command: "insert", path: "/src/styles.css" })).toBe("Editing styles.css");
});

test("getToolLabel: str_replace_editor view", () => {
  expect(getToolLabel("str_replace_editor", { command: "view", path: "/src/index.ts" })).toBe("Viewing index.ts");
});

test("getToolLabel: str_replace_editor undo_edit", () => {
  expect(getToolLabel("str_replace_editor", { command: "undo_edit", path: "/src/App.tsx" })).toBe("Undoing edit in App.tsx");
});

test("getToolLabel: str_replace_editor unknown command falls back to editing", () => {
  expect(getToolLabel("str_replace_editor", { path: "/src/App.tsx" })).toBe("Editing App.tsx");
});

test("getToolLabel: str_replace_editor no path uses generic filename", () => {
  expect(getToolLabel("str_replace_editor", { command: "create" })).toBe("Creating file");
});

test("getToolLabel: file_manager delete", () => {
  expect(getToolLabel("file_manager", { command: "delete", path: "/src/old.ts" })).toBe("Deleting old.ts");
});

test("getToolLabel: file_manager rename", () => {
  expect(getToolLabel("file_manager", { command: "rename", path: "/src/old.ts", new_path: "/src/new.ts" })).toBe("Renaming old.ts");
});

test("getToolLabel: file_manager unknown command", () => {
  expect(getToolLabel("file_manager", {})).toBe("Managing files");
});

test("getToolLabel: unknown tool returns raw tool name", () => {
  expect(getToolLabel("some_other_tool", { path: "/src/file.ts" })).toBe("some_other_tool");
});

// --- ToolInvocationBadge render tests ---

test("ToolInvocationBadge shows label text", () => {
  render(
    <ToolInvocationBadge
      toolInvocation={{
        toolName: "str_replace_editor",
        args: { command: "create", path: "/src/App.tsx" },
        state: "result",
        result: "Success",
      }}
    />
  );
  expect(screen.getByText("Creating App.tsx")).toBeDefined();
});

test("ToolInvocationBadge shows green dot when done", () => {
  const { container } = render(
    <ToolInvocationBadge
      toolInvocation={{
        toolName: "str_replace_editor",
        args: { command: "create", path: "/src/App.tsx" },
        state: "result",
        result: "Success",
      }}
    />
  );
  expect(container.querySelector(".bg-emerald-500")).toBeDefined();
  expect(container.querySelector(".animate-spin")).toBeNull();
});

test("ToolInvocationBadge shows spinner when in progress", () => {
  const { container } = render(
    <ToolInvocationBadge
      toolInvocation={{
        toolName: "str_replace_editor",
        args: { command: "create", path: "/src/App.tsx" },
        state: "call",
      }}
    />
  );
  expect(container.querySelector(".animate-spin")).toBeDefined();
  expect(container.querySelector(".bg-emerald-500")).toBeNull();
});

test("ToolInvocationBadge shows spinner when result is null", () => {
  const { container } = render(
    <ToolInvocationBadge
      toolInvocation={{
        toolName: "str_replace_editor",
        args: { command: "str_replace", path: "/src/App.tsx" },
        state: "result",
        result: null,
      }}
    />
  );
  expect(container.querySelector(".animate-spin")).toBeDefined();
});
