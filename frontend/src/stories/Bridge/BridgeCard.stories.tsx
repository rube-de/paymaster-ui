import type { Meta, StoryObj } from '@storybook/react-vite'
import { BridgeCard, BridgeCardSection, BridgeCardDivider } from '../../components/bridge/BridgeCard'

const meta = {
  title: 'Bridge/BridgeCard',
  component: BridgeCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Container component for bridge UI elements. Provides consistent styling with glassmorphism effect.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
} satisfies Meta<typeof BridgeCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div className="h-32 flex items-center justify-center text-white/50">Card content goes here</div>
    ),
  },
}

export const WithHeader: Story = {
  args: {
    title: 'Bridge Assets',
    description: 'Transfer tokens across chains',
    children: (
      <div className="h-32 flex items-center justify-center text-white/50">Card content goes here</div>
    ),
  },
}

export const WithSection: Story = {
  args: {
    children: null, // Render function handles children
  },
  render: () => (
    <BridgeCard title="Send">
      <BridgeCardSection label="From">
        <div className="h-14 bg-black/20 rounded-xl border border-white/10 flex items-center justify-center text-white/50">
          Token selector placeholder
        </div>
      </BridgeCardSection>
    </BridgeCard>
  ),
}

export const WithDivider: Story = {
  args: {
    children: null,
  },
  render: () => (
    <BridgeCard>
      <BridgeCardSection label="From">
        <div className="h-14 bg-black/20 rounded-xl border border-white/10 flex items-center justify-center text-white/50">
          Source
        </div>
      </BridgeCardSection>

      <BridgeCardDivider />

      <BridgeCardSection label="To">
        <div className="h-14 bg-black/20 rounded-xl border border-white/10 flex items-center justify-center text-white/50">
          Destination
        </div>
      </BridgeCardSection>
    </BridgeCard>
  ),
}

export const Composed: Story = {
  args: {
    children: null,
  },
  render: () => (
    <BridgeCard title="Bridge" description="Move assets between networks">
      <BridgeCardSection label="You send">
        <div className="h-14 bg-black/20 rounded-xl border border-white/10 px-4 flex items-center justify-between">
          <span className="text-white/50">100</span>
          <span className="text-white font-medium">USDC</span>
        </div>
      </BridgeCardSection>

      <BridgeCardDivider />

      <BridgeCardSection label="You receive">
        <div className="h-14 bg-black/20 rounded-xl border border-white/10 px-4 flex items-center justify-between">
          <span className="text-white/50">~99.50</span>
          <span className="text-white font-medium">ROSE</span>
        </div>
      </BridgeCardSection>

      <div className="mt-6">
        <button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors">
          Bridge Now
        </button>
      </div>
    </BridgeCard>
  ),
}
