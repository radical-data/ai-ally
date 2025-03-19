<script lang="ts">
	import { goto } from '$app/navigation';

	function leave() {
		console.log('leave?');
		if (confirm('Are you sure you want to leave the chat?')) {
			goto('/');
		}
	}

	function send() {
		console.log('send message');
	}
</script>

<h1>Chat</h1>
<input type="text" />
<button onclick={send}>Send</button>
<button onclick={leave}>Leave chat</button>
