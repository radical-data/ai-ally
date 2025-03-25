<script lang="ts">
	import { goto } from '$app/navigation';

	let { onClose, resetChat } = $props();

	let confirmed = $state(false);

	function confirmLeave() {
		confirmed = true;

		if (resetChat) resetChat();

		setTimeout(() => {
			onClose?.();
		}, 2000);
	}

	function cancelLeave() {
		if (onClose) onClose();
	}
</script>

<div class="modal-overlay">
	<div class="modal">
		{#if !confirmed}
			<h2>End this chat?</h2>
			<p>
				It's okay to take a break. If you leave now, your conversation will be cleared and all data
				deleted.
			</p>
			<div class="modal-buttons">
				<button class="stay" onclick={cancelLeave}>Stay</button>
				<button class="leave" onclick={confirmLeave}>Leave</button>
			</div>
		{:else}
			<h2>All clear!</h2>
			<p>Your chat has ended and your messages have been deleted.</p>
			<p>Redirecting...</p>
		{/if}
	</div>
</div>

<style>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}

	.modal {
		background: rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-radius: 24px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
		padding: 2rem;
		text-align: center;
		width: 80%;
		max-width: 400px;
		color: var(--deep-red);
	}

	.modal h2 {
		margin-top: 0;
		font-size: 1.5rem;
		color: var(--bold-red);
	}

	.modal p {
		margin: 1rem 0 2rem;
	}

	.modal-buttons {
		display: flex;
		justify-content: space-around;
		gap: 1rem;
	}

	.modal-buttons button {
		flex: 1;
		padding: 0.75rem 1.25rem;
		border-radius: 24px;
		font-size: 1rem;
		cursor: pointer;
		border: none;
		font-weight: bold;
		transition:
			background-color 0.3s,
			transform 0.2s,
			box-shadow 0.2s;
	}

	.modal-buttons .stay {
		background: var(--vibrant-pink);
		color: #fff;
	}

	.modal-buttons .stay:hover {
		background: var(--soft-pink);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(236, 106, 156, 0.4);
	}

	.modal-buttons .leave {
		background: var(--deep-red);
		color: #fff;
	}

	.modal-buttons .leave:hover {
		background: var(--bold-red);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(133, 26, 34, 0.4);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
