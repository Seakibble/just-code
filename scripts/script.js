function buildToc () {
    var h2s = $('h2');
    var list = [];
    h2s.each(function (i) {
        toc = $("#toc");
        heading = $(this);
        var id = heading.text().toLowerCase().replace(/ /g,'');
        heading.prepend((i+1) + ". ");
        heading.attr('id', id);
        toc.append('<a href="#'+id+'"><span class="toc_heading">'+heading.text()+'</span></a>');
        list.push(heading.offset().top);
    });
    
    
    return list;
}



// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function tocUpdate() {
    if (window.pageYOffset >= sticky) {
        toc[0].classList.add("sticky")
    } else {
        toc[0].classList.remove("sticky");
    }

    var foundActive = false;
    if (offsetList != undefined) {
        for (var i = 0; i < offsetList.length; i++) {
            if (offsetList[i]-10 >= window.pageYOffset && !foundActive) {
                $('#toc a:nth-child('+(i+1)+') span').addClass("active");
                foundActive = true;
            } else {
                $('#toc a:nth-child('+(i+1)+') span').removeClass("active");
            }
        }
    }
}