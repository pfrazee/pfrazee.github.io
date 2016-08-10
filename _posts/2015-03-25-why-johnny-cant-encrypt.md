---
layout: post
title: Why Johnny Can't Encrypt
banner: whyjohnnycantencrypt.png
---

A user study was conducted with 12 security novices attempting to use PGP.
Here are the results.

<p style="text-align: center"><img src="/img/pgp1.png"></p>


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

[Full paper](https://www.cs.berkeley.edu/~tygar/papers/Why_Johnny_Cant_Encrypt/OReilly.pdf).

