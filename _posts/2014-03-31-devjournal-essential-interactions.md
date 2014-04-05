---
layout: post
title: Essential Interactions (Layer1 Devlog)
desc: Notes re&#58; early GUI designs.
---

Notes re&#58; early GUI designs.

<br>

**Video**: [NeXT vs SUN](https://www.youtube.com/watch?v=oc40mLKRx7g)

**Thoughts**: Funny little video. There's an open question that I want to answer, which is whether you really need "modes" (applications) which are tightly optimized to a particular usecase, or whether a unified HCI can actually cover all kinds of interactions and do so in a nice way. There are a couple of reasons why I'm wondering about this.

 1. System-awareness. In a more powerful graphics environment with zooming, high entity count, levels of detail &ndash; and for that matter, HMDs &ndash; you have a lot more canvas to fill with information. Modern GUIs tend to hide a lot to optimize a workflow, but, taking from the original RTS inspiration for Layer1, things like scrollable maps with minimaps show you can actually pack in a lot more state.

 2. Flexibility. Applications follow a binary mindset where there's the development vs the use. I don't think there should be a divide. Rather, I think people should be able to construct new tools on the fly.

So it's particularly interesting watching the GUI builder in this video, because there is an "on-the-fly" concept at work here, but it's not a very satisfying one because the units of assembly are so mundane. Interface elements like textfields and buttons don't speak to the inner structures of the system; they're artifice which could be naturally handled in a more elegant HCI. Since the SUN and NeXT PCs are made of blackbox applications, the HCI systems can't really be of service except to give them GUI primitives and a mostly-automated way to connect them to the blackbox's endpoints.

<br>

**Video**: [Xerox STAR UI](https://www.youtube.com/watch?v=Cn4vC80Pv6Q)

**Thoughts**: This is closer to what I'm imagining &ndash; note the dedicated function keys on the left of the keyboard. Icons behave more like a representation of a resource and could shuttle commands directly to them. If I remember right, earlier versions of Windows and OSX used similar ideas, and tried to do things like composed interactions by combining icons.

Why did icons fall out of favor? From personal experience, I can say icons are an organizational nightmare, easy to mis-drag, and hard to predict when composing. Part of these issues have to do with screen real-estate and rendering capabilities, so they're solveable. Part of these issues, as I think I'm going to assert a lot, are architectural.

If icons represent program endpoints instead of system-defined resources, you get a much simpler programming model because you don't have to think about the GUI. Layer1 uses services and user-agents, so this means icons shuttle HTTP verbs and follow links, and the rest is left to media (stop waving, hands). Because the GUI code adds so much complexity, stripping it as a concern makes simpler programs which are focused on their essential interactions. That's my hunch, anyway.

STAR uses windows here to access media, and while I'm not inclined to use windows, there's obviously going to be media interactions. More interesting is that STAR treats text-content (characters, paragraphs, etc) and graphics as entities, somewhat similarly to how it treats icons. The performance is terrible, and I'm not sure characters really need to be ents, but it hints at a more unified mindset.

One particular gem in part 2: the Same key. Another interesting feature, the Props key.

<br>

**Video**: [Tektronix 4404 Smalltalk Demo](https://www.youtube.com/watch?v=8yxCJfayW-8), [Xerox Smalltalk-80 Pt 1](https://www.youtube.com/watch?v=JyaQavN9rVA) [Pt 2](https://www.youtube.com/watch?v=cpjOd5ge2MA)

**Thoughts**: Now we're getting somewhere.

Starting with the Tektronix video, you get to see live snippet-execution in action, and how cool is that. Early on, he runs a "Toothpaste Graphics" snippet that turns his cursor into a paintbrush. Moving then into the System Browser, he gets a live code editor that works right along with him. Not unheard of, but it feels wonderfully "close" to the user.

Onto the Smalltalk-80 videos, there's the lack of under-window repainting. Very interesting how windows collapse to their titles and live in space rather than into a taskbar. Taskbars aren't a bad idea, since they assist in organization and simplify the visual-scanning process, but they'd need to be expanded for a larger workfield. I can imagine container regions within which windows minimize to that container's taskbar.

I've never been enamored with Smalltalk's class browser, mostly since it doesn't evoke any delight. Navigating through code ontologies was a pain when I was writing C++ in Visual Studio, and it looks like a pain in Smalltalk when I see it. There must be a richer form of discovery navigation. Perhaps my issue is with the granularity; the kind of components I want to navigate are at the system/process level, not at the Collection and String level. This is part of why I like HTTP as an IPC language on top of another language: it splits the system and hides the lower language, and therefore lives at the right level of granularity.

It's worth noting that a lot of the essential interactions in this video are with the class browser, the "Workspace" / the editor, and with context menus.

<br>

**Video** [The Smalltalk-80 Programming System](https://www.youtube.com/watch?v=JLPiMl8XUKU) (a narrated intro)

**Thoughts**: You know, the text-snippet evaluation is interesting. Plan9 did a similar thing with Acme. It's interesting, but I don't love that the output dumps into the buffer. That triggers a negative reflex about disorder.

Expanding on that: disorder is one of the worst signals to set off for a user, because it adds context that they need to retain. It's like incrementing a reference in your GC &ndash; you know you'll have to clean it up before you leave this task or the thing you're using will be broken. So that's the system tasking the user, when it should always be the reverse. Order outranks flexibility, but you can have both. Just don't dump command output in my source-code.

Funny how this narrator keeps calling code "Smalltalk Information."

Can't argue with the way the browser can query the full object hierarchy by things like supported messages. Also nice that new methods have templates. And that compilation detects an unsupported method in use, but lets the user carry on with it. The only cooler thing would have been to offer to auto-create the missing method.

<br>

Ok, that's enough for now. I'm getting some clearer thoughts about what agents (icons) need to do and how they interact, plus a sense of how media (windows) integrate. I've got a hunch that mediatypes and reltypes will help dictate the structure of inputs and outputs for interfaces, and that's a strong challenge to have solved. If I can get that far, that'd be a satisifying v1.