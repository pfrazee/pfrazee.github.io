---
layout: post
title: Making the browser more like an OS
desc: A few observations.
---

I'll start this with an assertion by Alan Kay in his 2009 lecture, "Normal Considered Harmful:"

<iframe width="640" height="390" src="//www.youtube.com/embed/FvmTSpJU-Xc?start=1425" frameborder="0" allowfullscreen></iframe>

Kay's talk is actually about the social issues around the industry's "normal," and I won't expand on that, because I can't make a better observation than one of the guys who founded modern HCI and then watched the sum of his work go idle for lack of social traction.

I can, however, talk about making browsers act like an OS.

<br>
### Browser OS: The process model

A kernel needs to enforce memory-address containment for each process. Browsers can now do that with Web Workers, which have their own VMs and threads. The process model is then: the application acts as the kernel, and Workers act as its processes.

Browsers have [limitations on the number of active Workers](http://stackoverflow.com/a/17643806). It's unlikely that a fork() command would succeed currently, but this sort of thing may change. The model for lifecycle and program-addressing is fairly open; different kernels should try different things.

<br>
### Browser OS: The security model

Closing attacks against the browser OS means reducing the surface-areas. We now have Content Security Policies to work with, but GUIs are hard to build on the DOM without custom styles and event-bindings. Proper security (along with some other reasons mentioned below) will probably require abandoning the DOM.

To enforce access controls on processes (the Web Workers) all actions should pass through the kernel and lean on [least-privilege](http://en.wikipedia.org/wiki/Principle_of_least_privilege). CSP should restrict the workers to only communicate with the kernel via postMessage and only import scripts from its host domain. All actions are then interpretted or discarded by the host.

It'd be useful to have a [javascript API to CSP](http://grimwire.com:4000/2014/03/24/js-api-proposal-for-csp.html) so that the policies can be set by the kernel. At present, it's up to the workers' serving hosts, so all scripts have to be self-hosted (by the kernel host). If access policies are set for scripts from remote hosts, the scripts will need to be "pinned" by saving and checking their content-hashes before load.

To maintain trust in the kernel the best option is to run it from the localhost. Access control schemes will depend on the overall system design. Different kernels should try different things.

<br>
### Browser OS: The IPC model

With workers limited to postMessage, IPC becomes fairly important. [There are lots of possibilities here.](http://en.wikipedia.org/wiki/Inter-process_communication) In my projects, I've used Ajax as the IPC model so that processes' behaviors can be universally addressable (and thus linkable). I've [written a bit to explain that choice](/2014/03/08/communicating-with-web-workers-using-http.html). Different kernels should try different things.

<br>
### Browser OS: The GUI model

In my experience, this is the most challenging question because it affects so much of "platform." I've tried a number of different approaches to HTML-based GUIs, from drag&drop composition, to CLI/GUIs, to jQuery over the messaging channel, to HTML directives for generating requests and interpretting responses into targetted updates. Now there are opportunities like React to explore, where virtualized DOMs may be constructed within a Worker so that diffs can be streamed.

However, at this stage I think HTML should be retired in favor of a WebGL-based GUI library. In addition to the security difficulties mentioned above, HTML is not designed for multi-application composition, and it doesn't perform terribly well. Importantly, a WebGL library can also be built for VRUIs, and that will be a requirement soon. Recent news has me focusing more on that than before.

There are lots of opportunities to innovate here. [I'm prototyping an idea inspired by RTS games](/2014/03/29/trying-an-rts-interface-to-web-services.html) but there are lots of approaches to try. Different kernels should try different things.

<br>