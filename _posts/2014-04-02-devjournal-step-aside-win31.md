---
layout: post
title: Step Aside, Windows 3.1 (Layer1 Devlog)
desc: Great artists steal
---

Great artists steal.

![screenshot](/img/2014-04-02_service-agents.jpg)

Another journal entry for Layer1, an RTS interface for web software.

**Webgl vs css3d**

I spent some time switching from the css3d renderer to webgl, then realized how important GUI interactions will be &ndash; including copy & paste &ndash; and decided I better stick with browser rendering.

**Giving it time**

The chief concern I have right now is the interaction model. I need to give it time to grow, but that's hard to do when the whole thing could be a mistake. It's hard to just twiddle. These things take time.

**Agent types**

I set down a few agent types today: (Services, Collections, Items), (Transporters), (Iterators, Queues), (Transformers). The first group are data-containers, more like buildings in the RTS metaphor. Transporters are purely for utility in the world-space &ndash; an equivalent to the pipe operator, but controlled [more like SC's workers](https://www.youtube.com/watch?v=A7ZnAeMJOA4). The third group work alongside transporters to help them work through a list, so you can think of them like the minerals that get mined. Transformers are like queues, but they apply some kind of mutation to objects as they come in.

Agent types should probably have a single primary task when possible. Services, collections, and items are a bit like deployable buildings, where "deploy" opens up a more detailed interface and renders the endpoint's media. Transporters, like SC's workers, have a base (their parent agent) and so right-clicking them on an iterator or queue should cause them to mine (GET) the target and bring the items back (POST) to their base. There can be automations to help with that &ndash; for instance, targeting a collection would cause the collection to spawn an iterator for it.

Iterators will probably want to be filterable (against the items' hypermedia). Collections should also be queryable for items, though I'm not sure if that's a Query agent or just an action.

**Spawn menu**

The spawn menu should be sensitive to the links on the endpoint, not just to the parent agent's type. I think "service" will be the catchall reltype, like Javascript's Object.

**Next up**

I'm going to try to get a better feel to the UX so that I have good thoughts when I sit down to this project. Really gotta manage myself. So: Primary actions which map to right click; Move tweening so that this thing has some life to it; "Deploy" actions on Services, Collections, and Items to see what it's like to get media into the world.