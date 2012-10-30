(function(window, document, undefined) {

    var tmpFrame = document.createElement('iframe'),
        // feature testing
        canSandbox = tmpFrame.sandbox != undefined;

    xtag.register('x-web-code-sample', {
        onInsert: function() {
            var $this = this.firstElementChild.parentNode,
                source = {
                    markup: '',
                    javascript: '',
                    css: ''
                },
                $preview = $this.querySelector('.preview'),
                iframe;

            // collect and highlight source code
            Object.keys( source ).forEach(function(key) {
                // TODO: make it possible to overwrite this default selector
                var $code = $this.querySelector( '.language-' + key );

                if ( $code && $code.childNodes.length ) {
                    // collect the cource code for this web language
                    if ( canSandbox && $preview ) {
                        // node value is the decoded equivalent of innerHTML
                        source[ key ] = $code.childNodes[0].nodeValue;
                    }

                    // It's now time to highlight the source
                    if ( window.Prism ) {console.log( $code )
                        Prism.highlightElement( $code );
                    }
                }  
            });

            // build the preview
            if ( canSandbox && $preview ) {
                iframe = document.createElement('iframe');
                iframe.frameBorder = '0';
                iframe.width = '100%';
                iframe.height = '100%';

                $preview.appendChild( iframe );
                $this.classList.add('ready');

                // we can't manipulate the iframe's DOM once it's sandboxed
                // so we'll set its content as a data-url
                source = '<!doctype html><html><head><style>' +
                    source.css +
                    '</style></head><body>'+
                    source.markup +
                    '<script>' +
                    source.javascript +
                    '</script></body></html>';

                iframe.src = 'data:text/html;base64,' + btoa( source );
            }

            xtag.fireEvent( this, 'ready' );
        }
    });

})(this, this.document);
