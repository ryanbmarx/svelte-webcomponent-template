<script lang="ts">
	let {
		selectedValue = $bindable(),
		name,
		category,
		onValueChange,
	}: {
		selectedValue: string;
		name: string;
		category: string;
		onValueChange?: () => void | Promise<void>;
	} = $props();

	const levels = ['10%', '50%', '75%'];
</script>

<ul class="radios" style:--total={levels.length}>
	{#each levels as value}
		<li>
			<label class="radio">
				<input
					class="sr-only"
					type="radio"
					value="{category}-{value}"
					{name}
					bind:group={selectedValue}
					onchange={onValueChange}
				/>
				{value}
			</label>
		</li>
	{/each}
</ul>

<style lang="postcss">
	.radios {
		display: grid;
		grid-template-columns: repeat(var(--total), minmax(1px, 1fr));
	}

	li:not(:first-of-type) .radio {
		border-left: none;
	}

	.radio {
		display: block;
		border: 1px solid #ddd;
		padding: calc(2 * var(--spacing)) calc(4 * var(--spacing));
		cursor: pointer;
		text-align: center;
		position: relative;

		&:hover {
			background-color: #ddd;
		}

		&:has(input:checked) {
			font-weight: bold;
			border-left: unset;
			border-color: var(--color-future-ed-dark-blue);
			border-left: 1px solid var(--color-future-ed-dark-blue);

			background: var(--color-future-ed-medium-blue);
		}
	}
</style>
