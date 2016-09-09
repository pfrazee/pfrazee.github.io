---
layout: post
title: Beaker Browser 0.2
banner: beaker.png
thumb: beaker-thumb.png
desc: This version adds the auto-updater, IPNS, and bugfixes.
---

<img src="/assets/img/auto-updater.gif" style="display: block; border: 1px solid #ccc; margin: 2em auto">


Beaker 0.2 is released today for MacOS.
This release adds the auto-updater, [IPNS](https://github.com/ipfs/examples/tree/master/examples/ipns) support, a new logo, and a set of bugfixes.

Please [file any issues you have at the GitHub repo](https://github.com/pfrazee/beaker).
You can [tweet @pfrazee](https://twitter.com/pfrazee) for additional support, or join #beakerbrowser on Freenode to chat.

[ 
<a href="https://download.beakerbrowser.net/download/0.2.0/osx_64/Beaker%20Browser-0.2.0.dmg" class="btn">Download for MacOS</a>
|
<a href="https://github.com/pfrazee/beaker">build from source</a>
]

In the next release, Beaker will include new features that make publishing on the P2P networks both convenient and fun.
I've been reaching out to the community, and received great feedback about what this should include.
I look forward to putting it in your&nbsp;hands.

> New to Beaker? [Read the introduction here.](/2016/08/10/beaker-browser-0.1.html)

<br>
<br>
## About the plugins

Beaker supports plugins, which add Web APIs and URL schemes.
Part of our mission is to give decentralization teams a place to experiment, in ways that existing browsers couldn't support, and this is how.

For a time, Beaker's dev-branch had an installer for plugins in the settings page.
This feature was cut just prior to release.
[Pulling from an issue](https://github.com/pfrazee/beaker/issues/59#issuecomment-241780741), here's the reason why:

> I was discovering a lot of difficult edge-cases in the in-browser plugin installer, which made me worry that, without proper infrastructure to support this complex of a feature, the product would be be buggy. Building Electron for multiple platforms is already pretty difficult; making a more complex packaging system, like this, would be much worse.

> The feedback I've received from other protocol designers is somewhat split. While I think some protocol devs would strongly appreciate having the in-browser plugin installer, there are others who are more likely to need a custom packaging or fork of beaker. Therefore, since protocol engineers are, ultimately, a minority of Beaker's intended users, and, among them, the need for an installer is divided, I've decided not to make this a priority.

> Docs have been updated to reflect the new solution: plugins are installed locally, and Beaker must be rebuilt from source to enable them.

I hope this isn't disappointing.
I want to provide a high standard of quality for all users - not just the decentralization teams - and I felt this added too much risk.

Teams will now experiment with their tech using custom builds, [as documented here](https://github.com/pfrazee/beaker/blob/master/doc/authoring-plugins.md).
I'm working with the MaidSafe team to make a "SAFE" variant of Beaker with this new approach, and we'll keep improving the tools as we understand the requirements more.

<br>
## The updates domain

PS, if you ever look behind the scenes, you'll notice that auto-updates are served from beakerbrowser.net, instead of .com.
Why?
Because my friend John thought it would be funny to snag the .com and put this up:

<img src="/assets/img/prank.png" style="display: block; margin: 3em auto">

We had a laugh<a href="#1" id="_1"><sup>1</sup></a>, but when he transferred the domain to me, the registrar flagged it for potential fraud and we got bogged down in bureaucracy.
I went with .net so I could keep development moving.
<br>
<br>

---

<br>
<small id="1"><a href="#_1"><sup>1</sup></a> The joke, explained: [Brand confusion](http://beakernotebook.com/), I prefer [yo-yo](https://www.npmjs.com/package/yo-yo) to React, and he's been trying to get me into Destiny for months now.</small><br>