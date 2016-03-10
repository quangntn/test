/*!CK:3597610254!*//*1457502414,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["GjRcU"]); }

__d('BlobFactory',['emptyFunction'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i=undefined,j=undefined;function k(){try{new b.Blob();j=true;}catch(m){j=false;}}var l=b.BlobBuilder||b.WebKitBlobBuilder||b.MozBlobBuilder||b.MSBlobBuilder;if(b.Blob){i={getBlob:function(m,n){m=m||[];n=n||{};if(j===undefined)k();if(j){return new b.Blob(m,n);}else{var o=new l();for(var p=0;p<m.length;p++)o.append(m[p]);return o.getBlob(n.type);}},isSupported:h.thatReturnsTrue};}else i={getBlob:function(){},isSupported:h.thatReturnsFalse};f.exports=i;},null);
__d('escapeJSQuotes',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(i){if(typeof i=='undefined'||i==null||!i.valueOf())return '';return i.toString().replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/\r/g,'\\r').replace(/"/g,'\\x22').replace(/'/g,'\\\'').replace(/</g,'\\x3c').replace(/>/g,'\\x3e').replace(/&/g,'\\x26');}f.exports=h;},null);
__d('Dialog',['Animation','Arbiter','AsyncRequest','Button','ContextualThing','CSS','DOM','Event','Focus','Form','HTML','Keys','Locale','Parent','Run','Style','URI','Vector','bind','createArrayFromMixed','emptyFunction','getObjectValues','getOverlayZIndex','removeFromArray','shield','fbt'],function a(global,require,requireDynamic,requireLazy,module,exports,Animation,Arbiter,AsyncRequest,Button,ContextualThing,CSS,DOM,Event,Focus,Form,HTML,Keys,Locale,Parent,Run,Style,URI,Vector,bind,createArrayFromMixed,emptyFunction,getObjectValues,getOverlayZIndex,removeFromArray,shield,fbt){if(require.__markCompiled)require.__markCompiled();var _supportsPositionFixed=function(){var body=document.body,test=document.createElement('div'),control=document.createElement('div');body.insertBefore(test,body.firstChild);body.insertBefore(control,body.firstChild);test.style.position='fixed';test.style.top='20px';var result=test.offsetTop!==control.offsetTop;body.removeChild(test);body.removeChild(control);_supportsPositionFixed=emptyFunction.thatReturns(result);return result;};function Dialog(model){'use strict';this._show_loading=true;this._auto_focus=true;this._submit_on_enter=false;this._fade_enabled=true;this._onload_handlers=[];this._top=125;this._uniqueID='dialog_'+Dialog._globalCount++;this._content=null;this._obj=null;this._popup=null;this._overlay=null;this._causal_elem=null;this._previous_focus=null;this._buttons=[];this._buildDialog();if(model)this._setFromModel(model);Dialog._init();}Dialog.prototype.show=function(){'use strict';this._showing=true;if(this._async_request){if(this._show_loading)this.showLoading();}else this._update();return this;};Dialog.prototype.showLoading=function(){'use strict';this._loading=true;CSS.addClass(this._frame,'dialog_loading_shown');this._renderDialog();return this;};Dialog.prototype.hide=function(){'use strict';if(!this._showing&&!this._loading)return this;this._showing=false;if(this._autohide_timeout){clearTimeout(this._autohide_timeout);this._autohide_timeout=null;}if(this._fade_enabled&&Dialog._stack.length<=1){this._fadeOut();}else this._hide();return this;};Dialog.prototype.cancel=function(){'use strict';if(!this._cancelHandler||this._cancelHandler()!==false)this.hide();};Dialog.prototype.getRoot=function(){'use strict';return this._obj;};Dialog.prototype.getBody=function(){'use strict';return DOM.scry(this._obj,'div.dialog_body')[0];};Dialog.prototype.getButtonElement=function(button){'use strict';if(typeof button=='string')button=Dialog._findButton(this._buttons,button);if(!button||!button.name)return null;var inputs=DOM.scry(this._popup,'input'),name_filter=function(elem){return elem.name==button.name;};return inputs.filter(name_filter)[0]||null;};Dialog.prototype.getContentNode=function(){'use strict';return DOM.find(this._content,'div.dialog_content');};Dialog.prototype.getFormData=function(){'use strict';return Form.serialize(this.getContentNode());};Dialog.prototype.setAllowCrossPageTransition=function(allow){'use strict';this._cross_transition=allow;return this;};Dialog.prototype.setAllowCrossQuicklingNavigation=function(allow){'use strict';this._cross_quickling=allow;return this;};Dialog.prototype.setShowing=function(){'use strict';this.show();return this;};Dialog.prototype.setHiding=function(){'use strict';this.hide();return this;};Dialog.prototype.setTitle=function(title){'use strict';var node=this._nodes.title,inner_node=this._nodes.title_inner,content_node=this._nodes.content;DOM.setContent(inner_node,this._format(title||''));CSS.conditionShow(node,!!title);CSS.conditionClass(content_node,'dialog_content_titleless',!title);return this;};Dialog.prototype.setBody=function(body){'use strict';DOM.setContent(this._nodes.body,this._format(body));return this;};Dialog.prototype.setExtraData=function(data){'use strict';this._extra_data=data;return this;};Dialog.prototype.setReturnData=function(data){'use strict';this._return_data=data;return this;};Dialog.prototype.setShowLoading=function(show){'use strict';this._show_loading=show;return this;};Dialog.prototype.setFullBleed=function(is_full_bleed){'use strict';this._full_bleed=is_full_bleed;this._updateWidth();CSS.conditionClass(this._obj,'full_bleed',is_full_bleed);return this;};Dialog.prototype.setCausalElement=function(elem){'use strict';this._causal_elem=elem;return this;};Dialog.prototype.setUserData=function(data){'use strict';this._user_data=data;return this;};Dialog.prototype.getUserData=function(){'use strict';return this._user_data;};Dialog.prototype.setAutohide=function(autohide){'use strict';if(autohide){if(this._showing){this._autohide_timeout=setTimeout(shield(this.hide,this),autohide);}else this._autohide=autohide;}else{this._autohide=null;if(this._autohide_timeout){clearTimeout(this._autohide_timeout);this._autohide_timeout=null;}}return this;};Dialog.prototype.setSummary=function(summary){'use strict';var node=this._nodes.summary;DOM.setContent(node,this._format(summary||''));CSS.conditionShow(node,!!summary);return this;};Dialog.prototype.setButtons=function(b){'use strict';var buttons,button;if(!Array.isArray(b)){buttons=Array.from(arguments);}else buttons=b;for(var i=0;i<buttons.length;++i)if(typeof buttons[i]=='string'){button=Dialog._findButton(Dialog._STANDARD_BUTTONS,buttons[i]);buttons[i]=button;}this._buttons=buttons;var button_content=[];if(buttons&&buttons.length>0)for(var ii=0;ii<buttons.length;ii++){button=buttons[ii];var button_input=DOM.create('input',{type:'button',name:button.name||'',value:button.label}),button_node=DOM.create('label',{className:'uiButton uiButtonLarge uiButtonConfirm'},button_input);if(button.className){button.className.split(/\s+/).forEach(function(e){CSS.addClass(button_node,e);});if(CSS.hasClass(button_node,'inputaux')){CSS.removeClass(button_node,'inputaux');CSS.removeClass(button_node,'uiButtonConfirm');}if(CSS.hasClass(button_node,'uiButtonSpecial'))CSS.removeClass(button_node,'uiButtonConfirm');}if(button.icon)DOM.prependContent(button_node,DOM.create('img',{src:button.icon,className:'img mrs'}));if(button.disabled)Button.setEnabled(button_node,false);Event.listen(button_input,'click',this._handleButton.bind(this,button.name));for(var attr in button)if(attr.indexOf('data-')===0&&attr.length>5)button_input.setAttribute(attr,button[attr]);button_content.push(button_node);}DOM.setContent(this._nodes.buttons,button_content);this._updateButtonVisibility();return this;};Dialog.prototype.setButtonsMessage=function(message){'use strict';DOM.setContent(this._nodes.button_message,this._format(message||''));this._has_button_message=!!message;this._updateButtonVisibility();return this;};Dialog.prototype._updateButtonVisibility=function(){'use strict';var show=this._buttons.length>0||this._has_button_message;CSS.conditionShow(this._nodes.button_wrapper,show);CSS.conditionClass(this._obj,'omitDialogFooter',!show);};Dialog.prototype.setClickButtonOnEnter=function(input_id,button){'use strict';this._clickOnEnterTarget=input_id;if(!this._clickOnEnterListener)this._clickOnEnterListener=Event.listen(this._nodes.body,'keypress',function(event){var target=event.getTarget();if(target&&target.id===this._clickOnEnterTarget)if(Event.getKeyCode(event)==Keys.RETURN){this._handleButton(button);event.kill();}return true;}.bind(this));return this;};Dialog.prototype.setStackable=function(stackable,shown){'use strict';this._is_stackable=stackable;this._shown_while_stacked=stackable&&shown;return this;};Dialog.prototype.setHandler=function(handler){'use strict';this._handler=handler;return this;};Dialog.prototype.setCancelHandler=function(cancelHandler){'use strict';this._cancelHandler=Dialog.call_or_eval.bind(null,this,cancelHandler);return this;};Dialog.prototype.setCloseHandler=function(close_handler){'use strict';this._close_handler=Dialog.call_or_eval.bind(null,this,close_handler);return this;};Dialog.prototype.clearHandler=function(){'use strict';return this.setHandler(null);};Dialog.prototype.setPostURI=function(post_uri,asynchronous){'use strict';if(asynchronous===undefined)asynchronous=true;if(asynchronous){this.setHandler(this._submitForm.bind(this,'POST',post_uri));}else this.setHandler(function(){Form.post(post_uri,this.getFormData());this.hide();}.bind(this));return this;};Dialog.prototype.setGetURI=function(get_uri){'use strict';this.setHandler(this._submitForm.bind(this,'GET',get_uri));return this;};Dialog.prototype.setModal=function(modal){'use strict';this._modal=modal;CSS.conditionClass(this._obj,'generic_dialog_modal',modal);return this;};Dialog.prototype.setSemiModal=function(clickout){'use strict';if(clickout){this.setModal(true);this._semiModalListener=Event.listen(this._obj,'click',function(e){if(!DOM.contains(this._popup,e.getTarget()))this.hide();}.bind(this));}else this._semiModalListener&&this._semiModalListener.remove();this._semi_modal=clickout;return this;};Dialog.prototype.setWideDialog=function(is_wide){'use strict';this._wide_dialog=is_wide;this._updateWidth();return this;};Dialog.prototype.setContentWidth=function(width){'use strict';this._content_width=width;this._updateWidth();return this;};Dialog.prototype.setTitleLoading=function(loading){'use strict';if(loading===undefined)loading=true;var header=DOM.find(this._popup,'h2.dialog_title');if(header)CSS.conditionClass(header,'loading',loading);return this;};Dialog.prototype.setSecure=function(is_secure){'use strict';CSS.conditionClass(this._nodes.title,'secure',is_secure);return this;};Dialog.prototype.setClassName=function(class_name){'use strict';class_name.split(/\s+/).forEach(CSS.addClass.bind(CSS,this._obj));return this;};Dialog.prototype.setFadeEnabled=function(enabled){'use strict';this._fade_enabled=enabled;return this;};Dialog.prototype.setFooter=function(footer){'use strict';var node=this._nodes.footer;DOM.setContent(node,this._format(footer||''));CSS.conditionShow(node,!!footer);return this;};Dialog.prototype.setAutoFocus=function(focus){'use strict';this._auto_focus=focus;return this;};Dialog.prototype.setTop=function(top){'use strict';this._top=top;this._resetDialogObj();return this;};Dialog.prototype.onloadRegister=function(handler){'use strict';createArrayFromMixed(handler).forEach(function(i){if(typeof i=='string')i=new Function(i);this._onload_handlers.push(i.bind(this));}.bind(this));return this;};Dialog.prototype.setAsyncURL=function(url){'use strict';return this.setAsync(new AsyncRequest(url));};Dialog.prototype.setAsync=function(async_request){'use strict';var handler=function(response){if(this._async_request!=async_request)return;this._async_request=null;var payload=response.getPayload(),dialog=payload;if(this._loading)this._showing=true;if(typeof dialog=='string'){this.setBody(dialog);}else this._setFromModel(dialog);this._update();}.bind(this),data=async_request.getData();data.__d=1;async_request.setData(data);var orig_handler=async_request.getHandler()||emptyFunction;async_request.setHandler(function(response){orig_handler(response);handler(response);});var request=async_request,orig_error_handler=request.getErrorHandler()||emptyFunction,orig_trans_error_handler=request.getTransportErrorHandler()||emptyFunction,handle_error=function(){this._async_request=null;this._loading=false;if(this._showing&&this._shown_while_stacked){this._update();}else this._hide(this._is_stackable);}.bind(this),server_cancel_handler=request.getServerDialogCancelHandler()||handle_error;request.setAllowCrossPageTransition(this._cross_transition).setErrorHandler(function(response){handle_error();orig_error_handler(response);}).setTransportErrorHandler(function(response){handle_error();orig_trans_error_handler(response);}).setServerDialogCancelHandler(server_cancel_handler);async_request.send();this._async_request=async_request;if(this._showing)this.show();return this;};Dialog.prototype._format=function(content){'use strict';if(typeof content=='string'){content=HTML(content);}else content=HTML.replaceJSONWrapper(content);if(content instanceof HTML)content.setDeferred(true);return content;};Dialog.prototype._update=function(){'use strict';if(!this._showing)return;if(this._autohide&&!this._async_request&&!this._autohide_timeout)this._autohide_timeout=setTimeout(bind(this,'hide'),this._autohide);CSS.removeClass(this._frame,'dialog_loading_shown');this._loading=false;this._renderDialog();this._runOnloads();this._previous_focus=document.activeElement;Focus.set(this._frame);};Dialog.prototype._runOnloads=function(){'use strict';for(var i=0;i<this._onload_handlers.length;++i)try{this._onload_handlers[i]();}catch(ex){}this._onload_handlers=[];};Dialog.prototype._updateWidth=function(){'use strict';var dialog_width=2*(Dialog._BORDER_WIDTH+Dialog._HALO_WIDTH);if(this._content_width){dialog_width+=this._content_width;if(!this._full_bleed)dialog_width+=2*Dialog._PADDING_WIDTH;}else if(this._wide_dialog){dialog_width+=Dialog.SIZE.WIDE;}else dialog_width+=Dialog.SIZE.STANDARD;this._popup.style.width=dialog_width+'px';};Dialog.prototype._updateZIndex=function(){'use strict';if(!this._hasSetZIndex&&this._causal_elem){var z_index=getOverlayZIndex(this._causal_elem),node=this._causal_elem;while(!z_index&&(node=ContextualThing.getContext(node)))z_index=getOverlayZIndex(node);this._hasSetZIndex=z_index>(this._modal?400:200);Style.set(this._obj,'z-index',this._hasSetZIndex?z_index:'');}};Dialog.prototype._renderDialog=function(){'use strict';this._updateZIndex();this._pushOntoStack();this._obj.style.height=null;if(this._obj&&this._obj.style.display){this._obj.style.visibility='hidden';this._obj.style.display='';this.resetDialogPosition();this._obj.style.visibility='';this._obj.dialog=this;}else this.resetDialogPosition();clearInterval(this.active_hiding);this.active_hiding=setInterval(this._activeResize.bind(this),500);this._submit_on_enter=false;if(this._auto_focus){var input=Form.getFirstElement(this._content,['input[type="text"]','textarea','input[type="password"]']);if(input){setTimeout(Form.focusFirst.bind(this,this._content),0);}else this._submit_on_enter=true;}var bottom=Vector.getElementDimensions(this._content).y+Vector.getElementPosition(this._content).y;Dialog._bottoms.push(bottom);this._bottom=bottom;Dialog._updateMaxBottom();return this;};Dialog.prototype._buildDialog=function(){'use strict';this._obj=DOM.create('div',{className:'generic_dialog',id:this._uniqueID});this._obj.style.display='none';DOM.appendContent(document.body,this._obj);if(!this._popup)this._popup=DOM.create('div',{className:'generic_dialog_popup'});this._obj.appendChild(this._popup);CSS.addClass(this._obj,'pop_dialog');if(Locale.isRTL())CSS.addClass(this._obj,'pop_dialog_rtl');DOM.setContent(this._popup,DOM.create('div',{className:'pop_container_advanced'},DOM.create('div',{className:'pop_content',id:'pop_content'})));var frame=DOM.find(this._popup,'div.pop_content');frame.setAttribute('tabIndex','0');frame.setAttribute('role','alertdialog');this._frame=this._content=frame;var loading=DOM.create('div',{className:'dialog_loading'},fbt._("\u0110ang t\u1ea3i...")),title_inner=DOM.create('span'),title=DOM.create('h2',{className:'dialog_title hidden_elem',id:'title_'+this._uniqueID},title_inner),summary=DOM.create('div',{className:'dialog_summary hidden_elem'}),body=DOM.create('div',{className:'dialog_body'}),buttons=DOM.create('div',{className:'rfloat mlm'}),button_message=DOM.create('div',{className:'dialog_buttons_msg'}),button_wrapper=DOM.create('div',{className:'dialog_buttons clearfix hidden_elem'},[buttons,button_message]),footer=DOM.create('div',{className:'dialog_footer hidden_elem'}),content=DOM.create('div',{className:'dialog_content'},[summary,body,button_wrapper,footer]);this._nodes={summary:summary,body:body,buttons:buttons,button_message:button_message,button_wrapper:button_wrapper,footer:footer,content:content,title:title,title_inner:title_inner};DOM.setContent(this._frame,[title,content,loading]);};Dialog.prototype._activeResize=function(){'use strict';if(this.last_offset_height!=this._content.offsetHeight){this.last_offset_height=this._content.offsetHeight;this.resetDialogPosition();}};Dialog.prototype.resetDialogPosition=function(){'use strict';if(!this._popup)return;this._resetDialogObj();};Dialog.prototype._resetDialogObj=function(){'use strict';var total_margin=2*Dialog._PAGE_MARGIN,viewport_dimensions=Vector.getViewportDimensions(),viewport_width=viewport_dimensions.x-total_margin,viewport_height=viewport_dimensions.y-total_margin,total_halo_width=2*Dialog._HALO_WIDTH,content_dimensions=Vector.getElementDimensions(this._content),content_width=content_dimensions.x+total_halo_width,content_height=content_dimensions.y+total_halo_width,top=this._top,empty_horiz_space=viewport_width-content_width,empty_vertical_space=viewport_height-content_height;if(empty_vertical_space<0){top=Dialog._PAGE_MARGIN;}else if(top>empty_vertical_space)top=Dialog._PAGE_MARGIN+Math.max(empty_vertical_space,0)/2;var is_fixed=_supportsPositionFixed();if(!is_fixed)top+=Vector.getScrollPosition().y;Style.set(this._popup,'marginTop',top+'px');var scroll=is_fixed&&(empty_horiz_space<0||empty_vertical_space<0);CSS.conditionClass(this._obj,'generic_dialog_fixed_overflow',scroll);CSS.conditionClass(document.documentElement,'generic_dialog_overflow_mode',scroll);};Dialog.prototype._fadeOut=function(temporary){'use strict';if(!this._popup)return;try{new Animation(this._obj).duration(0).checkpoint().to('opacity',0).hide().duration(250).ondone(this._hide.bind(this,temporary)).go();}catch(e){this._hide(temporary);}};Dialog.prototype._hide=function(temporary){'use strict';if(this._obj)this._obj.style.display='none';CSS.removeClass(document.documentElement,'generic_dialog_overflow_mode');clearInterval(this.active_hiding);if(this._bottom){var bs=Dialog._bottoms;bs.splice(bs.indexOf(this._bottom),1);Dialog._updateMaxBottom();}if(this._previous_focus&&document.activeElement&&DOM.contains(this._obj,document.activeElement))Focus.set(this._previous_focus);if(temporary)return;this.destroy();};Dialog.prototype.destroy=function(){'use strict';this._popFromStack();clearInterval(this.active_hiding);if(this._obj){DOM.remove(this._obj);this._obj=null;}this._clickOnEnterListener&&this._clickOnEnterListener.remove();if(this._close_handler)this._close_handler({return_data:this._return_data});};Dialog.prototype._handleButton=function(button){'use strict';if(typeof button=='string')button=Dialog._findButton(this._buttons,button);var value=Dialog.call_or_eval(button,button.handler);if(value===false)return;if(button.name=='cancel'){this.cancel();}else if(Dialog.call_or_eval(this,this._handler,{button:button})!==false)this.hide();};Dialog.prototype._submitForm=function(method,uri,button){'use strict';var data=this.getFormData();if(button)data[button.name]=button.name;if(this._extra_data)Object.assign(data,this._extra_data);var async_request=new AsyncRequest().setURI(uri).setData(data).setMethod(method).setNectarModuleDataSafe(this._causal_elem).setReadOnly(method=='GET');this.setAsync(async_request);return false;};Dialog.prototype._setFromModel=function(original_model){'use strict';var model={};Object.assign(model,original_model);for(var propertyName in model){if(propertyName=='onloadRegister'){this.onloadRegister(model[propertyName]);continue;}var mutator=this['set'+propertyName.substr(0,1).toUpperCase()+propertyName.substr(1)];mutator.apply(this,createArrayFromMixed(model[propertyName]));}};Dialog.prototype._updateBottom=function(){'use strict';var bottom=Vector.getElementDimensions(this._content).y+Vector.getElementPosition(this._content).y;Dialog._bottoms[Dialog._bottoms.length-1]=bottom;Dialog._updateMaxBottom();};Dialog.prototype._pushOntoStack=function(){'use strict';var stack=Dialog._stack;if(!stack.length)Arbiter.inform('layer_shown',{type:'Dialog'});removeFromArray(stack,this);stack.push(this);for(var i=stack.length-2;i>=0;i--){var prev_dialog=stack[i];if(!prev_dialog._is_stackable&&!prev_dialog._async_request){prev_dialog._hide();}else if(!prev_dialog._shown_while_stacked)prev_dialog._hide(true);}};Dialog.prototype._popFromStack=function(){'use strict';var stack=Dialog._stack,was_top=stack[stack.length-1]===this;removeFromArray(stack,this);if(stack.length){if(was_top)stack[stack.length-1].show();}else Arbiter.inform('layer_hidden',{type:'Dialog'});};Dialog._updateMaxBottom=function(){'use strict';Dialog.max_bottom=Math.max.apply(Math,Dialog._bottoms);};Dialog.newButton=function(name,label,className,handler){'use strict';var button={name:name,label:label};if(className)button.className=className;if(handler)button.handler=handler;return button;};Dialog.getCurrent=function(){'use strict';var stack=Dialog._stack;return stack.length?stack[stack.length-1]:null;};Dialog.hideCurrent=function(){'use strict';var dialog=Dialog.getCurrent();dialog&&dialog.hide();};Dialog.bootstrap=function(uri,data,read_only,method,model,elem){'use strict';data=data||{};Object.assign(data,new URI(uri).getQueryData());method=method||(read_only?'GET':'POST');var status_elem=Parent.byClass(elem,'stat_elem')||elem;if(status_elem&&CSS.hasClass(status_elem,'async_saving'))return false;var request=new AsyncRequest().setReadOnly(!!read_only).setMethod(method).setRelativeTo(elem).setStatusElement(status_elem).setURI(uri).setNectarModuleDataSafe(elem).setData(data),dialog=new Dialog(model).setCausalElement(elem).setAsync(request);dialog.show();return false;};Dialog.showFromModel=function(model,causal_element){'use strict';var dialog=new Dialog(model).setCausalElement(causal_element).show();if(model.hiding)dialog.hide();};Dialog._init=function(){'use strict';this._init=emptyFunction;Run.onLeave(shield(Dialog._tearDown,null,false));Arbiter.subscribe('page_transition',shield(Dialog._tearDown,null,true));Event.listen(document.documentElement,'keydown',function(event){if(Event.getKeyCode(event)==Keys.ESC&&!event.getModifiers().any){if(Dialog._escape())event.kill();}else if(Event.getKeyCode(event)==Keys.RETURN&&!event.getModifiers().any)if(Dialog._enter())event.kill();});Event.listen(window,'resize',function(event){var dialog=Dialog.getCurrent();dialog&&dialog._resetDialogObj();});};Dialog._findButton=function(buttons,name){'use strict';if(buttons)for(var i=0;i<buttons.length;++i)if(buttons[i].name==name)return buttons[i];return null;};Dialog._tearDown=function(is_page_transition){'use strict';var stack=Dialog._stack.slice();for(var ii=stack.length-1;ii>=0;ii--)if(is_page_transition&&!stack[ii]._cross_transition||!is_page_transition&&!stack[ii]._cross_quickling)stack[ii].hide();};Dialog._escape=function(){'use strict';var dialog=Dialog.getCurrent();if(!dialog)return false;var semi_modal=dialog._semi_modal,buttons=dialog._buttons;if(!buttons.length&&!semi_modal)return false;if(semi_modal&&!buttons.length){dialog.hide();return true;}var button_to_simulate,cancel_button=Dialog._findButton(buttons,'cancel');if(dialog._cancelHandler){dialog.cancel();return true;}else if(cancel_button){button_to_simulate=cancel_button;}else if(buttons.length==1){button_to_simulate=buttons[0];}else return false;dialog._handleButton(button_to_simulate);return true;};Dialog._enter=function(){'use strict';var dialog=Dialog.getCurrent();if(!dialog||!dialog._submit_on_enter)return false;if(document.activeElement!=dialog._frame)return false;var buttons=dialog._buttons;if(!buttons)return false;dialog._handleButton(buttons[0]);return true;};Dialog.call_or_eval=function(obj,func,args){'use strict';if(!func)return undefined;args=args||{};if(typeof func=='string'){var params=Object.keys(args).join(', ');func=eval('({f: function('+params+') { '+func+'}})').f;}return func.apply(obj,getObjectValues(args));};Object.assign(Dialog,{OK:{name:'ok',label:fbt._("\u0110\u1ed3ng \u00fd")},CANCEL:{name:'cancel',label:fbt._("H\u1ee7y"),className:'inputaux'},CLOSE:{name:'close',label:fbt._("\u0110\u00f3ng")},NEXT:{name:'next',label:fbt._("Ti\u1ebfp")},SAVE:{name:'save',label:fbt._("L\u01b0u")},SUBMIT:{name:'submit',label:fbt._("G\u1eedi")},CONFIRM:{name:'confirm',label:fbt._("X\u00e1c nh\u1eadn")},DELETE:{name:'delete',label:fbt._("X\u00f3a")},_globalCount:0,_bottoms:[0],max_bottom:0});Object.assign(Dialog,{OK_AND_CANCEL:[Dialog.OK,Dialog.CANCEL],_STANDARD_BUTTONS:[Dialog.OK,Dialog.CANCEL,Dialog.CLOSE,Dialog.SAVE,Dialog.SUBMIT,Dialog.CONFIRM,Dialog.DELETE],SIZE:{WIDE:555,STANDARD:445},_HALO_WIDTH:10,_BORDER_WIDTH:1,_PADDING_WIDTH:10,_PAGE_MARGIN:40,_stack:[]});Object.assign(Dialog.prototype,{_cross_quickling:false,_cross_transition:false,_loading:false,_showing:false});module.exports=Dialog;global.Dialog=Dialog;},null);
__d('FullScreen',['Event','Arbiter','CSS','UserAgent','UserAgent_DEPRECATED','throttle','Keys'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n){if(c.__markCompiled)c.__markCompiled();var o={},p=false,q=function(v){if(h.getKeyCode(v)===n.ESC)v.stopPropagation();},r=function(){if(!p){document.addEventListener('keydown',q,true);p=true;}},s=function(){if(p){document.removeEventListener('keydown',q,true);p=false;}},t=Object.assign(new i(),{listenForEvent:function(v){var w=m(this.onChange,0,this);if(!o[v.id]){o[v.id]=true;h.listen(v,{webkitfullscreenchange:w,mozfullscreenchange:w,MSFullscreenChange:w,fullscreenchange:w});}},enableFullScreen:function(v){this.listenForEvent(v);if(v.webkitRequestFullScreen){if(l.chrome()){v.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);}else v.webkitRequestFullScreen();}else if(v.mozRequestFullScreen){v.mozRequestFullScreen();}else if(v.msRequestFullscreen){r();v.msRequestFullscreen();}else if(v.requestFullScreen){v.requestFullScreen();}else return false;return true;},disableFullScreen:function(){if(document.webkitCancelFullScreen){document.webkitCancelFullScreen();}else if(document.mozCancelFullScreen){document.mozCancelFullScreen();}else if(document.msExitFullscreen){document.msExitFullscreen();}else if(document.cancelFullScreen){document.cancelFullScreen();}else if(document.exitFullScreen){document.exitFullScreen();}else return false;return true;},isFullScreen:function(){return document.webkitIsFullScreen||document.fullScreen||document.mozFullScreen||document.msFullscreenElement;},toggleFullScreen:function(v){if(this.isFullScreen()){this.disableFullScreen();return false;}else return this.enableFullScreen(v);return false;},onChange:function(){var v=this.isFullScreen();j.conditionClass(document.body,'fullScreen',v);this.inform('changed');if(!v)s();},isSupportedWithKeyboardInput:function(){return this.isSupported()&&!k.isBrowser('Safari');},isSupported:function(){var v=document.webkitFullscreenEnabled||document.mozFullScreenEnabled||document.msFullscreenEnabled||document.fullscreenEnabled;return v||document.webkitCancelFullScreen||document.mozCancelFullScreen||document.msExitFullscreen||document.cancelFullScreen||document.exitFullScreen;}}),u=m(t.onChange,0,t);h.listen(document,{webkitfullscreenchange:u,mozfullscreenchange:u,MSFullscreenChange:u,fullscreenchange:u});f.exports=t;},null);
__d('HistoryManager',['Cookie','Env','Event','URI','UserAgent_DEPRECATED','isFacebookURI','emptyFunction','goOrReplace','isInIframe','setIntervalAcrossTransitions','SessionName'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){if(c.__markCompiled)c.__markCompiled();c('SessionName');var r={history:null,current:0,fragment:null,isInitialized:function(){return !!r._initialized;},init:function(){if(!i.ALLOW_TRANSITION_IN_IFRAME&&p())return;if(r._initialized)return r;var s=new k(window.location.href),t=s.getFragment()||'';if(t.charAt(0)==='!'){t=t.substr(1);s.setFragment(t);}Object.assign(r,{_initialized:true,fragment:t,orig_fragment:t,history:[s],callbacks:[],lastChanged:Date.now(),canonical:new k('#'),user:0,enabled:true,debug:n});if(window.history&&history.pushState){this.lastURI=document.URL;window.history.replaceState(this.lastURI,null);j.listen(window,'popstate',function(u){var v=u&&u.state&&typeof u.state==='string';if(v&&r.lastURI!=u.state){r.lastURI=u.state;r.lastChanged=Date.now();r.notify(new k(u.state).getUnqualifiedURI().toString());}}.bind(r));if(l.webkit()<534||l.chrome()<=13){q(r.checkURI,42);r._updateRefererURI(this.lastURI);}return r;}r._updateRefererURI(k.getRequestURI(false));if(l.webkit()<500||l.firefox()<2){r.enabled=false;return r;}if('onhashchange' in window){j.listen(window,'hashchange',function(){setTimeout(r.checkURI.bind(r),0);});}else q(r.checkURI,42);return r;},registerURIHandler:function(s){r.callbacks.push(s);return r;},setCanonicalLocation:function(s){r.canonical=new k(s);return r;},notify:function(s){if(s==r.orig_fragment)s=r.canonical.getFragment();for(var t=0;t<r.callbacks.length;t++)try{if(r.callbacks[t](s))return true;}catch(u){}return false;},checkURI:function(){if(Date.now()-r.lastChanged<400)return;if(window.history&&history.pushState){var s=new k(document.URL).removeQueryData('ref').toString(),t=new k(r.lastURI).removeQueryData('ref').toString();if(s!=t){r.lastChanged=Date.now();r.lastURI=s;if(l.webkit()<534)r._updateRefererURI(s);r.notify(new k(s).getUnqualifiedURI().toString());}return;}if(l.webkit()&&window.history.length==200){if(!r.warned)r.warned=true;return;}var u=new k(window.location.href).getFragment();if(u.charAt(0)=='!')u=u.substr(1);u=u.replace(/%23/g,'#');if(u!=r.fragment.replace(/%23/g,'#')){r.debug([u,' vs ',r.fragment,'whl: ',window.history.length,'QHL: ',r.history.length].join(' '));for(var v=r.history.length-1;v>=0;--v)if(r.history[v].getFragment().replace(/%23/g,'#')==u)break;++r.user;if(v>=0){r.go(v-r.current);}else r.go('#'+u);--r.user;}},_updateRefererURI:function(s){s=s.toString();if(s.charAt(0)!='/'&&s.indexOf('//')==-1)return;var t=new k(window.location);if(m(t)){var u=t.getPath()+window.location.search;}else var u='';var v=new k(s).getQualifiedURI().setFragment(u).toString(),w=2048;if(v.length>w)v=v.substring(0,w)+'...';h.set('x-referer',v);},go:function(s,t,u){if(window.history&&history.pushState){t||typeof s=='number';var v=new k(s).removeQueryData('ref').toString();r.lastChanged=Date.now();this.lastURI=v;if(u){window.history.replaceState(s,null,v);}else window.history.pushState(s,null,v);if(l.webkit()<534)r._updateRefererURI(s);return false;}r.debug('go: '+s);if(t===undefined)t=true;if(!r.enabled)if(!t)return false;if(typeof s=='number'){if(!s)return false;var w=s+r.current,x=Math.max(0,Math.min(r.history.length-1,w));r.current=x;w=r.history[x].getFragment()||r.orig_fragment;w=new k(w).removeQueryData('ref').getUnqualifiedURI().toString();r.fragment=w;r.lastChanged=Date.now();if(!r.user)o(window.location,window.location.href.split('#')[0]+'#!'+w,u);if(t)r.notify(w);r._updateRefererURI(w);return false;}s=new k(s);if(s.getDomain()==new k(window.location.href).getDomain())s=new k('#'+s.getUnqualifiedURI());var y=r.history[r.current].getFragment(),z=s.getFragment();if(z==y||y==r.orig_fragment&&z==r.canonical.getFragment()){if(t)r.notify(z);r._updateRefererURI(z);return false;}if(u)r.current--;var aa=r.history.length-r.current-1;r.history.splice(r.current+1,aa);r.history.push(new k(s));return r.go(1,t,u);},getCurrentFragment:function(){var s=k.getRequestURI(false).getFragment();return s==r.orig_fragment?r.canonical.getFragment():s;}};f.exports=r;},null);
__d('PageTransitions',['Arbiter','Bootloader','DOMQuery','DOMScroll','Env','Event','HistoryManager','JSLogger','LayerHideOnEscape','ModalLayer','PageHooks','PageTransitionsConfig','PageTransitionsRegistrar','React','ScriptPath','URI','Vector','areEqual','clickRefAction','escapeJSQuotes','ge','goOrReplace','invariant','isInIframe','fbt'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,ba,ca,da,ea,fa){if(c.__markCompiled)c.__markCompiled();var ga={};function ha(la,ma){ga[la.getUnqualifiedURI()]=ma;}function ia(la){return ga[la.getUnqualifiedURI()];}function ja(la){delete ga[la.getUnqualifiedURI()];}var ka={_scroll_locked:false,_transitions_disabled:false,isInitialized:function(){return !!ka._initialized;},_init:function(){if(!l.ALLOW_TRANSITION_IN_IFRAME&&ea())return;if(ka._initialized)return ka;var la=t.getMostRecentURI();ka._current_uri=la;ka._most_recent_uri=la;ka._next_uri=la;ka._initialized=true;var ma,na=w.getRequestURI(false);if(na.getFragment().startsWith('/')){ma=na.getFragment();}else ma=la;n.init().setCanonicalLocation('#'+ma).registerURIHandler(ka._historyManagerHandler);m.listen(window,'scroll',function(){if(!ka._scroll_locked)ha(ka._current_uri,x.getScrollPosition());});return ka;},registerHandler:t.registerHandler,removeHandler:t.removeHandler,getCurrentURI:function(la){this._init();if(!ka._current_uri&&!la)return new w(ka._most_recent_uri);return new w(ka._current_uri);},getMostRecentURI:function(){this._init();return new w(ka._most_recent_uri);},go:function(la,ma){this._init();var na=new w(la).removeQueryData('quickling').getQualifiedURI();o.create('pagetransition').debug('go',{uri:na.toString()});ja(na);!ma&&z('uri',{href:na.toString()},null,'INDIRECT');ka._loadPage(na,function(oa){if(oa){q.unfixed(function(){n.go(na.toString(),false,ma);});}else ca(window.location,na,ma);});},_historyManagerHandler:function(la){if(la.charAt(0)!='/')return false;z('h',{href:la});if(!v.getClickPointInfo())v.setClickPointInfo({click:'back'});ka._loadPage(new w(la),function(ma){if(!ma)ca(window.location,la,true);});return true;},_loadPage:function(la,ma){if(new w(la).getFragment()&&y(new w(la).setFragment(null).getQualifiedURI(),new w(ka._current_uri).setFragment(null).getQualifiedURI())){h.inform("pre_page_fragment_transition",{from:new w(ka._current_uri).getFragment(),to:new w(la).getFragment()});if(ka.restoreScrollPosition(la)){ka._current_uri=ka._most_recent_uri=la;h.inform("page_fragment_transition",{fragment:new w(la).getFragment()});return;}}var na;if(ka._current_uri)na=ia(ka._current_uri);var oa=function(){if(na&&ka._current_uri)ha(ka._current_uri,na);ka._current_uri=null;ka._next_uri=la;if(na)k.scrollTo(na,false);ka._scroll_locked=true;var ra=ka._handleTransition(la);ma&&ma(ra);},pa=ka._next_uri;ka._next_uri=la;var qa=r.runHooks('onbeforeleavehooks');ka._next_uri=pa;if(qa){ka._warnBeforeLeaving(qa,oa);}else oa();},_handleTransition:function(la){window.onbeforeleavehooks=undefined;if(ka._transitions_disabled||!la.isSameOrigin())return false;var ma=s.reloadOnBootloadError&&this._hasBootloadErrors();if(ma)return false;var na,oa=b.AsyncRequest;if(oa)na=oa.getLastID();h.inform("pre_page_transition",{from:ka.getMostRecentURI(),to:la});var pa=t._getTransitionHandlers();for(var qa=pa.length-1;qa>=0;--qa){var ra=pa[qa];if(!ra)continue;for(var sa=ra.length-1;sa>=0;--sa)if(ra[sa](la)===true){var ta={sender:this,uri:la,id:na};try{h.inform("page_transition",ta);}catch(ua){}return true;}else ra.splice(sa,1);}return false;},disableTransitions:function(){ka._transitions_disabled=true;},_hasBootloadErrors:function(){return i.getErrorUrls().length>0;},unifyURI:function(){this._init();ka._current_uri=ka._most_recent_uri=ka._next_uri;},transitionComplete:function(la){this._init();ka._scroll_locked=false;ka._executeCompletionCallbacks();ka.unifyURI();if(!la)ka.restoreScrollPosition(ka._current_uri);try{if(document.activeElement&&document.activeElement.nodeName==='A')document.activeElement.blur();}catch(ma){}},_executeCompletionCallbacks:function(){var la=t._getCompletionCallbacks();if(la.length>0){t._resetCompletionCallbacks();la.forEach(function(ma){return ma();});}},registerCompletionCallback:t.registerCompletionCallback,rewriteCurrentURI:function(la,ma){this._init();var na=t._getTransitionHandlers(),oa=na.length||1,pa=false;t.registerHandler(function(){if(la==ka.getMostRecentURI().getUnqualifiedURI().toString()){ka.transitionComplete();return true;}pa=true;},oa);ka.go(ma,true);!(na.length===oa+1&&na[oa].length===(pa?0:1))?da(0):undefined;na.length=oa;},_warnBeforeLeaving:function(la,ma){i.loadModules(["DialogX","XUIDialogTitle.react","XUIDialogBody.react","XUIDialogButton.react","XUIDialogFooter.react","XUIGrayText.react"],function(na,oa,pa,qa,ra,sa){var ta=new na({width:450,addedBehaviors:[p]},u.createElement('div',null,u.createElement(oa,{showCloseButton:false},fa._("R\u1eddi kh\u1ecfi trang?")),u.createElement(pa,null,u.createElement(sa,{shade:'medium',size:'medium'},la)),u.createElement(ra,null,u.createElement(qa,{action:'cancel',label:fa._("\u1ede l\u1ea1i trang n\u00e0y")}),u.createElement(qa,{action:'confirm',use:'confirm',label:fa._("R\u1eddi kh\u1ecfi trang n\u00e0y")}))));ta.subscribe('confirm',function(){ta.hide();ma();});ta.show();});},restoreScrollPosition:function(la){var ma=ia(la);if(ma){k.scrollTo(ma,false);return true;}function na(qa){if(!qa)return null;var ra="a[name='"+aa(qa)+"']";return j.scry(document.body,ra)[0]||ba(qa);}var oa=na(new w(la).getFragment());if(oa){var pa=x.getElementPosition(oa);pa.x=0;k.scrollTo(pa);return true;}return false;}};f.exports=ka;b.PageTransitions=ka;},null);
__d("XEventCreateDialogController",["XController"],function a(b,c,d,e,f,g){c.__markCompiled&&c.__markCompiled();f.exports=c("XController").create("\/ajax\/events\/create\/",{acontext:{type:"String",required:true},invite_ids:{type:"IntVector"},default_privacy_event_type:{type:"Enum",defaultValue:"private_event",enumType:1},default_theme_id:{type:"Int"},default_title:{type:"String"},default_start_time:{type:"Int"},__asyncDialog:{type:"Int"}});},null);