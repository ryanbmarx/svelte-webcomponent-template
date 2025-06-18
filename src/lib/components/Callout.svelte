<script lang="ts">
	import { format } from 'd3-format';
	import NumberFlow from '@number-flow/svelte';

	interface Props {
		dark?: boolean;
		value: number;
		label: string;
		labelDifference?: number | null;
		style?: string;
	}

	const { dark = false, value, label, labelDifference, style = '' }: Props = $props();

	const NUMBER_FORMAT_OPTIONS = {
		respectMotionPreference: true,
		willChange: true,
	};
</script>

<div class="callout flex flex-col gap-2" class:dark {style}>
	<span class="block text-sm leading-[1.15] text-balance">{label}</span>
	<span class="value block rounded-md text-lg font-bold">
		<NumberFlow
			{...NUMBER_FORMAT_OPTIONS}
			format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
			{value}
		/>
	</span>
	{#if labelDifference}
		<span
			class="block text-sm leading-[1.15] font-bold text-balance text-(--color-future-ed-dark-blue)"
		>
			Change: {labelDifference < 0 ? '-' : ''}
			<NumberFlow {...NUMBER_FORMAT_OPTIONS} suffix="%" value={labelDifference} />
		</span>
	{/if}
</div>

<style lang="postcss">
	.callout {
		--text-color: black;
		--text-bg: var(--color-future-ed-medium-blue);
		width: 7rem;
		text-align: center;
	}

	.dark {
		--text-color: white;
		--text-bg: var(--color-future-ed-dark-blue);
	}

	.value {
		color: var(--text-color);
		background-color: var(--text-bg);
	}
</style>
