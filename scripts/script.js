window.onload = function () {
    // Swish fade-in
    document.getElementsByTagName("BODY")[0].style.opacity = 1.0;
}

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




function tocUpdate() {
    // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    if (window.pageYOffset >= sticky) {
        toc.classList.add("sticky")
    } else {
        toc.classList.remove("sticky");
    }

    // Highlight active section
    var foundActive = false;
    if (offsetList != undefined) {
        for (var i = 0; i < offsetList.length; i++) {
            var headingY = offsetList[i];
            var windowY = window.pageYOffset;

            if (headingY >= windowY && !foundActive) {
                $('#toc a:nth-child('+(i+1)+') span').addClass("active");
                foundActive = true;
            } else {
                $('#toc a:nth-child('+(i+1)+') span').removeClass("active");
            }
        }
    }
}