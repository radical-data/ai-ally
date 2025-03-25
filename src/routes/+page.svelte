<script lang="ts">
	import Prompts from '$lib/Prompts.svelte';
	import LeaveModal from '$lib/LeaveModal.svelte';

	import { onMount } from 'svelte';
	import { PUBLIC_AI_URL } from '$env/static/public';
	import { PUBLIC_AI_API_KEY } from '$env/static/public';

	let newMessage = $state('');
	let messages = $state<{ sender: string; text: string }[]>([]);
	let messagesEnd: HTMLDivElement;

	let inputRef: HTMLInputElement;
	let showModal = $state(false);

	async function send() {
		if (newMessage.trim() === '') return;

		const userMessage = { sender: 'user', text: newMessage };
		messages = [...messages, userMessage];

		const body = {
			model: 'llama3.2:1b',
			messages: [
				...messages.map((m) => ({
					role: m.sender === 'user' ? 'user' : 'assistant',
					content: m.text
				}))
			],
			stream: false
		};

		try {
			const res = await fetch(PUBLIC_AI_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${PUBLIC_AI_API_KEY}`
				},
				body: JSON.stringify(body)
			});

			const data = await res.json();

			const aiResponse = data.choices?.[0]?.message?.content || '[no response]';

			messages = [...messages, { sender: 'ai', text: aiResponse }];
			newMessage = '';
		} catch (error) {
			console.error('AI Error:', error);
			messages = [...messages, { sender: 'ai', text: 'Sorry, something went wrong.' }];
		}
	}

	function leave() {
		if (confirm('Are you sure you want to leave the chat?')) {
			initMessages();
		}
	}

	$effect(() => {
		if (messagesEnd) {
			messagesEnd.scrollIntoView({ behavior: 'smooth' });
		}
	});

	onMount(() => {
		initMessages();
	});

	function initMessages() {
		messages = [
			{ sender: 'ai', text: 'Hello, I’m AI Ally. Welcome to this space.' },
			{
				sender: 'ai',
				text: 'Take a moment to settle in, maybe get comfortable with the pillow.'
			},
			{
				sender: 'ai',
				text: 'This is a place for care, solidarity, and shared knowledge—shaped by real experiences of navigating health and the medical system.'
			}
		];
	}

	function handleTextInput(e: Event) {
		const target = e.target as HTMLInputElement;
		newMessage = target.value;
	}

	function fillInput(text: string) {
		newMessage = text;
		inputRef?.focus();
	}
</script>

<button class="leave-button" onclick={() => (showModal = true)}>Leave</button>

<div class="chat-container">
	<div class="messages">
		{#each messages as { sender, text }, i (i)}
			<div class="message {sender === 'user' ? 'user' : 'ai'}">
				<p>{text}</p>
			</div>
		{/each}
		<div bind:this={messagesEnd}></div>
	</div>

	<Prompts {fillInput}></Prompts>

	<div class="controls">
		<input
			bind:this={inputRef}
			type="text"
			value={newMessage}
			oninput={handleTextInput}
			placeholder="Type your message..."
			onkeydown={(e) => e.key === 'Enter' && send()}
		/>
		<button class="send" onclick={send} aria-label="Send message">
			<svg width="60" height="60" fill="currentColor" viewBox="0 0 24 24">
				<path d="M2 21l21-9L2 3v7l15 2-15 2z" />
			</svg>
		</button>
	</div>
</div>

{#if showModal}
	<LeaveModal
		onClose={() => (showModal = false)}
		resetChat={() => {
			initMessages();
			newMessage = '';
		}}
	/>
{/if}

<style>
	.chat-container {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		height: 100vh;
		padding: 2rem 1rem;
		box-sizing: border-box;
	}

	.leave-button {
		all: unset;
		position: fixed;
		top: 0px;
		right: 32px;
		/* top: 1rem;
		right: 1rem; */
		background: linear-gradient(to bottom, var(--soft-pink), var(--vibrant-pink));
		border-radius: 0px 0px 45px 45px;
		padding: 0.5rem 1rem;
		font-weight: bold;
		cursor: pointer;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		font-size: 28px;
		color: black;
		z-index: 1000;
	}

	.messages {
		flex: 1;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0 1rem;
	}

	.message {
		max-width: 85%;
		padding-block: 24px;
		padding-inline: 20px;
		border-radius: 20px;
		line-height: 126%;
		border-radius: 45px 45px 45px 15px;
	}

	.message p {
		margin: 0px;
	}

	.message.ai {
		background: linear-gradient(to right, var(--soft-pink), var(--light-pink));
		align-self: flex-start;
		color: black;
	}

	.message.user {
		background: rgba(255, 255, 255, 0.85);
		align-self: flex-end;
		color: black;
		border-radius: 22px 22px 6px 22px;
	}

	.controls {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-top: 1rem;
		padding: 0 1rem;
	}

	.controls input[type='text'] {
		flex: 1;
		border: none;
		border-radius: 100px;
		padding: 1.2rem 2rem;
		outline: none;
		background: var(--light-pink);
		backdrop-filter: blur(8px);
	}

	.controls .send {
		background: linear-gradient(to bottom right, var(--vibrant-pink), var(--soft-pink));
		border: none;
		border-radius: 50%;
		padding: 1rem;
		color: white;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
