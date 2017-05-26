---
layout: post
title: Announcing Beaker Browser 0.7
desc: New features, faster peer-to-peer sites, and a cat website.
---

I'm happy to announce that [Beaker 0.7](https://github.com/beakerbrowser/beaker/releases/tag/0.7.0) is ready to download. Visit [beakerbrowser.com](https://beakerbrowser.com) to download it, or update your existing copy from the settings page.

 - [Download page](https://beakerbrowser.com/docs/install/)
 - [Release notes](https://github.com/beakerbrowser/beaker/releases/tag/0.7.0)

<a href="https://beakerbrowser.com">
  <img src="/assets/img/beaker-0.7.gif" class="rounded-5px">
</a>

<br>

You can read the full set of updates in the [release notes](https://github.com/beakerbrowser/beaker/releases/tag/0.7.0). This was a big update with a lot of amazing protocol work by the [Dat project](https://datproject.org).

<br>

---

<br>

## What is Beaker?

Beaker is an experimental browser that uses a peer-to-peer protocol called [Dat](https://github.com/datproject/docs/blob/master/papers/dat-paper.md) to run websites without hosts.

**1. Anyone can be a server**

Beaker uses a peer-to-peer network to distribute the cost of bandwidth and disk space. This makes it affordable for anyone to publish and host applications.

**2. Sites run on the user's device**

We call this the ["Thick application model."](https://beakerbrowser.com/docs/inside-beaker/thick-applications.html) P2P sites are detached from hosts, and therefore put the data and business logic on the user's device.

**3. User-data is private**

Dat sites have to ask permission to contact a remote host, so sites will be encouraged use localStorage and the new APIs in Beaker to manage user data. And, due to Dat's transport encryption, only people who know the URL of a Dat site can download a site's files.

This does come with a [tradeoff to browsing privacy](https://beakerbrowser.com/docs/inside-beaker/privacy-and-security.html).

**4. Sites are open-source**

Dat sites include all the files they need to run the application, and Beaker can run them, making them defacto open-source (though a license is still a good idea). Beaker has a "Fork this site" button built into the context menu.

<img class="centered bordered" src="/assets/img/fork-context-menu.png">

**5. No blockchains**

We are [skeptical of blockchains](https://beakerbrowser.com/docs/inside-beaker/other-technologies.html#why-not-a-blockchain) and don't plan to include one in Beaker. We don't believe the decentralization of the Web requires global consensus. Instead, we believe in [distributing data authority](/blog/achieving-scale).

<br>

---

<br>

<div class="center muted">
  <img src="/assets/img/p2pcatsite.jpg" class="bordered"><br>
  <small>Finally, a p2p website for my cat.</small>
</div>

<br>

---

<br>

## What's new in 0.7?

Here's a quick list:

 - The Dat protocol has gotten faster and more featured.
 - Building Dat sites is now much easier.
 - The browser UI is 15.73% less ugly.
 - There's a new [DatArchive](https://beakerbrowser.com/docs/apis/dat.html) Web API.
 - Basic peer swarm analytics (how many peers, last hour graph).
 - Native support for [markdown sites](https://beakerbrowser.com/docs/tutorials/create-a-markdown-site.html).

<br>

---

<br>

## What happened to the builtin editor?

We had, for a period, a builtin editor in Beaker's 0.7 pre-release. It used Microsoft's excellent [Monaco editor](https://github.com/Microsoft/monaco-editor) to let you edit source on a site you visit -- which is still a cool idea, but:

 1. We pretty quickly realized that an editor is useless for web development if you don't have build tooling, and porting build tooling to work inside Beaker is a big process.

 2. Editors take an enormous amount of work to do well, and we were really unsure we *ourselves* would use our own editor. Tara and I boh love Sublime.

Both are big issues, but point 1 is a deal-breaker. I can't get anything done without npm these days.

So, we scrapped the builtin editor and instead came up with the [staging area](https://beakerbrowser.com/docs/using-beaker/staging-area.html), plus a simple "View source" tool to review a Dat site prior to actually forking it. We think this works a lot better, and we hope y'all agree.

<br>

---

<br>

Special thanks to the GitHub team for their amazing work on [Electron](https://electron.atom.io/), and an extra-special thanks to Code for Science for their amazing work on [Dat](https://datproject.org).

Head over to [beakerbrowser.com](https://beakerbrowser.com) and give 0.7 a try.