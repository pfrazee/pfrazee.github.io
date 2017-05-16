---
layout: post
title: The Decentralized Archive Transport
desc: 
---

This month we brought [datprotocol.com](https://datprotocol.com) online. 

## What is Dat?

[Max Ogden](https://github.com/maxogden) started the Dat Project as "git for data." It looked like this:

```bash
dat init
cat some_csv.csv | dat --csv
dat push http://mydat.myserver.com:6461
```

The premise was roughly centered around adding version-control to spreadsheets. The project had a grant from the Sloan Foundation to help Scientists collaborate around data.

Max got two kinds of feedback:

 1. "We dislike schemas and tables; just let us use files."
 2. "Everything is too complex, including the servers."

So, Max recruited [Mathias Buus](http://github.com/mafintosh) and started over.

![baby out with the bath water](TODO)
"better throw out the baby too"

Mathias (aka Mafintosh) is the guy that wrote [torrent-stream](https://npm.im/torrent-stream), the prioritization algorithm used by Popcorn Time to stream movies. Of course, Mafintosh had nothing to do with Popcorn Time. He published torrent-stream on NPM and that was that. But he's the guy that figured out the how.

Around the time he was recruited, Mafintosh had been keeping in touch with [Dominic Tarr](https://github.com/dominictarr) and myself about the [Secure Scuttlebutt](https://ssbc.github.io/scuttlebot/) protocol. We were busy trying to convince everybody that it was the next big thing. Mafintosh wasn't convinced by the execution, but he did like the ideas enough to start stealing. (In a good way.)

![cliche picture of a thief](TODO)
"pictured: innovation"

SSB was designed to synchronize append-only logs. SSB was good at streaming events, but couldn't do partial replication of the history, and wasn't very good with files. (At least, at the time.)

The idea for SSB was that it used "signed non-global blockchains." Each log was its own history, owned by only one user, signed by only one keypair. No proof-of-work. The neat part was, the blockchains *forced* the append-only guarantee. Users couldn't try to modify their history without having to recompute their blockchain's hashes, which would alert all peers to malfeasance.

![hermies](TODO)
"hermies, the secure scuttlebutt hermit crab"

Not to oversimplify things (because I definitely am) but Mafintosh had two ideas on how to improve on SSB:

 1. Use a flattened merkle tree to verify the history instead of a blockchain.
 2. 

