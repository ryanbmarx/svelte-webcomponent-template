<script lang="ts">
  import Tooltip from '$lib/components/ui/Tooltip.svelte';
  import { BadgeCheck } from '@lucide/svelte';
  import { render } from 'svelte/server';

  let {
    selectedIntervention,
    isMobilityExperience,
  }: { isMobilityExperience: boolean; selectedIntervention?: Intervention } = $props();

  const confidenceLevel = $derived(selectedIntervention?.confidence_level ?? '');
</script>

{#snippet mobilityExperience()}
  <span class="flex flex-none items-center gap-1 text-sm whitespace-nowrap">
    Mobility Experience <BadgeCheck size="16" />
  </span>
{/snippet}
<div>
  <h4 class="intervention mx-auto text-center text-xl font-bold text-balance leading-[1.15em]">
    {selectedIntervention?.intervention ?? ''}
    <Tooltip text={selectedIntervention?.help_text} />
  </h4>
  <span class="text-sm flex gap-2 justify-center">
    {#if confidenceLevel}
      {confidenceLevel}
    {/if}
    {#if confidenceLevel && isMobilityExperience}
      |
    {/if}
    {#if isMobilityExperience}
      {@render mobilityExperience()}
    {/if}
  </span>
</div>

<style lang="postcss">
</style>
