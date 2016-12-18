---
layout: post
title: What is the P2P Web?
desc: Facebook is shrugging its responsibility as either a tech or media company.
---

The P2P Web is an experimental set of technologies, APIs, and philosophies, created by members of the Node.js and Web communities, to give users more control over the Web. It is a new way to surf, publish, and&nbsp;connect.

<br>

---

<div class="mutebox"><p>You can try everything described in this post with the <a href="https://beakerbrowser.com/">Beaker Browser</a>, which implements the P2P Web in a fork of Chromium.<sup>1</sup></p></div>

---

<br>

**The P2P Web embodies 3 principles:**

1. Anybody can be a server.
2. Multiple computers can serve the same site.
3. There is no back end.

Once integrated into a browser, these principles enable users to publish independently of services, and move between applications freely.

<br>

<img class="centered" src="/assets/img/illustration-hosting.png">

<br>

## An open platform

<div class="mutebox bordered dark">
  <p>The Web is an open global community &mdash; and yet, most of the content is controlled by a few companies. How strange it is that the Web is run by private businesses!</p>
</div>

The P2P Web has one rule: users should control their own data, always and forever. You should never give up ownership for the privilege of access.

P2P Sites are self-published. Each one has its own domain, identified by a public key. They're created at the push of a button, and synced to peers who host on the author's behalf.

<br>
<img class="centered bordered" src="/assets/img/p2p-site-info.png">
<br>

This does not require a Blockchain or Proof-of-Work; it's more similar to BitTorrent in design.

Each user controls their sites by controlling a private key. The network can handle many sites for each user, and expects them to change actively. As the Web has always been about scale, the P2P protocols have been designed to scale well.

<br>
<img class="centered bordered" src="/assets/img/request-create-dat.png">
<br>

Just like the Web as we know it today, the P2P Web will publish all kinds of content: posts, photos, music, events, likes, follows, and more. The key difference is that instead of content attaching to a corporation's URLs, apps will publish to their users' sites, via Web APIs.

Communities are not owned in the P2P Web: they are aggregated from each user's personal sites. 1 site = 1 identity, and users can have many.

<br>
<img class="centered" src="/assets/img/illustration-fork.png">
<br>

## For open source

<div class="mutebox bordered dark">
  <p>For years, if you've wanted to write social software, you've needed to work at Twitter or Facebook.com. Despite benefitting from layers of Free and Open-source software, Web applications are closed source. This is worse than anti-competitive: it just isn't any <em>fun</em>. The Web is about sharing information and experiences; why would we limit that to social media? Why not share our software socially, too?</p>
</div>

P2P sites are self-contained bundles of files. They are not hosted by a service. They sync onto the device, and run in a sandbox.

P2P sites include everything they need to run the application. The APIs can read and write content without depending on a remote host. If a service is needed, its endpoint will be subject to user intervention (and reconfiguration).

<br>
<img class="centered bordered" src="/assets/img/request-network-access.png">
<br>

This all leads to one of the P2P Web's most powerful features: **forkability**. Any site can be duplicated with one click. A forked site is given a global URL automatically, and is served from the author's machine. 

This is like having a version-control system (such as Git) and a server (eg Apache) built into the browser itself. There's no longer anything to stop you from wanting a change, making it, and sharing. Development can occur from the bottom-up, driven by users themselves.

<br>
<img class="centered bordered" src="/assets/img/dat-viewer.png">
<br>


## Get involved

This is just a short overview of the P2P Web's technologies and capabilities. There is much more to dive into in the future.

The [Beaker Browser](https://beakerbrowser.com)<sup>1</sup> is our Chrome-fork that demonstrates the P2P Web. It uses the [Dat Protocol](https://datproject.org/), a tech created by Nodejs and CouchDB veterans, with grants from the Knight and Sloan Foundations to help advance scientific and civic publishing.

This is all alpha-release FOSS software, and we're looking for passionate contributors to steer the platform.

It's our mission to spread user-first technologies to all browsers, and we will continue to experiment with new features as we grow.

<br>
<hr>
<div class="mutebox">
  <p>See also the pioneering work being done by <a href="https://ipfs.io/">IPFS</a>, <a href="https://webtorrent.io/">WebTorrent</a>, <a href="https://zeronet.io/">ZeroNet</a>, and <a href="https://github.com/ssbc">Secure Scuttlebutt</a>, each of which have influenced Beaker.</p>
</div>
<hr>

<br>

<sup>1</sup> Apologies to Windows and Linux users: you'll need to build from source.