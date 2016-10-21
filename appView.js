define(function (require) {
    'use strict';

    const
        ModuleView = require('common/platform/ModuleView'),
        Dialog = require('common/ui/Dialog'),
        DialogConfig = require('common/ui/dialogs/DialogConfig'),
        Button = require('common/ui/Button');

    function doKeyboard(params = {}) {
        const config = new DialogConfig.KeyboardDialog(Object.assign({
            text: '',
            autotype: {
                engineName: 'sample',
            },
            hide(ev, control, text, status, item) {
                console.log(ev, control, text, status, item);
                if (status === 'accept') {
                    alert(text);
                    if (item && item.value) {
                        window.open(`http://www.google.com/maps/place/${item.value.lat},${item.value.lng}`);
                    }
                }
            }
        }, params)).build();
        const dlg = new Dialog(config);
        dlg.show();
    }

    /**
     * This is the application's root view, which is used for any UI control creation and handling.
     *
     * Note that functions defined in the controller may be called via this.getController()
     * Functions declared in this view class may also be called from the controller.
     * Functions designed to be called from the controller must return a Promise.
     *
     * @see Application Lifecycle {@link https://insidetrack.opencar.com/documentation/2.2/lifecycle}
     * @see Views & Controllers {@link https://insidetrack.opencar.com/documentation/2.2/controllers_and_views}
     * @see Promises {@link https://insidetrack.opencar.com/documentation/2.2/promises}
     */
    return class extends ModuleView {
        beforeStart() {
            return super.beforeStart().then(() => {
                new Button({
                    model: {
                        text: 'AutoType'
                    },
                    click() {
                        doKeyboard();
                    }
                }).render(this.getView());

                new Button({
                    model: {
                        text: 'POI AutoType'
                    },
                    click() {
                        doKeyboard({
                            autotype: {
                                engineName: 'sample',
                                placeholder: [{
                                    text:  'Home',
                                    value: {
                                        lng: -122.3648851,
                                        lat: 47.5577243
                                    }
                                }, {
                                    text:  'Work',
                                    value: {
                                        lng: -122.3326779,
                                        lat: 47.6047162
                                    }
                                }, {
                                    text:  'Mother Ship',
                                    value: {
                                        lng: -122.2058857,
                                        lat: 47.6435246
                                    }
                                }]
                            }
                        });
                    }
                }).render(this.getView());

                new Button({
                    model: {
                        text: 'No AutoType'
                    },
                    click() {
                        doKeyboard({
                            autotype: false
                        });
                    }
                }).render(this.getView());
            });
        }
    };
});
