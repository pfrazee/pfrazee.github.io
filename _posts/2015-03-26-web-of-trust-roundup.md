---
layout: post
title: The Web of Trust
banner: web.jpg
desc: A collection of papers about creating trust without centralized authorities.
---


<br>

### [Certificate Recommendations to Improve the Robustness of Web of Trust](http://discovery.csc.ncsu.edu/pubs/ISC04b.pdf)

Defines the robustness of a WoT network by the number of unique but redundant paths-of-certification between identities.
Describes an algorithm to find identities with low connectivity and provide certification recommendations to improve their connectivity.

<br>

### [KeyChains: A Decentralized Public-Key Infrastructure](http://drum.lib.umd.edu/bitstream/1903/3332/1/0.pdf)

Observes that the WoT is not a PKI because it's not concerned with distribution.
PGP instead relies on a semi-centralized PKI, the names-servers.
Proposes a decentralized, distributed certificate search protocol.

  - Works by overlaying the graph of certificates onto the network of devices and following directed edges.
  - To improve discovery, nodes replicate their pubkeys outward along their cert-graph for a certain number of hops out.
  - Searches likewise move outward along the cert-graph, from the initiator.
  - On discovery, the search and replication paths are glued together and treated as a certificate-chain.

<br>

### [Casting a Web of Trust over Wikipedia: an Interaction-based Approach](http://perso.telecom-paristech.fr/~cautis/papers/SM-WWW11.pdf)

Infers a trust-graph using only user interactions.
The authors didn't have an actual trust-graph to compare against, so they could only analyze the likelihood of accuracy basd on structural features.
However, they claim confidence in their results.

<br>

### [Rule-Based Trust Assessment on the Semantic Web](http://dig.csail.mit.edu/2011/Papers/ruleml/paper.pdf)

Describes models to evaluate the trustworthiness of data with "the actual content of the data, the data sources, recency of updates, the schemas being used, and the creator."
Focuses on the rules used to evaluate trust, and the need to assign trust *in the rules of trust*.

<br>

### [A survey of trust in computer science and the Semantic Web](http://www.inf.ufsc.br/~gauthier/EGC6006/material/Aula%206/A%20survey%20of%20trust%20in%20computer%20science%20and%20the%20Semantic%20Web.pdf)

Summarizes information-trust research in 4 categories: Policy-based, Reputation-based, General models, and Provenance-based.