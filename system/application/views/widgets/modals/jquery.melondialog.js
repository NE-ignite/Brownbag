(function( $ ) {
	
	var defaults = {
			data: null,
			select: null,
			modal: true,
			urlroot: '',
			selected: null,
			title: 'Choose a Scalar reader interface',
			msg: '<small>We\'ve updated Scalar\'s reader interface with a clean new design and lots of new features. This "2.0" interface will soon become the default for all new Scalar books, so we encourage you to give it a try now!<br><br>You can switch your existing Scalar books back and forth between the two interfaces as much as you like, though some reformatting may be required.</small>',
			width: 800,
			height: 700
	};  	
	
    $.fn.melondialog = function(options) {
    	
    	// Options
    	var $this = $(this);
    	opts = $.extend( {}, defaults, options );
    	
    	// Ok/cancel
    	opts['buttons'] = [ 
    	  	{ text: "Continue", class: "generic_button default", click: function() { 
    	  		var selected = $(this).find(':checked').val();
    	  		$(opts.select).val(selected).trigger('change');
    	  		$this.dialog('destroy');
    	  		$this.remove();
    	  	} },
    	  	{ text: "Cancel", class: "generic_button", click: function() { $this.dialog( "destroy" ); $this.remove(); } }
    	];
    	
    	// Structure
    	$this.addClass('melondialog');
    	$('<p>'+opts.msg+'</p>').appendTo($this);
    	var $table = $('<table><tbody><tr></tr></tbody></table>').appendTo($this);
    	
    	// List of melons
    	for (var j = 0; j < opts.data.length; j++) {
    		if (!opts.data[j]['meta']['is_selectable']) continue;
    		var $cell = $('<td></td>').appendTo($table.find('tr'));
            var $radio = $('<p><input id="cb_'+j+'" type="radio" name="template" value="'+opts.data[j]['meta']['slug']+'" /><label for="cb_'+j+'"> '+opts.data[j]['meta']['name']+'</label></p>').appendTo($cell);
   		    var $img = $('<img style="border: 1px solid #aaa;" src="'+opts.urlroot+opts.data[j]['meta']['thumb_app_path']+'" />').appendTo($cell);
    		$('<p><small>'+opts.data[j]['meta']['description']+'</small></p>').appendTo($cell);
    		if (opts.selected==opts.data[j]['meta']['slug']) $radio.find('input').prop('checked', true);
    		$img.click(function() {
    			$(this).parent().find('input[type="radio"]').prop('checked', true);
    		});
    	}
    	
    	// Hand over to jQuery UI
    	$this.dialog(opts);
    	
    };
    
}( jQuery ));