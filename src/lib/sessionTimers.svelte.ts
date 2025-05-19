import { onMount } from 'svelte';

const ACTIVITY_EVENTS = ['mousemove', 'keydown', 'click', 'touchstart'];

/**
 * Monitors for user inactivity and resets the session if the user is inactive for a given period.
 * Prompts the user first, then resets if there's no response within `responseWindowMs`.
 */
export function useInactivityResetTimer({
	timeoutMs = 60_000,
	responseWindowMs = 30_000,
	onPrompt,
	onReset
}: {
	timeoutMs?: number;
	responseWindowMs?: number;
	onPrompt?: () => void;
	onReset?: () => void;
}) {
	let lastActivity = $state(Date.now());
	let hasPrompted = $state(false);

	let responseTimer: ReturnType<typeof setTimeout> | undefined;

	const checkInactivity = () => {
		const now = Date.now();
		const inactiveDuration = now - lastActivity;

		if (!hasPrompted && inactiveDuration >= timeoutMs) {
			hasPrompted = true;
			onPrompt?.();

			responseTimer = setTimeout(() => {
				onReset?.();
			}, responseWindowMs);
		}
	};

	$effect(() => {
		const interval = setInterval(checkInactivity, 1000);
		return () => clearInterval(interval);
	});

	onMount(() => {
		const handleActivity = () => {
			lastActivity = Date.now();

			if (hasPrompted) {
				hasPrompted = false;
				clearTimeout(responseTimer);
				responseTimer = undefined;
			}
		};

		for (const event of ACTIVITY_EVENTS) window.addEventListener(event, handleActivity);

		return () => {
			for (const event of ACTIVITY_EVENTS) window.removeEventListener(event, handleActivity);
			clearTimeout(responseTimer);
		};
	});
}

/**
 * Starts a countdown to a creative engagement prompt (e.g. suggesting the user write a letter)
 * once the user first interacts with the page.
 */
export function useEngagementPromptTimer({
	delayMs = 3 * 60_000,
	onPrompt
}: {
	delayMs?: number;
	onPrompt: () => void;
}) {
	let timer: ReturnType<typeof setTimeout> | undefined;
	let started = false;

	const maybeStart = () => {
		if (!started) {
			started = true;
			timer = setTimeout(() => {
				onPrompt();
			}, delayMs);
		}
	};

	onMount(() => {
		const handleActivity = () => maybeStart();
		for (const event of ACTIVITY_EVENTS) window.addEventListener(event, handleActivity);

		return () => {
			for (const event of ACTIVITY_EVENTS) window.removeEventListener(event, handleActivity);
			clearTimeout(timer!);
		};
	});
}
