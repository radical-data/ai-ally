<script lang="ts">
	import { goto } from '$app/navigation';

	let newMessage = $state('');
	let messages = $state<{ sender: string; text: string }[]>([]);

	let messagesEnd: HTMLDivElement;

	function leave() {
		console.log('leave?');
		if (confirm('Are you sure you want to leave the chat?')) {
			goto('/');
		}
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

<h1>Chat</h1>

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

<style>
	:root {
		--deep-red: #851a22;
		--bold-red: #bd1622;
		--vibrant-pink: #ec6a9c;
		--soft-pink: #f19cc1;
		--light-pink: #f4adc2;
	}

	h1 {
		text-align: center;
		margin-bottom: 1rem;
		color: var(--deep-red);
		font-family: 'Arial Rounded MT Bold', sans-serif;
	}

	.chat-container {
		display: flex;
		flex-direction: column;
		max-width: 600px;
		margin: 0 auto;
		border-radius: 24px;
		padding: 1.5rem;
		height: 75vh;
		background: linear-gradient(135deg, var(--soft-pink), var(--light-pink));
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
		border: 3px solid var(--vibrant-pink);
	}

	.messages {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow-y: auto;
		padding: 1rem;
		margin-bottom: 1rem;
		border-radius: 16px;
		background: #fff;
		box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
		gap: 0.75rem;
	}

	.message {
		display: inline-block;
		padding: 0.75rem 1.25rem;
		border-radius: 20px 20px 20px 0;
		max-width: 75%;
		word-wrap: break-word;
		font-size: 1rem;
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
		font-size: 1rem;
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
		font-size: 1rem;
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
