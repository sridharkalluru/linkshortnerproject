---
description: >
  Rules and guidelines for building UI in the Link Shortener project.
  Apply these instructions whenever creating, editing, or reviewing any
  visual component, layout, form, dialog, button, input, or other UI element.
applyTo: "app/**,components/**"
---

# UI Components — shadcn/ui

## Core Rule

**All UI elements in this application must be built exclusively with shadcn/ui components.**
Do not create custom-built HTML primitives, install third-party component libraries (e.g. MUI, Chakra, Ant Design, Radix directly), or hand-roll styled components for anything that shadcn/ui already covers. If a shadcn/ui component exists for the use-case, use it.

---

## Project Configuration

The shadcn/ui configuration is defined in [`components.json`](../components.json). Key settings that all agents must respect:

| Setting       | Value      | Notes                                                                                             |
| ------------- | ---------- | ------------------------------------------------------------------------------------------------- |
| Style         | `new-york` | Always use new-york variant — do NOT reference `default` style tokens                             |
| Base color    | `neutral`  | CSS variables are generated from the neutral palette                                              |
| CSS Variables | `true`     | Use CSS custom properties (`--background`, `--foreground`, etc.) — never hard-code hex/rgb colors |
| Icon Library  | `lucide`   | Only use `lucide-react` for icons — no heroicons, react-icons, etc.                               |
| RSC           | `true`     | Components can be React Server Components by default                                              |
| TSX           | `true`     | All component files use `.tsx`                                                                    |

---

## Directory Structure

```
components/
└── ui/          ← shadcn/ui primitives live here (auto-generated, do not hand-edit)
    ├── button.tsx
    ├── input.tsx
    └── ...      ← all other installed shadcn components

components/      ← composite/app-level components composed from ui/ primitives
└── my-feature-card.tsx
```

- **Never** edit files inside `components/ui/` directly. Re-run `npx shadcn@latest add <component>` to regenerate or update a primitive.
- **Always** build feature components by composing primitives from `components/ui/`.

---

## Adding a New shadcn/ui Component

1. Check the [shadcn/ui component list](https://ui.shadcn.com/docs/components) to confirm the component exists.
2. Run the CLI to add it:
   ```bash
   npx shadcn@latest add <component-name>
   ```
3. Import from the `@/components/ui` alias, never by relative path:

   ```tsx
   // ✅ correct
   import { Button } from "@/components/ui/button";

   // ❌ wrong
   import { Button } from "../../components/ui/button";
   ```

---

## Styling Rules

### Use `cn()` for All Conditional Class Names

Import and use the `cn()` helper from `@/lib/utils` whenever combining or conditionally applying Tailwind classes. Never use string template literals or `clsx`/`classnames` directly.

```tsx
import { cn } from "@/lib/utils";

<Button className={cn("w-full", isLoading && "opacity-50 cursor-not-allowed")}>
  Submit
</Button>;
```

### Tailwind Classes Only

- Style via Tailwind utility classes and CSS variables — no inline `style` objects unless dynamically computed values are required.
- Honor the design tokens exposed as CSS variables (`--primary`, `--muted`, `--destructive`, etc.) from `app/globals.css`. Never override them with hard-coded colors.

### Variants First

Prefer using the component's built-in `variant` and `size` props before reaching for custom classes:

```tsx
// ✅ correct — use built-in variants
<Button variant="destructive" size="sm">Delete</Button>

// ❌ wrong — do not manually re-implement what a variant already handles
<Button className="bg-red-500 text-white text-sm px-3 py-1">Delete</Button>
```

---

## Icons

Use **only** `lucide-react` icons. Each icon is a named export:

```tsx
import { Link, Copy, Trash2, ExternalLink } from "lucide-react";

<Button size="icon" variant="ghost">
  <Copy className="h-4 w-4" />
</Button>;
```

- Default icon size inside buttons: `h-4 w-4`.
- Do not import from `@heroicons`, `react-icons`, or any other icon set.

---

## Forms

Use shadcn/ui's form primitives built on top of `react-hook-form` + `zod`:

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
```

- **Always** pair `<FormField>` with `<FormItem>`, `<FormLabel>`, `<FormControl>`, and `<FormMessage>` for accessible, validated inputs.
- Validation schemas must be defined with `zod` — no manual validation logic.

---

## Dialogs & Modals

Use the `Dialog` component from `@/components/ui/dialog`. Do not use browser-native `alert()`, `confirm()`, or `prompt()`.

```tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
```

---

## Toasts / Notifications

Use the `Sonner` toast component (shadcn/ui wraps Sonner):

```tsx
import { toast } from "sonner";

toast.success("Link copied!");
toast.error("Something went wrong.");
```

Add `<Toaster />` once in the root layout (`app/layout.tsx`). Do not add it elsewhere.

---

## Common Component Patterns

### Loading States

Use the `Skeleton` component for loading placeholders — never blank space or spinners built from scratch:

```tsx
import { Skeleton } from "@/components/ui/skeleton";

<Skeleton className="h-4 w-[200px]" />;
```

### Destructive / Confirm Actions

Wrap destructive actions in an `AlertDialog` to require explicit confirmation:

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
```

### Data Tables

Use the `Table` primitives (`Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`) from `@/components/ui/table`. For sortable/paginated tables, pair with `@tanstack/react-table`.

---

## Prohibited Patterns

| Pattern                                                                | Reason                                                            |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Custom CSS files per component                                         | Use Tailwind utilities; global styles belong in `app/globals.css` |
| Inline `style={{}}` for colors/spacing                                 | Use Tailwind classes and CSS variables instead                    |
| Installing MUI, Chakra, Ant Design, etc.                               | shadcn/ui is the only component library                           |
| Editing files in `components/ui/` by hand                              | Re-run the shadcn CLI to update primitives                        |
| Hard-coding hex/rgb color values                                       | Always reference CSS variable tokens                              |
| Using `<img>` directly                                                 | Use Next.js `<Image>` from `next/image`                           |
| Creating wrapper components around shadcn primitives that add no logic | Use the primitive directly                                        |

---

## Checklist Before Submitting UI Changes

- [ ] Every UI element uses a shadcn/ui component — no custom primitives.
- [ ] All conditional class names use `cn()` from `@/lib/utils`.
- [ ] Icons are from `lucide-react` only.
- [ ] No hard-coded color values; CSS variables are used.
- [ ] Forms use `react-hook-form` + `zod` + shadcn/ui `Form` components.
- [ ] `npm run lint` passes with zero errors.
