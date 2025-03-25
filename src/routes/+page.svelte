<script lang="ts">
	import Prompts from '$lib/Prompts.svelte';
	import LeaveModal from '$lib/LeaveModal.svelte';

	import { onMount, tick } from 'svelte';
	import { PUBLIC_AI_URL } from '$env/static/public';
	import { PUBLIC_AI_API_KEY } from '$env/static/public';

	let newMessage = $state('');
	let messages = $state<{ sender: string; text: string }[]>([]);
	let messagesEnd: HTMLDivElement;

	let inputRef: HTMLInputElement;
	let showModal = $state(false);
	let aiTyping = $state(false);
	let typingIndicatorVisible = $state(false);

	let messagesContainer: HTMLDivElement;
	let showFade = $state(false);

	function checkScrollFade() {
		if (!messagesContainer) return;

		const hasScrolled = messagesContainer.scrollTop > 4;
		const canScroll = messagesContainer.scrollHeight > messagesContainer.clientHeight;

		showFade = canScroll && hasScrolled;
	}

	async function send() {
		if (newMessage.trim() === '') return;

		const userMessage = { sender: 'user', text: newMessage };
		messages = [...messages, userMessage];
		newMessage = '';

		aiTyping = true;

		// Show the typing indicator a little after AI starts thinking
		setTimeout(
			() => {
				if (aiTyping) typingIndicatorVisible = true;
			},
			300 + Math.random() * 1000
		);

		const body = {
			model: 'llama3.2:1b',
			messages: messages.map((m) => ({
				role: m.sender === 'user' ? 'user' : 'assistant',
				content: m.text
			})),
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
		} catch (error) {
			console.error('AI Error:', error);
			messages = [...messages, { sender: 'ai', text: 'Sorry, something went wrong.' }];
		} finally {
			aiTyping = false;
			typingIndicatorVisible = false;
		}
	}

	$effect(() => {
		messages;
		aiTyping;
		typingIndicatorVisible;

		tick().then(() => {
			checkScrollFade();
			if (messagesEnd) {
				messagesEnd.scrollIntoView({ behavior: 'smooth', block: 'end' });
			}
		});
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
	<div
		class="messages {showFade ? 'fade-visible' : ''}"
		bind:this={messagesContainer}
		onscroll={checkScrollFade}
	>
		{#each messages as { sender, text }, i (i)}
			<div class="message {sender === 'user' ? 'user' : 'ai'}">
				<p>{text}</p>
			</div>
		{/each}
		{#if typingIndicatorVisible}
			<div
				class="message ai typing-indicator"
				aria-live="polite"
				aria-label="AI Ally is typing"
			></div>
		{/if}
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
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		height: 100vh;
		padding: 2rem 1rem;
		box-sizing: border-box;
		overflow: hidden;
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
		position: relative;
		scroll-behavior: smooth;
	}

	/* Only show the scroll-fade mask when scrolling down */
	.messages.fade-visible {
		-webkit-mask-image: linear-gradient(to bottom, transparent, black 2rem);
		mask-image: linear-gradient(to bottom, transparent, black 2rem);
		mask-mode: alpha;
		mask-composite: destination-in;
		-webkit-mask-composite: destination-in;

		transition:
			-webkit-mask-image 0.4s ease-in-out,
			mask-image 0.4s ease-in-out;
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

	.typing-indicator {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 1rem 1.5rem;
		background: linear-gradient(to right, var(--soft-pink), var(--light-pink));
		border-radius: 45px 45px 45px 15px;
		max-width: 200px;
		position: relative;
		gap: 8px;
	}

	.typing-indicator::after {
		content: '';
		display: flex;
		justify-content: space-between;
		width: 1.5rem;
		height: 0.5rem;
		background:
			radial-gradient(circle closest-side, rgba(0, 0, 0, 0.5) 50%, transparent 60%) 0 50%,
			radial-gradient(circle closest-side, rgba(0, 0, 0, 0.5) 50%, transparent 60%) 50% 50%,
			radial-gradient(circle closest-side, rgba(0, 0, 0, 0.5) 50%, transparent 60%) 100% 50%;
		background-repeat: no-repeat;
		background-size: 0.4rem 0.4rem;
		animation: blink 1.2s infinite ease-in-out;
	}

	@keyframes blink {
		0% {
			background-position:
				0 50%,
				50% 50%,
				100% 50%;
			opacity: 0.2;
		}
		33% {
			opacity: 0.5;
		}
		66% {
			opacity: 0.8;
		}
		100% {
			opacity: 0.2;
		}
	}
</style>
