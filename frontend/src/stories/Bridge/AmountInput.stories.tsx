import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'
import { expect, fn, userEvent, within } from 'storybook/test'
import { AmountInput } from '../../components/bridge/AmountInput'
import { parseUnits } from 'viem'

const meta = {
  title: 'Bridge/AmountInput',
  component: AmountInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Numeric input with decimal validation, MAX button, and balance display. Supports gas buffer for native tokens.',
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
    decimals: { control: { type: 'number', min: 0, max: 18 } },
    disabled: { control: 'boolean' },
    showMaxButton: { control: 'boolean' },
    isNativeToken: { control: 'boolean' },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof AmountInput>

export default meta
type Story = StoryObj<typeof meta>

// Helper to create controlled story
const ControlledAmountInput = (args: React.ComponentProps<typeof AmountInput>) => {
  const [{ value }, updateArgs] = useArgs<{ value: string }>()
  return <AmountInput {...args} value={value ?? ''} onChange={v => updateArgs({ value: v })} />
}

export const Default: Story = {
  args: {
    value: '',
    label: 'Amount',
    placeholder: '0.00',
  },
}

export const WithBalance: Story = {
  args: {
    value: '50',
    label: 'Amount',
    balance: parseUnits('100.5', 18),
    maxValue: parseUnits('100.5', 18),
    decimals: 18,
  },
}

export const WithError: Story = {
  args: {
    value: '150',
    label: 'Amount',
    maxValue: parseUnits('100', 18),
    error: 'Insufficient balance',
  },
}

export const ExceedsMax: Story = {
  args: {
    value: '150',
    label: 'Amount',
    maxValue: parseUnits('100', 18),
    decimals: 18,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows built-in "Amount exceeds maximum" error when value > maxValue',
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    value: '100',
    label: 'Amount',
    disabled: true,
    balance: parseUnits('500', 18),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox')
    const maxButton = canvas.getByRole('button', { name: /max/i })

    await expect(input).toBeDisabled()
    await expect(maxButton).toBeDisabled()
  },
}

export const ZeroBalance: Story = {
  args: {
    value: '',
    label: 'Amount',
    balance: 0n,
    maxValue: 0n,
    decimals: 18,
  },
  parameters: {
    docs: {
      description: {
        story: 'Edge case: MAX button with zero balance should not produce negative values',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const maxButton = canvas.getByRole('button', { name: /max/i })

    await userEvent.click(maxButton)

    const input = canvas.getByRole('textbox')
    await expect(input).toHaveValue('0')
  },
}

export const MaxBelowGasBuffer: Story = {
  render: ControlledAmountInput,
  args: {
    value: '',
    label: 'Amount (Native Token)',
    maxValue: parseUnits('0.005', 18), // Less than default gas buffer (0.01)
    isNativeToken: true,
    gasBuffer: parseUnits('0.01', 18),
    decimals: 18,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Edge case: When maxValue < gasBuffer for native tokens, MAX should set to 0 (not negative)',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const maxButton = canvas.getByRole('button', { name: /max/i })

    await userEvent.click(maxButton)

    const input = canvas.getByRole('textbox')
    // Should be "0" not negative
    await expect(input).toHaveValue('0')
  },
}

export const WithTrailing: Story = {
  args: {
    value: '100',
    label: 'Amount',
    trailing: (
      <span className="flex items-center gap-1 text-white font-medium">
        <span className="size-5 rounded-full bg-blue-500" />
        USDC
      </span>
    ),
  },
}

export const Playground: Story = {
  render: ControlledAmountInput,
  args: {
    value: '',
    label: 'Amount',
    placeholder: '0.00',
    decimals: 6,
    balance: parseUnits('1000', 6),
    maxValue: parseUnits('1000', 6),
    showMaxButton: true,
    isNativeToken: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground for testing all AmountInput features',
      },
    },
  },
}

// ============ INTERACTION TESTS ============

export const DecimalValidation: Story = {
  render: ControlledAmountInput,
  args: {
    value: '',
    label: 'Amount (6 decimals)',
    decimals: 6,
    placeholder: '0.000000',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox')

    // Type valid amount with exactly 6 decimals
    await userEvent.type(input, '1.123456')
    await expect(input).toHaveValue('1.123456')

    // Clear and try to type 7 decimals - should be rejected
    await userEvent.clear(input)
    await userEvent.type(input, '1.1234567')
    // Only 6 decimals should be accepted, 7th character rejected
    await expect(input).toHaveValue('1.123456')
  },
}

export const InvalidInputRejected: Story = {
  render: ControlledAmountInput,
  args: {
    value: '',
    label: 'Amount',
    decimals: 18,
  },
  parameters: {
    docs: {
      description: {
        story: 'Invalid characters and formats are rejected on input',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox')

    // Try to type letters - should be rejected
    await userEvent.type(input, 'abc')
    await expect(input).toHaveValue('')

    // Try valid number first, then invalid
    await userEvent.type(input, '123')
    await expect(input).toHaveValue('123')

    // Try to type letters after valid number
    await userEvent.type(input, 'abc')
    await expect(input).toHaveValue('123')

    // Try double decimal - second dot rejected
    await userEvent.clear(input)
    await userEvent.type(input, '1.2.3')
    await expect(input).toHaveValue('1.2')
  },
}

export const MaxButtonClick: Story = {
  render: ControlledAmountInput,
  args: {
    value: '',
    label: 'Amount',
    maxValue: parseUnits('100.5', 18),
    decimals: 18,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const maxButton = canvas.getByRole('button', { name: /max/i })
    const input = canvas.getByRole('textbox')

    await userEvent.click(maxButton)
    await expect(input).toHaveValue('100.5')
  },
}

export const GasBufferSubtraction: Story = {
  render: ControlledAmountInput,
  args: {
    value: '',
    label: 'Amount (Native Token)',
    maxValue: parseUnits('10', 18),
    isNativeToken: true,
    gasBuffer: parseUnits('0.01', 18), // 0.01 ETH gas buffer
    decimals: 18,
  },
  parameters: {
    docs: {
      description: {
        story: 'For native tokens, MAX subtracts gas buffer to leave room for transaction fees',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const maxButton = canvas.getByRole('button', { name: /max/i })
    const input = canvas.getByRole('textbox')

    await userEvent.click(maxButton)
    // Should be 10 - 0.01 = 9.99
    await expect(input).toHaveValue('9.99')
  },
}

export const NoGasBufferForERC20: Story = {
  render: ControlledAmountInput,
  args: {
    value: '',
    label: 'Amount (ERC20)',
    maxValue: parseUnits('10', 18),
    isNativeToken: false, // ERC20 token
    gasBuffer: parseUnits('0.01', 18),
    decimals: 18,
  },
  parameters: {
    docs: {
      description: {
        story: 'ERC20 tokens do not subtract gas buffer since gas is paid in native token',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const maxButton = canvas.getByRole('button', { name: /max/i })
    const input = canvas.getByRole('textbox')

    await userEvent.click(maxButton)
    // Should be full 10, no gas buffer subtraction
    await expect(input).toHaveValue('10')
  },
}
