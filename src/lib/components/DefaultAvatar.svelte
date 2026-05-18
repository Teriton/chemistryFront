<script lang="ts">
	let { class: className = '' }: { class?: string } = $props();
</script>

<!-- Схематичный силуэт по плечи (значение по умолчанию для аватара) -->
<svg
	class={className}
	viewBox="0 0 64 64"
	fill="currentColor"
	aria-hidden="true"
>
	<circle cx="32" cy="22" r="12" opacity="0.9" />
	<path
		d="M12 58c2-14 10-20 20-20s18 6 20 20"
		fill="none"
		stroke="currentColor"
		stroke-width="4"
		stroke-linecap="round"
		opacity="0.85"
	/>
</svg>
