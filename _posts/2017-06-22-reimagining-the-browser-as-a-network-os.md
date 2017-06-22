---
layout: post
title: Reimagining the browser as a network OS
desc: How can we move past the Web as a thin client?
---

<style>
pre {
  max-height: 280px;
  overflow: scroll;
}
</style>

With the [Beaker Browser](https://beakerbrowser.com), we've been exploring how a [peer-to-peer protocol](https://datproject.org) can impact the Web's design.

<p style="font-size: 130%; padding: 1rem; border: 1px solid #ddd;">
Our theory is that we can move more control into user devices by replacing private backend services with p2p protocols.
</p>

<br>

## What is the p2p Web?

Imagine if...

 1. you could create sites at the click of a button,
 2. from any device, and
 2. the network could rehost your sites.

That's the p2p Web. It uses a [BitTorrent-like protocol](https://datproject.org) so any device can spawn websites and share them at scale.

<br>

## What are the use-cases?

Obviously there's applications for the [Indie Web](https://indieweb.org/) -- folks who like to have their own <strike>hacked up</strike> cool hacker versions of each Web presence, which they totally control.

Imagine if, instead of creating a Twitter profile, you just allocate a new p2p site? Then you write your status updates as .json files under `/tweets`. Anybody could follow that profile and get your updates.

<br>

## But what's the big picture?

The question we struggle with is, "What's the day-to-day experience like for a p2p Web?" That question breaks down into many sub-questions:

 - How is the user going to manage all their p2p sites and files?
 - How does an application get access to the right p2p sites and files to do work?
 - How does the user control permissions?
 - Do the p2p sites need to be integrated into the OS somehow, accessible as folders?

The model of the browser **has historically ignored data-management across multiple applications**. The assumption has been that all user data is managed by remote services. We need an entirely new model for the browser.

<br>

## The "term://" experiment

At one point we thought, wouldn't a terminal make this easier?

<img class="centered bordered" src="/assets/img/webterm.gif">

This is an unreleased terminal program in [Beaker](https://beakerbrowser.com). It's bashlike in its syntax, but it's entirely implemented in Javascript. Each command invocation translates predictably to a JS function:

```
ls -a /blog
```

becomes

```
ls({a: true}, '/blog')
```

This gets executed against an env.js file, which looks (at time of writing) like this:

```js
import path from 'path'

// current working directory methods
// =

export async function ls (opts = {}, location = '') {
  // pick target location
  const cwd = env.term.getCWD()
  location = location.toString()
  if (!location.startsWith('/')) {
    location = path.join(cwd.pathname, location)
  }
  // TODO add support for other domains than CWD

  // read
  var listing = await cwd.archive.readdir(location, {stat: true})

  // render
  listing.toHTML = () => listing
    .filter(entry => {
      if (opts.all || opts.a) return true
      return entry.name.startsWith('.') === false
    })
    .sort((a, b) => {
      // dirs on top
      if (a.stat.isDirectory() && !b.stat.isDirectory()) return -1
      if (!a.stat.isDirectory() && b.stat.isDirectory()) return 1
      return a.name.localeCompare(b.name)
    })
    .map(entry => {
      // coloring
      var color = 'default'
      if (entry.name.startsWith('.')) {
        color = 'muted'
      }

      // render
      if (entry.stat.isDirectory()) {
        return env.html`<div class="text-${color}"><strong>${entry.name}</strong></div>`
      }
      return env.html`<div class="text-${color}">${entry.name}</div>`
    })

  return listing
}

export function cd (opts = {}, location) {
  env.term.setCWD((location || '').toString())
}

export function pwd () {
  const cwd = env.term.getCWD()
  return `//${cwd.host}${cwd.pathname}`
}

// utilities
// =

export function echo (opts, ...args) {
  return args.join(' ')
}
```

(It's still very minimal.)

Like with bash, this terminal explores through directories. It has a current working directory (CWD), and it can `cd` and `ls` around its filesystem.

Rather than executing against a posix environment, this terminal uses the browser's APIs to get work done. Most relevant is the [DatArchive API](https://beakerbrowser.com/docs/apis/dat.html).

<br>

## A WAN Filesystem

The p2p protocol we use is called [Dat](https://datproject.org) and it's made by some [awesome non-profit FOSS hackers](https://twitter.com/pfrazee/lists/dat-project).

Dat is a BitTorrent variant that currently supports mutable file archives and append-only feeds. We use it to transport sites; an archive with an `/index.html` is (viola!) a website. Currently, [@mafintosh](https://twitter.com/mafintosh) is adding shared-writer support and a shared-writer KV database, and we're collaborating on end-to-end encryption.

Dat is, effectively, a Wide-Area Network Filesystem. It uses p2p swarming to distribute file updates, content-hashing to ensure integrity, and keypair signatures to assure authorship.

In the gif above, it's the Dat FS that I'm navigating.

<br>

## The User Root FS

So imagine every user has a Dat archive, called the "User Root Archive." When they `cd ~`, they are brought to that archive.

The User Root is marked private. It is *never swarmed* in the p2p network, and the URL is hidden.

The User Root is the core of the user's account. It is their filesystem. A simple layout may look like this:

```bash
documents/
public/
  index.html
term/
  env.js
  theme.css
```

When the terminal loads, it would load from a known path `/term/env.js` to construct itself. The env js would then load the `/term/theme.css` to let the user customize a bit. And, of course, the env.js could load all kinds of additional command scripts:

```js
// export the twitter commands
import twitter from '/term/twitter.js'
export twitter
```

```bash
# in the cli
> twitter.post "Hello world from the Beaker terminal"
```

<br>

## File & archive symlinks

A key feature of this environment would be the symlink, which would work with files, folders, *and* archives. This makes it possible to turn entirely separate archives into subfolders on your root FS:

```bash
# lets keep the beaker site handy
> link ~/sites/beaker dat://beakerbrowser.com
> cd ~/sites/beaker
...
```

This has huge utility for configuration. Internally, Beaker could recognize that the `~/public` folder acts as the users "Public Profile Archive." By using a separate archive than the User Root, we can ensure that the Public Profile is network readable, while the User Root is not.

So if I wanted the beaker site to be my public profile, I could do:

```bash
> link ~/public dat://beakerbrowser.com
```

And now when Web apps ask the browser, "what's this user's profile?" The browser will give them the beakerbrowser.com archive.

<br>

## Shared secret folders

Keybase has a really cool UX for sharing files secretly. (Going from memory) it uses a namespace of usernames, with private folders. Something like:

```
/friends/bob/private
```

Any files you share in that folder will be automatically encrypted at-rest, then shared so that only bob can read it.

The exact same UX will be possible here, under a special `~/private` folder. (We just need a key distribution and identities scheme first, no biggy.)

<br>

## A Network OS

Earlier I said We need an entirely new model for the browser.

By building on the Dat protocol to create a filesystem, we create a conceptual "Network OS" that lives on top of the device's OS.

We call it a Network OS because we're operating on a networked virtual filesystem. The actual device is abstracted away, as it always has been with the Web. In our NOS, a folder in the user's device becomes a sandboxed virtual root. We run programs that operate on that FS, and which create and operate on separate virtual roots (other Dat archives).

By configuring the User Root FS, we can configure and control the user's experience. The bashlike Web Terminal will make it easy to write new (small) JS commands, and therefore provide a strong poweruser toolkit. Over time, we can add a graphical "Finder," and continue to make the browser more powerful and OS-like.

We'll keep playing with these ideas. If and when we publish the terminal, I'll be sure to let you know.