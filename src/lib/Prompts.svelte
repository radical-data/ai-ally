<div class="nav-beans">
	<button class="bean">How is AI Ally trained?</button>
	<button class="bean">Is AI Ally neutral?</button>
	<button class="bean">Why does this exist?</button>
</div>

<style>
	.nav-beans {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		margin: 0rem auto;
		flex-wrap: wrap;
	}

	.bean {
		font-size: 18px;
		background: radial-gradient(circle at 30% 30%, var(--light-pink), var(--bold-red));
		color: white;
		border: none;
		border-radius: 50% 40% 60% 50% / 60% 50% 40% 50%;
		padding: 1rem;
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
		cursor: pointer;
		transition: transform 0.5s ease-in-out;
		animation: float 3s infinite ease-in-out;
	}

	.bean:nth-child(2) {
		animation-delay: 0.2s;
	}

	.bean:nth-child(3) {
		animation-delay: 0.4s;
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-6px);
		}
	}
</style>
