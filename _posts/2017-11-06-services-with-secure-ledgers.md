---
layout: post
title: Services with secure ledgers
desc: 
---

There's a push in the decentralization world to use Bitcoin variants as the solution for everything: databases, user identity, key distribution, even basic hosting.

I am strongly against this due to the excessive cost of Proof-of-Work.

Proof-of-Work requires every operator in the network to run throw-away computation, which costs electricity.
There's a technical reason for doing it, but, economically speaking, that computation acts as a kind of lottery for the operators.
If they win the lottery, they earn some amount of Bitcoin-- so the higher Bitcoin is worth, the more electricity they're willing to spend.

This has had a predictable result!
<a href="https://motherboard.vice.com/en_us/article/ywbbpm/bitcoin-mining-electricity-consumption-ethereum-energy-climate-change" title="One Bitcoin Transaction Now Uses as Much Energy as Your House in a Week">"One Bitcoin transaction uses as much energy as your house in a week" according to Motherboard</a>.

It seems outlandish, but think about this: the operators (called miners) are incentivized to spend electricity up to the probability of a win multiplied by the current valuation of a BtC.
If you have a (let's say) a 1% chance at winning Bitcoin worth (let's say) $10k, you'd be smart to pay up to $100 of electricity per round to win.
That's what's happening here, all around the world, with rounds occurring *every ten minutes*.

> Alex de Vries, aka [Digiconomist](https://digiconomist.net/bitcoin-energy-consumption), estimates that with prices the way they are now, it would be profitable for Bitcoin miners to burn through over 24 terawatt-hours of electricity annually as they compete. ... That's about as much as Nigeria, a country of 186 million people, uses in a year.

The amount of energy spent is going to increase as the value of Bitcoin increases, driven by speculation and the need for liquidity in other crypto currencies.
That is *not a good thing.*

Is Bitcoin ever going to be worth this kind of energy cost?

We can already run transactions online.
Perhaps, one day in the future, Bitcoin will remove a little friction around micropayments.
Hurray?
I frequently describe myself as a "decentralization nut" and for me, this just isn't worth the ecological impact.

The more I've worked in this space -- on [Secure Scuttlebutt](https://scuttlebutt.nz) first, and now on the [Dat](https://datproject.org) protocol and the [Beaker Browser](https://beakerbrowser.com) -- the more convinced I've become that blockchains are a huge step forward, but Proof-of-Work is a total mistake.

And, for some people, that's a surprise.
The way cryptocurrencies have been sold to us, it's reasonable to assume that Proof-of-Work and blockchains are one in the same.
They are not!
Nor do blockchains do not require Proof-of-Work.
They're separate concepts; and blockchains can work without Proof-of-Work and still provide an enormous benefit.

In fact, I argue that Proof-of-Work is a political solution tacked onto blockchains -- a hail mary attempt to provide a cure-all to power dynamics -- and it completely fails at its purpose.

However!
The data structure of a blockchain can be applied to traditional services to introduce cryptographic auditability, and it's the value of that use-case that I want to convince you of today.

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

By encompassing the history in each hash, we make it easy to compare that history.
Two computers can quickly check hash equality with each other.

<img src="/assets/img/checkin.gif" class="centered">

A blockchain is supposed to have a single linear history of transactions.

If the compared hashes for a block don’t match, then we know the history has split.
A split history is a sign of a lie or corruption, and it means the blockchain author isn't trustworthy.

<img src="/assets/img/snitch.gif" class="centered">

Because the blocks are signed, any user with evidence of a split history can prove to the network that the blockchain has been corrupted.

Therefore, blockchains enforce an "append only" constraint, and enables peers to efficiently monitor the blockchain author.

<br>

## What is Proof-of-Work?

Proof-of-Work is a system for creating "decentralized consensus."

It's a kind of computation which takes a predictable amount of time to run.
Agreeing about the order of events is very difficult in computer networks, especially if you can't trust the other computers involved.
Proof-of-Work solves that problem by putting the network on a trustworthy clock.

<br>

## Ok, what's decentralized consensus?

Decentralized consensus is a system where multiple computers can make additions to a blockchain without having to trust each other.
This involves a lot of technical coordination - thus Proof-of-Work.

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

Some folks in the crypto-coin world -- most notably, Ethereum -- have been working on a new solution for decentralized consensus called Proof-of-Stake.
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

What most people don't realize ... hmm, wait.
I got some feedback here.

While I'm told I did a wonderful job explaining that "blockchain" does not refer to Proof-of-Work, I'm told that hype is too strong, and that I need to use another term.
So I'm going to use another term instead: **secure ledgers**.

Conceptually it's exactly the same, but it's a bit more generic, and it has no baggage of connection to PoW.
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