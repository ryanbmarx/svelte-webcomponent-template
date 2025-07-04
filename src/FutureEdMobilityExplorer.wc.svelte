<!-- <svelte:options customElement="future-ed-mobility-explorer" /> -->

<script lang="ts">
  import InterventionChart from './lib/components/intervention-chart/InterventionChart.svelte';
  import Interventions from './lib/components/Interventions.svelte';
  import SelectDemographics from '$lib/components/SelectDemographics.svelte';
  import { type ButtonSize, type ButtonVariant } from '$lib/components/ui/button/button.svelte';
  import { onMount } from 'svelte';
  import { getInterventionData } from '$lib/data';
  import { isError } from '$lib/errors';
  // import styles from '@/app.css?inline';

  const DISPLAY_BUTTONS: {
    value: Display;
    label: string;
    size?: ButtonSize;
    variant?: ButtonVariant;
  }[] = [
    {
      value: 'group',
      label: 'For population group',
    },
    {
      value: 'individual',
      label: 'For impacted individuals',
    },
  ];

  let race = $state<Race>('black');
  let income = $state<Income>(1);
  let isLoading = $state(false);
  let selectedPercentage = $state<string>('');
  let selectedIntervention = $state<Intervention>();
  let data = $state<DataResponse>();

  const segment: number = $derived.by(() => {
    const black = {
      1: 7,
      2: 8,
      3: 9,
    };
    const hispanic = {
      1: 4,
      2: 5,
      3: 6,
    };
    switch (race) {
      case 'white':
        // 7-9
        return black[income];
      case 'black':
        return income;

      case 'hispanic':
        // 4-6
        return hispanic[income];
    }
  });

  onMount(() => {
    updateData();
  });

  async function updateData() {
    const selectedInterventionId = selectedIntervention?.id;

    if (!selectedInterventionId || !segment || !selectedPercentage) {
      return;
    }

    try {
      isLoading = true;
      const response = await getInterventionData(
        selectedInterventionId,
        segment,
        selectedPercentage
      );
      if (response?.success) {
        data = response;
      } else {
        console.error('Error:', response?.error);
        throw new Error(response?.error);
      }
    } catch (e) {
      console.error('Fetch error:', e);
      data = undefined;
      const message = isError(e) ? e.message : `${e}`;
    } finally {
      isLoading = false;
    }
  }

  function onFeaturedInterventionSelect(intervention: Intervention) {
    selectedIntervention = intervention;
    selectedPercentage = intervention.featured ?? '';
    updateData();
  }
</script>

<!-- <svelte:element this={'style'}>{styles}</svelte:element> -->
<main>
  <Interventions
    bind:selectedIntervention
    bind:selectedPercentage
    onsubmit={updateData}
    {onFeaturedInterventionSelect}
  />
  <SelectDemographics bind:race bind:income onchange={updateData}></SelectDemographics>
  <InterventionChart {data} bind:selectedIntervention></InterventionChart>
</main>

<!-- <Toaster /> -->

<style lang="postcss">
  main {
    display: flex;
    gap: calc(var(--spacing) * 4);
    flex-flow: column nowrap;
  }
  :global {
    #future-ed-mobility :is(ul, ol) {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .block__inner-wrap.block__inner-wrap--narrow:has(#future-ed-mobility) {
      /* Hack to make WP's container not a skinny column */
      max-width: unset;
    }
  }
</style>
