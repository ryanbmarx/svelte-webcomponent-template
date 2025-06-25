<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import { CircleX } from '@lucide/svelte';

  const { intervention }: { intervention: Intervention } = $props();
</script>

<li class="selected">
  <Button variant="ghost" size="icon-sm"><CircleX /></Button>
  <span class="label text-sm">{intervention.intervention} ({intervention.id})</span>
</li>

<style lang="postcss">
  .selected {
    color: var(--color-future-ed-blue);
    border: 1px solid currentColor;
    border-radius: 1rem;
    padding: calc(4 * var(--spacing));
    display: grid;
    grid-template-columns: calc(4 * var(--spacing)) minmax(1px, 1fr);
    gap: calc(2 * var(--spacing));
  }

  .label {
    text-transform: uppercase;
    font-weight: bold;
    color: currentColor;
    transform: translate(0, 0.05em);
  }
</style>
