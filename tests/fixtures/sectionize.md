Surrounds content with a section tag
.
Hi. This is some **content**.

I used *multiple* paragraphs.
.
<section>
<p>Hi. This is some <strong>content</strong>.</p>
<p>I used <em>multiple</em> paragraphs.</p>
</section>
..

Separates sections based on h2 tags
.
## The First Heading

I like to write paragraphs.

## The Second Heading

Sometimes in different sections.
.
<section>
<div class="section-link">
<a class="no-tufte-underline" href="#the-first-heading"></a><h2 id="the-first-heading">The First Heading</h2>
</div>
<p>I like to write paragraphs.</p>
</section>
<section>
<div class="section-link">
<a class="no-tufte-underline" href="#the-second-heading"></a><h2 id="the-second-heading">The Second Heading</h2>
</div>
<p>Sometimes in different sections.</p>
</section>
..

Separates sections based on newthought
.
^^In the beginning^^, God created the heavens and the earth.

Now the earth was formless and empty, as is the story when it is filled with vacuous machinations of my wandering mind. I just needed some extra content in this paragraph.

^^Emma Woodhouse, handsome, clever, and rich,^^ with a comfortable home and happy disposition, seemed to unite some of the best blessings of existence.
.
<section>
<p><span class="newthought" id="in-the-beginning"><a class="no-tufte-underline" href="#in-the-beginning"></a>In the beginning</span>, God created the heavens and the earth.</p>
<p>Now the earth was formless and empty, as is the story when it is filled with vacuous machinations of my wandering mind. I just needed some extra content in this paragraph.</p>
</section>
<section>
<p><span class="newthought" id="emma-woodhouse%2C-handsome%2C-clever%2C-and-rich%2C"><a class="no-tufte-underline" href="#emma-woodhouse%2C-handsome%2C-clever%2C-and-rich%2C"></a>Emma Woodhouse, handsome, clever, and rich,</span> with a comfortable home and happy disposition, seemed to unite some of the best blessings of existence.</p>
</section>
..

Creates unique slugs
.
## Identical Heading

with a paragraph.

## Identical Heading

but different content haha.

^^Identical heading^^, as it turns out, works okay.
.
<section>
<div class="section-link">
<a class="no-tufte-underline" href="#identical-heading"></a><h2 id="identical-heading">Identical Heading</h2>
</div>
<p>with a paragraph.</p>
</section>
<section>
<div class="section-link">
<a class="no-tufte-underline" href="#identical-heading-1"></a><h2 id="identical-heading-1">Identical Heading</h2>
</div>
<p>but different content haha.</p>
</section>
<section>
<p><span class="newthought" id="identical-heading-2"><a class="no-tufte-underline" href="#identical-heading-2"></a>Identical heading</span>, as it turns out, works okay.</p>
</section>
..

Handles empty content gracefully
.
.
..
