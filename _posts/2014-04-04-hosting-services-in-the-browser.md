---
layout: post
title: Hosting Services in the Browser
desc: Improving user privacy and autonomy by treating the browser as a local cloud platform.
recommended: 1
---

User-data capture by centralized services on the Web is the result of fixed reliance on upstream decisions. Because there is no process model in the application layer, there is no opportunity to reconfigure individual components in the downloaded software. The scripts are merged into a single program.

By instead splitting Web applications into multiple processes using <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/Performance/Using_web_workers">Web Workers</a>, we can disentangle the hard dependencies created by a shared memory-space. Users can then change components at runtime by loading new programs.

<br>
## Services model

By exposing each of these programs as services, the browser becomes a private cloud platform. The Worker services can interchange with upstream services, serialize their endpoints as URLs, and receive requests from forms, anchors, and Ajax calls.

HTTP, or a semantically-equivalent protocol, is applied over the Workers' messaging channels. The Workers may send requests as well as responses to the host page, but they have no other access to the system. They interact with each other and with the public Web through the applications' proxy, making all actions subject to approval.

<br>
## Application assembly

To assemble the programs, we need formal definitions of each program's interface without relying on [complex IDLs](http://en.wikipedia.org/wiki/Web_Services_Description_Language). The solution is to copy techniques already used by browsers.

```html
<link rel="stylesheet" href="/css/sitewide.css" type="text/css">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<script src="/js/main.js" type="application/javascript"></script>
```

Web applications are assembled from multiple pieces of media using typed links. The links are read from HTML and interpretted according to their "rel" type or element-tag (with the assistance of annotations such as media "type," above).

New reltypes may be defined for client/server protocols, including common patterns such as CRUD.

```html
<link rel="crud-storage" href="local://domstorage.js" title="Your Local Storage" host="local">
<link rel="crud-storage" href="https://dropbox.com" title="Dropbox" host="remote">
```

An application looking for private storage would query its cached index for `rel=crud-storage,host=local`. If a link is found to satisfy the query, it can be used according to the reltype's protocol.

In addition to HTML, links may be exchanged in the Link response header, or in other forms of media such as <a href="http://stateless.co/hal_specification.html">JSON-HAL</a>. A URL can be learned about by dispatching a HEAD request and examining the `rel=self` link in the response header.

<br>
## Global addressing

Using multiple programs in the browser introduces a management overhead for the user. Scripts must be downloaded, uniquely named, and made available before configuring into an application. To simplify this, Worker programs can be given global addresses.

For this, we'll use a hostname extension called the "source path envelope." In this scheme, `https://google.com/js/gmail.js` is addressed as a Worker service at `local://google.com(/js/gmail.js)/`

This extension enables the application to discover the script behind the program if it is not present in a local cache. The program can be spawned on-demand to service a request. As a result, links to programs can be easily shared between users' environments.

```html
<link rel="template" href="local://twitter.com(/guis.js)/items" title="Twitter Feed GUI">
<link rel="template" href="local://twitter.com(/guis.js)/profile" title="Twitter Profile GUI">
```


<br>
## Containment guarantees

Worker services have their capabilities restricted to communicating with host applications, ensuring that a trusted core audits and approves all of the program's actions. In a well-defined security model &ndash; assisted with well-scoped link types &ndash; the programs can be expected to operate on data without leaking it.

Containment, if guaranteed, allows third-party development around sensitive data (applications such as [Mint.com](https://www.mint.com/)). In public settings such as forums, strong containment allows users to share programs and produce community-modded&nbsp;Web&nbsp;applications.

```html
<link rel="data-source" href="https://bankofamerica.com">
<link rel="gui-plugin" href="local://mint.com(/main.js)/">
```

To maintain the integrity of the host page, <a href="http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/">sandboxed iframes</a>, <a href="https://developer.mozilla.org/en-US/docs/Security/CSP">Content Security Policies</a>, and sanitation should be used.


<br>
## Implementation

I've written a <a href="http://httplocal.com">javascript implementation of this architecture</a> which is a proof-of-concept and, for me, a testing ground. I'm unsure about the containment guarantees in my code (using a script injected into the Worker to freeze "dangerous" APIs to null) which is why <a href="/2014/03/24/js-api-proposal-for-csp.html">I'm in favor of a Javascript API for controlling Content-Security Policy</a>. However, I would prefer to see this entire architecture implemented by browsers, particularly to move security decisions out of the host application's concerns.

<br>