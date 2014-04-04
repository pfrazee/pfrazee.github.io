---
layout: post
title: Hosting Services in the Browser
desc: How to improve user privacy and autonomy by treating the browser as a local cloud platform.
recommended: 1
---

In his post [The Next Mission](https://brendaneich.com/2014/04/the-next-mission/), Brendan Eich talks about tackling the "network problem" which creates user-data capture.

<blockquote>
	<p>Privacy is only one concern among several, including how to realize economic value for many-yet-individually-weak users, not just for data-store/service owners or third parties. Can we do better with client-side and private-cloud tiers, zero-knowledge proofs and protocols, or other ideas?</p>

	<p>In the end, I asked these four questions:</p>

	<ol>
		<li>Can a browser/OS “unionize its users” to gain bargaining power vs. net super-powers?
		<li>To create a data commons with “API to me” and aggregated/clustered economics?
		<li>Open the walled gardens to put users first?
		<li>Still be usable and private-enough for most?
	</ol>
</blockquote>

Because these questions are the focus of my interests, I'll use them as the context for this post.

<br>
## Solving capture

SaaS companies exploit a weakness in browsers to create user-data capture: the fixed reliance on upstream decisions. Browsers don't expose a process model to the application layer, and so there is no opportunity to reconfigure the downloaded software. All components are delivered in a monolithic ball of media.

Though it may seem counter-intuitive, Browsers need to split the software from a host into multiple distinct programs, then force them to communicate with IPC. Doing so disentangles the application, enabling users to swap out the programs at runtime. By treating each of these programs as services, we can view the browser as providing a local cloud platform which generates private server instances for its applications.


<br>
## Application assembly

Segmenting the application introduces a new challenge, to properly assemble the programs when they arrive from separate hosts. The solution is to reapply existing techniques.

```html
<link rel="stylesheet" href="/css/sitewide.css" type="text/css">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<script src="/js/main.js" type="application/javascript"></script>
```

Web applications are assembled from multiple pieces of media using typed links. By using HTTP as the IPC mechanism, the application's programs can have linkable endpoints.

```html
<link rel="storage" href="local://domstorage.js" title="Your Local Storage" security="private">
<link rel="storage" href="https://dropbox.com" title="Dropbox" security="semi-private">
<link rel="user-profile" href="local://facebook.js/" title="Facebook Profile Program">
```

A user looking for private storage might have her application query the application's link-index for `rel=storage,security=private`. Reltypes carry strong guarantees about endpoint behaviors, and so the application can send HTTP requests according to the reltype's semantics and have predictable outcomes.

<br>
## Global addressing

Programs in the browser introduce a management overhead for the user. Scripts must be downloaded, uniquely named, and made available before configuring into an application. To simplify this, programs should be given global addresses based on the script's hosted location.

`https://google.com/js/gmail.js` is addressed as a program at `local://google.com(/js/gmail.js)/`

Using this hostname extension (which I'll call the "source path envelope") enables the browser to discover the script behind the program if it is not present in a local cache. The program can be spawned on-demand to service the request. As a result, links to programs can be easily shared between users' environments.

```html
<link rel="template" href="local://twitter.com(/guis.js)/items" title="Twitter Feed GUI">
<link rel="template" href="local://twitter.com(/guis.js)/profile" title="Twitter Profile GUI">
```

<br>
## Containment guarantees

Browser-hosted programs can have their capabilities restricted to communicating with host applications (active HTML documents) ensuring that a trusted core audits and approves all of the program's actions. In a well-defined security model &ndash; assisted with well-scoped link types &ndash; the programs can be expected to operate on data without leaking it.

Containment guarantees open business opportunities for third-party development around sensitive data (applications such as [Mint.com](https://www.mint.com/)). In public settings such as forums, strong containment allows users to share programs and produce community-modded&nbsp;Web&nbsp;applications.

```html
<link rel="data-source" href="https://bankofamerica.com">
<link rel="app" href="local://mint.com(/main.js)/">
```

<br>
## Implementation

I've written the start to a <a href="http://httplocal.com">javascript implementation of this architecture</a> which uses Workers as process containers. I'm unsure about the containment guarantees in my code (using a script injected into the Worker to freeze dangerous APIs to null) which is why <a href="/2014/03/24/js-api-proposal-for-csp.html">I'm in favor of a Javascript API for controlling Content-Security Policy</a>. However, I would prefer to see this entire architecture implemented by browsers, and so the js implementation should be seen more as a proof-of-concept and testing ground.

To Brendan's questions, I believe stopping reliance on upstream configurations will have a strong impact for improving user control and privacy. As the Web continues to grow, it will need to refocus from host-centric to community-centric decision-making. By building upon a compact form of configuration, links, we give users a simple way to recreate their software and share the outcome.

<br>