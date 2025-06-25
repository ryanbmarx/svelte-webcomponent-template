<script lang="ts">
  import { Info } from '@lucide/svelte';
  import { Tooltip } from 'bits-ui';
  import { buttonVariants } from './button';

  const { text }: { text: string | undefined | null } = $props();
</script>

{#if text}
  <Tooltip.Provider>
    <Tooltip.Root delayDuration={200}>
      <Tooltip.Trigger class={buttonVariants({ size: 'tooltip', variant: 'ghost' })}>
        <Info class="size-4" />
      </Tooltip.Trigger>
      <Tooltip.Content sideOffset={4} class="max-w-[20ch]">
        <div
          class="rounded-input border-dark-10 bg-background shadow outline-hidden z-0 flex items-center justify-center border p-3 text-sm font-medium"
          style:box-shadow="0 0 5px #0003"
        >
          {text}
        </div>
      </Tooltip.Content>
    </Tooltip.Root>
  </Tooltip.Provider>
{/if}
