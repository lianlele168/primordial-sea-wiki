# Evidence repair plan — 2026-10-08

Official identity: float-u-space's released HTML5 merge puzzle. P0: select a starting/target tier and calculate the exact ideal binary-merge requirement, while understanding the model excludes board losses and hidden disks.

```mermaid
flowchart TD
 Home[/] --> Planner[/merge-planner/]
 Home --> Chain[/evolution-chain/]
 Home --> Guide[/beginner-guide/]
 Guide --> Enemies[/enemy-mode/]
 Guide --> Items[/items-guide/]
 Guide --> Hidden[/hidden-disks/]
 Home --> Play[/play/]
 Home --> Sources[/updates/]
```

| Route | Intent | Information | Action | Fallback |
|---|---|---|---|---|
| / | Choose help | Rule overview and planner | Select guide/tool | Official game |
| /merge-planner/ | Plan ideal merges | Named source/target tiers, units, assumptions | Enter integer owned amount | Visible invalid-input/copy-error feedback |
| /evolution-chain/ | Find stage order | Official ten-stage sequence + model examples | Choose planner target | No hidden-chain claims |
| /beginner-guide/ | Learn first run | Published input/fuse rules, labeled inference | Apply suggested priorities | Unknown timing remains unknown |
| /enemy-mode/ | Understand optional threat | Official targeting and strengths | Tap threat | No guessed health/timers |
| /items-guide/ | Understand rescue effects | Three documented effects | Choose relevant effect | No invented costs/names |
| /hidden-disks/ | Understand progression | Official stage→item→invitation loop | Check game requirements | Unknown recipe disclosure |
| /play/ | Open official build | Official browser release | Open developer page | No stale iframe reliance |
| /updates/, /about/, legal | Inspect trust/policies | Source dates and scope | Read primary source | No false Hlele testing claim |

Fix blank dates and false playable-build verification. Check existing artwork against official image source; if unavailable remove rather than relabel. Keep calculator/guides correction pages noindex, excluded from sitemap. Review actual preview at four widths and normal/boundary/invalid/copy-failure cases.
