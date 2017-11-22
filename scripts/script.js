window.onload = function () {
    // Swish fade-in
    document.getElementsByTagName("BODY")[0].style.opacity = 1.0;
};

function buildToc(levels) {
    levels = levels || 3;

    var selector = 'h2';
    switch (levels) {
        case 3:
            selector += ', h4';
            break;

        case 2:
            selector += ', h3';
    }

    var headings = $(selector);
    var list = [];

    var section = 0;
    var subSection = 1;

    headings.each(function () {
        var toc = $("#toc");
        var heading = $(this);

        var text = heading.text();
        heading.text('');
        //Create id from heading text
        var id = text.toLowerCase().replace(/[ |.]+/g, '_');


        // Give each heading an id so it can be linked
        heading.attr('id', id);

        var elementType = heading.prop('nodeName');

        // Number sections and subsections. Leave all other headings unaltered
        if (!heading.hasClass("toc-no-section")) {
            switch (elementType) {
                case "H2":
                    section++;
                    subSection = 0;
                    text = section + ". " + text;
                    break;

                case "H3":
                    subSection++;
                    text = section + "." + subSection + " " + text;
                    break;
            }
        }

        heading.prepend('<a href="#' + id + '" rel="relativeanchor"></a>');
        var anchor = heading.find('a');
        anchor.text(text);

        // Add heading to the toc
        toc.append('<a href="#' + id + '" rel="relativeanchor"><span class="toc_heading toc_' + elementType + '">' + text + '</span></a>');

        //Add heading Y offset to the list so it can be highlighted correctly later
        list.push(heading);
    });

    return list;
}


function tocUpdate() {
    // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    // if (window.pageYOffset >= sticky) {
    //     toc.classList.add("sticky")
    // } else {
    //     toc.classList.remove("sticky");
    // }

    // Highlight active section
    if (headingList) {
        var foundActive = false;
        for (var i = 0; i < headingList.length; i++) {
            var headingY = headingList[i].offset().top - 20;
            var windowY = window.pageYOffset;

            var itemLink = $('#toc').find('a:nth-child(' + i + ')');
            var itemSpan = $(itemLink).find('span');
            if (headingY >= windowY && !foundActive) {
                if (!itemSpan.hasClass('active') && (itemLink[0] !== undefined) ) {
                    history.replaceState({}, "", $.attr(itemLink[0], 'href'));
                }
                itemSpan.addClass("active");
                foundActive = true;
            } else {
                itemSpan.removeClass("active");
            }
        }
    }
}

$(document).ready(function () {
    $('a[rel="relativeanchor"]').click(function () {
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 350);
        history.pushState({}, "", $.attr(this, 'href'));
        return false;
    });
});