<script lang="ts">
  import ChartHeader from './ChartHeader.svelte';
  import InterventionChartIncomeText from './InterventionChartIncomeText.svelte';
  import HalfRoundBarChart from '@/lib/components/HalfRoundBarChart.svelte';
  import Button, {
    type ButtonSize,
    type ButtonVariant,
  } from '$lib/components/ui/button/button.svelte';
  import BadgeCheck from '@lucide/svelte/icons/badge-check';
  import { isGroupData, isSingleData } from '$lib/utils';
  import Tooltip from '$lib/components/ui/Tooltip.svelte';

  let {
    data,
    selectedIntervention = $bindable(),
  }: { data?: DataResponse; selectedIntervention?: Intervention } = $props();

  const DISPLAY_BUTTONS: {
    value: Display;
    label: string;
    size?: ButtonSize;
    variant?: ButtonVariant;
  }[] = [
    {
      value: 'individual',
      label: 'For impacted individuals',
    },
    {
      value: 'group',
      label: 'For population group',
    },
  ];

  let activeDisplay = $state<Display>('individual');
  let isLoading = $state(false);

  const activeData: InterventionDataRow | null = $derived.by(() => {
    if (isSingleData(data)) {
      return data.data;
    } else if (isGroupData(data)) {
      return data.data[activeDisplay];
    }
    return null;
  });

  const max = $derived(activeData?.grossIncomeTopScale ?? 0);
  const median = $derived(activeData?.grossIncomeMedianFullPopulation ?? 0);
  const primaryValue = $derived(activeData?.grossIncomeWithIntervention ?? 0);
  const secondaryValue = $derived(activeData?.grossIncomeNoIntervention ?? 0);
</script>

<section class="bg-container">
  <h3 style:grid-column="1" class="future-ed-header h1" data-counter="3">
    See the impact on income
  </h3>
  <div class="controls">
    {#if selectedIntervention && !!activeData}
      <ChartHeader {selectedIntervention} isMobilityExperience={!!activeData?.mobilityExperience} />
    {/if}
    <div role="toolbar" class="relative flex w-full gap-4" class:hidden={!isGroupData(data)}>
      {#each DISPLAY_BUTTONS as { size = "sm", variant = "default", value, label }}
        {@const isActive = value === activeDisplay}
        <Button
          class="flex-1 font-bold"
          {size}
          variant={isActive ? 'default' : 'outline'}
          onclick={() => (activeDisplay = value)}
        >
          {label}
        </Button>
      {/each}
    </div>
  </div>

  <div class="chart">
    <h3 class="mb-2 text-center text-lg font-bold">
      Gross income (age 35)
      <Tooltip text={selectedIntervention?.help_text ?? ''} />
    </h3>
    <HalfRoundBarChart
      class={isLoading ? 'invisible' : ''}
      min={0}
      {max}
      {median}
      {primaryValue}
      {secondaryValue}
    />
    {#if activeData?.grossIncomePercentDifference}
      <p class="comparison text-center text-sm font-bold">
        Gross income is {Math.abs(activeData.grossIncomePercentDifference)}% higher than without
        policies or programs.
      </p>
    {/if}

    {#if !!activeData}
      <InterventionChartIncomeText {activeData} {selectedIntervention} />
    {:else}
      {#each ['75%', '95%', '45%'] as line}
        <p
          style:width={line}
          style:height="0.875rem"
          role="presentation"
          class="mx-auto my-2 rounded-md bg-(--color-gray-300) text-sm text-(--color-gray-300)"
        >
          .
        </p>
      {/each}
    {/if}
  </div>
</section>

<style lang="postcss">
  .controls {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: calc(var(--spacing) * 4);
    margin: 0 auto;
    max-width: 40rem;
    width: 100%;
  }

  .mb-2 {
    margin-bottom: calc(var(--spacing) * 2);
  }
  .chart {
    width: 100%;
    max-width: 40rem;
    margin: 0 auto;
  }
  .comparison {
    margin-top: 1rem;
  }
</style>
