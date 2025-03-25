<script lang="ts">
	import { goto } from '$app/navigation';
	import LeaveModal from '$lib/LeaveModal.svelte';

	let newMessage = $state('');
	let messages = $state<{ sender: string; text: string }[]>([]);

	let messagesEnd: HTMLDivElement;
	let showLeaveModal = $state(false);

	function leave() {
		showLeaveModal = true;
	}

	function closeModal() {
		showLeaveModal = false;
	}

	function send() {
		if (newMessage.trim() === '') return;

		messages = [...messages, { sender: 'You', text: newMessage }];

		setTimeout(() => {
			messages = [...messages, { sender: 'AI Ally', text: 'This is a placeholder response.' }];
		}, 1000);

		newMessage = '';
	}

	$effect(() => {
		if (messagesEnd) {
			messagesEnd.scrollIntoView({ behavior: 'smooth' });
		}
	});

	messages = [{ sender: 'AI Ally', text: 'Welcome to the chat!' }];

	function handleTextInput(e: Event) {
		const target = e.target as HTMLInputElement;
		newMessage = target.value;
	}
</script>

<div class="chat-container">
	<div class="messages">
		{#each messages as { sender, text }, i (i)}
			<div class="message {sender === 'You' ? 'user' : 'ally'}">
				<span class="sender">{sender}:</span>
				<span class="text">{text}</span>
			</div>
		{/each}
		<div bind:this={messagesEnd}></div>
	</div>

	<div class="controls">
		<input
			type="text"
			value={newMessage}
			oninput={handleTextInput}
			placeholder="Type your message..."
			onkeydown={(e) => e.key === 'Enter' && send()}
		/>
		<button class="send" onclick={send}>Send</button>
		<button class="leave" onclick={leave}>Leave</button>
	</div>
</div>

{#if showLeaveModal}
	<LeaveModal onClose={closeModal} />
{/if}

<style>
	:root {
		--deep-red: #851a22;
		--bold-red: #bd1622;
		--vibrant-pink: #ec6a9c;
		--soft-pink: #f19cc1;
		--light-pink: #f4adc2;
	}

	* {
		font-size: 26px;
	}

	.chat-container {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		border-radius: 24px;
		padding: 1.5rem;
		height: 99vh;
		box-sizing: border-box;

		background: rgba(255, 255, 255, 0.15);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border: 2px solid rgba(255, 255, 255, 0.3);
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
	}

	.messages {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow-y: auto;
		padding: 1rem;
		margin-bottom: 1rem;
		border-radius: 16px;

		background: rgba(255, 255, 255, 0.3);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
	}

	.message {
		display: inline-block;
		padding: 0.75rem 1.25rem;
		border-radius: 20px 20px 20px 0;
		max-width: 75%;
		word-wrap: break-word;
		transition: background-color 0.3s;
	}

	.message.user {
		align-self: flex-end;
		background: linear-gradient(135deg, var(--vibrant-pink), var(--soft-pink));
		color: #fff;
		border-radius: 20px 20px 0 20px;
		text-align: right;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.message.ally {
		align-self: flex-start;
		background: linear-gradient(135deg, #fff, #f8f8f8);
		color: var(--deep-red);
		border: 2px solid var(--light-pink);
		text-align: left;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
	}

	.message .sender {
		display: block;
		font-weight: bold;
		margin-bottom: 0.25rem;
	}

	.controls {
		display: flex;
		gap: 0.5rem;
	}

	input[type='text'] {
		flex: 1;
		padding: 0.75rem 1rem;
		border-radius: 24px;
		border: 2px solid var(--vibrant-pink);
		outline: none;
		transition:
			border-color 0.3s,
			box-shadow 0.3s;
	}

	input[type='text']:focus {
		border-color: var(--deep-red);
		box-shadow: 0 0 8px var(--vibrant-pink);
	}

	button {
		padding: 0.75rem 1.25rem;
		border-radius: 24px;
		cursor: pointer;
		border: none;
		transition:
			background-color 0.3s,
			transform 0.2s,
			box-shadow 0.2s;
		font-weight: bold;
	}

	button.send {
		background: var(--deep-red);
		color: #fff;
	}

	button.send:hover {
		background: var(--bold-red);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(133, 26, 34, 0.4);
	}

	button.leave {
		background: var(--vibrant-pink);
		color: #fff;
	}

	button.leave:hover {
		background: var(--soft-pink);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(236, 106, 156, 0.4);
	}
</style>
