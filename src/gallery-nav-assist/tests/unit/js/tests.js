/*global YUI */

YUI.add('gallery-nav-assist-tests', function (Y) {
    'use strict';

    var suite = new Y.Test.Suite('gallery-nav-assist'),
        Assert = Y.Assert;

    suite.add(new Y.Test.Case({

        name: 'Automated Tests',

        'Y.NAVASSIST should be a function': function () {
            Assert.isFunction(Y.NAVASSIST);
        },

        'Instantiate Y.NAVASSIST': function () {
            var nav = new Y.NAVASSIST({
                defaultContainerHightlightStyle: {
                    className: 'containerhighlight'
                },
                defaultElemHighlightStyle: {
                    className: 'transhighlight'
                },
                registry: [{
                    node: '#main',
                    pullToTop: true,
                    elemStyle: {
                        className: 'main-elem-custom-highlight'
                    },
                    containerStyle: {
                        className: 'main-container-custom-highlight'
                    }
                }, {
                    node: '#eastrail',
                    rank: 3
                }, {
                    node: '#links',
                    rank: 4
                }, {
                    node: '#sidebar',
                    rank: 1
                }, {
                    node: '#tabs ul',
                    isHorizontal: true
                }, {
                    node: '#crapNodeDoesntExist'
                }],
                debug: true,
                styleContainer: true,
                ignore: ['#testinputbox']
            });

            nav.register({
                node: '#header'
            });

            nav.splash('Disabled all other guys except me!!! for navigation lol!', [100, 100]);

            nav.disableAllNavigation();

            nav.enableAllNavigation();

            nav.deRegister({node: '#main'});

            nav.makeNextContainerNavigable(true);

            nav.onMyKeyUp({ // mock eventFacade
                preventDefault: function () {
                    return true;
                }
            });

            nav.getPreviousIndex(0);

            this.wait(function () {
                Assert.isObject(nav);
            }, 1000);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: [
        'test',
        'gallery-nav-assist'
    ]
});
