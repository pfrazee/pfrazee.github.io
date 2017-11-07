---
layout: post
title: Understanding trust, names, and key distribution on the P2P Web
desc: 
---

In the [Dat](https://datproject.org) network, all data is signed and attached to a pubkey origin.
URLs look like: `dat://{pubkey}/{path...}`.
Basically, the pubkey replaces the IP address.

How do we know which pubkey belongs to which user?
And, when can we replace those ugly pubkeys with nice readable shortnames?

This is a classic problem of cryptographic networking, and, to solve it, we need to dig into the options.

<br>

## The Web of Trust

The Web of Trust is a system for sharing identity certifications.
People meet, in person, to sign each others' keys.
To help the system scale, it uses [transitive connections](https://en.wikipedia.org/wiki/Transitive_relation).
An identity signed by someone you know might automatically be trusted.

<img src="/assets/img/responsible_behavior.png">

The ideas in the Web of Trust spawned [a lot of research](http://www.inf.ufsc.br/~fernando.gauthier/EGC6006/material/Aula%206/A%20survey%20of%20trust%20in%20computer%20science%20and%20the%20Semantic%20Web.pdf) in the 90s and 00s.
One interesting project was called [Advogato](https://en.wikipedia.org/wiki/Advogato).

<img class="centered" src="/assets/img/advogato_logo.png">

Advogato was a blog where write-access was controlled by a calculated trust, similar to in the Web of Trust but with more sophistication.

> The motivating idea for Advogato was to try out ... attack-resistant [trust metrics](https://en.wikipedia.org/wiki/Trust_metric), having users certify each other in a kind of peer review process.

What's interesting is, the algorithm used to calculate trust is fundamentally similar to [PageRank](https://en.wikipedia.org/wiki/PageRank), the algorithm used by Google to rate article interest.

> In the case of Advogato, the trust metric is designed to include all individuals who could reasonably be considered members of the Free Software and Open Source communities while excluding others.

Both of these algorithms do graph analysis.
They start with a preprogrammed set of "good nodes," and then follow links through the graph, progressively assigning a value to each node.
Because the links are transitive, the value of each node is allowed to flow from one node to another.

While PageRank used HTML links to signify a "recommendation," Advogato used explicit peer review.
While PageRank scores links for inclusion in search, Advogato scores users for permission to post.

<img class="centered" src="/assets/img/pagerank.png">

This is all rooted in the idea that we can take actions which users can do individually -- such as signing keys at a party -- and then scale the inferred knowledge through graph analysis.

These ideas also apply to the P2P Web.
Applications use [Dat](https://datproject.org) in [Beaker](https://beakerbrowser.com) write JSON documents to publish data.
A very simple profile object might look like this:

```js
{
  "name": "Alice",
  "follows": [{"name": "Bob", "url": "dat://{pubkey}"}]
}
```

Each file in a Dat archive is signed by the author.
Therefore, this profile is a signed object, and its `follows` link represents a connection to another pubkey.
If the application included trust metrics, it might start to look a lot like PGP's Web of Trust:

```js
{"name": "Bob", "url": "dat://{pubkey}", "trust": "ultimate"}
```

<br>

---

> "So -- it's simple!
> We can create a new naming and key distribution system on Dat's Web of Trust, right?"

Well, not so fast.
Graph analysis can be very useful with this kind of dataset, but we need to think through our models of trust.

---

<br>

## Top down versus bottom up trust

All crypto trust starts with out-of-band sharing.
CAs are built into our infrastructure (which qualifies as out-of-band).
So, we start with 

 1. Certificate Authorities, which we'll call "top down" trust, and 
 2. in-person key signing, which we'll call "bottom up" trust.

All trust flows from where the out-of-band confirmation has occurred.
If you accept that I am [@pfrazee](https://twitter.com) as Twitter tells you, then you are *also* accepting that twitter.com is Twitter as a Certificate Authority tells you.
Your trust in [@pfrazee](https://twitter.com) comes from the top down.

There are ways that we can enhance the trustworthiness of a certification, but we can't change the origin.
It's always from some out-of-band confirmation, which we'll say is either top down or bottom up.

<br>

## Trust domains

We also need to understand that there are many domains of trust.

Certificate Authorities confirm the binding between DNS names and HTTPS certificates.
This is the domain of naming and key distribution.
With "Extended Verification," they also try to tell us who owns the domain.
However, they do nothing at all to tell us if (say) PayPal is a good business.

For most of this post, I'm going to be talking about the domain of names and key distribution -- basically, trusting that you're interacting with who you think you are.

<br>

---

> "Got it! So there are domains and origins of trust -- what does that mean for our P2P Web?"

Let's start with the positive.
What can we do that's really new?

---

<br>

## Improving top down trust

With a couple of improvements, I believe we can feel good about using top down trust to power most people's encryption and code-signing.

Dat's cryptographic network enhances top down trust by creating secure public records of asserted names.
This will be done explicitly with services, and implicitly through social interactions.

**Service name bindings**

Any time a user joins a service, it's common for them to be assigned a name.
By recording this assignment in the user's Dat ledger and in the service's Dat ledger, we get a secure bidirectional confirmation of the name.
Therefore, each service gives a new usable shortname: [pfrazee.hashbase.io](pfrazee.hashbase.io), for instance.

[Keybase](https://keybase.io) has done a good job demonstrating how multiple overlapping certifications from high profile services can provide a reasonably strong proof of a user identity.
The same principle applies here.

**Social interactions**

User interactions reflect their belief in who somebody is.
This is a hugely useful tool for auditing our name assignments.

Consider: If somebody you trust has been interacting with a "Paul Frazee," and the pubkey of that Paul is different than the pubkey that Hashbase is now giving for [pfrazee.hashbase.io](pfrazee.hashbase.io) -- then you know something is wrong.

By merit of all the Dat ledgers publishing social interactions, we get a log for what the top down services have been claiming.
Applying graph analysis to the Dat network should reveal when incongruities are occuring, and increase the chances of detection.

<br>

---

> "Cool cool cool... so that's top down trust. What about bottom up?"

That's more complicated!

---

<br>

## Understanding bottom up trust

The merit of bottom up trust is that it *does not originate from the CAs*, and therefore provides a wholly new signal.
Bottom up trust trumps top down because it's created through a more trusted channel.
It's the ideal form of trust for handling secrets.

However, out-of-band certification is conceptually difficult for most users.
The odds are good that even advanced users will confirm what top down authority is already telling them, rather than provide fresh out-of-band confirmations.

> You're @pfrazee, right? Great ^clicks certify^.

We should try to avoid polluting bottom up trust with bad signals.
Don't tell users to confirm identities without a tutorial.
Hide it behind advanced screens, and reserve bottom up trust for really high security tasks.
I got this stuff wrong when I had been programming for 15 years, so grandma will too.

<br>

## I think it's a stretch goal

Even with QR codes, the UX of in-person key signing is very bad.
It's complex to understand, and it isn't fun.
Without users creating good out-of-band signatures frequently, we can't expect bottom up trust to scale beyond offices and small communities -- so that's how I suggest we use it.

Within offices, you're paid to do tedious things, and you have to manage valuable information.
So, why not?
Let's have office employees sign each others keys.

But until there's a device which makes in-person key exchange fast and enjoyable, I don't think we should rely on bottom up trust in the global network.
I suggest reserving bottom up trust for offices and advanced use-cases.
Perhaps use it as a special verification, but don't talk about it much.
The value just isn't going to be high enough to the average user if it doesn't scale.

<br>

---

> "What about blockchains? I heard blockchains solve everything!"

Ehm...

---

<br>

## Say no to blockchains

A lot of folks want to turn to blockchains to replace DNS and CAs in one stroke.
The idea is that we can bake in a naming blockchain the same way that we bake in CAs and DNS servers, and empower them to map names to pubkeys.

I think Proof-of-Work is much to expensive to merit use.
<a href="https://motherboard.vice.com/en_us/article/ywbbpm/bitcoin-mining-electricity-consumption-ethereum-energy-climate-change" title="One Bitcoin Transaction Now Uses as Much Energy as Your House in a Week">Proof-of-Work is extremely wasteful.</a>
I'd also note that the most popular blockchains have been politically unstable, and experienced hard forks.

Instead, we can get the benefit of cryptographic auditability through [services which record their state to secure ledgers](./auditable-services-through-secure-ledgers).
This is already happening with CAs through [Certificate Transparency](https://www.certificate-transparency.org/), and can easily be applied to user nameservers as well.

<br>

---

> "Rats. No fancy new naming system, then?"

I didn't say that!

---

<br>

## User-defined naming

We're building a user-defined naming scheme in the next version of Beaker, currently under the `app://` scheme, but we're also considering `web://` and `dweb://`.
The core idea is to make any hostname choosable by the user.

So: "I like this mail app; I'll set it as my app://mail."

This system gets interesting when you ask what happens when there's not a user-chosen mapping for a name.
What then?
Do we fall back on search?
Do we take a guess?

This solution will probably be pluggable, and so users will be able to choose how they resolve new names under this scheme.
This is where graph analysis gets to be more useful.

It's going to be chaotic, yes.
It might not actually be a "universal" resource locator anymore.
But it *will* be interesting.

<br>

## Wrapping up

For handling secure naming and key distribution, I think the P2P Web will require evolution, not revolution.

Using [secure ledgers](https://beakerbrowser.com/2017/06/19/cryptographically-secure-change-feeds.html) to back everything makes it much easier to monitor naming assignments.
We can use bidirectional confirmations with naming servers to secure user shortnames, and we can watch the public social interactions on the network to detect suspicious players.

In the future, perhaps with special hardware, we can even bring back PGP's original Web of Trust, and finally make it scale.