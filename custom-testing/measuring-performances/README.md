# Measuring performances

Usage:

```shell
yarn test
```

The [fixture](fixtures/page.html) page will be tested and the timing of the various rules is recorded in  the `outcomes` directory.

Rules evaluation emit performance events for the total duration, as well as the individual duration of Applicability and Expectation. These events can be listened by passing a callback function to `Audit.evaluate()`. In this case, durations are just recorded and stored, but any kind of post-treatment could happen.

## Notes

Keep in mind that performances highly depend on the state of the CPU the code runs on, so the same page can have fairly different timings when run several times in a row.

When interpreting result, also keep in mind that many expensive computations are cached by Alfa and shared by all the rules who need it. This effectively results in unfairly "charging" the time they take on the first rule who needs it (and has to do the computation and save the result); while the other rules are faster since they just need to do a lookup. This may explain large differences in time between apparently similar rules.

For example, many rules are restricted to visible elements. Since computing visibility is expensive (needs to find the computed value of several CSS property, and to recurse up the DOM tree in case an ancestor is itself not rendered, moved off-screen, clipped, …), the result is cached. The first rule which needs visibility has to compute it and would therefore appear much slower than similar rules that can simply re-use the result.

It is sometimes possible to hoist these expensive computations out of the `Audit.evaluate` call by simply triggering them earlier. This is however not always convenient, depending on the case. For example, it wouldn't be very convenient to call `isVisible` on every element and text node in the page before running the audit. It may however be useful if precise performance measurements are needed.