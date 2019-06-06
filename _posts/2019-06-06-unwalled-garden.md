---
layout: post
thumb: "https://pfrazee.hashbase.io/assets/img/unwalled.jpg"
title: "The Unwalled.Garden protocol - souped-up RSS for p2p social apps"
twitter_card: summary
desc: "Beaker is an experimental peer-to-peer Web browser. In this post, I will describe a new files-oriented protocol we are developing called Unwalled.Garden which will drive the applications stack for Beaker sites."
---

<p style="padding: 1rem; border: 1px solid #ddd; margin-bottom: 30px; font-size: 1rem">
Unwalled.Garden will be part of the upcoming <a href="https://beakerbrowser.com">Beaker Browser</a> 0.9 release (this summer).
</p>

## Background

Since starting on [Beaker](https://beakerbrowser.com) and [Dat](https://dat.foundation) -- an experimental p2p Web stack -- I've been looking for an applications model which is powerful enough to run a variety of Web applications without relying on hosts.

There are a lot of interesting technologies in the dweb space. [Holochain](https://holochain.org/) has been exploring DHTs as a shared database. [Zeronet](https://zeronet.io/) hosts services from user devices as a sort of edge-driven network. And then, of course, there are the blockchains. What to do?

I've been adamant that the solution should be simple and familiar. The fewer new concepts we have to introduce -- or wire protocols we have to finesse -- the better.

I also want the solution to feel inherently Webby. The beauty of the Web (when it's beautiful) is that it's easy to everyone to use. Technical complexity is a kind of barrier which empowers the priestly class but disempowers the users.

After evaluating all the options, I've decided to use a *files-oriented protocol*. Why? Because people understand files. Files are explorable. They are portable. They are browsable and Webby. And, importantly, they work on [Dat](https://dat.foundation) without requiring new wire protocols.

## Souped-up RSS

[RSS](https://en.wikipedia.org/wiki/RSS) is the canonical example of a files-oriented protocol on the Web. It uses an XML file on a Website to publish content. That file is hosted statically on the site... and that's it. That's practically the whole protocol. Readers fetch the file and render its content in an inbox-like interface.

The protocol is simple, but it was enough to build a decentralized proto-social-network on the Web.

<img src="/assets/img/google-reader.png" class="centered bordered" style="margin: 20px auto">

Consider the architectural model of RSS. Each user has a website. They publish their feeds via their `feed.xml`. Users subscribe to each others' sites in order to sync their posts. It's an incredibly simple model which works consistently well. It's also, basically, Twitter.

The tragedy of RSS is that it didn't go far enough. The XML files encoded very little information. Unlike Twitter and the other social networks, RSS never tried to capture the social graph, likes, comments, annotations, retweets, and etc of its userbase. It limited itself to posted content (mostly blog posts) and that was a missed opportunity.

<img src="/assets/img/feed-xml.png" class="centered bordered" style="margin: 20px auto">

RSS could have become a more powerful network by expanding its content schemas to cover all social media. It could have then encouraged all users to setup their own sites and join an open social network.

We tested these ideas on Dat with a proof-of-concept Twitter clone called Fritter, and I now feel confident the architecture can drive many kinds of p2p Web applications. We're now ready to announce a set of standards called Unwalled.Garden.

## Unwalled.Garden

[Unwalled.Garden](https://unwalled.garden) is a files-oriented protocol for building open social applications. It has been built on top of the [Dat network](https://dat.foundation), and is implemented in the upcoming [Beaker Browser 0.9](https://beakerbrowser.com).

The Unwalled.Garden has three principles:

 1. Every user is a website.
 2. Every record is a file.
 3. Users follow each other's sites to sync their files.

Everything about the network flows from these principles.

The schemas are simple, obvious, and syntax-free. A post record looks like this:

```json
{
  "body": "Hello, world!",
  "createdAt": "2018-12-07T02:52:11.947Z"
}
```

The schema IDs are stored in [metadata fields](https://unwalled.garden/docs/metadata) on files and folders. We identify the types using URLs such as:

 - [unwalled.garden/post](https://unwalled.garden/post)
 - [unwalled.garden/comment](https://unwalled.garden/comment)
 - [unwalled.garden/reaction](https://unwalled.garden/reaction)
 - [unwalled.garden/person](https://unwalled.garden/person)
 - etc

Additionally, the files are placed at predefined paths. An example site might look like this:

|URL|Type|
|-|-|
|`dat://bob.com`|[Person](https://unwalled.garden/person)|
|`dat://bob.com/.data/unwalled.garden`|[Data directory](https://unwalled.garden/dir/data)
|`dat://bob.com/.data/unwalled.garden/posts/hello.json`|[Post](https://unwalled.garden/post)
|`dat://bob.com/.data/unwalled.garden/reactions/1.json`|[Reaction](https://unwalled.garden/reaction)
|`dat://bob.com/.data/unwalled.garden/comments/1.json`|[Comment](https://unwalled.garden/comment)

This site identifies as a [Person](https://unwalled.garden/person) and it includes a [Post](https://unwalled.garden/post), [Reaction](https://unwalled.garden/reaction), and [Comment](https://unwalled.garden/comment). A reader will crawl the website looking for these files to sync into its local database.

Every client in the network acts like a Web crawler. The crawler scans through followed sites for any files which it wants to sync. It then indexes them for querying.

<img src="/assets/img/crawler.png" class="centered" style="margin: 40px auto">

Applications use a combination of the crawled indexes and the filesystem to interact with content.


## Browser integration

[Beaker Browser 0.9](https://beakerbrowser.com) (coming this summer) implements Unwalled.Garden as part of the browser. It supports a high-level API which is loaded from the [dat://unwalled.garden](dat://unwalled.garden) website. These APIs wrap the Dat filesystem and Beaker’s internal indexes.

```js
import {posts, reactions, comments} from 'dat://unwalled.garden/index.js'
var feed = await posts.list({reverse: true, limit: 10})
var post = await posts.add('Hello, world!')
await comments.add(post.url, 'Great post by me!')
await reactions.add(post.url, '👍')
```

As a result, the browser understands data. It is able to display followed users in the URL bar's autocomplete and manage access to the user's data across apps.

<img src="/assets/img/smart-urlbar.png" class="centered bordered" style="margin: 20px auto">

These systems factor into a builtin social network. The browser automatically creates a personal website for the user on first load. The personal site acts as the user profile and is where the user's content is published. The URL of the site acts as their global ID.

```js
import {profiles} from 'dat://unwalled.garden/index.js'
await profiles.me()
```

Users follow each other by following the personal sites. The follows get published so that the social graph can be queried, which is an important signal for discovery and for determining the identities of users.

```js
import {follows} from 'dat://unwalled.garden/index.js'
await follows.add('dat://beakerbrowser.com')
```

Web applications will request access to these APIs through an install flow, ensuring that user data is kept safe. (We also use a second "private" dat for records which should be kept off the network.)

<img src="/assets/img/beaker-social.png" class="centered bordered" style="margin: 20px auto">

We're shipping a default "vanilla" application called Beaker.Social which demonstrates how to build on this toolset. As with everything in this project, it's still very early and basic, but we hope it'll give us a good starting experience which other people can copy, change, and make their own.

## What's next

Unwalled.Garden is still new and is just beginning to develop its schemas. We'll be discussing the schemas and proposing updates via the [Github issues](https://github.com/beakerbrowser/unwalled.garden). Feel free to join us!

We chose the name "Beaker" because this browser is an experiment. Unwalled.Garden is part of that experiment. I hope you will find it interesting.

<p style="padding: 1rem; border: 1px solid #ddd; margin: 30px 0 30px; font-size: 1rem">
Visit the <a href="https://unwalled.garden">Unwalled.Garden website</a> to learn more.
</p>