---
layout: post
thumb: "https://pfrazee.hashbase.io/assets/img/seed-menu.png"
title: "Why bother with P2P when you still need to guarantee uptime?"
twitter_card: summary
desc: "What's the point if you're still going to be responsible for keeping the site online?"
---

<style>
iframe {
  margin: 40px auto !important;
}
</style>

[Beaker browser](https://beakerbrowser.com) uses a peer-to-peer protocol ([dat://](https://datproject.org)) to serve websites.
With p2p, you can create and host websites from the browser.

However, people have observed that peer-to-peer does not guarantee uptime.
You still need a computer to keep your dats online, or else your visitors will get a 404.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">publish a p2p website on my computer -&gt; oh no I want my friends to see my blog even when my computer is sleeping, better keep it on all the time -&gt; my computer is now a server <br>??? what am I missing</p>&mdash; daiyi! ✨ (chris) (@daiyitastic) <a href="https://twitter.com/daiyitastic/status/1053766549922705408?ref_src=twsrc%5Etfw">October 20, 2018</a></blockquote>

In the [most recent version of Beaker](https://github.com/beakerbrowser/beaker/releases/tag/0.8.0), we've added a new feature called the "Watchlist" because peer-to-peer sites go down when users go offline.
The watchlist lets you know when a site comes back.

![add-to-watchlist.png](/assets/img/add-to-watchlist.png)

[Dat](https://datproject.org) works to improve uptime, but it doesn't *guarantee* uptime.
Dat is a lot like BitTorrent; if there aren't any peers online and you haven't visited the site before, then you can't download the site.

<img src="/assets/img/seed-menu.png" class="centered bordered" style="margin: 40px auto">

Like the tweet above mentions, you can use a "peer service" like [Hashbase](https://hashbase.io/) to keep your site online.
This is a pretty straight-forward solution: you're asking a service to be the peer of last resort.
You can also [self-host Hashbase](https://github.com/beakerbrowser/hashbase).

I believe that home servers will someday be common enough to solve this problem, but it raises a good question:
If uptime isn't guaranteed by the network, then what's the benefit of p2p?

## Why bother: It's cheaper

Peer-to-peer hosting may not guarantee uptime, but it does solve costs.

In traditional client/server hosting, the server has to pay the full cost of bandwidth.
You're going to shoulder all the cost, which is pretty intense when a self-hosted video goes viral.
The bandwidth bill adds up.

<p class="center" style="margin: 40px auto"><img src="/assets/img/aws-bandwidth-bill.png" class="bordered"><br><small>1 million downloads of a 10MB video gets you a $900 bill. (<a href="https://aws.amazon.com/ec2/pricing/on-demand/">source</a>)</small></p>

The idea of spending anything more than $5 to share a video of your cat wearing a pirate costume is, frankly, not very realistic.

<p class="center" style="margin: 40px auto"><img src="/assets/img/pirate-cat.jpg" class="bordered"><br><small>Yarrr I hope that shit was worth it. (<a href="https://www.meowingtons.com/products/pirate-cat-costume-1">source</a>)</small></p>

Peer-to-peer hosting solves that by distributing cost through the network.
Visitors seed the files, effectively giving resources back to the creators and to the other visitors.
As a result, creators don't have to shoulder the costs -- going viral on p2p doesn't break the bank.

If we ever want to stop depending on services like YouTube to host our content, we really need cost-sharing in order to make it feasible.

## Why bother: It's disintermediating

Creating an HTTP/S website is a chore.
You need to setup a server on Google Cloud or AWS, configure and buy a domain name, and then acquire an SSL certificate.
That's all *on top* of just building the site.

The premise of the Web is to make publishing and connection available to everyone.
Depending on services to solve these problems is why we have a centralization problem.

<img src="/assets/img/create-website.png" class="centered bordered" style="margin: 40px auto">

A peer-to-peer protocol replaces the server/DNS/SSL stack.
Domains are allocated as public keys, which is free and instant and works offline.
Files are published by signing and sharing them.
This is all a few clicks in the browser, so literally anybody can create a website.

<img src="/assets/img/builtin-editor.png" class="centered bordered" style="margin: 40px auto">

There's a second-order benefit to this: P2P apps don't use servers to store user-data.
Apps manage user data by [reading](https://beakerbrowser.com/docs/guides/read-site-files) and [writing](https://beakerbrowser.com/docs/guides/write-site-files) files on the visitor's own p2p sites.
This means storing user-data is free and instant and works offline.
That's why it's possible to ["fork" dat websites](https://beakerbrowser.com/docs/tour/#forking-or-copying-a-website): there's no server hiding the code.

Peer services ([Hashbase](https://hashbase.io/)) are not ideal, but they have one key advantage: they're dumb.
They don't encode business logic.
P2P apps put the business logic into the client instead, where it's in the users' hands and can be modified.

This inverts the power structure -- even if you're using a peer service, you're only using it for its resources, not to define your application.
Ideally this should mean that the services live in the background, and can be swapped with no impact on the user.

## Closing

Why bother with peer-to-peer?

Because we're wasting the world's talents by saying that only corporations can modify our software.
The world is full of hackers who want to improve the world.
Doing&nbsp;so&nbsp;should not require an API key.

Disintermediation matters because it inverts the control structure of the network, but cost-cutting matters too.
Cost-cutting matters because the society of computers isn't going to work if participation costs money.
That's how wealth translates into power.
Coders should not have to front the cost of hosting their own work -- the network should.

Maybe someday a peer-to-peer protocol will guarantee uptime.
That would be really useful!
The community is watching [Filecoin's](https://filecoin.io/) launch with a lot interest.
But even if it doesn't, peer-to-peer can have a powerful effect on the Web.

[&raquo; Learn more about Beaker browser.](https://beakerbrowser.com)

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>