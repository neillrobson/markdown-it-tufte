Image without caption
.
Paragraph before

![alt text](/image.png)

Paragraph after
.
<section>
<p>Paragraph before</p>
<figure><img src="/image.png" alt="alt text"></figure>
<p>Paragraph after</p>
</section>
..

Image with caption
.
Paragraph before

![alt text](/image.png "title text")

Paragraph after
.
<section>
<p>Paragraph before</p>
<figure>
<img src="/image.png" alt="alt text" title="title text"><figcaption>title text</figcaption>
</figure>
<p>Paragraph after</p>
</section>
..

Captures standalone images inside other blocks
.
Paragraph before

> Quote before
>
> ![alt text](/image.png)
>
> Quote ![alt text](/image.png) after

Paragraph after
.
<section>
<p>Paragraph before</p>
<blockquote>
<p>Quote before</p>
<figure><img src="/image.png" alt="alt text"></figure>
<p>Quote <img src="/image.png" alt="alt text"> after</p>
</blockquote>
<p>Paragraph after</p>
</section>
..

Leaves images elsewhere in a paragraph alone
.
Paragraph before

Text ![alt text](/image.png) and more

Paragraph after
.
<section>
<p>Paragraph before</p>
<p>Text <img src="/image.png" alt="alt text"> and more</p>
<p>Paragraph after</p>
</section>
..
