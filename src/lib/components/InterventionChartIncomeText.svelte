<script lang="ts">
  import { format } from 'd3-format';

  type NetIncomeDirection = 'rises' | 'drops' | 'stays_down' | 'stays_up';

  let { activeData }: { activeData: InterventionDataRow } = $props();

  const {
    grossIncomeWithIntervention,
    intervention,
    netIncomeDifference,
    netIncomePercentDifference,
    netIncomeNoIntervention,
    netIncomeWithIntervention,
  } = $derived(activeData);

  const direction: NetIncomeDirection | null = $derived.by(() => {
    if (!netIncomeWithIntervention || !netIncomeNoIntervention) return null;

    if (netIncomeWithIntervention < 0 && netIncomeNoIntervention < 0) return 'stays_down';
    if (netIncomeWithIntervention >= 0 && netIncomeNoIntervention >= 0) return 'stays_up';
    if (netIncomeWithIntervention > netIncomeNoIntervention) return 'rises';
    return 'drops';
  });

  const netIncomePercentDifferenceString = $derived(
    `${Math.abs(Number(netIncomePercentDifference))}%`
  );

  const grossIncomeWithInterventionString = $derived(
    format('$,')(grossIncomeWithIntervention ?? 0)
  );
  const netIncomeDifferenceString = $derived(format('$,')(netIncomeDifference ?? 0));
  const netIncomeWithInterventionString = $derived(format('$,')(netIncomeWithIntervention ?? 0));
</script>

{#if grossIncomeWithIntervention && netIncomeDifference}
  <h3 class="mb-2 text-center text-lg font-bold">
    Income after taxes, benefits, and essential costs (age 35)
  </h3>
  {#if direction === 'rises'}
    <p>
      {intervention} adds
      <strong>{netIncomeDifferenceString}</strong>
      back into this family's budget,
      <strong>{netIncomePercentDifferenceString}</strong>
      more than before. With an income of
      <strong>{grossIncomeWithInterventionString}</strong>
      the family can now cover essential costs and contribute to savings.
    </p>
  {:else if direction === 'drops'}
    <p>The family's net income fell below the livable required amount.</p>
  {:else if direction === 'stays_down'}
    <p>
      {intervention} adds
      <strong>{netIncomeDifferenceString}</strong>
      back into this family's budget,
      <strong>{netIncomePercentDifferenceString}</strong>
      more than before. With an income of
      <strong>{grossIncomeWithInterventionString}</strong>
      the family is still {netIncomeWithInterventionString}
      short of being able to fully cover essential costs.
    </p>
  {:else if direction === 'stays_up'}
    <p>
      {intervention} adds
      <strong>{netIncomeDifferenceString}</strong>
      back into this family's budget,
      <strong>{netIncomePercentDifferenceString}</strong>
      more than before. With an income of
      <strong>{grossIncomeWithInterventionString}</strong>
      the family can cover essential costs and contribute more to savings.
    </p>
  {/if}
{/if}

<style lang="postcss">
  h3 {
    --pad: calc(6 * var(--spacing));
    padding-top: var(--pad);
    margin-top: var(--pad);
    position: relative;
    &::after {
      content: '';
      display: block;
      width: 50%;
      height: 1px;
      background-color: #aaa;

      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
  p {
    line-height: 1.3em;
  }
</style>
