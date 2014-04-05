---
layout: post
title: Hosting Services in the Browser
desc: Improving user privacy and autonomy by treating the browser as a local cloud platform.
recommended: 1
---

By treating the browser as a local cloud platform, developers can introduce a configurable process layer which improves user privacy and autonomy on the Web. The configuration of these programs can be formalized and semi-automated with typed links.

This architecture has been tested in a proof-of-concept which uses Web Workers as process containers. In this post, I'll step briefly through the design and reasoning of this approach.

<br>
## Solving capture

Services which restrict their networks from third-party extension ("walled gardens") exploit a weakness in browsers to create platform capture: the fixed reliance on upstream decisions. Browsers don't expose a process model to the application layer, and so there is no opportunity to reconfigure the downloaded software. All components are delivered in a monolithic ball of media.

Though it may seem counter-intuitive, Browsers should split the software from a host into multiple distinct programs, then force them to communicate with <a href="http://en.wikipedia.org/wiki/Inter-process_communication">IPC</a>. Doing so disentangles the application, enabling users to swap out the programs at runtime.

<br>
## Services model

By exposing each of these programs as services, we can view the browser as providing a local cloud platform which generates private server instances for its applications. The instances can interchange with upstream services, serialize their endpoints as URLs, and receive requests from forms, anchors, and Ajax calls.

To accomplish this, processes must be contained in separate threads and virtual machines, which <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/Performance/Using_web_workers">Web Workers</a> provide. HTTP, or a semantically-equivalent protocol, is then applied over the process' messaging channel. The services are written in Javascript, and may send requests as well as responses to the host page.

<br>
## Application assembly

Segmenting the application introduces a new challenge: to properly assemble the programs when they arrive from separate hosts. This requires formal definitions of each program's interface without relying on [complex IDLs](http://en.wikipedia.org/wiki/Web_Services_Description_Language). The solution is to reapply the techniques used by Web browsers to construct applications.

```html
<link rel="stylesheet" href="/css/sitewide.css" type="text/css">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<script src="/js/main.js" type="application/javascript"></script>
```

Web applications are assembled from multiple pieces of media using typed links. The links are read from HTML and interpretted according to their "rel" type or element-tag (with the assistance of annotations such as media "type," above).

New reltypes may be defined to codify detailed client/server protocols, including common patterns such as CRUD.

```html
<link rel="crud-storage" href="local://domstorage.js" title="Your Local Storage" host="local">
<link rel="crud-storage" href="https://dropbox.com" title="Dropbox" host="remote">
```

An application looking for private storage would query its cached index for `rel=crud-storage,host=local`. If a link is found to satisfy the query, it can be leveraged according to the reltype's protocol. As this illustrates, link key/value pairs provide meta-data (above, "host") which assist in configuration reasoning.

In addition to HTML, links may be exchanged in the Link response header, or in other forms of media such as <a href="http://stateless.co/hal_specification.html">JSON-HAL</a>. A URL can be learned about by dispatching a HEAD request and examining the `rel=self` link in the response header.

<br>
## Global addressing

Using multiple programs in the browser introduces a management overhead for the user. Scripts must be downloaded, uniquely named, and made available before configuring into an application. To simplify this, programs should be given global addresses based on the script's hosted location.

For this, I'll propose a hostname extension called the "source path envelope." In this scheme, `https://google.com/js/gmail.js` is addressed as a program at `local://google.com(/js/gmail.js)/`

This extension enables the browser to discover the script behind the program if it is not present in a local cache. The program can be spawned on-demand to service a request. As a result, links to programs can be easily shared between users' environments.

```html
<link rel="template" href="local://twitter.com(/guis.js)/items" title="Twitter Feed GUI">
<link rel="template" href="local://twitter.com(/guis.js)/profile" title="Twitter Profile GUI">
```


<br>
## Containment guarantees

Browser-hosted programs can have their capabilities restricted to communicating with host applications, ensuring that a trusted core audits and approves all of the program's actions. In a well-defined security model &ndash; assisted with well-scoped link types &ndash; the programs can be expected to operate on data without leaking it.

Containment guarantees open business opportunities for third-party development around sensitive data (applications such as [Mint.com](https://www.mint.com/)). In public settings such as forums, strong containment allows users to share programs and produce community-modded&nbsp;Web&nbsp;applications.

```html
<link rel="data-source" href="https://bankofamerica.com">
<link rel="gui-plugin" href="local://mint.com(/main.js)/">
```

To maintain the integrity of the host page, <a href="http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/">sandboxed iframes</a>, <a href="https://developer.mozilla.org/en-US/docs/Security/CSP">Content Security Policies</a>, and sanitation should be used.


<br>
## Implementation

I've written a <a href="http://httplocal.com">javascript implementation of this architecture</a> which is a proof-of-concept and testing ground. I'm unsure about the containment guarantees in my code (using a script injected into the Worker to freeze "dangerous" APIs to null) which is why <a href="/2014/03/24/js-api-proposal-for-csp.html">I'm in favor of a Javascript API for controlling Content-Security Policy</a>. However, I would prefer to see this entire architecture implemented by browsers, particularly to move security decisions out of the host application's concerns.

I believe stopping reliance on upstream configurations will have a strong impact for improving user control and privacy. As the Web continues to grow, it will need to refocus from host-centric to community-centric decision-making. By building upon a compact form of configuration, links, we give users a simple way to recreate their software and share extensions.

<br>