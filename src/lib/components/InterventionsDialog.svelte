<script lang="ts">
  import InterventionLevels from './InterventionLevels.svelte';
  // import * as Collapsible from '$lib/components/ui/collapsible/index.js';
  import INTERVENTIONS from '@/assets/data/interventions.json';
  import { untrack } from 'svelte';
  import { isArray } from 'lodash-es';
  import Dialog from '$lib/components/ui/Dialog.svelte';

  let {
    open = $bindable(),
    onsubmit,
    selectedIntervention = $bindable(undefined),
    selectedPercentage = $bindable(),
  }: {
    selectedPercentage: string;
    selectedIntervention?: Intervention;
    open: boolean;
    onsubmit?: () => void | Promise<void>;
  } = $props();

  const collapsibles: Record<number | string, boolean> = $state({});
  let selectedValue = $state('');

  function handleSubmit() {
    onsubmit?.();
    open = false;
  }

  function onInterventionSelected() {
    const [id, percentage] = selectedValue.split('-');
    if (!id || !percentage) return;
    selectedPercentage = percentage.replace('%', '');
    selectedIntervention = untrack(() => {
      return Object.values(INTERVENTIONS)
        .map((I) => {
          if (isArray(I)) return I;
          return Object.values(I).map((subI) => subI);
        })
        .flat(10)
        .find((i) => i.id === id)!;
    });
    handleSubmit();
  }
</script>

{#snippet interventionListTemplate({
  listItems,
  label,
}: {
  listItems: Intervention[];
  label?: string;
})}
  {#if label}
    <span class="mb-4 block text-sm font-bold text-[#888] uppercase">
      {label}
    </span>
  {/if}
  <ul class="mb-4 flex flex-col gap-4">
    {#each listItems as { id, intervention }}
      <li {id} class="flex flex-col gap-2">
        <span class="text-sm leading-[1.15em] text-balance">
          {intervention}
        </span>
        <InterventionLevels
          bind:selectedValue
          name="intervention"
          category={id}
          onValueChange={onInterventionSelected}
        />
      </li>
    {/each}
  </ul>
{/snippet}

<Dialog
  bind:isOpen={open}
  title="Modify policy and program options"
  description="Interventions are grouped by category. Use the controls in each category section to see how
        an intervention impacts social mobility."
>
  <div class="max-h-[50vh] overflow-auto">
    {#each Object.entries(INTERVENTIONS) as [label, interventionList], index}
      <!-- <Collapsible.Root
        open={!!collapsibles[index]}
        onOpenChange={() => {
          collapsibles[index] = !!!collapsibles[index];
        }}
      >
        <Collapsible.Trigger class="flex w-full items-center justify-between border-t-1 py-2">
          <span class="text-left font-bold text-balance">
            {label}
          </span>
          <span class="icon flex-none" class:plus={!collapsibles[index]}>
            <span class="sr-only">Open this collection of interventions</span>
          </span>
        </Collapsible.Trigger>
        <Collapsible.Content forceMount>
          {#snippet child({ open })}
            {#if !isArray(interventionList)}
              {#if open}
                <ul class="mb-4 flex flex-col gap-4">
                  {#each Object.entries(interventionList) as [subPolicy, subList]}
                    <li>
                      {@render interventionListTemplate({ listItems: subList, label: subPolicy })}
                    </li>
                  {/each}
                </ul>
              {/if}
            {:else if open}
              {@render interventionListTemplate({ listItems: interventionList })}
            {/if}
          {/snippet}
        </Collapsible.Content>
      </Collapsible.Root> -->
    {/each}
  </div>
</Dialog>

<!-- <Dialog.Root bind:open>
  <Dialog.Content class="overflow-hidden border-none pb-0">
    <Dialog.Header>
      <Dialog.Title>Modify policy and program options</Dialog.Title>
      <Dialog.Description>
        Interventions are grouped by category. Use the controls in each category section to see how
        an intervention impacts social mobility.
      </Dialog.Description>
    </Dialog.Header>
    <div class="max-h-[50vh] overflow-auto">
      {#each Object.entries(INTERVENTIONS) as [label, interventionList], index}
        <Collapsible.Root
          open={!!collapsibles[index]}
          onOpenChange={() => {
            collapsibles[index] = !!!collapsibles[index];
          }}
        >
          <Collapsible.Trigger class="flex w-full items-center justify-between border-t-1 py-2">
            <span class="text-left font-bold text-balance">
              {label}
            </span>
            <span class="icon flex-none" class:plus={!collapsibles[index]}>
              <span class="sr-only">Open this collection of interventions</span>
            </span>
          </Collapsible.Trigger>
          <Collapsible.Content forceMount>
            {#snippet child({ open })}
              {#if !isArray(interventionList)}
                {#if open}
                  <ul class="mb-4 flex flex-col gap-4">
                    {#each Object.entries(interventionList) as [subPolicy, subList]}
                      <li>
                        {@render interventionListTemplate({ listItems: subList, label: subPolicy })}
                      </li>
                    {/each}
                  </ul>
                {/if}
              {:else if open}
                {@render interventionListTemplate({ listItems: interventionList })}
              {/if}
            {/snippet}
          </Collapsible.Content>
        </Collapsible.Root>
      {/each}
    </div>
  </Dialog.Content>
</Dialog.Root> -->

<style lang="postcss">
  .icon {
    display: block;
    height: 2.5rem;
    width: 2.5rem;
    position: relative;
    border: 1px solid currentColor;
    border-radius: 50%;
    color: var(--color-future-ed-dark-blue);
    &::before,
    &::after {
      content: '';
      display: block;
      width: 35%;
      height: 2px;
      background: currentColor;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: transform 150ms ease-in-out;
      border-radius: 4px;
    }

    &.plus::after {
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }
</style>
