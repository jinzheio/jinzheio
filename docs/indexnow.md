# IndexNow

This site can submit changed public URLs to IndexNow after deploys.

## Key

The verification file is in `public/cd8f71cec5563e0ca2a726bfd47de86e.txt`.

## Collect Changed URLs

```bash
tmp_file="$(mktemp)"
pnpm indexnow:collect --base-url https://jinzhe.io --from <old-ref> --to <new-ref> --out-file "$tmp_file"
```

## Submit URLs

```bash
pnpm indexnow:submit --base-url https://jinzhe.io --urls-file "$tmp_file"
```

Use `--dry-run` with `indexnow:submit` to validate the payload without sending it.
