---
layout: post
title: Services with secure ledgers
desc: 
---

As Bitcoin, Ethereum, and other blockchain-based systems have gained popularity, there's been an explosion of projects that attempt to use blockchains as a hammer for seemingly anything that looks a nail: databases, user identity, key distribution, and even basic hosting.

I think these efforts are misguided, and I'd like to state why I think that's the case.

## Blockchains and proof-of-work

Blockchains are often used to enable networks of nodes to establish global consensus without trusting each other (think Bitcoin). Because the nodes don't trust each other, the network needs a way to make sure that no node is able to append fraudulent transactions to the ledger. In these sorts of cases, a mechanism called proof-of-work is used to prevent fradulent transactions.

In a proof-of-work-based system, adding a transaction to the shared ledger requires the transactor to run a large amount of "frivolous" computation. Doing computation requires electricity, so all proof-of-work based systems require using large amounts of electricity to function.

This isn't necessarily problematic; as a society we choose to generate and use energy on plenty of things that we find valuable — cars, television, sporting events, etc. But proof-of-work systems are architected intentionally to require excess computation in order to meet a very specific requirement: global consensus across a distributed network of nodes that don't trust each other.

This is a very unique requirement that doesn't apply to most of the nails I listed above (databases, hosting content, key distribution, etc.), so we should be skeptical of proposals that use a blockchain + proof-of-work without having an explicit need for it, because the ecological costs of using proof-of-work are far greater than zero.

[insert screenshot of the motherboard post]

Headlines like this are a bit clickbaity, but their alarmed tone isn't totally off-base. For every proof-of-work-based network that exists, we should question if it's necessary and appropriate for the challenges at hand.

