<nav class="blob-nav">
	<a href="/about/training" class="blob">
		<span class="circle-text">How is AI Ally trained?</span>
	</a>
	<a href="/about/bias" class="blob">
		<span class="circle-text">Is AI Ally neutral?</span>
	</a>
	<a href="/about/vision" class="blob">
		<span class="circle-text">Vision for AI Ally</span>
	</a>
</nav>

<style>
	.blob-nav {
		display: flex;
		gap: 2rem;
		justify-content: center;
		align-items: center;
		margin-bottom: 2rem;
		flex-wrap: wrap;
		z-index: 2;
		padding: 1rem;
	}

	.blob {
		position: relative;
		width: 100px;
		height: 100px;
		background: linear-gradient(135deg, var(--vibrant-pink), var(--soft-pink));
		border-radius: 50% 60% 40% 50% / 50% 40% 60% 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
		transition:
			transform 0.3s,
			box-shadow 0.3s;
	}

	.blob:hover {
		transform: scale(1.05) rotate(2deg);
		box-shadow: 0 12px 20px rgba(0, 0, 0, 0.3);
	}

	.circle-text {
		font-size: 0.8rem;
		color: #fff;
		text-align: center;
		width: 80px;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		padding: 10px;
		line-height: 1.2;
	}

	.blob:nth-child(1) {
		background: radial-gradient(circle at 30% 30%, var(--soft-pink), var(--vibrant-pink));
	}

	.blob:nth-child(2) {
		background: radial-gradient(circle at 70% 70%, var(--bold-red), var(--vibrant-pink));
	}

	.blob:nth-child(3) {
		background: radial-gradient(circle at 50% 50%, var(--deep-red), var(--bold-red));
	}
</style>
