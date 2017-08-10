---
layout: post
title: "NodeVMS alpha: trustless execution of services on nodejs"
desc: A prototype hosting platform for provisioning servers on untrusted hardware
---

<style>
h2 {
  font-size: 1.7rem !important;
  margin-bottom: 1rem !important;
}
</style>

With the [Beaker browser](https://beakerbrowser.com), we're creating a decentralized and p2p networking stack for browser applications. Our goal is to execute applications without centralized services, so that users can own their data and their software.

Currently our stack consists of:

 - The [DatArchive API](https://beakerbrowser.com/docs/apis/dat.html) for publishing files globally and securely
 - The [InJest DB](https://github.com/beakerbrowser/injestdb) for publishing and querying tables globally and securely

These APIs are peer-to-peer. They provide a weak form of data consensus called [eventual consistency](https://en.wikipedia.org/wiki/Eventual_consistency). This means, among other things, they can not provide [ACID transactions](https://en.wikipedia.org/wiki/ACID). For transactions, we need [sequential consistency](https://en.wikipedia.org/wiki/Consistency_model#Sequential_Consistency).

Ideally, we’d have a way for users to provision services at will. For this use case, people often suggest blockchain solutions like Ethereum.

---

<br>

---

## Ethereum

**What is Ethereum?**

[Ethereum](https://www.ethereum.org/) is a trustless network of VMs which run smart contracts submitted by users. It uses proof-of-work to synchronize state across the network, and has every node execute the contracts in order to verify the state's validity. Each transaction is stored in the blockchain for replayability.

> [Read more about Ethereum contracts here.](http://www.ethdocs.org/en/latest/contracts-and-transactions/account-types-gas-and-transactions.html)

**What does it mean to be trustless?**

"Trustless" at its core means "tightly audited." Auditing enables end users to trust that the asserted code is the actual code being run.

All Ethereum contracts and transactions are published on the blockchain, and then replayed by every node in the network. With every transaction  appended to the ledger, the nodes check each other's work. This makes it *very hard* for someone to lie about the results of a contract computation.


**The oracle problem**

The "trustless" claim only works over a closed system: anything not modeled on the Ethereum network itself cannot be verified. This is referred to as the "oracle" problem.

Let's say your contract depends on the current stock-value of GOOGL as listed by the NASDAQ. The NASDAQ is not modeled on Ethereum's blockchain. Therefore, the contract will have to consult a third party to get the stock value. That third party is the "oracle," and it's effectively a black box to the network.

**Does Ethereum perform well?**

Not currently.

 - Transaction completion is on the order of minutes.
 - Transactions max at [somewhere between 25-50tx/s](https://ethereum.stackexchange.com/questions/1034/how-many-transactions-can-the-network-handle) globally.
 - Every transaction costs money to execute.
 - The entire blockchain state must be synced across the network.
 - Proof of Work has a high energy cost.

In response to this, Ethereum has been focusing on Proof-of-Stake and sidechains, and very recently they announced [Plasma](http://plasma.io/), which shards the Ethereum network to improve scalability. These changes may solve the performance issues for Ethereum. However, Ethereum and the Plasma proposal are still complex enough that I want to explore a more simple alternative.

---

<br>

---

## Virtual Machine Swarm

I propose a Virtual Machine Swarm, a [secure ledger](https://beakerbrowser.com/2017/06/19/cryptographically-secure-change-feeds.html) protocol for executing services on nodejs. Though it’s similar to Ethereum in some of its goals and characteristics, in contrast it has:

 - no token,
 - no global state, and
 - no consensus algorithm or proof-of-work.

It is therefore *not* a financial system. It's a tool for running auditable services. 

**Usecase 1: Auditing high-value datasets**

There are a class of services which require a high amount of trust in the execution of the service. One example is key distribution and identity. Another example is code distribution. Users need to trust that the code is executed correctly, and the correct data is then distributed.

For these cases, an auditable service gives confidence that the service isn’t lying. Outputs can be traced to their sources, and unexpected changes to state can be flagged publicly.

**Usecase 2: Execution on untrusted hardware**

Most daily computing on the Web is simple to execute. It requires basic trust that the host will stay available online and run the code correctly.

If we can guarantee availability and correctness through auditing, it becomes much easier to share computing power with strangers. We could share server CPUs the same way we share the WiFi at a coffee shop. 

**How does it work?**

VMS provisions service contracts. These contracts export an RPC interface which can be accessed by the network. Additionally, each contract has a networked filesystem which it can read and write to.

Like Ethereum, VMS uses a secure ledger for auditability. Each VM host publishes a "call log" which includes:

 - the script executed by the VM,
 - the public key of the files archive, and
 - all requests and responses to the VM host.

Further, each request in the log includes:

 - a signature by the caller, 
 - the changes to the file's archive version,
 - and the pubkey of the call ledger.

For auditing, a client downloads the call ledger, then provisions the VM locally and replays the log. As it plays each call, it checks the return values and filesystem state. If there is a mismatch from the hosted VM, the auditor knows that either

 1. the VM host modified the state outside the log, or 
 2. the VM script is nondeterministic.

These audits are the responsibility of the clients, and can be periodically run as a background task for the VMs you provision.

**What about availability?**

Without a global swarm, VMS can’t guarantee availability at the protocol level. Unless we come up with a solution to this, users will be expected to pick their VM host from their friends, offices, and commercial services.

**What about oracles?**

For interacting with the outside world, the VM host is allowed to introduce "oracles" in the form of added APIs. Oracle APIs are expected to be effectful. Therefore, their inputs and outputs are logged, and auditors replace their execution with the logged outputs to avoid triggering the effects.

Because oracles are executed only by the VM host, the users must trust the host hardware to execute them correctly. This creates two kinds of VM execution: trustless (no oracles) and trusted or semi-trusted (with oracles). By default, trustless is preferred.

**What's the intended experience?**

VMS hosts would be integrated with a browser (such as [Beaker](https://beakerbrowser.com)) so that users can quickly self-deploy backend scripts, either on their personal device or on a public host. This will enable apps which ship with backend scripts, and can provision backend services in order to maintain shared datasets.

For instance, this "RSVP" backend script might be used on an event site to track guests:

```js
// RSVP.js
exports.init = async () => {
  await System.files.mkdir('/rsvps')
}
exports.RSVP = async (isAttending, reason) => {
  await System.files.writeFile('/rsvps/${System.caller.id}.json', JSON.stringify({
    who: System.caller.id,
    isAttending,
    reason
  }))
}
```

This script would be deployed on a VMS host and given a url such as `wss://nodevms.com/bob/my-party-rsvps`. An app would then connect to the backend to transact:

```js
// bobs-party-page.js
const VMS_URL = 'wss://nodevms.com/bob/my-event-rsvps'
async function onClickYes () {
  const backend = new VMSClient(VMS_URL)
  await backend.RSVP(true)
}
async function onClickNo () {
  const backend = new VMSClient(VMS_URL)
  await backend.RSVP(false, prompt('Why tho?'))
}
```

The current state of the RSVPs could then be read directly by accessing the backend's files archive.

```js
// bobs-party-page.js
async function getRSVPs () {
  const backend = new VMSClient(VMS_URL)
  const fs = backend.files
  const rsvpFilenames = await fs.readdir('/rsvps')
  let rsvps = []
  for (let i = 0; i < rsvpFilenames.length; i++) {
    let filename = rsvpFilenames[i]
    rsvps.push(JSON.parse(await fs.readFile(`/rsvps/${filename}`)))
  }
  return rsvps
}
```

---

<br>

---

## NodeVMS

[NodeVMS](https://github.com/pfrazee/nodevms) is a prototype implementation of the VMS design. It uses:

 - NodeJS to execute Javascript VMs,
 - Websockets with JSON RPC 2.0 for RPC,
 - Dat's secure ledger module (called [hypercore](https://github.com/mafintosh/hypercore)) to maintain the call log, and
 - Dat's files module (called [hyperdrive](https://github.com/mafintosh/hyperdrive)) to maintain the filesystem.

NodeVMS is an experiment to explore the utility of auditable services. If we're satisfied with its abilities, we'll consider including it in the stack for the [Beaker Browser](https://beakerbrowser.com/).

```
npm i -g nodevms
```

It is very early, and still needs a lot of work. Here it is in action with Beaker (thanks [@JimPick](https://twitter.com/jimpick)):

<div style="text-align: center">
  <video src="/assets/vid/nodevms.mp4" width="480" height="315" controls style="margin: 1rem 0"></video>
</div>

You can learn more at the [NodeVMS project readme](https://github.com/pfrazee/nodevms). It's alpha software with some missing features, but it demonstrates all of the core ideas, and I'll be working with [@mafintosh](https://twitter.com/mafintosh) to complete the crypto system.
