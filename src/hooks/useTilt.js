import { useEffect } from 'react';
import { useReducedMotion } from 'motion/react';

const lerp = (a, b, t) => a + (b - a) * t;

// Mouse-parallax "postcard tilt": as the cursor moves over `triggerRef`,
// rotateX/rotateY and a subtle background-position shift are written as CSS
// custom properties onto every ref in `targetRefs`, smoothed with its own
// rAF + lerp loop. Values are written straight to the DOM (never through
// React state), the same performance contract Motion's useMotionValue gives
// for continuous input — no per-frame re-render. Disabled entirely under
// prefers-reduced-motion.
export default function useTilt(triggerRef, targetRefs) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return undefined;
    const trigger = triggerRef.current;
    if (!trigger) return undefined;

    let lerpAmount = 0.06;
    const rot = { cx: 0, cy: 0, tx: 0, ty: 0 };
    const bg = { cx: 0, cy: 0, tx: 0, ty: 0 };
    let rafId;

    const tick = () => {
      rot.cx = lerp(rot.cx, rot.tx, lerpAmount);
      rot.cy = lerp(rot.cy, rot.ty, lerpAmount);
      bg.cx = lerp(bg.cx, bg.tx, lerpAmount);
      bg.cy = lerp(bg.cy, bg.ty, lerpAmount);

      targetRefs.forEach((ref) => {
        const el = ref.current;
        if (!el) return;
        el.style.setProperty('--rotX', `${rot.cy.toFixed(2)}deg`);
        el.style.setProperty('--rotY', `${rot.cx.toFixed(2)}deg`);
        el.style.setProperty('--bgPosX', `${bg.cx.toFixed(2)}%`);
        el.style.setProperty('--bgPosY', `${bg.cy.toFixed(2)}%`);
      });

      rafId = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      lerpAmount = 0.1;
      const rect = trigger.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      const ox = (offsetX - rect.width * 0.5) / (Math.PI * 3);
      const oy = -(offsetY - rect.height * 0.5) / (Math.PI * 4);
      rot.tx = ox;
      rot.ty = oy;
      bg.tx = -ox * 0.3;
      bg.ty = oy * 0.3;
    };

    const onLeave = () => {
      lerpAmount = 0.06;
      rot.tx = 0;
      rot.ty = 0;
      bg.tx = 0;
      bg.ty = 0;
    };

    trigger.addEventListener('mousemove', onMove);
    trigger.addEventListener('mouseleave', onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      trigger.removeEventListener('mousemove', onMove);
      trigger.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);
}
