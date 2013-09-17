/*global YUI */

YUI.add('module-tests', function (Y) {
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
                    node: '#rightbar',
                    rank: 3
                }, {
                    node: '#links',
                    rank: 4
                }, {
                    node: '#sidebar',
                    rank: 1
                }, {
                    node: '#tab ul',
                    isHorizontal: true
                }, {
                    node: '#crapNodeDoesntExist'
                }],
                debug: true,
                styleContainer: true,
                ignore: ['#testinputbox']
            });
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: [ 'test' ]
});
