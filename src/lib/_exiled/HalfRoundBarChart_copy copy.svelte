<script lang="ts">
	import { Chart, Svg, Axis, Bars, Group, LinearGradient, Arc, Text } from 'layerchart';

	interface Props {
		min: number;
		median?: number;
		max: number;
		secondaryValue?: number;
		primaryValue?: number;
		format?: (val: number) => string;
	}

	const {
		min,
		median,
		max,
		secondaryValue,
		primaryValue,
		format = (val) => `${val}`,
	}: Props = $props();

	const colors = {
		primary: '#012169',
		bg: '#fff',
		secondary: '#99E2F3',
	};

	const range: [number, number] = [-90, 90];
	const domain: [number, number] = [min, max];
	let offsetWidth = $state(0);
	const chartHeight = $derived(offsetWidth / 2);
	const chartWidth = 300;

	let offsetHeight = $state();
	let container = $state();
</script>

<div class="chart" role="presentation">
	<span class="label label--min">{format(min)}</span>
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
					<Arc
						value={secondaryValue}
						{range}
						{domain}
						outerRadius={chartHeight}
						innerRadius={chartHeight - 60}
						fill={colors.secondary}
						track={{ class: 'fill-white' }}
					></Arc>
					<Arc
						value={primaryValue}
						{range}
						{domain}
						outerRadius={chartHeight - 15}
						innerRadius={chartHeight - 45}
						let:value
						fill={colors.primary}
					></Arc>
					<!-- MEDIAN -->
					<Arc
						value={median}
						{range}
						{domain}
						outerRadius={chartHeight}
						innerRadius={chartHeight - 60}
						let:value
						fill={colors.primary}
					></Arc>

					<!-- STROKE -->
					<Arc
						value={0}
						{range}
						{domain}
						outerRadius={chartHeight}
						innerRadius={chartHeight - 60}
						let:value
						track={{ class: 'fill-none', style: 'stroke:#aaa' }}
					></Arc>
				</Group>
			</Svg>
		</Chart>
		{#if median}
			<span class="label label--median">Median: {format(median)}</span>
		{/if}
	</div>
	<!-- <span class="label label--median">{median}</span> -->
	<span class="label label--max">{format(max)}</span>
</div>

<style lang="postcss">
	.chart {
		aspect-ratio: 3/2;
		outline: 1px solid blue;

		display: grid;
		grid-template-columns: 3rem 1fr 3rem;
		align-items: end;
	}
	.chart__container {
		grid-column: 2;
		position: relative;
		/* border-bottom: 2px solid black; */
	}
	.label {
		font-size: 0.875rem;

		&--min {
			text-align: right;
		}

		&--median {
			position: absolute;
			left: 50%;
			bottom: 0;
			width: min-content;
		}
	}
</style>
