
function buildToc () {
    var h2s = $('h2');
    var toc = $('#toc');
    h2s.each(function (i) {
        console.log(i);
        heading = $(this);
        var id = heading.text().toLowerCase().replace(/ /g,'');
        heading.prepend((i+1) + ". ");
        heading.attr('id', id);
        toc.append('<a href="#'+id+'"><span class="toc_heading">'+heading.text()+'</span></a>');
    });
}
