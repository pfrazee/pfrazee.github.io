---
layout: post
title: Cryptographically Auditable Logs
desc: 
---

- some kind of anecdotal example

## CT

- [Certificate Transparency](https://www.certificate-transparency.org/) is an experimental system for monitoring and auditing TLS Certificate Authorities.
- Their datasets are replicated in Certificate Logs.
- Certificate logs are:
  - **Append-only** -- certificates can only be added to a log; certificates can’t be deleted, modified, or retroactively inserted into a log. 
  - **Cryptographically assured** -- logs use a special cryptographic mechanism known as Merkle Tree Hashes to prevent tampering and misbehavior.
  - **Publicly auditable** -- anyone can query a log and verify that it’s well behaved, or verify that an SSL certificate has been legitimately appended to the log.
- Importantly, CT includes a way to snitch on CAs that lie, through [Log Proofs](https://www.certificate-transparency.org/log-proofs-work).
  - If a certificate doesn't have a log proof, it's not a valid certificate.
  - If a certificate does have a log proof, but is not present in the log, then we know the CA has lied about its certificate set.

![/assets/img/ct_hash_1.png](/assets/img/ct_hash_1.png)
![/assets/img/ct_hash_2.png](/assets/img/ct_hash_2.png)

## Dat

- Dat is a p2p file-distribution network
  - Each archive is identified by a public key
  - Individual files are identified by signed content hashes
  - This enables secure, mutable, p2p distribution
- CTs concepts have been re-applied by the Dat protocol to provide secure file distribution.
  - Internally, each archive has a metadata log which tracks the changes to the file listing
  - Like in CT, this log is implemented on a Merkle Tree
- This is one of the reasons I'm most interested in Dat over IPFS
  - This makes Dat a general solution for distributing files in a secure and auditable fashion
  - Targeted payloads should be detectable
  - Changes to the history can be proven
  - Additionally, checkpoints can be written to the logs to identify specific versions in the network

## Application

- Generalized solution for auditable datasets.
  - user key server, software distribution
- Architecture
  - Web-Service provides query responses with a proof of the current dataset state
  - Auditors sync the full dataset, or just the log, over dat
- Metadata feed is all that's necessary to verify history, and it's relatively lightweight

