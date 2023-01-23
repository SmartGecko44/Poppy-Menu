let Main = imports.ui.main,
	PanelMenu = imports.ui.panelMenu,
	PopupMenu = imports.ui.popupMenu,
	GObject = imports.gi.GObject,
	St = imports.gi.St,
	Lang = imports.lang,
	Util = imports.misc.util;

function _aboutThisPoppy() {
	Util.spawn(['gnome-control-center', 'info-overview']);
}

function _softwareUpdate() {
	Util.spawn(['gnome-terminal --sudo apt update -y && sudo apt upgrade']);
}

function _appStore() {
	Util.spawn(['gnome-software']);
}

function _missionControl() {
	Main.overview.toggle();
}

function _systemPreferences() {
	Util.spawn(['gnome-control-center']);
}

function _forceQuit() {
	Util.spawn(['xkill']);
}

function _sleep() {
	Util.spawn(['systemctl', 'suspend']);
}

function _restart() {
	Util.spawn(['gnome-session-quit', '--reboot']);
}

function _shutdown() {
	Util.spawn(['gnome-session-quit', '--power-off']);
}

function _logOut() {
	Util.spawn(['gnome-session-quit', '--logout']);
}

class PoppyButton extends PanelMenu.Button {
	static {
		GObject.registerClass(this);
	}

	constructor() {
		super(1, null, false);

		this.icon = new St.Icon({
		//	icon_name = 'appointment-soon-symbolic',
			style_class: 'poppy-button'
		});

		this.actor.add_actor(this.icon);

		this.item1 = new PopupMenu.PopupMenuItem('About');
		this.item1.connect('activate', Lang.bind(this, _aboutThisPoppy));
		this.menu.addMenuItem(this.item1);

		this.item2 = new PopupMenu.PopupMenuItem('Software Update...');
		this.item2.connect('activate', Lang.bind(this, _softwareUpdate));
		this.menu.addMenuItem(this.item2);
		
		this.item3 = new PopupMenu.PopupMenuItem('App Store...');
		this.item3.connect('activate', Lang.bind(this, _appStore));
		this.menu.addMenuItem(this.item3);
		
		this.item4 = new PopupMenu.PopupSeparatorMenuItem();
		this.menu.addMenuItem(this.item4);
		
		this.item5 = new PopupMenu.PopupMenuItem('Mission Control...');
		this.item5.connect('activate', Lang.bind(this, _missionControl));
		this.menu.addMenuItem(this.item5);
		
		this.item6 = new PopupMenu.PopupMenuItem('System Preferences...');
		this.item6.connect('activate', Lang.bind(this, _systemPreferences));
		this.menu.addMenuItem(this.item6);
		
		this.item7 = new PopupMenu.PopupSeparatorMenuItem();
		this.menu.addMenuItem(this.item7);
		
		this.item8 = new PopupMenu.PopupMenuItem('Force Quit...');
		this.item8.connect('activate', Lang.bind(this, _forceQuit));
		this.menu.addMenuItem(this.item8);
		
		this.item9 = new PopupMenu.PopupSeparatorMenuItem();
		this.menu.addMenuItem(this.item9);
		
		this.item10 = new PopupMenu.PopupMenuItem('Sleep');
		this.item10.connect('activate', Lang.bind(this, _sleep));
		this.menu.addMenuItem(this.item10);
		
		this.item11 = new PopupMenu.PopupMenuItem('Restart...');
		this.item11.connect('activate', Lang.bind(this, _restart));
		this.menu.addMenuItem(this.item11);
		
		this.item12 = new PopupMenu.PopupMenuItem('Shut Down...');
		this.item12.connect('activate', Lang.bind(this, _shutdown));
		this.menu.addMenuItem(this.item12);
		
		this.item13 = new PopupMenu.PopupSeparatorMenuItem();
		this.menu.addMenuItem(this.item13);
		
		this.item14 = new PopupMenu.PopupMenuItem('Log Out...');
		this.item14.connect('activate', Lang.bind(this, _logOut));
		this.menu.addMenuItem(this.item14);
	}
}

function enable() {
	Main.panel.statusArea.activities?.hide();
	Main.panel.addToStatusArea('poppyButton', new PoppyButton(), 0, 'left');
}

function disable() {
	Main.panel.statusArea.activities?.show();
	Main.panel.statusArea.poppyButton.destroy();
}
