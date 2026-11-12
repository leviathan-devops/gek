COMMIT aec3f9a docs(p3): the measured judge-capacity ladder
MESSAGE:
docs(p3): the measured judge-capacity ladder — the derivation for every constant in this PR

corpus/judge-capacity-ladder.json:1 carries the full probe ladder (3k-16k
estimated tokens, server usage, latencies, the two OOM rows with the exact
allocation sizes, VRAM before/after). Source of: 12288 (the operating cap =
the highest passing rung with margin), 8917 (the measured usage at that rung),
and the card budget bytes (half the ceiling). No constant in this PR is
untraceable.


FILES: corpus/judge-capacity-ladder.json, src/card.ts
A server capacity fix carrying its full measured ladder (3k-16k token probe ladder, usage numbers, OOM rows, VRAM) committed alongside the constants it derives.