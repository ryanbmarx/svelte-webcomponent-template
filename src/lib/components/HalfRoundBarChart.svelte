<script lang="ts">
  import Callout from './Callout.svelte';

  import { Chart, Svg, Axis, Bars, Group, LinearGradient, Arc, Text } from 'layerchart';
  import { format } from 'd3-format';

  interface Props {
    min?: number;
    median?: number;
    max: number;
    secondaryValue?: number;
    primaryValue?: number;
    class?: string;
  }

  const {
    min = 0,
    median,
    max,
    secondaryValue,
    primaryValue,
    class: addClass = '',
  }: Props = $props();

  let offsetHeight = $state();
  let container = $state();

  const colors = {
    primary: '#012169',
    bg: '#fff',
    secondary: '#99E2F3',
    median: '#EFEDEE',
    stroke: '#aaa',
  };
  const range: [number, number] = [-90, 90];
  const domain: [number, number] = $derived([min, max]);
  let offsetWidth = $state(0);
  const chartHeight = $derived(offsetWidth / 2);

  var formatNumber = format('.0f'),
    formatBillion = function (x: number) {
      return formatNumber(x / 1e9) + 'B';
    },
    formatMillion = function (x: number) {
      return formatNumber(x / 1e6) + 'M';
    },
    formatThousand = function (x: number) {
      return formatNumber(x / 1e3) + 'k';
    };

  // Cribbed from https://github.com/d3/d3/issues/2241
  function formatAbbreviation(x: number) {
    var v = Math.abs(x);
    return (v >= 0.9995e9 ? formatBillion : v >= 0.9995e6 ? formatMillion : formatThousand)(x);
  }
</script>

<div
  class="chart {addClass}"
  role="presentation"
  class:skeleton={!max}
  style:--color-median={colors.median}
  style:--color-stroke={colors.stroke}
>
  {#if secondaryValue}
    <Callout
      value={secondaryValue}
      label="Without policies and programs"
      style="grid-row:1; grid-column: 1;"
    />
  {/if}
  {#if primaryValue}
    <Callout
      style="grid-row:1; grid-column: 3;"
      value={primaryValue}
      dark
      label="With policies and programs"
    />
  {/if}
  <span class="label label--min" class:invisible={!max}>{format('$,')(min)}</span>
  <div
    class="chart__container"
    style:height="{chartHeight}px"
    bind:offsetHeight
    bind:offsetWidth
    bind:this={container}
  >
    <Chart x="value" y="value">
      <Svg center="x">
        <Group y={chartHeight}>
          {#if median}
            <Arc
              spring
              fill={colors.median}
              stroke={colors.stroke}
              track={{ class: 'fill-white' }}
              class="median"
              strokeWidth={2}
              value={median}
              {range}
              {domain}
              outerRadius={chartHeight}
              innerRadius={chartHeight - 60}
            ></Arc>
          {/if}
          {#if secondaryValue}
            <Arc
              value={secondaryValue}
              {range}
              spring
              {domain}
              outerRadius={chartHeight}
              innerRadius={chartHeight - 60}
              fill={colors.secondary}
              track={{ class: 'fill-transparent' }}
            ></Arc>
          {/if}
          {#if primaryValue}
            <Arc
              value={primaryValue}
              {range}
              spring
              {domain}
              outerRadius={chartHeight - 15}
              innerRadius={chartHeight - 45}
              fill={colors.primary}
            ></Arc>
          {/if}

          <!-- STROKE -->
          <Arc
            value={0}
            {range}
            {domain}
            spring
            outerRadius={chartHeight}
            innerRadius={chartHeight - 60}
            track={{ class: 'fill-none', style: 'stroke:#aaa' }}
          ></Arc>
        </Group>
      </Svg>
    </Chart>

    {#if median}
      <span class="label label--median">
        <svg
          role="presentation"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          style:overflow="visible"
        >
          <path
            d="M 20 100 A 80 80 0 0 1 100 20 L 100 40 A 60 60 0 0 0 40 100 Z"
            fill="var(--color-median)"
            stroke="var(--color-stroke)"
            stroke-width="2"
          />
        </svg>
        Median: {format('$,')(median)}
      </span>
    {/if}

    <span class="label label--max" class:invisible={!max}>${formatAbbreviation(max)}</span>
  </div>
</div>

<style lang="postcss">
  .chart {
    --baseline-color: black;

    /* aspect-ratio: 2/1; */
    position: relative;

    display: grid;
    grid-template-columns: 8rem 1fr 8rem;
    grid-template-rows: auto auto;
    align-items: end;
    gap: var(--spacing);
  }

  .skeleton {
    --baseline-color: #aaa;
  }

  .chart__container {
    grid-column: 2;
    grid-row: 1/-1;
    position: relative;
    /* border-bottom: 2px solid black; */
  }
  .label {
    grid-row: 2;
    font-size: 0.875rem;
  }
  .label--min {
    text-align: right;
  }
  .label--median {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    max-width: 8ch;
    text-align: center;
    line-height: 1.15;
    font-weight: normal;
    font-style: italic;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    svg {
      width: 2rem;
    }
  }

  :global {
    .layercake-container::after {
      content: '';
      display: block;
      height: 2px;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      background: var(--baseline-color);
      transform: scale(1.05, 1);
      border-radius: 9999px;
    }
  }
</style>
