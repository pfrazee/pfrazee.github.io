---
layout: post
title: A Game Networking Algorithm that Produces a Gravitational Attraction
desc: Applying variable simulation time-steps across the two ends of a spring in motion can produce attraction toward an external point through the modulation of its spring&nbsp;force.
---

Recently, I've been following the work of [Mikola Lysenko](https://twitter.com/MikolaLysenko) as he explores novel solutions to large-scale network games (up to MMO-scale). He [has blogged recently about maintaining ordered state when the network is overloaded](http://0fps.net/2014/02/26/replication-in-networked-games-spacetime-consistency-part-3/), and explains an algorithm for slowing down the game around high-latency players when they are likely to have an interaction with something important &ndash; like, for instance, a rocket.

**Time Dilation**

This has been done before: Eve Online uses a "time dilation" algorithm to deal with regions under heavy load, which is to say they slow down the game. What's different about them and Mikola's suggestion is that they segment the universe into regions, then apply the dilation uniformly to everone there. Mikola is suggesting one universe with *variable* dilation: not only will players slow down at different times, but the other players will see it happening. He's got a [demo of it here](http://mikolalysenko.github.io/local-perception-filter-demo/): if you turn on the "Local perception filter" (under Latency filter) then shoot from one player at the other, you'll see the slow-down.

**Deformations from Variable Time Dilation**

Now for this to be practical, you tweak the algorithm to make it unnoticeable, or (at least) within the realm of amusing rather than tactically-damning. However, it is a strange idea, and it made me wonder how the physics of the game world would react. Changing the timestep from point-to-point could start to deform the geometry or create strange physics results, [which some authors of the Local Perception Filter algorithm papers covered](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.43.9080&rep=rep1&type=pdf). However, I was watching an astrophysics documentary this week and they mentioned how gravity curves time-space, and that got me thinking that, hey, so does the Local Perception Filter. I wonder if one of the side-effects would be a gravitational pull?

And, well, it looks like it does.

**Producing Attraction between Bodies**

For this to happen, the game has to use soft-body mechanics that generates forces within a body. For instance, a spring would do it. The LPF algorithm applies dilation based on speed and proximity, so this will occur when the spring moves past another participant. Because the spring is made up of two separate point-masses (connected by a spring-force) one of those point-masses (the closer to the participant) will get a higher dilation, causing it to move more slowly than the further point-mass. As the further one passes, it will be pulled back toward the closer point and experience more spring-force because it has a faster time-step. That is, the disparity in experienced velocity rotates the spring, and, though the spring-force is applied equally to both points, it also changes direction with the spring, and so will apply less time per-direction to the most proximate (slowest) point.

What happens next is orbit. The further point swings around the closer point until the entire spring flips, and the variable time-dilation continues to modulate the internal spring-force into a net-gravitational effect.

[Check out this demo of the spring scenario](http://repl.it/Pvh/1). After you click "Run Session" on the top right, you'll see a stream of two numbers. They're the average velocity of the spring for each step of the sim, and they oscillate in a circular trajectory, suggesting orbit. Watching the positions of the two points shows the same.

Is this what is meant by "space-time is curved?" It's interesting that the force of gravity could be produced as a side-effect of an internal force, but I've never heard that in proper physics, so I wonder what the difference is from reality?

~pfrazee