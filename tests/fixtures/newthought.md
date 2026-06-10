Surrounds caret-delimited strings in a newthought span
.
^^The quick brown fox^^ jumps over the lazy dog.
.
<section>
<p><span class="newthought" id="the-quick-brown-fox"><a class="no-tufte-underline" href="#the-quick-brown-fox"></a>The quick brown fox</span> jumps over the lazy dog.</p>
</section>
..

Shifts lone carets outside the newthought span, no section marking due to not appearing at paragraph start
.
^^^The quick brown fox^^^ jumps over the lazy dog.
.
<section>
<p>^<span class="newthought">The quick brown fox</span>^ jumps over the lazy dog.</p>
</section>
..

Handles nesting
.
^^^^The quick brown fox^^^^ jumps over the lazy dog.
.
<section>
<p><span class="newthought" id="the-quick-brown-fox"><a class="no-tufte-underline" href="#the-quick-brown-fox"></a><span class="newthought">The quick brown fox</span></span> jumps over the lazy dog.</p>
</section>
..

Nesting and lone carets
.
^^^^^The quick brown fox^^^^^ jumps over the lazy dog.
.
<section>
<p>^<span class="newthought"><span class="newthought">The quick brown fox</span></span>^ jumps over the lazy dog.</p>
</section>
..

Works inside middle of sentence
.
The quick ^^brown^^ fox jumps over the lazy dog.
.
<section>
<p>The quick <span class="newthought">brown</span> fox jumps over the lazy dog.</p>
</section>
..
