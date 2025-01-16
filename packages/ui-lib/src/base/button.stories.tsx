import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'], // Storybook 7에서 자동 문서화 지원
  args: {
    children: 'Click Me', // 기본 Props
  },
  argTypes: {
    variant: {
      control: 'select', // 'select'를 사용해 드롭다운 UI 제공
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ], // variant 옵션
      description: 'The variant of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select', // 'select'를 사용해 드롭다운 UI 제공
      options: ['default', 'sm', 'lg', 'icon'], // size 옵션
      description: 'The size of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};
export const Primary: Story = {
  args: {
    variant: 'default',
  },
};
export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};
