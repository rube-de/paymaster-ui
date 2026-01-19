import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'
import { expect, fn, userEvent, within } from 'storybook/test'
import { ChainSelector, ChainOption, DEFAULT_CHAIN_OPTIONS } from '../../components/bridge/ChainSelector'
import { base, arbitrum, mainnet } from 'wagmi/chains'

// Simple chain icons for stories
const BaseIcon = () => (
  <div className="size-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">
    B
  </div>
)

const ArbitrumIcon = () => (
  <div className="size-5 rounded-full bg-sky-500 flex items-center justify-center text-white text-[10px] font-bold">
    A
  </div>
)

const EthereumIcon = () => (
  <div className="size-5 rounded-full bg-indigo-500 flex items-center justify-center text-white text-[10px] font-bold">
    E
  </div>
)

// Sample chain options
const chainOptions: ChainOption[] = [
  { id: base.id, name: 'Base', icon: <BaseIcon /> },
  { id: arbitrum.id, name: 'Arbitrum One', icon: <ArbitrumIcon /> },
  { id: mainnet.id, name: 'Ethereum', icon: <EthereumIcon /> },
]

const meta = {
  title: 'Bridge/ChainSelector',
  component: ChainSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Dropdown selector for blockchain networks with chain icons. Used to select the source chain for cross-chain bridge transactions.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    onChange: fn(),
    options: chainOptions,
  },
} satisfies Meta<typeof ChainSelector>

export default meta
type Story = StoryObj<typeof meta>

// Helper for controlled stories
const ControlledChainSelector = (args: React.ComponentProps<typeof ChainSelector>) => {
  const [{ value }, updateArgs] = useArgs<{ value: number }>()
  return (
    <ChainSelector
      {...args}
      value={value}
      onChange={chainId => {
        updateArgs({ value: chainId })
        args.onChange?.(chainId)
      }}
    />
  )
}

export const Default: Story = {
  args: {
    value: base.id,
  },
}

export const WithLabel: Story = {
  args: {
    value: base.id,
    label: 'Source Chain',
  },
}

export const ArbitrumSelected: Story = {
  args: {
    value: arbitrum.id,
    label: 'From',
  },
}

export const EthereumSelected: Story = {
  args: {
    value: mainnet.id,
    label: 'From',
  },
}

export const Disabled: Story = {
  args: {
    value: base.id,
    label: 'Chain',
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button')
    await expect(trigger).toBeDisabled()
  },
}

export const EmptyOptions: Story = {
  args: {
    value: 0,
    label: 'Chain',
    options: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Edge case: Empty options array shows placeholder text',
      },
    },
  },
}

export const SingleOption: Story = {
  args: {
    value: base.id,
    label: 'Chain',
    options: [chainOptions[0]],
  },
  parameters: {
    docs: {
      description: {
        story: 'Single option scenario - dropdown still functional but only one choice',
      },
    },
  },
}

export const UseDefaultOptions: Story = {
  args: {
    value: DEFAULT_CHAIN_OPTIONS[0]?.id ?? base.id,
    label: 'Source Chain',
    options: DEFAULT_CHAIN_OPTIONS,
  },
  parameters: {
    docs: {
      description: {
        story: 'Uses DEFAULT_CHAIN_OPTIONS derived from SUPPORTED_SOURCE_CHAINS config',
      },
    },
  },
}

export const Playground: Story = {
  render: ControlledChainSelector,
  args: {
    value: base.id,
    label: 'Select Chain',
  },
}

// ============ INTERACTION TESTS ============

export const DropdownInteraction: Story = {
  render: ControlledChainSelector,
  args: {
    value: base.id,
    label: 'Chain',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button')

    // Open dropdown
    await userEvent.click(trigger)

    // Radix renders menu in portal, query document.body
    const menu = await within(document.body).findByRole('menu')
    await expect(menu).toBeVisible()

    // Find and click Arbitrum option
    const options = within(menu).getAllByRole('menuitem')
    await expect(options.length).toBe(3)

    await userEvent.click(options[1]) // Arbitrum

    // Menu should close after selection
    await expect(within(document.body).queryByRole('menu')).not.toBeInTheDocument()
  },
}

export const KeyboardNavigation: Story = {
  render: ControlledChainSelector,
  args: {
    value: base.id,
    label: 'Chain',
  },
  parameters: {
    docs: {
      description: {
        story: 'Accessibility test: Navigate dropdown with keyboard (Enter, Arrow keys, Escape)',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button')

    // Focus trigger
    trigger.focus()
    await expect(trigger).toHaveFocus()

    // Open with Enter
    await userEvent.keyboard('{Enter}')
    const menu = await within(document.body).findByRole('menu')
    await expect(menu).toBeVisible()

    // Navigate down
    await userEvent.keyboard('{ArrowDown}')
    await userEvent.keyboard('{ArrowDown}')

    // Select with Enter
    await userEvent.keyboard('{Enter}')

    // Menu should close
    await expect(within(document.body).queryByRole('menu')).not.toBeInTheDocument()
  },
}

export const EscapeCloses: Story = {
  args: {
    value: base.id,
    label: 'Chain',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button')

    // Open dropdown
    await userEvent.click(trigger)
    const menu = await within(document.body).findByRole('menu')
    await expect(menu).toBeVisible()

    // Press Escape to close
    await userEvent.keyboard('{Escape}')
    await expect(within(document.body).queryByRole('menu')).not.toBeInTheDocument()
  },
}

export const AriaLabels: Story = {
  args: {
    value: base.id,
    label: 'Source Chain',
  },
  parameters: {
    docs: {
      description: {
        story: 'Verifies proper ARIA attributes for accessibility',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button')

    // Check aria-label includes selected chain name
    await expect(trigger).toHaveAttribute('aria-label', 'Selected chain: Base')
  },
}
