<script>
	import Background from '$lib/Background.svelte';
	import '@fontsource-variable/red-hat-display';
</script>

<Background></Background>
<slot></slot>

<style>
	:global(*) {
		font-family: 'Red Hat Display Variable', sans-serif;
	}
</style>
