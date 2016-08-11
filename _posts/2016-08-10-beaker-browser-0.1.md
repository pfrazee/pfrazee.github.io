---
layout: post
title: Beaker Browser 0.1 - Navigate sites on IPFS and Dat
banner: beaker.jpg
thumb: beaker-thumb.png
desc: Beaker is a new browser for IPFS and Dat. It's licensed MIT, and supports plugins for adding new protocols and Web APIs. Beaker was started two months ago...
---

[Beaker Browser](https://github.com/pfrazee/beaker) version 0.1.0 has been released today.
It is a "developer preview."
It supports basic browsing features like bookmarks and history, integrates [IPFS](https://ipfs.io) and [Dat](http://dat-data.com) protocols, and has a plugin system to add new protocols.

<br>
<center><iframe width="560" height="315" src="https://www.youtube.com/embed/nKHJ4rLN9mo" frameborder="0" allowfullscreen></iframe></center>

<br>
Project URL: [https://github.com/pfrazee/beaker](https://github.com/pfrazee/beaker).
Licensed modified MIT.
Built on Electron.

<br>
## Background

Beaker was started two months ago, around the time of the [Decentralized-Web Summit](http://www.decentralizedweb.net/).
I was finishing my involvement with [Patchwork](https://github.com/ssbc/patchwork), and looking for my next project.
We had often talked about creating the "ultra" browser - a Chromium fork for decentralized tech - but we had never settled on a specific course of action. <a href="#1" id="_1"><sup>1</sup></a>

Building applications on the [SSB protocol](https://scuttlebot.io/more/protocols/secure-scuttlebutt.html) had been illuminating.
I'd find myself saying things like, "I'd really like to lookup a user more reliably - could we add a DHT?"
Or, "I'd really like to send friend requests, could we integrate with Email?"
And we'd discuss it and decide, no, that probably wasn't right for the protocol.

At the Summit, it occurred to me that similar things must be happening to the other teams.
[IPFS](https://ipfs.io), [Dat](http://dat-data.com), [Interledger](https://interledger.org/), [Matrix](https://matrix.org/), [Ethereum](https://www.ethereum.org/) - were all working in isolation of each other.
We didn't have a good way to take advantage of each other's work.
We were risking "the bloat of no return": a point where every protocol included a subpar version of every other protocol.

That's where the scope for a new browser became more obvious.

Beaker is a browser, but it's specifically a solution for putting decentralization protocols and APIs together, so we can stay lean and work together.
It's called "Beaker" to signify that it's a place for experimentation, and a place to take risks.
It's a pre-standards browser, so to speak; a place to try a technology without writing a spec first.
And, it's been made to pursue that mandate of decentralization: that we disconnect presentation from services, that we improve confidentiality, and that we remove the advantages that keep large businesses in control of the Web.

<br>
## About the software

Beaker is built on [Electron](http://electron.atom.io/), which is a temporary solution.
Electron breaks Chromium's process-level sandbox, which needs to be restored.
Electron also has API limitations, which (for instance) keeps Beaker from injecting new Web APIs into iframes and workers.
So, in the near future, we'll need to fork Electron.

Beaker supports plugins, as node modules, which add new protocols and Web APIs.
This was added so protocol teams can work without me acting as a gatekeeper. <a href="#2" id="_2"><sup>2</sup></a>
Unlike in Chrome, the plugins don't let you change the browser's UI or basic behaviors; they only add protocols or APIs.

With feedback accounted for, I'm going to be trying some ideas for interaction/UI models that facilitate decentralization.
For example, ServiceWorkers are on track for buildling offline applications.
With it, there are manifest specs for creating "installable" applications that feel native.
Is there a future where we don't need Electron?

There's also going to need to be a way for applications to share data between each other, and I wonder if there's a metadata-rich file store that ought to be at the center of Beaker, working alongside IPFS and Dat.
There are linked-data efforts like [Solid](https://github.com/solid/solid) and [IPLD](https://github.com/ipld/specs) to consider.

User identity and key-distribution matter quite a lot for decentralization, and there's not a winner on the horizon, yet.
There's [Coname](https://github.com/yahoo/coname), [Coniks](https://coniks.cs.princeton.edu/), [Keybase](https://keybase.io/), and [Trillian](https://github.com/google/trillian), all of which are variants of Certificate Transparency.
We might need to revive [Persona](https://developer.mozilla.org/en-US/Persona).

I also think micropayments are due in the Web, and I'm going to be pursuing their integration into the UI.

<br>
## A few words on security, and "reader privacy"

There are some interesting tradeoffs involved with Beaker's two implemented protocols, IPFS and Dat. <a href="#4" id="_3"><sup>3</sup></a>

On the bright side, both of them are built on content-addressing, so they have builtin integrity checks.
They also both have mutability, using pubkey identifiers + private key signatures.
The trust model is different than the HTTP Web.
You don't have to wonder if the host is injecting a script for you, only, because they can't serve targeted assets.

The hostlessness also means Beaker can use Content Security Policies to sandbox the sites.
Right now, any page served on Dat or IPFS is unable to generate requests on the network, except to fetch resources listed within their folder/archive.

That said, browsing privacy is quite bad for these networks.
To get an archive, you need to announce to the entire network that you need it.
I'm talking with the protocol teams about how to improve the issue. <a href="#4" id="_4"><sup>4</sup></a>

<br>
## Download now

Read the docs, download the OSX binary, or get the source at [https://github.com/pfrazee/beaker](https://github.com/pfrazee/beaker).


Thanks for checking out the software.
I hope you enjoy it!

<br>
<br>
<small id="1"><a href="#_1"><sup>1</sup></a> Perhaps that was because the scope would always creep to fit the name, "Ultra."</small><br>
<small id="2"><a href="#_2"><sup>2</sup></a> That said, I'm going to be doing review before I list a plugin on Beaker's readme.</small><br>
<small id="3"><a href="#_3"><sup>3</sup></a> For those not in the know, [Dat and IPFS are very similar](https://github.com/pfrazee/beaker/blob/master/doc/dat-vs-ipfs-comparison.md), and can be basically described as "better BitTorrents."</small><br>
<small id="4"><a href="#_4"><sup>4</sup></a> It's worth mentioning - I'm not sure about IPFS, but - Dat has a feature where the traffic is encrypted using the identifier of the dat-archive, which is either a sha256 or public key.
This means you can create a new archive, and share the link via a secret channel, and your recipient will be able to get the site privately.
For personal sharing, that's great; for public sites, it doesn't help.</small>
