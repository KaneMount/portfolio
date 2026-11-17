<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

<!-- AGENT-MEMORY:BEGIN -->
- Keep remaining portfolio sections in focused presentation components consuming the shared portfolio data, so biography and project facts are not duplicated.
- Experience project links target the existing project title IDs, so cross-section navigation needs no changes to project cards.
- GitHub Pages build is gated on GITHUB_PAGES=true in vite.config.ts (base /portfolio/, prerender "/" to dist/client); data-file paths go through assetUrl so they follow the base.
- GitHub Pages serves committed docs/ rather than Actions artifacts; run bun run build:docs after every site change and commit its output so the deployed static files match the source.
- Keep supplied portfolio media as byte-preserved files in public/media with relative data paths for portable GitHub Pages hosting; share YouTube thumbnail fallback between main media and selectors.
<!-- AGENT-MEMORY:END -->
