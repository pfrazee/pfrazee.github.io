---
layout: post
title: Computing Trust
desc: Excerpts from literature on the use of trust in distributed systems.
---


Excerpts from literature on the use of trust in distributed systems.

<br>
## Can We Trust Trust?

[http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.24.5695&rep=rep1&type=pdf](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.24.5695&rep=rep1&type=pdf)

*philosophy*

> Trust (or, symmetrically, distrust) is a particular level of the subjective
probability with which an agent will perform a particular action, both before [we]
can monitor such action (or independently of his capacity of ever be able to monitor it)
and in a context in which it affects [our] own action.

> When we say we trust someone or that someone is
trustworthy, we implicitly mean that the probability that he will perform an action that is
beneficial or at least not detrimental to us is high enough for us to consider engaging in some
form of cooperation with him. Correspondingly, when we say that someone is
untrustworthy, we imply that that probability is low enough for us to refrain from doing so.


<br>
## Temporal Factors to evaluate trustworthiness of virtual identities

[http://www.tara.tcd.ie/bitstream/handle/2262/39200/Temporal%20Factors.pdf](http://www.tara.tcd.ie/bitstream/handle/2262/39200/Temporal%20Factors.pdf)

*analysis, model design*

> Computational Trust was introduced more
than a decade ago.
The expected benefits are a
reduction of complexity (by considering only trustworthy
possibilities), the possibility of exploiting others’ ability with
delegation, the possibility of having more cooperation in open
and unprotected environment.

> A trust-based decision in a
specific domain is a multi-stage process. The first step is the
identification and selection of the appropriate input data, the
trust evidences. These are in general domain-specific and the
result of an analysis conducted over the application involved.
Then a trust computation is performed over evidences to
produce trust values, the estimation of the trustworthiness of
entities in that particular domain. The selection of evidences
and the subsequent trust computation are informed by a
notion of trust, the trust model. Finally, the actual trust
decision is taken considering computed values and exogenous
factors, like disposition or risk assessments.

> We hypothesise that temporal factors like
degree of activity, presence, regularity and frequency of
interactions can be meaningful used in a trust computation.
Since in these environments it is
easy to create, change and delete identities, the fact that
a virtual identity shows temporal stability and continuous
activity appears an interesting property. From an intuitive point
of view, the fact that an entity has been around for a long
time, always present, active and interacting with regularity
enforces the perception that it may have some attributes like
stability, a certain skills, transparency, experience, the ability
to fulfil expectations; all characteristics that may be linked to
the fuzzy notion of trust.


<br>
## B-trust: Bayesian Trust Framework for Pervasive Computing

[http://www0.cs.ucl.ac.uk/staff/d.quercia/publications/querciaB-trust06.pdf](http://www0.cs.ucl.ac.uk/staff/d.quercia/publications/querciaB-trust06.pdf)

*analysis, model design*

> Significant commercial benefits are predicted from the deployment of new services that
pervasive computing will enable. These benefits are, however, theoretical in the absence
of appropriate security. Fundamental to the creation of security are mechanisms for
assigning trust to different pervasive devices. Also, it is in the nature of such devices
that security mechanisms must be automatic - they must operate without the need for
users to intervene. To make commercial benefits true, distributed trust frameworks may
be employed as they provide security by automatically managing trust among pervasive
devices.


<br>
## Ratings in Distributed Systems: A Bayesian Approach

[http://publications.csail.mit.edu/lcs/pubs/pdf/MIT-LCS-TM-617.pdf](http://publications.csail.mit.edu/lcs/pubs/pdf/MIT-LCS-TM-617.pdf)

*analysis, model design*

> Reputation [is the] perception that an agent creates through past actions about its intentions and norms.

> We argue that the failure of existing rating systems is partially due to the lack of personalization and
contextualization in these systems. For example, consider an expert in French cuisine browsing the
Amazon.com catalogue, she comes across a French cookbook with a 3 stars rating (as provided by other
raters). The average Amazon user is not likely to be a French cuisine expert. For our expert, the three
star rating is therefore of limited value.

> Unless the rating system can summarize the ratings of those who
are similar to the individual seeking a rating, the rating system is destined to provide noisy ratings. This
example points to the importance of personalizing ratings for those seeking source sanctioning.


<br>
## Trust-Based Security in Pervasive Computing Environments

[http://ebiquity.umbc.edu/_file_directory_/papers/73.pdf](http://ebiquity.umbc.edu/_file_directory_/papers/73.pdf)

*access control, system design*

> We view trust management as establishing
trust relationships instead of its
traditional meaning of quantifying trust.
Our approach involves
 
> - articulating policies for user authentication,
access control, and delegation;
 
> - assigning security credentials to
individuals;
 
> - allowing entities to modify access
rights of other entities by delegating
or deferring their access rights to
third parties and revoking rights as
well; and
 
> - providing access control by checking
if the initiators’ credentials fulfill
the policies. 

> Centaurus uses a distributed model in
which hierarchically arranged security
agents manage security and trust, and
certificates identify
users and services.

> Authorized users can
make delegations and revocations in the
form of signed assertions. Security agents
reason about these signed assertions and
the appropriate security policies to provide
access control to services in their
domain.

> Centaurus views delegation as a right
itself. 



<br>
## Distributed Trust

[http://www.cs.columbia.edu/~angelos/Papers/2004/tmreview.pdf](http://www.cs.columbia.edu/~angelos/Papers/2004/tmreview.pdf)

*access controls, system design*

> ACLs have been used in distributed systems, because they are conceptually easy to grasp and
because there is an extensive literature about them. However, there are a number of fundamental
reasons that ACLs are inadequate for distributed-system security, e.g.,

> - Authentication: In an operating system, the identity of a principal is well known. This is not
so in a distributed system, where some form of authentication has to be performed before the
decision to grant access can be made.

> - Delegation is necessary for scalability of a distributed system. It enables decentralization of
administrative tasks.

> - Expressibility and Extensibility: A generic security mechanism must be able to handle new
and diverse conditions and restrictions. The traditional ACL approach has not provided suffi-
cient expressibility or extensibility. Thus, many security policy elements that are not directly
expressible in ACL form must be hard-coded into applications. This means that changes in
security policy often require reconfiguration, rebuilding, or even rewriting of applications.

> - Local trust policy: The number of administrative entities in a distributed system can be quite
large. Each of these entities may have a different trust model for different users and other
entities. It follows that the security
mechanism should not enforce uniform and implicit policies and trust relations.


This paper argues that policies should be published in signed certs as executable code. Their criticism
of SPKI explains their reasoning:

> The Simple Public Key Infrastructure (SPKI) project of Ellison et al. [Ellison, 1999] has proposed
a standard format for authorization certificates. SPKI shares with our trust-management
approach the belief that certificates can be used directly for authorization rather than simply for authentication.
However, SPKI certificates are not fully programmable; they are data structures with
the following five fields: “Issuer” (the source of authority), “Subject” (the entity being authorized
to do something), “Delegation” (a boolean value specifying whether or not the subject is permitted
to pass the authorization on to other entities), “Authorization” (a specification of the power that the
issuer is conferring on the subject), and “Validity dates.”

> The SPKI documentation [Ellison, 1999] states that the processing of certificates and related
objects to yield an authorization result is the province of the developer of the application or system.
The processing plan presented in that document is an example that may be followed, but its primary
purpose is to clarify the semantics of an SPKI certificate and the way it and various other kinds of
certificate might be used to yield an authorization result.

> Thus, strictly speaking, SPKI is not a trust-management engine according to our use of the term,
because compliance checking (referred to above as “processing of certificates and related objects”)
may be done in an application-dependentmanner. If the processing plan presented in [Ellison, 1999]
were universally adopted, then SPKI would be a trust-management engine. The resulting notion
of “proof of compliance” would be considerably more restricted than PolicyMaker’s; essentially,
proofs would take the form of chains of certificates. On the other hand, SPKI has a standard way
of handling certain types of non-monotonic policies, because validity periods and simple CRLs are
part of the proposal.



<br>
## Craig Newmark Talks About Trust Online

(Creator of Craigslist)

<iframe width="854" height="510" src="https://www.youtube.com/embed/w49Jmsry0Ho" frameborder="0" allowfullscreen></iframe>
