
// 
//         window.RabbitLyrics = RabbitLyrics;
//         let elements = document.getElementsByClassName('rabbit-lyrics')

//         for (let i = 0; i < elements.length; i++) {

//             let element = elements[i];
//             let mediaElements = document.querySelector(element.dataset.media);
//             let mediaElement = mediaElements ? mediaElements[0] : null;
//             let { viewMode, height, theme } = element.dataset;
//             //alert(mediaElement);
//             let options = {
//                 element,
//                 mediaElement,
//                 viewMode,
//                 height,
//                 theme
//             };

//             new RabbitLyrics(options);
//         }

//  function sticky_relocate()
//     {
//         
//       // alert();
//         var footer = $(".gstFooter1"); ///stp id
//         var sticky = $(".pageSidebar"); ///fixed div
//         var anchor = $('.pages');

//         var window_top = $(window).scrollTop();
//         var footer_top = footer.offset().top;
//         var div_top = anchor.offset().top;
//         var div_height = sticky.height();
//         var padding = 20;  // tweak here or get from margins etc
//         if (window_top + div_height > footer_top - padding)
//             sticky.css({top: (window_top + div_height - footer_top + padding) * -1})
//         else if (window_top > div_top) {
//             sticky.addClass('stick');
//             sticky.css({top: 0})
//         } else {
//             sticky.removeClass('stick');
//         }
//     }

// 

// var cc =    document.getElementsByTagName("audio")[0];
// cc.play();

function gridView() {

    $('.grid_view ul li a').removeClass("active");
    $('#pc').addClass('gridContent');
    $('#grid').addClass("active");
}

function listView() {
    $('#pc').removeClass('gridContent');
    $('.grid_view ul li a').removeClass("active");
    $('#pc').addClass('pageContents');
    $('#listView').addClass("active");
}