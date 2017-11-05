---
layout: post
title: Auditable servers through secure ledgers
desc: 
---

There's a push in the decentralization world to use Bitcoin variants as the solution for everything: databases, user identity, key distribution, even basic hosting.

**I am strongly against this** due to the <a href="https://motherboard.vice.com/en_us/article/ywbbpm/bitcoin-mining-electricity-consumption-ethereum-energy-climate-change" title="One Bitcoin Transaction Now Uses as Much Energy as Your House in a Week">excessive cost of Proof-of-Work</a>, and I fear we haven't given proper consideration to the alternatives.

Blockchains do not require Proof-of-Work or decentralized consensus to provide their enormous benefits of auditability and reduced trust.
Further, I do not believe decentralized consensus is the political cure-all it's billed to be.

We should re-evaluate whether we're letting hype drive our thinking.

The data structures behind blockchains can be applied without decentralized consensus to introduce strong auditability and data integrity to services and Web publishing.
This is already being done with [Certificate Transparency](https://www.certificate-transparency.org/), [Dat](https://datproject.org), and the [Beaker Browser](https://beakerbrowser.com).

<br>

## What are blockchains?

Let's review the basics. A blockchain is a linked-list data structure in which every entry references the previous entry using a [cryptographic hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function).

Here's what wikipedia says:

> A blockchain is a continuously growing list of records, called blocks, which are linked and secured using cryptography. Each block typically contains a hash pointer as a link to a previous block, a timestamp and transaction data.

Here's a blockchain visualized ([from "A blockchain in 200 lines of code"](https://medium.com/@lhartikk/a-blockchain-in-200-lines-of-code-963cc1cc0e54)):

![/assets/img/blockchain.png](/assets/img/blockchain.png)

<br>

## Why do they matter?

Blockchains create accountability.

The hash of each block encompasses the entire chain's history.
If you change one bit of the history, all subsequent blocks' hashes change.

By encompassing the history in each hash, we make it easy to check for lies about the state.
Syncing peers can quickly check equality with each other.

<img src="/assets/img/checkin.gif" class="centered">

If hashes don’t match, then the peer knows the history has changed.
And because the blocks are signed, the peer can prove to the network that the author created a split history.

<img src="/assets/img/snitch.gif" class="centered">

A split history is a sign of a lie or corruption, and it means the blockchain author isn't trustworthy.
Blockchains enforce an "append only" constraint, and enables peers to efficiently monitor the blockchain author.

<br>

## What is decentralized consensus?

Decentralized consensus is a system where multiple computers can make additions to a blockchain without having to trust each other.
This involves a lot of technical coordination - thus Proof-of-Work.

Proof-of-Work is a kind of computation which takes a predictable amount of time to run.
Agreeing about the order of events is very difficult in computer networks, and Proof-of-Work solves that problem by putting the network on a trustworthy clock.

Decentralized consensus *is intended* to mean that one entity can't control the blockchain network.
Any newcomer can participate, and ownership is equally distributed among the participants.

<br>

## Does it work?

To some degree.
Decentralized consensus places control of the network into a purchasable metric.
With Proof-of-Work, that metric is hashing power.

Whether decentralized consensus solves the question of ownership is dependant on circumstance.
For it to work, ownership is never supposed to be concentrated beyond 50% -- but that's just a question of how much money you're willing to spend.
[It has already happened before.](https://arstechnica.com/information-technology/2014/06/after-reaching-51-network-power-bitcoin-mining-pool-says-trust-us/)
Because you don't need permission to buy hashing power and then participate in Bitcoin, there's no way a "51% attack" can be stopped.

Decentralized consensus also fails to consider the political reality of human networks.
The protocols need changes over time, and changes mean governance.
In Bitcoin, acceptance of a change is signalled by the miners - once some percent of the miners agree, the change is accepted.
This means that hashing power is used as a measure of voting power, and so the political system is essentially plutocratic.
How is that significantly different than the board of a publicly traded company?

This is why I'm unimpressed with decentralized consensus as a political solution.
Bitcoin has been wildly unstable, with controversies and forks happening querterly.
I personally suspect stability will actually mean "dominant ownership."
It doesn't seem like a unique victory over political realities, and it comes with the <a href="https://motherboard.vice.com/en_us/article/ywbbpm/bitcoin-mining-electricity-consumption-ethereum-energy-climate-change" title="One Bitcoin Transaction Now Uses as Much Energy as Your House in a Week">high cost of Proof-of-Work</a>.

<br>

## What about Proof-of-Stake?

I like the spirit of Proof-of-Stake, because at least it tries to solve the enormous cost problem of Proof-of-Work, but I'm going to point out two things:

 1. Anybody who's been involved in crypto-currencies for more than a year who smoothly transitions from "PoW is a great revolution" to "obviously PoW was never the long term solution" deserves a hard poke in the eye for the duration of my choosing.
 2. Proof-of-Stake is not yet proven, and, prior to Proof-of-Work, nobody was sure that decentralized consensus was possible, so I default to extreme skepticism about any new PoS. This is going to require some hard work.

<br>

## What can we do instead?

First, a quick aside --

The word "blockchain" does not actually refer to the decentralized consensus model.
It refers to the cryptographic linked list, which I described earlier.
However, I'm told that the term blockchain is inextricably tied to the ideas in Bitcoin now, and so I'm going to use another term instead: **secure ledgers**.

Conceptually it's the same, but the term is less encumbered.
Got it?
Ok.

<br>

## Auditable services

What most people don't realize is that you can get a lot of value from <strike>blockchains</strike> secure ledgers without decentralized consensus.
Here's how:

Instead of a network, we use a single host.
That host mantains a ledger which contains its state and its activity log.

Why?
Accountability.

Clients can monitor the ledger and, just as in decentralized consensus, ensure the host is following a set of business rules.
With this accountability comes better trust.

We don't need to worry that a keyserver, for instance, is lying about its bindings, because we can check its live responses against its ledger.
If we've reviewed the business logic and trust it, and we never observe a deviation from that logic in the ledger history, then the keyserver is in good order.

<br>

## That could never work!

I love to point out when we're stealing from [Certificate Transparency](https://www.certificate-transparency.org/), and this is just another one of those cases.

CT is a superb example of this design.
Each Certificate Authority maintains a ledger of its certificate assignments.
Monitor-nodes and clients compare the certs they receive against the chain to make sure the rules of certification are always being followed.
[It's already been used to catch Symantec in the act.](https://sslmate.com/blog/post/ct_redaction_in_chrome_53)

<img src="/assets/img/certificate_tranpsarency_diagram.png" class="centered">

Compared to decentralized consensus, a ledger-backed service provides the exact same level of auditability.
It trades the interchangeability of hosts for a much cheaper operating model -- no Proof-of-Work.
Given the cost of PoW, I think that's worth it.

<br>

## Is this usable now?

As a proof-of-concept, I have written an auditable server called [NodeVMS](https://nodevms.com) which uses [Dat](https://datproject.org) to securely distribute the state and call log.
It is not at production-ready, but it demonstrates the core ideas of this design.

<br>

## Consider the alternative

Before turning to Proof-of-Work or any form of decentralized consensus, think about the costs.
Think about what you're dedicating your users to.
Ask yourself:

 - Is it decentralized consensus you want, or just improved accountability and better trust?
 - Am I certain that I need strict global consensus?
 - Could I solve the ownership problem by using peer-to-peer publishing, eg with [Dat](https://datproject.org)?
 - Could I solve the choice problem with configurable endpoints?
 - Do I really need to burn all that energy to power my app?

There are alternatives to the hype.
They may not include magic money, but the engineering is better.