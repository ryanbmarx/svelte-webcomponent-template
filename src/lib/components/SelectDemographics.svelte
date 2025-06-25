<script lang="ts">
  import RadioGroup, { type RadioItem } from '$lib/components/RadioGroup.svelte';

  const RACES: RadioItem[] = [
    { value: 'black', label: 'Black' },
    { value: 'white', label: 'White' },
    { value: 'hispanic', label: 'Hispanic' },
  ] as const;

  let {
    race = $bindable('black'),
    income = $bindable(1),
    onchange,
  }: {
    race: Race;
    income: Income;
    onchange: () => void | Promise<void>;
  } = $props();

  const INCOMES: RadioItem[] = [
    { label: 'Low income: $32,000 for a family of four', value: 1 },
    {
      label: 'Moderate income: $32,000 to $64,000 for a family of four',
      value: 2,
    },
    { label: 'Middle income and above: More than $64,000 for a family of four', value: 3 },
  ] as const;
</script>

<section class="bg-container">
  <h3 class="future-ed-header h1" style:grid-column="1" data-counter="2">Select population</h3>
  <div>
    <h4 class="label">Race/ethnicity</h4>
    <RadioGroup items={RACES} bind:selectedValue={race} name="race" {onchange} />
  </div>
  <div>
    <h4 class="label">Parent income in childhood</h4>
    <RadioGroup items={INCOMES} bind:selectedValue={income} name="income" {onchange} />
  </div>
</section>

<style lang="postcss">
  div {
    flex: 1 1 max-content;
  }
</style>
