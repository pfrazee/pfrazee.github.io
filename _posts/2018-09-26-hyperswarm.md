---
layout: post
thumb: hyperswarm.png
title: "Hyperswarm, a distributed networking stack for connecting peers"
desc: "By default dat:// sites and apps work without servers, So when a dat:// app needs to interact with a server, how will it work?"
---

<p style="font-size: 130%; padding: 1rem; border: 1px solid #ddd; margin-bottom: 40px">
<strong>TL;DR:</strong> The <a href="https://beakerbrowser.com">Beaker browser</a> team is releasing a new DHT-based toolset for connecting peers called <a href="https://github.com/hyperswarm">Hyperswarm</a>.
</p>

You may or may not be surprised to hear that connecting two computers over the Internet is difficult. Software needs to negotiate [NATs](https://en.wikipedia.org/wiki/Network_address_translation), firewalls, and limited IPv4 addresses. This is one of many reasons why cloud services are so entrenched: they accept connections more reliably than home or mobile computers.

<img class="centered" src="/assets/img/guess-ill-not-connect.png">

This is a challenge for [Dat](https://datproject.org/) and the [Beaker browser](http://beakerbrowser.com/). Dat is a peer-to-peer network which needs to reliably connect users over the Internet and over LANs. Beaker uses Dat to serve Websites without needing servers.

We currently rely on a [tracker](https://en.wikipedia.org/wiki/BitTorrent_tracker) to get users connected. This is a tracker that we run, which isn't ideal because we want Dat to be decentralized. We tried using [BitTorrent's Mainline DHT](https://en.wikipedia.org/wiki/Mainline_DHT) but the results just weren't very good. Mainline doesn't have the tools to [hole-punch](https://en.wikipedia.org/wiki/Hole_punching_(networking)) so the connections frequently failed, and live tests tended to give a lot of false-positives with few good hits.

So [Mafintosh](https://twitter.com/mafintosh) decided to solve this by creating a new DHT which fits our needs.

## Announcing the Hyperswarm preview

<img class="centered" src="/assets/img/hyperswarm.png">

[Hyperswarm](https://github.com/hyperswarm) is a stack of networking modules for finding peers and creating reliable connections. Users join the swarm for a "topic" and query periodically for other peers who are in the topic. When ready to connect, Hyperswarm helps create a socket between them using either UDP or TCP.

Hyperswarm uses a [Kademlia DHT](https://en.wikipedia.org/wiki/Kademlia) to track peers and arrange connections. The DHT itself includes mechanisms to [holepunch NATs](https://en.wikipedia.org/wiki/Hole_punching_(networking)). For LAN-based discovery, we currently use multicast DNS.

```js
const network = require('@hyperswarm/network')
const crypto = require('crypto')

const net = network()

// look for peers listed under this topic
const topic = crypto.createHash('sha256')
  .update('my-hyperswarm-topic')
  .digest()

net.join(topic, {
  lookup: true, // find & connect to peers
  announce: true // optional- announce self as a connection target
})

net.on('connection', (socket, details) => {
  console.log('new connection!', details)

  // you can now use the socket as a stream, eg:
  process.stdin.pipe(socket).pipe(process.stdout)
})
```

This is a preview release of Hyperswarm. We're still ironing out the bugs, but we wanted to share the project now so that anybody that's interested could get involved and try the code.

## A few notes

### Iterating on security

DHTs have a number of known [denial-of-service](https://en.wikipedia.org/wiki/Denial-of-service_attack) vectors, including the "eclipse" and [sybil attacks](https://en.wikipedia.org/wiki/Sybil_attack) on the routing tables. There are some known mitigations which involve trust systems or crypto-puzzles, but they have tradeoffs.

We're still thinking through the tradeoffs and haven't implemented any mitigations yet. We're going to iterate on this over time.

### Hyperswarm is not anonymous

This is important to make clear:

Hyperswarm is not anonymous. It does not hide users' IPs or attempt to mask metadata. Devices join topics by listing their IP so that other devices can establish connections.

The Dat protocol takes some steps to hide what the topics' contents are. When downloading a dat, the protocol hashes the dat's key in order to create the swarm topic. Only people who know the dat's key can access the dat's data or create new connections to people in the topic. That said, the members of the topics are still public.

### The deployment strategy

To make the deployment backwards compatible, we're going to update the tracker server to participate in the DHT. This will make it possible for old Dat clients to connect using the tracker, while new clients can connect using the DHT. The network won't be split!

## Getting started

If you want to try hyperswarm (and see if it really works) run these commands using the latest node:

```
npx @hyperswarm/connect-test
```

You should see output like:

```
★   ★   ★   ★   ★   ★
  ★   ★   ★   ★   ★
Hyperswarm Connect-Test
  ★   ★   ★   ★   ★
★   ★   ★   ★   ★   ★

▶ Testing hole-punchability...
✔ Your network is hole-punchable

▶ Joining hyperswarm under the sha256('connect-test') topic
ℹ Waiting for connections...

› New connection!
› New connection!
› New connection!
```

That's all it does! It joins the hyperswarm under the 'connect-test' topic (hashed by sha256) and then arranges connections. (The connections aren't used at all.)

**Hyperswarm is MIT licensed open-source**. You can find it in the following repositories:

 - **[network](https://github.com/hyperswarm/network).** The high-level interface for joining swarm topics and making connections.
 - **[discovery](https://github.com/hyperswarm/discovery).** The peer-discovery toolset used by the network module.
 - **[dht](https://github.com/hyperswarm/dht).** The distributed hash-table implementation.
