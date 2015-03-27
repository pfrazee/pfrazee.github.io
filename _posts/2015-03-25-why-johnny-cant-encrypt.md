---
layout: post
title: Why Johnny Can't Encrypt
desc: A Usability Evaluation of PGP 5.0
---

A Usability Evaluation of PGP 5.0

[https://www.cs.berkeley.edu/~tygar/papers/Why_Johnny_Cant_Encrypt/OReilly.pdf](https://www.cs.berkeley.edu/~tygar/papers/Why_Johnny_Cant_Encrypt/OReilly.pdf)


> **USER ERRORS CAUSE OR CONTRIBUTE TO MOST COMPUTER SECURITY FAILURES, yet user interfaces
for security still tend to be clumsy, confusing, or near nonexistent.** Is this simply because
of a failure to apply standard user interface design techniques to security? We argue that,
on the contrary, effective security requires a different usability standard, and that it will
not be achieved through the user interface design techniques appropriate to other types
of consumer software.

> To test this hypothesis, we performed a case study of a security program that does have a
good user interface by general standards: PGP 5.0. ... The analysis found a number of user interface design flaws that may contribute
to security failures, and the user test demonstrated that **when our test participants were
given 90 minutes in which to sign and encrypt a message using PGP 5.0, the majority of
them were unable to do so successfully.**


While reading, keep in mind that this study employed novices who did not have security as their primary goal.
Their users' primary goal was to send email.
Security was something they had to deal with *as well*.

<p style="text-align: center"><img src="/img/pgp1.png"></p>


<h2 style="margin-bottom: 1em">Results of the User Study</h2>


> Three of the twelve test participants (P4, P9, and P11) accidentally emailed the secret to
the team members without encryption. Two of the three (P9 and P11) realized
immediately that they had done so, but P4 appeared to believe that the security was
supposed to be transparent to him and that the encryption had taken place. In all three
cases, the error occurred while the participants were trying to figure out the system by
exploring.

<p style="text-align: center"><img src="/img/pgp4.png"></p>

> One of the twelve participants (P4) was unable to figure out how to encrypt at all. He
kept attempting to find a way to “turn on” encryption, and at one point believed that he
had done so by modifying the settings in the Preferences dialog in PGPkeys. ...
Another (P3) spent 25 minutes sending repeated test messages to the
team members to see if she had succeeded in encrypting them (without success), and
finally succeeded only after being prompted to use the PGP Plug-In buttons.

<p style="text-align: center"><img src="/img/pgp2.png"></p>

> Among the 11 participants who figured out how to encrypt, failure to understand the
public key model was widespread. Seven participants (P1, P2, P7, P8, P9, P10, and P11)
used only their own public keys to encrypt email to the team members. Of those seven,
only P8 and P10 eventually succeeded in sending correctly encrypted email to the team
members before the end of the 90-minute test session.

<p style="text-align: center"><img src="/img/pgp3.png"></p>

> Another of the 11 (P5) so completely misunderstood the model that he generated key
pairs for each team member rather than for himself, and then attempted to send the
secret in an email encrypted with the five public keys he had generated. Even after
receiving feedback that the team members were unable to decrypt his email, he did not
manage to recover from this error.

<p style="text-align: center"><img style="max-width: 100%" src="/img/facepalm.jpg"></p>

<h2 style="margin-bottom: 1em">Final analysis</h2>

> All this failure is despite the fact that PGP 5.0 is attractive, with basic operations neatly
represented by buttons with labels and icons, and pull-down menus for the rest

> ...and
despite the fact that it is simple to use for those who already understand the basic models
of public key cryptography and digital signature-based trust.

> Standard usability evaluation methods, simplistically applied, may treat security functions
as if they were primary rather than secondary goals for the user, leading to faulty
conclusions.

For more in-depth reading, [get the full paper here](https://www.cs.berkeley.edu/~tygar/papers/Why_Johnny_Cant_Encrypt/OReilly.pdf).

