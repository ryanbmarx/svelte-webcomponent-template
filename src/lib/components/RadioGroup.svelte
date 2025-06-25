<script lang="ts" module>
	export type RadioItem = { label: string; value: string | number };
</script>

<script lang="ts">
	let {
		selectedValue = $bindable(),
		items,
		name = `${Math.random()}`,
		onchange = () => {},
	}: {
		selectedValue: string | number;
		items: RadioItem[];
		name: string;
		onchange?: () => void;
	} = $props();
</script>

<ul class="flex gap-2">
	{#each items as { label, value }}
		<li>
			<label for={String(value)} class="flex items-start gap-2 leading-2">
				<input
					class="sr-only"
					id={String(value)}
					{value}
					type="radio"
					{name}
					bind:group={selectedValue}
					{onchange}
				/>
				<span class="check"></span>
				{label}
			</label>
		</li>
	{/each}
</ul>

<style lang="postcss">
	label {
		--check-height: calc(4 * var(--spacing));
		--check-height: 1.3em;
		--check-dot-size: 80%;
		--check-dot-scale: 0;
		line-height: var(--check-height);
		text-wrap: balance;

		&:has(input[type='radio']:checked) {
			--check-dot-scale: 1;
		}
	}

	li {
		flex: 1 1;
	}

	.check {
		flex: 0 0 var(--check-height);
		display: block;
		height: var(--check-height);
		width: var(--check-height);
		border: 1px solid currentColor;
		border-radius: 50%;
		position: relative;

		&::after {
			content: '';
			display: block;
			height: var(--check-dot-size);
			width: var(--check-dot-size);
			position: absolute;
			inset: 50%;
			background-color: currentColor;
			border-radius: inherit;
			translate: -50% -50%;
			transform: scale(var(--check-dot-scale));

			transition: transform 150ms;
		}
	}
</style>
