# Adding rules

This directory demonstrates how to add custom rules to the default ruleset.

Usage:

```shell
yarn test
```

The [page in the fixtures](test/fixtures/page.html) will be tested, with an extra rule added to the default ruleset.

A rule is structured as:
```typescript
Rule.Atomic.of<Page, /* type of test targets */>({
  uri: /* string, unique identifier for the rule */,
  /* optional "requirements" and "tags" arrays */
  evaluate(/* Partial<Page>, usually at least a "Document", often also a "Device" */) {
    return {
      applicability() {
        /* returns an iterable of test targets (of the type specified) */
      },

      expectations(target /* <= will have the type specified */) {
        /* returns an object with one property per expectation (usually one
           expectation is enough) whose values are a "Result<Diagnostic, Diagnostic>".
           
           Can also return questions for semi-automated rules.
         */
      },
    };
  },
});

```

See the code of the default rules for more examples…
