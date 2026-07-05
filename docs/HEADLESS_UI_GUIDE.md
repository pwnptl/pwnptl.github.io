# Headless UI Guide

Quick reference for Headless UI components. **Installed:** `@headlessui/react@^2.2.10`

## Components Overview

| Component | Use Case | Key Props |
|-----------|----------|-----------|
| **Menu** | Dropdowns | `Button`, `Items`, `Item` |
| **Disclosure** | Collapsibles | `Button`, `Panel` |
| **Dialog** | Modals | `open`, `onClose`, `Panel` |
| **Popover** | Tooltips | `Button`, `Panel` |
| **Listbox** | Selects | `value`, `onChange` |
| **Tab** | Tabs | `Group`, `List`, `Panels` |
| **Switch** | Toggles | `checked`, `onChange` |
| **Transition** | Animations | `show`, `enter`, `leave` |

## Quick Examples

**Menu:**
```jsx
<Menu>
  <Menu.Button>Options</Menu.Button>
  <Menu.Items>
    <Menu.Item>{({ active }) => <a>Item</a>}</Menu.Item>
  </Menu.Items>
</Menu>
```

**Disclosure:**
```jsx
<Disclosure>
  <Disclosure.Button>Expand</Disclosure.Button>
  <Disclosure.Panel>Hidden content</Disclosure.Panel>
</Disclosure>
```

**Dialog:**
```jsx
const [open, setOpen] = useState(false)
<Dialog open={open} onClose={() => setOpen(false)}>
  <Dialog.Panel>
    <Dialog.Title>Title</Dialog.Title>
    Content here
  </Dialog.Panel>
</Dialog>
```

**Listbox:**
```jsx
const [selected, setSelected] = useState('Option 1')
<Listbox value={selected} onChange={setSelected}>
  <Listbox.Button>{selected}</Listbox.Button>
  <Listbox.Options>
    {options.map(opt => (
      <Listbox.Option key={opt} value={opt}>{opt}</Listbox.Option>
    ))}
  </Listbox.Options>
</Listbox>
```

**Tab.Group:**
```jsx
<Tab.Group>
  <Tab.List>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
  </Tab.List>
  <Tab.Panels>
    <Tab.Panel>Content 1</Tab.Panel>
    <Tab.Panel>Content 2</Tab.Panel>
  </Tab.Panels>
</Tab.Group>
```

**Switch:**
```jsx
const [enabled, setEnabled] = useState(false)
<Switch checked={enabled} onChange={setEnabled} />
```

**Transition:**
```jsx
<Transition show={isVisible} enter="transition" enterFrom="opacity-0" enterTo="opacity-100">
  <div>Content</div>
</Transition>
```

**Popover:**
```jsx
<Popover>
  <Popover.Button>Info</Popover.Button>
  <Popover.Panel>Tooltip content</Popover.Panel>
</Popover>
```

## Portfolio Use Cases

- **Navigation Menu** → `Menu`
- **Filter Tabs** → `Tab.Group`
- **Skill Sections** → `Disclosure`
- **Dark Mode** → `Switch`
- **Project Modal** → `Dialog`
- **Filter Dropdown** → `Listbox`

## Key Patterns

**Render Props (access state):**
```jsx
{({ active, selected }) => (
  <div className={active ? 'bg-blue-600' : 'bg-gray-100'}>Item</div>
)}
```

**Styling with Tailwind:**
```jsx
className="px-4 py-2 bg-white dark:bg-gray-900 md:px-8"
```

**Controlled Component:**
```jsx
<Component value={state} onChange={setState} />
```

## Resources

[Docs](https://headlessui.com) | [API](https://headlessui.com/react) | [Examples](https://headlessui.com/react/examples)

**Tip:** Only import what you use: `import { Menu, Dialog } from '@headlessui/react'`
