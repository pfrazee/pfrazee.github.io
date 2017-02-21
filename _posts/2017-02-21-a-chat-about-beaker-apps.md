---
layout: post
title: "A chat about Beaker's applications model"
---

I had a productive conversation with [David Ascher](https://twitter.com/davidascher) about [Beaker](https://beakerbrowser.com)'s apps model the other day. With his permission, I'm reproducing it here.

<br>

---

<br>

**davidascher**<br>
So, how do you see this application model working, in particular what kinds of applications do you see hosting on a [dat](https://datproject.org)-based data model?

**pfrazee**<br>
First, [dat](https://datproject.org) apps have a better privacy story. Theyre not attached to a host, so individual clicks aren't being tracked as much, and they (should) use device storage by default.

**davidascher**<br>
I'm just ramping up, but isn't that dependent on you locking down JS code to not do any non-local calls?

**pfrazee**<br>
That's accurate. We use content security policies to control who the JS can contact.

**davidascher**<br>
What kinds of apps do you think are in scope? In general for the p2p web, i'm having a hard time understanding how one can do anything involving any form of messaging.

(which may be fine, i'm just trying to understand the ambition)

**pfrazee**<br>
The model I'm proposing right now is a [dat](https://datproject.org) + services hybrid ([http://pfrazee.github.io/blog/achieving-scale](http://pfrazee.github.io/blog/achieving-scale)).

What's somewhat interesting about using [dat](https://datproject.org) for publishing is that it distributes the authority of the dataset among the publishing users. Users retain the signing keys for their data.

**davidascher**<br>
Where 'their data' is defined as 'data they added to the network' right?

**pfrazee**<br>
Right.

You're constrained to an eventually-consistent data model to do this. For something like twitter or youtube, where the focus is publishing and discussion, it should be relatively straightforward.

**davidascher**<br>
Thanks, that document is helpful.

It is in particular a good refresher on the mutability characteristics of [dat](https://datproject.org).

Next question if you don't mind -- what's the split between code + data in your app model?

**pfrazee**<br>
There's two basic options I figure - self-mutating dats and non-self-mutating.

Self-mutating is a little bit dangerous, but I figure there's a way we can make it safe enough to putz around with.

And that'll be fun; the kind of thing where you go to a website, fork it, and now you can make changes with the UI.

**davidascher**<br>
Presumably beaker needs to figure out what UI to launch to open a given dat, and presumably a dat could embed its UI?

**pfrazee**<br>
Yeah, an embedded UI would be the self-modifying model.

**davidascher**<br>
And editing (& tools fore that) either data or code is left as an exercise for the reader?

**pfrazee**<br>
No, I figure it's pretty important we figure out how that works at the browser level.

**davidascher**<br>
(I agree. world would be different if TimBL had gone further there.)

**pfrazee**<br>
Yeah definitely.

You really have two interactions to figure out for that design. The first is, if you browse to a data-dat, what do you see? The second is, if you browse to a code-dat, what does it load?

**davidascher**<br>
Or is an app code+data, and one usually browses to an app, but upon forking you get asked whether to fork code or data?

**pfrazee**<br>
You know, I wouldn't rule anything out.

**davidascher**<br>
Related question is how prescriptive you want to be -- is code JS only?

**pfrazee**<br>
Wouldn't rule anything out for that either.

**davidascher**<br>
Meaning you don't know, not that you don't want to be prescriptive at some point, I assume?

**pfrazee**<br>
Davidascher: yes.

**davidascher**<br>
Very cool.

**pfrazee**<br>
For the first question -- what happens when you visit a data-dat -- we plan to make it possible for apps to register as viewers of other dats.

**davidascher**<br>
E.g. ckan viewer.

**pfrazee**<br>
Right.

For the second question, it's sort of the inverse, where a code dat can query for saved data-dats of various types and attributes. "Im a social media app, give me the profile dat."

**davidascher** *shudders at the mime-type flashbacks.*

**pfrazee**<br>
Hah right. I think we will probably do the types at the site-level, inside of the dat.json manifest.

**davidascher**<br>
Meaning "i'm a viewer for a DNS address"?

**pfrazee**<br>
Mmm no more like, "I'm a viewer for a markdown-docs site" and "I'm a markdown-docs site."

(type: "markdown-docs" and app://view-markdown-docs, as a little hint to how we're thinking about doing it.)

**davidascher**<br>
Mime-type by another name though, right? single list of types, maybe with selectors?

**pfrazee**<br>
Yeah basically.

**davidascher**<br>
I don't have anything better =)

**pfrazee**<br>
If we want to get a little more fancy, we could take some inspiration from plan9's plumber.

**davidascher**<br>
So, I've done a bunch of playing and thinking about things related to the federated wiki, which I hope you know already.

**pfrazee**<br>
Yeah.

**davidascher**<br>
One of my only insights has been to come up with a kind of content which is a good fit for the federated wiki

because fedwiki currently maps to Ward's brain, which for better or worse isn't how most of the world thinks about things.

and the best example of content that is a natural fit for the federated wiki is recipes.

Each recipe has a heritage (fork history), each one is as valid as the next, but they're highly personal and yet worth publishing.

My wife's fried chicken recipe is a derivative of her mother's, which is a derivative of her aunt's, etc.

**pfrazee**<br>
Ah right, yeah.

**davidascher**<br>
They're all "fried chicken recipe"

Once I found that example explaining fedwiki became a lot easier.

**pfrazee**<br>
That's pretty intuitive.

**davidascher**<br>
I suspect you'll find the same w/ beaker once you experiment more with actual prototype apps.

Fritter is a good edge case, but probably not the canonical one.

neither are open data sets. ;-)

**pfrazee**<br>
Right

**davidascher**<br>
It might be fun to design a TODO app which ends up interesting because you can share/assign todos. Goodness knows there are plenty of frontends available.

For a todo app btw, how do I share the right state between the dat on my phone and the dat on my laptop?

aka what's the identity story?

**pfrazee**<br>
In progress, basically

First - it'll be a while before we get to mobile

**davidascher**<br>
Exciting ! ;-)

I don't need it to be ready, just curious how you're thinking about it.

**pfrazee**<br>
Yeah.

**davidascher**<br>
(and btw, mobile needs thinking early even if the implementation lags, IMO)

esp. because of the OS constraints which can't be ignored.

**pfrazee**<br>
Yeah. There are some interesting difficulties for multi-device Dat.

By design, dat enforces a constraint in which the log of mutations to an archive must never branch

That gets (obviously) hard to enforce once you involve multiple devices. Even if the keypairs are synced, you now have a coordination problem.

The advantage of the no-branching policy is that it forces uniform distribution. For beaker, apps delivered by dat are expected to handle sensitive user-data. Uniform distribution makes targeted payloads harder.

**davidascher**<br>
What is uniform distribution? is that a term of art i should look up?

**pfrazee**<br>
[https://www.datprotocol.com/spec.html](https://www.datprotocol.com/spec.html) Here is a WIP spec. There are some PRs sitting in the queue right now; code's taking more priority.

I'll do my best to summarize: uniform distribution means, "all peers receive the exact same content and metadata"

So: each dat archive maintains a metadata log of changes (mutations). That log is distributed to peers, almost always in its entirety. (It's not unlike a git log.) Peers replay it to get the current state of the archive, then request the files at that state, so it's important that only one history is ever distributed to the network.

You dont want Bob to tell Alice the archive state is X, and then tell Carla the archive state is Y.

**davidascher**<br>
How do you deal with outages longer than the rate of change of an archive?

Is there a monotonic count of deltas?

**pfrazee**<br>
Yeah, each update has a monotonic sequence integer.

**davidascher**<br>
I should know this, but does each archive have a single owner who can write?

**pfrazee**<br>
Yes correct - owner of the private key.

**davidascher**<br>
Ok. following so far.

**pfrazee**<br>
So then the question is, how do we have multiple writers? The answer is, either we coordinate the writers transactionally in a highly-consistent system, or we coordinate them loosely in an eventually-consistent system.

The former solution requires connectivity between all writers at the time of a write. You lose the ability to make writes when offline.

The latter solution comes with the difficulties of an EC system, where simultaneous changes may need to overwrite each other.

**davidascher**<br>
The specific use case of an individual with multiple devices makes me wonder if the answer can come not-in-the-core-protocol.

**pfrazee**<br>
Yes, that's my thinking also. For instance, the eventually-consistent solution can be done by merging together two dats.

**davidascher**<br>
And EC in practice isn't as bad as EC in theory, in my experience. Esp if part of your app-definition-model is a merge resolution process.

**pfrazee**<br>
That's my experience also. The offline writes end up being really nice, too.

<br>

---

<br>

Thanks again to [David](https://twitter.com/davidascher) for a good conversation, and for giving permission to republish it.

Keep an eye out for some Beaker updates this week.

Also, [check out Dat Desktop](https://datproject.org/), which just released today. It's a nice dedicated Dat syncing tool, sort of like a BitTorrent client, that interoperates with Beaker.