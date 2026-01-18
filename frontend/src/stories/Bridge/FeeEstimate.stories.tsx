import type { Meta, StoryObj } from '@storybook/react-vite'
import { FeeEstimate } from '../../components/bridge/FeeBreakdown'

const meta = {
  title: 'Bridge/FeeEstimate',
  component: FeeEstimate,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Displays source and destination amounts with exchange rate. Responsive layout with vertical arrows on mobile.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof FeeEstimate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    sourceAmount: '100',
    sourceToken: 'USDC',
    destinationAmount: '1,050',
    destinationToken: 'ROSE',
  },
}

export const WithRate: Story = {
  args: {
    sourceAmount: '100',
    sourceToken: 'USDC',
    destinationAmount: '1,050',
    destinationToken: 'ROSE',
    rate: '1 USDC ≈ 10.5 ROSE',
  },
}

export const Loading: Story = {
  args: {
    sourceAmount: '100',
    sourceToken: 'USDC',
    destinationAmount: '',
    destinationToken: 'ROSE',
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state shows animated dots for both source and destination amounts',
      },
    },
  },
}

export const LargeAmounts: Story = {
  args: {
    sourceAmount: '1,000,000',
    sourceToken: 'USDC',
    destinationAmount: '10,500,000',
    destinationToken: 'ROSE',
    rate: '1 USDC ≈ 10.5 ROSE',
  },
}

export const SmallAmounts: Story = {
  args: {
    sourceAmount: '0.001',
    sourceToken: 'ETH',
    destinationAmount: '10.50',
    destinationToken: 'ROSE',
    rate: '1 ETH ≈ 10,500 ROSE',
  },
}

export const DifferentTokenPairs: Story = {
  args: {
    sourceAmount: '500',
    sourceToken: 'USDT',
    destinationAmount: '5,250',
    destinationToken: 'ROSE',
    rate: '1 USDT ≈ 10.5 ROSE',
  },
}

export const NoRate: Story = {
  args: {
    sourceAmount: '100',
    sourceToken: 'USDC',
    destinationAmount: '1,050',
    destinationToken: 'ROSE',
  },
  parameters: {
    docs: {
      description: {
        story: 'Without rate prop, the exchange rate line is not displayed',
      },
    },
  },
}

export const Responsive: Story = {
  args: {
    sourceAmount: '100',
    sourceToken: 'USDC',
    destinationAmount: '1,050',
    destinationToken: 'ROSE',
    rate: '1 USDC ≈ 10.5 ROSE',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'On mobile viewports, layout stacks vertically with a down arrow instead of horizontal arrow',
      },
    },
  },
}

export const InContext: Story = {
  args: {
    sourceAmount: '100',
    sourceToken: 'USDC',
    destinationAmount: '1,050',
    destinationToken: 'ROSE',
    rate: '1 USDC ≈ 10.5 ROSE',
  },
  render: args => (
    <div className="space-y-4 p-6 bg-black/40 rounded-2xl border border-white/10">
      <h3 className="text-lg font-semibold text-white">Bridge Summary</h3>
      <FeeEstimate {...args} />
      <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors">
        Confirm Bridge
      </button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'FeeEstimate component shown in context within a bridge card',
      },
    },
  },
}
