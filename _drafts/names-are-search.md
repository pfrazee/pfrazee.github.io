recently dominic and I  have been working on shortname tools
pfraze
and I would try to introduce different solutions to make it convenient, you know, like registries you can subscribe to and what not
pfraze
but generally dominic wanted to maintain a hard "no centralization, no singletons" constraint
pfraze
and, even if you can choose your registries, that's sortof a weak UX
pfraze
and so after a while, we concluded that "shortnames are a search problem"
pfraze
are you familiar with zooko's triangle?
pfraze
https://en.wikipedia.org/wiki/Zooko%27s_triangle
pfraze
this leaves us in the bottom two corners
pfraze
but, the more I work on disco, the more I think that treating shortnames as a search problem could be extremely fortuitous
pfraze
because it's a fundamental truth to trust-graph systems: canonical knowledge must be computed from the graph, and that's exactly what search does
pfraze
and so this strategy is a means to distribute authority effectively throughout a fluid network
pfraze
and I think it can be generalized into some really interesting applications
tictacjoe has left IRC (Read error: Connection reset by peer)
tictacjoe has joined (~tictacjoe@cpe-24-242-77-166.austin.res.rr.com)
pfraze
it's definitely broader than decentralized datasets, it's true for any sort of corpus without a single source of authority
pfraze
an authority is basically a precomputed answer, but many kinds of information dont have that
pfraze
so intelligent agents are definitely founded in this
pfraze
and, I'm very certain I can generalize disco's algorithms into an API which you can apply to SSB, or anything else -- code snippets, web pages, school students
pfraze
because it looks like the algorithms will boil down to some normalized forms, both for the text-searched documents, and for the ranking signals
pfraze
also, personalized corpuses have some really strong advantages to balance out the lack of data in the corpus. A lot of the complexity of indexing the web comes from the complexity of measuring trust. In a personal system, you have an arbiter of trust, the individual user


---

at the foundation of search is trust analysis, which is very widely applicable

http://www.tara.tcd.ie/bitstream/handle/2262/39200/Temporal%20Factors.pdf

> Computational Trust was introduced more than a decade ago. The expected benefits are a reduction of complexity (by considering only trustworthy possibilities), the possibility of exploiting others’ ability with delegation, the possibility of having more cooperation in open and unprotected environment.

after trust is evaluated, it seems the next important task is interpretation of semantic meaning
what do the trusted agents want to tell the world? and, what knowledge do you want to extract?
so, you need to construct a good corpus of knowledge from your input documents

after that, it's key to rank the relevance of the knowledge
- how closely does a document match your query?
- how many trusted agents confirm the knowledge in the document? (how is the document valued?)
- how popular is the document?