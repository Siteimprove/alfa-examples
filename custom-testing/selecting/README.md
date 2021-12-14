# Selecting rules

This directory demonstrates how to select a subset of rules before running an audit. Notably how to select rules based on:

- [Conformance level](test/conformance.spec.ts) (the tested page has several AAA or Best Practice issues). Also shows how% to select rules by WCAG version.
- [Scope](test/scope.spec.ts), how to test components in isolation, by disregarding rules that only make sense in the context of a full page.