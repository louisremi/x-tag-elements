xtag-web-code-sample
=============

This build a preview from HTML, JS & CSS code in a sandboxed iframe. You can optionnaly load [prismjs](http://prismjs.com/) into your page for syntax highlighting of the code samples. If you do so, make sur to activate its manual mode: `<script src="prism.js" data-manual></script>`.


Example:

```html
<x-web-code-sample>
    <p>Here's some CSS</p>
    <pre><code class="language-css">p { color: red; }
.alt { color: blue; }</code></pre>
    
    <p>Here's some JS</p>
    <pre><code class="language-javascript">// toggle the class 'alt' on click
document.addEventListener('click', function( event ) {
    if ( event.target.nodeName == 'P' ) {
        event.target.classList.toggle('alt');
    }
});</code></pre>
    
    <p>And finally the HTML</p>
    <pre><code class="language-markup">&lt;p&gt;Click me to toggle my color!&lt;/p&gt;</code></pre>
    
    <div class="preview" style="height: 50px; border: 1px solid #ccc;"></div>

</x-web-code-sample>
```