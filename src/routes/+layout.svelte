<script lang="ts">
	import Background from '$lib/Background.svelte';
	import '@fontsource-variable/red-hat-display';
</script>

<Background></Background>
<slot></slot>

<style>
	:root {
		--deep-red: #851a22;
		--bold-red: #bd1622;
		--vibrant-pink: #ec6a9c;
		--soft-pink: #f19cc1;
		--light-pink: #f4adc2;
	}
	:global(html, body) {
		overflow: hidden; /* no scrolling */
	}

	:global(html, body, input, button) {
		font-family: 'Red Hat Display Variable', sans-serif;
		font-size: 40px;
	}
</style>
