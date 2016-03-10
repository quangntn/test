if(typeof $=='undefined') $ = jQuery.noConflict();
if(typeof hoangweb == 'undefined') var hoangweb = {};
hoangweb.findEleAfterTime = function(selector,cb,maxTimes){
	if(!maxTimes) maxTimes = 5;
	var time =500,
		timeInv = setInterval(function(){
		if(maxTimes--<=0 || $(selector).length) clearInterval(timeInv);
		if($(selector).length) {
			if(typeof cb == 'function') cb(selector);
		}
	},time);
};
hoangweb.initOlark = function(){
	if(typeof olark!='function') return;
	var olark_attention_tip = $(document.createElement("div"));
	$(olark_attention_tip).addClass('bubble-olark').html("Xin chào !");
	//when visible popup
	olark('api.box.onShow',function(){
		$('#habla_window_div').removeClass('olark-dlg-expand').addClass('olark-dlg-minimize');	//minimize default
		hoangweb.findEleAfterTime('#habla_compressed_div',function(){
			setup_olark_bubble_event('#olark-callout-bubble-offline');
			setup_olark_bubble_event('#olark-callout-bubble');
		});
		
	});
	//box state
	olark('api.box.onExpand',function(){
		$('#habla_window_div').removeClass('olark-dlg-minimize').addClass('olark-dlg-expand');
	});
	olark('api.box.onShrink',function(){
		$('#habla_window_div').removeClass('olark-dlg-expand').addClass('olark-dlg-minimize');
	});
	function setup_olark_bubble_event(callout_obj){
		$(callout_obj).append(olark_attention_tip);
		$(callout_obj).mouseover(function(e){
			olark_attention_tip.show();
		}).mouseout(function(e){
			olark_attention_tip.hide();
		});
	}
};
hoangweb.makeButtonDownloadLink = function(){
	var exts = {
		image:['png','gif','jpg','jpeg','bmp','tiff'],
		file : ['zip','rar','pdf','exe']
	}
	function PathToImageFile(url){
		for(var i in exts.image){
			if(url.indexOf('.'+exts.image[i]) != -1) return true;
		}
	}
	function pathToAttachment(url){
		for(var i in exts.image){
			if(url.indexOf('.'+exts.file[i]) != -1) return true;
		}
	}
	$(document).ready(function(){
		$('a[href]').each(function(i,v){
			var link = $(v).attr('href');
			if(/*!PathToImageFile(link) &&*/ pathToAttachment(link)) $(v).addClass('button-link'); 
		});
	});
};
hoangweb.init = function(){
	hoangweb.initOlark();
	//hoangweb.makeButtonDownloadLink();
	jQuery(document).ready(function($) {
		if(typeof Socialite != 'undefined'){
			console.log('Socialite initial');
		setTimeout(function(){
			Socialite.load($('.sharebar .social-buttons')[0]);
		},2000);
		}
		if(jQuery(".sharebar").sticky!=undefined) {
			jQuery(".sharebar").sticky({topSpacing:50});
			jQuery('#ad_right1').sticky();
		}
	});
};
hoangweb.init();	//init js
/*window.addEvent("domready",function() {
     var lazyloader = new LazyLoad({
		realSrcAttribute: "data-src",
		useFade: true,
		elements: 'img'
	 });
});
*/