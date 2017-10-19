function buildToc () {
    var headings = $('h2, h3');
    var list = [];

    var section = 0;
    var subSection = 1;
    
    headings.each(function (i) {
        var toc = $("#toc");
        var heading = $(this);

        //Create id from heading text
        var id = heading.text().toLowerCase().replace(/ /g,'_');

        // Give each heading an id so it can be linked
        heading.attr('id', id);

        var elementType = heading.prop('nodeName');

        // Number sections
        if (elementType == "H2") {
            section++;
            subSection = 0;
            heading.prepend(section + ". ");
        } else {
            subSection++;
            heading.prepend(section + "." + subSection + " ");
        }

        // Add heading to the toc
        toc.append('<a href="#'+id+'"><span class="toc_heading toc_'+elementType+'">'+heading.text()+'</span></a>');

        //Add heading Y offset to the list so it can be highlighted correctly later
        list.push(heading.offset().top);
    });    
    
    return list;
}



// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function tocUpdate() {
    if (window.pageYOffset >= sticky) {
        toc.classList.add("sticky")
    } else {
        toc.classList.remove("sticky");
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