To contextualized the cost of proof-of-work, consider [Alex de Vries'](https://digiconomist.net/), estimation(https://digiconomist.net/bitcoin-energy-consumption) that as Bitcoin miners compete with each other, they'll burn over 24 terawatt-hours of electricity annually. That's about as much as Nigeria, a country of 186 million people, uses in one year.

Furthermore, the amount of energy spent will increase as the value of Bitcoin increases, driven by speculation and the need for liquidity in other crypto currencies.

I frequently describe myself as a "decentralization nut" and for me, the cost of using proof-of-work is just too high to accept as the solution to the challenges decentralized networks face.

And the more I've worked in this space — on [Secure Scuttlebutt](https://scuttlebutt.nz) first, and now on the [Dat](https://datproject.org) protocol and the [Beaker Browser](https://beakerbrowser.com) — the more I'm sure that blockchains are a huge step forward, but proof-of-work is a mistake, and quite frankly a poor engineering choice in many cases.

And, for some people, hearing that takes them by surprise.
The way cryptocurrencies have been sold to us, it's reasonable to assume that proof-of-work and blockchains are one and the same.
They're not!
Nor do blockchains do not require proof-of-work.
Blockchains and proof-of-work are entirely separate concepts, and blockchains can work without proof-of-work while still providing tremendous value.

In fact, I argue that proof-of-work is a political solution tacked onto blockchains — a hail mary attempt to provide a cure-all to power dynamics — and it completely fails at its purpose.

However!
The data structure of a blockchain can be applied to traditional services to introduce incredibly valuable properties like cryptographic auditability, and it's the value of that specific use-case I hope to convince you of today.

<br>

## What are blockchains?

Let's review the basics. A blockchain is a linked-list data structure in which every entry references the previous entry using a [cryptographic hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function).

From [Wikipedia](https://en.wikipedia.org/wiki/Blockchain):

> A blockchain is a continuously growing list of records, called blocks, which are linked and secured using cryptography. Each block typically contains a hash pointer as a link to a previous block, a timestamp and transaction data.

Here's a blockchain visualized ([from "A blockchain in 200 lines of code"](https://medium.com/@lhartikk/a-blockchain-in-200-lines-of-code-963cc1cc0e54)):

![/assets/img/blockchain.png](/assets/img/blockchain.png)

<br>

## Why do blockchains matter?

Blockchains enable accountability.

The hash of each block encompasses the entire chain's history.
If you change one bit of the history, all subsequent blocks' hashes change.

By encompassing the history in each hash, it becomes easy to compare that history.
Two computers can quickly check hash equality with each other to confirm that their history logs match.

<img src="/assets/img/checkin.gif" class="centered">

A blockchain is supposed to have a single linear history of transactions.

If the compared hashes for a block don’t match, then we know the history has split.
A split history is a sign of a lie or corruption, and it means the blockchain author isn't trustworthy.

<img src="/assets/img/snitch.gif" class="centered">

Because the blocks are signed, any user with evidence of a split history can prove to the network that the blockchain has been corrupted.

Therefore, blockchains enforce an "append-only" constraint, and enables peers to efficiently monitor the blockchain author.

<br>

## What is Proof-of-Work?

Proof-of-work is a system for establishing "decentralized consensus".

It's a kind of computation which takes a predictable amount of time to run.
Agreeing about the order of events is very difficult in computer networks, especially if you can't trust the other computers involved.
Proof-of-Work solves that problem by putting the network on a trustworthy clock.

<br>

## Ok, what's decentralized consensus?

Decentralized consensus is a system where multiple computers can make additions to a blockchain without having to trust each other.
This involves a lot of technical coordination - thus the requirement for Proof-of-Work.

Decentralized consensus *is intended* to mean that one entity can't control the blockchain network.
Any newcomer can participate, and ownership is equally distributed among the participants.

<br>

## Does it work?

To some degree.
Decentralized consensus places control of the network into a purchasable metric.
With Proof-of-Work, that metric is hashing power.

This is actually a pretty cool idea.
Hashing power is created by computing hardware, and you don't need to ask anyone permission to buy computers.
So it's a very populist idea: anybody can get involved.

Unfortunately, like any good capitalist system, having *capital* is a prerequisite to having *power*.
Sure your laptop can start mining over night, but you're competing in a lottery where the odds of success are equivalent to the amount you invest, and people are investing a lot of money into their mining hardware.

Therefore whether decentralized consensus solves the question of ownership is really dependant on circumstance.
For the system to stay decentralized, ownership can never be concentrated beyond 50% -- but that's just a question of how much money you're willing to spend.
In fact, because of mining pools, [a >50% concentration has happened before.](https://arstechnica.com/information-technology/2014/06/after-reaching-51-network-power-bitcoin-mining-pool-says-trust-us/)
Because you don't need permission to buy hashing power and participate in Bitcoin, there's no way a "51% attack" can be stopped, except by outbuying your competitors.

Decentralized consensus also fails to consider the political reality of human networks.
The protocols need changes over time, and changes mean governance.
In Bitcoin, acceptance of a change is signalled by the miners - once some percent of the miners agree, the change is accepted.
This means that hashing power is used as a measure of voting power, and so the political system is essentially plutocratic.
How is that significantly better than the board of a publicly traded company?

This is why I'm unimpressed with decentralized consensus as a political solution.
Bitcoin has been wildly unstable, with controversies and forks happening querterly.
I personally suspect stability will actually mean "dominant ownership."
It doesn't seem like a unique victory over political realities, and it *still* comes with the <a href="https://motherboard.vice.com/en_us/article/ywbbpm/bitcoin-mining-electricity-consumption-ethereum-energy-climate-change" title="One Bitcoin Transaction Now Uses as Much Energy as Your House in a Week">high cost of Proof-of-Work</a>.

<br>

## Ok, what about Proof-of-Stake?

Some folks in the cryptocoin world -- most notably, Ethereum -- have been working on a new solution for decentralized consensus called Proof-of-Stake.
It is an attempt to solve the cost problem of Proof-of-Work, and it involves no excessive energy use.

I like the spirit of Proof-of-Stake, because it tries to solve the problem, but I'm going to point out two things:

 1. Proof-of-Stake is not yet proven, and, prior to Proof-of-Work, nobody was sure that decentralized consensus was possible. When Proof-of-Work started to be discuseed, computer scientists were running naked in the streets with excitement. Therefore I default to extreme skepticism -- but I'll keep my eye out for any nerdy-looking streakers.
 2. Anybody who's been involved in crypto-currencies for more than a year who smoothly transitions from "PoW is a great revolution" to "obviously PoW was never the long term solution" deserves a hard poke in the eye for the duration of my choosing.

I'd explain Proof-of-Stake here, except that I don't totally understand it yet.
From what I understand, it involves operators placing some of their currency holdings into a shared pot.
Then, a random lottery is chosen from those operators, with weighting given for the people who put value into the pot.
And -- I *think* -- you risk losing what you place in the pot if you do something provably incorrect during your turn as the leader.

(That could be wrong.
If somebody on HN or Twitter corrects me, I'll update it.)

Proof-of-Stake could work out.
It could be great.
I'm waiting to see.
Until then, let's talk about another option that I think can work just fine: services with blockchains.


<br>

## Services with blockchains

It is the case that blokchains and proof-of-work are two separate concepts, but I worry that the hype around blokchains has inextricably linked the two, so I'm going to switch to a different term to talk about blockchains: **secure ledgers**.

Conceptually I'm referring to the exact same data structure that a blockchain is, but hopefully "secure ledger" is a bit more descriptive, and most importantly has no baggage or connection to proof-of-work.
Got it?
Ok.

<br>

## Services with <strike>blockchains</strike> secure ledgers

What most people don't realize is that you can get a lot of value from <strike>blockchains</strike> secure ledgers without decentralized consensus.
Here's how:

Instead of a network of miners, you use a single host.
That host mantains a secure ledger which contains the host state and its activity log, including all requests and their results.
That ledger is published for clients to actively sync and monitor.

Why?
Accountability.

Clients can monitor the ledger and, just as in decentralized consensus, ensure the host is following a set of business rules.
The business rules would be published, either as a set of code files on the ledger, or out of band.
The monitors follow the ledger and replay the inputs against the published code.
If the outputs or the state on the ledger ever starts to deviate from the rules of the code, you know the host is doing something fishy, and you can prove it.

So, accountability is provided by a very hard-to-forge public log.

With this accountability comes better trust.
We don't need to worry that a keyserver, for instance, is lying about its bindings, because we can check its live responses against the ledger.
If we've reviewed the business logic and trust it, and we never observe a deviation from that logic in the ledger history, then the keyserver is in good order.

<br>

## That could never work!

I love to point out when we're stealing from [Certificate Transparency](https://www.certificate-transparency.org/), because it's a well-respected protocol created by Google to monitor SSL certificate authorities, and this is just another one of those cases.

CT is a superb example of this design.
Each Certificate Authority maintains a secure ledger of its certificate assignments.
Monitor-nodes and clients compare the certs they receive against the chain to make sure the rules of certification are always being followed.
[It's already been used to catch Symantec in the act of breaking the business rules of Certificate Transparency.](https://sslmate.com/blog/post/ct_redaction_in_chrome_53)
(Basically, they used a "redaction" feature that wasn't in the agreed-upon rules.)

<img src="/assets/img/certificate_tranpsarency_diagram.png" class="centered">

A friend pointed out that Git is also an example of a secure ledger -- which is true.
It uses a chain of cyrptographic hashes to secure the history of the code.
However, Git wasn't designed for auditing the actions of a live service, and it therefore (wisely) allows branches and force-pushes which break the append-only constraint which we need for accountability.

<br>

## What's the big win?

Like in crypto-currencies, secure ledgers solve a question of trust for services.

Traditional services are black boxes.
We can only guess at what code they are using, and there's nothing stopping the owners of the service from jumping into the DB and making a change.

With a ledger-backed service, you don't need to worry about surreptitious edits.
The only way the state of the service can be changed is by the rules of the published code.
That means that the code is a kind of contract; if the contract is broken, the clients can prove it was broken, and publish that proof.

Compared to decentralized consensus, a ledger-backed service provides the exact same level of auditability.
It trades the interchangeability of hosts for a much cheaper operating model -- no Proof-of-Work.
Given the cost of PoW, I think that's a huge win.

There are some downsides to losing decentralized consensus.
A ledger-backed service could manipulate the order in which it handles requests, or reject some requests altogether, and clients would have a hard time proving it.
You could combat that problem using a third-party proxy, which logs the attempted calls and notes the responses from the host.
The other downside is that, without decentralized consensus, the only way to handle a misbehaving service is to stop using it -- whereas Bitcoin can just ignore the misbehaving miner.

As a proof-of-concept, I have written an auditable server called [NodeVMS](https://nodevms.com) which uses code from [Dat](https://datproject.org) to provide the secure ledger.
(Dat contains a secure ledger implementation called Hypercore, typically used for distributing files in a p2p mesh.
Here it's used to distribute the state and activity log of the service.)
VMS is not at production-ready, but it demonstrates the core ideas of this design.

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

I suspect that, for a lot of people, a service with a secure ledger is enough.

---

If you like this, be sure to check out my work with the [Beaker Browser](https://beakerbrowser.com) and [Dat protocl](https://datproject.org).
