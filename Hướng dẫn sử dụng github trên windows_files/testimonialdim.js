;(function($) {	
	jQuery.fn.testimonialDim=function(args){
		var defaults={
				sliderWidth		:700,
				skin			:'default',
				visibleItems		: 3,
				scrollItems		: 3,
				prevnext		: 0,
				autostep		: 0,
				time			: 3,
				easing			: "swing",
				duration		: 1000,
				borderWidth		:0,
				navnum			:0,
				handle			:'',
				navstyle		:'',
				transition		:'scrollHorz'				
		}  
		var self=this;
		var options=jQuery.extend({},defaults,args);
		this.testimonialSliderSize=function(){
			var sliderWrap = jQuery(this).parents(".rich-testimonials"),
			    slideri = jQuery(this).find(".rt-slideri"),
			    wrapWidth=sliderWrap.width(),
			    slideriMargin = 2*parseInt(slideri.css("margin-left")),
			    slideriBorder=2*parseInt(options.borderWidth),
			    slideriPadding=parseInt(slideri.css("padding-left"))/2;
			    slideItemW=(options.sliderWidth/options.visibleItems)-slideriMargin-slideriBorder- slideriPadding,
			    slideriOuterWidth=slideItemW + slideriMargin + slideriBorder + slideriPadding,
			    visibleItems = options.visibleItems;
			if((wrapWidth)/(visibleItems*slideriOuterWidth) < 1 ) {
				for(var i=visibleItems-1;i>0;i--){
					if((wrapWidth)/(i*slideriOuterWidth) >= 1 ) {
						visibleItems = i;
						break;
					}
					else{
						if(wrapWidth<slideriOuterWidth){
							visibleItems=1;
							break;
						}
					}
				}	
			}

			//Slide Width
			var slideiW=(wrapWidth/visibleItems)-slideriMargin-slideriBorder-slideriPadding;
			slideri.width(slideiW);
			if(options.skin == 'flat' && visibleItems == 1) {
				var img_wrap_width = jQuery(".rt-avatar-wrap").width();
				var txt_wrapW = slideiW-img_wrap_width-50;
				jQuery(".rt-quote").width(txt_wrapW);
				slideri.css("margin","0 auto");
			} else {
				jQuery(".rt-quote").width('');
			}
			//Building slider options
			if(options.scrollItems > visibleItems){
				var scrollItems = visibleItems;
			}
			else {
				var scrollItems = options.scrollItems;
			}
			
			var optionsArr = {}, items = {}, scroll = {}, pagination = {}, classnames = {}, configArr= {};
			
			if(options.prevnext == '1' )
			{
				optionsArr['next']="#"+options.handle+"-next";	
				optionsArr['prev']="#"+options.handle+"-prev";		
			}
			// Check if disable auto checbox is checked or not
			if(options.autostep == '0' )
			{
				optionsArr['auto']=options.time * 1000;	
			}
			else {
				optionsArr['auto']=false;	
			}
			if(options.type == '1' )
			{
				optionsArr['circular']=false;	
				optionsArr['infinite']=false;	
			}
			
			//Pagination
			if(options.navnum == '1') {
				if(options.skin == 'default') {
					pagination['container'] = "#"+options.handle+"-nav";
					pagination['anchorBuilder'] = function(nr, item) {
						return '<a href="#" style="'+options.navstyle+'"></a>';
					};
				} else {
					pagination['container'] = "#"+options.handle+"-nav";
					pagination['anchorBuilder'] = function(nr, item) {
						return '<div class="inner-nav" style="'+options.navstyle+'"><a href="#" >'+nr+'</a></div>';
					};		
				}
				optionsArr['pagination']=pagination;
				classnames['selected'] = 'activeSlide';
				configArr['classnames'] = classnames;
			}

			optionsArr['responsive']=true;
			
			items['width'] = slideiW;			
			items['visible']=visibleItems;
			optionsArr['items']=items;
			
			scroll['items']= scrollItems; 
			scroll['fx']=options.transition;
			scroll['easing']=options.easing;
			scroll['duration']=options.duration;
			scroll['pauseOnHover']=true;
			// Added For Transitions
			scroll['onBefore'] = function (oldItems,newItems) {
				var currVisible = oldItems.items.visible;
				var isImgAnimated,imgclasses,imgAnimationName;
				var img = jQuery(currVisible).find(".rt-avatar img").attr("class");
				if(img != undefined) {
					imgclasses = img.split(" ");
					isImgAnimated = jQuery.inArray( "rt-animated", imgclasses );
					if(isImgAnimated != -1) {
						imgAnimationName = "";
						for(var i=isImgAnimated+1; i < imgclasses.length; i++)
							imgAnimationName += imgclasses[i]+" ";
						jQuery(currVisible).find(".rt-avatar img").removeClass(imgAnimationName);
						setTimeout(function() {
							jQuery(currVisible).find(".rt-avatar img").addClass(imgAnimationName);
						} , 1);
					}
				}
				var isTitleAnimated,titleclasses,titleAnimationName;
				var title = jQuery(currVisible).find(".rt-by").attr("class");
				if(title != undefined) {
					titleclasses = title.split(" ");
					isTitleAnimated = jQuery.inArray( "rt-animated", titleclasses );
					if(isTitleAnimated != -1) {
						titleAnimationName = "";
						for(var i=isTitleAnimated+1; i < titleclasses.length; i++)
							titleAnimationName += titleclasses[i]+" ";
						jQuery(currVisible).find(".rt-by").removeClass(titleAnimationName);
						setTimeout(function() {
							jQuery(currVisible).find(".rt-by").addClass(titleAnimationName);
						} , 1);
					}
				}
				var isSiteAnimated,siteclasses,siteAnimationName;
				var site = jQuery(currVisible).find(".rt-site").attr("class");
				if(site != undefined) {
					siteclasses = site.split(" ");
					isSiteAnimated = jQuery.inArray( "rt-animated", siteclasses );
					if(isSiteAnimated != -1) {
						siteAnimationName = "";
						for(var i=isSiteAnimated+1; i < siteclasses.length; i++)
							siteAnimationName += siteclasses[i]+" ";
						jQuery(currVisible).find(".rt-site").removeClass(siteAnimationName);
						setTimeout(function() {
							jQuery(currVisible).find(".rt-site").addClass(siteAnimationName);
						} , 1);
					}
				}
				var isContentAnimated,contentclasses,contentAnimationName;
				var content = jQuery(currVisible).find(".rt-content").attr("class");
				if(content != undefined) {
					contentclasses = content.split(" ");
					isContentAnimated = jQuery.inArray( "rt-animated", contentclasses );
					if(isContentAnimated != -1) {
						contentAnimationName = "";
						for(var i=isContentAnimated+1; i < contentclasses.length; i++)
							contentAnimationName += contentclasses[i]+" ";
						jQuery(currVisible).find(".rt-content").removeClass(contentAnimationName);
						setTimeout(function() {
							jQuery(currVisible).find(".rt-content").addClass(contentAnimationName);
						} , 1);
					}
				}
			}
			optionsArr['scroll']=scroll;
			//Slider Initialization
			jQuery("#"+options.handle).testiMonial(optionsArr);
		};
		this.testimonialSliderSize();
		//On Window Resize
		jQuery(window).resize(function() { 
			//self.testimonial_waitForFinalEvent(function(){
				self.testimonialSliderSize();
			//}, 100, options.handle);
							
		});
		
		this.testimonial_waitForFinalEvent = (function () {
			var testimonial_timers = {};
			return function (callback, ms, uniqueId) {
			if (!uniqueId) {
			  uniqueId = "Don't call this twice without a uniqueId";
			}
			if (testimonial_timers[uniqueId]) {
			  clearTimeout (testimonial_timers[uniqueId]);
			}
			testimonial_timers[uniqueId] = setTimeout(callback, ms);
			};
		})();
	}
})(jQuery);
