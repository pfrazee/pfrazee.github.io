A year or two ago, I came across an interesting idea that I've never had the knowledge or understanding to contextualize. I know that the modern understanding of gravity has to do with curvature of space and time. Is this what they mean?

I've made a simulation to demonstrate the idea, of orbit without gravity. This post explains the effect, how I came upon it, and how it works.

--

I'll start with a teaser: what if there were no such thing as a force of gravity?

What if, all you need is variable time, and the internal forces of a body in order to cause the motion of gravity, orbit and all?

--

It's easiest to explain this idea by the way I came to it.

An acquiantance showed me a paper about dilating time in a massively-multiplayer game as a means of supporting congestion. This is not a new idea: it's been practiced for years by Eve Online and others.

Eve Online segments its game space into discreted, disconnected spaces. Players portal their ships between these spaces; so they are not continuous or connected. When a lot of players enter a shared space, the servers "slow down time" in that space only. Every cycle of processing advances the in-game clock by a lesser amount.

This helps them process all of the events more correctly. When that many computers are in communication, there's issues of latency, dropped packets, and congestion, which compound on each other. Slowing down the game is a simple way to make sure that every player is given their due.

The paper I was shown suggested a new idea: what if we dilated time (that is, slowed it down) in a continuous space? Rather than creating discrete sectors, we could have local times for each entity in the game, and modulate its rate-of-passage as needed? You'd probably slow down time for an entity that's moving quickly, or near some other entity. That is: the more likely an interaction is for some entity, the more slowly time would pass.

That struck me as a funny idea. I was imagining playing Quake, and firing a rocket at a foe. The closer you were to striking your target, the more likely they were to slow down. I couldn't imagine that game playing very well.

Then, something else occurred to me. How would the physics engine handle that? There are different kinds of physical models in games: solid bodies that bounce off the ground; soft bodies that blow in the wind; ragdolls for corpses. What would happen to a ragdoll if you moved the head through time at a different rate than the feet? Surely you'd break the physics.

Well, it turns out you do: You end up getting a drift in the ragdoll's overall position. Assuming there aren't any other forces involved, your ragdoll will begin to orbit around the center of time dilation.

---

This is a bit difficult to explain, but, I promise there's a working demo, so hang with me. This pays off.

We're going to use a spring force. Spring forces are very simple. Think of a spring in your matress; that's what spring-force describes.

The spring tries to maintain a certain distance between its two endpoints. If you compress the ends together, the spring pushes back out. If you stretch the ends apart, the spring pulls back in.

<pic TODO>

Here's the formula for calculating how much force will be applied:

<pic TODO>

For our hypothetical, we'll create a two-dimensional space like in a graphing calculator, and put two objects on the ends of a spring. (Technically the objects are "point-masses," but just imagine they're balls that weigh a kilogram each.)

<pic TODO>

Now, give both balls an equal velocity "up" on the Y axis. What happens: they both go straight up at equal speed, of course.

<pic TODO>

That's obvious. Now, let's add time-dilation.

To the left of the balls & spring, we're going to put the center of dilation. The closer a ball is to that center, the more slowly it will move through time. We give the balls the same starting "up" velocity.

What happens: the balls begin to go upward, but then swing to the left. The ball on the right begins to swing around the left ball. As the two balls spiral around each other, they curve to the left, then back toward the center... and into orbit.

<pic TODO>

Why is this happening? Both balls start with the same velocity. They have the same mass, and the spring that connects them exerts the exact same force. Shouldn't they just continue up as before?

The issue is, *time is different*. The left ball is moving more slowly through time, and therefore an equal velocity moves the left ball through space at a different rate than the right ball. Not only does velocity have less effect, but so does acceleration. It's like the left ball "experiences" less of the spring force than the right ball does.

<pic TODO>

But, this isn't a constant situation. The right ball swings around, and eventually it's closer to the center of dilation than the left ball. Then *it's* the "slower entity." This is an almost constant condition; the inner-most ball is always the slower one.

That means, you end up moving the two balls and spring toward the center of dilation, purely due to the spring force. If you consider the balls and spring a single body, then it's the internal forces of the body that cause the orbit.

---

This demo was hacked together in one evening. It demonstrates the effect, but doesn't try to reflect anything realistic. There's a magic number in there that won't ever be written in a book, that's for sure. If you run it long enough, one of the balls hits the edge of the screen and it all breaks.

Neat, isn't it?