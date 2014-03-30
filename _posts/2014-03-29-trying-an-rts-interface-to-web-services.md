---
layout: post
title: Trying an RTS interface to web services
desc: An idea I've been kicking around for a while
---

An idea I've been kicking around for a while.

User Agents are deployed on your map. They encapsulate a URL, an index (which was provided by that endpoint's Link header) and local state. They let you manipulate the remote endpoints.

You command the agents around the map. You can clone them, have them create new agents, put them in formations and deploy them into media (HTML, images, video) drawn from their endpoints.

Agents are typed based on the endpoint's reltype and can add custom behaviors. The agents' indexes are used to create more agents. (The agent types query against the indexes and find the endpoints they support. Select MyHost.com agent, "Spawn&nbsp;>&nbsp;Collection:&nbsp;Users.")

That's the plan so far. Here's two days of work, using threejs' CSS3d renderer:

<iframe width="640" height="390" src="//www.youtube.com/embed/7rQbMg85q4Q" frameborder="0" allowfullscreen></iframe>