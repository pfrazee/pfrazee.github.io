---
layout: post
title: Actually Serverless
desc: The Decentralized Web accomplishes the same business goals as Serverless while providing new benefits for users.
---

"Serverless" actually isn't.
Lambda, OpenWhisk, Azure, etc are cloud-service platforms.
What they mean is, **"the server is abstracted away."**

The name Serverless was stolen away from Decentralized Web.
It's not a lie, but it is confusing.
Let's talk about what "Actually Serverless" is.

<br>

---

<br>

## What is Serverless?

<br>

Serverless is a movement to simplify service deployment.
Developers push functions to a host, and the host automatically provisions the functions as needed.

The benefits:

 - **Less ops.** The host is managed by the cloud provider.
 - **Builtin scaling.** The platform provisions functions as needed.
 - **Cost-efficiency.** Idle time is not billed.

<br>

---

<br>

## What is the Decentralized Web?

<br>

The Decentralized Web is a movement to replace servers by distributing authority across P2P networks.
Applications run on user devices, and leverage the device and the network to do computation.

There are two categories of Decentralized platforms:

**Blockchain variants** use Proof-of-Work consensus.
Nodes take turns writing transaction-blocks, and all nodes validate the blocks.
In math (and protocol) they trust.

**BitTorrent variants** use Content-Addressed hosting.
Public-key addresses replace IP addresses.
This removes the host/content binding, removes domain-allocation costs, and automates horizontal scaling.

The benefits:

 - **Offline-first applications**. Applications run on the device.
 - **Independent publishing**. An application publishes content to the P2P network, instead of to a specific host.
 - **Security**. User data is stored on-device, and transferred with direct encrypted connections.

<br>

---

<br>

## Don't they solve different problems?

<br>

Yes, but &mdash;<br>
**Decentralization shares the business advantages that Serverless claims.**

In the Decentralized Web, you have offline-first apps, independent publishing, and better security.
But, you also have:

 - **Less ops.** Applications run on the user device.
 - **Builtin scaling.** The Bittorrent networks have horizontal scaling built in.
 - **Cost-efficiency.** Developers only pay to seed the file-assets to the network.

Decentralization is therefore cheaper and more efficient for developers, while also providing a better experience to users.

<br>

---

>**TL;DR**: The Decentralized Web accomplishes the same business goals as "Serverless" while also producing benefits to users.
If you're considering Serverless, you should invest in Decentralization.

---

<br>

To learn more, take a look at [my slides from Serverless NYC](https://speakerdeck.com/pfrazee/serverless-meets-serverfree), and check out some of the Decentralized-Web browsers in development:

 - [Mist](https://github.com/ethereum/mist), an Etherum browser
 - [Blockstack](https://blockstack.org/), a Bitcoin browser
 - [Beaker](https://beakerbrowser.com), a Dat & IPFS browser

**Full disclosure, [Beaker](https://beakerbrowser.com) is my team's project, and it's really damn cool.**