# Filtering results

This directory demonstrates how to [filter outcomes](test/filtering.spec.ts) after running an audit, notably based on: 
- conformance level;
- WCAG version;
- scope (testing components in isolation, disregarding rules that only make sense for a full page).

## Pre-selecting rules

It is also possible to [pre-select](test/selecting.spec.ts) the rules to apply. This is a bit better on the performance side because the "useless" rules are not evaluated. This is, however, much less flexible than filtering outcomes because a new test plugin must be created for each filter. Additionally, this may create conflict within the various test plugins and care must be taken to (de)activate them upon need. Therefore, the preferred way is to have a test plugin with all rules and filter the outcomes afterwards. Given that the hard work (building the style tree and the accessibility tree) is shared between all rules, and likely needed in all cases, the performance should still be good. 