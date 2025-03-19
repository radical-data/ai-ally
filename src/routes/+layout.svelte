<script>
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
	:global(*) {
		font-family: 'Red Hat Display Variable', sans-serif;
		overflow: hidden; /* no scrolling */
	}
</style>
