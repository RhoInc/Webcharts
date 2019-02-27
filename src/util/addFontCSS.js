export default function addFontCSS() {
    const context = this;

    const fonts_url = '//fonts.googleapis.com/css?family=Open+Sans:400,300'

    const styles = ['@import url('+ fonts_url +');'];

    //Attach styles to DOM.
    this.style = document.createElement('style');

    var request = new XMLHttpRequest();
    request.open('HEAD', fonts_url);
    request.send();

    // If header is returned add the import css to Dom head
    request.onreadystatechange = function() {
        if (this.readyState == this.HEADERS_RECEIVED) {
            context.style.type = 'text/css';
            context.style.innerHTML = styles.join('\n');
            document.getElementsByTagName('head')[0].appendChild(context.style);
            request.getAllResponseHeaders();
        }
    };
}
