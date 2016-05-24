(function (root, tinysort) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define('tinysort', singleton);
    } else {
        root.tinysort = tinysort;
    }

    function singleton() {
        return tinysort;
    }
}(this, (function () {
    'use strict';
    var fls = !1,
        undef, nll = null,
        win = window,
        doc = win.document,
        parsefloat = parseFloat,
        regexLastNr = /(-?\d+\.?\d*)\s*$/g,
        regexLastNrNoDash = /(\d+\.?\d*)\s*$/g,
        plugins = [],
        numCriteria = 0,
        criteriumIndex = 0,
        defaults = {
            selector: nll,
            order: 'asc',
            attr: nll,
            data: nll,
            useVal: fls,
            place: 'org',
            returns: fls,
            cases: fls,
            forceStrings: fls,
            ignoreDashes: fls,
            sortFunction: nll,
            useFlex: fls,
            emptyEnd: fls
        };
    undef;

    function tinysort(nodeList, options) {
        if (isString(nodeList)) nodeList = doc.querySelectorAll(nodeList);
        if (nodeList.length === 0) {
            console.warn('No elements to sort');
        }
        var fragment = doc.createDocumentFragment(),
            elmObjsAll = [],
            elmObjsSorted = [],
            elmObjsUnsorted = [],
            elmObjsSortedInitial, criteria = [],
            parentNode, isSameParent = true,
            isFlex = nodeList.length && (options === undef || options.useFlex !== false) && getComputedStyle(nodeList[0].parentNode, null).display.indexOf('flex') !== -1;
        initCriteria.apply(nll, Array.prototype.slice.call(arguments, 1));
        initSortList();
        sort();
        applyToDOM();

        function initCriteria() {
            if (arguments.length === 0) {
                addCriterium({});
            } else {
                loop(arguments, function (param) {
                    addCriterium(isString(param) ? {
                        selector: param
                    } : param);
                });
            }
            numCriteria = criteria.length;
        }

        function addCriterium(options) {
            var hasSelector = !! options.selector,
                hasFilter = hasSelector && options.selector[0] === ':',
                allOptions = extend(options || {}, defaults);
            criteria.push(extend({
                hasSelector: hasSelector,
                hasAttr: !(allOptions.attr === nll || allOptions.attr === ''),
                hasData: allOptions.data !== nll,
                hasFilter: hasFilter,
                sortReturnNumber: allOptions.order === 'asc' ? 1 : -1
            }, allOptions));
        }

        function initSortList() {
            loop(nodeList, function (elm, i) {
                if (!parentNode) parentNode = elm.parentNode;
                else if (parentNode !== elm.parentNode) isSameParent = false;
                var criterium = criteria[0],
                    hasFilter = criterium.hasFilter,
                    selector = criterium.selector,
                    isPartial = !selector || (hasFilter && elm.matchesSelector(selector)) || (selector && elm.querySelector(selector)),
                    listPartial = isPartial ? elmObjsSorted : elmObjsUnsorted,
                    elementObject = {
                        elm: elm,
                        pos: i,
                        posn: listPartial.length
                    };
                elmObjsAll.push(elementObject);
                listPartial.push(elementObject);
            });
            elmObjsSortedInitial = elmObjsSorted.slice(0);
        }

        function sort() {
            elmObjsSorted.sort(sortFunction);
        }

        function sortFunction(a, b) {
            var sortReturnNumber = 0;
            if (criteriumIndex !== 0) criteriumIndex = 0;
            while (sortReturnNumber === 0 && criteriumIndex < numCriteria) {
                var criterium = criteria[criteriumIndex],
                    regexLast = criterium.ignoreDashes ? regexLastNrNoDash : regexLastNr;
                loop(plugins, function (plugin) {
                    var pluginPrepare = plugin.prepare;
                    if (pluginPrepare) pluginPrepare(criterium);
                });
                if (criterium.sortFunction) {
                    sortReturnNumber = criterium.sortFunction(a, b);
                } else if (criterium.order == 'rand') {
                    sortReturnNumber = Math.random() < 0.5 ? 1 : -1;
                } else {
                    var isNumeric = fls,
                        valueA = getSortBy(a, criterium),
                        valueB = getSortBy(b, criterium),
                        noA = valueA === '' || valueA === undef,
                        noB = valueB === '' || valueB === undef;
                    if (valueA === valueB) {
                        sortReturnNumber = 0;
                    } else if (criterium.emptyEnd && (noA || noB)) {
                        sortReturnNumber = noA && noB ? 0 : noA ? 1 : -1;
                    } else {
                        if (!criterium.forceStrings) {
                            var valuesA = isString(valueA) ? valueA && valueA.match(regexLast) : fls,
                                valuesB = isString(valueB) ? valueB && valueB.match(regexLast) : fls;
                            if (valuesA && valuesB) {
                                var previousA = valueA.substr(0, valueA.length - valuesA[0].length),
                                    previousB = valueB.substr(0, valueB.length - valuesB[0].length);
                                if (previousA == previousB) {
                                    isNumeric = !fls;
                                    valueA = parsefloat(valuesA[0]);
                                    valueB = parsefloat(valuesB[0]);
                                }
                            }
                        }
                        if (valueA === undef || valueB === undef) {
                            sortReturnNumber = 0;
                        } else {
                            sortReturnNumber = valueA < valueB ? -1 : (valueA > valueB ? 1 : 0);
                        }
                    }
                }
                loop(plugins, function (o) {
                    var pluginSort = o.sort;
                    if (pluginSort) sortReturnNumber = pluginSort(criterium, isNumeric, valueA, valueB, sortReturnNumber);
                });
                sortReturnNumber *= criterium.sortReturnNumber;
                if (sortReturnNumber === 0) criteriumIndex++;
            }
            if (sortReturnNumber === 0) sortReturnNumber = a.pos > b.pos ? 1 : -1;
            return sortReturnNumber;
        }

        function applyToDOM() {
            var hasSortedAll = elmObjsSorted.length === elmObjsAll.length;
            if (isSameParent && hasSortedAll) {
                if (isFlex) {
                    elmObjsSorted.forEach(function (elmObj, i) {
                        elmObj.elm.style.order = i;
                    });
                } else {
                    parentNode.appendChild(sortedIntoFragment());
                }
            } else {
                var criterium = criteria[0],
                    place = criterium.place,
                    placeOrg = place === 'org',
                    placeStart = place === 'start',
                    placeEnd = place === 'end',
                    placeFirst = place === 'first',
                    placeLast = place === 'last';
                if (placeOrg) {
                    elmObjsSorted.forEach(addGhost);
                    elmObjsSorted.forEach(function (elmObj, i) {
                        replaceGhost(elmObjsSortedInitial[i], elmObj.elm);
                    });
                } else if (placeStart || placeEnd) {
                    var startElmObj = elmObjsSortedInitial[placeStart ? 0 : elmObjsSortedInitial.length - 1],
                        startParent = startElmObj.elm.parentNode,
                        startElm = placeStart ? startParent.firstChild : startParent.lastChild;
                    if (startElm !== startElmObj.elm) startElmObj = {
                        elm: startElm
                    };
                    addGhost(startElmObj);
                    placeEnd && startParent.appendChild(startElmObj.ghost);
                    replaceGhost(startElmObj, sortedIntoFragment());
                } else if (placeFirst || placeLast) {
                    var firstElmObj = elmObjsSortedInitial[placeFirst ? 0 : elmObjsSortedInitial.length - 1];
                    replaceGhost(addGhost(firstElmObj), sortedIntoFragment());
                }
            }
        }

        function sortedIntoFragment() {
            elmObjsSorted.forEach(function (elmObj) {
                fragment.appendChild(elmObj.elm);
            });
            return fragment;
        }

        function addGhost(elmObj) {
            var element = elmObj.elm,
                ghost = doc.createElement('div');
            elmObj.ghost = ghost;
            element.parentNode.insertBefore(ghost, element);
            return elmObj;
        }

        function replaceGhost(elmObjGhost, elm) {
            var ghost = elmObjGhost.ghost,
                ghostParent = ghost.parentNode;
            ghostParent.insertBefore(elm, ghost);
            ghostParent.removeChild(ghost);
            delete elmObjGhost.ghost;
        }

        function getSortBy(elementObject, criterium) {
            var sortBy, element = elementObject.elm;
            if (criterium.selector) {
                if (criterium.hasFilter) {
                    if (!element.matchesSelector(criterium.selector)) element = nll;
                } else {
                    element = element.querySelector(criterium.selector);
                }
            }
            if (criterium.hasAttr) sortBy = element.getAttribute(criterium.attr);
            else if (criterium.useVal) sortBy = element.value || element.getAttribute('value');
            else if (criterium.hasData) sortBy = element.getAttribute('data-' + criterium.data);
            else if (element) sortBy = element.textContent;
            if (isString(sortBy)) {
                if (!criterium.cases) sortBy = sortBy.toLowerCase();
                sortBy = sortBy.replace(/\s+/g, ' ');
            }
            return sortBy;
        }

        function isString(o) {
            return typeof o === 'string';
        }
        return elmObjsSorted.map(function (o) {
            return o.elm;
        });
    }

    function loop(array, func) {
        var l = array.length,
            i = l,
            j;
        while (i--) {
            j = l - i - 1;
            func(array[j], j);
        }
    }

    function extend(obj, fns, overwrite) {
        for (var s in fns) {
            if (overwrite || obj[s] === undef) {
                obj[s] = fns[s];
            }
        }
        return obj;
    }

    function plugin(prepare, sort, sortBy) {
        plugins.push({
            prepare: prepare,
            sort: sort,
            sortBy: sortBy
        });
    }
    win.Element &&
    function (ElementPrototype) {
        ElementPrototype.matchesSelector = ElementPrototype.matchesSelector || ElementPrototype.mozMatchesSelector || ElementPrototype.msMatchesSelector || ElementPrototype.oMatchesSelector || ElementPrototype.webkitMatchesSelector ||
        function (selector) {
            var node = this,
                nodes = (node.parentNode || node.document).querySelectorAll(selector),
                i = -1;
            while (nodes[++i] && nodes[i] != node);
            return !!nodes[i];
        };
    }(Element.prototype);
    extend(plugin, {
        loop: loop
    });
    return extend(tinysort, {
        plugin: plugin,
        defaults: defaults
    });
})()));