# Scroll-led 3D interaction rebuild

## Goal
Turn the existing long editorial homepage into a reliable scroll-directed experience: multiple intentional pinned chapters, real-time 3D abstract objects, and dense but restrained microinteractions without changing the content or product pages.

## What will change
- Replace the current competing smooth-scroll and pin setup with one Lenis/GSAP lifecycle, correct refresh/cleanup behavior, reduced-motion support, and responsive pin behavior.
- Add a full-bleed React Three Fiber stage to the homepage using custom abstract chrome, glass, and signal-blue forms that match the existing Nothin’ visual language.
- Drive object position, rotation, scale, material response, and camera framing from scroll progress so the 3D composition transforms between pinned chapters.
- Rework the hero into a clean pinned opening sequence where the 3D object remains fully visible while the manifesto typography moves around it.
- Keep the horizontal Works chapter pinned, but correct its travel measurement and spacing so entry and exit feel deliberate.
- Turn Approach and Ethos into additional pinned scenes with chapter-specific 3D choreography and text transitions.
- Add a minimal fixed progress rail and section markers to make the unusually long page feel navigable.
- Add microinteractions to links, project rows, buttons, FAQ controls, list rows, and the pointer: magnetic pull, directional underlines, image tilt/reveal, character/line response, and tactile press states.
- Preserve fast mobile behavior by reducing geometry detail, disabling expensive pointer effects on touch devices, and using simpler non-pinned transitions where needed.

## Technical details
- Install `three`, `@react-three/fiber`, `@react-three/drei`, and Three.js types for React 19.
- Keep the 3D implementation client-only and isolated in focused components.
- Use procedural geometry because the objects are abstract rather than recognizable real-world models.
- Cap pixel density, avoid runtime CDN assets, keep the scene continuously lit, and pause unnecessary rendering when offscreen.
- Remove the existing static hero cutout choreography where it conflicts with the 3D stage; existing work photography and case-study pages remain unchanged.
- Add unique homepage metadata required by the current route setup.

## Validation
- Verify the hero, each pinned chapter, the horizontal Works sequence, and the final unpin transition at desktop and mobile widths.
- Compare screenshots at multiple scroll positions to confirm visible 3D motion and correct framing.
- Check the browser console for WebGL, hydration, ScrollTrigger, and asset errors.
- Confirm reduced-motion behavior and that links, FAQ controls, and project navigation still work.
