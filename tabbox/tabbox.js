
xtag.register('x-tabbox', {
	events: {
		'tap:delegate(x-tab)': function(event){
			this.selectTab();
		},
		'keydown:delegate(x-tab)': function(event){
			switch(event.keyCode) {
				case 13: this.selectTab(); break;
				case 37: this.parentNode.previousTab(); break;
				case 39: this.parentNode.nextTab(); break;
			}
		}
	}
});

xtag.register('x-tabs', {
	methods: {
		getSelectedIndex: function(){
			var tabs = xtag.query(this, 'x-tab');
			return tabs.indexOf(this.getSelectedTab());
		},
		getSelectedTab: function(){
			return xtag.query(this, 'x-tab[selected="true"]')[0];
		},
		nextTab: function(){
			var tab = this.getSelectedTab();
			if (tab) (tab.nextElementSibling || this.firstElementChild).selectTab();
		},
		previousTab: function(){
			var tab = this.getSelectedTab();
			if (tab) (tab.previousElementSibling || this.lastElementChild).selectTab();
		}
	}
});


xtag.register('x-tab', {
	onCreate: function(){
		this.setAttribute('tabindex', 0);
	},
	methods: {
		selectTab: function(){
			this.focus();
			var tabs = xtag.query(this.parentNode, 'x-tab'),
				index = tabs.indexOf(this);
			tabs.forEach(function(el){
				el.setAttribute('selected', el == this ? true : '');
			}, this);
			xtag.query(this.parentNode.parentNode, 'x-tabpanels > *').forEach(function(el, i, array){
				el.setAttribute('selected', el == array[index] ? true : '');
			});
		}
	}
});
