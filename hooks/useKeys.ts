import { MutableRefObject, useEffect } from 'react';
import { shouldIgnore } from '../lib/keys';
import { getSounds, Sounds } from '../lib/sounds';
import { Action } from '../lib/types';

export function useKeys(
	targetKey: string,
	dispatch: React.Dispatch<Action>,
	soundEnabled: boolean,
	soundsRef: MutableRefObject<Sounds | undefined>,
	ignore: boolean
) {
	useEffect(() => {
		if (ignore) return;

		if (!soundsRef.current) soundsRef.current = getSounds();

		function handleKeyDown(event: KeyboardEvent) {
			if (ignore) return;
			if (shouldIgnore(event.key)) return;

			// ignore these key combos
			const controlOrMeta = event.metaKey || event.ctrlKey;
			if (controlOrMeta) {
				if (event.key === 'r' || event.key === '-' || event.key === '=') return;
			}

			if (soundEnabled) {
				soundsRef.current!.randomClick();
			}

			if (event.key === 'Enter') {
				return dispatch({ type: 'reset' });
			}

			if (event.key === 'Backspace' || event.key === 'ArrowLeft') {
				// in windows: ctrl + backspace to delete entire word
				// in mac: option (alt) + backspace to delete entire word
				return dispatch({ type: 'back', alt: event.altKey || event.ctrlKey });
			}

			dispatch({ type: 'keydown', key: event.key });

			// play error if typed the wrong key
			if (soundEnabled) {
				if (targetKey !== event.key) {
					soundsRef.current!.error.play();
				} else {
					soundsRef.current!.randomClick();
				}
			}
		}

		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [soundEnabled, dispatch, targetKey, soundsRef, ignore]);
}