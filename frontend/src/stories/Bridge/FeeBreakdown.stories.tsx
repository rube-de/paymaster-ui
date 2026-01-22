import type { Meta, StoryObj } from '@storybook/react-vite'
import { FeeBreakdown, FeeItem } from '../../components/bridge/FeeBreakdown'

const sampleItems: FeeItem[] = [
  { label: 'Network fee', value: '0.001 ETH', subValue: '~$2.50' },
  { label: 'Bridge fee', value: '0.1%', subValue: '~$1.00' },
  { label: 'You receive', value: '99.5 ROSE', highlight: true },
]

const loadingItems: FeeItem[] = [
  { label: 'Network fee', value: '', loading: true },
  { label: 'Bridge fee', value: '', loading: true },
  { label: 'You receive', value: '', loading: true },
]

const partialLoadingItems: FeeItem[] = [
  { label: 'Network fee', value: '0.001 ETH', subValue: '~$2.50' },
  { label: 'Bridge fee', value: '', loading: true },
  { label: 'Exchange rate', value: '', loading: true },
  { label: 'You receive', value: '99.5 ROSE', highlight: true },
]

const meta = {
  title: 'Bridge/FeeBreakdown',
  component: FeeBreakdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Displays transaction fee breakdown with optional loading states per item. Supports estimated time and slippage display.',
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
    variant: { control: 'select', options: ['expanded', 'summary', 'static'] },
  },
} satisfies Meta<typeof FeeBreakdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: sampleItems,
  },
}

export const WithTitle: Story = {
  args: {
    items: sampleItems,
    title: 'Transaction Details',
  },
}

export const WithExtras: Story = {
  args: {
    items: sampleItems,
    title: 'Transaction Details',
    estimatedTime: '~2 minutes',
    slippage: '0.5%',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows estimated time and max slippage below the fee items',
      },
    },
  },
}

export const Loading: Story = {
  args: {
    items: loadingItems,
    title: 'Transaction Details',
  },
  parameters: {
    docs: {
      description: {
        story: 'All fee items in loading state with animated dots',
      },
    },
  },
}

export const PartialLoading: Story = {
  args: {
    items: partialLoadingItems,
    title: 'Transaction Details',
  },
  parameters: {
    docs: {
      description: {
        story: 'Some items loaded while others are still loading (per-item loading states)',
      },
    },
  },
}

export const SummaryVariant: Story = {
  args: {
    items: sampleItems,
    estimatedTime: '~2 minutes',
    slippage: '0.5%',
    variant: 'summary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact single-line summary with expandable details (click to expand)',
      },
    },
  },
}

export const StaticVariant: Story = {
  args: {
    items: [],
    estimatedTime: '~2 minutes',
    slippage: '0.5%',
    variant: 'static',
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple read-only display with no interaction (for static info)',
      },
    },
  },
}

export const Empty: Story = {
  args: {
    items: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Returns null when no items and no extras - nothing rendered',
      },
    },
  },
}

export const OnlyExtras: Story = {
  args: {
    items: [],
    title: 'Transaction Info',
    estimatedTime: '~30 seconds',
    slippage: '1%',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows only estimated time and slippage without fee items',
      },
    },
  },
}

export const HighlightedTotal: Story = {
  args: {
    items: [
      { label: 'Subtotal', value: '100 USDC' },
      { label: 'Network fee', value: '-0.50 USDC' },
      { label: 'Bridge fee', value: '-0.10 USDC' },
      { label: 'Total received', value: '99.40 ROSE', highlight: true },
    ],
    title: 'Fee Breakdown',
  },
  parameters: {
    docs: {
      description: {
        story: 'highlight=true renders the value in green accent color',
      },
    },
  },
}

export const ManyItems: Story = {
  args: {
    items: [
      { label: 'Source amount', value: '1,000 USDC' },
      { label: 'Exchange rate', value: '1 USDC = 10.5 ROSE' },
      { label: 'Protocol fee', value: '0.3%', subValue: '-3 USDC' },
      { label: 'Network fee (Base)', value: '0.001 ETH', subValue: '~$2.50' },
      { label: 'Network fee (Sapphire)', value: '0.01 ROSE', subValue: '~$0.01' },
      { label: 'Slippage protection', value: '0.5%' },
      { label: 'Minimum received', value: '10,447.50 ROSE', highlight: true },
    ],
    title: 'Detailed Breakdown',
    estimatedTime: '2-5 minutes',
    slippage: '0.5%',
  },
  parameters: {
    docs: {
      description: {
        story: 'Complex breakdown with many fee items and sub-values',
      },
    },
  },
}
