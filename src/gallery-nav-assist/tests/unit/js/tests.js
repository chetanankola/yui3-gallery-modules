/*global YUI */

YUI.add('gallery-nav-assist-tests', function (Y) {
    'use strict';

    var suite = new Y.Test.Suite('gallery-nav-assist'),
        Assert = Y.Assert,
        CLASS_DEFAULT_CHILD_HIGHLIGHT = 'default-child-highlight',
        CLASS_NAV_POINTER = 'nav-pointer', //pointer on child element highligted
        CLASS_DEFAULT_CONTAINER_HIGHLIGHT = 'default-container-highlight',
        KEYCODE_FOR_ARROW_RIGHT = 39,
        KEYCODE_FOR_ARROW_LEFT = 37,
        KEYCODE_FOR_ARROW_UP = 38,
        KEYCODE_FOR_ARROW_DOWN = 40,
        KEYCODE_FOR_SHIFT = 16,
        KEYCODE_FOR_ESC = 27,
        nav = null;

    suite.add(new Y.Test.Case({

        name: 'Automated Tests',

        'Y.NAVASSIST should be a function': function () {
            Assert.isFunction(Y.NAVASSIST);
        },

        'Check instantiation of nav assist with full fledged config': function () {
            if (nav) {
                nav.destroy();
                nav = null;
            }
            nav = new Y.NAVASSIST({
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
                navPointer: true,
                styleContainer: true,
                ignore: ['#testinputbox']
            });
            nav.disableAllNavigation();
            Assert.isObject(nav);
        },
        'register a new dom node and check if its navigable': function () {
            if (nav) {
                nav.destroy();
                nav = null;
            }
            nav = new Y.NAVASSIST({
                debug: true
            });
            nav.register({
                node: '#header'
            });

            nav.makeNextContainerNavigable(true);
            Y.Assert.areEqual(Y.one('#header h2').hasClass('default-child-highlight'), true, 'header divs child has the highlight');
            nav.disableAllNavigation();
        },

        'disable all navigation, then enable all navigation': function () {
            if (nav) {
                nav.destroy();
                nav = null;
            }
            nav = new Y.NAVASSIST({
                debug: true
            });
            nav.register({
                node: '#header'
            });

            nav.makeNextContainerNavigable(true);
            nav.splash('Disabling all navigation', [100, 100]);
            Y.Assert.areEqual(Y.one('#header h2').hasClass('default-child-highlight'), true, 'header divs child has the highlight');
            nav.disableAllNavigation();
            Y.Assert.areEqual(Y.one(CLASS_DEFAULT_CHILD_HIGHLIGHT), null, 'nav disabled: No div has highlight anymore');
            nav.enableAllNavigation();
            Y.Assert.areEqual(Y.one('#header h2').hasClass(CLASS_DEFAULT_CHILD_HIGHLIGHT), true, 'nav enabled: header divs child has the highlight');
            nav.disableAllNavigation();
        },

        'check highlight and custom highlight on container and deregisteration of a node': function () {
            var customContainerClass = 'custom-container-highlight-class',
                customChildClass = 'custom-child-highlight-class';
            if (nav) {
                nav.destroy();
                nav = null;
            }
            nav = new Y.NAVASSIST({
                debug: true,
                styleContainer: true
            });

            //default highlighting
            nav.register({
                node: '#header'
            });
            nav.makeNextContainerNavigable(true);
            Y.Assert.areEqual(Y.one('#header').hasClass(CLASS_DEFAULT_CONTAINER_HIGHLIGHT), true, 'nav enabled: header div container has default highlight');
            Y.Assert.areEqual(Y.one('#header h2').hasClass(CLASS_DEFAULT_CHILD_HIGHLIGHT), true, 'nav enabled: header divs child has default highlight');

            //deregister a node and check if its in the registry
            nav.deRegister({
                node: '#header'
            });
            nav.makeNextContainerNavigable(true);
            Y.Assert.areEqual(nav.isNodeInRegistry('#header'), null, 'header node has been deregistered');


            //custom highlighting
            nav.register({
                node: '#header',
                containerStyle: {
                    className: customContainerClass
                },
                elemStyle: {
                    className: customChildClass
                }
            });
            nav.makeNextContainerNavigable(true);
            Y.Assert.areEqual(Y.one('#header').hasClass(customContainerClass), true, 'nav enabled: header div container has custom highlight');
            Y.Assert.areEqual(Y.one('#header h2').hasClass(customChildClass), true, 'nav enabled: header divs child has custom highlight');
            nav.disableAllNavigation();
        },

        'check arrow up keyboard press and its effect of navigation between child elements of a container': function () {
            if (nav) {
                nav.destroy();
                nav = null;
            }
            nav = new Y.NAVASSIST({
                debug: true
            });
            nav.register({
                node: '#eastrail'
            });
            nav.makeNextContainerNavigable(true);
            //simulate keyup
            nav.onMyKeyUp({ // mock eventFacade
                preventDefault: function () {
                    return true;
                }
            });
            Y.Assert.areEqual(Y.one('#elem1').hasClass(CLASS_DEFAULT_CHILD_HIGHLIGHT), false, '1st child isnt selected');
            Y.Assert.areEqual(Y.one('#elem2').hasClass(CLASS_DEFAULT_CHILD_HIGHLIGHT), true, '2nd child is selected');
            nav.disableAllNavigation();
        },

        'check arrow right keyboard press and its effect of navigation between child elements of a container which are horizontally aligned': function () {
            if (nav) {
                nav.destroy();
                nav = null;
            }
            nav = new Y.NAVASSIST({
                debug: true
            });
            nav.register({
                node: '#navtabs',
                isHorizontal: true
            });
            nav.makeNextContainerNavigable(true);
            //simulate call to handler for keydown which is the same function called for arrow right
            nav.onMyKeyDown({ // mock eventFacade
                preventDefault: function () {
                    return true;
                }
            });
            //1st child should lose focus
            Y.Assert.areEqual(Y.one('#tab1').hasClass(CLASS_DEFAULT_CHILD_HIGHLIGHT), false, '1st child isnt selected');
            //2nd child should get the focus
            Y.Assert.areEqual(Y.one('#tab2').hasClass(CLASS_DEFAULT_CHILD_HIGHLIGHT), true, '2nd child is selected');
            nav.disableAllNavigation();
        },

        'Test to toggle nav pointer usage by config': function () {
            if (nav) {
                nav.destroy();
                nav = null;
            }
            nav = new Y.NAVASSIST({
                debug: true,
                navPointer: true //by default its set to false
            });
            nav.register({
                node: '#navtabs',
                isHorizontal: true
            });
            nav.makeNextContainerNavigable(true);
            //simulate call to handler for keydown which is the same function called for arrow right
            nav.onMyKeyDown({ // mock eventFacade
                preventDefault: function () {
                    return true;
                }
            });
            //2nd child have a nav pointer
            Y.Assert.areEqual(Y.one('.tab2 span').hasClass(CLASS_NAV_POINTER), true, 'nav pointer for tab2');
            nav.disableAllNavigation();
        },

        'check multiple container navigation and ranking': function () {
            if (nav) {
                nav.destroy();
                nav = null;
            }
            nav = new Y.NAVASSIST({
                styleContainer: true,
                debug: true,
                registry: [{
                    node: '#eastrail',
                    rank: 2
                }, {
                    node: '#header',
                    rank: 1
                }, {
                    node: '#sidebar',
                    rank: 3
                }]
            });
            //navigate once to the container ranked 1
            nav.makeNextContainerNavigable(true);
            Y.Assert.areEqual(Y.one('#header').hasClass(CLASS_DEFAULT_CONTAINER_HIGHLIGHT), true, 'rank1 is header is selected');

            //navigate twice so taht the 3rd container is reached and it shuould be sidebar since its ranked 3
            nav.makeNextContainerNavigable(true);
            nav.makeNextContainerNavigable(true);

            Y.Assert.areEqual(Y.one('#sidebar').hasClass(CLASS_DEFAULT_CONTAINER_HIGHLIGHT), true, 'rank3 is sidebar is selected');
            nav.disableAllNavigation();
        },
        'check ignore functionality, where nodes which are in ignore list arent selected': function () {
            if (nav) {
                nav.destroy();
                nav = null;
            }
            nav = new Y.NAVASSIST({
                styleContainer: true,
                debug: true,
                registry: [{
                    node: '#tabs',
                    rank: 1
                }],
                ignore: ['#testnputbox']
            });
            //navigate once to the container ranked 1
            nav.makeNextContainerNavigable(true);
            nav.onMyKeyDown({ // mock eventFacade
                preventDefault: function () {
                    return true;
                }
            });
            nav.onMyKeyDown({ // mock eventFacade
                preventDefault: function () {
                    return true;
                }
            });
            Y.Assert.areEqual(Y.one('#testinputbox').hasClass(CLASS_DEFAULT_CONTAINER_HIGHLIGHT), false, 'input box shouldnt be selected');
            nav.disableAllNavigation();
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: [
        'test',
        'gallery-nav-assist'
    ]
});
