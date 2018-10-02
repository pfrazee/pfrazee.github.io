---
layout: post
title: "Why P2P deserves another chance"
twitter_card: summary
desc: "When the cloud went mainstream, P2P tech got overlooked. Rather than trying to fix blockchains, we should be looking at P2P again."
---

<p style="padding: 1rem; border: 1px solid #ddd; margin-bottom: 30px; font-size: 1rem">
<strong>TL;DR:</strong> When the cloud went mainstream, P2P tech got overlooked. Rather than trying to fix blockchains, we should be looking at P2P again.
</p>

When the Web arrived, apps went from living on our desktops to living in the cloud. The cloud had a lot of benefits, not least of which was solving device management, cutting costs, and scaling reliably. Unfortunately this meant that alternatives to client/server were overlooked.

<p class="center" style="margin-bottom: 30px"><a href="http://conferences.oreillynet.com/pub/w/p2p/speakers.html" target="_blank"><img src="/assets/img/oreilly-p2p-conf.jpg" style="max-width: 300px; border: 1px solid"></a><br><small>P2P was a buzz-word once!</small></p>

[BitTorrent](https://en.wikipedia.org/wiki/BitTorrent) was created in Summer of 2001. It was created to act as a global file-sharing network which shared the cost of bandwidth among all the users. BitTorrent now has a number of variants, including the [Dat protocol](https://datproject.org) which we use in the [Beaker browser](https://beakerbrowser.com).

Like blockchains, Dat is a crypto-network. Users are addressed by public keys, data is signed, hashes are used to verify integrity, and the network distributes computation.

Unlike blockchains, Dat has no "mining." Every user publishes their own dataset under their own public key. As a result, there's no need for Proof-of-Work consensus, which means that Dat and P2P aren't inherently wasteful.

## P2P distributes costs

P2P's most famous benefit is that it distributes the costs of bandwidth. Horizontal scaling is built into the network. Bandwidth is a major cost-center on the Internet, so distributing its costs is a major win. When you shift the entire computing platform to P2P, you get the same benefit for disk and computation as well. The more you can offload to user devices, the less you have to pay to run your application.

## P2P is true serverless

Like serverless, P2P reduces the need for dev ops. P2P is "true serverless."

Think of what happens when your app is purely P2P: now you're not spinning up a server, paying for monitoring, or listening to a pager. That's a huge win for new developers who simply want to build sites or apps, and don't want to learn how to be a sys admin first.

(Note: you still have to make sure your sites or apps are online with a "peer of last resort," but it's much easier to do than running a server and [easily commoditized as a service](https://hashbase.io).)

## P2P protects data

P2P apps run on the user's device and use the local hard drive as the primary data store. To exchange data, they can leverage direct connections to each others' devices. When the cloud is needed, Dat is a cryptonetwork and users are identified by public keys: apps can introduce at-rest encryption without much difficulty.

## P2P escapes the walled garden

P2P is a hybrid of the benefits of cloud and personal computing, where users have access to the source code while computing resources are distributed throughout the network. Because there's no remote backend, it's possible to visit an open-source P2P website and simply fork the source code. The local disk is the primary data store as well, so it's possible to move identity and content between apps.

## P2P improves usability

P2P websites use a public-key address instead of an IP address. You can mint new public keys without being online or registering with anyone. This is why [Beaker browser](https://beakerbrowser.com) is able to have a "new website" button.

I used Beaker to author this post. I used Jekyll's watch mode, plus Beaker's live-reloading to automatically see my updates. Once it's done, I'm going to click on this button:

<img class="centered bordered" src="/assets/img/publish-review-btn.jpg">

Then I'll review my changes and hit the publish all button:

<img class="centered bordered" src="/assets/img/publish-review-page.jpg">

That will trigger the new post files to write to my site's Dat archive. Beaker will immediately contact any active peers (including [Hashbase](https://hashbase.io)) and sync those changes with them. Because Hashbase provides an HTTPS mirror, you'll be able to reach the post at both [dat://pfrazee.hashbase.io](dat://pfrazee.hashbase.io/blog/why-p2p-deserves-another-chance) and [https://pfrazee.hashbase.io](https://pfrazee.hashbase.io/blog/why-p2p-deserves-another-chance) immediately.

## Learn more

Beaker and Dat are in development and growing every day. If you're interested in how the P2P platform is developing, you can read:

 - [The Dat protocol specs](https://www.datprotocol.com/deps/)
 - [The Dat Identity Spec](https://docs.google.com/document/d/1MxLRcRObE7qBnTsxx9a0lMk7NOVIAzg8O5XmUoeyR0M/edit?ts=5ba23906#)
 - [Web Data Protocols Proposal](https://via.hypothes.is/https://gist.github.com/pfrazee/860f2d137ef001a89da4b3959e259d58#annotations:dNuPKsEEEeiK9ievcR6Eog)
 - [Announcing Hyperswarm](/blog/hyperswarm)

If you want to learn more about the ideas of a P2P Web, watch/listen to:

 - [Imagine This: A Web Without Servers (talk)](https://www.youtube.com/watch?v=rJ_WvfF3FN8&t=4s)
 - [Formalizing user rights on the Web (talk)](https://www.youtube.com/watch?v=x-ffpAkviM0&t=3s)
 - [JSParty #42: Decentralizing the web with Beaker (podcast)](https://changelog.com/jsparty/42)

And finally, if you want to try the browser, visit:

 - [The Beaker browser website](https://beakerbrowser.com/)
 - [The Beaker browser repo](https://github.com/beakerbrowser/beaker/)
