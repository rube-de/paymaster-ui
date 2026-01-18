import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'
import { expect, fn, userEvent, within } from 'storybook/test'
import { TokenSelector, TokenOption, getTokenKey } from '../../components/bridge/TokenSelector'

// Sample token icons
const USDCIcon = () => (
  <div className="size-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
    $
  </div>
)

const USDTIcon = () => (
  <div className="size-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
    T
  </div>
)

const ROSEIcon = () => (
  <div className="size-6 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs font-bold">
    R
  </div>
)

// Sample token options
const tokenOptions: TokenOption[] = [
  {
    symbol: 'USDC',
    name: 'USD Coin',
    icon: <USDCIcon />,
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    decimals: 6,
    chainId: 8453,
    chainName: 'Base',
    balance: '1,234.56',
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    icon: <USDTIcon />,
    address: '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2',
    decimals: 6,
    chainId: 8453,
    chainName: 'Base',
    balance: '500.00',
  },
  {
    symbol: 'ROSE',
    name: 'Oasis ROSE',
    icon: <ROSEIcon />,
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    chainId: 23294,
    chainName: 'Sapphire',
    balance: '10,000.00',
  },
]

const meta = {
  title: 'Bridge/TokenSelector',
  component: TokenSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Dropdown selector for tokens with icon, symbol, and optional chain/balance display. Supports single-token read-only mode.',
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
    showChainName: { control: 'boolean' },
    showBalance: { control: 'boolean' },
    disabled: { control: 'boolean' },
    singleToken: { control: 'boolean' },
  },
  args: {
    onChange: fn(),
    options: tokenOptions,
  },
} satisfies Meta<typeof TokenSelector>

export default meta
type Story = StoryObj<typeof meta>

// Helper for controlled stories
const ControlledTokenSelector = (args: React.ComponentProps<typeof TokenSelector>) => {
  const [{ value }, updateArgs] = useArgs<{ value: string | null }>()
  return (
    <TokenSelector
      {...args}
      value={value ?? null}
      onChange={(key, token) => {
        updateArgs({ value: key })
        args.onChange?.(key, token)
      }}
    />
  )
}

export const Default: Story = {
  args: {
    value: null,
    label: 'Select token',
    placeholder: 'Choose a token',
  },
}

export const WithSelection: Story = {
  args: {
    value: getTokenKey(tokenOptions[0]),
    label: 'Token',
  },
}

export const WithChainName: Story = {
  args: {
    value: getTokenKey(tokenOptions[0]),
    label: 'Token',
    showChainName: true,
  },
}

export const WithBalance: Story = {
  args: {
    value: null,
    label: 'Token',
    showBalance: true,
  },
}

export const SingleToken: Story = {
  args: {
    value: getTokenKey(tokenOptions[2]), // ROSE
    label: 'You receive',
    singleToken: true,
    showChainName: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Read-only display mode for destination tokens with no dropdown',
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    value: getTokenKey(tokenOptions[0]),
    label: 'Token',
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
    value: null,
    label: 'Token',
    options: [],
    placeholder: 'No tokens available',
  },
  parameters: {
    docs: {
      description: {
        story: 'Edge case: Empty options array',
      },
    },
  },
}

export const LongTokenNames: Story = {
  args: {
    value: null,
    label: 'Token',
    options: [
      {
        symbol: 'VERYLONGTOKEN',
        name: 'This Is A Very Long Token Name That Should Be Truncated',
        icon: <USDCIcon />,
        chainId: 1,
        chainName: 'Ethereum Mainnet',
        balance: '1,234,567,890.123456',
      },
    ],
    showChainName: true,
    showBalance: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests text truncation with very long token names and balances',
      },
    },
  },
}

export const Playground: Story = {
  render: ControlledTokenSelector,
  args: {
    value: null,
    label: 'Select token',
    showChainName: true,
    showBalance: true,
  },
}

// ============ INTERACTION TESTS ============

export const DropdownInteraction: Story = {
  render: ControlledTokenSelector,
  args: {
    value: null,
    label: 'Token',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button')

    // Open dropdown
    await userEvent.click(trigger)

    // Radix renders menu in portal, query document.body
    const menu = await within(document.body).findByRole('menu')
    await expect(menu).toBeVisible()

    // Find and click first option
    const options = within(menu).getAllByRole('menuitem')
    await expect(options.length).toBe(3)

    await userEvent.click(options[0])

    // Menu should close after selection
    await expect(within(document.body).queryByRole('menu')).not.toBeInTheDocument()
  },
}

export const KeyboardNavigation: Story = {
  render: ControlledTokenSelector,
  args: {
    value: null,
    label: 'Token',
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
    value: null,
    label: 'Token',
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
