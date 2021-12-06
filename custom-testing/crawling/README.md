# Crawling a site

Usage:

```shell
yarn test scope seed1 seed2 … seed_n
```

Where 
- `scope` is a domain name to bound the crawl (only pages within that scope are crawled);
- `seed_i` is the URL of a page to start crawling from.

`scope` and at least one `seed` are mandatory.

For example, assumimg that a webserver exposes the [fixtures](fixtures) directory at `http://127.0.0.1:5500/fixtures/page1.html`:

```shell
yarn test http://127.0.0.1:5500/fixtures/ http://127.0.0.1:5500/fixtures/page1.html
```

will crawl and audit both the directory itself (the page built by browser to show directory content), [Page 1](fixtures/page1.html) and [Page 2](fixtures/page2.html).

The outcomes of the audits are saved in the `outcomes` directory.