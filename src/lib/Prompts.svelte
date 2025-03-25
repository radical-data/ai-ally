<script lang="ts">
	let { fillInput } = $props();

	const prompts = [
		'How is AI Ally trained?',
		'Is AI Ally neutral?',
		'Why does this exist?',
		'Who made this?'
	];

	function handleClick(text: string) {
		fillInput(text);
	}
</script>

<div class="prompt-beans">
	{#each prompts as prompt, i}
		<button class="bean-wrapper" onclick={() => handleClick(prompt)}>
			<svg
				viewBox="0 0 793.7 566.93"
				xmlns="http://www.w3.org/2000/svg"
				aria-label={prompt}
				role="img"
			>
				<path
					d="M609.19,440.36c-18.93-2.27-37.4-8.19-56.41-9.14-35.96-1.79-70.46,14.34-100.27,34.59-29.82,20.25-56.65,44.92-87.44,63.62-25.9,15.72-54.42,27.03-84,33.3-36.11,7.66-65.38,2.81-74.85,1.32-78.17-12.35-127.34-67.8-141.27-83.96C45.63,457.66-1.56,395.18.04,306.07c1.6-89.24,51.11-147.81,71.98-172.51,35.43-41.92,72.78-63.1,97.99-77.11C192.84,43.76,278.24-.97,399.55.02c120.66.98,339.58,47.71,386.29,194.31,2.08,6.53,26.96,96.66-24.23,172.61-33.34,49.47-93.56,80.48-152.42,73.43Z"
					fill="url(#gradient)"
				/>
				<defs>
					<linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
						<stop offset="0%" stop-color="#f4adc2" />
						<stop offset="100%" stop-color="#bd1622" />
					</linearGradient>
				</defs>
				<text
					x="50%"
					y="50%"
					text-anchor="middle"
					dominant-baseline="middle"
					fill="white"
					font-size="70px"
					font-weight="bold"
				>
					{prompt}
				</text>
			</svg>
		</button>
	{/each}
</div>

<style>
	.prompt-beans {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 1rem;
	}

	.bean-wrapper {
		cursor: pointer;
		width: 180px;
		height: 130px;
		background: none;
		border: none;
		padding: 0;
		animation: float 3s infinite ease-in-out;
	}

	.bean-wrapper:nth-child(2) {
		animation-delay: 0.2s;
	}
	.bean-wrapper:nth-child(3) {
		animation-delay: 0.4s;
	}
	.bean-wrapper:nth-child(4) {
		animation-delay: 0.6s;
	}

	svg {
		width: 100%;
		height: 100%;
		display: block;
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-6px);
		}
	}
</style>
