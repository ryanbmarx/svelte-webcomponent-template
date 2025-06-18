<script lang="ts">
  import FEATURED_INTERVENTIONS from '@/assets/data/featuredInterventions.json';

  import InterventionsDialog from '$lib/components/InterventionsDialog.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { cn } from '$lib/utils';
  import { CheckCircle2 } from '@lucide/svelte';
  import { fly } from 'svelte/transition';

  let {
    selectedIntervention = $bindable(undefined),
    selectedPercentage = $bindable(''),
    onsubmit,
    onFeaturedInterventionSelect,
  }: {
    selectedPercentage: string;
    selectedIntervention?: Intervention;
    onsubmit?: () => void | Promise<void>;
    onFeaturedInterventionSelect?: (intervention: Intervention) => void;
  } = $props();

  let interventionsDialogOpen = $state(false);
</script>

<section class="bg-container">
  <div class="flex flex-col gap-2" style:grid-column="1">
    <h3 class="future-ed-header h1" data-counter="1">Select a policy or program</h3>
    <p class="future-ed-sub-header">
      Choose from the examples below or select your own from a list of hundreds of policies and
      programs
    </p>
  </div>
  <ul>
    {#each FEATURED_INTERVENTIONS as intervention}
      {@const isSelected = selectedIntervention?.id === intervention.id}
      <li>
        <Button
          class="relative m-auto h-full w-full leading-[1.15]"
          size="lg"
          variant={isSelected ? 'outline-selected' : 'outline'}
          onclick={() => {
            onFeaturedInterventionSelect?.(intervention);
          }}
        >
          {intervention.intervention}
          {#if isSelected}
            <span
              transition:fly={{ duration: 150, y: 10 }}
              class="absolute top-1/2 right-0 size-4 -translate-x-1 -translate-y-1/2"
            >
              <CheckCircle2 size="16" />
            </span>
          {/if}
        </Button>
      </li>
    {/each}
    <li>
      <Button
        class="m-auto h-full w-full leading-[1.15] font-bold text-balance"
        style="font-weight: bold"
        size="lg"
        onclick={() => (interventionsDialogOpen = true)}
      >
        Select your own from hundreds of policies and programs
      </Button>
    </li>
  </ul>
</section>

<InterventionsDialog
  bind:selectedPercentage
  bind:open={interventionsDialogOpen}
  bind:selectedIntervention
  {onsubmit}
></InterventionsDialog>

<style lang="postcss">
  ul {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr)); /* ~250px */
    align-items: stretch;
  }
</style>
