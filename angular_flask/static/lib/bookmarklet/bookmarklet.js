var hn = window.location.hostname;
if(hn == 'gifter.bunce.io' || hn == 'local.gifter.bunce.io'){
  alert('Make sure the Want Button is in your Bookmarks or Favourites Bar. If so, use the Want Button on other websites with images to add items to your Digboards!');
  throw new Error('You must not use the Want Button on www.wantster.com');
}

function tigidiParseUrl(name, str) {
 
    var match = RegExp('[?&]' + name + '=([^&]*)')
                    .exec(str);
 
    return match ?
        decodeURIComponent(match[1].replace(/\+/g, ' '))
        : null;
 
}

jQuery.noConflict(true)(function($){
  $(function(){
    var $b2b = $('#tigidi-b2b');
    var b2bb = $b2b.length;
    if(b2bb){
      var b2b = $b2b[0].href;
      var b2burl, b2bimg, b2bname;
      
      b2burl = tigidiParseUrl('url', b2b);
      b2bimg = tigidiParseUrl('img', b2b);
      b2bname = tigidiParseUrl('name', b2b);
      if(b2burl){
        b2burl = encodeURIComponent(b2burl);
      } else {
        b2burl = encodeURIComponent(window.location.href);
      }
      var bmurl = tigidi_url+'/digs/bookmarklet'+'?url='+b2burl+'&remote_image_url='+encodeURIComponent(b2bimg)+'&name='+b2bname;
      
    } else {
      var bmurl = tigidi_url+'/digs/bookmarklet'+'?url='+encodeURIComponent(window.location.href);
    }
    var tclass = 'tigidi_class';
    
    function tigidi_teardown(){
      $('.'+tclass).remove();
    }
    
    tigidi_teardown();
    
    //$iframe = $("<iframe src='"+bmurl+"' id='bookmarkletIframe' height='500' width='200'></iframe>");
    $div = $("<div id='tigidi-bookmarklet' class='"+tclass+"'><h1><img src='"+tigidi_url+"/images/logo-mini.png' alt='Wantster Logo' /><a href='#' class='tigidi_close'>close</a></h1></div>").appendTo('body');
    $loading = $("<div><img src='"+tigidi_url+"/images/bm-loader.gif"+"' /></div>").css({
      textAlign: 'center',
      padding: '30px'
    });
    $loading.appendTo($div);
    
    if($.browser.msie){
      $div.css('position', 'absolute');
    }
    //$div.append($iframe);
    
    $imgs = $("img").filter(function(){
      return $(this).height() > 132 && $(this).width() > 132;
    });
    
    if($imgs.length || b2bb){
    
      $.each($imgs, function(){
        var $chooser = $("<div class='tigidi-chooser "+tclass+"' data-img-src='"+this.src+"'><img src='"+tigidi_url+"/images/plus.png' alt='Add to Wantster' /></div>").css({
          position: 'absolute',
          left: $(this).offset().left,
          top: $(this).offset().top,
          height: $(this).height(),
          width: $(this).width(),
          backgroundImage: 'url('+tigidi_url+'/images/spacer.gif)'
        }).hover(function(){
          $(this).addClass('tigidi-chooser-hover');
        }, function(){
          $(this).addClass('tigidi-chooser-hover');
        }).appendTo("body");
      });
    
      $imgs.sort(function(a,b){
        if($(a).height()*$(a).width() > $(b).height()*$(b).width()){
          return 1;
        } else {
          return -1;
        }
      });
      var largest_image = $imgs[0];
    
      if(!b2bb){
        bmurl = bmurl+'&remote_image_url='+encodeURIComponent(largest_image.src);
      }
    
      var REMOTE = tigidi_url;
    
      var transport = new easyXDM.Rpc({
          remote: bmurl,
          container: "tigidi-bookmarklet"
      }, {
          local: {
        
            resize_iframe: {
              method: function(size){
                $loading.hide();
                $('#tigidi-bookmarklet').width(size.width+2).css('width', size.width+2+'px');
                $('#tigidi-bookmarklet iframe').height(size.height).width(size.width);
              }
            },
            alert_it: {
              method: function(msg){
                alert(msg);
              }
            },
            teardown: {
              method: function(){
                $('#tigidi-bookmarklet').fadeOut('slow', function(){
                  tigidi_teardown();
                });
              }
            },
            proxy_click: {
              method: function(src){
                $('.tigidi-chooser[data-img-src="'+src+'"]').click();
              }
            }
        
          },
          remote: {
            replace_img: {},
            additional_image: {}
          }
      });
    
      if($imgs.length > 1){
        $imgs.each(function(){
          transport.additional_image(encodeURIComponent(this.src));
        });
      }
    
    } else {
      $loading.hide();
      $('#tigidi-bookmarklet h1').after( $("<div style='padding:15px;'><p style='font-size:12px;font-family:Arial,sans-serif;color:#333;'><b>Sorry, there were no good images on this page!</b><br /><br />Sometimes, images are too small, protected by plug-ins like Flash or a part of a catalogue page with many items.<br /><br />Try This!<br />#1: Click on the item you want on this page and try the Want Button again.<br />#2: Add a want by saving the image and uploading manually to <a href='"+tigidi_url+"'>wantster.com</a>.</p></div>") );
    }
    
    $('.tigidi-chooser').click(function(){
      transport.replace_img($(this).attr('data-img-src'));
    });
    
    $('.tigidi_close').live('click', function(e){
      e.preventDefault();
      tigidi_teardown();
    });
  });
});