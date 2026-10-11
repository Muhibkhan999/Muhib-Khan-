<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the elastic name chapter in ElasticTearStage with GSAP-owned progress passed by ref to a lazy browser-only R3F scene; this avoids SSR WebGL and per-frame React updates.
- Render the tear in WebGL only on motion-enabled desktop viewports near the section; use a non-pinned CSS alternative on smaller screens and a static name for reduced motion to avoid unnecessary GPU and scroll costs.
