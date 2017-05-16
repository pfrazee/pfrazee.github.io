
pfrazee
mafintosh: umm I'm getting corrupted outputs from dats in beaker
pfrazee
I think our replication fix may have done something bad
mafintosh
what do you mean corrupted outputs?
mafintosh
it should never write bad data
mafintosh
even with your fix
pfrazee
mafintosh: it looks like I'm getting a mix of old and new data
mafintosh
to the files?
pfrazee
so I noticed it on my log reader app. I have 2 versions of it, and the second one is named "log reader 2"
pfrazee
yeah
pfrazee
so what i'm seeing is, the old version of index.html, but at the end is randomly:
mafintosh
hmm yea, that could be a bug
pfrazee
</html>tml>
mafintosh
ah
mafintosh
it might not truncate the output files
mafintosh
that sounds very plausible
pfrazee
well no here's the thing
pfrazee
the content before that is the *old* index.html
notwes_ has joined (~notwes@2602:306:839b:fca0:953b:e8a:2dda:b99b)
pfrazee
mafintosh: ohhh hey I have a theory
pfrazee
oh a good theory too
pfrazee
mafintosh: yeah. Ok so I unset the local bitfield
pfrazee
so beaker went around asking for that block
pfrazee
and received it, and thus wrote it to storage
pfrazee
so basically, beaker retrieved the old version of the file from the network and wrote it
mafintosh
ah yea
mafintosh
that sounds right