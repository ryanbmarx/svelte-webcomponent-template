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

<div class="chart {addClass}" role="presentation" class:skeleton={!max}>
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
					{#if secondaryValue}
						<Arc
							value={secondaryValue}
							{range}
							spring
							{domain}
							outerRadius={chartHeight}
							innerRadius={chartHeight - 60}
							fill={colors.secondary}
							track={{ class: 'fill-white' }}
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

					{#if median}
						<Arc
							spring
							class="median"
							stroke="black"
							strokeWidth={2}
							value={median}
							{range}
							{domain}
							outerRadius={chartHeight}
							innerRadius={chartHeight - 60}
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
			<span class="label label--median">Median: {format('$,')(median)}</span>
		{/if}
	</div>
	<span class="label label--max" class:invisible={!max}>${formatAbbreviation(max)}</span>
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
