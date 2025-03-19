<script lang="ts">
	let container: HTMLDivElement;
</script>

<div bind:this={container}></div>

<style>
	div {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		overflow: hidden;
	}

	div {
		background: linear-gradient(-45deg, #851a22, #bd1622, #ec6a9c, #f19cc1, #f4adc2);
		background-size: 400% 400%;
		animation: gradientMove 15s ease infinite;
	}

	@keyframes gradientMove {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
</style>
