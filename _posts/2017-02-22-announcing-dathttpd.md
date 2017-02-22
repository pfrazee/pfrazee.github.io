---
layout: post
title: Announcing DatHTTPD
desc: Bringing together the old Web and the new Web.
---

<div class="post-config" style="display: inline-block">
  <table>
    <thead><tr><td colspan="2">
      Configure the variables in this post
    </td></tr></thead>
    <tbody>
      <tr>
        <th>$YOUR_DNS</th>
        <td><a href="#" onclick="chooseVar('dns')"><var id="dns"></var></a></td>
      </tr>
      <tr>
        <th>$YOUR_DAT</th>
        <td><a href="#" onclick="chooseVar('dat')"><var id="dat" class="shorten"></var></a></td>
      </tr>
      <tr>
        <th>$YOUR_EMAIL</th>
        <td><a href="#" onclick="chooseVar('email')"><var id="email"></var></a></td>
      </tr>
    </tbody>
  </table>
</div>

<br>

As of [Beaker Browser 0.6.1](https://beakerbrowser.com), you can visit [Dat sites](https://www.datprotocol.com/) using DNS shortnames:

<img class="centered" src="/assets/img/datdns.png">

This is accomplished with DNS-over-HTTPS, and made simple with <a href="https://github.com/beakerbrowser/dathttpd">DatHTTPD</a>. DatHTTPD serves Web sites over HTTPS and <a href="https://datprotocol.com">Dat</a> with automatic TLS certificates.

<br>

## DNS-over-HTTPS

DNS shortnames for Dat were not possible until [Beaker 0.6.1](TODO).

We needed a secure way to transmit a DNS mapping for non-HTTPS sites. Originally we used DNS&nbsp;TXT records, but the lack of authentication made the lookup easy to MITM. We considered DNSSEC, but due to limited deployment and difficult setup, we felt that was the wrong solution.

We opted for [DNS-over-HTTPS](https://github.com/beakerbrowser/beaker/wiki/Authenticated-Dat-URLs-and-HTTPS-to-Dat-Discovery) instead.

**How it works.** When a Dat URL with a shortname such as dat://<var id="dns"></var> is loaded, Beaker makes a GET request to https://<var id="dns"></var>/.well-known/dat. The response looks like this:

<div class="highlight"><pre><code>dat://<var id="dat"></var>/
TTL=3600
</code></pre></div>

Beaker loads the URL from line 1, and then caches it for the number of seconds specified by the `TTL` line 2. This is used by DatHTTPD to host sites over Dat and HTTPS at the same shortname.

<br>

<div class="center muted">
  <img src="/assets/img/cat1.jpg"><br>
  <small>DNS for Dat!</small>
</div>

<br>

## DatHTTPD

[DatHTTPD](https://github.com/beakerbrowser/dathttpd) is a static server for Dat and HTTPS. It rehosts dats so that you can visit https://<var id="dns"></var> or dat://<var id="dns"></var> and get the same content.

**How it works.** DatHTTPD joins the swarm for the sites it's hosting, then creates an HTTPS server for each site and hosts them at separate domains. It uses Lets&nbsp;Encrypt to provision TLS certificates automatically. The `/.well-known/dat` file is served for each domain.

**How to use it.** Host your Dat site locally using Beaker or the [Dat CLI](https://github.com/datproject/dat). Setup a VPS and point your <var id="dns"></var> DNS entry to it. Then create a config file at `~/.dathttpd.yml`:

<div class="highlight"><pre><code>letsencrypt:
  email: '<var id="email"></var>'
  agreeTos: true
sites:
  <var id="dns"></var>:
    url: dat://<var id="dat"></var>/
</code></pre></div>

Now run:

```
npm install -g dathttpd
dathttpd start
```

The server is now running. Traditional browsers can visit https://<var id="dns"></var> and [Beaker](https://beakerbrowser.com) can visit dat://<var id="dns"></var>.

When you publish updates to the Dat sites, DatHTTPD will automatically sync those changes from your device.

[More info on the readme](https://github.com/beakerbrowser/dathttpd)

<br>

## Summary

DNS-over-HTTPS enables Beaker to load Dat sites with shortnames, and DatHTTPD lets you host sites over Dat and HTTPS.

Links:

 - [DatHTTPD](https://github.com/beakerbrowser/dathttpd)
 - [DNS-over-HTTPS Spec](https://github.com/beakerbrowser/beaker/wiki/Authenticated-Dat-URLs-and-HTTPS-to-Dat-Discovery)
 - [Dat Protocol](https://datprotocol.com)
 - [Dat CLI](https://github.com/datproject/dat)
 - [Beaker Browser](https://beakerbrowser.com)

<script src="/assets/js/vars.js"></script>
<script>
setVar('email', 'bob@foo.com')
setVar('dns', 'mysite.com')
setVar('dat', '1f968afe867f06b0d344c11efc23591c7f8c5fb3b4ac938d6000f330f6ee2a03')
</script>
