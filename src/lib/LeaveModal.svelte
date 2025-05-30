<script lang="ts">
	let { onClose, resetChat, timeoutMs = 5_000 } = $props();

	let confirmed = $state(false);

	function confirmLeave() {
		confirmed = true;

		if (resetChat) resetChat();
		setTimeout(() => {
			onClose?.();
		}, timeoutMs);
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
			<p>
				If you want to stay a little longer, I invite you to write a letter—of protest, grief, or
				solidarity—for the Wall of Grievances. Use the paper and pen beside you, and hang your words
				with the magnets.
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
		background: rgba(255, 245, 245, 0.9);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}

	.modal {
		background: rgba(255, 245, 245, 0.9); /* soft light pink for readability */
		backdrop-filter: blur(8px);
		border-radius: 24px;
		border: 2px solid rgba(255, 255, 255, 0.5);
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
		padding: 2rem;
		text-align: center;
		width: 80%;
		color: #300;
		animation: fadeIn 0.3s ease;
	}
	.modal h2 {
		margin-top: 0;
		font-size: 1.5rem;
		color: #800;
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
