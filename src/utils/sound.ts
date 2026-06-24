import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (Platform.OS !== 'web') return null;
  if (typeof AudioContext === 'undefined' && typeof (window as any).webkitAudioContext === 'undefined') return null;
  if (!audioCtx || audioCtx.state === 'closed') {
    const Ctx = (window as any).AudioContext ?? (window as any).webkitAudioContext;
    audioCtx = new Ctx();
  }
  return audioCtx;
}

function webTone(freq: number, endFreq: number, duration: number, gain: number) {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.connect(g);
  g.connect(ctx.destination);

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + duration);

  g.gain.setValueAtTime(gain, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration + 0.01);
}

/** Light tap — chip toggles, filter presses */
export function playTap() {
  if (Platform.OS === 'web') {
    webTone(600, 300, 0.06, 0.18);
  } else {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  }
}

/** Confirm — step completion, card open */
export function playSelect() {
  if (Platform.OS === 'web') {
    webTone(520, 780, 0.09, 0.22);
  } else {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
  }
}

/** Dismiss / undo — modal close, clear all, undo step */
export function playDismiss() {
  if (Platform.OS === 'web') {
    webTone(400, 220, 0.08, 0.14);
  } else {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  }
}
