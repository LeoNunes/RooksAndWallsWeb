(function () {
    const t = document.createElement('link').relList;
    if (t && t.supports && t.supports('modulepreload')) return;
    for (const l of document.querySelectorAll('link[rel="modulepreload"]')) r(l);
    new MutationObserver(l => {
        for (const o of l)
            if (o.type === 'childList')
                for (const i of o.addedNodes)
                    i.tagName === 'LINK' && i.rel === 'modulepreload' && r(i);
    }).observe(document, { childList: !0, subtree: !0 });
    function n(l) {
        const o = {};
        return (
            l.integrity && (o.integrity = l.integrity),
            l.referrerPolicy && (o.referrerPolicy = l.referrerPolicy),
            l.crossOrigin === 'use-credentials'
                ? (o.credentials = 'include')
                : l.crossOrigin === 'anonymous'
                ? (o.credentials = 'omit')
                : (o.credentials = 'same-origin'),
            o
        );
    }
    function r(l) {
        if (l.ep) return;
        l.ep = !0;
        const o = n(l);
        fetch(l.href, o);
    }
})();
var K =
    typeof globalThis < 'u'
        ? globalThis
        : typeof window < 'u'
        ? window
        : typeof global < 'u'
        ? global
        : typeof self < 'u'
        ? self
        : {};
function Tc(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
}
var Ac = { exports: {} },
    Oo = {},
    Ic = { exports: {} },
    I = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ol = Symbol.for('react.element'),
    A1 = Symbol.for('react.portal'),
    I1 = Symbol.for('react.fragment'),
    z1 = Symbol.for('react.strict_mode'),
    j1 = Symbol.for('react.profiler'),
    F1 = Symbol.for('react.provider'),
    U1 = Symbol.for('react.context'),
    W1 = Symbol.for('react.forward_ref'),
    b1 = Symbol.for('react.suspense'),
    H1 = Symbol.for('react.memo'),
    B1 = Symbol.for('react.lazy'),
    la = Symbol.iterator;
function V1(e) {
    return e === null || typeof e != 'object'
        ? null
        : ((e = (la && e[la]) || e['@@iterator']), typeof e == 'function' ? e : null);
}
var zc = {
        isMounted: function () {
            return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
    },
    jc = Object.assign,
    Fc = {};
function tr(e, t, n) {
    (this.props = e), (this.context = t), (this.refs = Fc), (this.updater = n || zc);
}
tr.prototype.isReactComponent = {};
tr.prototype.setState = function (e, t) {
    if (typeof e != 'object' && typeof e != 'function' && e != null)
        throw Error(
            'setState(...): takes an object of state variables to update or a function which returns an object of state variables.',
        );
    this.updater.enqueueSetState(this, e, t, 'setState');
};
tr.prototype.forceUpdate = function (e) {
    this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
};
function Uc() {}
Uc.prototype = tr.prototype;
function $u(e, t, n) {
    (this.props = e), (this.context = t), (this.refs = Fc), (this.updater = n || zc);
}
var Zu = ($u.prototype = new Uc());
Zu.constructor = $u;
jc(Zu, tr.prototype);
Zu.isPureReactComponent = !0;
var oa = Array.isArray,
    Wc = Object.prototype.hasOwnProperty,
    Qu = { current: null },
    bc = { key: !0, ref: !0, __self: !0, __source: !0 };
function Hc(e, t, n) {
    var r,
        l = {},
        o = null,
        i = null;
    if (t != null)
        for (r in (t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (o = '' + t.key), t))
            Wc.call(t, r) && !bc.hasOwnProperty(r) && (l[r] = t[r]);
    var u = arguments.length - 2;
    if (u === 1) l.children = n;
    else if (1 < u) {
        for (var s = Array(u), a = 0; a < u; a++) s[a] = arguments[a + 2];
        l.children = s;
    }
    if (e && e.defaultProps) for (r in ((u = e.defaultProps), u)) l[r] === void 0 && (l[r] = u[r]);
    return { $$typeof: ol, type: e, key: o, ref: i, props: l, _owner: Qu.current };
}
function $1(e, t) {
    return { $$typeof: ol, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Gu(e) {
    return typeof e == 'object' && e !== null && e.$$typeof === ol;
}
function Z1(e) {
    var t = { '=': '=0', ':': '=2' };
    return (
        '$' +
        e.replace(/[=:]/g, function (n) {
            return t[n];
        })
    );
}
var ia = /\/+/g;
function fi(e, t) {
    return typeof e == 'object' && e !== null && e.key != null ? Z1('' + e.key) : t.toString(36);
}
function jl(e, t, n, r, l) {
    var o = typeof e;
    (o === 'undefined' || o === 'boolean') && (e = null);
    var i = !1;
    if (e === null) i = !0;
    else
        switch (o) {
            case 'string':
            case 'number':
                i = !0;
                break;
            case 'object':
                switch (e.$$typeof) {
                    case ol:
                    case A1:
                        i = !0;
                }
        }
    if (i)
        return (
            (i = e),
            (l = l(i)),
            (e = r === '' ? '.' + fi(i, 0) : r),
            oa(l)
                ? ((n = ''),
                  e != null && (n = e.replace(ia, '$&/') + '/'),
                  jl(l, t, n, '', function (a) {
                      return a;
                  }))
                : l != null &&
                  (Gu(l) &&
                      (l = $1(
                          l,
                          n +
                              (!l.key || (i && i.key === l.key)
                                  ? ''
                                  : ('' + l.key).replace(ia, '$&/') + '/') +
                              e,
                      )),
                  t.push(l)),
            1
        );
    if (((i = 0), (r = r === '' ? '.' : r + ':'), oa(e)))
        for (var u = 0; u < e.length; u++) {
            o = e[u];
            var s = r + fi(o, u);
            i += jl(o, t, n, s, l);
        }
    else if (((s = V1(e)), typeof s == 'function'))
        for (e = s.call(e), u = 0; !(o = e.next()).done; )
            (o = o.value), (s = r + fi(o, u++)), (i += jl(o, t, n, s, l));
    else if (o === 'object')
        throw (
            ((t = String(e)),
            Error(
                'Objects are not valid as a React child (found: ' +
                    (t === '[object Object]'
                        ? 'object with keys {' + Object.keys(e).join(', ') + '}'
                        : t) +
                    '). If you meant to render a collection of children, use an array instead.',
            ))
        );
    return i;
}
function wl(e, t, n) {
    if (e == null) return e;
    var r = [],
        l = 0;
    return (
        jl(e, r, '', '', function (o) {
            return t.call(n, o, l++);
        }),
        r
    );
}
function Q1(e) {
    if (e._status === -1) {
        var t = e._result;
        (t = t()),
            t.then(
                function (n) {
                    (e._status === 0 || e._status === -1) && ((e._status = 1), (e._result = n));
                },
                function (n) {
                    (e._status === 0 || e._status === -1) && ((e._status = 2), (e._result = n));
                },
            ),
            e._status === -1 && ((e._status = 0), (e._result = t));
    }
    if (e._status === 1) return e._result.default;
    throw e._result;
}
var Ee = { current: null },
    Fl = { transition: null },
    G1 = { ReactCurrentDispatcher: Ee, ReactCurrentBatchConfig: Fl, ReactCurrentOwner: Qu };
I.Children = {
    map: wl,
    forEach: function (e, t, n) {
        wl(
            e,
            function () {
                t.apply(this, arguments);
            },
            n,
        );
    },
    count: function (e) {
        var t = 0;
        return (
            wl(e, function () {
                t++;
            }),
            t
        );
    },
    toArray: function (e) {
        return (
            wl(e, function (t) {
                return t;
            }) || []
        );
    },
    only: function (e) {
        if (!Gu(e))
            throw Error('React.Children.only expected to receive a single React element child.');
        return e;
    },
};
I.Component = tr;
I.Fragment = I1;
I.Profiler = j1;
I.PureComponent = $u;
I.StrictMode = z1;
I.Suspense = b1;
I.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = G1;
I.cloneElement = function (e, t, n) {
    if (e == null)
        throw Error(
            'React.cloneElement(...): The argument must be a React element, but you passed ' +
                e +
                '.',
        );
    var r = jc({}, e.props),
        l = e.key,
        o = e.ref,
        i = e._owner;
    if (t != null) {
        if (
            (t.ref !== void 0 && ((o = t.ref), (i = Qu.current)),
            t.key !== void 0 && (l = '' + t.key),
            e.type && e.type.defaultProps)
        )
            var u = e.type.defaultProps;
        for (s in t)
            Wc.call(t, s) &&
                !bc.hasOwnProperty(s) &&
                (r[s] = t[s] === void 0 && u !== void 0 ? u[s] : t[s]);
    }
    var s = arguments.length - 2;
    if (s === 1) r.children = n;
    else if (1 < s) {
        u = Array(s);
        for (var a = 0; a < s; a++) u[a] = arguments[a + 2];
        r.children = u;
    }
    return { $$typeof: ol, type: e.type, key: l, ref: o, props: r, _owner: i };
};
I.createContext = function (e) {
    return (
        (e = {
            $$typeof: U1,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
            _defaultValue: null,
            _globalName: null,
        }),
        (e.Provider = { $$typeof: F1, _context: e }),
        (e.Consumer = e)
    );
};
I.createElement = Hc;
I.createFactory = function (e) {
    var t = Hc.bind(null, e);
    return (t.type = e), t;
};
I.createRef = function () {
    return { current: null };
};
I.forwardRef = function (e) {
    return { $$typeof: W1, render: e };
};
I.isValidElement = Gu;
I.lazy = function (e) {
    return { $$typeof: B1, _payload: { _status: -1, _result: e }, _init: Q1 };
};
I.memo = function (e, t) {
    return { $$typeof: H1, type: e, compare: t === void 0 ? null : t };
};
I.startTransition = function (e) {
    var t = Fl.transition;
    Fl.transition = {};
    try {
        e();
    } finally {
        Fl.transition = t;
    }
};
I.unstable_act = function () {
    throw Error('act(...) is not supported in production builds of React.');
};
I.useCallback = function (e, t) {
    return Ee.current.useCallback(e, t);
};
I.useContext = function (e) {
    return Ee.current.useContext(e);
};
I.useDebugValue = function () {};
I.useDeferredValue = function (e) {
    return Ee.current.useDeferredValue(e);
};
I.useEffect = function (e, t) {
    return Ee.current.useEffect(e, t);
};
I.useId = function () {
    return Ee.current.useId();
};
I.useImperativeHandle = function (e, t, n) {
    return Ee.current.useImperativeHandle(e, t, n);
};
I.useInsertionEffect = function (e, t) {
    return Ee.current.useInsertionEffect(e, t);
};
I.useLayoutEffect = function (e, t) {
    return Ee.current.useLayoutEffect(e, t);
};
I.useMemo = function (e, t) {
    return Ee.current.useMemo(e, t);
};
I.useReducer = function (e, t, n) {
    return Ee.current.useReducer(e, t, n);
};
I.useRef = function (e) {
    return Ee.current.useRef(e);
};
I.useState = function (e) {
    return Ee.current.useState(e);
};
I.useSyncExternalStore = function (e, t, n) {
    return Ee.current.useSyncExternalStore(e, t, n);
};
I.useTransition = function () {
    return Ee.current.useTransition();
};
I.version = '18.2.0';
Ic.exports = I;
var m = Ic.exports;
const Te = Tc(m);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var K1 = m,
    Y1 = Symbol.for('react.element'),
    X1 = Symbol.for('react.fragment'),
    q1 = Object.prototype.hasOwnProperty,
    J1 = K1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    e0 = { key: !0, ref: !0, __self: !0, __source: !0 };
function Bc(e, t, n) {
    var r,
        l = {},
        o = null,
        i = null;
    n !== void 0 && (o = '' + n),
        t.key !== void 0 && (o = '' + t.key),
        t.ref !== void 0 && (i = t.ref);
    for (r in t) q1.call(t, r) && !e0.hasOwnProperty(r) && (l[r] = t[r]);
    if (e && e.defaultProps) for (r in ((t = e.defaultProps), t)) l[r] === void 0 && (l[r] = t[r]);
    return { $$typeof: Y1, type: e, key: o, ref: i, props: l, _owner: J1.current };
}
Oo.Fragment = X1;
Oo.jsx = Bc;
Oo.jsxs = Bc;
Ac.exports = Oo;
var P = Ac.exports,
    Vi = {},
    Vc = { exports: {} },
    je = {},
    $c = { exports: {} },
    Zc = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
    function t(R, O) {
        var T = R.length;
        R.push(O);
        e: for (; 0 < T; ) {
            var B = (T - 1) >>> 1,
                F = R[B];
            if (0 < l(F, O)) (R[B] = O), (R[T] = F), (T = B);
            else break e;
        }
    }
    function n(R) {
        return R.length === 0 ? null : R[0];
    }
    function r(R) {
        if (R.length === 0) return null;
        var O = R[0],
            T = R.pop();
        if (T !== O) {
            R[0] = T;
            e: for (var B = 0, F = R.length, Ge = F >>> 1; B < Ge; ) {
                var Ue = 2 * (B + 1) - 1,
                    Cn = R[Ue],
                    J = Ue + 1,
                    nn = R[J];
                if (0 > l(Cn, T))
                    J < F && 0 > l(nn, Cn)
                        ? ((R[B] = nn), (R[J] = T), (B = J))
                        : ((R[B] = Cn), (R[Ue] = T), (B = Ue));
                else if (J < F && 0 > l(nn, T)) (R[B] = nn), (R[J] = T), (B = J);
                else break e;
            }
        }
        return O;
    }
    function l(R, O) {
        var T = R.sortIndex - O.sortIndex;
        return T !== 0 ? T : R.id - O.id;
    }
    if (typeof performance == 'object' && typeof performance.now == 'function') {
        var o = performance;
        e.unstable_now = function () {
            return o.now();
        };
    } else {
        var i = Date,
            u = i.now();
        e.unstable_now = function () {
            return i.now() - u;
        };
    }
    var s = [],
        a = [],
        c = 1,
        f = null,
        h = 3,
        g = !1,
        S = !1,
        y = !1,
        N = typeof setTimeout == 'function' ? setTimeout : null,
        p = typeof clearTimeout == 'function' ? clearTimeout : null,
        d = typeof setImmediate < 'u' ? setImmediate : null;
    typeof navigator < 'u' &&
        navigator.scheduling !== void 0 &&
        navigator.scheduling.isInputPending !== void 0 &&
        navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function v(R) {
        for (var O = n(a); O !== null; ) {
            if (O.callback === null) r(a);
            else if (O.startTime <= R) r(a), (O.sortIndex = O.expirationTime), t(s, O);
            else break;
            O = n(a);
        }
    }
    function w(R) {
        if (((y = !1), v(R), !S))
            if (n(s) !== null) (S = !0), it(x);
            else {
                var O = n(a);
                O !== null && Ne(w, O.startTime - R);
            }
    }
    function x(R, O) {
        (S = !1), y && ((y = !1), p(_), (_ = -1)), (g = !0);
        var T = h;
        try {
            for (v(O), f = n(s); f !== null && (!(f.expirationTime > O) || (R && !A())); ) {
                var B = f.callback;
                if (typeof B == 'function') {
                    (f.callback = null), (h = f.priorityLevel);
                    var F = B(f.expirationTime <= O);
                    (O = e.unstable_now()),
                        typeof F == 'function' ? (f.callback = F) : f === n(s) && r(s),
                        v(O);
                } else r(s);
                f = n(s);
            }
            if (f !== null) var Ge = !0;
            else {
                var Ue = n(a);
                Ue !== null && Ne(w, Ue.startTime - O), (Ge = !1);
            }
            return Ge;
        } finally {
            (f = null), (h = T), (g = !1);
        }
    }
    var C = !1,
        E = null,
        _ = -1,
        D = 5,
        L = -1;
    function A() {
        return !(e.unstable_now() - L < D);
    }
    function re() {
        if (E !== null) {
            var R = e.unstable_now();
            L = R;
            var O = !0;
            try {
                O = E(!0, R);
            } finally {
                O ? le() : ((C = !1), (E = null));
            }
        } else C = !1;
    }
    var le;
    if (typeof d == 'function')
        le = function () {
            d(re);
        };
    else if (typeof MessageChannel < 'u') {
        var ge = new MessageChannel(),
            En = ge.port2;
        (ge.port1.onmessage = re),
            (le = function () {
                En.postMessage(null);
            });
    } else
        le = function () {
            N(re, 0);
        };
    function it(R) {
        (E = R), C || ((C = !0), le());
    }
    function Ne(R, O) {
        _ = N(function () {
            R(e.unstable_now());
        }, O);
    }
    (e.unstable_IdlePriority = 5),
        (e.unstable_ImmediatePriority = 1),
        (e.unstable_LowPriority = 4),
        (e.unstable_NormalPriority = 3),
        (e.unstable_Profiling = null),
        (e.unstable_UserBlockingPriority = 2),
        (e.unstable_cancelCallback = function (R) {
            R.callback = null;
        }),
        (e.unstable_continueExecution = function () {
            S || g || ((S = !0), it(x));
        }),
        (e.unstable_forceFrameRate = function (R) {
            0 > R || 125 < R
                ? console.error(
                      'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported',
                  )
                : (D = 0 < R ? Math.floor(1e3 / R) : 5);
        }),
        (e.unstable_getCurrentPriorityLevel = function () {
            return h;
        }),
        (e.unstable_getFirstCallbackNode = function () {
            return n(s);
        }),
        (e.unstable_next = function (R) {
            switch (h) {
                case 1:
                case 2:
                case 3:
                    var O = 3;
                    break;
                default:
                    O = h;
            }
            var T = h;
            h = O;
            try {
                return R();
            } finally {
                h = T;
            }
        }),
        (e.unstable_pauseExecution = function () {}),
        (e.unstable_requestPaint = function () {}),
        (e.unstable_runWithPriority = function (R, O) {
            switch (R) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                default:
                    R = 3;
            }
            var T = h;
            h = R;
            try {
                return O();
            } finally {
                h = T;
            }
        }),
        (e.unstable_scheduleCallback = function (R, O, T) {
            var B = e.unstable_now();
            switch (
                (typeof T == 'object' && T !== null
                    ? ((T = T.delay), (T = typeof T == 'number' && 0 < T ? B + T : B))
                    : (T = B),
                R)
            ) {
                case 1:
                    var F = -1;
                    break;
                case 2:
                    F = 250;
                    break;
                case 5:
                    F = 1073741823;
                    break;
                case 4:
                    F = 1e4;
                    break;
                default:
                    F = 5e3;
            }
            return (
                (F = T + F),
                (R = {
                    id: c++,
                    callback: O,
                    priorityLevel: R,
                    startTime: T,
                    expirationTime: F,
                    sortIndex: -1,
                }),
                T > B
                    ? ((R.sortIndex = T),
                      t(a, R),
                      n(s) === null &&
                          R === n(a) &&
                          (y ? (p(_), (_ = -1)) : (y = !0), Ne(w, T - B)))
                    : ((R.sortIndex = F), t(s, R), S || g || ((S = !0), it(x))),
                R
            );
        }),
        (e.unstable_shouldYield = A),
        (e.unstable_wrapCallback = function (R) {
            var O = h;
            return function () {
                var T = h;
                h = O;
                try {
                    return R.apply(this, arguments);
                } finally {
                    h = T;
                }
            };
        });
})(Zc);
$c.exports = Zc;
var t0 = $c.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Qc = m,
    ze = t0;
function k(e) {
    for (
        var t = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e, n = 1;
        n < arguments.length;
        n++
    )
        t += '&args[]=' + encodeURIComponent(arguments[n]);
    return (
        'Minified React error #' +
        e +
        '; visit ' +
        t +
        ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
}
var Gc = new Set(),
    Fr = {};
function wn(e, t) {
    Gn(e, t), Gn(e + 'Capture', t);
}
function Gn(e, t) {
    for (Fr[e] = t, e = 0; e < t.length; e++) Gc.add(t[e]);
}
var Ct = !(
        typeof window > 'u' ||
        typeof window.document > 'u' ||
        typeof window.document.createElement > 'u'
    ),
    $i = Object.prototype.hasOwnProperty,
    n0 =
        /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    ua = {},
    sa = {};
function r0(e) {
    return $i.call(sa, e)
        ? !0
        : $i.call(ua, e)
        ? !1
        : n0.test(e)
        ? (sa[e] = !0)
        : ((ua[e] = !0), !1);
}
function l0(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
        case 'function':
        case 'symbol':
            return !0;
        case 'boolean':
            return r
                ? !1
                : n !== null
                ? !n.acceptsBooleans
                : ((e = e.toLowerCase().slice(0, 5)), e !== 'data-' && e !== 'aria-');
        default:
            return !1;
    }
}
function o0(e, t, n, r) {
    if (t === null || typeof t > 'u' || l0(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null)
        switch (n.type) {
            case 3:
                return !t;
            case 4:
                return t === !1;
            case 5:
                return isNaN(t);
            case 6:
                return isNaN(t) || 1 > t;
        }
    return !1;
}
function Ce(e, t, n, r, l, o, i) {
    (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
        (this.attributeName = r),
        (this.attributeNamespace = l),
        (this.mustUseProperty = n),
        (this.propertyName = e),
        (this.type = t),
        (this.sanitizeURL = o),
        (this.removeEmptyString = i);
}
var fe = {};
'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
    .split(' ')
    .forEach(function (e) {
        fe[e] = new Ce(e, 0, !1, e, null, !1, !1);
    });
[
    ['acceptCharset', 'accept-charset'],
    ['className', 'class'],
    ['htmlFor', 'for'],
    ['httpEquiv', 'http-equiv'],
].forEach(function (e) {
    var t = e[0];
    fe[t] = new Ce(t, 1, !1, e[1], null, !1, !1);
});
['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (e) {
    fe[e] = new Ce(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
['autoReverse', 'externalResourcesRequired', 'focusable', 'preserveAlpha'].forEach(function (e) {
    fe[e] = new Ce(e, 2, !1, e, null, !1, !1);
});
'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
    .split(' ')
    .forEach(function (e) {
        fe[e] = new Ce(e, 3, !1, e.toLowerCase(), null, !1, !1);
    });
['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
    fe[e] = new Ce(e, 3, !0, e, null, !1, !1);
});
['capture', 'download'].forEach(function (e) {
    fe[e] = new Ce(e, 4, !1, e, null, !1, !1);
});
['cols', 'rows', 'size', 'span'].forEach(function (e) {
    fe[e] = new Ce(e, 6, !1, e, null, !1, !1);
});
['rowSpan', 'start'].forEach(function (e) {
    fe[e] = new Ce(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Ku = /[\-:]([a-z])/g;
function Yu(e) {
    return e[1].toUpperCase();
}
'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
    .split(' ')
    .forEach(function (e) {
        var t = e.replace(Ku, Yu);
        fe[t] = new Ce(t, 1, !1, e, null, !1, !1);
    });
'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
    .split(' ')
    .forEach(function (e) {
        var t = e.replace(Ku, Yu);
        fe[t] = new Ce(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
    });
['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
    var t = e.replace(Ku, Yu);
    fe[t] = new Ce(t, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1);
});
['tabIndex', 'crossOrigin'].forEach(function (e) {
    fe[e] = new Ce(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
fe.xlinkHref = new Ce('xlinkHref', 1, !1, 'xlink:href', 'http://www.w3.org/1999/xlink', !0, !1);
['src', 'href', 'action', 'formAction'].forEach(function (e) {
    fe[e] = new Ce(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Xu(e, t, n, r) {
    var l = fe.hasOwnProperty(t) ? fe[t] : null;
    (l !== null
        ? l.type !== 0
        : r ||
          !(2 < t.length) ||
          (t[0] !== 'o' && t[0] !== 'O') ||
          (t[1] !== 'n' && t[1] !== 'N')) &&
        (o0(t, n, l, r) && (n = null),
        r || l === null
            ? r0(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, '' + n))
            : l.mustUseProperty
            ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : '') : n)
            : ((t = l.attributeName),
              (r = l.attributeNamespace),
              n === null
                  ? e.removeAttribute(t)
                  : ((l = l.type),
                    (n = l === 3 || (l === 4 && n === !0) ? '' : '' + n),
                    r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Rt = Qc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    Sl = Symbol.for('react.element'),
    Mn = Symbol.for('react.portal'),
    Nn = Symbol.for('react.fragment'),
    qu = Symbol.for('react.strict_mode'),
    Zi = Symbol.for('react.profiler'),
    Kc = Symbol.for('react.provider'),
    Yc = Symbol.for('react.context'),
    Ju = Symbol.for('react.forward_ref'),
    Qi = Symbol.for('react.suspense'),
    Gi = Symbol.for('react.suspense_list'),
    es = Symbol.for('react.memo'),
    Tt = Symbol.for('react.lazy'),
    Xc = Symbol.for('react.offscreen'),
    aa = Symbol.iterator;
function pr(e) {
    return e === null || typeof e != 'object'
        ? null
        : ((e = (aa && e[aa]) || e['@@iterator']), typeof e == 'function' ? e : null);
}
var Q = Object.assign,
    di;
function Er(e) {
    if (di === void 0)
        try {
            throw Error();
        } catch (n) {
            var t = n.stack.trim().match(/\n( *(at )?)/);
            di = (t && t[1]) || '';
        }
    return (
        `
` +
        di +
        e
    );
}
var pi = !1;
function vi(e, t) {
    if (!e || pi) return '';
    pi = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
        if (t)
            if (
                ((t = function () {
                    throw Error();
                }),
                Object.defineProperty(t.prototype, 'props', {
                    set: function () {
                        throw Error();
                    },
                }),
                typeof Reflect == 'object' && Reflect.construct)
            ) {
                try {
                    Reflect.construct(t, []);
                } catch (a) {
                    var r = a;
                }
                Reflect.construct(e, [], t);
            } else {
                try {
                    t.call();
                } catch (a) {
                    r = a;
                }
                e.call(t.prototype);
            }
        else {
            try {
                throw Error();
            } catch (a) {
                r = a;
            }
            e();
        }
    } catch (a) {
        if (a && r && typeof a.stack == 'string') {
            for (
                var l = a.stack.split(`
`),
                    o = r.stack.split(`
`),
                    i = l.length - 1,
                    u = o.length - 1;
                1 <= i && 0 <= u && l[i] !== o[u];

            )
                u--;
            for (; 1 <= i && 0 <= u; i--, u--)
                if (l[i] !== o[u]) {
                    if (i !== 1 || u !== 1)
                        do
                            if ((i--, u--, 0 > u || l[i] !== o[u])) {
                                var s =
                                    `
` + l[i].replace(' at new ', ' at ');
                                return (
                                    e.displayName &&
                                        s.includes('<anonymous>') &&
                                        (s = s.replace('<anonymous>', e.displayName)),
                                    s
                                );
                            }
                        while (1 <= i && 0 <= u);
                    break;
                }
        }
    } finally {
        (pi = !1), (Error.prepareStackTrace = n);
    }
    return (e = e ? e.displayName || e.name : '') ? Er(e) : '';
}
function i0(e) {
    switch (e.tag) {
        case 5:
            return Er(e.type);
        case 16:
            return Er('Lazy');
        case 13:
            return Er('Suspense');
        case 19:
            return Er('SuspenseList');
        case 0:
        case 2:
        case 15:
            return (e = vi(e.type, !1)), e;
        case 11:
            return (e = vi(e.type.render, !1)), e;
        case 1:
            return (e = vi(e.type, !0)), e;
        default:
            return '';
    }
}
function Ki(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
        case Nn:
            return 'Fragment';
        case Mn:
            return 'Portal';
        case Zi:
            return 'Profiler';
        case qu:
            return 'StrictMode';
        case Qi:
            return 'Suspense';
        case Gi:
            return 'SuspenseList';
    }
    if (typeof e == 'object')
        switch (e.$$typeof) {
            case Yc:
                return (e.displayName || 'Context') + '.Consumer';
            case Kc:
                return (e._context.displayName || 'Context') + '.Provider';
            case Ju:
                var t = e.render;
                return (
                    (e = e.displayName),
                    e ||
                        ((e = t.displayName || t.name || ''),
                        (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
                    e
                );
            case es:
                return (t = e.displayName || null), t !== null ? t : Ki(e.type) || 'Memo';
            case Tt:
                (t = e._payload), (e = e._init);
                try {
                    return Ki(e(t));
                } catch {}
        }
    return null;
}
function u0(e) {
    var t = e.type;
    switch (e.tag) {
        case 24:
            return 'Cache';
        case 9:
            return (t.displayName || 'Context') + '.Consumer';
        case 10:
            return (t._context.displayName || 'Context') + '.Provider';
        case 18:
            return 'DehydratedFragment';
        case 11:
            return (
                (e = t.render),
                (e = e.displayName || e.name || ''),
                t.displayName || (e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')
            );
        case 7:
            return 'Fragment';
        case 5:
            return t;
        case 4:
            return 'Portal';
        case 3:
            return 'Root';
        case 6:
            return 'Text';
        case 16:
            return Ki(t);
        case 8:
            return t === qu ? 'StrictMode' : 'Mode';
        case 22:
            return 'Offscreen';
        case 12:
            return 'Profiler';
        case 21:
            return 'Scope';
        case 13:
            return 'Suspense';
        case 19:
            return 'SuspenseList';
        case 25:
            return 'TracingMarker';
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
            if (typeof t == 'function') return t.displayName || t.name || null;
            if (typeof t == 'string') return t;
    }
    return null;
}
function Yt(e) {
    switch (typeof e) {
        case 'boolean':
        case 'number':
        case 'string':
        case 'undefined':
            return e;
        case 'object':
            return e;
        default:
            return '';
    }
}
function qc(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
}
function s0(e) {
    var t = qc(e) ? 'checked' : 'value',
        n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
        r = '' + e[t];
    if (
        !e.hasOwnProperty(t) &&
        typeof n < 'u' &&
        typeof n.get == 'function' &&
        typeof n.set == 'function'
    ) {
        var l = n.get,
            o = n.set;
        return (
            Object.defineProperty(e, t, {
                configurable: !0,
                get: function () {
                    return l.call(this);
                },
                set: function (i) {
                    (r = '' + i), o.call(this, i);
                },
            }),
            Object.defineProperty(e, t, { enumerable: n.enumerable }),
            {
                getValue: function () {
                    return r;
                },
                setValue: function (i) {
                    r = '' + i;
                },
                stopTracking: function () {
                    (e._valueTracker = null), delete e[t];
                },
            }
        );
    }
}
function El(e) {
    e._valueTracker || (e._valueTracker = s0(e));
}
function Jc(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
        r = '';
    return (
        e && (r = qc(e) ? (e.checked ? 'true' : 'false') : e.value),
        (e = r),
        e !== n ? (t.setValue(e), !0) : !1
    );
}
function Yl(e) {
    if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null;
    try {
        return e.activeElement || e.body;
    } catch {
        return e.body;
    }
}
function Yi(e, t) {
    var n = t.checked;
    return Q({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked,
    });
}
function ca(e, t) {
    var n = t.defaultValue == null ? '' : t.defaultValue,
        r = t.checked != null ? t.checked : t.defaultChecked;
    (n = Yt(t.value != null ? t.value : n)),
        (e._wrapperState = {
            initialChecked: r,
            initialValue: n,
            controlled:
                t.type === 'checkbox' || t.type === 'radio' ? t.checked != null : t.value != null,
        });
}
function ef(e, t) {
    (t = t.checked), t != null && Xu(e, 'checked', t, !1);
}
function Xi(e, t) {
    ef(e, t);
    var n = Yt(t.value),
        r = t.type;
    if (n != null)
        r === 'number'
            ? ((n === 0 && e.value === '') || e.value != n) && (e.value = '' + n)
            : e.value !== '' + n && (e.value = '' + n);
    else if (r === 'submit' || r === 'reset') {
        e.removeAttribute('value');
        return;
    }
    t.hasOwnProperty('value')
        ? qi(e, t.type, n)
        : t.hasOwnProperty('defaultValue') && qi(e, t.type, Yt(t.defaultValue)),
        t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function fa(e, t, n) {
    if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
        var r = t.type;
        if (!((r !== 'submit' && r !== 'reset') || (t.value !== void 0 && t.value !== null)))
            return;
        (t = '' + e._wrapperState.initialValue),
            n || t === e.value || (e.value = t),
            (e.defaultValue = t);
    }
    (n = e.name),
        n !== '' && (e.name = ''),
        (e.defaultChecked = !!e._wrapperState.initialChecked),
        n !== '' && (e.name = n);
}
function qi(e, t, n) {
    (t !== 'number' || Yl(e.ownerDocument) !== e) &&
        (n == null
            ? (e.defaultValue = '' + e._wrapperState.initialValue)
            : e.defaultValue !== '' + n && (e.defaultValue = '' + n));
}
var Cr = Array.isArray;
function bn(e, t, n, r) {
    if (((e = e.options), t)) {
        t = {};
        for (var l = 0; l < n.length; l++) t['$' + n[l]] = !0;
        for (n = 0; n < e.length; n++)
            (l = t.hasOwnProperty('$' + e[n].value)),
                e[n].selected !== l && (e[n].selected = l),
                l && r && (e[n].defaultSelected = !0);
    } else {
        for (n = '' + Yt(n), t = null, l = 0; l < e.length; l++) {
            if (e[l].value === n) {
                (e[l].selected = !0), r && (e[l].defaultSelected = !0);
                return;
            }
            t !== null || e[l].disabled || (t = e[l]);
        }
        t !== null && (t.selected = !0);
    }
}
function Ji(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(k(91));
    return Q({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: '' + e._wrapperState.initialValue,
    });
}
function da(e, t) {
    var n = t.value;
    if (n == null) {
        if (((n = t.children), (t = t.defaultValue), n != null)) {
            if (t != null) throw Error(k(92));
            if (Cr(n)) {
                if (1 < n.length) throw Error(k(93));
                n = n[0];
            }
            t = n;
        }
        t == null && (t = ''), (n = t);
    }
    e._wrapperState = { initialValue: Yt(n) };
}
function tf(e, t) {
    var n = Yt(t.value),
        r = Yt(t.defaultValue);
    n != null &&
        ((n = '' + n),
        n !== e.value && (e.value = n),
        t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
        r != null && (e.defaultValue = '' + r);
}
function pa(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== '' && t !== null && (e.value = t);
}
function nf(e) {
    switch (e) {
        case 'svg':
            return 'http://www.w3.org/2000/svg';
        case 'math':
            return 'http://www.w3.org/1998/Math/MathML';
        default:
            return 'http://www.w3.org/1999/xhtml';
    }
}
function eu(e, t) {
    return e == null || e === 'http://www.w3.org/1999/xhtml'
        ? nf(t)
        : e === 'http://www.w3.org/2000/svg' && t === 'foreignObject'
        ? 'http://www.w3.org/1999/xhtml'
        : e;
}
var Cl,
    rf = (function (e) {
        return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
            ? function (t, n, r, l) {
                  MSApp.execUnsafeLocalFunction(function () {
                      return e(t, n, r, l);
                  });
              }
            : e;
    })(function (e, t) {
        if (e.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in e) e.innerHTML = t;
        else {
            for (
                Cl = Cl || document.createElement('div'),
                    Cl.innerHTML = '<svg>' + t.valueOf().toString() + '</svg>',
                    t = Cl.firstChild;
                e.firstChild;

            )
                e.removeChild(e.firstChild);
            for (; t.firstChild; ) e.appendChild(t.firstChild);
        }
    });
function Ur(e, t) {
    if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
            n.nodeValue = t;
            return;
        }
    }
    e.textContent = t;
}
var Pr = {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0,
    },
    a0 = ['Webkit', 'ms', 'Moz', 'O'];
Object.keys(Pr).forEach(function (e) {
    a0.forEach(function (t) {
        (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Pr[t] = Pr[e]);
    });
});
function lf(e, t, n) {
    return t == null || typeof t == 'boolean' || t === ''
        ? ''
        : n || typeof t != 'number' || t === 0 || (Pr.hasOwnProperty(e) && Pr[e])
        ? ('' + t).trim()
        : t + 'px';
}
function of(e, t) {
    e = e.style;
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var r = n.indexOf('--') === 0,
                l = lf(n, t[n], r);
            n === 'float' && (n = 'cssFloat'), r ? e.setProperty(n, l) : (e[n] = l);
        }
}
var c0 = Q(
    { menuitem: !0 },
    {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0,
    },
);
function tu(e, t) {
    if (t) {
        if (c0[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
            throw Error(k(137, e));
        if (t.dangerouslySetInnerHTML != null) {
            if (t.children != null) throw Error(k(60));
            if (
                typeof t.dangerouslySetInnerHTML != 'object' ||
                !('__html' in t.dangerouslySetInnerHTML)
            )
                throw Error(k(61));
        }
        if (t.style != null && typeof t.style != 'object') throw Error(k(62));
    }
}
function nu(e, t) {
    if (e.indexOf('-') === -1) return typeof t.is == 'string';
    switch (e) {
        case 'annotation-xml':
        case 'color-profile':
        case 'font-face':
        case 'font-face-src':
        case 'font-face-uri':
        case 'font-face-format':
        case 'font-face-name':
        case 'missing-glyph':
            return !1;
        default:
            return !0;
    }
}
var ru = null;
function ts(e) {
    return (
        (e = e.target || e.srcElement || window),
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
    );
}
var lu = null,
    Hn = null,
    Bn = null;
function va(e) {
    if ((e = sl(e))) {
        if (typeof lu != 'function') throw Error(k(280));
        var t = e.stateNode;
        t && ((t = zo(t)), lu(e.stateNode, e.type, t));
    }
}
function uf(e) {
    Hn ? (Bn ? Bn.push(e) : (Bn = [e])) : (Hn = e);
}
function sf() {
    if (Hn) {
        var e = Hn,
            t = Bn;
        if (((Bn = Hn = null), va(e), t)) for (e = 0; e < t.length; e++) va(t[e]);
    }
}
function af(e, t) {
    return e(t);
}
function cf() {}
var hi = !1;
function ff(e, t, n) {
    if (hi) return e(t, n);
    hi = !0;
    try {
        return af(e, t, n);
    } finally {
        (hi = !1), (Hn !== null || Bn !== null) && (cf(), sf());
    }
}
function Wr(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = zo(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
        case 'onClick':
        case 'onClickCapture':
        case 'onDoubleClick':
        case 'onDoubleClickCapture':
        case 'onMouseDown':
        case 'onMouseDownCapture':
        case 'onMouseMove':
        case 'onMouseMoveCapture':
        case 'onMouseUp':
        case 'onMouseUpCapture':
        case 'onMouseEnter':
            (r = !r.disabled) ||
                ((e = e.type),
                (r = !(e === 'button' || e === 'input' || e === 'select' || e === 'textarea'))),
                (e = !r);
            break e;
        default:
            e = !1;
    }
    if (e) return null;
    if (n && typeof n != 'function') throw Error(k(231, t, typeof n));
    return n;
}
var ou = !1;
if (Ct)
    try {
        var vr = {};
        Object.defineProperty(vr, 'passive', {
            get: function () {
                ou = !0;
            },
        }),
            window.addEventListener('test', vr, vr),
            window.removeEventListener('test', vr, vr);
    } catch {
        ou = !1;
    }
function f0(e, t, n, r, l, o, i, u, s) {
    var a = Array.prototype.slice.call(arguments, 3);
    try {
        t.apply(n, a);
    } catch (c) {
        this.onError(c);
    }
}
var Rr = !1,
    Xl = null,
    ql = !1,
    iu = null,
    d0 = {
        onError: function (e) {
            (Rr = !0), (Xl = e);
        },
    };
function p0(e, t, n, r, l, o, i, u, s) {
    (Rr = !1), (Xl = null), f0.apply(d0, arguments);
}
function v0(e, t, n, r, l, o, i, u, s) {
    if ((p0.apply(this, arguments), Rr)) {
        if (Rr) {
            var a = Xl;
            (Rr = !1), (Xl = null);
        } else throw Error(k(198));
        ql || ((ql = !0), (iu = a));
    }
}
function Sn(e) {
    var t = e,
        n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
        e = t;
        do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
        while (e);
    }
    return t.tag === 3 ? n : null;
}
function df(e) {
    if (e.tag === 13) {
        var t = e.memoizedState;
        if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
            return t.dehydrated;
    }
    return null;
}
function ha(e) {
    if (Sn(e) !== e) throw Error(k(188));
}
function h0(e) {
    var t = e.alternate;
    if (!t) {
        if (((t = Sn(e)), t === null)) throw Error(k(188));
        return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
        var l = n.return;
        if (l === null) break;
        var o = l.alternate;
        if (o === null) {
            if (((r = l.return), r !== null)) {
                n = r;
                continue;
            }
            break;
        }
        if (l.child === o.child) {
            for (o = l.child; o; ) {
                if (o === n) return ha(l), e;
                if (o === r) return ha(l), t;
                o = o.sibling;
            }
            throw Error(k(188));
        }
        if (n.return !== r.return) (n = l), (r = o);
        else {
            for (var i = !1, u = l.child; u; ) {
                if (u === n) {
                    (i = !0), (n = l), (r = o);
                    break;
                }
                if (u === r) {
                    (i = !0), (r = l), (n = o);
                    break;
                }
                u = u.sibling;
            }
            if (!i) {
                for (u = o.child; u; ) {
                    if (u === n) {
                        (i = !0), (n = o), (r = l);
                        break;
                    }
                    if (u === r) {
                        (i = !0), (r = o), (n = l);
                        break;
                    }
                    u = u.sibling;
                }
                if (!i) throw Error(k(189));
            }
        }
        if (n.alternate !== r) throw Error(k(190));
    }
    if (n.tag !== 3) throw Error(k(188));
    return n.stateNode.current === n ? e : t;
}
function pf(e) {
    return (e = h0(e)), e !== null ? vf(e) : null;
}
function vf(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
        var t = vf(e);
        if (t !== null) return t;
        e = e.sibling;
    }
    return null;
}
var hf = ze.unstable_scheduleCallback,
    ma = ze.unstable_cancelCallback,
    m0 = ze.unstable_shouldYield,
    g0 = ze.unstable_requestPaint,
    X = ze.unstable_now,
    y0 = ze.unstable_getCurrentPriorityLevel,
    ns = ze.unstable_ImmediatePriority,
    mf = ze.unstable_UserBlockingPriority,
    Jl = ze.unstable_NormalPriority,
    w0 = ze.unstable_LowPriority,
    gf = ze.unstable_IdlePriority,
    Do = null,
    dt = null;
function S0(e) {
    if (dt && typeof dt.onCommitFiberRoot == 'function')
        try {
            dt.onCommitFiberRoot(Do, e, void 0, (e.current.flags & 128) === 128);
        } catch {}
}
var nt = Math.clz32 ? Math.clz32 : k0,
    E0 = Math.log,
    C0 = Math.LN2;
function k0(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((E0(e) / C0) | 0)) | 0;
}
var kl = 64,
    xl = 4194304;
function kr(e) {
    switch (e & -e) {
        case 1:
            return 1;
        case 2:
            return 2;
        case 4:
            return 4;
        case 8:
            return 8;
        case 16:
            return 16;
        case 32:
            return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return e & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return e & 130023424;
        case 134217728:
            return 134217728;
        case 268435456:
            return 268435456;
        case 536870912:
            return 536870912;
        case 1073741824:
            return 1073741824;
        default:
            return e;
    }
}
function eo(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0,
        l = e.suspendedLanes,
        o = e.pingedLanes,
        i = n & 268435455;
    if (i !== 0) {
        var u = i & ~l;
        u !== 0 ? (r = kr(u)) : ((o &= i), o !== 0 && (r = kr(o)));
    } else (i = n & ~l), i !== 0 ? (r = kr(i)) : o !== 0 && (r = kr(o));
    if (r === 0) return 0;
    if (
        t !== 0 &&
        t !== r &&
        !(t & l) &&
        ((l = r & -r), (o = t & -t), l >= o || (l === 16 && (o & 4194240) !== 0))
    )
        return t;
    if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
        for (e = e.entanglements, t &= r; 0 < t; )
            (n = 31 - nt(t)), (l = 1 << n), (r |= e[n]), (t &= ~l);
    return r;
}
function x0(e, t) {
    switch (e) {
        case 1:
        case 2:
        case 4:
            return t + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
            return -1;
        default:
            return -1;
    }
}
function _0(e, t) {
    for (
        var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes;
        0 < o;

    ) {
        var i = 31 - nt(o),
            u = 1 << i,
            s = l[i];
        s === -1 ? (!(u & n) || u & r) && (l[i] = x0(u, t)) : s <= t && (e.expiredLanes |= u),
            (o &= ~u);
    }
}
function uu(e) {
    return (e = e.pendingLanes & -1073741825), e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function yf() {
    var e = kl;
    return (kl <<= 1), !(kl & 4194240) && (kl = 64), e;
}
function mi(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
}
function il(e, t, n) {
    (e.pendingLanes |= t),
        t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
        (e = e.eventTimes),
        (t = 31 - nt(t)),
        (e[t] = n);
}
function P0(e, t) {
    var n = e.pendingLanes & ~t;
    (e.pendingLanes = t),
        (e.suspendedLanes = 0),
        (e.pingedLanes = 0),
        (e.expiredLanes &= t),
        (e.mutableReadLanes &= t),
        (e.entangledLanes &= t),
        (t = e.entanglements);
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
        var l = 31 - nt(n),
            o = 1 << l;
        (t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~o);
    }
}
function rs(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
        var r = 31 - nt(n),
            l = 1 << r;
        (l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l);
    }
}
var j = 0;
function wf(e) {
    return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var Sf,
    ls,
    Ef,
    Cf,
    kf,
    su = !1,
    _l = [],
    Ht = null,
    Bt = null,
    Vt = null,
    br = new Map(),
    Hr = new Map(),
    jt = [],
    R0 =
        'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
            ' ',
        );
function ga(e, t) {
    switch (e) {
        case 'focusin':
        case 'focusout':
            Ht = null;
            break;
        case 'dragenter':
        case 'dragleave':
            Bt = null;
            break;
        case 'mouseover':
        case 'mouseout':
            Vt = null;
            break;
        case 'pointerover':
        case 'pointerout':
            br.delete(t.pointerId);
            break;
        case 'gotpointercapture':
        case 'lostpointercapture':
            Hr.delete(t.pointerId);
    }
}
function hr(e, t, n, r, l, o) {
    return e === null || e.nativeEvent !== o
        ? ((e = {
              blockedOn: t,
              domEventName: n,
              eventSystemFlags: r,
              nativeEvent: o,
              targetContainers: [l],
          }),
          t !== null && ((t = sl(t)), t !== null && ls(t)),
          e)
        : ((e.eventSystemFlags |= r),
          (t = e.targetContainers),
          l !== null && t.indexOf(l) === -1 && t.push(l),
          e);
}
function M0(e, t, n, r, l) {
    switch (t) {
        case 'focusin':
            return (Ht = hr(Ht, e, t, n, r, l)), !0;
        case 'dragenter':
            return (Bt = hr(Bt, e, t, n, r, l)), !0;
        case 'mouseover':
            return (Vt = hr(Vt, e, t, n, r, l)), !0;
        case 'pointerover':
            var o = l.pointerId;
            return br.set(o, hr(br.get(o) || null, e, t, n, r, l)), !0;
        case 'gotpointercapture':
            return (o = l.pointerId), Hr.set(o, hr(Hr.get(o) || null, e, t, n, r, l)), !0;
    }
    return !1;
}
function xf(e) {
    var t = sn(e.target);
    if (t !== null) {
        var n = Sn(t);
        if (n !== null) {
            if (((t = n.tag), t === 13)) {
                if (((t = df(n)), t !== null)) {
                    (e.blockedOn = t),
                        kf(e.priority, function () {
                            Ef(n);
                        });
                    return;
                }
            } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
                e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                return;
            }
        }
    }
    e.blockedOn = null;
}
function Ul(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
        var n = au(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
            n = e.nativeEvent;
            var r = new n.constructor(n.type, n);
            (ru = r), n.target.dispatchEvent(r), (ru = null);
        } else return (t = sl(n)), t !== null && ls(t), (e.blockedOn = n), !1;
        t.shift();
    }
    return !0;
}
function ya(e, t, n) {
    Ul(e) && n.delete(t);
}
function N0() {
    (su = !1),
        Ht !== null && Ul(Ht) && (Ht = null),
        Bt !== null && Ul(Bt) && (Bt = null),
        Vt !== null && Ul(Vt) && (Vt = null),
        br.forEach(ya),
        Hr.forEach(ya);
}
function mr(e, t) {
    e.blockedOn === t &&
        ((e.blockedOn = null),
        su || ((su = !0), ze.unstable_scheduleCallback(ze.unstable_NormalPriority, N0)));
}
function Br(e) {
    function t(l) {
        return mr(l, e);
    }
    if (0 < _l.length) {
        mr(_l[0], e);
        for (var n = 1; n < _l.length; n++) {
            var r = _l[n];
            r.blockedOn === e && (r.blockedOn = null);
        }
    }
    for (
        Ht !== null && mr(Ht, e),
            Bt !== null && mr(Bt, e),
            Vt !== null && mr(Vt, e),
            br.forEach(t),
            Hr.forEach(t),
            n = 0;
        n < jt.length;
        n++
    )
        (r = jt[n]), r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < jt.length && ((n = jt[0]), n.blockedOn === null); )
        xf(n), n.blockedOn === null && jt.shift();
}
var Vn = Rt.ReactCurrentBatchConfig,
    to = !0;
function L0(e, t, n, r) {
    var l = j,
        o = Vn.transition;
    Vn.transition = null;
    try {
        (j = 1), os(e, t, n, r);
    } finally {
        (j = l), (Vn.transition = o);
    }
}
function O0(e, t, n, r) {
    var l = j,
        o = Vn.transition;
    Vn.transition = null;
    try {
        (j = 4), os(e, t, n, r);
    } finally {
        (j = l), (Vn.transition = o);
    }
}
function os(e, t, n, r) {
    if (to) {
        var l = au(e, t, n, r);
        if (l === null) Pi(e, t, r, no, n), ga(e, r);
        else if (M0(l, e, t, n, r)) r.stopPropagation();
        else if ((ga(e, r), t & 4 && -1 < R0.indexOf(e))) {
            for (; l !== null; ) {
                var o = sl(l);
                if (
                    (o !== null && Sf(o),
                    (o = au(e, t, n, r)),
                    o === null && Pi(e, t, r, no, n),
                    o === l)
                )
                    break;
                l = o;
            }
            l !== null && r.stopPropagation();
        } else Pi(e, t, r, null, n);
    }
}
var no = null;
function au(e, t, n, r) {
    if (((no = null), (e = ts(r)), (e = sn(e)), e !== null))
        if (((t = Sn(e)), t === null)) e = null;
        else if (((n = t.tag), n === 13)) {
            if (((e = df(t)), e !== null)) return e;
            e = null;
        } else if (n === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
                return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
        } else t !== e && (e = null);
    return (no = e), null;
}
function _f(e) {
    switch (e) {
        case 'cancel':
        case 'click':
        case 'close':
        case 'contextmenu':
        case 'copy':
        case 'cut':
        case 'auxclick':
        case 'dblclick':
        case 'dragend':
        case 'dragstart':
        case 'drop':
        case 'focusin':
        case 'focusout':
        case 'input':
        case 'invalid':
        case 'keydown':
        case 'keypress':
        case 'keyup':
        case 'mousedown':
        case 'mouseup':
        case 'paste':
        case 'pause':
        case 'play':
        case 'pointercancel':
        case 'pointerdown':
        case 'pointerup':
        case 'ratechange':
        case 'reset':
        case 'resize':
        case 'seeked':
        case 'submit':
        case 'touchcancel':
        case 'touchend':
        case 'touchstart':
        case 'volumechange':
        case 'change':
        case 'selectionchange':
        case 'textInput':
        case 'compositionstart':
        case 'compositionend':
        case 'compositionupdate':
        case 'beforeblur':
        case 'afterblur':
        case 'beforeinput':
        case 'blur':
        case 'fullscreenchange':
        case 'focus':
        case 'hashchange':
        case 'popstate':
        case 'select':
        case 'selectstart':
            return 1;
        case 'drag':
        case 'dragenter':
        case 'dragexit':
        case 'dragleave':
        case 'dragover':
        case 'mousemove':
        case 'mouseout':
        case 'mouseover':
        case 'pointermove':
        case 'pointerout':
        case 'pointerover':
        case 'scroll':
        case 'toggle':
        case 'touchmove':
        case 'wheel':
        case 'mouseenter':
        case 'mouseleave':
        case 'pointerenter':
        case 'pointerleave':
            return 4;
        case 'message':
            switch (y0()) {
                case ns:
                    return 1;
                case mf:
                    return 4;
                case Jl:
                case w0:
                    return 16;
                case gf:
                    return 536870912;
                default:
                    return 16;
            }
        default:
            return 16;
    }
}
var Wt = null,
    is = null,
    Wl = null;
function Pf() {
    if (Wl) return Wl;
    var e,
        t = is,
        n = t.length,
        r,
        l = 'value' in Wt ? Wt.value : Wt.textContent,
        o = l.length;
    for (e = 0; e < n && t[e] === l[e]; e++);
    var i = n - e;
    for (r = 1; r <= i && t[n - r] === l[o - r]; r++);
    return (Wl = l.slice(e, 1 < r ? 1 - r : void 0));
}
function bl(e) {
    var t = e.keyCode;
    return (
        'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
    );
}
function Pl() {
    return !0;
}
function wa() {
    return !1;
}
function Fe(e) {
    function t(n, r, l, o, i) {
        (this._reactName = n),
            (this._targetInst = l),
            (this.type = r),
            (this.nativeEvent = o),
            (this.target = i),
            (this.currentTarget = null);
        for (var u in e) e.hasOwnProperty(u) && ((n = e[u]), (this[u] = n ? n(o) : o[u]));
        return (
            (this.isDefaultPrevented = (
                o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
            )
                ? Pl
                : wa),
            (this.isPropagationStopped = wa),
            this
        );
    }
    return (
        Q(t.prototype, {
            preventDefault: function () {
                this.defaultPrevented = !0;
                var n = this.nativeEvent;
                n &&
                    (n.preventDefault
                        ? n.preventDefault()
                        : typeof n.returnValue != 'unknown' && (n.returnValue = !1),
                    (this.isDefaultPrevented = Pl));
            },
            stopPropagation: function () {
                var n = this.nativeEvent;
                n &&
                    (n.stopPropagation
                        ? n.stopPropagation()
                        : typeof n.cancelBubble != 'unknown' && (n.cancelBubble = !0),
                    (this.isPropagationStopped = Pl));
            },
            persist: function () {},
            isPersistent: Pl,
        }),
        t
    );
}
var nr = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (e) {
            return e.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
    },
    us = Fe(nr),
    ul = Q({}, nr, { view: 0, detail: 0 }),
    D0 = Fe(ul),
    gi,
    yi,
    gr,
    To = Q({}, ul, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: ss,
        button: 0,
        buttons: 0,
        relatedTarget: function (e) {
            return e.relatedTarget === void 0
                ? e.fromElement === e.srcElement
                    ? e.toElement
                    : e.fromElement
                : e.relatedTarget;
        },
        movementX: function (e) {
            return 'movementX' in e
                ? e.movementX
                : (e !== gr &&
                      (gr && e.type === 'mousemove'
                          ? ((gi = e.screenX - gr.screenX), (yi = e.screenY - gr.screenY))
                          : (yi = gi = 0),
                      (gr = e)),
                  gi);
        },
        movementY: function (e) {
            return 'movementY' in e ? e.movementY : yi;
        },
    }),
    Sa = Fe(To),
    T0 = Q({}, To, { dataTransfer: 0 }),
    A0 = Fe(T0),
    I0 = Q({}, ul, { relatedTarget: 0 }),
    wi = Fe(I0),
    z0 = Q({}, nr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    j0 = Fe(z0),
    F0 = Q({}, nr, {
        clipboardData: function (e) {
            return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
        },
    }),
    U0 = Fe(F0),
    W0 = Q({}, nr, { data: 0 }),
    Ea = Fe(W0),
    b0 = {
        Esc: 'Escape',
        Spacebar: ' ',
        Left: 'ArrowLeft',
        Up: 'ArrowUp',
        Right: 'ArrowRight',
        Down: 'ArrowDown',
        Del: 'Delete',
        Win: 'OS',
        Menu: 'ContextMenu',
        Apps: 'ContextMenu',
        Scroll: 'ScrollLock',
        MozPrintableKey: 'Unidentified',
    },
    H0 = {
        8: 'Backspace',
        9: 'Tab',
        12: 'Clear',
        13: 'Enter',
        16: 'Shift',
        17: 'Control',
        18: 'Alt',
        19: 'Pause',
        20: 'CapsLock',
        27: 'Escape',
        32: ' ',
        33: 'PageUp',
        34: 'PageDown',
        35: 'End',
        36: 'Home',
        37: 'ArrowLeft',
        38: 'ArrowUp',
        39: 'ArrowRight',
        40: 'ArrowDown',
        45: 'Insert',
        46: 'Delete',
        112: 'F1',
        113: 'F2',
        114: 'F3',
        115: 'F4',
        116: 'F5',
        117: 'F6',
        118: 'F7',
        119: 'F8',
        120: 'F9',
        121: 'F10',
        122: 'F11',
        123: 'F12',
        144: 'NumLock',
        145: 'ScrollLock',
        224: 'Meta',
    },
    B0 = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
function V0(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = B0[e]) ? !!t[e] : !1;
}
function ss() {
    return V0;
}
var $0 = Q({}, ul, {
        key: function (e) {
            if (e.key) {
                var t = b0[e.key] || e.key;
                if (t !== 'Unidentified') return t;
            }
            return e.type === 'keypress'
                ? ((e = bl(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
                : e.type === 'keydown' || e.type === 'keyup'
                ? H0[e.keyCode] || 'Unidentified'
                : '';
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: ss,
        charCode: function (e) {
            return e.type === 'keypress' ? bl(e) : 0;
        },
        keyCode: function (e) {
            return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
        },
        which: function (e) {
            return e.type === 'keypress'
                ? bl(e)
                : e.type === 'keydown' || e.type === 'keyup'
                ? e.keyCode
                : 0;
        },
    }),
    Z0 = Fe($0),
    Q0 = Q({}, To, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0,
    }),
    Ca = Fe(Q0),
    G0 = Q({}, ul, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: ss,
    }),
    K0 = Fe(G0),
    Y0 = Q({}, nr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    X0 = Fe(Y0),
    q0 = Q({}, To, {
        deltaX: function (e) {
            return 'deltaX' in e ? e.deltaX : 'wheelDeltaX' in e ? -e.wheelDeltaX : 0;
        },
        deltaY: function (e) {
            return 'deltaY' in e
                ? e.deltaY
                : 'wheelDeltaY' in e
                ? -e.wheelDeltaY
                : 'wheelDelta' in e
                ? -e.wheelDelta
                : 0;
        },
        deltaZ: 0,
        deltaMode: 0,
    }),
    J0 = Fe(q0),
    e2 = [9, 13, 27, 32],
    as = Ct && 'CompositionEvent' in window,
    Mr = null;
Ct && 'documentMode' in document && (Mr = document.documentMode);
var t2 = Ct && 'TextEvent' in window && !Mr,
    Rf = Ct && (!as || (Mr && 8 < Mr && 11 >= Mr)),
    ka = ' ',
    xa = !1;
function Mf(e, t) {
    switch (e) {
        case 'keyup':
            return e2.indexOf(t.keyCode) !== -1;
        case 'keydown':
            return t.keyCode !== 229;
        case 'keypress':
        case 'mousedown':
        case 'focusout':
            return !0;
        default:
            return !1;
    }
}
function Nf(e) {
    return (e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null;
}
var Ln = !1;
function n2(e, t) {
    switch (e) {
        case 'compositionend':
            return Nf(t);
        case 'keypress':
            return t.which !== 32 ? null : ((xa = !0), ka);
        case 'textInput':
            return (e = t.data), e === ka && xa ? null : e;
        default:
            return null;
    }
}
function r2(e, t) {
    if (Ln)
        return e === 'compositionend' || (!as && Mf(e, t))
            ? ((e = Pf()), (Wl = is = Wt = null), (Ln = !1), e)
            : null;
    switch (e) {
        case 'paste':
            return null;
        case 'keypress':
            if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
                if (t.char && 1 < t.char.length) return t.char;
                if (t.which) return String.fromCharCode(t.which);
            }
            return null;
        case 'compositionend':
            return Rf && t.locale !== 'ko' ? null : t.data;
        default:
            return null;
    }
}
var l2 = {
    color: !0,
    date: !0,
    datetime: !0,
    'datetime-local': !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
};
function _a(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!l2[e.type] : t === 'textarea';
}
function Lf(e, t, n, r) {
    uf(r),
        (t = ro(t, 'onChange')),
        0 < t.length &&
            ((n = new us('onChange', 'change', null, n, r)), e.push({ event: n, listeners: t }));
}
var Nr = null,
    Vr = null;
function o2(e) {
    bf(e, 0);
}
function Ao(e) {
    var t = Tn(e);
    if (Jc(t)) return e;
}
function i2(e, t) {
    if (e === 'change') return t;
}
var Of = !1;
if (Ct) {
    var Si;
    if (Ct) {
        var Ei = 'oninput' in document;
        if (!Ei) {
            var Pa = document.createElement('div');
            Pa.setAttribute('oninput', 'return;'), (Ei = typeof Pa.oninput == 'function');
        }
        Si = Ei;
    } else Si = !1;
    Of = Si && (!document.documentMode || 9 < document.documentMode);
}
function Ra() {
    Nr && (Nr.detachEvent('onpropertychange', Df), (Vr = Nr = null));
}
function Df(e) {
    if (e.propertyName === 'value' && Ao(Vr)) {
        var t = [];
        Lf(t, Vr, e, ts(e)), ff(o2, t);
    }
}
function u2(e, t, n) {
    e === 'focusin'
        ? (Ra(), (Nr = t), (Vr = n), Nr.attachEvent('onpropertychange', Df))
        : e === 'focusout' && Ra();
}
function s2(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return Ao(Vr);
}
function a2(e, t) {
    if (e === 'click') return Ao(t);
}
function c2(e, t) {
    if (e === 'input' || e === 'change') return Ao(t);
}
function f2(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var lt = typeof Object.is == 'function' ? Object.is : f2;
function $r(e, t) {
    if (lt(e, t)) return !0;
    if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
    var n = Object.keys(e),
        r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
        var l = n[r];
        if (!$i.call(t, l) || !lt(e[l], t[l])) return !1;
    }
    return !0;
}
function Ma(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
}
function Na(e, t) {
    var n = Ma(e);
    e = 0;
    for (var r; n; ) {
        if (n.nodeType === 3) {
            if (((r = e + n.textContent.length), e <= t && r >= t))
                return { node: n, offset: t - e };
            e = r;
        }
        e: {
            for (; n; ) {
                if (n.nextSibling) {
                    n = n.nextSibling;
                    break e;
                }
                n = n.parentNode;
            }
            n = void 0;
        }
        n = Ma(n);
    }
}
function Tf(e, t) {
    return e && t
        ? e === t
            ? !0
            : e && e.nodeType === 3
            ? !1
            : t && t.nodeType === 3
            ? Tf(e, t.parentNode)
            : 'contains' in e
            ? e.contains(t)
            : e.compareDocumentPosition
            ? !!(e.compareDocumentPosition(t) & 16)
            : !1
        : !1;
}
function Af() {
    for (var e = window, t = Yl(); t instanceof e.HTMLIFrameElement; ) {
        try {
            var n = typeof t.contentWindow.location.href == 'string';
        } catch {
            n = !1;
        }
        if (n) e = t.contentWindow;
        else break;
        t = Yl(e.document);
    }
    return t;
}
function cs(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
        t &&
        ((t === 'input' &&
            (e.type === 'text' ||
                e.type === 'search' ||
                e.type === 'tel' ||
                e.type === 'url' ||
                e.type === 'password')) ||
            t === 'textarea' ||
            e.contentEditable === 'true')
    );
}
function d2(e) {
    var t = Af(),
        n = e.focusedElem,
        r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && Tf(n.ownerDocument.documentElement, n)) {
        if (r !== null && cs(n)) {
            if (((t = r.start), (e = r.end), e === void 0 && (e = t), 'selectionStart' in n))
                (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
            else if (
                ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
                e.getSelection)
            ) {
                e = e.getSelection();
                var l = n.textContent.length,
                    o = Math.min(r.start, l);
                (r = r.end === void 0 ? o : Math.min(r.end, l)),
                    !e.extend && o > r && ((l = r), (r = o), (o = l)),
                    (l = Na(n, o));
                var i = Na(n, r);
                l &&
                    i &&
                    (e.rangeCount !== 1 ||
                        e.anchorNode !== l.node ||
                        e.anchorOffset !== l.offset ||
                        e.focusNode !== i.node ||
                        e.focusOffset !== i.offset) &&
                    ((t = t.createRange()),
                    t.setStart(l.node, l.offset),
                    e.removeAllRanges(),
                    o > r
                        ? (e.addRange(t), e.extend(i.node, i.offset))
                        : (t.setEnd(i.node, i.offset), e.addRange(t)));
            }
        }
        for (t = [], e = n; (e = e.parentNode); )
            e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
        for (typeof n.focus == 'function' && n.focus(), n = 0; n < t.length; n++)
            (e = t[n]), (e.element.scrollLeft = e.left), (e.element.scrollTop = e.top);
    }
}
var p2 = Ct && 'documentMode' in document && 11 >= document.documentMode,
    On = null,
    cu = null,
    Lr = null,
    fu = !1;
function La(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    fu ||
        On == null ||
        On !== Yl(r) ||
        ((r = On),
        'selectionStart' in r && cs(r)
            ? (r = { start: r.selectionStart, end: r.selectionEnd })
            : ((r = ((r.ownerDocument && r.ownerDocument.defaultView) || window).getSelection()),
              (r = {
                  anchorNode: r.anchorNode,
                  anchorOffset: r.anchorOffset,
                  focusNode: r.focusNode,
                  focusOffset: r.focusOffset,
              })),
        (Lr && $r(Lr, r)) ||
            ((Lr = r),
            (r = ro(cu, 'onSelect')),
            0 < r.length &&
                ((t = new us('onSelect', 'select', null, t, n)),
                e.push({ event: t, listeners: r }),
                (t.target = On))));
}
function Rl(e, t) {
    var n = {};
    return (
        (n[e.toLowerCase()] = t.toLowerCase()),
        (n['Webkit' + e] = 'webkit' + t),
        (n['Moz' + e] = 'moz' + t),
        n
    );
}
var Dn = {
        animationend: Rl('Animation', 'AnimationEnd'),
        animationiteration: Rl('Animation', 'AnimationIteration'),
        animationstart: Rl('Animation', 'AnimationStart'),
        transitionend: Rl('Transition', 'TransitionEnd'),
    },
    Ci = {},
    If = {};
Ct &&
    ((If = document.createElement('div').style),
    'AnimationEvent' in window ||
        (delete Dn.animationend.animation,
        delete Dn.animationiteration.animation,
        delete Dn.animationstart.animation),
    'TransitionEvent' in window || delete Dn.transitionend.transition);
function Io(e) {
    if (Ci[e]) return Ci[e];
    if (!Dn[e]) return e;
    var t = Dn[e],
        n;
    for (n in t) if (t.hasOwnProperty(n) && n in If) return (Ci[e] = t[n]);
    return e;
}
var zf = Io('animationend'),
    jf = Io('animationiteration'),
    Ff = Io('animationstart'),
    Uf = Io('transitionend'),
    Wf = new Map(),
    Oa =
        'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
            ' ',
        );
function Jt(e, t) {
    Wf.set(e, t), wn(t, [e]);
}
for (var ki = 0; ki < Oa.length; ki++) {
    var xi = Oa[ki],
        v2 = xi.toLowerCase(),
        h2 = xi[0].toUpperCase() + xi.slice(1);
    Jt(v2, 'on' + h2);
}
Jt(zf, 'onAnimationEnd');
Jt(jf, 'onAnimationIteration');
Jt(Ff, 'onAnimationStart');
Jt('dblclick', 'onDoubleClick');
Jt('focusin', 'onFocus');
Jt('focusout', 'onBlur');
Jt(Uf, 'onTransitionEnd');
Gn('onMouseEnter', ['mouseout', 'mouseover']);
Gn('onMouseLeave', ['mouseout', 'mouseover']);
Gn('onPointerEnter', ['pointerout', 'pointerover']);
Gn('onPointerLeave', ['pointerout', 'pointerover']);
wn('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' '));
wn(
    'onSelect',
    'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' ',
    ),
);
wn('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']);
wn('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' '));
wn('onCompositionStart', 'compositionstart focusout keydown keypress keyup mousedown'.split(' '));
wn('onCompositionUpdate', 'compositionupdate focusout keydown keypress keyup mousedown'.split(' '));
var xr =
        'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
            ' ',
        ),
    m2 = new Set('cancel close invalid load scroll toggle'.split(' ').concat(xr));
function Da(e, t, n) {
    var r = e.type || 'unknown-event';
    (e.currentTarget = n), v0(r, t, void 0, e), (e.currentTarget = null);
}
function bf(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
        var r = e[n],
            l = r.event;
        r = r.listeners;
        e: {
            var o = void 0;
            if (t)
                for (var i = r.length - 1; 0 <= i; i--) {
                    var u = r[i],
                        s = u.instance,
                        a = u.currentTarget;
                    if (((u = u.listener), s !== o && l.isPropagationStopped())) break e;
                    Da(l, u, a), (o = s);
                }
            else
                for (i = 0; i < r.length; i++) {
                    if (
                        ((u = r[i]),
                        (s = u.instance),
                        (a = u.currentTarget),
                        (u = u.listener),
                        s !== o && l.isPropagationStopped())
                    )
                        break e;
                    Da(l, u, a), (o = s);
                }
        }
    }
    if (ql) throw ((e = iu), (ql = !1), (iu = null), e);
}
function b(e, t) {
    var n = t[mu];
    n === void 0 && (n = t[mu] = new Set());
    var r = e + '__bubble';
    n.has(r) || (Hf(t, e, 2, !1), n.add(r));
}
function _i(e, t, n) {
    var r = 0;
    t && (r |= 4), Hf(n, e, r, t);
}
var Ml = '_reactListening' + Math.random().toString(36).slice(2);
function Zr(e) {
    if (!e[Ml]) {
        (e[Ml] = !0),
            Gc.forEach(function (n) {
                n !== 'selectionchange' && (m2.has(n) || _i(n, !1, e), _i(n, !0, e));
            });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[Ml] || ((t[Ml] = !0), _i('selectionchange', !1, t));
    }
}
function Hf(e, t, n, r) {
    switch (_f(t)) {
        case 1:
            var l = L0;
            break;
        case 4:
            l = O0;
            break;
        default:
            l = os;
    }
    (n = l.bind(null, t, n, e)),
        (l = void 0),
        !ou || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (l = !0),
        r
            ? l !== void 0
                ? e.addEventListener(t, n, { capture: !0, passive: l })
                : e.addEventListener(t, n, !0)
            : l !== void 0
            ? e.addEventListener(t, n, { passive: l })
            : e.addEventListener(t, n, !1);
}
function Pi(e, t, n, r, l) {
    var o = r;
    if (!(t & 1) && !(t & 2) && r !== null)
        e: for (;;) {
            if (r === null) return;
            var i = r.tag;
            if (i === 3 || i === 4) {
                var u = r.stateNode.containerInfo;
                if (u === l || (u.nodeType === 8 && u.parentNode === l)) break;
                if (i === 4)
                    for (i = r.return; i !== null; ) {
                        var s = i.tag;
                        if (
                            (s === 3 || s === 4) &&
                            ((s = i.stateNode.containerInfo),
                            s === l || (s.nodeType === 8 && s.parentNode === l))
                        )
                            return;
                        i = i.return;
                    }
                for (; u !== null; ) {
                    if (((i = sn(u)), i === null)) return;
                    if (((s = i.tag), s === 5 || s === 6)) {
                        r = o = i;
                        continue e;
                    }
                    u = u.parentNode;
                }
            }
            r = r.return;
        }
    ff(function () {
        var a = o,
            c = ts(n),
            f = [];
        e: {
            var h = Wf.get(e);
            if (h !== void 0) {
                var g = us,
                    S = e;
                switch (e) {
                    case 'keypress':
                        if (bl(n) === 0) break e;
                    case 'keydown':
                    case 'keyup':
                        g = Z0;
                        break;
                    case 'focusin':
                        (S = 'focus'), (g = wi);
                        break;
                    case 'focusout':
                        (S = 'blur'), (g = wi);
                        break;
                    case 'beforeblur':
                    case 'afterblur':
                        g = wi;
                        break;
                    case 'click':
                        if (n.button === 2) break e;
                    case 'auxclick':
                    case 'dblclick':
                    case 'mousedown':
                    case 'mousemove':
                    case 'mouseup':
                    case 'mouseout':
                    case 'mouseover':
                    case 'contextmenu':
                        g = Sa;
                        break;
                    case 'drag':
                    case 'dragend':
                    case 'dragenter':
                    case 'dragexit':
                    case 'dragleave':
                    case 'dragover':
                    case 'dragstart':
                    case 'drop':
                        g = A0;
                        break;
                    case 'touchcancel':
                    case 'touchend':
                    case 'touchmove':
                    case 'touchstart':
                        g = K0;
                        break;
                    case zf:
                    case jf:
                    case Ff:
                        g = j0;
                        break;
                    case Uf:
                        g = X0;
                        break;
                    case 'scroll':
                        g = D0;
                        break;
                    case 'wheel':
                        g = J0;
                        break;
                    case 'copy':
                    case 'cut':
                    case 'paste':
                        g = U0;
                        break;
                    case 'gotpointercapture':
                    case 'lostpointercapture':
                    case 'pointercancel':
                    case 'pointerdown':
                    case 'pointermove':
                    case 'pointerout':
                    case 'pointerover':
                    case 'pointerup':
                        g = Ca;
                }
                var y = (t & 4) !== 0,
                    N = !y && e === 'scroll',
                    p = y ? (h !== null ? h + 'Capture' : null) : h;
                y = [];
                for (var d = a, v; d !== null; ) {
                    v = d;
                    var w = v.stateNode;
                    if (
                        (v.tag === 5 &&
                            w !== null &&
                            ((v = w),
                            p !== null && ((w = Wr(d, p)), w != null && y.push(Qr(d, w, v)))),
                        N)
                    )
                        break;
                    d = d.return;
                }
                0 < y.length && ((h = new g(h, S, null, n, c)), f.push({ event: h, listeners: y }));
            }
        }
        if (!(t & 7)) {
            e: {
                if (
                    ((h = e === 'mouseover' || e === 'pointerover'),
                    (g = e === 'mouseout' || e === 'pointerout'),
                    h && n !== ru && (S = n.relatedTarget || n.fromElement) && (sn(S) || S[kt]))
                )
                    break e;
                if (
                    (g || h) &&
                    ((h =
                        c.window === c
                            ? c
                            : (h = c.ownerDocument)
                            ? h.defaultView || h.parentWindow
                            : window),
                    g
                        ? ((S = n.relatedTarget || n.toElement),
                          (g = a),
                          (S = S ? sn(S) : null),
                          S !== null &&
                              ((N = Sn(S)), S !== N || (S.tag !== 5 && S.tag !== 6)) &&
                              (S = null))
                        : ((g = null), (S = a)),
                    g !== S)
                ) {
                    if (
                        ((y = Sa),
                        (w = 'onMouseLeave'),
                        (p = 'onMouseEnter'),
                        (d = 'mouse'),
                        (e === 'pointerout' || e === 'pointerover') &&
                            ((y = Ca),
                            (w = 'onPointerLeave'),
                            (p = 'onPointerEnter'),
                            (d = 'pointer')),
                        (N = g == null ? h : Tn(g)),
                        (v = S == null ? h : Tn(S)),
                        (h = new y(w, d + 'leave', g, n, c)),
                        (h.target = N),
                        (h.relatedTarget = v),
                        (w = null),
                        sn(c) === a &&
                            ((y = new y(p, d + 'enter', S, n, c)),
                            (y.target = v),
                            (y.relatedTarget = N),
                            (w = y)),
                        (N = w),
                        g && S)
                    )
                        t: {
                            for (y = g, p = S, d = 0, v = y; v; v = Rn(v)) d++;
                            for (v = 0, w = p; w; w = Rn(w)) v++;
                            for (; 0 < d - v; ) (y = Rn(y)), d--;
                            for (; 0 < v - d; ) (p = Rn(p)), v--;
                            for (; d--; ) {
                                if (y === p || (p !== null && y === p.alternate)) break t;
                                (y = Rn(y)), (p = Rn(p));
                            }
                            y = null;
                        }
                    else y = null;
                    g !== null && Ta(f, h, g, y, !1),
                        S !== null && N !== null && Ta(f, N, S, y, !0);
                }
            }
            e: {
                if (
                    ((h = a ? Tn(a) : window),
                    (g = h.nodeName && h.nodeName.toLowerCase()),
                    g === 'select' || (g === 'input' && h.type === 'file'))
                )
                    var x = i2;
                else if (_a(h))
                    if (Of) x = c2;
                    else {
                        x = s2;
                        var C = u2;
                    }
                else
                    (g = h.nodeName) &&
                        g.toLowerCase() === 'input' &&
                        (h.type === 'checkbox' || h.type === 'radio') &&
                        (x = a2);
                if (x && (x = x(e, a))) {
                    Lf(f, x, n, c);
                    break e;
                }
                C && C(e, h, a),
                    e === 'focusout' &&
                        (C = h._wrapperState) &&
                        C.controlled &&
                        h.type === 'number' &&
                        qi(h, 'number', h.value);
            }
            switch (((C = a ? Tn(a) : window), e)) {
                case 'focusin':
                    (_a(C) || C.contentEditable === 'true') && ((On = C), (cu = a), (Lr = null));
                    break;
                case 'focusout':
                    Lr = cu = On = null;
                    break;
                case 'mousedown':
                    fu = !0;
                    break;
                case 'contextmenu':
                case 'mouseup':
                case 'dragend':
                    (fu = !1), La(f, n, c);
                    break;
                case 'selectionchange':
                    if (p2) break;
                case 'keydown':
                case 'keyup':
                    La(f, n, c);
            }
            var E;
            if (as)
                e: {
                    switch (e) {
                        case 'compositionstart':
                            var _ = 'onCompositionStart';
                            break e;
                        case 'compositionend':
                            _ = 'onCompositionEnd';
                            break e;
                        case 'compositionupdate':
                            _ = 'onCompositionUpdate';
                            break e;
                    }
                    _ = void 0;
                }
            else
                Ln
                    ? Mf(e, n) && (_ = 'onCompositionEnd')
                    : e === 'keydown' && n.keyCode === 229 && (_ = 'onCompositionStart');
            _ &&
                (Rf &&
                    n.locale !== 'ko' &&
                    (Ln || _ !== 'onCompositionStart'
                        ? _ === 'onCompositionEnd' && Ln && (E = Pf())
                        : ((Wt = c), (is = 'value' in Wt ? Wt.value : Wt.textContent), (Ln = !0))),
                (C = ro(a, _)),
                0 < C.length &&
                    ((_ = new Ea(_, e, null, n, c)),
                    f.push({ event: _, listeners: C }),
                    E ? (_.data = E) : ((E = Nf(n)), E !== null && (_.data = E)))),
                (E = t2 ? n2(e, n) : r2(e, n)) &&
                    ((a = ro(a, 'onBeforeInput')),
                    0 < a.length &&
                        ((c = new Ea('onBeforeInput', 'beforeinput', null, n, c)),
                        f.push({ event: c, listeners: a }),
                        (c.data = E)));
        }
        bf(f, t);
    });
}
function Qr(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
}
function ro(e, t) {
    for (var n = t + 'Capture', r = []; e !== null; ) {
        var l = e,
            o = l.stateNode;
        l.tag === 5 &&
            o !== null &&
            ((l = o),
            (o = Wr(e, n)),
            o != null && r.unshift(Qr(e, o, l)),
            (o = Wr(e, t)),
            o != null && r.push(Qr(e, o, l))),
            (e = e.return);
    }
    return r;
}
function Rn(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5);
    return e || null;
}
function Ta(e, t, n, r, l) {
    for (var o = t._reactName, i = []; n !== null && n !== r; ) {
        var u = n,
            s = u.alternate,
            a = u.stateNode;
        if (s !== null && s === r) break;
        u.tag === 5 &&
            a !== null &&
            ((u = a),
            l
                ? ((s = Wr(n, o)), s != null && i.unshift(Qr(n, s, u)))
                : l || ((s = Wr(n, o)), s != null && i.push(Qr(n, s, u)))),
            (n = n.return);
    }
    i.length !== 0 && e.push({ event: t, listeners: i });
}
var g2 = /\r\n?/g,
    y2 = /\u0000|\uFFFD/g;
function Aa(e) {
    return (typeof e == 'string' ? e : '' + e)
        .replace(
            g2,
            `
`,
        )
        .replace(y2, '');
}
function Nl(e, t, n) {
    if (((t = Aa(t)), Aa(e) !== t && n)) throw Error(k(425));
}
function lo() {}
var du = null,
    pu = null;
function vu(e, t) {
    return (
        e === 'textarea' ||
        e === 'noscript' ||
        typeof t.children == 'string' ||
        typeof t.children == 'number' ||
        (typeof t.dangerouslySetInnerHTML == 'object' &&
            t.dangerouslySetInnerHTML !== null &&
            t.dangerouslySetInnerHTML.__html != null)
    );
}
var hu = typeof setTimeout == 'function' ? setTimeout : void 0,
    w2 = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    Ia = typeof Promise == 'function' ? Promise : void 0,
    S2 =
        typeof queueMicrotask == 'function'
            ? queueMicrotask
            : typeof Ia < 'u'
            ? function (e) {
                  return Ia.resolve(null).then(e).catch(E2);
              }
            : hu;
function E2(e) {
    setTimeout(function () {
        throw e;
    });
}
function Ri(e, t) {
    var n = t,
        r = 0;
    do {
        var l = n.nextSibling;
        if ((e.removeChild(n), l && l.nodeType === 8))
            if (((n = l.data), n === '/$')) {
                if (r === 0) {
                    e.removeChild(l), Br(t);
                    return;
                }
                r--;
            } else (n !== '$' && n !== '$?' && n !== '$!') || r++;
        n = l;
    } while (n);
    Br(t);
}
function $t(e) {
    for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
            if (((t = e.data), t === '$' || t === '$!' || t === '$?')) break;
            if (t === '/$') return null;
        }
    }
    return e;
}
function za(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
        if (e.nodeType === 8) {
            var n = e.data;
            if (n === '$' || n === '$!' || n === '$?') {
                if (t === 0) return e;
                t--;
            } else n === '/$' && t++;
        }
        e = e.previousSibling;
    }
    return null;
}
var rr = Math.random().toString(36).slice(2),
    ct = '__reactFiber$' + rr,
    Gr = '__reactProps$' + rr,
    kt = '__reactContainer$' + rr,
    mu = '__reactEvents$' + rr,
    C2 = '__reactListeners$' + rr,
    k2 = '__reactHandles$' + rr;
function sn(e) {
    var t = e[ct];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
        if ((t = n[kt] || n[ct])) {
            if (((n = t.alternate), t.child !== null || (n !== null && n.child !== null)))
                for (e = za(e); e !== null; ) {
                    if ((n = e[ct])) return n;
                    e = za(e);
                }
            return t;
        }
        (e = n), (n = e.parentNode);
    }
    return null;
}
function sl(e) {
    return (
        (e = e[ct] || e[kt]),
        !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
    );
}
function Tn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(k(33));
}
function zo(e) {
    return e[Gr] || null;
}
var gu = [],
    An = -1;
function en(e) {
    return { current: e };
}
function H(e) {
    0 > An || ((e.current = gu[An]), (gu[An] = null), An--);
}
function W(e, t) {
    An++, (gu[An] = e.current), (e.current = t);
}
var Xt = {},
    me = en(Xt),
    _e = en(!1),
    vn = Xt;
function Kn(e, t) {
    var n = e.type.contextTypes;
    if (!n) return Xt;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
    var l = {},
        o;
    for (o in n) l[o] = t[o];
    return (
        r &&
            ((e = e.stateNode),
            (e.__reactInternalMemoizedUnmaskedChildContext = t),
            (e.__reactInternalMemoizedMaskedChildContext = l)),
        l
    );
}
function Pe(e) {
    return (e = e.childContextTypes), e != null;
}
function oo() {
    H(_e), H(me);
}
function ja(e, t, n) {
    if (me.current !== Xt) throw Error(k(168));
    W(me, t), W(_e, n);
}
function Bf(e, t, n) {
    var r = e.stateNode;
    if (((t = t.childContextTypes), typeof r.getChildContext != 'function')) return n;
    r = r.getChildContext();
    for (var l in r) if (!(l in t)) throw Error(k(108, u0(e) || 'Unknown', l));
    return Q({}, n, r);
}
function io(e) {
    return (
        (e = ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Xt),
        (vn = me.current),
        W(me, e),
        W(_e, _e.current),
        !0
    );
}
function Fa(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(k(169));
    n
        ? ((e = Bf(e, t, vn)),
          (r.__reactInternalMemoizedMergedChildContext = e),
          H(_e),
          H(me),
          W(me, e))
        : H(_e),
        W(_e, n);
}
var yt = null,
    jo = !1,
    Mi = !1;
function Vf(e) {
    yt === null ? (yt = [e]) : yt.push(e);
}
function x2(e) {
    (jo = !0), Vf(e);
}
function tn() {
    if (!Mi && yt !== null) {
        Mi = !0;
        var e = 0,
            t = j;
        try {
            var n = yt;
            for (j = 1; e < n.length; e++) {
                var r = n[e];
                do r = r(!0);
                while (r !== null);
            }
            (yt = null), (jo = !1);
        } catch (l) {
            throw (yt !== null && (yt = yt.slice(e + 1)), hf(ns, tn), l);
        } finally {
            (j = t), (Mi = !1);
        }
    }
    return null;
}
var In = [],
    zn = 0,
    uo = null,
    so = 0,
    He = [],
    Be = 0,
    hn = null,
    wt = 1,
    St = '';
function on(e, t) {
    (In[zn++] = so), (In[zn++] = uo), (uo = e), (so = t);
}
function $f(e, t, n) {
    (He[Be++] = wt), (He[Be++] = St), (He[Be++] = hn), (hn = e);
    var r = wt;
    e = St;
    var l = 32 - nt(r) - 1;
    (r &= ~(1 << l)), (n += 1);
    var o = 32 - nt(t) + l;
    if (30 < o) {
        var i = l - (l % 5);
        (o = (r & ((1 << i) - 1)).toString(32)),
            (r >>= i),
            (l -= i),
            (wt = (1 << (32 - nt(t) + l)) | (n << l) | r),
            (St = o + e);
    } else (wt = (1 << o) | (n << l) | r), (St = e);
}
function fs(e) {
    e.return !== null && (on(e, 1), $f(e, 1, 0));
}
function ds(e) {
    for (; e === uo; ) (uo = In[--zn]), (In[zn] = null), (so = In[--zn]), (In[zn] = null);
    for (; e === hn; )
        (hn = He[--Be]),
            (He[Be] = null),
            (St = He[--Be]),
            (He[Be] = null),
            (wt = He[--Be]),
            (He[Be] = null);
}
var Ie = null,
    Ae = null,
    V = !1,
    tt = null;
function Zf(e, t) {
    var n = Ve(5, null, null, 0);
    (n.elementType = 'DELETED'),
        (n.stateNode = t),
        (n.return = e),
        (t = e.deletions),
        t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function Ua(e, t) {
    switch (e.tag) {
        case 5:
            var n = e.type;
            return (
                (t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t),
                t !== null ? ((e.stateNode = t), (Ie = e), (Ae = $t(t.firstChild)), !0) : !1
            );
        case 6:
            return (
                (t = e.pendingProps === '' || t.nodeType !== 3 ? null : t),
                t !== null ? ((e.stateNode = t), (Ie = e), (Ae = null), !0) : !1
            );
        case 13:
            return (
                (t = t.nodeType !== 8 ? null : t),
                t !== null
                    ? ((n = hn !== null ? { id: wt, overflow: St } : null),
                      (e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }),
                      (n = Ve(18, null, null, 0)),
                      (n.stateNode = t),
                      (n.return = e),
                      (e.child = n),
                      (Ie = e),
                      (Ae = null),
                      !0)
                    : !1
            );
        default:
            return !1;
    }
}
function yu(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function wu(e) {
    if (V) {
        var t = Ae;
        if (t) {
            var n = t;
            if (!Ua(e, t)) {
                if (yu(e)) throw Error(k(418));
                t = $t(n.nextSibling);
                var r = Ie;
                t && Ua(e, t) ? Zf(r, n) : ((e.flags = (e.flags & -4097) | 2), (V = !1), (Ie = e));
            }
        } else {
            if (yu(e)) throw Error(k(418));
            (e.flags = (e.flags & -4097) | 2), (V = !1), (Ie = e);
        }
    }
}
function Wa(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    Ie = e;
}
function Ll(e) {
    if (e !== Ie) return !1;
    if (!V) return Wa(e), (V = !0), !1;
    var t;
    if (
        ((t = e.tag !== 3) &&
            !(t = e.tag !== 5) &&
            ((t = e.type), (t = t !== 'head' && t !== 'body' && !vu(e.type, e.memoizedProps))),
        t && (t = Ae))
    ) {
        if (yu(e)) throw (Qf(), Error(k(418)));
        for (; t; ) Zf(e, t), (t = $t(t.nextSibling));
    }
    if ((Wa(e), e.tag === 13)) {
        if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
            throw Error(k(317));
        e: {
            for (e = e.nextSibling, t = 0; e; ) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === '/$') {
                        if (t === 0) {
                            Ae = $t(e.nextSibling);
                            break e;
                        }
                        t--;
                    } else (n !== '$' && n !== '$!' && n !== '$?') || t++;
                }
                e = e.nextSibling;
            }
            Ae = null;
        }
    } else Ae = Ie ? $t(e.stateNode.nextSibling) : null;
    return !0;
}
function Qf() {
    for (var e = Ae; e; ) e = $t(e.nextSibling);
}
function Yn() {
    (Ae = Ie = null), (V = !1);
}
function ps(e) {
    tt === null ? (tt = [e]) : tt.push(e);
}
var _2 = Rt.ReactCurrentBatchConfig;
function Je(e, t) {
    if (e && e.defaultProps) {
        (t = Q({}, t)), (e = e.defaultProps);
        for (var n in e) t[n] === void 0 && (t[n] = e[n]);
        return t;
    }
    return t;
}
var ao = en(null),
    co = null,
    jn = null,
    vs = null;
function hs() {
    vs = jn = co = null;
}
function ms(e) {
    var t = ao.current;
    H(ao), (e._currentValue = t);
}
function Su(e, t, n) {
    for (; e !== null; ) {
        var r = e.alternate;
        if (
            ((e.childLanes & t) !== t
                ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
                : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
            e === n)
        )
            break;
        e = e.return;
    }
}
function $n(e, t) {
    (co = e),
        (vs = jn = null),
        (e = e.dependencies),
        e !== null &&
            e.firstContext !== null &&
            (e.lanes & t && (xe = !0), (e.firstContext = null));
}
function Ze(e) {
    var t = e._currentValue;
    if (vs !== e)
        if (((e = { context: e, memoizedValue: t, next: null }), jn === null)) {
            if (co === null) throw Error(k(308));
            (jn = e), (co.dependencies = { lanes: 0, firstContext: e });
        } else jn = jn.next = e;
    return t;
}
var an = null;
function gs(e) {
    an === null ? (an = [e]) : an.push(e);
}
function Gf(e, t, n, r) {
    var l = t.interleaved;
    return (
        l === null ? ((n.next = n), gs(t)) : ((n.next = l.next), (l.next = n)),
        (t.interleaved = n),
        xt(e, r)
    );
}
function xt(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
        (e.childLanes |= t),
            (n = e.alternate),
            n !== null && (n.childLanes |= t),
            (n = e),
            (e = e.return);
    return n.tag === 3 ? n.stateNode : null;
}
var At = !1;
function ys(e) {
    e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, interleaved: null, lanes: 0 },
        effects: null,
    };
}
function Kf(e, t) {
    (e = e.updateQueue),
        t.updateQueue === e &&
            (t.updateQueue = {
                baseState: e.baseState,
                firstBaseUpdate: e.firstBaseUpdate,
                lastBaseUpdate: e.lastBaseUpdate,
                shared: e.shared,
                effects: e.effects,
            });
}
function Et(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function Zt(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (((r = r.shared), z & 2)) {
        var l = r.pending;
        return (
            l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)), (r.pending = t), xt(e, n)
        );
    }
    return (
        (l = r.interleaved),
        l === null ? ((t.next = t), gs(r)) : ((t.next = l.next), (l.next = t)),
        (r.interleaved = t),
        xt(e, n)
    );
}
function Hl(e, t, n) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))) {
        var r = t.lanes;
        (r &= e.pendingLanes), (n |= r), (t.lanes = n), rs(e, n);
    }
}
function ba(e, t) {
    var n = e.updateQueue,
        r = e.alternate;
    if (r !== null && ((r = r.updateQueue), n === r)) {
        var l = null,
            o = null;
        if (((n = n.firstBaseUpdate), n !== null)) {
            do {
                var i = {
                    eventTime: n.eventTime,
                    lane: n.lane,
                    tag: n.tag,
                    payload: n.payload,
                    callback: n.callback,
                    next: null,
                };
                o === null ? (l = o = i) : (o = o.next = i), (n = n.next);
            } while (n !== null);
            o === null ? (l = o = t) : (o = o.next = t);
        } else l = o = t;
        (n = {
            baseState: r.baseState,
            firstBaseUpdate: l,
            lastBaseUpdate: o,
            shared: r.shared,
            effects: r.effects,
        }),
            (e.updateQueue = n);
        return;
    }
    (e = n.lastBaseUpdate),
        e === null ? (n.firstBaseUpdate = t) : (e.next = t),
        (n.lastBaseUpdate = t);
}
function fo(e, t, n, r) {
    var l = e.updateQueue;
    At = !1;
    var o = l.firstBaseUpdate,
        i = l.lastBaseUpdate,
        u = l.shared.pending;
    if (u !== null) {
        l.shared.pending = null;
        var s = u,
            a = s.next;
        (s.next = null), i === null ? (o = a) : (i.next = a), (i = s);
        var c = e.alternate;
        c !== null &&
            ((c = c.updateQueue),
            (u = c.lastBaseUpdate),
            u !== i &&
                (u === null ? (c.firstBaseUpdate = a) : (u.next = a), (c.lastBaseUpdate = s)));
    }
    if (o !== null) {
        var f = l.baseState;
        (i = 0), (c = a = s = null), (u = o);
        do {
            var h = u.lane,
                g = u.eventTime;
            if ((r & h) === h) {
                c !== null &&
                    (c = c.next =
                        {
                            eventTime: g,
                            lane: 0,
                            tag: u.tag,
                            payload: u.payload,
                            callback: u.callback,
                            next: null,
                        });
                e: {
                    var S = e,
                        y = u;
                    switch (((h = t), (g = n), y.tag)) {
                        case 1:
                            if (((S = y.payload), typeof S == 'function')) {
                                f = S.call(g, f, h);
                                break e;
                            }
                            f = S;
                            break e;
                        case 3:
                            S.flags = (S.flags & -65537) | 128;
                        case 0:
                            if (
                                ((S = y.payload),
                                (h = typeof S == 'function' ? S.call(g, f, h) : S),
                                h == null)
                            )
                                break e;
                            f = Q({}, f, h);
                            break e;
                        case 2:
                            At = !0;
                    }
                }
                u.callback !== null &&
                    u.lane !== 0 &&
                    ((e.flags |= 64), (h = l.effects), h === null ? (l.effects = [u]) : h.push(u));
            } else
                (g = {
                    eventTime: g,
                    lane: h,
                    tag: u.tag,
                    payload: u.payload,
                    callback: u.callback,
                    next: null,
                }),
                    c === null ? ((a = c = g), (s = f)) : (c = c.next = g),
                    (i |= h);
            if (((u = u.next), u === null)) {
                if (((u = l.shared.pending), u === null)) break;
                (h = u),
                    (u = h.next),
                    (h.next = null),
                    (l.lastBaseUpdate = h),
                    (l.shared.pending = null);
            }
        } while (!0);
        if (
            (c === null && (s = f),
            (l.baseState = s),
            (l.firstBaseUpdate = a),
            (l.lastBaseUpdate = c),
            (t = l.shared.interleaved),
            t !== null)
        ) {
            l = t;
            do (i |= l.lane), (l = l.next);
            while (l !== t);
        } else o === null && (l.shared.lanes = 0);
        (gn |= i), (e.lanes = i), (e.memoizedState = f);
    }
}
function Ha(e, t, n) {
    if (((e = t.effects), (t.effects = null), e !== null))
        for (t = 0; t < e.length; t++) {
            var r = e[t],
                l = r.callback;
            if (l !== null) {
                if (((r.callback = null), (r = n), typeof l != 'function')) throw Error(k(191, l));
                l.call(r);
            }
        }
}
var Yf = new Qc.Component().refs;
function Eu(e, t, n, r) {
    (t = e.memoizedState),
        (n = n(r, t)),
        (n = n == null ? t : Q({}, t, n)),
        (e.memoizedState = n),
        e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Fo = {
    isMounted: function (e) {
        return (e = e._reactInternals) ? Sn(e) === e : !1;
    },
    enqueueSetState: function (e, t, n) {
        e = e._reactInternals;
        var r = Se(),
            l = Gt(e),
            o = Et(r, l);
        (o.payload = t),
            n != null && (o.callback = n),
            (t = Zt(e, o, l)),
            t !== null && (rt(t, e, l, r), Hl(t, e, l));
    },
    enqueueReplaceState: function (e, t, n) {
        e = e._reactInternals;
        var r = Se(),
            l = Gt(e),
            o = Et(r, l);
        (o.tag = 1),
            (o.payload = t),
            n != null && (o.callback = n),
            (t = Zt(e, o, l)),
            t !== null && (rt(t, e, l, r), Hl(t, e, l));
    },
    enqueueForceUpdate: function (e, t) {
        e = e._reactInternals;
        var n = Se(),
            r = Gt(e),
            l = Et(n, r);
        (l.tag = 2),
            t != null && (l.callback = t),
            (t = Zt(e, l, r)),
            t !== null && (rt(t, e, r, n), Hl(t, e, r));
    },
};
function Ba(e, t, n, r, l, o, i) {
    return (
        (e = e.stateNode),
        typeof e.shouldComponentUpdate == 'function'
            ? e.shouldComponentUpdate(r, o, i)
            : t.prototype && t.prototype.isPureReactComponent
            ? !$r(n, r) || !$r(l, o)
            : !0
    );
}
function Xf(e, t, n) {
    var r = !1,
        l = Xt,
        o = t.contextType;
    return (
        typeof o == 'object' && o !== null
            ? (o = Ze(o))
            : ((l = Pe(t) ? vn : me.current),
              (r = t.contextTypes),
              (o = (r = r != null) ? Kn(e, l) : Xt)),
        (t = new t(n, o)),
        (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
        (t.updater = Fo),
        (e.stateNode = t),
        (t._reactInternals = e),
        r &&
            ((e = e.stateNode),
            (e.__reactInternalMemoizedUnmaskedChildContext = l),
            (e.__reactInternalMemoizedMaskedChildContext = o)),
        t
    );
}
function Va(e, t, n, r) {
    (e = t.state),
        typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(n, r),
        typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
            t.UNSAFE_componentWillReceiveProps(n, r),
        t.state !== e && Fo.enqueueReplaceState(t, t.state, null);
}
function Cu(e, t, n, r) {
    var l = e.stateNode;
    (l.props = n), (l.state = e.memoizedState), (l.refs = Yf), ys(e);
    var o = t.contextType;
    typeof o == 'object' && o !== null
        ? (l.context = Ze(o))
        : ((o = Pe(t) ? vn : me.current), (l.context = Kn(e, o))),
        (l.state = e.memoizedState),
        (o = t.getDerivedStateFromProps),
        typeof o == 'function' && (Eu(e, t, o, n), (l.state = e.memoizedState)),
        typeof t.getDerivedStateFromProps == 'function' ||
            typeof l.getSnapshotBeforeUpdate == 'function' ||
            (typeof l.UNSAFE_componentWillMount != 'function' &&
                typeof l.componentWillMount != 'function') ||
            ((t = l.state),
            typeof l.componentWillMount == 'function' && l.componentWillMount(),
            typeof l.UNSAFE_componentWillMount == 'function' && l.UNSAFE_componentWillMount(),
            t !== l.state && Fo.enqueueReplaceState(l, l.state, null),
            fo(e, n, l, r),
            (l.state = e.memoizedState)),
        typeof l.componentDidMount == 'function' && (e.flags |= 4194308);
}
function yr(e, t, n) {
    if (((e = n.ref), e !== null && typeof e != 'function' && typeof e != 'object')) {
        if (n._owner) {
            if (((n = n._owner), n)) {
                if (n.tag !== 1) throw Error(k(309));
                var r = n.stateNode;
            }
            if (!r) throw Error(k(147, e));
            var l = r,
                o = '' + e;
            return t !== null &&
                t.ref !== null &&
                typeof t.ref == 'function' &&
                t.ref._stringRef === o
                ? t.ref
                : ((t = function (i) {
                      var u = l.refs;
                      u === Yf && (u = l.refs = {}), i === null ? delete u[o] : (u[o] = i);
                  }),
                  (t._stringRef = o),
                  t);
        }
        if (typeof e != 'string') throw Error(k(284));
        if (!n._owner) throw Error(k(290, e));
    }
    return e;
}
function Ol(e, t) {
    throw (
        ((e = Object.prototype.toString.call(t)),
        Error(
            k(
                31,
                e === '[object Object]'
                    ? 'object with keys {' + Object.keys(t).join(', ') + '}'
                    : e,
            ),
        ))
    );
}
function $a(e) {
    var t = e._init;
    return t(e._payload);
}
function qf(e) {
    function t(p, d) {
        if (e) {
            var v = p.deletions;
            v === null ? ((p.deletions = [d]), (p.flags |= 16)) : v.push(d);
        }
    }
    function n(p, d) {
        if (!e) return null;
        for (; d !== null; ) t(p, d), (d = d.sibling);
        return null;
    }
    function r(p, d) {
        for (p = new Map(); d !== null; )
            d.key !== null ? p.set(d.key, d) : p.set(d.index, d), (d = d.sibling);
        return p;
    }
    function l(p, d) {
        return (p = Kt(p, d)), (p.index = 0), (p.sibling = null), p;
    }
    function o(p, d, v) {
        return (
            (p.index = v),
            e
                ? ((v = p.alternate),
                  v !== null
                      ? ((v = v.index), v < d ? ((p.flags |= 2), d) : v)
                      : ((p.flags |= 2), d))
                : ((p.flags |= 1048576), d)
        );
    }
    function i(p) {
        return e && p.alternate === null && (p.flags |= 2), p;
    }
    function u(p, d, v, w) {
        return d === null || d.tag !== 6
            ? ((d = Ii(v, p.mode, w)), (d.return = p), d)
            : ((d = l(d, v)), (d.return = p), d);
    }
    function s(p, d, v, w) {
        var x = v.type;
        return x === Nn
            ? c(p, d, v.props.children, w, v.key)
            : d !== null &&
              (d.elementType === x ||
                  (typeof x == 'object' && x !== null && x.$$typeof === Tt && $a(x) === d.type))
            ? ((w = l(d, v.props)), (w.ref = yr(p, d, v)), (w.return = p), w)
            : ((w = Gl(v.type, v.key, v.props, null, p.mode, w)),
              (w.ref = yr(p, d, v)),
              (w.return = p),
              w);
    }
    function a(p, d, v, w) {
        return d === null ||
            d.tag !== 4 ||
            d.stateNode.containerInfo !== v.containerInfo ||
            d.stateNode.implementation !== v.implementation
            ? ((d = zi(v, p.mode, w)), (d.return = p), d)
            : ((d = l(d, v.children || [])), (d.return = p), d);
    }
    function c(p, d, v, w, x) {
        return d === null || d.tag !== 7
            ? ((d = dn(v, p.mode, w, x)), (d.return = p), d)
            : ((d = l(d, v)), (d.return = p), d);
    }
    function f(p, d, v) {
        if ((typeof d == 'string' && d !== '') || typeof d == 'number')
            return (d = Ii('' + d, p.mode, v)), (d.return = p), d;
        if (typeof d == 'object' && d !== null) {
            switch (d.$$typeof) {
                case Sl:
                    return (
                        (v = Gl(d.type, d.key, d.props, null, p.mode, v)),
                        (v.ref = yr(p, null, d)),
                        (v.return = p),
                        v
                    );
                case Mn:
                    return (d = zi(d, p.mode, v)), (d.return = p), d;
                case Tt:
                    var w = d._init;
                    return f(p, w(d._payload), v);
            }
            if (Cr(d) || pr(d)) return (d = dn(d, p.mode, v, null)), (d.return = p), d;
            Ol(p, d);
        }
        return null;
    }
    function h(p, d, v, w) {
        var x = d !== null ? d.key : null;
        if ((typeof v == 'string' && v !== '') || typeof v == 'number')
            return x !== null ? null : u(p, d, '' + v, w);
        if (typeof v == 'object' && v !== null) {
            switch (v.$$typeof) {
                case Sl:
                    return v.key === x ? s(p, d, v, w) : null;
                case Mn:
                    return v.key === x ? a(p, d, v, w) : null;
                case Tt:
                    return (x = v._init), h(p, d, x(v._payload), w);
            }
            if (Cr(v) || pr(v)) return x !== null ? null : c(p, d, v, w, null);
            Ol(p, v);
        }
        return null;
    }
    function g(p, d, v, w, x) {
        if ((typeof w == 'string' && w !== '') || typeof w == 'number')
            return (p = p.get(v) || null), u(d, p, '' + w, x);
        if (typeof w == 'object' && w !== null) {
            switch (w.$$typeof) {
                case Sl:
                    return (p = p.get(w.key === null ? v : w.key) || null), s(d, p, w, x);
                case Mn:
                    return (p = p.get(w.key === null ? v : w.key) || null), a(d, p, w, x);
                case Tt:
                    var C = w._init;
                    return g(p, d, v, C(w._payload), x);
            }
            if (Cr(w) || pr(w)) return (p = p.get(v) || null), c(d, p, w, x, null);
            Ol(d, w);
        }
        return null;
    }
    function S(p, d, v, w) {
        for (
            var x = null, C = null, E = d, _ = (d = 0), D = null;
            E !== null && _ < v.length;
            _++
        ) {
            E.index > _ ? ((D = E), (E = null)) : (D = E.sibling);
            var L = h(p, E, v[_], w);
            if (L === null) {
                E === null && (E = D);
                break;
            }
            e && E && L.alternate === null && t(p, E),
                (d = o(L, d, _)),
                C === null ? (x = L) : (C.sibling = L),
                (C = L),
                (E = D);
        }
        if (_ === v.length) return n(p, E), V && on(p, _), x;
        if (E === null) {
            for (; _ < v.length; _++)
                (E = f(p, v[_], w)),
                    E !== null &&
                        ((d = o(E, d, _)), C === null ? (x = E) : (C.sibling = E), (C = E));
            return V && on(p, _), x;
        }
        for (E = r(p, E); _ < v.length; _++)
            (D = g(E, p, _, v[_], w)),
                D !== null &&
                    (e && D.alternate !== null && E.delete(D.key === null ? _ : D.key),
                    (d = o(D, d, _)),
                    C === null ? (x = D) : (C.sibling = D),
                    (C = D));
        return (
            e &&
                E.forEach(function (A) {
                    return t(p, A);
                }),
            V && on(p, _),
            x
        );
    }
    function y(p, d, v, w) {
        var x = pr(v);
        if (typeof x != 'function') throw Error(k(150));
        if (((v = x.call(v)), v == null)) throw Error(k(151));
        for (
            var C = (x = null), E = d, _ = (d = 0), D = null, L = v.next();
            E !== null && !L.done;
            _++, L = v.next()
        ) {
            E.index > _ ? ((D = E), (E = null)) : (D = E.sibling);
            var A = h(p, E, L.value, w);
            if (A === null) {
                E === null && (E = D);
                break;
            }
            e && E && A.alternate === null && t(p, E),
                (d = o(A, d, _)),
                C === null ? (x = A) : (C.sibling = A),
                (C = A),
                (E = D);
        }
        if (L.done) return n(p, E), V && on(p, _), x;
        if (E === null) {
            for (; !L.done; _++, L = v.next())
                (L = f(p, L.value, w)),
                    L !== null &&
                        ((d = o(L, d, _)), C === null ? (x = L) : (C.sibling = L), (C = L));
            return V && on(p, _), x;
        }
        for (E = r(p, E); !L.done; _++, L = v.next())
            (L = g(E, p, _, L.value, w)),
                L !== null &&
                    (e && L.alternate !== null && E.delete(L.key === null ? _ : L.key),
                    (d = o(L, d, _)),
                    C === null ? (x = L) : (C.sibling = L),
                    (C = L));
        return (
            e &&
                E.forEach(function (re) {
                    return t(p, re);
                }),
            V && on(p, _),
            x
        );
    }
    function N(p, d, v, w) {
        if (
            (typeof v == 'object' &&
                v !== null &&
                v.type === Nn &&
                v.key === null &&
                (v = v.props.children),
            typeof v == 'object' && v !== null)
        ) {
            switch (v.$$typeof) {
                case Sl:
                    e: {
                        for (var x = v.key, C = d; C !== null; ) {
                            if (C.key === x) {
                                if (((x = v.type), x === Nn)) {
                                    if (C.tag === 7) {
                                        n(p, C.sibling),
                                            (d = l(C, v.props.children)),
                                            (d.return = p),
                                            (p = d);
                                        break e;
                                    }
                                } else if (
                                    C.elementType === x ||
                                    (typeof x == 'object' &&
                                        x !== null &&
                                        x.$$typeof === Tt &&
                                        $a(x) === C.type)
                                ) {
                                    n(p, C.sibling),
                                        (d = l(C, v.props)),
                                        (d.ref = yr(p, C, v)),
                                        (d.return = p),
                                        (p = d);
                                    break e;
                                }
                                n(p, C);
                                break;
                            } else t(p, C);
                            C = C.sibling;
                        }
                        v.type === Nn
                            ? ((d = dn(v.props.children, p.mode, w, v.key)),
                              (d.return = p),
                              (p = d))
                            : ((w = Gl(v.type, v.key, v.props, null, p.mode, w)),
                              (w.ref = yr(p, d, v)),
                              (w.return = p),
                              (p = w));
                    }
                    return i(p);
                case Mn:
                    e: {
                        for (C = v.key; d !== null; ) {
                            if (d.key === C)
                                if (
                                    d.tag === 4 &&
                                    d.stateNode.containerInfo === v.containerInfo &&
                                    d.stateNode.implementation === v.implementation
                                ) {
                                    n(p, d.sibling),
                                        (d = l(d, v.children || [])),
                                        (d.return = p),
                                        (p = d);
                                    break e;
                                } else {
                                    n(p, d);
                                    break;
                                }
                            else t(p, d);
                            d = d.sibling;
                        }
                        (d = zi(v, p.mode, w)), (d.return = p), (p = d);
                    }
                    return i(p);
                case Tt:
                    return (C = v._init), N(p, d, C(v._payload), w);
            }
            if (Cr(v)) return S(p, d, v, w);
            if (pr(v)) return y(p, d, v, w);
            Ol(p, v);
        }
        return (typeof v == 'string' && v !== '') || typeof v == 'number'
            ? ((v = '' + v),
              d !== null && d.tag === 6
                  ? (n(p, d.sibling), (d = l(d, v)), (d.return = p), (p = d))
                  : (n(p, d), (d = Ii(v, p.mode, w)), (d.return = p), (p = d)),
              i(p))
            : n(p, d);
    }
    return N;
}
var Xn = qf(!0),
    Jf = qf(!1),
    al = {},
    pt = en(al),
    Kr = en(al),
    Yr = en(al);
function cn(e) {
    if (e === al) throw Error(k(174));
    return e;
}
function ws(e, t) {
    switch ((W(Yr, t), W(Kr, e), W(pt, al), (e = t.nodeType), e)) {
        case 9:
        case 11:
            t = (t = t.documentElement) ? t.namespaceURI : eu(null, '');
            break;
        default:
            (e = e === 8 ? t.parentNode : t),
                (t = e.namespaceURI || null),
                (e = e.tagName),
                (t = eu(t, e));
    }
    H(pt), W(pt, t);
}
function qn() {
    H(pt), H(Kr), H(Yr);
}
function ed(e) {
    cn(Yr.current);
    var t = cn(pt.current),
        n = eu(t, e.type);
    t !== n && (W(Kr, e), W(pt, n));
}
function Ss(e) {
    Kr.current === e && (H(pt), H(Kr));
}
var $ = en(0);
function po(e) {
    for (var t = e; t !== null; ) {
        if (t.tag === 13) {
            var n = t.memoizedState;
            if (
                n !== null &&
                ((n = n.dehydrated), n === null || n.data === '$?' || n.data === '$!')
            )
                return t;
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
            if (t.flags & 128) return t;
        } else if (t.child !== null) {
            (t.child.return = t), (t = t.child);
            continue;
        }
        if (t === e) break;
        for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) return null;
            t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
    }
    return null;
}
var Ni = [];
function Es() {
    for (var e = 0; e < Ni.length; e++) Ni[e]._workInProgressVersionPrimary = null;
    Ni.length = 0;
}
var Bl = Rt.ReactCurrentDispatcher,
    Li = Rt.ReactCurrentBatchConfig,
    mn = 0,
    Z = null,
    ee = null,
    oe = null,
    vo = !1,
    Or = !1,
    Xr = 0,
    P2 = 0;
function de() {
    throw Error(k(321));
}
function Cs(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++) if (!lt(e[n], t[n])) return !1;
    return !0;
}
function ks(e, t, n, r, l, o) {
    if (
        ((mn = o),
        (Z = t),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.lanes = 0),
        (Bl.current = e === null || e.memoizedState === null ? L2 : O2),
        (e = n(r, l)),
        Or)
    ) {
        o = 0;
        do {
            if (((Or = !1), (Xr = 0), 25 <= o)) throw Error(k(301));
            (o += 1), (oe = ee = null), (t.updateQueue = null), (Bl.current = D2), (e = n(r, l));
        } while (Or);
    }
    if (
        ((Bl.current = ho),
        (t = ee !== null && ee.next !== null),
        (mn = 0),
        (oe = ee = Z = null),
        (vo = !1),
        t)
    )
        throw Error(k(300));
    return e;
}
function xs() {
    var e = Xr !== 0;
    return (Xr = 0), e;
}
function at() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return oe === null ? (Z.memoizedState = oe = e) : (oe = oe.next = e), oe;
}
function Qe() {
    if (ee === null) {
        var e = Z.alternate;
        e = e !== null ? e.memoizedState : null;
    } else e = ee.next;
    var t = oe === null ? Z.memoizedState : oe.next;
    if (t !== null) (oe = t), (ee = e);
    else {
        if (e === null) throw Error(k(310));
        (ee = e),
            (e = {
                memoizedState: ee.memoizedState,
                baseState: ee.baseState,
                baseQueue: ee.baseQueue,
                queue: ee.queue,
                next: null,
            }),
            oe === null ? (Z.memoizedState = oe = e) : (oe = oe.next = e);
    }
    return oe;
}
function qr(e, t) {
    return typeof t == 'function' ? t(e) : t;
}
function Oi(e) {
    var t = Qe(),
        n = t.queue;
    if (n === null) throw Error(k(311));
    n.lastRenderedReducer = e;
    var r = ee,
        l = r.baseQueue,
        o = n.pending;
    if (o !== null) {
        if (l !== null) {
            var i = l.next;
            (l.next = o.next), (o.next = i);
        }
        (r.baseQueue = l = o), (n.pending = null);
    }
    if (l !== null) {
        (o = l.next), (r = r.baseState);
        var u = (i = null),
            s = null,
            a = o;
        do {
            var c = a.lane;
            if ((mn & c) === c)
                s !== null &&
                    (s = s.next =
                        {
                            lane: 0,
                            action: a.action,
                            hasEagerState: a.hasEagerState,
                            eagerState: a.eagerState,
                            next: null,
                        }),
                    (r = a.hasEagerState ? a.eagerState : e(r, a.action));
            else {
                var f = {
                    lane: c,
                    action: a.action,
                    hasEagerState: a.hasEagerState,
                    eagerState: a.eagerState,
                    next: null,
                };
                s === null ? ((u = s = f), (i = r)) : (s = s.next = f), (Z.lanes |= c), (gn |= c);
            }
            a = a.next;
        } while (a !== null && a !== o);
        s === null ? (i = r) : (s.next = u),
            lt(r, t.memoizedState) || (xe = !0),
            (t.memoizedState = r),
            (t.baseState = i),
            (t.baseQueue = s),
            (n.lastRenderedState = r);
    }
    if (((e = n.interleaved), e !== null)) {
        l = e;
        do (o = l.lane), (Z.lanes |= o), (gn |= o), (l = l.next);
        while (l !== e);
    } else l === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
}
function Di(e) {
    var t = Qe(),
        n = t.queue;
    if (n === null) throw Error(k(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
        l = n.pending,
        o = t.memoizedState;
    if (l !== null) {
        n.pending = null;
        var i = (l = l.next);
        do (o = e(o, i.action)), (i = i.next);
        while (i !== l);
        lt(o, t.memoizedState) || (xe = !0),
            (t.memoizedState = o),
            t.baseQueue === null && (t.baseState = o),
            (n.lastRenderedState = o);
    }
    return [o, r];
}
function td() {}
function nd(e, t) {
    var n = Z,
        r = Qe(),
        l = t(),
        o = !lt(r.memoizedState, l);
    if (
        (o && ((r.memoizedState = l), (xe = !0)),
        (r = r.queue),
        _s(od.bind(null, n, r, e), [e]),
        r.getSnapshot !== t || o || (oe !== null && oe.memoizedState.tag & 1))
    ) {
        if (((n.flags |= 2048), Jr(9, ld.bind(null, n, r, l, t), void 0, null), ue === null))
            throw Error(k(349));
        mn & 30 || rd(n, t, l);
    }
    return l;
}
function rd(e, t, n) {
    (e.flags |= 16384),
        (e = { getSnapshot: t, value: n }),
        (t = Z.updateQueue),
        t === null
            ? ((t = { lastEffect: null, stores: null }), (Z.updateQueue = t), (t.stores = [e]))
            : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function ld(e, t, n, r) {
    (t.value = n), (t.getSnapshot = r), id(t) && ud(e);
}
function od(e, t, n) {
    return n(function () {
        id(t) && ud(e);
    });
}
function id(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !lt(e, n);
    } catch {
        return !0;
    }
}
function ud(e) {
    var t = xt(e, 1);
    t !== null && rt(t, e, 1, -1);
}
function Za(e) {
    var t = at();
    return (
        typeof e == 'function' && (e = e()),
        (t.memoizedState = t.baseState = e),
        (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: qr,
            lastRenderedState: e,
        }),
        (t.queue = e),
        (e = e.dispatch = N2.bind(null, Z, e)),
        [t.memoizedState, e]
    );
}
function Jr(e, t, n, r) {
    return (
        (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
        (t = Z.updateQueue),
        t === null
            ? ((t = { lastEffect: null, stores: null }),
              (Z.updateQueue = t),
              (t.lastEffect = e.next = e))
            : ((n = t.lastEffect),
              n === null
                  ? (t.lastEffect = e.next = e)
                  : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
        e
    );
}
function sd() {
    return Qe().memoizedState;
}
function Vl(e, t, n, r) {
    var l = at();
    (Z.flags |= e), (l.memoizedState = Jr(1 | t, n, void 0, r === void 0 ? null : r));
}
function Uo(e, t, n, r) {
    var l = Qe();
    r = r === void 0 ? null : r;
    var o = void 0;
    if (ee !== null) {
        var i = ee.memoizedState;
        if (((o = i.destroy), r !== null && Cs(r, i.deps))) {
            l.memoizedState = Jr(t, n, o, r);
            return;
        }
    }
    (Z.flags |= e), (l.memoizedState = Jr(1 | t, n, o, r));
}
function Qa(e, t) {
    return Vl(8390656, 8, e, t);
}
function _s(e, t) {
    return Uo(2048, 8, e, t);
}
function ad(e, t) {
    return Uo(4, 2, e, t);
}
function cd(e, t) {
    return Uo(4, 4, e, t);
}
function fd(e, t) {
    if (typeof t == 'function')
        return (
            (e = e()),
            t(e),
            function () {
                t(null);
            }
        );
    if (t != null)
        return (
            (e = e()),
            (t.current = e),
            function () {
                t.current = null;
            }
        );
}
function dd(e, t, n) {
    return (n = n != null ? n.concat([e]) : null), Uo(4, 4, fd.bind(null, t, e), n);
}
function Ps() {}
function pd(e, t) {
    var n = Qe();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Cs(t, r[1]) ? r[0] : ((n.memoizedState = [e, t]), e);
}
function vd(e, t) {
    var n = Qe();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Cs(t, r[1])
        ? r[0]
        : ((e = e()), (n.memoizedState = [e, t]), e);
}
function hd(e, t, n) {
    return mn & 21
        ? (lt(n, t) || ((n = yf()), (Z.lanes |= n), (gn |= n), (e.baseState = !0)), t)
        : (e.baseState && ((e.baseState = !1), (xe = !0)), (e.memoizedState = n));
}
function R2(e, t) {
    var n = j;
    (j = n !== 0 && 4 > n ? n : 4), e(!0);
    var r = Li.transition;
    Li.transition = {};
    try {
        e(!1), t();
    } finally {
        (j = n), (Li.transition = r);
    }
}
function md() {
    return Qe().memoizedState;
}
function M2(e, t, n) {
    var r = Gt(e);
    if (((n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }), gd(e)))
        yd(t, n);
    else if (((n = Gf(e, t, n, r)), n !== null)) {
        var l = Se();
        rt(n, e, r, l), wd(n, t, r);
    }
}
function N2(e, t, n) {
    var r = Gt(e),
        l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
    if (gd(e)) yd(t, l);
    else {
        var o = e.alternate;
        if (
            e.lanes === 0 &&
            (o === null || o.lanes === 0) &&
            ((o = t.lastRenderedReducer), o !== null)
        )
            try {
                var i = t.lastRenderedState,
                    u = o(i, n);
                if (((l.hasEagerState = !0), (l.eagerState = u), lt(u, i))) {
                    var s = t.interleaved;
                    s === null ? ((l.next = l), gs(t)) : ((l.next = s.next), (s.next = l)),
                        (t.interleaved = l);
                    return;
                }
            } catch {
            } finally {
            }
        (n = Gf(e, t, l, r)), n !== null && ((l = Se()), rt(n, e, r, l), wd(n, t, r));
    }
}
function gd(e) {
    var t = e.alternate;
    return e === Z || (t !== null && t === Z);
}
function yd(e, t) {
    Or = vo = !0;
    var n = e.pending;
    n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)), (e.pending = t);
}
function wd(e, t, n) {
    if (n & 4194240) {
        var r = t.lanes;
        (r &= e.pendingLanes), (n |= r), (t.lanes = n), rs(e, n);
    }
}
var ho = {
        readContext: Ze,
        useCallback: de,
        useContext: de,
        useEffect: de,
        useImperativeHandle: de,
        useInsertionEffect: de,
        useLayoutEffect: de,
        useMemo: de,
        useReducer: de,
        useRef: de,
        useState: de,
        useDebugValue: de,
        useDeferredValue: de,
        useTransition: de,
        useMutableSource: de,
        useSyncExternalStore: de,
        useId: de,
        unstable_isNewReconciler: !1,
    },
    L2 = {
        readContext: Ze,
        useCallback: function (e, t) {
            return (at().memoizedState = [e, t === void 0 ? null : t]), e;
        },
        useContext: Ze,
        useEffect: Qa,
        useImperativeHandle: function (e, t, n) {
            return (n = n != null ? n.concat([e]) : null), Vl(4194308, 4, fd.bind(null, t, e), n);
        },
        useLayoutEffect: function (e, t) {
            return Vl(4194308, 4, e, t);
        },
        useInsertionEffect: function (e, t) {
            return Vl(4, 2, e, t);
        },
        useMemo: function (e, t) {
            var n = at();
            return (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e;
        },
        useReducer: function (e, t, n) {
            var r = at();
            return (
                (t = n !== void 0 ? n(t) : t),
                (r.memoizedState = r.baseState = t),
                (e = {
                    pending: null,
                    interleaved: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: e,
                    lastRenderedState: t,
                }),
                (r.queue = e),
                (e = e.dispatch = M2.bind(null, Z, e)),
                [r.memoizedState, e]
            );
        },
        useRef: function (e) {
            var t = at();
            return (e = { current: e }), (t.memoizedState = e);
        },
        useState: Za,
        useDebugValue: Ps,
        useDeferredValue: function (e) {
            return (at().memoizedState = e);
        },
        useTransition: function () {
            var e = Za(!1),
                t = e[0];
            return (e = R2.bind(null, e[1])), (at().memoizedState = e), [t, e];
        },
        useMutableSource: function () {},
        useSyncExternalStore: function (e, t, n) {
            var r = Z,
                l = at();
            if (V) {
                if (n === void 0) throw Error(k(407));
                n = n();
            } else {
                if (((n = t()), ue === null)) throw Error(k(349));
                mn & 30 || rd(r, t, n);
            }
            l.memoizedState = n;
            var o = { value: n, getSnapshot: t };
            return (
                (l.queue = o),
                Qa(od.bind(null, r, o, e), [e]),
                (r.flags |= 2048),
                Jr(9, ld.bind(null, r, o, n, t), void 0, null),
                n
            );
        },
        useId: function () {
            var e = at(),
                t = ue.identifierPrefix;
            if (V) {
                var n = St,
                    r = wt;
                (n = (r & ~(1 << (32 - nt(r) - 1))).toString(32) + n),
                    (t = ':' + t + 'R' + n),
                    (n = Xr++),
                    0 < n && (t += 'H' + n.toString(32)),
                    (t += ':');
            } else (n = P2++), (t = ':' + t + 'r' + n.toString(32) + ':');
            return (e.memoizedState = t);
        },
        unstable_isNewReconciler: !1,
    },
    O2 = {
        readContext: Ze,
        useCallback: pd,
        useContext: Ze,
        useEffect: _s,
        useImperativeHandle: dd,
        useInsertionEffect: ad,
        useLayoutEffect: cd,
        useMemo: vd,
        useReducer: Oi,
        useRef: sd,
        useState: function () {
            return Oi(qr);
        },
        useDebugValue: Ps,
        useDeferredValue: function (e) {
            var t = Qe();
            return hd(t, ee.memoizedState, e);
        },
        useTransition: function () {
            var e = Oi(qr)[0],
                t = Qe().memoizedState;
            return [e, t];
        },
        useMutableSource: td,
        useSyncExternalStore: nd,
        useId: md,
        unstable_isNewReconciler: !1,
    },
    D2 = {
        readContext: Ze,
        useCallback: pd,
        useContext: Ze,
        useEffect: _s,
        useImperativeHandle: dd,
        useInsertionEffect: ad,
        useLayoutEffect: cd,
        useMemo: vd,
        useReducer: Di,
        useRef: sd,
        useState: function () {
            return Di(qr);
        },
        useDebugValue: Ps,
        useDeferredValue: function (e) {
            var t = Qe();
            return ee === null ? (t.memoizedState = e) : hd(t, ee.memoizedState, e);
        },
        useTransition: function () {
            var e = Di(qr)[0],
                t = Qe().memoizedState;
            return [e, t];
        },
        useMutableSource: td,
        useSyncExternalStore: nd,
        useId: md,
        unstable_isNewReconciler: !1,
    };
function Jn(e, t) {
    try {
        var n = '',
            r = t;
        do (n += i0(r)), (r = r.return);
        while (r);
        var l = n;
    } catch (o) {
        l =
            `
Error generating stack: ` +
            o.message +
            `
` +
            o.stack;
    }
    return { value: e, source: t, stack: l, digest: null };
}
function Ti(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function ku(e, t) {
    try {
        console.error(t.value);
    } catch (n) {
        setTimeout(function () {
            throw n;
        });
    }
}
var T2 = typeof WeakMap == 'function' ? WeakMap : Map;
function Sd(e, t, n) {
    (n = Et(-1, n)), (n.tag = 3), (n.payload = { element: null });
    var r = t.value;
    return (
        (n.callback = function () {
            go || ((go = !0), (Tu = r)), ku(e, t);
        }),
        n
    );
}
function Ed(e, t, n) {
    (n = Et(-1, n)), (n.tag = 3);
    var r = e.type.getDerivedStateFromError;
    if (typeof r == 'function') {
        var l = t.value;
        (n.payload = function () {
            return r(l);
        }),
            (n.callback = function () {
                ku(e, t);
            });
    }
    var o = e.stateNode;
    return (
        o !== null &&
            typeof o.componentDidCatch == 'function' &&
            (n.callback = function () {
                ku(e, t),
                    typeof r != 'function' && (Qt === null ? (Qt = new Set([this])) : Qt.add(this));
                var i = t.stack;
                this.componentDidCatch(t.value, { componentStack: i !== null ? i : '' });
            }),
        n
    );
}
function Ga(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
        r = e.pingCache = new T2();
        var l = new Set();
        r.set(t, l);
    } else (l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l));
    l.has(n) || (l.add(n), (e = Q2.bind(null, e, t, n)), t.then(e, e));
}
function Ka(e) {
    do {
        var t;
        if (
            ((t = e.tag === 13) &&
                ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
            t)
        )
            return e;
        e = e.return;
    } while (e !== null);
    return null;
}
function Ya(e, t, n, r, l) {
    return e.mode & 1
        ? ((e.flags |= 65536), (e.lanes = l), e)
        : (e === t
              ? (e.flags |= 65536)
              : ((e.flags |= 128),
                (n.flags |= 131072),
                (n.flags &= -52805),
                n.tag === 1 &&
                    (n.alternate === null
                        ? (n.tag = 17)
                        : ((t = Et(-1, 1)), (t.tag = 2), Zt(n, t, 1))),
                (n.lanes |= 1)),
          e);
}
var A2 = Rt.ReactCurrentOwner,
    xe = !1;
function we(e, t, n, r) {
    t.child = e === null ? Jf(t, null, n, r) : Xn(t, e.child, n, r);
}
function Xa(e, t, n, r, l) {
    n = n.render;
    var o = t.ref;
    return (
        $n(t, l),
        (r = ks(e, t, n, r, o, l)),
        (n = xs()),
        e !== null && !xe
            ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l), _t(e, t, l))
            : (V && n && fs(t), (t.flags |= 1), we(e, t, r, l), t.child)
    );
}
function qa(e, t, n, r, l) {
    if (e === null) {
        var o = n.type;
        return typeof o == 'function' &&
            !As(o) &&
            o.defaultProps === void 0 &&
            n.compare === null &&
            n.defaultProps === void 0
            ? ((t.tag = 15), (t.type = o), Cd(e, t, o, r, l))
            : ((e = Gl(n.type, null, r, t, t.mode, l)),
              (e.ref = t.ref),
              (e.return = t),
              (t.child = e));
    }
    if (((o = e.child), !(e.lanes & l))) {
        var i = o.memoizedProps;
        if (((n = n.compare), (n = n !== null ? n : $r), n(i, r) && e.ref === t.ref))
            return _t(e, t, l);
    }
    return (t.flags |= 1), (e = Kt(o, r)), (e.ref = t.ref), (e.return = t), (t.child = e);
}
function Cd(e, t, n, r, l) {
    if (e !== null) {
        var o = e.memoizedProps;
        if ($r(o, r) && e.ref === t.ref)
            if (((xe = !1), (t.pendingProps = r = o), (e.lanes & l) !== 0))
                e.flags & 131072 && (xe = !0);
            else return (t.lanes = e.lanes), _t(e, t, l);
    }
    return xu(e, t, n, r, l);
}
function kd(e, t, n) {
    var r = t.pendingProps,
        l = r.children,
        o = e !== null ? e.memoizedState : null;
    if (r.mode === 'hidden')
        if (!(t.mode & 1))
            (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
                W(Un, De),
                (De |= n);
        else {
            if (!(n & 1073741824))
                return (
                    (e = o !== null ? o.baseLanes | n : n),
                    (t.lanes = t.childLanes = 1073741824),
                    (t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }),
                    (t.updateQueue = null),
                    W(Un, De),
                    (De |= e),
                    null
                );
            (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
                (r = o !== null ? o.baseLanes : n),
                W(Un, De),
                (De |= r);
        }
    else
        o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n),
            W(Un, De),
            (De |= r);
    return we(e, t, l, n), t.child;
}
function xd(e, t) {
    var n = t.ref;
    ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
        ((t.flags |= 512), (t.flags |= 2097152));
}
function xu(e, t, n, r, l) {
    var o = Pe(n) ? vn : me.current;
    return (
        (o = Kn(t, o)),
        $n(t, l),
        (n = ks(e, t, n, r, o, l)),
        (r = xs()),
        e !== null && !xe
            ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l), _t(e, t, l))
            : (V && r && fs(t), (t.flags |= 1), we(e, t, n, l), t.child)
    );
}
function Ja(e, t, n, r, l) {
    if (Pe(n)) {
        var o = !0;
        io(t);
    } else o = !1;
    if (($n(t, l), t.stateNode === null)) $l(e, t), Xf(t, n, r), Cu(t, n, r, l), (r = !0);
    else if (e === null) {
        var i = t.stateNode,
            u = t.memoizedProps;
        i.props = u;
        var s = i.context,
            a = n.contextType;
        typeof a == 'object' && a !== null
            ? (a = Ze(a))
            : ((a = Pe(n) ? vn : me.current), (a = Kn(t, a)));
        var c = n.getDerivedStateFromProps,
            f = typeof c == 'function' || typeof i.getSnapshotBeforeUpdate == 'function';
        f ||
            (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
                typeof i.componentWillReceiveProps != 'function') ||
            ((u !== r || s !== a) && Va(t, i, r, a)),
            (At = !1);
        var h = t.memoizedState;
        (i.state = h),
            fo(t, r, i, l),
            (s = t.memoizedState),
            u !== r || h !== s || _e.current || At
                ? (typeof c == 'function' && (Eu(t, n, c, r), (s = t.memoizedState)),
                  (u = At || Ba(t, n, u, r, h, s, a))
                      ? (f ||
                            (typeof i.UNSAFE_componentWillMount != 'function' &&
                                typeof i.componentWillMount != 'function') ||
                            (typeof i.componentWillMount == 'function' && i.componentWillMount(),
                            typeof i.UNSAFE_componentWillMount == 'function' &&
                                i.UNSAFE_componentWillMount()),
                        typeof i.componentDidMount == 'function' && (t.flags |= 4194308))
                      : (typeof i.componentDidMount == 'function' && (t.flags |= 4194308),
                        (t.memoizedProps = r),
                        (t.memoizedState = s)),
                  (i.props = r),
                  (i.state = s),
                  (i.context = a),
                  (r = u))
                : (typeof i.componentDidMount == 'function' && (t.flags |= 4194308), (r = !1));
    } else {
        (i = t.stateNode),
            Kf(e, t),
            (u = t.memoizedProps),
            (a = t.type === t.elementType ? u : Je(t.type, u)),
            (i.props = a),
            (f = t.pendingProps),
            (h = i.context),
            (s = n.contextType),
            typeof s == 'object' && s !== null
                ? (s = Ze(s))
                : ((s = Pe(n) ? vn : me.current), (s = Kn(t, s)));
        var g = n.getDerivedStateFromProps;
        (c = typeof g == 'function' || typeof i.getSnapshotBeforeUpdate == 'function') ||
            (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
                typeof i.componentWillReceiveProps != 'function') ||
            ((u !== f || h !== s) && Va(t, i, r, s)),
            (At = !1),
            (h = t.memoizedState),
            (i.state = h),
            fo(t, r, i, l);
        var S = t.memoizedState;
        u !== f || h !== S || _e.current || At
            ? (typeof g == 'function' && (Eu(t, n, g, r), (S = t.memoizedState)),
              (a = At || Ba(t, n, a, r, h, S, s) || !1)
                  ? (c ||
                        (typeof i.UNSAFE_componentWillUpdate != 'function' &&
                            typeof i.componentWillUpdate != 'function') ||
                        (typeof i.componentWillUpdate == 'function' &&
                            i.componentWillUpdate(r, S, s),
                        typeof i.UNSAFE_componentWillUpdate == 'function' &&
                            i.UNSAFE_componentWillUpdate(r, S, s)),
                    typeof i.componentDidUpdate == 'function' && (t.flags |= 4),
                    typeof i.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
                  : (typeof i.componentDidUpdate != 'function' ||
                        (u === e.memoizedProps && h === e.memoizedState) ||
                        (t.flags |= 4),
                    typeof i.getSnapshotBeforeUpdate != 'function' ||
                        (u === e.memoizedProps && h === e.memoizedState) ||
                        (t.flags |= 1024),
                    (t.memoizedProps = r),
                    (t.memoizedState = S)),
              (i.props = r),
              (i.state = S),
              (i.context = s),
              (r = a))
            : (typeof i.componentDidUpdate != 'function' ||
                  (u === e.memoizedProps && h === e.memoizedState) ||
                  (t.flags |= 4),
              typeof i.getSnapshotBeforeUpdate != 'function' ||
                  (u === e.memoizedProps && h === e.memoizedState) ||
                  (t.flags |= 1024),
              (r = !1));
    }
    return _u(e, t, n, r, o, l);
}
function _u(e, t, n, r, l, o) {
    xd(e, t);
    var i = (t.flags & 128) !== 0;
    if (!r && !i) return l && Fa(t, n, !1), _t(e, t, o);
    (r = t.stateNode), (A2.current = t);
    var u = i && typeof n.getDerivedStateFromError != 'function' ? null : r.render();
    return (
        (t.flags |= 1),
        e !== null && i
            ? ((t.child = Xn(t, e.child, null, o)), (t.child = Xn(t, null, u, o)))
            : we(e, t, u, o),
        (t.memoizedState = r.state),
        l && Fa(t, n, !0),
        t.child
    );
}
function _d(e) {
    var t = e.stateNode;
    t.pendingContext
        ? ja(e, t.pendingContext, t.pendingContext !== t.context)
        : t.context && ja(e, t.context, !1),
        ws(e, t.containerInfo);
}
function ec(e, t, n, r, l) {
    return Yn(), ps(l), (t.flags |= 256), we(e, t, n, r), t.child;
}
var Pu = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ru(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
}
function Pd(e, t, n) {
    var r = t.pendingProps,
        l = $.current,
        o = !1,
        i = (t.flags & 128) !== 0,
        u;
    if (
        ((u = i) || (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
        u ? ((o = !0), (t.flags &= -129)) : (e === null || e.memoizedState !== null) && (l |= 1),
        W($, l & 1),
        e === null)
    )
        return (
            wu(t),
            (e = t.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null)
                ? (t.mode & 1
                      ? e.data === '$!'
                          ? (t.lanes = 8)
                          : (t.lanes = 1073741824)
                      : (t.lanes = 1),
                  null)
                : ((i = r.children),
                  (e = r.fallback),
                  o
                      ? ((r = t.mode),
                        (o = t.child),
                        (i = { mode: 'hidden', children: i }),
                        !(r & 1) && o !== null
                            ? ((o.childLanes = 0), (o.pendingProps = i))
                            : (o = Ho(i, r, 0, null)),
                        (e = dn(e, r, n, null)),
                        (o.return = t),
                        (e.return = t),
                        (o.sibling = e),
                        (t.child = o),
                        (t.child.memoizedState = Ru(n)),
                        (t.memoizedState = Pu),
                        e)
                      : Rs(t, i))
        );
    if (((l = e.memoizedState), l !== null && ((u = l.dehydrated), u !== null)))
        return I2(e, t, i, r, u, l, n);
    if (o) {
        (o = r.fallback), (i = t.mode), (l = e.child), (u = l.sibling);
        var s = { mode: 'hidden', children: r.children };
        return (
            !(i & 1) && t.child !== l
                ? ((r = t.child), (r.childLanes = 0), (r.pendingProps = s), (t.deletions = null))
                : ((r = Kt(l, s)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
            u !== null ? (o = Kt(u, o)) : ((o = dn(o, i, n, null)), (o.flags |= 2)),
            (o.return = t),
            (r.return = t),
            (r.sibling = o),
            (t.child = r),
            (r = o),
            (o = t.child),
            (i = e.child.memoizedState),
            (i =
                i === null
                    ? Ru(n)
                    : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }),
            (o.memoizedState = i),
            (o.childLanes = e.childLanes & ~n),
            (t.memoizedState = Pu),
            r
        );
    }
    return (
        (o = e.child),
        (e = o.sibling),
        (r = Kt(o, { mode: 'visible', children: r.children })),
        !(t.mode & 1) && (r.lanes = n),
        (r.return = t),
        (r.sibling = null),
        e !== null &&
            ((n = t.deletions), n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
        (t.child = r),
        (t.memoizedState = null),
        r
    );
}
function Rs(e, t) {
    return (
        (t = Ho({ mode: 'visible', children: t }, e.mode, 0, null)), (t.return = e), (e.child = t)
    );
}
function Dl(e, t, n, r) {
    return (
        r !== null && ps(r),
        Xn(t, e.child, null, n),
        (e = Rs(t, t.pendingProps.children)),
        (e.flags |= 2),
        (t.memoizedState = null),
        e
    );
}
function I2(e, t, n, r, l, o, i) {
    if (n)
        return t.flags & 256
            ? ((t.flags &= -257), (r = Ti(Error(k(422)))), Dl(e, t, i, r))
            : t.memoizedState !== null
            ? ((t.child = e.child), (t.flags |= 128), null)
            : ((o = r.fallback),
              (l = t.mode),
              (r = Ho({ mode: 'visible', children: r.children }, l, 0, null)),
              (o = dn(o, l, i, null)),
              (o.flags |= 2),
              (r.return = t),
              (o.return = t),
              (r.sibling = o),
              (t.child = r),
              t.mode & 1 && Xn(t, e.child, null, i),
              (t.child.memoizedState = Ru(i)),
              (t.memoizedState = Pu),
              o);
    if (!(t.mode & 1)) return Dl(e, t, i, null);
    if (l.data === '$!') {
        if (((r = l.nextSibling && l.nextSibling.dataset), r)) var u = r.dgst;
        return (r = u), (o = Error(k(419))), (r = Ti(o, r, void 0)), Dl(e, t, i, r);
    }
    if (((u = (i & e.childLanes) !== 0), xe || u)) {
        if (((r = ue), r !== null)) {
            switch (i & -i) {
                case 4:
                    l = 2;
                    break;
                case 16:
                    l = 8;
                    break;
                case 64:
                case 128:
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                case 67108864:
                    l = 32;
                    break;
                case 536870912:
                    l = 268435456;
                    break;
                default:
                    l = 0;
            }
            (l = l & (r.suspendedLanes | i) ? 0 : l),
                l !== 0 && l !== o.retryLane && ((o.retryLane = l), xt(e, l), rt(r, e, l, -1));
        }
        return Ts(), (r = Ti(Error(k(421)))), Dl(e, t, i, r);
    }
    return l.data === '$?'
        ? ((t.flags |= 128), (t.child = e.child), (t = G2.bind(null, e)), (l._reactRetry = t), null)
        : ((e = o.treeContext),
          (Ae = $t(l.nextSibling)),
          (Ie = t),
          (V = !0),
          (tt = null),
          e !== null &&
              ((He[Be++] = wt),
              (He[Be++] = St),
              (He[Be++] = hn),
              (wt = e.id),
              (St = e.overflow),
              (hn = t)),
          (t = Rs(t, r.children)),
          (t.flags |= 4096),
          t);
}
function tc(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), Su(e.return, t, n);
}
function Ai(e, t, n, r, l) {
    var o = e.memoizedState;
    o === null
        ? (e.memoizedState = {
              isBackwards: t,
              rendering: null,
              renderingStartTime: 0,
              last: r,
              tail: n,
              tailMode: l,
          })
        : ((o.isBackwards = t),
          (o.rendering = null),
          (o.renderingStartTime = 0),
          (o.last = r),
          (o.tail = n),
          (o.tailMode = l));
}
function Rd(e, t, n) {
    var r = t.pendingProps,
        l = r.revealOrder,
        o = r.tail;
    if ((we(e, t, r.children, n), (r = $.current), r & 2)) (r = (r & 1) | 2), (t.flags |= 128);
    else {
        if (e !== null && e.flags & 128)
            e: for (e = t.child; e !== null; ) {
                if (e.tag === 13) e.memoizedState !== null && tc(e, n, t);
                else if (e.tag === 19) tc(e, n, t);
                else if (e.child !== null) {
                    (e.child.return = e), (e = e.child);
                    continue;
                }
                if (e === t) break e;
                for (; e.sibling === null; ) {
                    if (e.return === null || e.return === t) break e;
                    e = e.return;
                }
                (e.sibling.return = e.return), (e = e.sibling);
            }
        r &= 1;
    }
    if ((W($, r), !(t.mode & 1))) t.memoizedState = null;
    else
        switch (l) {
            case 'forwards':
                for (n = t.child, l = null; n !== null; )
                    (e = n.alternate), e !== null && po(e) === null && (l = n), (n = n.sibling);
                (n = l),
                    n === null
                        ? ((l = t.child), (t.child = null))
                        : ((l = n.sibling), (n.sibling = null)),
                    Ai(t, !1, l, n, o);
                break;
            case 'backwards':
                for (n = null, l = t.child, t.child = null; l !== null; ) {
                    if (((e = l.alternate), e !== null && po(e) === null)) {
                        t.child = l;
                        break;
                    }
                    (e = l.sibling), (l.sibling = n), (n = l), (l = e);
                }
                Ai(t, !0, n, null, o);
                break;
            case 'together':
                Ai(t, !1, null, null, void 0);
                break;
            default:
                t.memoizedState = null;
        }
    return t.child;
}
function $l(e, t) {
    !(t.mode & 1) && e !== null && ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function _t(e, t, n) {
    if ((e !== null && (t.dependencies = e.dependencies), (gn |= t.lanes), !(n & t.childLanes)))
        return null;
    if (e !== null && t.child !== e.child) throw Error(k(153));
    if (t.child !== null) {
        for (
            e = t.child, n = Kt(e, e.pendingProps), t.child = n, n.return = t;
            e.sibling !== null;

        )
            (e = e.sibling), (n = n.sibling = Kt(e, e.pendingProps)), (n.return = t);
        n.sibling = null;
    }
    return t.child;
}
function z2(e, t, n) {
    switch (t.tag) {
        case 3:
            _d(t), Yn();
            break;
        case 5:
            ed(t);
            break;
        case 1:
            Pe(t.type) && io(t);
            break;
        case 4:
            ws(t, t.stateNode.containerInfo);
            break;
        case 10:
            var r = t.type._context,
                l = t.memoizedProps.value;
            W(ao, r._currentValue), (r._currentValue = l);
            break;
        case 13:
            if (((r = t.memoizedState), r !== null))
                return r.dehydrated !== null
                    ? (W($, $.current & 1), (t.flags |= 128), null)
                    : n & t.child.childLanes
                    ? Pd(e, t, n)
                    : (W($, $.current & 1), (e = _t(e, t, n)), e !== null ? e.sibling : null);
            W($, $.current & 1);
            break;
        case 19:
            if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
                if (r) return Rd(e, t, n);
                t.flags |= 128;
            }
            if (
                ((l = t.memoizedState),
                l !== null && ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
                W($, $.current),
                r)
            )
                break;
            return null;
        case 22:
        case 23:
            return (t.lanes = 0), kd(e, t, n);
    }
    return _t(e, t, n);
}
var Md, Mu, Nd, Ld;
Md = function (e, t) {
    for (var n = t.child; n !== null; ) {
        if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
        else if (n.tag !== 4 && n.child !== null) {
            (n.child.return = n), (n = n.child);
            continue;
        }
        if (n === t) break;
        for (; n.sibling === null; ) {
            if (n.return === null || n.return === t) return;
            n = n.return;
        }
        (n.sibling.return = n.return), (n = n.sibling);
    }
};
Mu = function () {};
Nd = function (e, t, n, r) {
    var l = e.memoizedProps;
    if (l !== r) {
        (e = t.stateNode), cn(pt.current);
        var o = null;
        switch (n) {
            case 'input':
                (l = Yi(e, l)), (r = Yi(e, r)), (o = []);
                break;
            case 'select':
                (l = Q({}, l, { value: void 0 })), (r = Q({}, r, { value: void 0 })), (o = []);
                break;
            case 'textarea':
                (l = Ji(e, l)), (r = Ji(e, r)), (o = []);
                break;
            default:
                typeof l.onClick != 'function' &&
                    typeof r.onClick == 'function' &&
                    (e.onclick = lo);
        }
        tu(n, r);
        var i;
        n = null;
        for (a in l)
            if (!r.hasOwnProperty(a) && l.hasOwnProperty(a) && l[a] != null)
                if (a === 'style') {
                    var u = l[a];
                    for (i in u) u.hasOwnProperty(i) && (n || (n = {}), (n[i] = ''));
                } else
                    a !== 'dangerouslySetInnerHTML' &&
                        a !== 'children' &&
                        a !== 'suppressContentEditableWarning' &&
                        a !== 'suppressHydrationWarning' &&
                        a !== 'autoFocus' &&
                        (Fr.hasOwnProperty(a) ? o || (o = []) : (o = o || []).push(a, null));
        for (a in r) {
            var s = r[a];
            if (
                ((u = l != null ? l[a] : void 0),
                r.hasOwnProperty(a) && s !== u && (s != null || u != null))
            )
                if (a === 'style')
                    if (u) {
                        for (i in u)
                            !u.hasOwnProperty(i) ||
                                (s && s.hasOwnProperty(i)) ||
                                (n || (n = {}), (n[i] = ''));
                        for (i in s)
                            s.hasOwnProperty(i) && u[i] !== s[i] && (n || (n = {}), (n[i] = s[i]));
                    } else n || (o || (o = []), o.push(a, n)), (n = s);
                else
                    a === 'dangerouslySetInnerHTML'
                        ? ((s = s ? s.__html : void 0),
                          (u = u ? u.__html : void 0),
                          s != null && u !== s && (o = o || []).push(a, s))
                        : a === 'children'
                        ? (typeof s != 'string' && typeof s != 'number') ||
                          (o = o || []).push(a, '' + s)
                        : a !== 'suppressContentEditableWarning' &&
                          a !== 'suppressHydrationWarning' &&
                          (Fr.hasOwnProperty(a)
                              ? (s != null && a === 'onScroll' && b('scroll', e),
                                o || u === s || (o = []))
                              : (o = o || []).push(a, s));
        }
        n && (o = o || []).push('style', n);
        var a = o;
        (t.updateQueue = a) && (t.flags |= 4);
    }
};
Ld = function (e, t, n, r) {
    n !== r && (t.flags |= 4);
};
function wr(e, t) {
    if (!V)
        switch (e.tailMode) {
            case 'hidden':
                t = e.tail;
                for (var n = null; t !== null; ) t.alternate !== null && (n = t), (t = t.sibling);
                n === null ? (e.tail = null) : (n.sibling = null);
                break;
            case 'collapsed':
                n = e.tail;
                for (var r = null; n !== null; ) n.alternate !== null && (r = n), (n = n.sibling);
                r === null
                    ? t || e.tail === null
                        ? (e.tail = null)
                        : (e.tail.sibling = null)
                    : (r.sibling = null);
        }
}
function pe(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
        n = 0,
        r = 0;
    if (t)
        for (var l = e.child; l !== null; )
            (n |= l.lanes | l.childLanes),
                (r |= l.subtreeFlags & 14680064),
                (r |= l.flags & 14680064),
                (l.return = e),
                (l = l.sibling);
    else
        for (l = e.child; l !== null; )
            (n |= l.lanes | l.childLanes),
                (r |= l.subtreeFlags),
                (r |= l.flags),
                (l.return = e),
                (l = l.sibling);
    return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function j2(e, t, n) {
    var r = t.pendingProps;
    switch ((ds(t), t.tag)) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
            return pe(t), null;
        case 1:
            return Pe(t.type) && oo(), pe(t), null;
        case 3:
            return (
                (r = t.stateNode),
                qn(),
                H(_e),
                H(me),
                Es(),
                r.pendingContext && ((r.context = r.pendingContext), (r.pendingContext = null)),
                (e === null || e.child === null) &&
                    (Ll(t)
                        ? (t.flags |= 4)
                        : e === null ||
                          (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                          ((t.flags |= 1024), tt !== null && (zu(tt), (tt = null)))),
                Mu(e, t),
                pe(t),
                null
            );
        case 5:
            Ss(t);
            var l = cn(Yr.current);
            if (((n = t.type), e !== null && t.stateNode != null))
                Nd(e, t, n, r, l), e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
            else {
                if (!r) {
                    if (t.stateNode === null) throw Error(k(166));
                    return pe(t), null;
                }
                if (((e = cn(pt.current)), Ll(t))) {
                    (r = t.stateNode), (n = t.type);
                    var o = t.memoizedProps;
                    switch (((r[ct] = t), (r[Gr] = o), (e = (t.mode & 1) !== 0), n)) {
                        case 'dialog':
                            b('cancel', r), b('close', r);
                            break;
                        case 'iframe':
                        case 'object':
                        case 'embed':
                            b('load', r);
                            break;
                        case 'video':
                        case 'audio':
                            for (l = 0; l < xr.length; l++) b(xr[l], r);
                            break;
                        case 'source':
                            b('error', r);
                            break;
                        case 'img':
                        case 'image':
                        case 'link':
                            b('error', r), b('load', r);
                            break;
                        case 'details':
                            b('toggle', r);
                            break;
                        case 'input':
                            ca(r, o), b('invalid', r);
                            break;
                        case 'select':
                            (r._wrapperState = { wasMultiple: !!o.multiple }), b('invalid', r);
                            break;
                        case 'textarea':
                            da(r, o), b('invalid', r);
                    }
                    tu(n, o), (l = null);
                    for (var i in o)
                        if (o.hasOwnProperty(i)) {
                            var u = o[i];
                            i === 'children'
                                ? typeof u == 'string'
                                    ? r.textContent !== u &&
                                      (o.suppressHydrationWarning !== !0 && Nl(r.textContent, u, e),
                                      (l = ['children', u]))
                                    : typeof u == 'number' &&
                                      r.textContent !== '' + u &&
                                      (o.suppressHydrationWarning !== !0 && Nl(r.textContent, u, e),
                                      (l = ['children', '' + u]))
                                : Fr.hasOwnProperty(i) &&
                                  u != null &&
                                  i === 'onScroll' &&
                                  b('scroll', r);
                        }
                    switch (n) {
                        case 'input':
                            El(r), fa(r, o, !0);
                            break;
                        case 'textarea':
                            El(r), pa(r);
                            break;
                        case 'select':
                        case 'option':
                            break;
                        default:
                            typeof o.onClick == 'function' && (r.onclick = lo);
                    }
                    (r = l), (t.updateQueue = r), r !== null && (t.flags |= 4);
                } else {
                    (i = l.nodeType === 9 ? l : l.ownerDocument),
                        e === 'http://www.w3.org/1999/xhtml' && (e = nf(n)),
                        e === 'http://www.w3.org/1999/xhtml'
                            ? n === 'script'
                                ? ((e = i.createElement('div')),
                                  (e.innerHTML = '<script></script>'),
                                  (e = e.removeChild(e.firstChild)))
                                : typeof r.is == 'string'
                                ? (e = i.createElement(n, { is: r.is }))
                                : ((e = i.createElement(n)),
                                  n === 'select' &&
                                      ((i = e),
                                      r.multiple ? (i.multiple = !0) : r.size && (i.size = r.size)))
                            : (e = i.createElementNS(e, n)),
                        (e[ct] = t),
                        (e[Gr] = r),
                        Md(e, t, !1, !1),
                        (t.stateNode = e);
                    e: {
                        switch (((i = nu(n, r)), n)) {
                            case 'dialog':
                                b('cancel', e), b('close', e), (l = r);
                                break;
                            case 'iframe':
                            case 'object':
                            case 'embed':
                                b('load', e), (l = r);
                                break;
                            case 'video':
                            case 'audio':
                                for (l = 0; l < xr.length; l++) b(xr[l], e);
                                l = r;
                                break;
                            case 'source':
                                b('error', e), (l = r);
                                break;
                            case 'img':
                            case 'image':
                            case 'link':
                                b('error', e), b('load', e), (l = r);
                                break;
                            case 'details':
                                b('toggle', e), (l = r);
                                break;
                            case 'input':
                                ca(e, r), (l = Yi(e, r)), b('invalid', e);
                                break;
                            case 'option':
                                l = r;
                                break;
                            case 'select':
                                (e._wrapperState = { wasMultiple: !!r.multiple }),
                                    (l = Q({}, r, { value: void 0 })),
                                    b('invalid', e);
                                break;
                            case 'textarea':
                                da(e, r), (l = Ji(e, r)), b('invalid', e);
                                break;
                            default:
                                l = r;
                        }
                        tu(n, l), (u = l);
                        for (o in u)
                            if (u.hasOwnProperty(o)) {
                                var s = u[o];
                                o === 'style'
                                    ? of(e, s)
                                    : o === 'dangerouslySetInnerHTML'
                                    ? ((s = s ? s.__html : void 0), s != null && rf(e, s))
                                    : o === 'children'
                                    ? typeof s == 'string'
                                        ? (n !== 'textarea' || s !== '') && Ur(e, s)
                                        : typeof s == 'number' && Ur(e, '' + s)
                                    : o !== 'suppressContentEditableWarning' &&
                                      o !== 'suppressHydrationWarning' &&
                                      o !== 'autoFocus' &&
                                      (Fr.hasOwnProperty(o)
                                          ? s != null && o === 'onScroll' && b('scroll', e)
                                          : s != null && Xu(e, o, s, i));
                            }
                        switch (n) {
                            case 'input':
                                El(e), fa(e, r, !1);
                                break;
                            case 'textarea':
                                El(e), pa(e);
                                break;
                            case 'option':
                                r.value != null && e.setAttribute('value', '' + Yt(r.value));
                                break;
                            case 'select':
                                (e.multiple = !!r.multiple),
                                    (o = r.value),
                                    o != null
                                        ? bn(e, !!r.multiple, o, !1)
                                        : r.defaultValue != null &&
                                          bn(e, !!r.multiple, r.defaultValue, !0);
                                break;
                            default:
                                typeof l.onClick == 'function' && (e.onclick = lo);
                        }
                        switch (n) {
                            case 'button':
                            case 'input':
                            case 'select':
                            case 'textarea':
                                r = !!r.autoFocus;
                                break e;
                            case 'img':
                                r = !0;
                                break e;
                            default:
                                r = !1;
                        }
                    }
                    r && (t.flags |= 4);
                }
                t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
            }
            return pe(t), null;
        case 6:
            if (e && t.stateNode != null) Ld(e, t, e.memoizedProps, r);
            else {
                if (typeof r != 'string' && t.stateNode === null) throw Error(k(166));
                if (((n = cn(Yr.current)), cn(pt.current), Ll(t))) {
                    if (
                        ((r = t.stateNode),
                        (n = t.memoizedProps),
                        (r[ct] = t),
                        (o = r.nodeValue !== n) && ((e = Ie), e !== null))
                    )
                        switch (e.tag) {
                            case 3:
                                Nl(r.nodeValue, n, (e.mode & 1) !== 0);
                                break;
                            case 5:
                                e.memoizedProps.suppressHydrationWarning !== !0 &&
                                    Nl(r.nodeValue, n, (e.mode & 1) !== 0);
                        }
                    o && (t.flags |= 4);
                } else
                    (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
                        (r[ct] = t),
                        (t.stateNode = r);
            }
            return pe(t), null;
        case 13:
            if (
                (H($),
                (r = t.memoizedState),
                e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
            ) {
                if (V && Ae !== null && t.mode & 1 && !(t.flags & 128))
                    Qf(), Yn(), (t.flags |= 98560), (o = !1);
                else if (((o = Ll(t)), r !== null && r.dehydrated !== null)) {
                    if (e === null) {
                        if (!o) throw Error(k(318));
                        if (((o = t.memoizedState), (o = o !== null ? o.dehydrated : null), !o))
                            throw Error(k(317));
                        o[ct] = t;
                    } else Yn(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
                    pe(t), (o = !1);
                } else tt !== null && (zu(tt), (tt = null)), (o = !0);
                if (!o) return t.flags & 65536 ? t : null;
            }
            return t.flags & 128
                ? ((t.lanes = n), t)
                : ((r = r !== null),
                  r !== (e !== null && e.memoizedState !== null) &&
                      r &&
                      ((t.child.flags |= 8192),
                      t.mode & 1 && (e === null || $.current & 1 ? ne === 0 && (ne = 3) : Ts())),
                  t.updateQueue !== null && (t.flags |= 4),
                  pe(t),
                  null);
        case 4:
            return qn(), Mu(e, t), e === null && Zr(t.stateNode.containerInfo), pe(t), null;
        case 10:
            return ms(t.type._context), pe(t), null;
        case 17:
            return Pe(t.type) && oo(), pe(t), null;
        case 19:
            if ((H($), (o = t.memoizedState), o === null)) return pe(t), null;
            if (((r = (t.flags & 128) !== 0), (i = o.rendering), i === null))
                if (r) wr(o, !1);
                else {
                    if (ne !== 0 || (e !== null && e.flags & 128))
                        for (e = t.child; e !== null; ) {
                            if (((i = po(e)), i !== null)) {
                                for (
                                    t.flags |= 128,
                                        wr(o, !1),
                                        r = i.updateQueue,
                                        r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                                        t.subtreeFlags = 0,
                                        r = n,
                                        n = t.child;
                                    n !== null;

                                )
                                    (o = n),
                                        (e = r),
                                        (o.flags &= 14680066),
                                        (i = o.alternate),
                                        i === null
                                            ? ((o.childLanes = 0),
                                              (o.lanes = e),
                                              (o.child = null),
                                              (o.subtreeFlags = 0),
                                              (o.memoizedProps = null),
                                              (o.memoizedState = null),
                                              (o.updateQueue = null),
                                              (o.dependencies = null),
                                              (o.stateNode = null))
                                            : ((o.childLanes = i.childLanes),
                                              (o.lanes = i.lanes),
                                              (o.child = i.child),
                                              (o.subtreeFlags = 0),
                                              (o.deletions = null),
                                              (o.memoizedProps = i.memoizedProps),
                                              (o.memoizedState = i.memoizedState),
                                              (o.updateQueue = i.updateQueue),
                                              (o.type = i.type),
                                              (e = i.dependencies),
                                              (o.dependencies =
                                                  e === null
                                                      ? null
                                                      : {
                                                            lanes: e.lanes,
                                                            firstContext: e.firstContext,
                                                        })),
                                        (n = n.sibling);
                                return W($, ($.current & 1) | 2), t.child;
                            }
                            e = e.sibling;
                        }
                    o.tail !== null &&
                        X() > er &&
                        ((t.flags |= 128), (r = !0), wr(o, !1), (t.lanes = 4194304));
                }
            else {
                if (!r)
                    if (((e = po(i)), e !== null)) {
                        if (
                            ((t.flags |= 128),
                            (r = !0),
                            (n = e.updateQueue),
                            n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                            wr(o, !0),
                            o.tail === null && o.tailMode === 'hidden' && !i.alternate && !V)
                        )
                            return pe(t), null;
                    } else
                        2 * X() - o.renderingStartTime > er &&
                            n !== 1073741824 &&
                            ((t.flags |= 128), (r = !0), wr(o, !1), (t.lanes = 4194304));
                o.isBackwards
                    ? ((i.sibling = t.child), (t.child = i))
                    : ((n = o.last), n !== null ? (n.sibling = i) : (t.child = i), (o.last = i));
            }
            return o.tail !== null
                ? ((t = o.tail),
                  (o.rendering = t),
                  (o.tail = t.sibling),
                  (o.renderingStartTime = X()),
                  (t.sibling = null),
                  (n = $.current),
                  W($, r ? (n & 1) | 2 : n & 1),
                  t)
                : (pe(t), null);
        case 22:
        case 23:
            return (
                Ds(),
                (r = t.memoizedState !== null),
                e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
                r && t.mode & 1
                    ? De & 1073741824 && (pe(t), t.subtreeFlags & 6 && (t.flags |= 8192))
                    : pe(t),
                null
            );
        case 24:
            return null;
        case 25:
            return null;
    }
    throw Error(k(156, t.tag));
}
function F2(e, t) {
    switch ((ds(t), t.tag)) {
        case 1:
            return (
                Pe(t.type) && oo(),
                (e = t.flags),
                e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
            );
        case 3:
            return (
                qn(),
                H(_e),
                H(me),
                Es(),
                (e = t.flags),
                e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
            );
        case 5:
            return Ss(t), null;
        case 13:
            if ((H($), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
                if (t.alternate === null) throw Error(k(340));
                Yn();
            }
            return (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null;
        case 19:
            return H($), null;
        case 4:
            return qn(), null;
        case 10:
            return ms(t.type._context), null;
        case 22:
        case 23:
            return Ds(), null;
        case 24:
            return null;
        default:
            return null;
    }
}
var Tl = !1,
    ve = !1,
    U2 = typeof WeakSet == 'function' ? WeakSet : Set,
    M = null;
function Fn(e, t) {
    var n = e.ref;
    if (n !== null)
        if (typeof n == 'function')
            try {
                n(null);
            } catch (r) {
                G(e, t, r);
            }
        else n.current = null;
}
function Nu(e, t, n) {
    try {
        n();
    } catch (r) {
        G(e, t, r);
    }
}
var nc = !1;
function W2(e, t) {
    if (((du = to), (e = Af()), cs(e))) {
        if ('selectionStart' in e) var n = { start: e.selectionStart, end: e.selectionEnd };
        else
            e: {
                n = ((n = e.ownerDocument) && n.defaultView) || window;
                var r = n.getSelection && n.getSelection();
                if (r && r.rangeCount !== 0) {
                    n = r.anchorNode;
                    var l = r.anchorOffset,
                        o = r.focusNode;
                    r = r.focusOffset;
                    try {
                        n.nodeType, o.nodeType;
                    } catch {
                        n = null;
                        break e;
                    }
                    var i = 0,
                        u = -1,
                        s = -1,
                        a = 0,
                        c = 0,
                        f = e,
                        h = null;
                    t: for (;;) {
                        for (
                            var g;
                            f !== n || (l !== 0 && f.nodeType !== 3) || (u = i + l),
                                f !== o || (r !== 0 && f.nodeType !== 3) || (s = i + r),
                                f.nodeType === 3 && (i += f.nodeValue.length),
                                (g = f.firstChild) !== null;

                        )
                            (h = f), (f = g);
                        for (;;) {
                            if (f === e) break t;
                            if (
                                (h === n && ++a === l && (u = i),
                                h === o && ++c === r && (s = i),
                                (g = f.nextSibling) !== null)
                            )
                                break;
                            (f = h), (h = f.parentNode);
                        }
                        f = g;
                    }
                    n = u === -1 || s === -1 ? null : { start: u, end: s };
                } else n = null;
            }
        n = n || { start: 0, end: 0 };
    } else n = null;
    for (pu = { focusedElem: e, selectionRange: n }, to = !1, M = t; M !== null; )
        if (((t = M), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
            (e.return = t), (M = e);
        else
            for (; M !== null; ) {
                t = M;
                try {
                    var S = t.alternate;
                    if (t.flags & 1024)
                        switch (t.tag) {
                            case 0:
                            case 11:
                            case 15:
                                break;
                            case 1:
                                if (S !== null) {
                                    var y = S.memoizedProps,
                                        N = S.memoizedState,
                                        p = t.stateNode,
                                        d = p.getSnapshotBeforeUpdate(
                                            t.elementType === t.type ? y : Je(t.type, y),
                                            N,
                                        );
                                    p.__reactInternalSnapshotBeforeUpdate = d;
                                }
                                break;
                            case 3:
                                var v = t.stateNode.containerInfo;
                                v.nodeType === 1
                                    ? (v.textContent = '')
                                    : v.nodeType === 9 &&
                                      v.documentElement &&
                                      v.removeChild(v.documentElement);
                                break;
                            case 5:
                            case 6:
                            case 4:
                            case 17:
                                break;
                            default:
                                throw Error(k(163));
                        }
                } catch (w) {
                    G(t, t.return, w);
                }
                if (((e = t.sibling), e !== null)) {
                    (e.return = t.return), (M = e);
                    break;
                }
                M = t.return;
            }
    return (S = nc), (nc = !1), S;
}
function Dr(e, t, n) {
    var r = t.updateQueue;
    if (((r = r !== null ? r.lastEffect : null), r !== null)) {
        var l = (r = r.next);
        do {
            if ((l.tag & e) === e) {
                var o = l.destroy;
                (l.destroy = void 0), o !== void 0 && Nu(t, n, o);
            }
            l = l.next;
        } while (l !== r);
    }
}
function Wo(e, t) {
    if (((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)) {
        var n = (t = t.next);
        do {
            if ((n.tag & e) === e) {
                var r = n.create;
                n.destroy = r();
            }
            n = n.next;
        } while (n !== t);
    }
}
function Lu(e) {
    var t = e.ref;
    if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
            case 5:
                e = n;
                break;
            default:
                e = n;
        }
        typeof t == 'function' ? t(e) : (t.current = e);
    }
}
function Od(e) {
    var t = e.alternate;
    t !== null && ((e.alternate = null), Od(t)),
        (e.child = null),
        (e.deletions = null),
        (e.sibling = null),
        e.tag === 5 &&
            ((t = e.stateNode),
            t !== null && (delete t[ct], delete t[Gr], delete t[mu], delete t[C2], delete t[k2])),
        (e.stateNode = null),
        (e.return = null),
        (e.dependencies = null),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.pendingProps = null),
        (e.stateNode = null),
        (e.updateQueue = null);
}
function Dd(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function rc(e) {
    e: for (;;) {
        for (; e.sibling === null; ) {
            if (e.return === null || Dd(e.return)) return null;
            e = e.return;
        }
        for (
            e.sibling.return = e.return, e = e.sibling;
            e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

        ) {
            if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
            (e.child.return = e), (e = e.child);
        }
        if (!(e.flags & 2)) return e.stateNode;
    }
}
function Ou(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        (e = e.stateNode),
            t
                ? n.nodeType === 8
                    ? n.parentNode.insertBefore(e, t)
                    : n.insertBefore(e, t)
                : (n.nodeType === 8
                      ? ((t = n.parentNode), t.insertBefore(e, n))
                      : ((t = n), t.appendChild(e)),
                  (n = n._reactRootContainer),
                  n != null || t.onclick !== null || (t.onclick = lo));
    else if (r !== 4 && ((e = e.child), e !== null))
        for (Ou(e, t, n), e = e.sibling; e !== null; ) Ou(e, t, n), (e = e.sibling);
}
function Du(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && ((e = e.child), e !== null))
        for (Du(e, t, n), e = e.sibling; e !== null; ) Du(e, t, n), (e = e.sibling);
}
var ae = null,
    et = !1;
function Ot(e, t, n) {
    for (n = n.child; n !== null; ) Td(e, t, n), (n = n.sibling);
}
function Td(e, t, n) {
    if (dt && typeof dt.onCommitFiberUnmount == 'function')
        try {
            dt.onCommitFiberUnmount(Do, n);
        } catch {}
    switch (n.tag) {
        case 5:
            ve || Fn(n, t);
        case 6:
            var r = ae,
                l = et;
            (ae = null),
                Ot(e, t, n),
                (ae = r),
                (et = l),
                ae !== null &&
                    (et
                        ? ((e = ae),
                          (n = n.stateNode),
                          e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
                        : ae.removeChild(n.stateNode));
            break;
        case 18:
            ae !== null &&
                (et
                    ? ((e = ae),
                      (n = n.stateNode),
                      e.nodeType === 8 ? Ri(e.parentNode, n) : e.nodeType === 1 && Ri(e, n),
                      Br(e))
                    : Ri(ae, n.stateNode));
            break;
        case 4:
            (r = ae),
                (l = et),
                (ae = n.stateNode.containerInfo),
                (et = !0),
                Ot(e, t, n),
                (ae = r),
                (et = l);
            break;
        case 0:
        case 11:
        case 14:
        case 15:
            if (!ve && ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))) {
                l = r = r.next;
                do {
                    var o = l,
                        i = o.destroy;
                    (o = o.tag), i !== void 0 && (o & 2 || o & 4) && Nu(n, t, i), (l = l.next);
                } while (l !== r);
            }
            Ot(e, t, n);
            break;
        case 1:
            if (!ve && (Fn(n, t), (r = n.stateNode), typeof r.componentWillUnmount == 'function'))
                try {
                    (r.props = n.memoizedProps),
                        (r.state = n.memoizedState),
                        r.componentWillUnmount();
                } catch (u) {
                    G(n, t, u);
                }
            Ot(e, t, n);
            break;
        case 21:
            Ot(e, t, n);
            break;
        case 22:
            n.mode & 1
                ? ((ve = (r = ve) || n.memoizedState !== null), Ot(e, t, n), (ve = r))
                : Ot(e, t, n);
            break;
        default:
            Ot(e, t, n);
    }
}
function lc(e) {
    var t = e.updateQueue;
    if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        n === null && (n = e.stateNode = new U2()),
            t.forEach(function (r) {
                var l = K2.bind(null, e, r);
                n.has(r) || (n.add(r), r.then(l, l));
            });
    }
}
function qe(e, t) {
    var n = t.deletions;
    if (n !== null)
        for (var r = 0; r < n.length; r++) {
            var l = n[r];
            try {
                var o = e,
                    i = t,
                    u = i;
                e: for (; u !== null; ) {
                    switch (u.tag) {
                        case 5:
                            (ae = u.stateNode), (et = !1);
                            break e;
                        case 3:
                            (ae = u.stateNode.containerInfo), (et = !0);
                            break e;
                        case 4:
                            (ae = u.stateNode.containerInfo), (et = !0);
                            break e;
                    }
                    u = u.return;
                }
                if (ae === null) throw Error(k(160));
                Td(o, i, l), (ae = null), (et = !1);
                var s = l.alternate;
                s !== null && (s.return = null), (l.return = null);
            } catch (a) {
                G(l, t, a);
            }
        }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Ad(t, e), (t = t.sibling);
}
function Ad(e, t) {
    var n = e.alternate,
        r = e.flags;
    switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
            if ((qe(t, e), st(e), r & 4)) {
                try {
                    Dr(3, e, e.return), Wo(3, e);
                } catch (y) {
                    G(e, e.return, y);
                }
                try {
                    Dr(5, e, e.return);
                } catch (y) {
                    G(e, e.return, y);
                }
            }
            break;
        case 1:
            qe(t, e), st(e), r & 512 && n !== null && Fn(n, n.return);
            break;
        case 5:
            if ((qe(t, e), st(e), r & 512 && n !== null && Fn(n, n.return), e.flags & 32)) {
                var l = e.stateNode;
                try {
                    Ur(l, '');
                } catch (y) {
                    G(e, e.return, y);
                }
            }
            if (r & 4 && ((l = e.stateNode), l != null)) {
                var o = e.memoizedProps,
                    i = n !== null ? n.memoizedProps : o,
                    u = e.type,
                    s = e.updateQueue;
                if (((e.updateQueue = null), s !== null))
                    try {
                        u === 'input' && o.type === 'radio' && o.name != null && ef(l, o), nu(u, i);
                        var a = nu(u, o);
                        for (i = 0; i < s.length; i += 2) {
                            var c = s[i],
                                f = s[i + 1];
                            c === 'style'
                                ? of(l, f)
                                : c === 'dangerouslySetInnerHTML'
                                ? rf(l, f)
                                : c === 'children'
                                ? Ur(l, f)
                                : Xu(l, c, f, a);
                        }
                        switch (u) {
                            case 'input':
                                Xi(l, o);
                                break;
                            case 'textarea':
                                tf(l, o);
                                break;
                            case 'select':
                                var h = l._wrapperState.wasMultiple;
                                l._wrapperState.wasMultiple = !!o.multiple;
                                var g = o.value;
                                g != null
                                    ? bn(l, !!o.multiple, g, !1)
                                    : h !== !!o.multiple &&
                                      (o.defaultValue != null
                                          ? bn(l, !!o.multiple, o.defaultValue, !0)
                                          : bn(l, !!o.multiple, o.multiple ? [] : '', !1));
                        }
                        l[Gr] = o;
                    } catch (y) {
                        G(e, e.return, y);
                    }
            }
            break;
        case 6:
            if ((qe(t, e), st(e), r & 4)) {
                if (e.stateNode === null) throw Error(k(162));
                (l = e.stateNode), (o = e.memoizedProps);
                try {
                    l.nodeValue = o;
                } catch (y) {
                    G(e, e.return, y);
                }
            }
            break;
        case 3:
            if ((qe(t, e), st(e), r & 4 && n !== null && n.memoizedState.isDehydrated))
                try {
                    Br(t.containerInfo);
                } catch (y) {
                    G(e, e.return, y);
                }
            break;
        case 4:
            qe(t, e), st(e);
            break;
        case 13:
            qe(t, e),
                st(e),
                (l = e.child),
                l.flags & 8192 &&
                    ((o = l.memoizedState !== null),
                    (l.stateNode.isHidden = o),
                    !o ||
                        (l.alternate !== null && l.alternate.memoizedState !== null) ||
                        (Ls = X())),
                r & 4 && lc(e);
            break;
        case 22:
            if (
                ((c = n !== null && n.memoizedState !== null),
                e.mode & 1 ? ((ve = (a = ve) || c), qe(t, e), (ve = a)) : qe(t, e),
                st(e),
                r & 8192)
            ) {
                if (
                    ((a = e.memoizedState !== null), (e.stateNode.isHidden = a) && !c && e.mode & 1)
                )
                    for (M = e, c = e.child; c !== null; ) {
                        for (f = M = c; M !== null; ) {
                            switch (((h = M), (g = h.child), h.tag)) {
                                case 0:
                                case 11:
                                case 14:
                                case 15:
                                    Dr(4, h, h.return);
                                    break;
                                case 1:
                                    Fn(h, h.return);
                                    var S = h.stateNode;
                                    if (typeof S.componentWillUnmount == 'function') {
                                        (r = h), (n = h.return);
                                        try {
                                            (t = r),
                                                (S.props = t.memoizedProps),
                                                (S.state = t.memoizedState),
                                                S.componentWillUnmount();
                                        } catch (y) {
                                            G(r, n, y);
                                        }
                                    }
                                    break;
                                case 5:
                                    Fn(h, h.return);
                                    break;
                                case 22:
                                    if (h.memoizedState !== null) {
                                        ic(f);
                                        continue;
                                    }
                            }
                            g !== null ? ((g.return = h), (M = g)) : ic(f);
                        }
                        c = c.sibling;
                    }
                e: for (c = null, f = e; ; ) {
                    if (f.tag === 5) {
                        if (c === null) {
                            c = f;
                            try {
                                (l = f.stateNode),
                                    a
                                        ? ((o = l.style),
                                          typeof o.setProperty == 'function'
                                              ? o.setProperty('display', 'none', 'important')
                                              : (o.display = 'none'))
                                        : ((u = f.stateNode),
                                          (s = f.memoizedProps.style),
                                          (i =
                                              s != null && s.hasOwnProperty('display')
                                                  ? s.display
                                                  : null),
                                          (u.style.display = lf('display', i)));
                            } catch (y) {
                                G(e, e.return, y);
                            }
                        }
                    } else if (f.tag === 6) {
                        if (c === null)
                            try {
                                f.stateNode.nodeValue = a ? '' : f.memoizedProps;
                            } catch (y) {
                                G(e, e.return, y);
                            }
                    } else if (
                        ((f.tag !== 22 && f.tag !== 23) || f.memoizedState === null || f === e) &&
                        f.child !== null
                    ) {
                        (f.child.return = f), (f = f.child);
                        continue;
                    }
                    if (f === e) break e;
                    for (; f.sibling === null; ) {
                        if (f.return === null || f.return === e) break e;
                        c === f && (c = null), (f = f.return);
                    }
                    c === f && (c = null), (f.sibling.return = f.return), (f = f.sibling);
                }
            }
            break;
        case 19:
            qe(t, e), st(e), r & 4 && lc(e);
            break;
        case 21:
            break;
        default:
            qe(t, e), st(e);
    }
}
function st(e) {
    var t = e.flags;
    if (t & 2) {
        try {
            e: {
                for (var n = e.return; n !== null; ) {
                    if (Dd(n)) {
                        var r = n;
                        break e;
                    }
                    n = n.return;
                }
                throw Error(k(160));
            }
            switch (r.tag) {
                case 5:
                    var l = r.stateNode;
                    r.flags & 32 && (Ur(l, ''), (r.flags &= -33));
                    var o = rc(e);
                    Du(e, o, l);
                    break;
                case 3:
                case 4:
                    var i = r.stateNode.containerInfo,
                        u = rc(e);
                    Ou(e, u, i);
                    break;
                default:
                    throw Error(k(161));
            }
        } catch (s) {
            G(e, e.return, s);
        }
        e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
}
function b2(e, t, n) {
    (M = e), Id(e);
}
function Id(e, t, n) {
    for (var r = (e.mode & 1) !== 0; M !== null; ) {
        var l = M,
            o = l.child;
        if (l.tag === 22 && r) {
            var i = l.memoizedState !== null || Tl;
            if (!i) {
                var u = l.alternate,
                    s = (u !== null && u.memoizedState !== null) || ve;
                u = Tl;
                var a = ve;
                if (((Tl = i), (ve = s) && !a))
                    for (M = l; M !== null; )
                        (i = M),
                            (s = i.child),
                            i.tag === 22 && i.memoizedState !== null
                                ? uc(l)
                                : s !== null
                                ? ((s.return = i), (M = s))
                                : uc(l);
                for (; o !== null; ) (M = o), Id(o), (o = o.sibling);
                (M = l), (Tl = u), (ve = a);
            }
            oc(e);
        } else l.subtreeFlags & 8772 && o !== null ? ((o.return = l), (M = o)) : oc(e);
    }
}
function oc(e) {
    for (; M !== null; ) {
        var t = M;
        if (t.flags & 8772) {
            var n = t.alternate;
            try {
                if (t.flags & 8772)
                    switch (t.tag) {
                        case 0:
                        case 11:
                        case 15:
                            ve || Wo(5, t);
                            break;
                        case 1:
                            var r = t.stateNode;
                            if (t.flags & 4 && !ve)
                                if (n === null) r.componentDidMount();
                                else {
                                    var l =
                                        t.elementType === t.type
                                            ? n.memoizedProps
                                            : Je(t.type, n.memoizedProps);
                                    r.componentDidUpdate(
                                        l,
                                        n.memoizedState,
                                        r.__reactInternalSnapshotBeforeUpdate,
                                    );
                                }
                            var o = t.updateQueue;
                            o !== null && Ha(t, o, r);
                            break;
                        case 3:
                            var i = t.updateQueue;
                            if (i !== null) {
                                if (((n = null), t.child !== null))
                                    switch (t.child.tag) {
                                        case 5:
                                            n = t.child.stateNode;
                                            break;
                                        case 1:
                                            n = t.child.stateNode;
                                    }
                                Ha(t, i, n);
                            }
                            break;
                        case 5:
                            var u = t.stateNode;
                            if (n === null && t.flags & 4) {
                                n = u;
                                var s = t.memoizedProps;
                                switch (t.type) {
                                    case 'button':
                                    case 'input':
                                    case 'select':
                                    case 'textarea':
                                        s.autoFocus && n.focus();
                                        break;
                                    case 'img':
                                        s.src && (n.src = s.src);
                                }
                            }
                            break;
                        case 6:
                            break;
                        case 4:
                            break;
                        case 12:
                            break;
                        case 13:
                            if (t.memoizedState === null) {
                                var a = t.alternate;
                                if (a !== null) {
                                    var c = a.memoizedState;
                                    if (c !== null) {
                                        var f = c.dehydrated;
                                        f !== null && Br(f);
                                    }
                                }
                            }
                            break;
                        case 19:
                        case 17:
                        case 21:
                        case 22:
                        case 23:
                        case 25:
                            break;
                        default:
                            throw Error(k(163));
                    }
                ve || (t.flags & 512 && Lu(t));
            } catch (h) {
                G(t, t.return, h);
            }
        }
        if (t === e) {
            M = null;
            break;
        }
        if (((n = t.sibling), n !== null)) {
            (n.return = t.return), (M = n);
            break;
        }
        M = t.return;
    }
}
function ic(e) {
    for (; M !== null; ) {
        var t = M;
        if (t === e) {
            M = null;
            break;
        }
        var n = t.sibling;
        if (n !== null) {
            (n.return = t.return), (M = n);
            break;
        }
        M = t.return;
    }
}
function uc(e) {
    for (; M !== null; ) {
        var t = M;
        try {
            switch (t.tag) {
                case 0:
                case 11:
                case 15:
                    var n = t.return;
                    try {
                        Wo(4, t);
                    } catch (s) {
                        G(t, n, s);
                    }
                    break;
                case 1:
                    var r = t.stateNode;
                    if (typeof r.componentDidMount == 'function') {
                        var l = t.return;
                        try {
                            r.componentDidMount();
                        } catch (s) {
                            G(t, l, s);
                        }
                    }
                    var o = t.return;
                    try {
                        Lu(t);
                    } catch (s) {
                        G(t, o, s);
                    }
                    break;
                case 5:
                    var i = t.return;
                    try {
                        Lu(t);
                    } catch (s) {
                        G(t, i, s);
                    }
            }
        } catch (s) {
            G(t, t.return, s);
        }
        if (t === e) {
            M = null;
            break;
        }
        var u = t.sibling;
        if (u !== null) {
            (u.return = t.return), (M = u);
            break;
        }
        M = t.return;
    }
}
var H2 = Math.ceil,
    mo = Rt.ReactCurrentDispatcher,
    Ms = Rt.ReactCurrentOwner,
    $e = Rt.ReactCurrentBatchConfig,
    z = 0,
    ue = null,
    q = null,
    ce = 0,
    De = 0,
    Un = en(0),
    ne = 0,
    el = null,
    gn = 0,
    bo = 0,
    Ns = 0,
    Tr = null,
    ke = null,
    Ls = 0,
    er = 1 / 0,
    gt = null,
    go = !1,
    Tu = null,
    Qt = null,
    Al = !1,
    bt = null,
    yo = 0,
    Ar = 0,
    Au = null,
    Zl = -1,
    Ql = 0;
function Se() {
    return z & 6 ? X() : Zl !== -1 ? Zl : (Zl = X());
}
function Gt(e) {
    return e.mode & 1
        ? z & 2 && ce !== 0
            ? ce & -ce
            : _2.transition !== null
            ? (Ql === 0 && (Ql = yf()), Ql)
            : ((e = j), e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : _f(e.type))), e)
        : 1;
}
function rt(e, t, n, r) {
    if (50 < Ar) throw ((Ar = 0), (Au = null), Error(k(185)));
    il(e, n, r),
        (!(z & 2) || e !== ue) &&
            (e === ue && (!(z & 2) && (bo |= n), ne === 4 && Ft(e, ce)),
            Re(e, r),
            n === 1 && z === 0 && !(t.mode & 1) && ((er = X() + 500), jo && tn()));
}
function Re(e, t) {
    var n = e.callbackNode;
    _0(e, t);
    var r = eo(e, e === ue ? ce : 0);
    if (r === 0) n !== null && ma(n), (e.callbackNode = null), (e.callbackPriority = 0);
    else if (((t = r & -r), e.callbackPriority !== t)) {
        if ((n != null && ma(n), t === 1))
            e.tag === 0 ? x2(sc.bind(null, e)) : Vf(sc.bind(null, e)),
                S2(function () {
                    !(z & 6) && tn();
                }),
                (n = null);
        else {
            switch (wf(r)) {
                case 1:
                    n = ns;
                    break;
                case 4:
                    n = mf;
                    break;
                case 16:
                    n = Jl;
                    break;
                case 536870912:
                    n = gf;
                    break;
                default:
                    n = Jl;
            }
            n = Bd(n, zd.bind(null, e));
        }
        (e.callbackPriority = t), (e.callbackNode = n);
    }
}
function zd(e, t) {
    if (((Zl = -1), (Ql = 0), z & 6)) throw Error(k(327));
    var n = e.callbackNode;
    if (Zn() && e.callbackNode !== n) return null;
    var r = eo(e, e === ue ? ce : 0);
    if (r === 0) return null;
    if (r & 30 || r & e.expiredLanes || t) t = wo(e, r);
    else {
        t = r;
        var l = z;
        z |= 2;
        var o = Fd();
        (ue !== e || ce !== t) && ((gt = null), (er = X() + 500), fn(e, t));
        do
            try {
                $2();
                break;
            } catch (u) {
                jd(e, u);
            }
        while (!0);
        hs(), (mo.current = o), (z = l), q !== null ? (t = 0) : ((ue = null), (ce = 0), (t = ne));
    }
    if (t !== 0) {
        if ((t === 2 && ((l = uu(e)), l !== 0 && ((r = l), (t = Iu(e, l)))), t === 1))
            throw ((n = el), fn(e, 0), Ft(e, r), Re(e, X()), n);
        if (t === 6) Ft(e, r);
        else {
            if (
                ((l = e.current.alternate),
                !(r & 30) &&
                    !B2(l) &&
                    ((t = wo(e, r)),
                    t === 2 && ((o = uu(e)), o !== 0 && ((r = o), (t = Iu(e, o)))),
                    t === 1))
            )
                throw ((n = el), fn(e, 0), Ft(e, r), Re(e, X()), n);
            switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
                case 0:
                case 1:
                    throw Error(k(345));
                case 2:
                    un(e, ke, gt);
                    break;
                case 3:
                    if ((Ft(e, r), (r & 130023424) === r && ((t = Ls + 500 - X()), 10 < t))) {
                        if (eo(e, 0) !== 0) break;
                        if (((l = e.suspendedLanes), (l & r) !== r)) {
                            Se(), (e.pingedLanes |= e.suspendedLanes & l);
                            break;
                        }
                        e.timeoutHandle = hu(un.bind(null, e, ke, gt), t);
                        break;
                    }
                    un(e, ke, gt);
                    break;
                case 4:
                    if ((Ft(e, r), (r & 4194240) === r)) break;
                    for (t = e.eventTimes, l = -1; 0 < r; ) {
                        var i = 31 - nt(r);
                        (o = 1 << i), (i = t[i]), i > l && (l = i), (r &= ~o);
                    }
                    if (
                        ((r = l),
                        (r = X() - r),
                        (r =
                            (120 > r
                                ? 120
                                : 480 > r
                                ? 480
                                : 1080 > r
                                ? 1080
                                : 1920 > r
                                ? 1920
                                : 3e3 > r
                                ? 3e3
                                : 4320 > r
                                ? 4320
                                : 1960 * H2(r / 1960)) - r),
                        10 < r)
                    ) {
                        e.timeoutHandle = hu(un.bind(null, e, ke, gt), r);
                        break;
                    }
                    un(e, ke, gt);
                    break;
                case 5:
                    un(e, ke, gt);
                    break;
                default:
                    throw Error(k(329));
            }
        }
    }
    return Re(e, X()), e.callbackNode === n ? zd.bind(null, e) : null;
}
function Iu(e, t) {
    var n = Tr;
    return (
        e.current.memoizedState.isDehydrated && (fn(e, t).flags |= 256),
        (e = wo(e, t)),
        e !== 2 && ((t = ke), (ke = n), t !== null && zu(t)),
        e
    );
}
function zu(e) {
    ke === null ? (ke = e) : ke.push.apply(ke, e);
}
function B2(e) {
    for (var t = e; ; ) {
        if (t.flags & 16384) {
            var n = t.updateQueue;
            if (n !== null && ((n = n.stores), n !== null))
                for (var r = 0; r < n.length; r++) {
                    var l = n[r],
                        o = l.getSnapshot;
                    l = l.value;
                    try {
                        if (!lt(o(), l)) return !1;
                    } catch {
                        return !1;
                    }
                }
        }
        if (((n = t.child), t.subtreeFlags & 16384 && n !== null)) (n.return = t), (t = n);
        else {
            if (t === e) break;
            for (; t.sibling === null; ) {
                if (t.return === null || t.return === e) return !0;
                t = t.return;
            }
            (t.sibling.return = t.return), (t = t.sibling);
        }
    }
    return !0;
}
function Ft(e, t) {
    for (
        t &= ~Ns, t &= ~bo, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes;
        0 < t;

    ) {
        var n = 31 - nt(t),
            r = 1 << n;
        (e[n] = -1), (t &= ~r);
    }
}
function sc(e) {
    if (z & 6) throw Error(k(327));
    Zn();
    var t = eo(e, 0);
    if (!(t & 1)) return Re(e, X()), null;
    var n = wo(e, t);
    if (e.tag !== 0 && n === 2) {
        var r = uu(e);
        r !== 0 && ((t = r), (n = Iu(e, r)));
    }
    if (n === 1) throw ((n = el), fn(e, 0), Ft(e, t), Re(e, X()), n);
    if (n === 6) throw Error(k(345));
    return (
        (e.finishedWork = e.current.alternate),
        (e.finishedLanes = t),
        un(e, ke, gt),
        Re(e, X()),
        null
    );
}
function Os(e, t) {
    var n = z;
    z |= 1;
    try {
        return e(t);
    } finally {
        (z = n), z === 0 && ((er = X() + 500), jo && tn());
    }
}
function yn(e) {
    bt !== null && bt.tag === 0 && !(z & 6) && Zn();
    var t = z;
    z |= 1;
    var n = $e.transition,
        r = j;
    try {
        if ((($e.transition = null), (j = 1), e)) return e();
    } finally {
        (j = r), ($e.transition = n), (z = t), !(z & 6) && tn();
    }
}
function Ds() {
    (De = Un.current), H(Un);
}
function fn(e, t) {
    (e.finishedWork = null), (e.finishedLanes = 0);
    var n = e.timeoutHandle;
    if ((n !== -1 && ((e.timeoutHandle = -1), w2(n)), q !== null))
        for (n = q.return; n !== null; ) {
            var r = n;
            switch ((ds(r), r.tag)) {
                case 1:
                    (r = r.type.childContextTypes), r != null && oo();
                    break;
                case 3:
                    qn(), H(_e), H(me), Es();
                    break;
                case 5:
                    Ss(r);
                    break;
                case 4:
                    qn();
                    break;
                case 13:
                    H($);
                    break;
                case 19:
                    H($);
                    break;
                case 10:
                    ms(r.type._context);
                    break;
                case 22:
                case 23:
                    Ds();
            }
            n = n.return;
        }
    if (
        ((ue = e),
        (q = e = Kt(e.current, null)),
        (ce = De = t),
        (ne = 0),
        (el = null),
        (Ns = bo = gn = 0),
        (ke = Tr = null),
        an !== null)
    ) {
        for (t = 0; t < an.length; t++)
            if (((n = an[t]), (r = n.interleaved), r !== null)) {
                n.interleaved = null;
                var l = r.next,
                    o = n.pending;
                if (o !== null) {
                    var i = o.next;
                    (o.next = l), (r.next = i);
                }
                n.pending = r;
            }
        an = null;
    }
    return e;
}
function jd(e, t) {
    do {
        var n = q;
        try {
            if ((hs(), (Bl.current = ho), vo)) {
                for (var r = Z.memoizedState; r !== null; ) {
                    var l = r.queue;
                    l !== null && (l.pending = null), (r = r.next);
                }
                vo = !1;
            }
            if (
                ((mn = 0),
                (oe = ee = Z = null),
                (Or = !1),
                (Xr = 0),
                (Ms.current = null),
                n === null || n.return === null)
            ) {
                (ne = 1), (el = t), (q = null);
                break;
            }
            e: {
                var o = e,
                    i = n.return,
                    u = n,
                    s = t;
                if (
                    ((t = ce),
                    (u.flags |= 32768),
                    s !== null && typeof s == 'object' && typeof s.then == 'function')
                ) {
                    var a = s,
                        c = u,
                        f = c.tag;
                    if (!(c.mode & 1) && (f === 0 || f === 11 || f === 15)) {
                        var h = c.alternate;
                        h
                            ? ((c.updateQueue = h.updateQueue),
                              (c.memoizedState = h.memoizedState),
                              (c.lanes = h.lanes))
                            : ((c.updateQueue = null), (c.memoizedState = null));
                    }
                    var g = Ka(i);
                    if (g !== null) {
                        (g.flags &= -257),
                            Ya(g, i, u, o, t),
                            g.mode & 1 && Ga(o, a, t),
                            (t = g),
                            (s = a);
                        var S = t.updateQueue;
                        if (S === null) {
                            var y = new Set();
                            y.add(s), (t.updateQueue = y);
                        } else S.add(s);
                        break e;
                    } else {
                        if (!(t & 1)) {
                            Ga(o, a, t), Ts();
                            break e;
                        }
                        s = Error(k(426));
                    }
                } else if (V && u.mode & 1) {
                    var N = Ka(i);
                    if (N !== null) {
                        !(N.flags & 65536) && (N.flags |= 256), Ya(N, i, u, o, t), ps(Jn(s, u));
                        break e;
                    }
                }
                (o = s = Jn(s, u)),
                    ne !== 4 && (ne = 2),
                    Tr === null ? (Tr = [o]) : Tr.push(o),
                    (o = i);
                do {
                    switch (o.tag) {
                        case 3:
                            (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                            var p = Sd(o, s, t);
                            ba(o, p);
                            break e;
                        case 1:
                            u = s;
                            var d = o.type,
                                v = o.stateNode;
                            if (
                                !(o.flags & 128) &&
                                (typeof d.getDerivedStateFromError == 'function' ||
                                    (v !== null &&
                                        typeof v.componentDidCatch == 'function' &&
                                        (Qt === null || !Qt.has(v))))
                            ) {
                                (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                                var w = Ed(o, u, t);
                                ba(o, w);
                                break e;
                            }
                    }
                    o = o.return;
                } while (o !== null);
            }
            Wd(n);
        } catch (x) {
            (t = x), q === n && n !== null && (q = n = n.return);
            continue;
        }
        break;
    } while (!0);
}
function Fd() {
    var e = mo.current;
    return (mo.current = ho), e === null ? ho : e;
}
function Ts() {
    (ne === 0 || ne === 3 || ne === 2) && (ne = 4),
        ue === null || (!(gn & 268435455) && !(bo & 268435455)) || Ft(ue, ce);
}
function wo(e, t) {
    var n = z;
    z |= 2;
    var r = Fd();
    (ue !== e || ce !== t) && ((gt = null), fn(e, t));
    do
        try {
            V2();
            break;
        } catch (l) {
            jd(e, l);
        }
    while (!0);
    if ((hs(), (z = n), (mo.current = r), q !== null)) throw Error(k(261));
    return (ue = null), (ce = 0), ne;
}
function V2() {
    for (; q !== null; ) Ud(q);
}
function $2() {
    for (; q !== null && !m0(); ) Ud(q);
}
function Ud(e) {
    var t = Hd(e.alternate, e, De);
    (e.memoizedProps = e.pendingProps), t === null ? Wd(e) : (q = t), (Ms.current = null);
}
function Wd(e) {
    var t = e;
    do {
        var n = t.alternate;
        if (((e = t.return), t.flags & 32768)) {
            if (((n = F2(n, t)), n !== null)) {
                (n.flags &= 32767), (q = n);
                return;
            }
            if (e !== null) (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
            else {
                (ne = 6), (q = null);
                return;
            }
        } else if (((n = j2(n, t, De)), n !== null)) {
            q = n;
            return;
        }
        if (((t = t.sibling), t !== null)) {
            q = t;
            return;
        }
        q = t = e;
    } while (t !== null);
    ne === 0 && (ne = 5);
}
function un(e, t, n) {
    var r = j,
        l = $e.transition;
    try {
        ($e.transition = null), (j = 1), Z2(e, t, n, r);
    } finally {
        ($e.transition = l), (j = r);
    }
    return null;
}
function Z2(e, t, n, r) {
    do Zn();
    while (bt !== null);
    if (z & 6) throw Error(k(327));
    n = e.finishedWork;
    var l = e.finishedLanes;
    if (n === null) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current)) throw Error(k(177));
    (e.callbackNode = null), (e.callbackPriority = 0);
    var o = n.lanes | n.childLanes;
    if (
        (P0(e, o),
        e === ue && ((q = ue = null), (ce = 0)),
        (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
            Al ||
            ((Al = !0),
            Bd(Jl, function () {
                return Zn(), null;
            })),
        (o = (n.flags & 15990) !== 0),
        n.subtreeFlags & 15990 || o)
    ) {
        (o = $e.transition), ($e.transition = null);
        var i = j;
        j = 1;
        var u = z;
        (z |= 4),
            (Ms.current = null),
            W2(e, n),
            Ad(n, e),
            d2(pu),
            (to = !!du),
            (pu = du = null),
            (e.current = n),
            b2(n),
            g0(),
            (z = u),
            (j = i),
            ($e.transition = o);
    } else e.current = n;
    if (
        (Al && ((Al = !1), (bt = e), (yo = l)),
        (o = e.pendingLanes),
        o === 0 && (Qt = null),
        S0(n.stateNode),
        Re(e, X()),
        t !== null)
    )
        for (r = e.onRecoverableError, n = 0; n < t.length; n++)
            (l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest });
    if (go) throw ((go = !1), (e = Tu), (Tu = null), e);
    return (
        yo & 1 && e.tag !== 0 && Zn(),
        (o = e.pendingLanes),
        o & 1 ? (e === Au ? Ar++ : ((Ar = 0), (Au = e))) : (Ar = 0),
        tn(),
        null
    );
}
function Zn() {
    if (bt !== null) {
        var e = wf(yo),
            t = $e.transition,
            n = j;
        try {
            if ((($e.transition = null), (j = 16 > e ? 16 : e), bt === null)) var r = !1;
            else {
                if (((e = bt), (bt = null), (yo = 0), z & 6)) throw Error(k(331));
                var l = z;
                for (z |= 4, M = e.current; M !== null; ) {
                    var o = M,
                        i = o.child;
                    if (M.flags & 16) {
                        var u = o.deletions;
                        if (u !== null) {
                            for (var s = 0; s < u.length; s++) {
                                var a = u[s];
                                for (M = a; M !== null; ) {
                                    var c = M;
                                    switch (c.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            Dr(8, c, o);
                                    }
                                    var f = c.child;
                                    if (f !== null) (f.return = c), (M = f);
                                    else
                                        for (; M !== null; ) {
                                            c = M;
                                            var h = c.sibling,
                                                g = c.return;
                                            if ((Od(c), c === a)) {
                                                M = null;
                                                break;
                                            }
                                            if (h !== null) {
                                                (h.return = g), (M = h);
                                                break;
                                            }
                                            M = g;
                                        }
                                }
                            }
                            var S = o.alternate;
                            if (S !== null) {
                                var y = S.child;
                                if (y !== null) {
                                    S.child = null;
                                    do {
                                        var N = y.sibling;
                                        (y.sibling = null), (y = N);
                                    } while (y !== null);
                                }
                            }
                            M = o;
                        }
                    }
                    if (o.subtreeFlags & 2064 && i !== null) (i.return = o), (M = i);
                    else
                        e: for (; M !== null; ) {
                            if (((o = M), o.flags & 2048))
                                switch (o.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        Dr(9, o, o.return);
                                }
                            var p = o.sibling;
                            if (p !== null) {
                                (p.return = o.return), (M = p);
                                break e;
                            }
                            M = o.return;
                        }
                }
                var d = e.current;
                for (M = d; M !== null; ) {
                    i = M;
                    var v = i.child;
                    if (i.subtreeFlags & 2064 && v !== null) (v.return = i), (M = v);
                    else
                        e: for (i = d; M !== null; ) {
                            if (((u = M), u.flags & 2048))
                                try {
                                    switch (u.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            Wo(9, u);
                                    }
                                } catch (x) {
                                    G(u, u.return, x);
                                }
                            if (u === i) {
                                M = null;
                                break e;
                            }
                            var w = u.sibling;
                            if (w !== null) {
                                (w.return = u.return), (M = w);
                                break e;
                            }
                            M = u.return;
                        }
                }
                if (((z = l), tn(), dt && typeof dt.onPostCommitFiberRoot == 'function'))
                    try {
                        dt.onPostCommitFiberRoot(Do, e);
                    } catch {}
                r = !0;
            }
            return r;
        } finally {
            (j = n), ($e.transition = t);
        }
    }
    return !1;
}
function ac(e, t, n) {
    (t = Jn(n, t)),
        (t = Sd(e, t, 1)),
        (e = Zt(e, t, 1)),
        (t = Se()),
        e !== null && (il(e, 1, t), Re(e, t));
}
function G(e, t, n) {
    if (e.tag === 3) ac(e, e, n);
    else
        for (; t !== null; ) {
            if (t.tag === 3) {
                ac(t, e, n);
                break;
            } else if (t.tag === 1) {
                var r = t.stateNode;
                if (
                    typeof t.type.getDerivedStateFromError == 'function' ||
                    (typeof r.componentDidCatch == 'function' && (Qt === null || !Qt.has(r)))
                ) {
                    (e = Jn(n, e)),
                        (e = Ed(t, e, 1)),
                        (t = Zt(t, e, 1)),
                        (e = Se()),
                        t !== null && (il(t, 1, e), Re(t, e));
                    break;
                }
            }
            t = t.return;
        }
}
function Q2(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t),
        (t = Se()),
        (e.pingedLanes |= e.suspendedLanes & n),
        ue === e &&
            (ce & n) === n &&
            (ne === 4 || (ne === 3 && (ce & 130023424) === ce && 500 > X() - Ls)
                ? fn(e, 0)
                : (Ns |= n)),
        Re(e, t);
}
function bd(e, t) {
    t === 0 && (e.mode & 1 ? ((t = xl), (xl <<= 1), !(xl & 130023424) && (xl = 4194304)) : (t = 1));
    var n = Se();
    (e = xt(e, t)), e !== null && (il(e, t, n), Re(e, n));
}
function G2(e) {
    var t = e.memoizedState,
        n = 0;
    t !== null && (n = t.retryLane), bd(e, n);
}
function K2(e, t) {
    var n = 0;
    switch (e.tag) {
        case 13:
            var r = e.stateNode,
                l = e.memoizedState;
            l !== null && (n = l.retryLane);
            break;
        case 19:
            r = e.stateNode;
            break;
        default:
            throw Error(k(314));
    }
    r !== null && r.delete(t), bd(e, n);
}
var Hd;
Hd = function (e, t, n) {
    if (e !== null)
        if (e.memoizedProps !== t.pendingProps || _e.current) xe = !0;
        else {
            if (!(e.lanes & n) && !(t.flags & 128)) return (xe = !1), z2(e, t, n);
            xe = !!(e.flags & 131072);
        }
    else (xe = !1), V && t.flags & 1048576 && $f(t, so, t.index);
    switch (((t.lanes = 0), t.tag)) {
        case 2:
            var r = t.type;
            $l(e, t), (e = t.pendingProps);
            var l = Kn(t, me.current);
            $n(t, n), (l = ks(null, t, r, e, l, n));
            var o = xs();
            return (
                (t.flags |= 1),
                typeof l == 'object' &&
                l !== null &&
                typeof l.render == 'function' &&
                l.$$typeof === void 0
                    ? ((t.tag = 1),
                      (t.memoizedState = null),
                      (t.updateQueue = null),
                      Pe(r) ? ((o = !0), io(t)) : (o = !1),
                      (t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null),
                      ys(t),
                      (l.updater = Fo),
                      (t.stateNode = l),
                      (l._reactInternals = t),
                      Cu(t, r, e, n),
                      (t = _u(null, t, r, !0, o, n)))
                    : ((t.tag = 0), V && o && fs(t), we(null, t, l, n), (t = t.child)),
                t
            );
        case 16:
            r = t.elementType;
            e: {
                switch (
                    ($l(e, t),
                    (e = t.pendingProps),
                    (l = r._init),
                    (r = l(r._payload)),
                    (t.type = r),
                    (l = t.tag = X2(r)),
                    (e = Je(r, e)),
                    l)
                ) {
                    case 0:
                        t = xu(null, t, r, e, n);
                        break e;
                    case 1:
                        t = Ja(null, t, r, e, n);
                        break e;
                    case 11:
                        t = Xa(null, t, r, e, n);
                        break e;
                    case 14:
                        t = qa(null, t, r, Je(r.type, e), n);
                        break e;
                }
                throw Error(k(306, r, ''));
            }
            return t;
        case 0:
            return (
                (r = t.type),
                (l = t.pendingProps),
                (l = t.elementType === r ? l : Je(r, l)),
                xu(e, t, r, l, n)
            );
        case 1:
            return (
                (r = t.type),
                (l = t.pendingProps),
                (l = t.elementType === r ? l : Je(r, l)),
                Ja(e, t, r, l, n)
            );
        case 3:
            e: {
                if ((_d(t), e === null)) throw Error(k(387));
                (r = t.pendingProps),
                    (o = t.memoizedState),
                    (l = o.element),
                    Kf(e, t),
                    fo(t, r, null, n);
                var i = t.memoizedState;
                if (((r = i.element), o.isDehydrated))
                    if (
                        ((o = {
                            element: r,
                            isDehydrated: !1,
                            cache: i.cache,
                            pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
                            transitions: i.transitions,
                        }),
                        (t.updateQueue.baseState = o),
                        (t.memoizedState = o),
                        t.flags & 256)
                    ) {
                        (l = Jn(Error(k(423)), t)), (t = ec(e, t, r, n, l));
                        break e;
                    } else if (r !== l) {
                        (l = Jn(Error(k(424)), t)), (t = ec(e, t, r, n, l));
                        break e;
                    } else
                        for (
                            Ae = $t(t.stateNode.containerInfo.firstChild),
                                Ie = t,
                                V = !0,
                                tt = null,
                                n = Jf(t, null, r, n),
                                t.child = n;
                            n;

                        )
                            (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
                else {
                    if ((Yn(), r === l)) {
                        t = _t(e, t, n);
                        break e;
                    }
                    we(e, t, r, n);
                }
                t = t.child;
            }
            return t;
        case 5:
            return (
                ed(t),
                e === null && wu(t),
                (r = t.type),
                (l = t.pendingProps),
                (o = e !== null ? e.memoizedProps : null),
                (i = l.children),
                vu(r, l) ? (i = null) : o !== null && vu(r, o) && (t.flags |= 32),
                xd(e, t),
                we(e, t, i, n),
                t.child
            );
        case 6:
            return e === null && wu(t), null;
        case 13:
            return Pd(e, t, n);
        case 4:
            return (
                ws(t, t.stateNode.containerInfo),
                (r = t.pendingProps),
                e === null ? (t.child = Xn(t, null, r, n)) : we(e, t, r, n),
                t.child
            );
        case 11:
            return (
                (r = t.type),
                (l = t.pendingProps),
                (l = t.elementType === r ? l : Je(r, l)),
                Xa(e, t, r, l, n)
            );
        case 7:
            return we(e, t, t.pendingProps, n), t.child;
        case 8:
            return we(e, t, t.pendingProps.children, n), t.child;
        case 12:
            return we(e, t, t.pendingProps.children, n), t.child;
        case 10:
            e: {
                if (
                    ((r = t.type._context),
                    (l = t.pendingProps),
                    (o = t.memoizedProps),
                    (i = l.value),
                    W(ao, r._currentValue),
                    (r._currentValue = i),
                    o !== null)
                )
                    if (lt(o.value, i)) {
                        if (o.children === l.children && !_e.current) {
                            t = _t(e, t, n);
                            break e;
                        }
                    } else
                        for (o = t.child, o !== null && (o.return = t); o !== null; ) {
                            var u = o.dependencies;
                            if (u !== null) {
                                i = o.child;
                                for (var s = u.firstContext; s !== null; ) {
                                    if (s.context === r) {
                                        if (o.tag === 1) {
                                            (s = Et(-1, n & -n)), (s.tag = 2);
                                            var a = o.updateQueue;
                                            if (a !== null) {
                                                a = a.shared;
                                                var c = a.pending;
                                                c === null
                                                    ? (s.next = s)
                                                    : ((s.next = c.next), (c.next = s)),
                                                    (a.pending = s);
                                            }
                                        }
                                        (o.lanes |= n),
                                            (s = o.alternate),
                                            s !== null && (s.lanes |= n),
                                            Su(o.return, n, t),
                                            (u.lanes |= n);
                                        break;
                                    }
                                    s = s.next;
                                }
                            } else if (o.tag === 10) i = o.type === t.type ? null : o.child;
                            else if (o.tag === 18) {
                                if (((i = o.return), i === null)) throw Error(k(341));
                                (i.lanes |= n),
                                    (u = i.alternate),
                                    u !== null && (u.lanes |= n),
                                    Su(i, n, t),
                                    (i = o.sibling);
                            } else i = o.child;
                            if (i !== null) i.return = o;
                            else
                                for (i = o; i !== null; ) {
                                    if (i === t) {
                                        i = null;
                                        break;
                                    }
                                    if (((o = i.sibling), o !== null)) {
                                        (o.return = i.return), (i = o);
                                        break;
                                    }
                                    i = i.return;
                                }
                            o = i;
                        }
                we(e, t, l.children, n), (t = t.child);
            }
            return t;
        case 9:
            return (
                (l = t.type),
                (r = t.pendingProps.children),
                $n(t, n),
                (l = Ze(l)),
                (r = r(l)),
                (t.flags |= 1),
                we(e, t, r, n),
                t.child
            );
        case 14:
            return (
                (r = t.type), (l = Je(r, t.pendingProps)), (l = Je(r.type, l)), qa(e, t, r, l, n)
            );
        case 15:
            return Cd(e, t, t.type, t.pendingProps, n);
        case 17:
            return (
                (r = t.type),
                (l = t.pendingProps),
                (l = t.elementType === r ? l : Je(r, l)),
                $l(e, t),
                (t.tag = 1),
                Pe(r) ? ((e = !0), io(t)) : (e = !1),
                $n(t, n),
                Xf(t, r, l),
                Cu(t, r, l, n),
                _u(null, t, r, !0, e, n)
            );
        case 19:
            return Rd(e, t, n);
        case 22:
            return kd(e, t, n);
    }
    throw Error(k(156, t.tag));
};
function Bd(e, t) {
    return hf(e, t);
}
function Y2(e, t, n, r) {
    (this.tag = e),
        (this.key = n),
        (this.sibling =
            this.child =
            this.return =
            this.stateNode =
            this.type =
            this.elementType =
                null),
        (this.index = 0),
        (this.ref = null),
        (this.pendingProps = t),
        (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
        (this.mode = r),
        (this.subtreeFlags = this.flags = 0),
        (this.deletions = null),
        (this.childLanes = this.lanes = 0),
        (this.alternate = null);
}
function Ve(e, t, n, r) {
    return new Y2(e, t, n, r);
}
function As(e) {
    return (e = e.prototype), !(!e || !e.isReactComponent);
}
function X2(e) {
    if (typeof e == 'function') return As(e) ? 1 : 0;
    if (e != null) {
        if (((e = e.$$typeof), e === Ju)) return 11;
        if (e === es) return 14;
    }
    return 2;
}
function Kt(e, t) {
    var n = e.alternate;
    return (
        n === null
            ? ((n = Ve(e.tag, t, e.key, e.mode)),
              (n.elementType = e.elementType),
              (n.type = e.type),
              (n.stateNode = e.stateNode),
              (n.alternate = e),
              (e.alternate = n))
            : ((n.pendingProps = t),
              (n.type = e.type),
              (n.flags = 0),
              (n.subtreeFlags = 0),
              (n.deletions = null)),
        (n.flags = e.flags & 14680064),
        (n.childLanes = e.childLanes),
        (n.lanes = e.lanes),
        (n.child = e.child),
        (n.memoizedProps = e.memoizedProps),
        (n.memoizedState = e.memoizedState),
        (n.updateQueue = e.updateQueue),
        (t = e.dependencies),
        (n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
        (n.sibling = e.sibling),
        (n.index = e.index),
        (n.ref = e.ref),
        n
    );
}
function Gl(e, t, n, r, l, o) {
    var i = 2;
    if (((r = e), typeof e == 'function')) As(e) && (i = 1);
    else if (typeof e == 'string') i = 5;
    else
        e: switch (e) {
            case Nn:
                return dn(n.children, l, o, t);
            case qu:
                (i = 8), (l |= 8);
                break;
            case Zi:
                return (e = Ve(12, n, t, l | 2)), (e.elementType = Zi), (e.lanes = o), e;
            case Qi:
                return (e = Ve(13, n, t, l)), (e.elementType = Qi), (e.lanes = o), e;
            case Gi:
                return (e = Ve(19, n, t, l)), (e.elementType = Gi), (e.lanes = o), e;
            case Xc:
                return Ho(n, l, o, t);
            default:
                if (typeof e == 'object' && e !== null)
                    switch (e.$$typeof) {
                        case Kc:
                            i = 10;
                            break e;
                        case Yc:
                            i = 9;
                            break e;
                        case Ju:
                            i = 11;
                            break e;
                        case es:
                            i = 14;
                            break e;
                        case Tt:
                            (i = 16), (r = null);
                            break e;
                    }
                throw Error(k(130, e == null ? e : typeof e, ''));
        }
    return (t = Ve(i, n, t, l)), (t.elementType = e), (t.type = r), (t.lanes = o), t;
}
function dn(e, t, n, r) {
    return (e = Ve(7, e, r, t)), (e.lanes = n), e;
}
function Ho(e, t, n, r) {
    return (
        (e = Ve(22, e, r, t)),
        (e.elementType = Xc),
        (e.lanes = n),
        (e.stateNode = { isHidden: !1 }),
        e
    );
}
function Ii(e, t, n) {
    return (e = Ve(6, e, null, t)), (e.lanes = n), e;
}
function zi(e, t, n) {
    return (
        (t = Ve(4, e.children !== null ? e.children : [], e.key, t)),
        (t.lanes = n),
        (t.stateNode = {
            containerInfo: e.containerInfo,
            pendingChildren: null,
            implementation: e.implementation,
        }),
        t
    );
}
function q2(e, t, n, r, l) {
    (this.tag = t),
        (this.containerInfo = e),
        (this.finishedWork = this.pingCache = this.current = this.pendingChildren = null),
        (this.timeoutHandle = -1),
        (this.callbackNode = this.pendingContext = this.context = null),
        (this.callbackPriority = 0),
        (this.eventTimes = mi(0)),
        (this.expirationTimes = mi(-1)),
        (this.entangledLanes =
            this.finishedLanes =
            this.mutableReadLanes =
            this.expiredLanes =
            this.pingedLanes =
            this.suspendedLanes =
            this.pendingLanes =
                0),
        (this.entanglements = mi(0)),
        (this.identifierPrefix = r),
        (this.onRecoverableError = l),
        (this.mutableSourceEagerHydrationData = null);
}
function Is(e, t, n, r, l, o, i, u, s) {
    return (
        (e = new q2(e, t, n, u, s)),
        t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
        (o = Ve(3, null, null, t)),
        (e.current = o),
        (o.stateNode = e),
        (o.memoizedState = {
            element: r,
            isDehydrated: n,
            cache: null,
            transitions: null,
            pendingSuspenseBoundaries: null,
        }),
        ys(o),
        e
    );
}
function J2(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
        $$typeof: Mn,
        key: r == null ? null : '' + r,
        children: e,
        containerInfo: t,
        implementation: n,
    };
}
function Vd(e) {
    if (!e) return Xt;
    e = e._reactInternals;
    e: {
        if (Sn(e) !== e || e.tag !== 1) throw Error(k(170));
        var t = e;
        do {
            switch (t.tag) {
                case 3:
                    t = t.stateNode.context;
                    break e;
                case 1:
                    if (Pe(t.type)) {
                        t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                        break e;
                    }
            }
            t = t.return;
        } while (t !== null);
        throw Error(k(171));
    }
    if (e.tag === 1) {
        var n = e.type;
        if (Pe(n)) return Bf(e, n, t);
    }
    return t;
}
function $d(e, t, n, r, l, o, i, u, s) {
    return (
        (e = Is(n, r, !0, e, l, o, i, u, s)),
        (e.context = Vd(null)),
        (n = e.current),
        (r = Se()),
        (l = Gt(n)),
        (o = Et(r, l)),
        (o.callback = t ?? null),
        Zt(n, o, l),
        (e.current.lanes = l),
        il(e, l, r),
        Re(e, r),
        e
    );
}
function Bo(e, t, n, r) {
    var l = t.current,
        o = Se(),
        i = Gt(l);
    return (
        (n = Vd(n)),
        t.context === null ? (t.context = n) : (t.pendingContext = n),
        (t = Et(o, i)),
        (t.payload = { element: e }),
        (r = r === void 0 ? null : r),
        r !== null && (t.callback = r),
        (e = Zt(l, t, i)),
        e !== null && (rt(e, l, i, o), Hl(e, l, i)),
        i
    );
}
function So(e) {
    if (((e = e.current), !e.child)) return null;
    switch (e.child.tag) {
        case 5:
            return e.child.stateNode;
        default:
            return e.child.stateNode;
    }
}
function cc(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t;
    }
}
function zs(e, t) {
    cc(e, t), (e = e.alternate) && cc(e, t);
}
function ep() {
    return null;
}
var Zd =
    typeof reportError == 'function'
        ? reportError
        : function (e) {
              console.error(e);
          };
function js(e) {
    this._internalRoot = e;
}
Vo.prototype.render = js.prototype.render = function (e) {
    var t = this._internalRoot;
    if (t === null) throw Error(k(409));
    Bo(e, t, null, null);
};
Vo.prototype.unmount = js.prototype.unmount = function () {
    var e = this._internalRoot;
    if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        yn(function () {
            Bo(null, e, null, null);
        }),
            (t[kt] = null);
    }
};
function Vo(e) {
    this._internalRoot = e;
}
Vo.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
        var t = Cf();
        e = { blockedOn: null, target: e, priority: t };
        for (var n = 0; n < jt.length && t !== 0 && t < jt[n].priority; n++);
        jt.splice(n, 0, e), n === 0 && xf(e);
    }
};
function Fs(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function $o(e) {
    return !(
        !e ||
        (e.nodeType !== 1 &&
            e.nodeType !== 9 &&
            e.nodeType !== 11 &&
            (e.nodeType !== 8 || e.nodeValue !== ' react-mount-point-unstable '))
    );
}
function fc() {}
function tp(e, t, n, r, l) {
    if (l) {
        if (typeof r == 'function') {
            var o = r;
            r = function () {
                var a = So(i);
                o.call(a);
            };
        }
        var i = $d(t, r, e, 0, null, !1, !1, '', fc);
        return (
            (e._reactRootContainer = i),
            (e[kt] = i.current),
            Zr(e.nodeType === 8 ? e.parentNode : e),
            yn(),
            i
        );
    }
    for (; (l = e.lastChild); ) e.removeChild(l);
    if (typeof r == 'function') {
        var u = r;
        r = function () {
            var a = So(s);
            u.call(a);
        };
    }
    var s = Is(e, 0, !1, null, null, !1, !1, '', fc);
    return (
        (e._reactRootContainer = s),
        (e[kt] = s.current),
        Zr(e.nodeType === 8 ? e.parentNode : e),
        yn(function () {
            Bo(t, s, n, r);
        }),
        s
    );
}
function Zo(e, t, n, r, l) {
    var o = n._reactRootContainer;
    if (o) {
        var i = o;
        if (typeof l == 'function') {
            var u = l;
            l = function () {
                var s = So(i);
                u.call(s);
            };
        }
        Bo(t, i, e, l);
    } else i = tp(n, t, e, l, r);
    return So(i);
}
Sf = function (e) {
    switch (e.tag) {
        case 3:
            var t = e.stateNode;
            if (t.current.memoizedState.isDehydrated) {
                var n = kr(t.pendingLanes);
                n !== 0 && (rs(t, n | 1), Re(t, X()), !(z & 6) && ((er = X() + 500), tn()));
            }
            break;
        case 13:
            yn(function () {
                var r = xt(e, 1);
                if (r !== null) {
                    var l = Se();
                    rt(r, e, 1, l);
                }
            }),
                zs(e, 1);
    }
};
ls = function (e) {
    if (e.tag === 13) {
        var t = xt(e, 134217728);
        if (t !== null) {
            var n = Se();
            rt(t, e, 134217728, n);
        }
        zs(e, 134217728);
    }
};
Ef = function (e) {
    if (e.tag === 13) {
        var t = Gt(e),
            n = xt(e, t);
        if (n !== null) {
            var r = Se();
            rt(n, e, t, r);
        }
        zs(e, t);
    }
};
Cf = function () {
    return j;
};
kf = function (e, t) {
    var n = j;
    try {
        return (j = e), t();
    } finally {
        j = n;
    }
};
lu = function (e, t, n) {
    switch (t) {
        case 'input':
            if ((Xi(e, n), (t = n.name), n.type === 'radio' && t != null)) {
                for (n = e; n.parentNode; ) n = n.parentNode;
                for (
                    n = n.querySelectorAll(
                        'input[name=' + JSON.stringify('' + t) + '][type="radio"]',
                    ),
                        t = 0;
                    t < n.length;
                    t++
                ) {
                    var r = n[t];
                    if (r !== e && r.form === e.form) {
                        var l = zo(r);
                        if (!l) throw Error(k(90));
                        Jc(r), Xi(r, l);
                    }
                }
            }
            break;
        case 'textarea':
            tf(e, n);
            break;
        case 'select':
            (t = n.value), t != null && bn(e, !!n.multiple, t, !1);
    }
};
af = Os;
cf = yn;
var np = { usingClientEntryPoint: !1, Events: [sl, Tn, zo, uf, sf, Os] },
    Sr = {
        findFiberByHostInstance: sn,
        bundleType: 0,
        version: '18.2.0',
        rendererPackageName: 'react-dom',
    },
    rp = {
        bundleType: Sr.bundleType,
        version: Sr.version,
        rendererPackageName: Sr.rendererPackageName,
        rendererConfig: Sr.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: Rt.ReactCurrentDispatcher,
        findHostInstanceByFiber: function (e) {
            return (e = pf(e)), e === null ? null : e.stateNode;
        },
        findFiberByHostInstance: Sr.findFiberByHostInstance || ep,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: '18.2.0-next-9e3b772b8-20220608',
    };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var Il = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Il.isDisabled && Il.supportsFiber)
        try {
            (Do = Il.inject(rp)), (dt = Il);
        } catch {}
}
je.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = np;
je.createPortal = function (e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Fs(t)) throw Error(k(200));
    return J2(e, t, null, n);
};
je.createRoot = function (e, t) {
    if (!Fs(e)) throw Error(k(299));
    var n = !1,
        r = '',
        l = Zd;
    return (
        t != null &&
            (t.unstable_strictMode === !0 && (n = !0),
            t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
            t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
        (t = Is(e, 1, !1, null, null, n, !1, r, l)),
        (e[kt] = t.current),
        Zr(e.nodeType === 8 ? e.parentNode : e),
        new js(t)
    );
};
je.findDOMNode = function (e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
        throw typeof e.render == 'function'
            ? Error(k(188))
            : ((e = Object.keys(e).join(',')), Error(k(268, e)));
    return (e = pf(t)), (e = e === null ? null : e.stateNode), e;
};
je.flushSync = function (e) {
    return yn(e);
};
je.hydrate = function (e, t, n) {
    if (!$o(t)) throw Error(k(200));
    return Zo(null, e, t, !0, n);
};
je.hydrateRoot = function (e, t, n) {
    if (!Fs(e)) throw Error(k(405));
    var r = (n != null && n.hydratedSources) || null,
        l = !1,
        o = '',
        i = Zd;
    if (
        (n != null &&
            (n.unstable_strictMode === !0 && (l = !0),
            n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
            n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
        (t = $d(t, null, e, 1, n ?? null, l, !1, o, i)),
        (e[kt] = t.current),
        Zr(e),
        r)
    )
        for (e = 0; e < r.length; e++)
            (n = r[e]),
                (l = n._getVersion),
                (l = l(n._source)),
                t.mutableSourceEagerHydrationData == null
                    ? (t.mutableSourceEagerHydrationData = [n, l])
                    : t.mutableSourceEagerHydrationData.push(n, l);
    return new Vo(t);
};
je.render = function (e, t, n) {
    if (!$o(t)) throw Error(k(200));
    return Zo(null, e, t, !1, n);
};
je.unmountComponentAtNode = function (e) {
    if (!$o(e)) throw Error(k(40));
    return e._reactRootContainer
        ? (yn(function () {
              Zo(null, null, e, !1, function () {
                  (e._reactRootContainer = null), (e[kt] = null);
              });
          }),
          !0)
        : !1;
};
je.unstable_batchedUpdates = Os;
je.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
    if (!$o(n)) throw Error(k(200));
    if (e == null || e._reactInternals === void 0) throw Error(k(38));
    return Zo(e, t, n, !1, r);
};
je.version = '18.2.0-next-9e3b772b8-20220608';
function Qd() {
    if (
        !(
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
        )
    )
        try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Qd);
        } catch (e) {
            console.error(e);
        }
}
Qd(), (Vc.exports = je);
var Ut = Vc.exports,
    dc = Ut;
(Vi.createRoot = dc.createRoot), (Vi.hydrateRoot = dc.hydrateRoot);
const lp =
        "data:image/svg+xml,%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20180%20180'%20style='enable-background:new%200%200%20180%20180;'%20xml:space='preserve'%3e%3cdefs%3e%3cstyle%3e%20.clsR-1{fill:%234185BF;}.clsR-2,.clsR-3{fill:%23fff;}.clsR-2,.clsR-4{opacity:0.2;}.clsR-3{opacity:0.3;}.clsR-5{fill:%231a1a1a;}.clsR-6{fill:none;}%3c/style%3e%3c/defs%3e%3ctitle%3er%3c/title%3e%3cpath%20class='clsR-1'%20d='M90,30.87a92.56,92.56,0,0,0-10.56.85l-1.45.2-.25,1.44L74.87,50.28H70L64.84,35.53l-.47-1.34H63a31.07,31.07,0,0,0-14.88,3.72l-1.15.62.1,1.31L48.68,60v.1c1,7.21,4.68,11.7,11.93,14.38-1,8.58-5.74,48.89-6.95,58.44-14.51,3.42-14.49,12.94-14.46,23.92v3.62H140.78v-3.62c0-11,.06-20.5-14.46-23.92-1.2-9.55-5.94-49.86-6.95-58.44,7.26-2.68,11-7.17,11.94-14.38V60L133,39.84l.11-1.31-1.15-.62A31.08,31.08,0,0,0,117,34.19h-1.41l-.47,1.34L110,50.28h-4.85l-2.87-16.92L102,31.92l-1.45-.2A92.56,92.56,0,0,0,90,30.87Z'/%3e%3cpath%20class='clsR-2'%20d='M90,138.41c43.07,0,47.54,4.75,47.54,4.75h.59c-1.93-10.18-24.49-11.3-24.49-11.3H66.53s-23.36.81-24.66,11.3h.59S46.93,138.41,90,138.41Z'/%3e%3cpath%20class='clsR-3'%20d='M60,34.43c-10.75,7.36-6.7,34.9-6.7,34.9-6.85-2.21-6.7-31.73-6.7-31.73S63.08,32.34,60,34.43Z'/%3e%3cpath%20class='clsR-3'%20d='M93.18,32.26c-12,2.19-16.62,19.64-16.62,19.64.8-13,3.52-20.54,3.52-20.54S96.59,31.63,93.18,32.26Z'/%3e%3cpath%20class='clsR-3'%20d='M125.15,35.88c-7.77,4.11-13.75,16-13.75,16-.44-4.24,5.47-19,5.47-19S128.05,34.35,125.15,35.88Z'/%3e%3cpath%20class='clsR-4'%20d='M123.87,72.17c10.62.24,8.73-32.78,8.73-32.78l-6.36-4c-1.76,10.55-4,26.9-9.16,31.43-4.71,4.15-7.59,5.12-8.31,5.3-1.37-.17-2.83-.33-4.43-.47-14.5-1.32-35.6,2.82-35.6,2.82s21.37-1.3,32.3,12.42,12,43.37,12,43.37c7.16,1.33,12.49,2.8,12.49,2.8l-6.73-57.46S122.46,72.14,123.87,72.17Z'/%3e%3cpath%20class='clsR-5'%20d='M140.65,140.76c-2.2-4.67-6.21-7.71-12.51-9.45-1.35-10.88-5.36-45-6.6-55.54,7.06-3,10.73-7.87,11.75-15.41v-.21L135,40l.21-2.61-2.3-1.24a33.05,33.05,0,0,0-15.84-4h-3.19l-.71,3.12-2.93,13H105l-1.74-15-.35-3-3-.49A72.25,72.25,0,0,0,90,28.87a72.06,72.06,0,0,0-9.94.88l-3,.49-.35,3L75,48.28h-5.2l-2.93-13-.71-3.12H63a33,33,0,0,0-15.83,4l-2.3,1.24L45,40l1.66,20.15v.21c1,7.54,4.68,12.39,11.75,15.41-1.24,10.54-5.26,44.66-6.6,55.54-6.31,1.74-10.32,4.78-12.51,9.45s-2.15,9.91-2.14,16.07v5.62H142.78v-5.62C142.8,150.68,142.81,145.36,140.65,140.76Zm-90-80.94L49,39.67A28.93,28.93,0,0,1,63,36.19L66.6,52.28h12L80.71,33.7A67.28,67.28,0,0,1,90,32.87a67.28,67.28,0,0,1,9.29.83l2.15,18.58h12L117,36.19A29,29,0,0,1,131,39.67l-1.66,20.15c-.77,5.74-3.29,10-10.52,12.73A234.34,234.34,0,0,0,90,70a234.67,234.67,0,0,0-28.8,2.54C54,69.84,51.45,65.56,50.67,59.82Zm11.74,16.6A231,231,0,0,1,90,74a230.47,230.47,0,0,1,27.59,2.41c1.21,10.31,4.93,41.88,6.41,54-.69-.12-1.4-.23-2.14-.32A254,254,0,0,0,90,128.41a254,254,0,0,0-31.86,1.69c-.75.09-1.45.2-2.14.32C57.48,118.3,61.2,86.73,62.41,76.42Zm76.37,82H41.22c0-11.85-.67-20.31,12.69-23.53l.34-.09,1-.21c1-.22,2.16-.4,3.37-.56A252.6,252.6,0,0,1,90,132.41a252.6,252.6,0,0,1,31.36,1.65c1.18.15,2.28.34,3.31.54l1.1.24.23,0C139.45,138.1,138.78,146.58,138.78,158.45Z'/%3e%3crect%20class='clsR-6'%20width='180'%20height='180'/%3e%3c/svg%3e",
    op =
        "data:image/svg+xml,%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20180%20180'%20style='enable-background:new%200%200%20180%20180;'%20xml:space='preserve'%3e%3cdefs%3e%3cstyle%3e%20.clsR-1{fill:%234E9161;}.clsR-2,.clsR-3{fill:%23fff;}.clsR-2,.clsR-4{opacity:0.2;}.clsR-3{opacity:0.3;}.clsR-5{fill:%231a1a1a;}.clsR-6{fill:none;}%3c/style%3e%3c/defs%3e%3ctitle%3er%3c/title%3e%3cpath%20class='clsR-1'%20d='M90,30.87a92.56,92.56,0,0,0-10.56.85l-1.45.2-.25,1.44L74.87,50.28H70L64.84,35.53l-.47-1.34H63a31.07,31.07,0,0,0-14.88,3.72l-1.15.62.1,1.31L48.68,60v.1c1,7.21,4.68,11.7,11.93,14.38-1,8.58-5.74,48.89-6.95,58.44-14.51,3.42-14.49,12.94-14.46,23.92v3.62H140.78v-3.62c0-11,.06-20.5-14.46-23.92-1.2-9.55-5.94-49.86-6.95-58.44,7.26-2.68,11-7.17,11.94-14.38V60L133,39.84l.11-1.31-1.15-.62A31.08,31.08,0,0,0,117,34.19h-1.41l-.47,1.34L110,50.28h-4.85l-2.87-16.92L102,31.92l-1.45-.2A92.56,92.56,0,0,0,90,30.87Z'/%3e%3cpath%20class='clsR-2'%20d='M90,138.41c43.07,0,47.54,4.75,47.54,4.75h.59c-1.93-10.18-24.49-11.3-24.49-11.3H66.53s-23.36.81-24.66,11.3h.59S46.93,138.41,90,138.41Z'/%3e%3cpath%20class='clsR-3'%20d='M60,34.43c-10.75,7.36-6.7,34.9-6.7,34.9-6.85-2.21-6.7-31.73-6.7-31.73S63.08,32.34,60,34.43Z'/%3e%3cpath%20class='clsR-3'%20d='M93.18,32.26c-12,2.19-16.62,19.64-16.62,19.64.8-13,3.52-20.54,3.52-20.54S96.59,31.63,93.18,32.26Z'/%3e%3cpath%20class='clsR-3'%20d='M125.15,35.88c-7.77,4.11-13.75,16-13.75,16-.44-4.24,5.47-19,5.47-19S128.05,34.35,125.15,35.88Z'/%3e%3cpath%20class='clsR-4'%20d='M123.87,72.17c10.62.24,8.73-32.78,8.73-32.78l-6.36-4c-1.76,10.55-4,26.9-9.16,31.43-4.71,4.15-7.59,5.12-8.31,5.3-1.37-.17-2.83-.33-4.43-.47-14.5-1.32-35.6,2.82-35.6,2.82s21.37-1.3,32.3,12.42,12,43.37,12,43.37c7.16,1.33,12.49,2.8,12.49,2.8l-6.73-57.46S122.46,72.14,123.87,72.17Z'/%3e%3cpath%20class='clsR-5'%20d='M140.65,140.76c-2.2-4.67-6.21-7.71-12.51-9.45-1.35-10.88-5.36-45-6.6-55.54,7.06-3,10.73-7.87,11.75-15.41v-.21L135,40l.21-2.61-2.3-1.24a33.05,33.05,0,0,0-15.84-4h-3.19l-.71,3.12-2.93,13H105l-1.74-15-.35-3-3-.49A72.25,72.25,0,0,0,90,28.87a72.06,72.06,0,0,0-9.94.88l-3,.49-.35,3L75,48.28h-5.2l-2.93-13-.71-3.12H63a33,33,0,0,0-15.83,4l-2.3,1.24L45,40l1.66,20.15v.21c1,7.54,4.68,12.39,11.75,15.41-1.24,10.54-5.26,44.66-6.6,55.54-6.31,1.74-10.32,4.78-12.51,9.45s-2.15,9.91-2.14,16.07v5.62H142.78v-5.62C142.8,150.68,142.81,145.36,140.65,140.76Zm-90-80.94L49,39.67A28.93,28.93,0,0,1,63,36.19L66.6,52.28h12L80.71,33.7A67.28,67.28,0,0,1,90,32.87a67.28,67.28,0,0,1,9.29.83l2.15,18.58h12L117,36.19A29,29,0,0,1,131,39.67l-1.66,20.15c-.77,5.74-3.29,10-10.52,12.73A234.34,234.34,0,0,0,90,70a234.67,234.67,0,0,0-28.8,2.54C54,69.84,51.45,65.56,50.67,59.82Zm11.74,16.6A231,231,0,0,1,90,74a230.47,230.47,0,0,1,27.59,2.41c1.21,10.31,4.93,41.88,6.41,54-.69-.12-1.4-.23-2.14-.32A254,254,0,0,0,90,128.41a254,254,0,0,0-31.86,1.69c-.75.09-1.45.2-2.14.32C57.48,118.3,61.2,86.73,62.41,76.42Zm76.37,82H41.22c0-11.85-.67-20.31,12.69-23.53l.34-.09,1-.21c1-.22,2.16-.4,3.37-.56A252.6,252.6,0,0,1,90,132.41a252.6,252.6,0,0,1,31.36,1.65c1.18.15,2.28.34,3.31.54l1.1.24.23,0C139.45,138.1,138.78,146.58,138.78,158.45Z'/%3e%3crect%20class='clsR-6'%20width='180'%20height='180'/%3e%3c/svg%3e",
    ip =
        "data:image/svg+xml,%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20180%20180'%20style='enable-background:new%200%200%20180%20180;'%20xml:space='preserve'%3e%3cdefs%3e%3cstyle%3e%20.clsR-1{fill:%23BF3B43;}.clsR-2,.clsR-3{fill:%23fff;}.clsR-2,.clsR-4{opacity:0.2;}.clsR-3{opacity:0.3;}.clsR-5{fill:%231a1a1a;}.clsR-6{fill:none;}%3c/style%3e%3c/defs%3e%3ctitle%3er%3c/title%3e%3cpath%20class='clsR-1'%20d='M90,30.87a92.56,92.56,0,0,0-10.56.85l-1.45.2-.25,1.44L74.87,50.28H70L64.84,35.53l-.47-1.34H63a31.07,31.07,0,0,0-14.88,3.72l-1.15.62.1,1.31L48.68,60v.1c1,7.21,4.68,11.7,11.93,14.38-1,8.58-5.74,48.89-6.95,58.44-14.51,3.42-14.49,12.94-14.46,23.92v3.62H140.78v-3.62c0-11,.06-20.5-14.46-23.92-1.2-9.55-5.94-49.86-6.95-58.44,7.26-2.68,11-7.17,11.94-14.38V60L133,39.84l.11-1.31-1.15-.62A31.08,31.08,0,0,0,117,34.19h-1.41l-.47,1.34L110,50.28h-4.85l-2.87-16.92L102,31.92l-1.45-.2A92.56,92.56,0,0,0,90,30.87Z'/%3e%3cpath%20class='clsR-2'%20d='M90,138.41c43.07,0,47.54,4.75,47.54,4.75h.59c-1.93-10.18-24.49-11.3-24.49-11.3H66.53s-23.36.81-24.66,11.3h.59S46.93,138.41,90,138.41Z'/%3e%3cpath%20class='clsR-3'%20d='M60,34.43c-10.75,7.36-6.7,34.9-6.7,34.9-6.85-2.21-6.7-31.73-6.7-31.73S63.08,32.34,60,34.43Z'/%3e%3cpath%20class='clsR-3'%20d='M93.18,32.26c-12,2.19-16.62,19.64-16.62,19.64.8-13,3.52-20.54,3.52-20.54S96.59,31.63,93.18,32.26Z'/%3e%3cpath%20class='clsR-3'%20d='M125.15,35.88c-7.77,4.11-13.75,16-13.75,16-.44-4.24,5.47-19,5.47-19S128.05,34.35,125.15,35.88Z'/%3e%3cpath%20class='clsR-4'%20d='M123.87,72.17c10.62.24,8.73-32.78,8.73-32.78l-6.36-4c-1.76,10.55-4,26.9-9.16,31.43-4.71,4.15-7.59,5.12-8.31,5.3-1.37-.17-2.83-.33-4.43-.47-14.5-1.32-35.6,2.82-35.6,2.82s21.37-1.3,32.3,12.42,12,43.37,12,43.37c7.16,1.33,12.49,2.8,12.49,2.8l-6.73-57.46S122.46,72.14,123.87,72.17Z'/%3e%3cpath%20class='clsR-5'%20d='M140.65,140.76c-2.2-4.67-6.21-7.71-12.51-9.45-1.35-10.88-5.36-45-6.6-55.54,7.06-3,10.73-7.87,11.75-15.41v-.21L135,40l.21-2.61-2.3-1.24a33.05,33.05,0,0,0-15.84-4h-3.19l-.71,3.12-2.93,13H105l-1.74-15-.35-3-3-.49A72.25,72.25,0,0,0,90,28.87a72.06,72.06,0,0,0-9.94.88l-3,.49-.35,3L75,48.28h-5.2l-2.93-13-.71-3.12H63a33,33,0,0,0-15.83,4l-2.3,1.24L45,40l1.66,20.15v.21c1,7.54,4.68,12.39,11.75,15.41-1.24,10.54-5.26,44.66-6.6,55.54-6.31,1.74-10.32,4.78-12.51,9.45s-2.15,9.91-2.14,16.07v5.62H142.78v-5.62C142.8,150.68,142.81,145.36,140.65,140.76Zm-90-80.94L49,39.67A28.93,28.93,0,0,1,63,36.19L66.6,52.28h12L80.71,33.7A67.28,67.28,0,0,1,90,32.87a67.28,67.28,0,0,1,9.29.83l2.15,18.58h12L117,36.19A29,29,0,0,1,131,39.67l-1.66,20.15c-.77,5.74-3.29,10-10.52,12.73A234.34,234.34,0,0,0,90,70a234.67,234.67,0,0,0-28.8,2.54C54,69.84,51.45,65.56,50.67,59.82Zm11.74,16.6A231,231,0,0,1,90,74a230.47,230.47,0,0,1,27.59,2.41c1.21,10.31,4.93,41.88,6.41,54-.69-.12-1.4-.23-2.14-.32A254,254,0,0,0,90,128.41a254,254,0,0,0-31.86,1.69c-.75.09-1.45.2-2.14.32C57.48,118.3,61.2,86.73,62.41,76.42Zm76.37,82H41.22c0-11.85-.67-20.31,12.69-23.53l.34-.09,1-.21c1-.22,2.16-.4,3.37-.56A252.6,252.6,0,0,1,90,132.41a252.6,252.6,0,0,1,31.36,1.65c1.18.15,2.28.34,3.31.54l1.1.24.23,0C139.45,138.1,138.78,146.58,138.78,158.45Z'/%3e%3crect%20class='clsR-6'%20width='180'%20height='180'/%3e%3c/svg%3e",
    up =
        "data:image/svg+xml,%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20180%20180'%20style='enable-background:new%200%200%20180%20180;'%20xml:space='preserve'%3e%3cdefs%3e%3cstyle%3e%20.clsR-1{fill:%23C09526;}.clsR-2,.clsR-3{fill:%23fff;}.clsR-2,.clsR-4{opacity:0.2;}.clsR-3{opacity:0.3;}.clsR-5{fill:%231a1a1a;}.clsR-6{fill:none;}%3c/style%3e%3c/defs%3e%3ctitle%3er%3c/title%3e%3cpath%20class='clsR-1'%20d='M90,30.87a92.56,92.56,0,0,0-10.56.85l-1.45.2-.25,1.44L74.87,50.28H70L64.84,35.53l-.47-1.34H63a31.07,31.07,0,0,0-14.88,3.72l-1.15.62.1,1.31L48.68,60v.1c1,7.21,4.68,11.7,11.93,14.38-1,8.58-5.74,48.89-6.95,58.44-14.51,3.42-14.49,12.94-14.46,23.92v3.62H140.78v-3.62c0-11,.06-20.5-14.46-23.92-1.2-9.55-5.94-49.86-6.95-58.44,7.26-2.68,11-7.17,11.94-14.38V60L133,39.84l.11-1.31-1.15-.62A31.08,31.08,0,0,0,117,34.19h-1.41l-.47,1.34L110,50.28h-4.85l-2.87-16.92L102,31.92l-1.45-.2A92.56,92.56,0,0,0,90,30.87Z'/%3e%3cpath%20class='clsR-2'%20d='M90,138.41c43.07,0,47.54,4.75,47.54,4.75h.59c-1.93-10.18-24.49-11.3-24.49-11.3H66.53s-23.36.81-24.66,11.3h.59S46.93,138.41,90,138.41Z'/%3e%3cpath%20class='clsR-3'%20d='M60,34.43c-10.75,7.36-6.7,34.9-6.7,34.9-6.85-2.21-6.7-31.73-6.7-31.73S63.08,32.34,60,34.43Z'/%3e%3cpath%20class='clsR-3'%20d='M93.18,32.26c-12,2.19-16.62,19.64-16.62,19.64.8-13,3.52-20.54,3.52-20.54S96.59,31.63,93.18,32.26Z'/%3e%3cpath%20class='clsR-3'%20d='M125.15,35.88c-7.77,4.11-13.75,16-13.75,16-.44-4.24,5.47-19,5.47-19S128.05,34.35,125.15,35.88Z'/%3e%3cpath%20class='clsR-4'%20d='M123.87,72.17c10.62.24,8.73-32.78,8.73-32.78l-6.36-4c-1.76,10.55-4,26.9-9.16,31.43-4.71,4.15-7.59,5.12-8.31,5.3-1.37-.17-2.83-.33-4.43-.47-14.5-1.32-35.6,2.82-35.6,2.82s21.37-1.3,32.3,12.42,12,43.37,12,43.37c7.16,1.33,12.49,2.8,12.49,2.8l-6.73-57.46S122.46,72.14,123.87,72.17Z'/%3e%3cpath%20class='clsR-5'%20d='M140.65,140.76c-2.2-4.67-6.21-7.71-12.51-9.45-1.35-10.88-5.36-45-6.6-55.54,7.06-3,10.73-7.87,11.75-15.41v-.21L135,40l.21-2.61-2.3-1.24a33.05,33.05,0,0,0-15.84-4h-3.19l-.71,3.12-2.93,13H105l-1.74-15-.35-3-3-.49A72.25,72.25,0,0,0,90,28.87a72.06,72.06,0,0,0-9.94.88l-3,.49-.35,3L75,48.28h-5.2l-2.93-13-.71-3.12H63a33,33,0,0,0-15.83,4l-2.3,1.24L45,40l1.66,20.15v.21c1,7.54,4.68,12.39,11.75,15.41-1.24,10.54-5.26,44.66-6.6,55.54-6.31,1.74-10.32,4.78-12.51,9.45s-2.15,9.91-2.14,16.07v5.62H142.78v-5.62C142.8,150.68,142.81,145.36,140.65,140.76Zm-90-80.94L49,39.67A28.93,28.93,0,0,1,63,36.19L66.6,52.28h12L80.71,33.7A67.28,67.28,0,0,1,90,32.87a67.28,67.28,0,0,1,9.29.83l2.15,18.58h12L117,36.19A29,29,0,0,1,131,39.67l-1.66,20.15c-.77,5.74-3.29,10-10.52,12.73A234.34,234.34,0,0,0,90,70a234.67,234.67,0,0,0-28.8,2.54C54,69.84,51.45,65.56,50.67,59.82Zm11.74,16.6A231,231,0,0,1,90,74a230.47,230.47,0,0,1,27.59,2.41c1.21,10.31,4.93,41.88,6.41,54-.69-.12-1.4-.23-2.14-.32A254,254,0,0,0,90,128.41a254,254,0,0,0-31.86,1.69c-.75.09-1.45.2-2.14.32C57.48,118.3,61.2,86.73,62.41,76.42Zm76.37,82H41.22c0-11.85-.67-20.31,12.69-23.53l.34-.09,1-.21c1-.22,2.16-.4,3.37-.56A252.6,252.6,0,0,1,90,132.41a252.6,252.6,0,0,1,31.36,1.65c1.18.15,2.28.34,3.31.54l1.1.24.23,0C139.45,138.1,138.78,146.58,138.78,158.45Z'/%3e%3crect%20class='clsR-6'%20width='180'%20height='180'/%3e%3c/svg%3e",
    sp =
        "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20version='1.1'%20id='Layer_1'%20x='0px'%20y='0px'%20viewBox='0%200%20180%20180'%20style='enable-background:new%200%200%20180%20180;'%20xml:space='preserve'%3e%3cdefs%20fill='%23000000'%3e%3cstyle%3e%20.clsR-1{fill:%23234663;}.clsR-2,.clsR-3{fill:%23fff;}.clsR-2,.clsR-4{opacity:0.2;}.clsR-3{opacity:0.3;}.clsR-5{fill:%231a1a1a;}.clsR-6{fill:none;}%3c/style%3e%3c/defs%3e%3ctitle%3er%3c/title%3e%3cpath%20class='clsR-1'%20d='M90,30.87a92.56,92.56,0,0,0-10.56.85l-1.45.2-.25,1.44L74.87,50.28H70L64.84,35.53l-.47-1.34H63a31.07,31.07,0,0,0-14.88,3.72l-1.15.62.1,1.31L48.68,60v.1c1,7.21,4.68,11.7,11.93,14.38-1,8.58-5.74,48.89-6.95,58.44-14.51,3.42-14.49,12.94-14.46,23.92v3.62H140.78v-3.62c0-11,.06-20.5-14.46-23.92-1.2-9.55-5.94-49.86-6.95-58.44,7.26-2.68,11-7.17,11.94-14.38V60L133,39.84l.11-1.31-1.15-.62A31.08,31.08,0,0,0,117,34.19h-1.41l-.47,1.34L110,50.28h-4.85l-2.87-16.92L102,31.92l-1.45-.2A92.56,92.56,0,0,0,90,30.87Z'%20fill='%23000000'/%3e%3cpath%20class='clsR-2'%20d='M90,138.41c43.07,0,47.54,4.75,47.54,4.75h.59c-1.93-10.18-24.49-11.3-24.49-11.3H66.53s-23.36.81-24.66,11.3h.59S46.93,138.41,90,138.41Z'%20fill='%23000000'/%3e%3cpath%20class='clsR-3'%20d='M60,34.43c-10.75,7.36-6.7,34.9-6.7,34.9-6.85-2.21-6.7-31.73-6.7-31.73S63.08,32.34,60,34.43Z'%20fill='%23000000'/%3e%3cpath%20class='clsR-3'%20d='M93.18,32.26c-12,2.19-16.62,19.64-16.62,19.64.8-13,3.52-20.54,3.52-20.54S96.59,31.63,93.18,32.26Z'%20fill='%23000000'/%3e%3cpath%20class='clsR-3'%20d='M125.15,35.88c-7.77,4.11-13.75,16-13.75,16-.44-4.24,5.47-19,5.47-19S128.05,34.35,125.15,35.88Z'%20fill='%23000000'/%3e%3cpath%20class='clsR-4'%20d='M123.87,72.17c10.62.24,8.73-32.78,8.73-32.78l-6.36-4c-1.76,10.55-4,26.9-9.16,31.43-4.71,4.15-7.59,5.12-8.31,5.3-1.37-.17-2.83-.33-4.43-.47-14.5-1.32-35.6,2.82-35.6,2.82s21.37-1.3,32.3,12.42,12,43.37,12,43.37c7.16,1.33,12.49,2.8,12.49,2.8l-6.73-57.46S122.46,72.14,123.87,72.17Z'%20fill='%23000000'/%3e%3cpath%20class='clsR-5'%20d='M140.65,140.76c-2.2-4.67-6.21-7.71-12.51-9.45-1.35-10.88-5.36-45-6.6-55.54,7.06-3,10.73-7.87,11.75-15.41v-.21L135,40l.21-2.61-2.3-1.24a33.05,33.05,0,0,0-15.84-4h-3.19l-.71,3.12-2.93,13H105l-1.74-15-.35-3-3-.49A72.25,72.25,0,0,0,90,28.87a72.06,72.06,0,0,0-9.94.88l-3,.49-.35,3L75,48.28h-5.2l-2.93-13-.71-3.12H63a33,33,0,0,0-15.83,4l-2.3,1.24L45,40l1.66,20.15v.21c1,7.54,4.68,12.39,11.75,15.41-1.24,10.54-5.26,44.66-6.6,55.54-6.31,1.74-10.32,4.78-12.51,9.45s-2.15,9.91-2.14,16.07v5.62H142.78v-5.62C142.8,150.68,142.81,145.36,140.65,140.76Zm-90-80.94L49,39.67A28.93,28.93,0,0,1,63,36.19L66.6,52.28h12L80.71,33.7A67.28,67.28,0,0,1,90,32.87a67.28,67.28,0,0,1,9.29.83l2.15,18.58h12L117,36.19A29,29,0,0,1,131,39.67l-1.66,20.15c-.77,5.74-3.29,10-10.52,12.73A234.34,234.34,0,0,0,90,70a234.67,234.67,0,0,0-28.8,2.54C54,69.84,51.45,65.56,50.67,59.82Zm11.74,16.6A231,231,0,0,1,90,74a230.47,230.47,0,0,1,27.59,2.41c1.21,10.31,4.93,41.88,6.41,54-.69-.12-1.4-.23-2.14-.32A254,254,0,0,0,90,128.41a254,254,0,0,0-31.86,1.69c-.75.09-1.45.2-2.14.32C57.48,118.3,61.2,86.73,62.41,76.42Zm76.37,82H41.22c0-11.85-.67-20.31,12.69-23.53l.34-.09,1-.21c1-.22,2.16-.4,3.37-.56A252.6,252.6,0,0,1,90,132.41a252.6,252.6,0,0,1,31.36,1.65c1.18.15,2.28.34,3.31.54l1.1.24.23,0C139.45,138.1,138.78,146.58,138.78,158.45Z'%20fill='%23000000'/%3e%3crect%20class='clsR-6'%20width='180'%20height='180'%20fill='%23000000'/%3e%3c/svg%3e",
    ap =
        "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20version='1.1'%20id='Layer_1'%20x='0px'%20y='0px'%20viewBox='0%200%20180%20180'%20style='enable-background:new%200%200%20180%20180;'%20xml:space='preserve'%3e%3cdefs%20fill='%23000000'%3e%3cstyle%3e%20.clsR-1{fill:%2323402b;}.clsR-2,.clsR-3{fill:%23fff;}.clsR-2,.clsR-4{opacity:0.2;}.clsR-3{opacity:0.3;}.clsR-5{fill:%231a1a1a;}.clsR-6{fill:none;}%3c/style%3e%3c/defs%3e%3ctitle%3er%3c/title%3e%3cpath%20class='clsR-1'%20d='M90,30.87a92.56,92.56,0,0,0-10.56.85l-1.45.2-.25,1.44L74.87,50.28H70L64.84,35.53l-.47-1.34H63a31.07,31.07,0,0,0-14.88,3.72l-1.15.62.1,1.31L48.68,60v.1c1,7.21,4.68,11.7,11.93,14.38-1,8.58-5.74,48.89-6.95,58.44-14.51,3.42-14.49,12.94-14.46,23.92v3.62H140.78v-3.62c0-11,.06-20.5-14.46-23.92-1.2-9.55-5.94-49.86-6.95-58.44,7.26-2.68,11-7.17,11.94-14.38V60L133,39.84l.11-1.31-1.15-.62A31.08,31.08,0,0,0,117,34.19h-1.41l-.47,1.34L110,50.28h-4.85l-2.87-16.92L102,31.92l-1.45-.2A92.56,92.56,0,0,0,90,30.87Z'%20fill='%23000000'/%3e%3cpath%20class='clsR-2'%20d='M90,138.41c43.07,0,47.54,4.75,47.54,4.75h.59c-1.93-10.18-24.49-11.3-24.49-11.3H66.53s-23.36.81-24.66,11.3h.59S46.93,138.41,90,138.41Z'%20fill='%23000000'/%3e%3cpath%20class='clsR-3'%20d='M60,34.43c-10.75,7.36-6.7,34.9-6.7,34.9-6.85-2.21-6.7-31.73-6.7-31.73S63.08,32.34,60,34.43Z'%20fill='%23000000'/%3e%3cpath%20class='clsR-3'%20d='M93.18,32.26c-12,2.19-16.62,19.64-16.62,19.64.8-13,3.52-20.54,3.52-20.54S96.59,31.63,93.18,32.26Z'%20fill='%23000000'/%3e%3cpath%20class='clsR-3'%20d='M125.15,35.88c-7.77,4.11-13.75,16-13.75,16-.44-4.24,5.47-19,5.47-19S128.05,34.35,125.15,35.88Z'%20fill='%23000000'/%3e%3cpath%20class='clsR-4'%20d='M123.87,72.17c10.62.24,8.73-32.78,8.73-32.78l-6.36-4c-1.76,10.55-4,26.9-9.16,31.43-4.71,4.15-7.59,5.12-8.31,5.3-1.37-.17-2.83-.33-4.43-.47-14.5-1.32-35.6,2.82-35.6,2.82s21.37-1.3,32.3,12.42,12,43.37,12,43.37c7.16,1.33,12.49,2.8,12.49,2.8l-6.73-57.46S122.46,72.14,123.87,72.17Z'%20fill='%23000000'/%3e%3cpath%20class='clsR-5'%20d='M140.65,140.76c-2.2-4.67-6.21-7.71-12.51-9.45-1.35-10.88-5.36-45-6.6-55.54,7.06-3,10.73-7.87,11.75-15.41v-.21L135,40l.21-2.61-2.3-1.24a33.05,33.05,0,0,0-15.84-4h-3.19l-.71,3.12-2.93,13H105l-1.74-15-.35-3-3-.49A72.25,72.25,0,0,0,90,28.87a72.06,72.06,0,0,0-9.94.88l-3,.49-.35,3L75,48.28h-5.2l-2.93-13-.71-3.12H63a33,33,0,0,0-15.83,4l-2.3,1.24L45,40l1.66,20.15v.21c1,7.54,4.68,12.39,11.75,15.41-1.24,10.54-5.26,44.66-6.6,55.54-6.31,1.74-10.32,4.78-12.51,9.45s-2.15,9.91-2.14,16.07v5.62H142.78v-5.62C142.8,150.68,142.81,145.36,140.65,140.76Zm-90-80.94L49,39.67A28.93,28.93,0,0,1,63,36.19L66.6,52.28h12L80.71,33.7A67.28,67.28,0,0,1,90,32.87a67.28,67.28,0,0,1,9.29.83l2.15,18.58h12L117,36.19A29,29,0,0,1,131,39.67l-1.66,20.15c-.77,5.74-3.29,10-10.52,12.73A234.34,234.34,0,0,0,90,70a234.67,234.67,0,0,0-28.8,2.54C54,69.84,51.45,65.56,50.67,59.82Zm11.74,16.6A231,231,0,0,1,90,74a230.47,230.47,0,0,1,27.59,2.41c1.21,10.31,4.93,41.88,6.41,54-.69-.12-1.4-.23-2.14-.32A254,254,0,0,0,90,128.41a254,254,0,0,0-31.86,1.69c-.75.09-1.45.2-2.14.32C57.48,118.3,61.2,86.73,62.41,76.42Zm76.37,82H41.22c0-11.85-.67-20.31,12.69-23.53l.34-.09,1-.21c1-.22,2.16-.4,3.37-.56A252.6,252.6,0,0,1,90,132.41a252.6,252.6,0,0,1,31.36,1.65c1.18.15,2.28.34,3.31.54l1.1.24.23,0C139.45,138.1,138.78,146.58,138.78,158.45Z'%20fill='%23000000'/%3e%3crect%20class='clsR-6'%20width='180'%20height='180'%20fill='%23000000'/%3e%3c/svg%3e",
    cp =
        "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20version='1.1'%20id='Layer_1'%20x='0px'%20y='0px'%20viewBox='0%200%20180%20180'%20style='enable-background:new%200%200%20180%20180;'%20xml:space='preserve'%3e%3cdefs%20fill='%23000000'%3e%3cstyle%3e%20.clsR-1{fill:%235e1e22;}.clsR-2,.clsR-3{fill:%23fff;}.clsR-2,.clsR-4{opacity:0.2;}.clsR-3{opacity:0.3;}.clsR-5{fill:%231a1a1a;}.clsR-6{fill:none;}%3c/style%3e%3c/defs%3e%3ctitle%3er%3c/title%3e%3cpath%20class='clsR-1'%20d='M90,30.87a92.56,92.56,0,0,0-10.56.85l-1.45.2-.25,1.44L74.87,50.28H70L64.84,35.53l-.47-1.34H63a31.07,31.07,0,0,0-14.88,3.72l-1.15.62.1,1.31L48.68,60v.1c1,7.21,4.68,11.7,11.93,14.38-1,8.58-5.74,48.89-6.95,58.44-14.51,3.42-14.49,12.94-14.46,23.92v3.62H140.78v-3.62c0-11,.06-20.5-14.46-23.92-1.2-9.55-5.94-49.86-6.95-58.44,7.26-2.68,11-7.17,11.94-14.38V60L133,39.84l.11-1.31-1.15-.62A31.08,31.08,0,0,0,117,34.19h-1.41l-.47,1.34L110,50.28h-4.85l-2.87-16.92L102,31.92l-1.45-.2A92.56,92.56,0,0,0,90,30.87Z'%20fill='%23000000'/%3e%3cpath%20class='clsR-2'%20d='M90,138.41c43.07,0,47.54,4.75,47.54,4.75h.59c-1.93-10.18-24.49-11.3-24.49-11.3H66.53s-23.36.81-24.66,11.3h.59S46.93,138.41,90,138.41Z'%20fill='%23000000'/%3e%3cpath%20class='clsR-3'%20d='M60,34.43c-10.75,7.36-6.7,34.9-6.7,34.9-6.85-2.21-6.7-31.73-6.7-31.73S63.08,32.34,60,34.43Z'%20fill='%23000000'/%3e%3cpath%20class='clsR-3'%20d='M93.18,32.26c-12,2.19-16.62,19.64-16.62,19.64.8-13,3.52-20.54,3.52-20.54S96.59,31.63,93.18,32.26Z'%20fill='%23000000'/%3e%3cpath%20class='clsR-3'%20d='M125.15,35.88c-7.77,4.11-13.75,16-13.75,16-.44-4.24,5.47-19,5.47-19S128.05,34.35,125.15,35.88Z'%20fill='%23000000'/%3e%3cpath%20class='clsR-4'%20d='M123.87,72.17c10.62.24,8.73-32.78,8.73-32.78l-6.36-4c-1.76,10.55-4,26.9-9.16,31.43-4.71,4.15-7.59,5.12-8.31,5.3-1.37-.17-2.83-.33-4.43-.47-14.5-1.32-35.6,2.82-35.6,2.82s21.37-1.3,32.3,12.42,12,43.37,12,43.37c7.16,1.33,12.49,2.8,12.49,2.8l-6.73-57.46S122.46,72.14,123.87,72.17Z'%20fill='%23000000'/%3e%3cpath%20class='clsR-5'%20d='M140.65,140.76c-2.2-4.67-6.21-7.71-12.51-9.45-1.35-10.88-5.36-45-6.6-55.54,7.06-3,10.73-7.87,11.75-15.41v-.21L135,40l.21-2.61-2.3-1.24a33.05,33.05,0,0,0-15.84-4h-3.19l-.71,3.12-2.93,13H105l-1.74-15-.35-3-3-.49A72.25,72.25,0,0,0,90,28.87a72.06,72.06,0,0,0-9.94.88l-3,.49-.35,3L75,48.28h-5.2l-2.93-13-.71-3.12H63a33,33,0,0,0-15.83,4l-2.3,1.24L45,40l1.66,20.15v.21c1,7.54,4.68,12.39,11.75,15.41-1.24,10.54-5.26,44.66-6.6,55.54-6.31,1.74-10.32,4.78-12.51,9.45s-2.15,9.91-2.14,16.07v5.62H142.78v-5.62C142.8,150.68,142.81,145.36,140.65,140.76Zm-90-80.94L49,39.67A28.93,28.93,0,0,1,63,36.19L66.6,52.28h12L80.71,33.7A67.28,67.28,0,0,1,90,32.87a67.28,67.28,0,0,1,9.29.83l2.15,18.58h12L117,36.19A29,29,0,0,1,131,39.67l-1.66,20.15c-.77,5.74-3.29,10-10.52,12.73A234.34,234.34,0,0,0,90,70a234.67,234.67,0,0,0-28.8,2.54C54,69.84,51.45,65.56,50.67,59.82Zm11.74,16.6A231,231,0,0,1,90,74a230.47,230.47,0,0,1,27.59,2.41c1.21,10.31,4.93,41.88,6.41,54-.69-.12-1.4-.23-2.14-.32A254,254,0,0,0,90,128.41a254,254,0,0,0-31.86,1.69c-.75.09-1.45.2-2.14.32C57.48,118.3,61.2,86.73,62.41,76.42Zm76.37,82H41.22c0-11.85-.67-20.31,12.69-23.53l.34-.09,1-.21c1-.22,2.16-.4,3.37-.56A252.6,252.6,0,0,1,90,132.41a252.6,252.6,0,0,1,31.36,1.65c1.18.15,2.28.34,3.31.54l1.1.24.23,0C139.45,138.1,138.78,146.58,138.78,158.45Z'%20fill='%23000000'/%3e%3crect%20class='clsR-6'%20width='180'%20height='180'%20fill='%23000000'/%3e%3c/svg%3e",
    fp =
        "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20version='1.1'%20id='Layer_1'%20x='0px'%20y='0px'%20viewBox='0%200%20180%20180'%20style='enable-background:new%200%200%20180%20180;'%20xml:space='preserve'%3e%3cdefs%20fill='%23000000'%3e%3cstyle%3e%20.clsR-1{fill:%23614b13;}.clsR-2,.clsR-3{fill:%23fff;}.clsR-2,.clsR-4{opacity:0.2;}.clsR-3{opacity:0.3;}.clsR-5{fill:%231a1a1a;}.clsR-6{fill:none;}%3c/style%3e%3c/defs%3e%3ctitle%3er%3c/title%3e%3cpath%20class='clsR-1'%20d='M90,30.87a92.56,92.56,0,0,0-10.56.85l-1.45.2-.25,1.44L74.87,50.28H70L64.84,35.53l-.47-1.34H63a31.07,31.07,0,0,0-14.88,3.72l-1.15.62.1,1.31L48.68,60v.1c1,7.21,4.68,11.7,11.93,14.38-1,8.58-5.74,48.89-6.95,58.44-14.51,3.42-14.49,12.94-14.46,23.92v3.62H140.78v-3.62c0-11,.06-20.5-14.46-23.92-1.2-9.55-5.94-49.86-6.95-58.44,7.26-2.68,11-7.17,11.94-14.38V60L133,39.84l.11-1.31-1.15-.62A31.08,31.08,0,0,0,117,34.19h-1.41l-.47,1.34L110,50.28h-4.85l-2.87-16.92L102,31.92l-1.45-.2A92.56,92.56,0,0,0,90,30.87Z'%20fill='%23000000'/%3e%3cpath%20class='clsR-2'%20d='M90,138.41c43.07,0,47.54,4.75,47.54,4.75h.59c-1.93-10.18-24.49-11.3-24.49-11.3H66.53s-23.36.81-24.66,11.3h.59S46.93,138.41,90,138.41Z'%20fill='%23000000'/%3e%3cpath%20class='clsR-3'%20d='M60,34.43c-10.75,7.36-6.7,34.9-6.7,34.9-6.85-2.21-6.7-31.73-6.7-31.73S63.08,32.34,60,34.43Z'%20fill='%23000000'/%3e%3cpath%20class='clsR-3'%20d='M93.18,32.26c-12,2.19-16.62,19.64-16.62,19.64.8-13,3.52-20.54,3.52-20.54S96.59,31.63,93.18,32.26Z'%20fill='%23000000'/%3e%3cpath%20class='clsR-3'%20d='M125.15,35.88c-7.77,4.11-13.75,16-13.75,16-.44-4.24,5.47-19,5.47-19S128.05,34.35,125.15,35.88Z'%20fill='%23000000'/%3e%3cpath%20class='clsR-4'%20d='M123.87,72.17c10.62.24,8.73-32.78,8.73-32.78l-6.36-4c-1.76,10.55-4,26.9-9.16,31.43-4.71,4.15-7.59,5.12-8.31,5.3-1.37-.17-2.83-.33-4.43-.47-14.5-1.32-35.6,2.82-35.6,2.82s21.37-1.3,32.3,12.42,12,43.37,12,43.37c7.16,1.33,12.49,2.8,12.49,2.8l-6.73-57.46S122.46,72.14,123.87,72.17Z'%20fill='%23000000'/%3e%3cpath%20class='clsR-5'%20d='M140.65,140.76c-2.2-4.67-6.21-7.71-12.51-9.45-1.35-10.88-5.36-45-6.6-55.54,7.06-3,10.73-7.87,11.75-15.41v-.21L135,40l.21-2.61-2.3-1.24a33.05,33.05,0,0,0-15.84-4h-3.19l-.71,3.12-2.93,13H105l-1.74-15-.35-3-3-.49A72.25,72.25,0,0,0,90,28.87a72.06,72.06,0,0,0-9.94.88l-3,.49-.35,3L75,48.28h-5.2l-2.93-13-.71-3.12H63a33,33,0,0,0-15.83,4l-2.3,1.24L45,40l1.66,20.15v.21c1,7.54,4.68,12.39,11.75,15.41-1.24,10.54-5.26,44.66-6.6,55.54-6.31,1.74-10.32,4.78-12.51,9.45s-2.15,9.91-2.14,16.07v5.62H142.78v-5.62C142.8,150.68,142.81,145.36,140.65,140.76Zm-90-80.94L49,39.67A28.93,28.93,0,0,1,63,36.19L66.6,52.28h12L80.71,33.7A67.28,67.28,0,0,1,90,32.87a67.28,67.28,0,0,1,9.29.83l2.15,18.58h12L117,36.19A29,29,0,0,1,131,39.67l-1.66,20.15c-.77,5.74-3.29,10-10.52,12.73A234.34,234.34,0,0,0,90,70a234.67,234.67,0,0,0-28.8,2.54C54,69.84,51.45,65.56,50.67,59.82Zm11.74,16.6A231,231,0,0,1,90,74a230.47,230.47,0,0,1,27.59,2.41c1.21,10.31,4.93,41.88,6.41,54-.69-.12-1.4-.23-2.14-.32A254,254,0,0,0,90,128.41a254,254,0,0,0-31.86,1.69c-.75.09-1.45.2-2.14.32C57.48,118.3,61.2,86.73,62.41,76.42Zm76.37,82H41.22c0-11.85-.67-20.31,12.69-23.53l.34-.09,1-.21c1-.22,2.16-.4,3.37-.56A252.6,252.6,0,0,1,90,132.41a252.6,252.6,0,0,1,31.36,1.65c1.18.15,2.28.34,3.31.54l1.1.24.23,0C139.45,138.1,138.78,146.58,138.78,158.45Z'%20fill='%23000000'/%3e%3crect%20class='clsR-6'%20width='180'%20height='180'%20fill='%23000000'/%3e%3c/svg%3e",
    Y = {
        maxNumberOfPlayers: 4,
        minNumberOfPlayers: 2,
        defaultNumberOfPlayers: 3,
        maxPiecesPerPlayer: 5,
        minPiecesPerPlayer: 1,
        defaultPiecesPerPlayer: 3,
        boardSize: { rows: 8, columns: 8 },
        pieces: {
            blue: { default: { uri: lp }, disabled: { uri: sp } },
            green: { default: { uri: op }, disabled: { uri: ap } },
            red: { default: { uri: ip }, disabled: { uri: cp } },
            yellow: { default: { uri: up }, disabled: { uri: fp } },
        },
        players: {
            0: { color: 'blue' },
            1: { color: 'green' },
            2: { color: 'red' },
            3: { color: 'yellow' },
        },
    },
    dp = 'https://beta.api.rw.leonunes.me',
    pp = '/rw',
    pc = { createGame: { endpoint: () => `${dp}${pp}/game`, method: 'POST' } },
    vp = 'wss://beta.api.rw.leonunes.me',
    hp = '/rw/game/{gameId}',
    mp = { urlForGame: e => `${vp}${hp.replace('{gameId}', e.toString())}` };
function gp(e) {
    return { addPiece: { position: e } };
}
function yp(e, t, n) {
    return { move: { pieceId: e, position: t, wallPosition: n } };
}
async function wp(e) {
    const t = await fetch(pc.createGame.endpoint(), {
        method: pc.createGame.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(e),
    });
    if (!t.ok) throw new Error('Game creation failed');
    return await t.json();
}
function Sp(e, t) {
    return async function (n) {
        const r = crypto.randomUUID();
        try {
            n(Ep(r));
            const l = await wp({
                boardRows: Y.boardSize.rows,
                boardColumns: Y.boardSize.columns,
                numberOfPlayers: e,
                piecesPerPlayer: t,
            });
            n(Cp(r, l.gameId));
        } catch {
            n(kp(r));
        }
    };
}
function Ep(e) {
    return { type: 'start-game-creation', tempId: e };
}
function Cp(e, t) {
    return { type: 'game-created', tempId: e, gameId: t };
}
function kp(e) {
    return { type: 'game-creation-failed', tempId: e };
}
function xp(e) {
    return { type: 'join-game', gameId: e };
}
function vc(e, t) {
    return [...Array(t - e + 1)].map((n, r) => r + e);
}
function Gd(e, t) {
    const [n, r] = m.useReducer(e, t),
        l = m.useRef(n);
    l.current = n;
    const o = m.useCallback(
        async i => {
            function u() {
                return l.current;
            }
            function s(a) {
                (l.current = e(l.current, a)), r(a);
            }
            typeof i == 'function' ? await i(o, u) : s(i);
        },
        [e, l],
    );
    return [n, o];
}
function hc(e) {
    const t = m.useRef(e);
    return (t.current = e), m.useCallback(() => t.current, [t]);
}
function _p(e) {
    return new Promise((t, n) => {
        const r = new Image();
        (r.onload = function () {
            t(r);
        }),
            (r.onerror = r.onabort =
                function () {
                    n(e);
                }),
            (r.src = e);
    });
}
function Pp(e) {
    const [t, n] = m.useState(!1);
    return (
        m.useEffect(() => {
            let r = !1;
            async function l() {
                if (r) return;
                const o = [];
                for (const i of e) o.push(_p(i));
                await Promise.all(o), !r && n(!0);
            }
            return (
                l(),
                () => {
                    r = !0;
                }
            );
        }, [e]),
        { imagesPreloaded: t }
    );
}
function Rp(e) {
    return /^-?\d+$/.test(e);
}
function lr(e, t) {
    const n = {},
        r = new Set(Object.keys(t));
    return (
        Object.keys(e).forEach(l => {
            r.has(l) || (n[l] = e[l]);
        }),
        n
    );
}
function zl(e, t) {
    return Array.isArray(e) && e.every(n => t(n));
}
const Mp = { games: [] };
function Np(e, t) {
    switch (t.type) {
        case 'start-game-creation':
            return { ...e, games: [...e.games, { tempId: t.tempId, gameId: -1, isCreating: !0 }] };
        case 'game-created': {
            const n = e.games.find(r => r.tempId === t.tempId);
            return n
                ? {
                      ...e,
                      games: [
                          ...e.games.filter(r => r.tempId !== t.tempId),
                          { ...n, gameId: t.gameId, isCreating: !1 },
                      ],
                  }
                : e;
        }
        case 'game-creation-failed':
            return { ...e };
        case 'join-game':
            return { ...e, games: [...e.games, { gameId: t.gameId, isCreating: !1 }] };
    }
}
const Kd = m.createContext(void 0),
    Yd = m.createContext(void 0);
function Lp() {
    const e = m.useContext(Kd);
    if (e === void 0)
        throw new Error(
            'RnWManagerState is not available. Do you have a RnWManagerStateProvider providing it?',
        );
    return e;
}
function Op() {
    const e = m.useContext(Yd);
    if (e === void 0)
        throw new Error(
            'RnWManagerDispatch is not available. Do you have a RnWManagerStateProvider providing it?',
        );
    return e;
}
function Dp(e) {
    const [t, n] = Gd(Np, Mp);
    return (
        m.useEffect(() => console.debug('rnwManagerState', t), [t]),
        P.jsx(Kd.Provider, {
            value: t,
            children: P.jsx(Yd.Provider, { value: n, children: e.children }),
        })
    );
}
function tl(e) {
    return typeof e.row == 'number' && typeof e.column == 'number';
}
function ju(e) {
    return (
        typeof e.square1 == 'object' &&
        typeof e.square2 == 'object' &&
        tl(e.square1) &&
        tl(e.square2)
    );
}
function he(e, t) {
    return e.row === t.row && e.column === t.column;
}
function Qo(e, t) {
    return (
        (he(e.square1, t.square1) && he(e.square2, t.square2)) ||
        (he(e.square1, t.square2) && he(e.square2, t.square1))
    );
}
function Xd(e, t) {
    return tl(e) && tl(t) ? he(e, t) : ju(e) && ju(t) ? Qo(e, t) : !1;
}
function qd(e) {
    return { square1: e, square2: { row: e.row, column: e.column + 1 } };
}
function Jd(e) {
    return { square1: e, square2: { row: e.row + 1, column: e.column } };
}
const Tp = {
        stage: 'waiting_for_players',
        playerId: 0,
        currentPlayer: void 0,
        players: [],
        pieces: [],
        walls: [],
        deadPieces: [],
        nextMove: {},
    },
    Ap = e => ({
        ...e,
        playerCurrentAction: () => Go(e),
        getPlayerId: () => e.playerId,
        getPieceById: t => zp(e, t),
        getPieceFromPosition: t => Ko(e, t),
        getWallFromPosition: t => Eo(e, t),
        getPiecesFromPlayer: t => jp(e, t),
        getPiecesThatCanMove: () => Fp(e),
        possibleDestinations: t => Us(e, t),
        availableSquaresForPlacingPiece: () => Up(e),
        availableEdgesForPlacingWalls: () => Wp(e),
        canPlacePiece: t => bp(e, t),
        canMoveTo: (t, n) => Hp(e, t, n),
    });
function Ip(e) {
    return e.currentPlayer === e.playerId;
}
function Go(e) {
    if (Ip(e)) {
        if (e.stage === 'piece_placement') return 'add_piece';
        if (e.stage === 'moves' && e.nextMove.piece === void 0) return 'move_piece';
        if (e.stage === 'moves' && e.nextMove.wallPosition === void 0) return 'add_wall';
    }
}
function zp(e, t) {
    return e.pieces.find(n => n.id === t);
}
function Ko(e, t) {
    return e.pieces.find(n => he(n.position, t));
}
function Eo(e, t) {
    return e.walls.find(n => Qo(n.position, t));
}
function jp(e, t) {
    return e.pieces.filter(n => n.owner === t);
}
function Fp(e) {
    return Go(e) !== 'move_piece'
        ? []
        : e.pieces.filter(t => t.owner === e.playerId).filter(t => Us(e, t).length > 0);
}
function Us(e, t) {
    const n = [],
        r = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
        ];
    for (let [l, o] of r) {
        let i = t.position;
        for (;;) {
            let u = { row: i.row + l, column: i.column + o };
            if (!Bp(u) || Eo(e, { square1: i, square2: u }) || Ko(e, u)) break;
            n.push(u), (i = u);
        }
    }
    return n;
}
function Up(e) {
    if (Go(e) !== 'add_piece') return [];
    const t = [];
    for (let n = 0; n < Y.boardSize.rows; n++)
        for (let r = 0; r < Y.boardSize.columns; r++)
            Ko(e, { row: n, column: r }) === void 0 && t.push({ row: n, column: r });
    return t;
}
function Wp(e) {
    if (Go(e) !== 'add_wall') return [];
    const t = [];
    for (let n = 0; n < Y.boardSize.rows; n++)
        for (let r = 0; r < Y.boardSize.columns; r++) {
            if (r !== Y.boardSize.columns - 1) {
                const l = qd({ row: n, column: r });
                Eo(e, l) === void 0 && t.push(l);
            }
            if (n !== Y.boardSize.rows - 1) {
                const l = Jd({ row: n, column: r });
                Eo(e, l) === void 0 && t.push(l);
            }
        }
    return t;
}
function bp(e, t) {
    return Ko(e, t) === void 0;
}
function Hp(e, t, n) {
    return Us(e, t).find(r => he(r, n)) !== void 0;
}
function Bp(e) {
    return !(
        e.row < 0 ||
        e.row > Y.boardSize.rows - 1 ||
        e.column < 0 ||
        e.column > Y.boardSize.columns - 1
    );
}
function Vp(e) {
    return {
        addPiece: (t, n, r) => {
            e(Zp(t, n, r));
        },
        setNextMovePiece: (t, n) => {
            e(Kp(t, n));
        },
        setNextMoveWall: t => {
            e(Yp(t));
        },
        commitMove: t => {
            e(qp(t));
        },
        updateFromServer: t => {
            e(Jp(t));
        },
    };
}
function $p(e, t) {
    return { type: 'add-piece', owner: e, position: t };
}
function Zp(e, t, n) {
    return function (r) {
        r($p(e, t)), n(gp(t));
    };
}
function Qp(e, t) {
    return { type: 'move-piece', piece: e, newPosition: t };
}
function Gp(e) {
    return { type: 'add-wall', position: e };
}
function Kp(e, t) {
    return { type: 'set-next-move-piece', piece: e, position: t };
}
function Yp(e) {
    return { type: 'set-next-move-wall', position: e };
}
function Xp() {
    return { type: 'reset-next-move' };
}
function qp(e) {
    return function (t, n) {
        const { nextMove: r } = n();
        if (
            r === void 0 ||
            r.piece === void 0 ||
            r.piecePosition === void 0 ||
            r.wallPosition === void 0
        ) {
            console.error('Cannot proccess commitMove action: Invalid state');
            return;
        }
        t(Qp(r.piece, r.piecePosition)),
            t(Gp(r.wallPosition)),
            t(Xp()),
            e(yp(r.piece.id, r.piecePosition, r.wallPosition));
    };
}
function Jp(e) {
    return { type: 'update-from-server', serverState: e };
}
function e3(e, t) {
    switch (t.type) {
        case 'add-piece':
            return {
                ...e,
                pieces: [
                    ...e.pieces,
                    {
                        id: e.pieces.map(n => n.id).reduce((n, r) => Math.max(n, r), 0) + 1,
                        owner: t.owner,
                        position: t.position,
                    },
                ],
            };
        case 'add-wall':
            return { ...e, walls: [...e.walls, { position: t.position }] };
        case 'move-piece':
            return {
                ...e,
                pieces: [
                    ...e.pieces.filter(n => n !== t.piece),
                    { ...t.piece, position: t.newPosition },
                ],
            };
        case 'update-from-server': {
            const { serverState: n } = t;
            return {
                ...e,
                stage: n.stage,
                playerId: n.playerId,
                currentPlayer: n.currentTurn,
                players: n.players.map(r => ({ id: r.id })),
                pieces: n.pieces.map(r => ({ id: r.id, owner: r.owner, position: r.position })),
                walls: n.walls.map(r => ({ position: r.position })),
                deadPieces: n.deadPieces.map(r => ({
                    id: r.id,
                    owner: r.owner,
                    position: r.position,
                })),
            };
        }
        case 'set-next-move-piece':
            return { ...e, nextMove: { ...e.nextMove, piece: t.piece, piecePosition: t.position } };
        case 'set-next-move-wall':
            return { ...e, nextMove: { ...e.nextMove, wallPosition: t.position } };
        case 'reset-next-move':
            return {
                ...e,
                nextMove: { piece: void 0, piecePosition: void 0, wallPosition: void 0 },
            };
    }
}
const e1 = m.createContext(void 0),
    t1 = m.createContext(void 0);
function t3() {
    const e = m.useContext(e1);
    if (e === void 0)
        throw new Error('RnWState is not available. Do you have a RnWStateProvider providing it?');
    return e;
}
function n3() {
    const e = m.useContext(t1);
    if (e === void 0)
        throw new Error('RnWDispatch is not available. Do you have a RnWProvider providing it?');
    return e;
}
function r3(e) {
    const [t, n] = Gd(e3, Tp);
    return (
        m.useEffect(() => console.debug('rnwState', t), [t]),
        P.jsx(e1.Provider, {
            value: t,
            children: P.jsx(t1.Provider, { value: n, children: e.children }),
        })
    );
}
var n1 = {},
    or = {},
    ht = {};
(function (e) {
    Object.defineProperty(e, '__esModule', { value: !0 }),
        (e.isEventSourceSupported =
            e.isReactNative =
            e.ReadyState =
            e.DEFAULT_HEARTBEAT =
            e.UNPARSABLE_JSON_OBJECT =
            e.DEFAULT_RECONNECT_INTERVAL_MS =
            e.DEFAULT_RECONNECT_LIMIT =
            e.SOCKET_IO_PING_CODE =
            e.SOCKET_IO_PATH =
            e.SOCKET_IO_PING_INTERVAL =
            e.DEFAULT_EVENT_SOURCE_OPTIONS =
            e.EMPTY_EVENT_HANDLERS =
            e.DEFAULT_OPTIONS =
                void 0);
    var t = 1,
        n = 1e3 * t;
    (e.DEFAULT_OPTIONS = {}),
        (e.EMPTY_EVENT_HANDLERS = {}),
        (e.DEFAULT_EVENT_SOURCE_OPTIONS = { withCredentials: !1, events: e.EMPTY_EVENT_HANDLERS }),
        (e.SOCKET_IO_PING_INTERVAL = 25 * n),
        (e.SOCKET_IO_PATH = '/socket.io/?EIO=3&transport=websocket'),
        (e.SOCKET_IO_PING_CODE = '2'),
        (e.DEFAULT_RECONNECT_LIMIT = 20),
        (e.DEFAULT_RECONNECT_INTERVAL_MS = 5e3),
        (e.UNPARSABLE_JSON_OBJECT = {}),
        (e.DEFAULT_HEARTBEAT = { message: 'ping', timeout: 6e4, interval: 25e3 }),
        (function (l) {
            (l[(l.UNINSTANTIATED = -1)] = 'UNINSTANTIATED'),
                (l[(l.CONNECTING = 0)] = 'CONNECTING'),
                (l[(l.OPEN = 1)] = 'OPEN'),
                (l[(l.CLOSING = 2)] = 'CLOSING'),
                (l[(l.CLOSED = 3)] = 'CLOSED');
        })(e.ReadyState || (e.ReadyState = {}));
    var r = function () {
        try {
            return 'EventSource' in globalThis;
        } catch {
            return !1;
        }
    };
    (e.isReactNative = typeof navigator < 'u' && navigator.product === 'ReactNative'),
        (e.isEventSourceSupported = !e.isReactNative && r());
})(ht);
var Yo = {},
    Xo = {};
(function (e) {
    Object.defineProperty(e, '__esModule', { value: !0 }),
        (e.resetWebSockets = e.sharedWebSockets = void 0),
        (e.sharedWebSockets = {});
    var t = function (n) {
        if (n && e.sharedWebSockets.hasOwnProperty(n)) delete e.sharedWebSockets[n];
        else
            for (var r in e.sharedWebSockets)
                e.sharedWebSockets.hasOwnProperty(r) && delete e.sharedWebSockets[r];
    };
    e.resetWebSockets = t;
})(Xo);
var qo = {},
    vt = {};
Object.defineProperty(vt, '__esModule', { value: !0 });
vt.setUpSocketIOPing = vt.appendQueryParams = vt.parseSocketIOUrl = void 0;
var Co = ht,
    l3 = function (e) {
        if (e) {
            var t = /^https|wss/.test(e),
                n = e.replace(/^(https?|wss?)(:\/\/)?/, ''),
                r = n.replace(/\/$/, ''),
                l = t ? 'wss' : 'ws';
            return ''.concat(l, '://').concat(r).concat(Co.SOCKET_IO_PATH);
        } else if (e === '') {
            var t = /^https/.test(window.location.protocol),
                l = t ? 'wss' : 'ws',
                o = window.location.port ? ':'.concat(window.location.port) : '';
            return ''
                .concat(l, '://')
                .concat(window.location.hostname)
                .concat(o)
                .concat(Co.SOCKET_IO_PATH);
        }
        return e;
    };
vt.parseSocketIOUrl = l3;
var o3 = function (e, t) {
    t === void 0 && (t = {});
    var n = /\?([\w]+=[\w]+)/,
        r = n.test(e),
        l = ''.concat(
            Object.entries(t)
                .reduce(function (o, i) {
                    var u = i[0],
                        s = i[1];
                    return o + ''.concat(u, '=').concat(s, '&');
                }, '')
                .slice(0, -1),
        );
    return ''
        .concat(e)
        .concat(r ? '&' : '?')
        .concat(l);
};
vt.appendQueryParams = o3;
var i3 = function (e, t) {
    t === void 0 && (t = Co.SOCKET_IO_PING_INTERVAL);
    var n = function () {
        return e(Co.SOCKET_IO_PING_CODE);
    };
    return window.setInterval(n, t);
};
vt.setUpSocketIOPing = i3;
var cl = {};
Object.defineProperty(cl, '__esModule', { value: !0 });
cl.heartbeat = void 0;
var ji = ht;
function u3(e, t) {
    var n = t || {},
        r = n.interval,
        l = r === void 0 ? ji.DEFAULT_HEARTBEAT.interval : r,
        o = n.timeout,
        i = o === void 0 ? ji.DEFAULT_HEARTBEAT.timeout : o,
        u = n.message,
        s = u === void 0 ? ji.DEFAULT_HEARTBEAT.message : u,
        a = !1,
        c = setInterval(function () {
            try {
                e.send(s);
            } catch {}
        }, l),
        f = setInterval(function () {
            a ? (a = !1) : e.close();
        }, i);
    return (
        e.addEventListener('close', function () {
            clearInterval(c), clearInterval(f);
        }),
        function () {
            a = !0;
        }
    );
}
cl.heartbeat = u3;
var qt = {},
    Jo = {};
(function (e) {
    Object.defineProperty(e, '__esModule', { value: !0 }),
        (e.resetSubscribers =
            e.removeSubscriber =
            e.addSubscriber =
            e.hasSubscribers =
            e.getSubscribers =
                void 0);
    var t = {},
        n = [],
        r = function (s) {
            return (0, e.hasSubscribers)(s) ? Array.from(t[s]) : n;
        };
    e.getSubscribers = r;
    var l = function (s) {
        var a;
        return ((a = t[s]) === null || a === void 0 ? void 0 : a.size) > 0;
    };
    e.hasSubscribers = l;
    var o = function (s, a) {
        (t[s] = t[s] || new Set()), t[s].add(a);
    };
    e.addSubscriber = o;
    var i = function (s, a) {
        t[s].delete(a);
    };
    e.removeSubscriber = i;
    var u = function (s) {
        if (s && t.hasOwnProperty(s)) delete t[s];
        else for (var a in t) t.hasOwnProperty(a) && delete t[a];
    };
    e.resetSubscribers = u;
})(Jo);
Object.defineProperty(qt, '__esModule', { value: !0 });
qt.resetGlobalState = qt.assertIsWebSocket = void 0;
var s3 = Xo,
    a3 = Jo;
function c3(e, t) {
    if (!t && !(e instanceof WebSocket)) throw new Error('');
}
qt.assertIsWebSocket = c3;
function f3(e) {
    (0, a3.resetSubscribers)(e), (0, s3.resetWebSockets)(e);
}
qt.resetGlobalState = f3;
var ko =
    (K && K.__assign) ||
    function () {
        return (
            (ko =
                Object.assign ||
                function (e) {
                    for (var t, n = 1, r = arguments.length; n < r; n++) {
                        t = arguments[n];
                        for (var l in t)
                            Object.prototype.hasOwnProperty.call(t, l) && (e[l] = t[l]);
                    }
                    return e;
                }),
            ko.apply(this, arguments)
        );
    };
Object.defineProperty(qo, '__esModule', { value: !0 });
qo.attachListeners = void 0;
var d3 = vt,
    p3 = cl,
    ft = ht,
    v3 = qt,
    h3 = function (e, t, n) {
        var r;
        if (t.current.heartbeat && e instanceof WebSocket) {
            var l = typeof t.current.heartbeat == 'boolean' ? void 0 : t.current.heartbeat;
            r = (0, p3.heartbeat)(e, l);
        }
        e.onmessage = function (o) {
            var i;
            r == null || r(),
                t.current.onMessage && t.current.onMessage(o),
                !(typeof t.current.filter == 'function' && t.current.filter(o) !== !0) &&
                    ((t.current.heartbeat &&
                        typeof t.current.heartbeat != 'boolean' &&
                        ((i = t.current.heartbeat) === null || i === void 0
                            ? void 0
                            : i.returnMessage) === o.data) ||
                        n(o));
        };
    },
    m3 = function (e, t, n, r) {
        e.onopen = function (l) {
            t.current.onOpen && t.current.onOpen(l), (r.current = 0), n(ft.ReadyState.OPEN);
        };
    },
    g3 = function (e, t, n, r, l) {
        if (ft.isEventSourceSupported && e instanceof EventSource) return function () {};
        (0, v3.assertIsWebSocket)(e, t.current.skipAssert);
        var o;
        return (
            (e.onclose = function (i) {
                var u;
                if (
                    (t.current.onClose && t.current.onClose(i),
                    n(ft.ReadyState.CLOSED),
                    t.current.shouldReconnect && t.current.shouldReconnect(i))
                ) {
                    var s =
                        (u = t.current.reconnectAttempts) !== null && u !== void 0
                            ? u
                            : ft.DEFAULT_RECONNECT_LIMIT;
                    if (l.current < s) {
                        var a =
                            typeof t.current.reconnectInterval == 'function'
                                ? t.current.reconnectInterval(l.current)
                                : t.current.reconnectInterval;
                        o = window.setTimeout(function () {
                            l.current++, r();
                        }, a ?? ft.DEFAULT_RECONNECT_INTERVAL_MS);
                    } else
                        t.current.onReconnectStop && t.current.onReconnectStop(s),
                            console.warn('Max reconnect attempts of '.concat(s, ' exceeded'));
                }
            }),
            function () {
                return o && window.clearTimeout(o);
            }
        );
    },
    y3 = function (e, t, n, r, l) {
        var o;
        return (
            (e.onerror = function (i) {
                var u;
                if (
                    (t.current.onError && t.current.onError(i),
                    ft.isEventSourceSupported &&
                        e instanceof EventSource &&
                        (t.current.onClose &&
                            t.current.onClose(
                                ko(ko({}, i), {
                                    code: 1006,
                                    reason: 'An error occurred with the EventSource: '.concat(i),
                                    wasClean: !1,
                                }),
                            ),
                        n(ft.ReadyState.CLOSED),
                        e.close()),
                    t.current.retryOnError)
                )
                    if (
                        l.current <
                        ((u = t.current.reconnectAttempts) !== null && u !== void 0
                            ? u
                            : ft.DEFAULT_RECONNECT_LIMIT)
                    ) {
                        var s =
                            typeof t.current.reconnectInterval == 'function'
                                ? t.current.reconnectInterval(l.current)
                                : t.current.reconnectInterval;
                        o = window.setTimeout(function () {
                            l.current++, r();
                        }, s ?? ft.DEFAULT_RECONNECT_INTERVAL_MS);
                    } else
                        t.current.onReconnectStop &&
                            t.current.onReconnectStop(t.current.reconnectAttempts),
                            console.warn(
                                'Max reconnect attempts of '.concat(
                                    t.current.reconnectAttempts,
                                    ' exceeded',
                                ),
                            );
            }),
            function () {
                return o && window.clearTimeout(o);
            }
        );
    },
    w3 = function (e, t, n, r, l, o) {
        var i = t.setLastMessage,
            u = t.setReadyState,
            s,
            a,
            c;
        return (
            n.current.fromSocketIO && (s = (0, d3.setUpSocketIOPing)(o)),
            h3(e, n, i),
            m3(e, n, u, l),
            (a = g3(e, n, u, r, l)),
            (c = y3(e, n, u, r, l)),
            function () {
                u(ft.ReadyState.CLOSING), a(), c(), e.close(), s && clearInterval(s);
            }
        );
    };
qo.attachListeners = w3;
var ei = {},
    xo =
        (K && K.__assign) ||
        function () {
            return (
                (xo =
                    Object.assign ||
                    function (e) {
                        for (var t, n = 1, r = arguments.length; n < r; n++) {
                            t = arguments[n];
                            for (var l in t)
                                Object.prototype.hasOwnProperty.call(t, l) && (e[l] = t[l]);
                        }
                        return e;
                    }),
                xo.apply(this, arguments)
            );
        };
Object.defineProperty(ei, '__esModule', { value: !0 });
ei.attachSharedListeners = void 0;
var S3 = Xo,
    pn = ht,
    nl = Jo,
    E3 = vt,
    C3 = cl,
    k3 = function (e, t, n) {
        var r;
        n &&
            e instanceof WebSocket &&
            (r = (0, C3.heartbeat)(e, typeof n == 'boolean' ? void 0 : n)),
            (e.onmessage = function (l) {
                r == null || r(),
                    (0, nl.getSubscribers)(t).forEach(function (o) {
                        o.optionsRef.current.onMessage && o.optionsRef.current.onMessage(l),
                            !(
                                typeof o.optionsRef.current.filter == 'function' &&
                                o.optionsRef.current.filter(l) !== !0
                            ) &&
                                ((n &&
                                    typeof n != 'boolean' &&
                                    (n == null ? void 0 : n.returnMessage) === l.data) ||
                                    o.setLastMessage(l));
                    });
            });
    },
    x3 = function (e, t) {
        e.onopen = function (n) {
            (0, nl.getSubscribers)(t).forEach(function (r) {
                (r.reconnectCount.current = 0),
                    r.optionsRef.current.onOpen && r.optionsRef.current.onOpen(n),
                    r.setReadyState(pn.ReadyState.OPEN);
            });
        };
    },
    _3 = function (e, t) {
        e instanceof WebSocket &&
            (e.onclose = function (n) {
                (0, nl.getSubscribers)(t).forEach(function (r) {
                    r.optionsRef.current.onClose && r.optionsRef.current.onClose(n),
                        r.setReadyState(pn.ReadyState.CLOSED);
                }),
                    delete S3.sharedWebSockets[t],
                    (0, nl.getSubscribers)(t).forEach(function (r) {
                        var l;
                        if (
                            r.optionsRef.current.shouldReconnect &&
                            r.optionsRef.current.shouldReconnect(n)
                        ) {
                            var o =
                                (l = r.optionsRef.current.reconnectAttempts) !== null &&
                                l !== void 0
                                    ? l
                                    : pn.DEFAULT_RECONNECT_LIMIT;
                            if (r.reconnectCount.current < o) {
                                var i =
                                    typeof r.optionsRef.current.reconnectInterval == 'function'
                                        ? r.optionsRef.current.reconnectInterval(
                                              r.reconnectCount.current,
                                          )
                                        : r.optionsRef.current.reconnectInterval;
                                setTimeout(function () {
                                    r.reconnectCount.current++, r.reconnect.current();
                                }, i ?? pn.DEFAULT_RECONNECT_INTERVAL_MS);
                            } else
                                r.optionsRef.current.onReconnectStop &&
                                    r.optionsRef.current.onReconnectStop(
                                        r.optionsRef.current.reconnectAttempts,
                                    ),
                                    console.warn(
                                        'Max reconnect attempts of '.concat(o, ' exceeded'),
                                    );
                        }
                    });
            });
    },
    P3 = function (e, t) {
        e.onerror = function (n) {
            (0, nl.getSubscribers)(t).forEach(function (r) {
                r.optionsRef.current.onError && r.optionsRef.current.onError(n),
                    pn.isEventSourceSupported &&
                        e instanceof EventSource &&
                        (r.optionsRef.current.onClose &&
                            r.optionsRef.current.onClose(
                                xo(xo({}, n), {
                                    code: 1006,
                                    reason: 'An error occurred with the EventSource: '.concat(n),
                                    wasClean: !1,
                                }),
                            ),
                        r.setReadyState(pn.ReadyState.CLOSED));
            }),
                pn.isEventSourceSupported && e instanceof EventSource && e.close();
        };
    },
    R3 = function (e, t, n, r) {
        var l;
        return (
            n.current.fromSocketIO && (l = (0, E3.setUpSocketIOPing)(r)),
            k3(e, t, n.current.heartbeat),
            _3(e, t),
            x3(e, t),
            P3(e, t),
            function () {
                l && clearInterval(l);
            }
        );
    };
ei.attachSharedListeners = R3;
Object.defineProperty(Yo, '__esModule', { value: !0 });
Yo.createOrJoinSocket = void 0;
var It = Xo,
    _r = ht,
    M3 = qo,
    N3 = ei,
    Fu = Jo,
    L3 = function (e, t, n, r, l) {
        return function () {
            if (((0, Fu.removeSubscriber)(e, t), !(0, Fu.hasSubscribers)(e))) {
                try {
                    var o = It.sharedWebSockets[e];
                    o instanceof WebSocket &&
                        (o.onclose = function (i) {
                            n.current.onClose && n.current.onClose(i), r(_r.ReadyState.CLOSED);
                        }),
                        o.close();
                } catch {}
                l && l(), delete It.sharedWebSockets[e];
            }
        };
    },
    O3 = function (e, t, n, r, l, o, i, u) {
        if (!_r.isEventSourceSupported && r.current.eventSourceOptions)
            throw _r.isReactNative
                ? new Error('EventSource is not supported in ReactNative')
                : new Error('EventSource is not supported');
        if (r.current.share) {
            var s = null;
            It.sharedWebSockets[t] === void 0
                ? ((It.sharedWebSockets[t] = r.current.eventSourceOptions
                      ? new EventSource(t, r.current.eventSourceOptions)
                      : new WebSocket(t, r.current.protocols)),
                  (e.current = It.sharedWebSockets[t]),
                  n(_r.ReadyState.CONNECTING),
                  (s = (0, N3.attachSharedListeners)(It.sharedWebSockets[t], t, r, u)))
                : ((e.current = It.sharedWebSockets[t]), n(It.sharedWebSockets[t].readyState));
            var a = {
                setLastMessage: l,
                setReadyState: n,
                optionsRef: r,
                reconnectCount: i,
                reconnect: o,
            };
            return (0, Fu.addSubscriber)(t, a), L3(t, a, r, n, s);
        } else {
            if (
                ((e.current = r.current.eventSourceOptions
                    ? new EventSource(t, r.current.eventSourceOptions)
                    : new WebSocket(t, r.current.protocols)),
                n(_r.ReadyState.CONNECTING),
                !e.current)
            )
                throw new Error('WebSocket failed to be created');
            return (0, M3.attachListeners)(
                e.current,
                { setLastMessage: l, setReadyState: n },
                r,
                o.current,
                i,
                u,
            );
        }
    };
Yo.createOrJoinSocket = O3;
var ti = {},
    D3 =
        (K && K.__awaiter) ||
        function (e, t, n, r) {
            function l(o) {
                return o instanceof n
                    ? o
                    : new n(function (i) {
                          i(o);
                      });
            }
            return new (n || (n = Promise))(function (o, i) {
                function u(c) {
                    try {
                        a(r.next(c));
                    } catch (f) {
                        i(f);
                    }
                }
                function s(c) {
                    try {
                        a(r.throw(c));
                    } catch (f) {
                        i(f);
                    }
                }
                function a(c) {
                    c.done ? o(c.value) : l(c.value).then(u, s);
                }
                a((r = r.apply(e, t || [])).next());
            });
        },
    T3 =
        (K && K.__generator) ||
        function (e, t) {
            var n = {
                    label: 0,
                    sent: function () {
                        if (o[0] & 1) throw o[1];
                        return o[1];
                    },
                    trys: [],
                    ops: [],
                },
                r,
                l,
                o,
                i;
            return (
                (i = { next: u(0), throw: u(1), return: u(2) }),
                typeof Symbol == 'function' &&
                    (i[Symbol.iterator] = function () {
                        return this;
                    }),
                i
            );
            function u(a) {
                return function (c) {
                    return s([a, c]);
                };
            }
            function s(a) {
                if (r) throw new TypeError('Generator is already executing.');
                for (; n; )
                    try {
                        if (
                            ((r = 1),
                            l &&
                                (o =
                                    a[0] & 2
                                        ? l.return
                                        : a[0]
                                        ? l.throw || ((o = l.return) && o.call(l), 0)
                                        : l.next) &&
                                !(o = o.call(l, a[1])).done)
                        )
                            return o;
                        switch (((l = 0), o && (a = [a[0] & 2, o.value]), a[0])) {
                            case 0:
                            case 1:
                                o = a;
                                break;
                            case 4:
                                return n.label++, { value: a[1], done: !1 };
                            case 5:
                                n.label++, (l = a[1]), (a = [0]);
                                continue;
                            case 7:
                                (a = n.ops.pop()), n.trys.pop();
                                continue;
                            default:
                                if (
                                    ((o = n.trys),
                                    !(o = o.length > 0 && o[o.length - 1]) &&
                                        (a[0] === 6 || a[0] === 2))
                                ) {
                                    n = 0;
                                    continue;
                                }
                                if (a[0] === 3 && (!o || (a[1] > o[0] && a[1] < o[3]))) {
                                    n.label = a[1];
                                    break;
                                }
                                if (a[0] === 6 && n.label < o[1]) {
                                    (n.label = o[1]), (o = a);
                                    break;
                                }
                                if (o && n.label < o[2]) {
                                    (n.label = o[2]), n.ops.push(a);
                                    break;
                                }
                                o[2] && n.ops.pop(), n.trys.pop();
                                continue;
                        }
                        a = t.call(e, n);
                    } catch (c) {
                        (a = [6, c]), (l = 0);
                    } finally {
                        r = o = 0;
                    }
                if (a[0] & 5) throw a[1];
                return { value: a[0] ? a[1] : void 0, done: !0 };
            }
        };
Object.defineProperty(ti, '__esModule', { value: !0 });
ti.getUrl = void 0;
var mc = vt,
    A3 = function (e, t) {
        return D3(void 0, void 0, void 0, function () {
            var n, r, l;
            return T3(this, function (o) {
                switch (o.label) {
                    case 0:
                        return typeof e != 'function' ? [3, 2] : [4, e()];
                    case 1:
                        return (n = o.sent()), [3, 3];
                    case 2:
                        (n = e), (o.label = 3);
                    case 3:
                        return (
                            (r = t.current.fromSocketIO ? (0, mc.parseSocketIOUrl)(n) : n),
                            (l = t.current.queryParams
                                ? (0, mc.appendQueryParams)(r, t.current.queryParams)
                                : r),
                            [2, l]
                        );
                }
            });
        });
    };
ti.getUrl = A3;
var r1 = {};
(function (e) {
    Object.defineProperty(e, '__esModule', { value: !0 }), (e.websocketWrapper = void 0);
    var t = function (n, r) {
        return new Proxy(n, {
            get: function (l, o) {
                var i = l[o];
                return o === 'reconnect'
                    ? r
                    : typeof i == 'function'
                    ? (console.error(
                          'Calling methods directly on the websocket is not supported at this moment. You must use the methods returned by useWebSocket.',
                      ),
                      function () {})
                    : i;
            },
            set: function (l, o, i) {
                return /^on/.test(o)
                    ? (console.warn(
                          "The websocket's event handlers should be defined through the options object passed into useWebSocket.",
                      ),
                      !1)
                    : ((l[o] = i), !0);
            },
        });
    };
    (e.websocketWrapper = t), (e.default = e.websocketWrapper);
})(r1);
var Wn =
        (K && K.__assign) ||
        function () {
            return (
                (Wn =
                    Object.assign ||
                    function (e) {
                        for (var t, n = 1, r = arguments.length; n < r; n++) {
                            t = arguments[n];
                            for (var l in t)
                                Object.prototype.hasOwnProperty.call(t, l) && (e[l] = t[l]);
                        }
                        return e;
                    }),
                Wn.apply(this, arguments)
            );
        },
    I3 =
        (K && K.__awaiter) ||
        function (e, t, n, r) {
            function l(o) {
                return o instanceof n
                    ? o
                    : new n(function (i) {
                          i(o);
                      });
            }
            return new (n || (n = Promise))(function (o, i) {
                function u(c) {
                    try {
                        a(r.next(c));
                    } catch (f) {
                        i(f);
                    }
                }
                function s(c) {
                    try {
                        a(r.throw(c));
                    } catch (f) {
                        i(f);
                    }
                }
                function a(c) {
                    c.done ? o(c.value) : l(c.value).then(u, s);
                }
                a((r = r.apply(e, t || [])).next());
            });
        },
    z3 =
        (K && K.__generator) ||
        function (e, t) {
            var n = {
                    label: 0,
                    sent: function () {
                        if (o[0] & 1) throw o[1];
                        return o[1];
                    },
                    trys: [],
                    ops: [],
                },
                r,
                l,
                o,
                i;
            return (
                (i = { next: u(0), throw: u(1), return: u(2) }),
                typeof Symbol == 'function' &&
                    (i[Symbol.iterator] = function () {
                        return this;
                    }),
                i
            );
            function u(a) {
                return function (c) {
                    return s([a, c]);
                };
            }
            function s(a) {
                if (r) throw new TypeError('Generator is already executing.');
                for (; n; )
                    try {
                        if (
                            ((r = 1),
                            l &&
                                (o =
                                    a[0] & 2
                                        ? l.return
                                        : a[0]
                                        ? l.throw || ((o = l.return) && o.call(l), 0)
                                        : l.next) &&
                                !(o = o.call(l, a[1])).done)
                        )
                            return o;
                        switch (((l = 0), o && (a = [a[0] & 2, o.value]), a[0])) {
                            case 0:
                            case 1:
                                o = a;
                                break;
                            case 4:
                                return n.label++, { value: a[1], done: !1 };
                            case 5:
                                n.label++, (l = a[1]), (a = [0]);
                                continue;
                            case 7:
                                (a = n.ops.pop()), n.trys.pop();
                                continue;
                            default:
                                if (
                                    ((o = n.trys),
                                    !(o = o.length > 0 && o[o.length - 1]) &&
                                        (a[0] === 6 || a[0] === 2))
                                ) {
                                    n = 0;
                                    continue;
                                }
                                if (a[0] === 3 && (!o || (a[1] > o[0] && a[1] < o[3]))) {
                                    n.label = a[1];
                                    break;
                                }
                                if (a[0] === 6 && n.label < o[1]) {
                                    (n.label = o[1]), (o = a);
                                    break;
                                }
                                if (o && n.label < o[2]) {
                                    (n.label = o[2]), n.ops.push(a);
                                    break;
                                }
                                o[2] && n.ops.pop(), n.trys.pop();
                                continue;
                        }
                        a = t.call(e, n);
                    } catch (c) {
                        (a = [6, c]), (l = 0);
                    } finally {
                        r = o = 0;
                    }
                if (a[0] & 5) throw a[1];
                return { value: a[0] ? a[1] : void 0, done: !0 };
            }
        },
    j3 =
        (K && K.__importDefault) ||
        function (e) {
            return e && e.__esModule ? e : { default: e };
        };
Object.defineProperty(or, '__esModule', { value: !0 });
or.useWebSocket = void 0;
var ye = m,
    gc = Ut,
    mt = ht,
    F3 = Yo,
    U3 = ti,
    W3 = j3(r1),
    yc = qt,
    b3 = function (e, t, n) {
        t === void 0 && (t = mt.DEFAULT_OPTIONS), n === void 0 && (n = !0);
        var r = (0, ye.useState)(null),
            l = r[0],
            o = r[1],
            i = (0, ye.useState)({}),
            u = i[0],
            s = i[1],
            a = (0, ye.useMemo)(
                function () {
                    if (l)
                        try {
                            return JSON.parse(l.data);
                        } catch {
                            return mt.UNPARSABLE_JSON_OBJECT;
                        }
                    return null;
                },
                [l],
            ),
            c = (0, ye.useRef)(null),
            f = (0, ye.useRef)(null),
            h = (0, ye.useRef)(function () {}),
            g = (0, ye.useRef)(0),
            S = (0, ye.useRef)([]),
            y = (0, ye.useRef)(null),
            N = (0, ye.useRef)(t);
        N.current = t;
        var p =
                c.current && u[c.current] !== void 0
                    ? u[c.current]
                    : e !== null && n === !0
                    ? mt.ReadyState.CONNECTING
                    : mt.ReadyState.UNINSTANTIATED,
            d = t.queryParams ? JSON.stringify(t.queryParams) : null,
            v = (0, ye.useCallback)(function (C, E) {
                var _;
                if (
                    (E === void 0 && (E = !0),
                    mt.isEventSourceSupported && f.current instanceof EventSource)
                ) {
                    console.warn('Unable to send a message from an eventSource');
                    return;
                }
                ((_ = f.current) === null || _ === void 0 ? void 0 : _.readyState) ===
                mt.ReadyState.OPEN
                    ? ((0, yc.assertIsWebSocket)(f.current, N.current.skipAssert),
                      f.current.send(C))
                    : E && S.current.push(C);
            }, []),
            w = (0, ye.useCallback)(
                function (C, E) {
                    E === void 0 && (E = !0), v(JSON.stringify(C), E);
                },
                [v],
            ),
            x = (0, ye.useCallback)(function () {
                return N.current.share !== !0 ||
                    (mt.isEventSourceSupported && f.current instanceof EventSource)
                    ? f.current
                    : (y.current === null &&
                          f.current &&
                          ((0, yc.assertIsWebSocket)(f.current, N.current.skipAssert),
                          (y.current = (0, W3.default)(f.current, h))),
                      y.current);
            }, []);
        return (
            (0, ye.useEffect)(
                function () {
                    if (e !== null && n === !0) {
                        var C,
                            E = !1,
                            _ = !0,
                            D = function () {
                                return I3(void 0, void 0, void 0, function () {
                                    var L, A, re;
                                    return z3(this, function (le) {
                                        switch (le.label) {
                                            case 0:
                                                return (L = c), [4, (0, U3.getUrl)(e, N)];
                                            case 1:
                                                return (
                                                    (L.current = le.sent()),
                                                    (A = function (ge) {
                                                        E ||
                                                            (0, gc.flushSync)(function () {
                                                                return o(ge);
                                                            });
                                                    }),
                                                    (re = function (ge) {
                                                        E ||
                                                            (0, gc.flushSync)(function () {
                                                                return s(function (En) {
                                                                    var it;
                                                                    return Wn(
                                                                        Wn({}, En),
                                                                        c.current &&
                                                                            ((it = {}),
                                                                            (it[c.current] = ge),
                                                                            it),
                                                                    );
                                                                });
                                                            });
                                                    }),
                                                    _ &&
                                                        (C = (0, F3.createOrJoinSocket)(
                                                            f,
                                                            c.current,
                                                            re,
                                                            N,
                                                            A,
                                                            h,
                                                            g,
                                                            v,
                                                        )),
                                                    [2]
                                                );
                                        }
                                    });
                                });
                            };
                        return (
                            (h.current = function () {
                                E || (y.current && (y.current = null), C == null || C(), D());
                            }),
                            D(),
                            function () {
                                (E = !0),
                                    (_ = !1),
                                    y.current && (y.current = null),
                                    C == null || C(),
                                    o(null);
                            }
                        );
                    } else
                        (e === null || n === !1) &&
                            ((g.current = 0),
                            s(function (L) {
                                var A;
                                return Wn(
                                    Wn({}, L),
                                    c.current &&
                                        ((A = {}), (A[c.current] = mt.ReadyState.CLOSED), A),
                                );
                            }));
                },
                [e, n, d, v],
            ),
            (0, ye.useEffect)(
                function () {
                    p === mt.ReadyState.OPEN &&
                        S.current.splice(0).forEach(function (C) {
                            v(C);
                        });
                },
                [p],
            ),
            {
                sendMessage: v,
                sendJsonMessage: w,
                lastMessage: l,
                lastJsonMessage: a,
                readyState: p,
                getWebSocket: x,
            }
        );
    };
or.useWebSocket = b3;
var ni = {},
    _o =
        (K && K.__assign) ||
        function () {
            return (
                (_o =
                    Object.assign ||
                    function (e) {
                        for (var t, n = 1, r = arguments.length; n < r; n++) {
                            t = arguments[n];
                            for (var l in t)
                                Object.prototype.hasOwnProperty.call(t, l) && (e[l] = t[l]);
                        }
                        return e;
                    }),
                _o.apply(this, arguments)
            );
        };
Object.defineProperty(ni, '__esModule', { value: !0 });
ni.useSocketIO = void 0;
var wc = m,
    H3 = or,
    B3 = ht,
    Fi = { type: 'empty', payload: null },
    V3 = function (e) {
        if (!e || !e.data) return Fi;
        var t = e.data.match(/\[.*]/);
        if (!t) return Fi;
        var n = JSON.parse(t);
        return !Array.isArray(n) || !n[1] ? Fi : { type: n[0], payload: n[1] };
    },
    $3 = function (e, t, n) {
        t === void 0 && (t = B3.DEFAULT_OPTIONS), n === void 0 && (n = !0);
        var r = (0, wc.useMemo)(function () {
                return _o(_o({}, t), { fromSocketIO: !0 });
            }, []),
            l = (0, H3.useWebSocket)(e, r, n),
            o = l.sendMessage,
            i = l.sendJsonMessage,
            u = l.lastMessage,
            s = l.readyState,
            a = l.getWebSocket,
            c = (0, wc.useMemo)(
                function () {
                    return V3(u);
                },
                [u],
            );
        return {
            sendMessage: o,
            sendJsonMessage: i,
            lastMessage: c,
            lastJsonMessage: c,
            readyState: s,
            getWebSocket: a,
        };
    };
ni.useSocketIO = $3;
var ri = {},
    Po =
        (K && K.__assign) ||
        function () {
            return (
                (Po =
                    Object.assign ||
                    function (e) {
                        for (var t, n = 1, r = arguments.length; n < r; n++) {
                            t = arguments[n];
                            for (var l in t)
                                Object.prototype.hasOwnProperty.call(t, l) && (e[l] = t[l]);
                        }
                        return e;
                    }),
                Po.apply(this, arguments)
            );
        },
    Z3 =
        (K && K.__rest) ||
        function (e, t) {
            var n = {};
            for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
            if (e != null && typeof Object.getOwnPropertySymbols == 'function')
                for (var l = 0, r = Object.getOwnPropertySymbols(e); l < r.length; l++)
                    t.indexOf(r[l]) < 0 &&
                        Object.prototype.propertyIsEnumerable.call(e, r[l]) &&
                        (n[r[l]] = e[r[l]]);
            return n;
        };
Object.defineProperty(ri, '__esModule', { value: !0 });
ri.useEventSource = void 0;
var Sc = m,
    Q3 = or,
    Ec = ht,
    G3 = function (e, t, n) {
        t === void 0 && (t = Ec.DEFAULT_EVENT_SOURCE_OPTIONS);
        var r = t.withCredentials,
            l = t.events,
            o = Z3(t, ['withCredentials', 'events']);
        n === void 0 && (n = !0);
        var i = Po(Po({}, o), { eventSourceOptions: { withCredentials: r } }),
            u = (0, Sc.useRef)(Ec.EMPTY_EVENT_HANDLERS);
        l && (u.current = l);
        var s = (0, Q3.useWebSocket)(e, i, n),
            a = s.lastMessage,
            c = s.readyState,
            f = s.getWebSocket;
        return (
            (0, Sc.useEffect)(
                function () {
                    a != null &&
                        a.type &&
                        Object.entries(u.current).forEach(function (h) {
                            var g = h[0],
                                S = h[1];
                            g === a.type && S(a);
                        });
                },
                [a],
            ),
            { lastEvent: a, readyState: c, getEventSource: f }
        );
    };
ri.useEventSource = G3;
(function (e) {
    Object.defineProperty(e, '__esModule', { value: !0 }),
        (e.resetGlobalState = e.useEventSource = e.ReadyState = e.useSocketIO = e.default = void 0);
    var t = or;
    Object.defineProperty(e, 'default', {
        enumerable: !0,
        get: function () {
            return t.useWebSocket;
        },
    });
    var n = ni;
    Object.defineProperty(e, 'useSocketIO', {
        enumerable: !0,
        get: function () {
            return n.useSocketIO;
        },
    });
    var r = ht;
    Object.defineProperty(e, 'ReadyState', {
        enumerable: !0,
        get: function () {
            return r.ReadyState;
        },
    });
    var l = ri;
    Object.defineProperty(e, 'useEventSource', {
        enumerable: !0,
        get: function () {
            return l.useEventSource;
        },
    });
    var o = qt;
    Object.defineProperty(e, 'resetGlobalState', {
        enumerable: !0,
        get: function () {
            return o.resetGlobalState;
        },
    });
})(n1);
const K3 = Tc(n1),
    Y3 = ['waiting_for_players', 'piece_placement', 'moves', 'completed'];
function X3(e) {
    const t = e;
    return (
        typeof t == 'object' &&
        typeof t.gameId == 'number' &&
        q3(t.config) &&
        J3(t.stage) &&
        typeof t.playerId == 'number' &&
        zl(t.players, ev) &&
        zl(t.pieces, Cc) &&
        zl(t.walls, tv) &&
        zl(t.deadPieces, Cc)
    );
}
function q3(e) {
    const t = e;
    return (
        typeof t == 'object' &&
        typeof t.boardColumns == 'number' &&
        typeof t.boardRows == 'number' &&
        typeof t.numberOfPlayers == 'number' &&
        typeof t.piecesPerPlayer == 'number'
    );
}
function J3(e) {
    return typeof e == 'string' && Y3.includes(e);
}
function ev(e) {
    const t = e;
    return typeof t == 'object' && typeof t.id == 'number';
}
function Cc(e) {
    const t = e;
    return (
        typeof t == 'object' &&
        typeof t.id == 'number' &&
        typeof t.owner == 'number' &&
        tl(t.position)
    );
}
function tv(e) {
    const t = e;
    return typeof t == 'object' && ju(t.position);
}
function nv(e, t) {
    const {
        lastMessage: n,
        lastJsonMessage: r,
        sendJsonMessage: l,
    } = K3(mp.urlForGame(e), {
        onOpen() {
            console.debug('Websocket - Connected');
        },
        onClose() {
            console.debug('Websocket - Disconnected');
        },
    });
    return (
        m.useEffect(() => {
            n !== null &&
                (r !== null && X3(r)
                    ? (console.debug('Websocket - message received:', r), t(r))
                    : console.warn('Websocket - message received with an invalid format:', n));
        }, [n, r]),
        m.useCallback(
            i => {
                console.debug('Websocket - message sent:', i), l(i);
            },
            [l],
        )
    );
}
function rv(e) {
    const { color: t, children: n } = e;
    return P.jsx('div', { className: `board-square ${t}`, children: n });
}
function lv(e) {
    return P.jsx('div', { className: `board-edge ${e.orientation}`, children: e.children });
}
const ov = '_boardContainer_1dsft_1',
    iv = '_boardWrapper_1dsft_13',
    uv = '_board_1dsft_1',
    sv = '_boardRow_1dsft_53',
    av = '_squareRow_1dsft_61',
    cv = '_edgeRow_1dsft_69',
    fv = '_boardCornerSpace_1dsft_79',
    Dt = {
        boardContainer: ov,
        boardWrapper: iv,
        board: uv,
        boardRow: sv,
        squareRow: av,
        edgeRow: cv,
        boardCornerSpace: fv,
    };
function dv(e) {
    function t(i) {
        var a;
        const { row: u, column: s } = i;
        return P.jsx(
            rv,
            {
                color: (u + s) % 2 === 0 ? 'black' : 'white',
                children: (a = e.createSquareContent) == null ? void 0 : a.call(e, i),
            },
            `${u}-${s}`,
        );
    }
    function n(i) {
        var h;
        const {
                square1: { row: u, column: s },
                square2: { row: a, column: c },
            } = i,
            f = i.square1.row === i.square2.row ? 'vertical' : 'horizontal';
        return P.jsx(
            lv,
            { orientation: f, children: (h = e.createEdgeContent) == null ? void 0 : h.call(e, i) },
            `${u}-${s}-${a}-${c}`,
        );
    }
    function r(i) {
        return P.jsx('div', { className: Dt.boardCornerSpace }, `corner-${i.row}-${i.column}`);
    }
    function l(i) {
        function u() {
            const a = [];
            for (let c = 0; c < e.columns; c++) {
                const f = { row: i, column: c };
                a.push(t(f)), e.haveEdges && c !== e.columns - 1 && a.push(n(qd(f)));
            }
            return P.jsx(
                'div',
                { className: `${Dt.boardRow} ${Dt.squareRow}`, children: a },
                `row-${i}`,
            );
        }
        function s() {
            if (!e.haveEdges || i === e.rows - 1) return;
            const a = [];
            for (let c = 0; c < e.columns; c++) {
                const f = { row: i, column: c };
                a.push(n(Jd(f))), c !== e.columns - 1 && a.push(r(f));
            }
            return P.jsx(
                'div',
                { className: `${Dt.boardRow} ${Dt.edgeRow}`, children: a },
                `edge-row-${i}`,
            );
        }
        return [u(), s()];
    }
    const o = Array.from({ length: e.rows }, (i, u) => u);
    return P.jsx('div', {
        className: Dt.boardContainer,
        children: P.jsx('div', {
            className: Dt.boardWrapper,
            children: P.jsx('div', { className: Dt.board, children: o.flatMap(i => l(i)) }),
        }),
    });
}
function l1(e) {
    const t = Y.players[e.player].color,
        n = Y.pieces[t],
        r = e.disabled ? n.disabled.uri : n.default.uri;
    return P.jsx('div', {
        className: 'piece',
        style: { backgroundImage: `url(${r})` },
        children: e.children,
    });
}
function pv(e) {
    return function (n) {
        function r(o) {
            var u, s;
            const i = n.piecesData.find(a => he(a.coordinate, o));
            return i
                ? P.jsx(l1, {
                      ...i,
                      children: (s = n.createSquareContent) == null ? void 0 : s.call(n, o),
                  })
                : (u = n.createSquareContent) == null
                ? void 0
                : u.call(n, o);
        }
        const l = lr(n, { piecesData: !0 });
        return P.jsx(e, { ...l, createSquareContent: r });
    };
}
function vv(e, t) {
    const n = m.useMemo(() => pv(e), [e]);
    return m.useCallback(
        function (l) {
            const o = t(),
                i = o.nextMove,
                u = o.pieces
                    .map(s => {
                        var a;
                        return {
                            coordinate:
                                ((a = i.piece) == null ? void 0 : a.id) === s.id
                                    ? i.piecePosition
                                    : s.position,
                            player: s.owner,
                            type: 'rook',
                        };
                    })
                    .concat(
                        o.deadPieces.map(s => ({
                            coordinate: s.position,
                            player: s.owner,
                            type: 'rook',
                            disabled: !0,
                        })),
                    );
            return P.jsx(n, { ...l, piecesData: u });
        },
        [n, t],
    );
}
function o1(e) {
    return P.jsx('div', { className: 'wall', children: e.children });
}
function hv(e) {
    return function (n) {
        function r(o) {
            var u, s;
            return n.wallsData.find(a => Qo(a.coordinate, o))
                ? P.jsx(o1, { children: (s = n.createEdgeContent) == null ? void 0 : s.call(n, o) })
                : (u = n.createEdgeContent) == null
                ? void 0
                : u.call(n, o);
        }
        const l = lr(n, { wallsData: !0 });
        return P.jsx(e, { ...l, createEdgeContent: r });
    };
}
function mv(e, t) {
    const n = m.useMemo(() => hv(e), [e]);
    return m.useCallback(
        function (l) {
            const o = t(),
                i = o.walls.map(u => ({ coordinate: u.position }));
            return (
                o.nextMove.wallPosition !== void 0 &&
                    i.push({ coordinate: o.nextMove.wallPosition }),
                P.jsx(n, { ...l, wallsData: i })
            );
        },
        [n, t],
    );
}
const li =
    typeof window < 'u' &&
    typeof window.document < 'u' &&
    typeof window.document.createElement < 'u';
function ir(e) {
    const t = Object.prototype.toString.call(e);
    return t === '[object Window]' || t === '[object global]';
}
function Ws(e) {
    return 'nodeType' in e;
}
function Me(e) {
    var t, n;
    return e
        ? ir(e)
            ? e
            : Ws(e) && (t = (n = e.ownerDocument) == null ? void 0 : n.defaultView) != null
            ? t
            : window
        : window;
}
function bs(e) {
    const { Document: t } = Me(e);
    return e instanceof t;
}
function fl(e) {
    return ir(e) ? !1 : e instanceof Me(e).HTMLElement;
}
function i1(e) {
    return e instanceof Me(e).SVGElement;
}
function ur(e) {
    return e
        ? ir(e)
            ? e.document
            : Ws(e)
            ? bs(e)
                ? e
                : fl(e) || i1(e)
                ? e.ownerDocument
                : document
            : document
        : document;
}
const Pt = li ? m.useLayoutEffect : m.useEffect;
function Hs(e) {
    const t = m.useRef(e);
    return (
        Pt(() => {
            t.current = e;
        }),
        m.useCallback(function () {
            for (var n = arguments.length, r = new Array(n), l = 0; l < n; l++) r[l] = arguments[l];
            return t.current == null ? void 0 : t.current(...r);
        }, [])
    );
}
function gv() {
    const e = m.useRef(null),
        t = m.useCallback((r, l) => {
            e.current = setInterval(r, l);
        }, []),
        n = m.useCallback(() => {
            e.current !== null && (clearInterval(e.current), (e.current = null));
        }, []);
    return [t, n];
}
function rl(e, t) {
    t === void 0 && (t = [e]);
    const n = m.useRef(e);
    return (
        Pt(() => {
            n.current !== e && (n.current = e);
        }, t),
        n
    );
}
function dl(e, t) {
    const n = m.useRef();
    return m.useMemo(() => {
        const r = e(n.current);
        return (n.current = r), r;
    }, [...t]);
}
function Ro(e) {
    const t = Hs(e),
        n = m.useRef(null),
        r = m.useCallback(l => {
            l !== n.current && (t == null || t(l, n.current)), (n.current = l);
        }, []);
    return [n, r];
}
function Uu(e) {
    const t = m.useRef();
    return (
        m.useEffect(() => {
            t.current = e;
        }, [e]),
        t.current
    );
}
let Ui = {};
function oi(e, t) {
    return m.useMemo(() => {
        if (t) return t;
        const n = Ui[e] == null ? 0 : Ui[e] + 1;
        return (Ui[e] = n), e + '-' + n;
    }, [e, t]);
}
function u1(e) {
    return function (t) {
        for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), l = 1; l < n; l++)
            r[l - 1] = arguments[l];
        return r.reduce(
            (o, i) => {
                const u = Object.entries(i);
                for (const [s, a] of u) {
                    const c = o[s];
                    c != null && (o[s] = c + e * a);
                }
                return o;
            },
            { ...t },
        );
    };
}
const Qn = u1(1),
    Mo = u1(-1);
function yv(e) {
    return 'clientX' in e && 'clientY' in e;
}
function s1(e) {
    if (!e) return !1;
    const { KeyboardEvent: t } = Me(e.target);
    return t && e instanceof t;
}
function wv(e) {
    if (!e) return !1;
    const { TouchEvent: t } = Me(e.target);
    return t && e instanceof t;
}
function Wu(e) {
    if (wv(e)) {
        if (e.touches && e.touches.length) {
            const { clientX: t, clientY: n } = e.touches[0];
            return { x: t, y: n };
        } else if (e.changedTouches && e.changedTouches.length) {
            const { clientX: t, clientY: n } = e.changedTouches[0];
            return { x: t, y: n };
        }
    }
    return yv(e) ? { x: e.clientX, y: e.clientY } : null;
}
const bu = Object.freeze({
        Translate: {
            toString(e) {
                if (!e) return;
                const { x: t, y: n } = e;
                return (
                    'translate3d(' +
                    (t ? Math.round(t) : 0) +
                    'px, ' +
                    (n ? Math.round(n) : 0) +
                    'px, 0)'
                );
            },
        },
        Scale: {
            toString(e) {
                if (!e) return;
                const { scaleX: t, scaleY: n } = e;
                return 'scaleX(' + t + ') scaleY(' + n + ')';
            },
        },
        Transform: {
            toString(e) {
                if (e) return [bu.Translate.toString(e), bu.Scale.toString(e)].join(' ');
            },
        },
        Transition: {
            toString(e) {
                let { property: t, duration: n, easing: r } = e;
                return t + ' ' + n + 'ms ' + r;
            },
        },
    }),
    kc =
        'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]';
function Sv(e) {
    return e.matches(kc) ? e : e.querySelector(kc);
}
const Ev = { display: 'none' };
function Cv(e) {
    let { id: t, value: n } = e;
    return Te.createElement('div', { id: t, style: Ev }, n);
}
function kv(e) {
    let { id: t, announcement: n, ariaLiveType: r = 'assertive' } = e;
    const l = {
        position: 'fixed',
        width: 1,
        height: 1,
        margin: -1,
        border: 0,
        padding: 0,
        overflow: 'hidden',
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(100%)',
        whiteSpace: 'nowrap',
    };
    return Te.createElement(
        'div',
        { id: t, style: l, role: 'status', 'aria-live': r, 'aria-atomic': !0 },
        n,
    );
}
function xv() {
    const [e, t] = m.useState('');
    return {
        announce: m.useCallback(r => {
            r != null && t(r);
        }, []),
        announcement: e,
    };
}
const a1 = m.createContext(null);
function _v(e) {
    const t = m.useContext(a1);
    m.useEffect(() => {
        if (!t) throw new Error('useDndMonitor must be used within a children of <DndContext>');
        return t(e);
    }, [e, t]);
}
function Pv() {
    const [e] = m.useState(() => new Set()),
        t = m.useCallback(r => (e.add(r), () => e.delete(r)), [e]);
    return [
        m.useCallback(
            r => {
                let { type: l, event: o } = r;
                e.forEach(i => {
                    var u;
                    return (u = i[l]) == null ? void 0 : u.call(i, o);
                });
            },
            [e],
        ),
        t,
    ];
}
const Rv = {
        draggable: `
    To pick up a draggable item, press the space bar.
    While dragging, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `,
    },
    Mv = {
        onDragStart(e) {
            let { active: t } = e;
            return 'Picked up draggable item ' + t.id + '.';
        },
        onDragOver(e) {
            let { active: t, over: n } = e;
            return n
                ? 'Draggable item ' + t.id + ' was moved over droppable area ' + n.id + '.'
                : 'Draggable item ' + t.id + ' is no longer over a droppable area.';
        },
        onDragEnd(e) {
            let { active: t, over: n } = e;
            return n
                ? 'Draggable item ' + t.id + ' was dropped over droppable area ' + n.id
                : 'Draggable item ' + t.id + ' was dropped.';
        },
        onDragCancel(e) {
            let { active: t } = e;
            return 'Dragging was cancelled. Draggable item ' + t.id + ' was dropped.';
        },
    };
function Nv(e) {
    let {
        announcements: t = Mv,
        container: n,
        hiddenTextDescribedById: r,
        screenReaderInstructions: l = Rv,
    } = e;
    const { announce: o, announcement: i } = xv(),
        u = oi('DndLiveRegion'),
        [s, a] = m.useState(!1);
    if (
        (m.useEffect(() => {
            a(!0);
        }, []),
        _v(
            m.useMemo(
                () => ({
                    onDragStart(f) {
                        let { active: h } = f;
                        o(t.onDragStart({ active: h }));
                    },
                    onDragMove(f) {
                        let { active: h, over: g } = f;
                        t.onDragMove && o(t.onDragMove({ active: h, over: g }));
                    },
                    onDragOver(f) {
                        let { active: h, over: g } = f;
                        o(t.onDragOver({ active: h, over: g }));
                    },
                    onDragEnd(f) {
                        let { active: h, over: g } = f;
                        o(t.onDragEnd({ active: h, over: g }));
                    },
                    onDragCancel(f) {
                        let { active: h, over: g } = f;
                        o(t.onDragCancel({ active: h, over: g }));
                    },
                }),
                [o, t],
            ),
        ),
        !s)
    )
        return null;
    const c = Te.createElement(
        Te.Fragment,
        null,
        Te.createElement(Cv, { id: r, value: l.draggable }),
        Te.createElement(kv, { id: u, announcement: i }),
    );
    return n ? Ut.createPortal(c, n) : c;
}
var te;
(function (e) {
    (e.DragStart = 'dragStart'),
        (e.DragMove = 'dragMove'),
        (e.DragEnd = 'dragEnd'),
        (e.DragCancel = 'dragCancel'),
        (e.DragOver = 'dragOver'),
        (e.RegisterDroppable = 'registerDroppable'),
        (e.SetDroppableDisabled = 'setDroppableDisabled'),
        (e.UnregisterDroppable = 'unregisterDroppable');
})(te || (te = {}));
function No() {}
function Lv(e, t) {
    return m.useMemo(() => ({ sensor: e, options: t ?? {} }), [e, t]);
}
function Ov() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
    return m.useMemo(() => [...t].filter(r => r != null), [...t]);
}
const ot = Object.freeze({ x: 0, y: 0 });
function Dv(e, t) {
    return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
}
function Tv(e, t) {
    let {
            data: { value: n },
        } = e,
        {
            data: { value: r },
        } = t;
    return n - r;
}
function Av(e, t) {
    let {
            data: { value: n },
        } = e,
        {
            data: { value: r },
        } = t;
    return r - n;
}
function Iv(e) {
    let { left: t, top: n, height: r, width: l } = e;
    return [
        { x: t, y: n },
        { x: t + l, y: n },
        { x: t, y: n + r },
        { x: t + l, y: n + r },
    ];
}
function zv(e, t) {
    if (!e || e.length === 0) return null;
    const [n] = e;
    return n[t];
}
function jv(e, t) {
    const n = Math.max(t.top, e.top),
        r = Math.max(t.left, e.left),
        l = Math.min(t.left + t.width, e.left + e.width),
        o = Math.min(t.top + t.height, e.top + e.height),
        i = l - r,
        u = o - n;
    if (r < l && n < o) {
        const s = t.width * t.height,
            a = e.width * e.height,
            c = i * u,
            f = c / (s + a - c);
        return Number(f.toFixed(4));
    }
    return 0;
}
const Fv = e => {
    let { collisionRect: t, droppableRects: n, droppableContainers: r } = e;
    const l = [];
    for (const o of r) {
        const { id: i } = o,
            u = n.get(i);
        if (u) {
            const s = jv(u, t);
            s > 0 && l.push({ id: i, data: { droppableContainer: o, value: s } });
        }
    }
    return l.sort(Av);
};
function Uv(e, t) {
    const { top: n, left: r, bottom: l, right: o } = t;
    return n <= e.y && e.y <= l && r <= e.x && e.x <= o;
}
const Wv = e => {
    let { droppableContainers: t, droppableRects: n, pointerCoordinates: r } = e;
    if (!r) return [];
    const l = [];
    for (const o of t) {
        const { id: i } = o,
            u = n.get(i);
        if (u && Uv(r, u)) {
            const a = Iv(u).reduce((f, h) => f + Dv(r, h), 0),
                c = Number((a / 4).toFixed(4));
            l.push({ id: i, data: { droppableContainer: o, value: c } });
        }
    }
    return l.sort(Tv);
};
function bv(e, t, n) {
    return {
        ...e,
        scaleX: t && n ? t.width / n.width : 1,
        scaleY: t && n ? t.height / n.height : 1,
    };
}
function c1(e, t) {
    return e && t ? { x: e.left - t.left, y: e.top - t.top } : ot;
}
function Hv(e) {
    return function (n) {
        for (var r = arguments.length, l = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++)
            l[o - 1] = arguments[o];
        return l.reduce(
            (i, u) => ({
                ...i,
                top: i.top + e * u.y,
                bottom: i.bottom + e * u.y,
                left: i.left + e * u.x,
                right: i.right + e * u.x,
            }),
            { ...n },
        );
    };
}
const Bv = Hv(1);
function Vv(e) {
    if (e.startsWith('matrix3d(')) {
        const t = e.slice(9, -1).split(/, /);
        return { x: +t[12], y: +t[13], scaleX: +t[0], scaleY: +t[5] };
    } else if (e.startsWith('matrix(')) {
        const t = e.slice(7, -1).split(/, /);
        return { x: +t[4], y: +t[5], scaleX: +t[0], scaleY: +t[3] };
    }
    return null;
}
function $v(e, t, n) {
    const r = Vv(t);
    if (!r) return e;
    const { scaleX: l, scaleY: o, x: i, y: u } = r,
        s = e.left - i - (1 - l) * parseFloat(n),
        a = e.top - u - (1 - o) * parseFloat(n.slice(n.indexOf(' ') + 1)),
        c = l ? e.width / l : e.width,
        f = o ? e.height / o : e.height;
    return { width: c, height: f, top: a, right: s + c, bottom: a + f, left: s };
}
const Zv = { ignoreTransform: !1 };
function pl(e, t) {
    t === void 0 && (t = Zv);
    let n = e.getBoundingClientRect();
    if (t.ignoreTransform) {
        const { transform: a, transformOrigin: c } = Me(e).getComputedStyle(e);
        a && (n = $v(n, a, c));
    }
    const { top: r, left: l, width: o, height: i, bottom: u, right: s } = n;
    return { top: r, left: l, width: o, height: i, bottom: u, right: s };
}
function xc(e) {
    return pl(e, { ignoreTransform: !0 });
}
function Qv(e) {
    const t = e.innerWidth,
        n = e.innerHeight;
    return { top: 0, left: 0, right: t, bottom: n, width: t, height: n };
}
function Gv(e, t) {
    return t === void 0 && (t = Me(e).getComputedStyle(e)), t.position === 'fixed';
}
function Kv(e, t) {
    t === void 0 && (t = Me(e).getComputedStyle(e));
    const n = /(auto|scroll|overlay)/;
    return ['overflow', 'overflowX', 'overflowY'].some(l => {
        const o = t[l];
        return typeof o == 'string' ? n.test(o) : !1;
    });
}
function Bs(e, t) {
    const n = [];
    function r(l) {
        if ((t != null && n.length >= t) || !l) return n;
        if (bs(l) && l.scrollingElement != null && !n.includes(l.scrollingElement))
            return n.push(l.scrollingElement), n;
        if (!fl(l) || i1(l) || n.includes(l)) return n;
        const o = Me(e).getComputedStyle(l);
        return l !== e && Kv(l, o) && n.push(l), Gv(l, o) ? n : r(l.parentNode);
    }
    return e ? r(e) : n;
}
function f1(e) {
    const [t] = Bs(e, 1);
    return t ?? null;
}
function Wi(e) {
    return !li || !e
        ? null
        : ir(e)
        ? e
        : Ws(e)
        ? bs(e) || e === ur(e).scrollingElement
            ? window
            : fl(e)
            ? e
            : null
        : null;
}
function d1(e) {
    return ir(e) ? e.scrollX : e.scrollLeft;
}
function p1(e) {
    return ir(e) ? e.scrollY : e.scrollTop;
}
function Hu(e) {
    return { x: d1(e), y: p1(e) };
}
var ie;
(function (e) {
    (e[(e.Forward = 1)] = 'Forward'), (e[(e.Backward = -1)] = 'Backward');
})(ie || (ie = {}));
function v1(e) {
    return !li || !e ? !1 : e === document.scrollingElement;
}
function h1(e) {
    const t = { x: 0, y: 0 },
        n = v1(e)
            ? { height: window.innerHeight, width: window.innerWidth }
            : { height: e.clientHeight, width: e.clientWidth },
        r = { x: e.scrollWidth - n.width, y: e.scrollHeight - n.height },
        l = e.scrollTop <= t.y,
        o = e.scrollLeft <= t.x,
        i = e.scrollTop >= r.y,
        u = e.scrollLeft >= r.x;
    return { isTop: l, isLeft: o, isBottom: i, isRight: u, maxScroll: r, minScroll: t };
}
const Yv = { x: 0.2, y: 0.2 };
function Xv(e, t, n, r, l) {
    let { top: o, left: i, right: u, bottom: s } = n;
    r === void 0 && (r = 10), l === void 0 && (l = Yv);
    const { isTop: a, isBottom: c, isLeft: f, isRight: h } = h1(e),
        g = { x: 0, y: 0 },
        S = { x: 0, y: 0 },
        y = { height: t.height * l.y, width: t.width * l.x };
    return (
        !a && o <= t.top + y.height
            ? ((g.y = ie.Backward), (S.y = r * Math.abs((t.top + y.height - o) / y.height)))
            : !c &&
              s >= t.bottom - y.height &&
              ((g.y = ie.Forward), (S.y = r * Math.abs((t.bottom - y.height - s) / y.height))),
        !h && u >= t.right - y.width
            ? ((g.x = ie.Forward), (S.x = r * Math.abs((t.right - y.width - u) / y.width)))
            : !f &&
              i <= t.left + y.width &&
              ((g.x = ie.Backward), (S.x = r * Math.abs((t.left + y.width - i) / y.width))),
        { direction: g, speed: S }
    );
}
function qv(e) {
    if (e === document.scrollingElement) {
        const { innerWidth: o, innerHeight: i } = window;
        return { top: 0, left: 0, right: o, bottom: i, width: o, height: i };
    }
    const { top: t, left: n, right: r, bottom: l } = e.getBoundingClientRect();
    return { top: t, left: n, right: r, bottom: l, width: e.clientWidth, height: e.clientHeight };
}
function m1(e) {
    return e.reduce((t, n) => Qn(t, Hu(n)), ot);
}
function Jv(e) {
    return e.reduce((t, n) => t + d1(n), 0);
}
function eh(e) {
    return e.reduce((t, n) => t + p1(n), 0);
}
function th(e, t) {
    if ((t === void 0 && (t = pl), !e)) return;
    const { top: n, left: r, bottom: l, right: o } = t(e);
    f1(e) &&
        (l <= 0 || o <= 0 || n >= window.innerHeight || r >= window.innerWidth) &&
        e.scrollIntoView({ block: 'center', inline: 'center' });
}
const nh = [
    ['x', ['left', 'right'], Jv],
    ['y', ['top', 'bottom'], eh],
];
class Vs {
    constructor(t, n) {
        (this.rect = void 0),
            (this.width = void 0),
            (this.height = void 0),
            (this.top = void 0),
            (this.bottom = void 0),
            (this.right = void 0),
            (this.left = void 0);
        const r = Bs(n),
            l = m1(r);
        (this.rect = { ...t }), (this.width = t.width), (this.height = t.height);
        for (const [o, i, u] of nh)
            for (const s of i)
                Object.defineProperty(this, s, {
                    get: () => {
                        const a = u(r),
                            c = l[o] - a;
                        return this.rect[s] + c;
                    },
                    enumerable: !0,
                });
        Object.defineProperty(this, 'rect', { enumerable: !1 });
    }
}
class Ir {
    constructor(t) {
        (this.target = void 0),
            (this.listeners = []),
            (this.removeAll = () => {
                this.listeners.forEach(n => {
                    var r;
                    return (r = this.target) == null ? void 0 : r.removeEventListener(...n);
                });
            }),
            (this.target = t);
    }
    add(t, n, r) {
        var l;
        (l = this.target) == null || l.addEventListener(t, n, r), this.listeners.push([t, n, r]);
    }
}
function rh(e) {
    const { EventTarget: t } = Me(e);
    return e instanceof t ? e : ur(e);
}
function bi(e, t) {
    const n = Math.abs(e.x),
        r = Math.abs(e.y);
    return typeof t == 'number'
        ? Math.sqrt(n ** 2 + r ** 2) > t
        : 'x' in t && 'y' in t
        ? n > t.x && r > t.y
        : 'x' in t
        ? n > t.x
        : 'y' in t
        ? r > t.y
        : !1;
}
var be;
(function (e) {
    (e.Click = 'click'),
        (e.DragStart = 'dragstart'),
        (e.Keydown = 'keydown'),
        (e.ContextMenu = 'contextmenu'),
        (e.Resize = 'resize'),
        (e.SelectionChange = 'selectionchange'),
        (e.VisibilityChange = 'visibilitychange');
})(be || (be = {}));
function _c(e) {
    e.preventDefault();
}
function lh(e) {
    e.stopPropagation();
}
var U;
(function (e) {
    (e.Space = 'Space'),
        (e.Down = 'ArrowDown'),
        (e.Right = 'ArrowRight'),
        (e.Left = 'ArrowLeft'),
        (e.Up = 'ArrowUp'),
        (e.Esc = 'Escape'),
        (e.Enter = 'Enter');
})(U || (U = {}));
const g1 = { start: [U.Space, U.Enter], cancel: [U.Esc], end: [U.Space, U.Enter] },
    oh = (e, t) => {
        let { currentCoordinates: n } = t;
        switch (e.code) {
            case U.Right:
                return { ...n, x: n.x + 25 };
            case U.Left:
                return { ...n, x: n.x - 25 };
            case U.Down:
                return { ...n, y: n.y + 25 };
            case U.Up:
                return { ...n, y: n.y - 25 };
        }
    };
class y1 {
    constructor(t) {
        (this.props = void 0),
            (this.autoScrollEnabled = !1),
            (this.referenceCoordinates = void 0),
            (this.listeners = void 0),
            (this.windowListeners = void 0),
            (this.props = t);
        const {
            event: { target: n },
        } = t;
        (this.props = t),
            (this.listeners = new Ir(ur(n))),
            (this.windowListeners = new Ir(Me(n))),
            (this.handleKeyDown = this.handleKeyDown.bind(this)),
            (this.handleCancel = this.handleCancel.bind(this)),
            this.attach();
    }
    attach() {
        this.handleStart(),
            this.windowListeners.add(be.Resize, this.handleCancel),
            this.windowListeners.add(be.VisibilityChange, this.handleCancel),
            setTimeout(() => this.listeners.add(be.Keydown, this.handleKeyDown));
    }
    handleStart() {
        const { activeNode: t, onStart: n } = this.props,
            r = t.node.current;
        r && th(r), n(ot);
    }
    handleKeyDown(t) {
        if (s1(t)) {
            const { active: n, context: r, options: l } = this.props,
                {
                    keyboardCodes: o = g1,
                    coordinateGetter: i = oh,
                    scrollBehavior: u = 'smooth',
                } = l,
                { code: s } = t;
            if (o.end.includes(s)) {
                this.handleEnd(t);
                return;
            }
            if (o.cancel.includes(s)) {
                this.handleCancel(t);
                return;
            }
            const { collisionRect: a } = r.current,
                c = a ? { x: a.left, y: a.top } : ot;
            this.referenceCoordinates || (this.referenceCoordinates = c);
            const f = i(t, { active: n, context: r.current, currentCoordinates: c });
            if (f) {
                const h = Mo(f, c),
                    g = { x: 0, y: 0 },
                    { scrollableAncestors: S } = r.current;
                for (const y of S) {
                    const N = t.code,
                        {
                            isTop: p,
                            isRight: d,
                            isLeft: v,
                            isBottom: w,
                            maxScroll: x,
                            minScroll: C,
                        } = h1(y),
                        E = qv(y),
                        _ = {
                            x: Math.min(
                                N === U.Right ? E.right - E.width / 2 : E.right,
                                Math.max(N === U.Right ? E.left : E.left + E.width / 2, f.x),
                            ),
                            y: Math.min(
                                N === U.Down ? E.bottom - E.height / 2 : E.bottom,
                                Math.max(N === U.Down ? E.top : E.top + E.height / 2, f.y),
                            ),
                        },
                        D = (N === U.Right && !d) || (N === U.Left && !v),
                        L = (N === U.Down && !w) || (N === U.Up && !p);
                    if (D && _.x !== f.x) {
                        const A = y.scrollLeft + h.x,
                            re = (N === U.Right && A <= x.x) || (N === U.Left && A >= C.x);
                        if (re && !h.y) {
                            y.scrollTo({ left: A, behavior: u });
                            return;
                        }
                        re
                            ? (g.x = y.scrollLeft - A)
                            : (g.x = N === U.Right ? y.scrollLeft - x.x : y.scrollLeft - C.x),
                            g.x && y.scrollBy({ left: -g.x, behavior: u });
                        break;
                    } else if (L && _.y !== f.y) {
                        const A = y.scrollTop + h.y,
                            re = (N === U.Down && A <= x.y) || (N === U.Up && A >= C.y);
                        if (re && !h.x) {
                            y.scrollTo({ top: A, behavior: u });
                            return;
                        }
                        re
                            ? (g.y = y.scrollTop - A)
                            : (g.y = N === U.Down ? y.scrollTop - x.y : y.scrollTop - C.y),
                            g.y && y.scrollBy({ top: -g.y, behavior: u });
                        break;
                    }
                }
                this.handleMove(t, Qn(Mo(f, this.referenceCoordinates), g));
            }
        }
    }
    handleMove(t, n) {
        const { onMove: r } = this.props;
        t.preventDefault(), r(n);
    }
    handleEnd(t) {
        const { onEnd: n } = this.props;
        t.preventDefault(), this.detach(), n();
    }
    handleCancel(t) {
        const { onCancel: n } = this.props;
        t.preventDefault(), this.detach(), n();
    }
    detach() {
        this.listeners.removeAll(), this.windowListeners.removeAll();
    }
}
y1.activators = [
    {
        eventName: 'onKeyDown',
        handler: (e, t, n) => {
            let { keyboardCodes: r = g1, onActivation: l } = t,
                { active: o } = n;
            const { code: i } = e.nativeEvent;
            if (r.start.includes(i)) {
                const u = o.activatorNode.current;
                return u && e.target !== u
                    ? !1
                    : (e.preventDefault(), l == null || l({ event: e.nativeEvent }), !0);
            }
            return !1;
        },
    },
];
function Pc(e) {
    return !!(e && 'distance' in e);
}
function Rc(e) {
    return !!(e && 'delay' in e);
}
class $s {
    constructor(t, n, r) {
        var l;
        r === void 0 && (r = rh(t.event.target)),
            (this.props = void 0),
            (this.events = void 0),
            (this.autoScrollEnabled = !0),
            (this.document = void 0),
            (this.activated = !1),
            (this.initialCoordinates = void 0),
            (this.timeoutId = null),
            (this.listeners = void 0),
            (this.documentListeners = void 0),
            (this.windowListeners = void 0),
            (this.props = t),
            (this.events = n);
        const { event: o } = t,
            { target: i } = o;
        (this.props = t),
            (this.events = n),
            (this.document = ur(i)),
            (this.documentListeners = new Ir(this.document)),
            (this.listeners = new Ir(r)),
            (this.windowListeners = new Ir(Me(i))),
            (this.initialCoordinates = (l = Wu(o)) != null ? l : ot),
            (this.handleStart = this.handleStart.bind(this)),
            (this.handleMove = this.handleMove.bind(this)),
            (this.handleEnd = this.handleEnd.bind(this)),
            (this.handleCancel = this.handleCancel.bind(this)),
            (this.handleKeydown = this.handleKeydown.bind(this)),
            (this.removeTextSelection = this.removeTextSelection.bind(this)),
            this.attach();
    }
    attach() {
        const {
            events: t,
            props: {
                options: { activationConstraint: n, bypassActivationConstraint: r },
            },
        } = this;
        if (
            (this.listeners.add(t.move.name, this.handleMove, { passive: !1 }),
            this.listeners.add(t.end.name, this.handleEnd),
            this.windowListeners.add(be.Resize, this.handleCancel),
            this.windowListeners.add(be.DragStart, _c),
            this.windowListeners.add(be.VisibilityChange, this.handleCancel),
            this.windowListeners.add(be.ContextMenu, _c),
            this.documentListeners.add(be.Keydown, this.handleKeydown),
            n)
        ) {
            if (
                r != null &&
                r({
                    event: this.props.event,
                    activeNode: this.props.activeNode,
                    options: this.props.options,
                })
            )
                return this.handleStart();
            if (Rc(n)) {
                this.timeoutId = setTimeout(this.handleStart, n.delay);
                return;
            }
            if (Pc(n)) return;
        }
        this.handleStart();
    }
    detach() {
        this.listeners.removeAll(),
            this.windowListeners.removeAll(),
            setTimeout(this.documentListeners.removeAll, 50),
            this.timeoutId !== null && (clearTimeout(this.timeoutId), (this.timeoutId = null));
    }
    handleStart() {
        const { initialCoordinates: t } = this,
            { onStart: n } = this.props;
        t &&
            ((this.activated = !0),
            this.documentListeners.add(be.Click, lh, { capture: !0 }),
            this.removeTextSelection(),
            this.documentListeners.add(be.SelectionChange, this.removeTextSelection),
            n(t));
    }
    handleMove(t) {
        var n;
        const { activated: r, initialCoordinates: l, props: o } = this,
            {
                onMove: i,
                options: { activationConstraint: u },
            } = o;
        if (!l) return;
        const s = (n = Wu(t)) != null ? n : ot,
            a = Mo(l, s);
        if (!r && u) {
            if (Pc(u)) {
                if (u.tolerance != null && bi(a, u.tolerance)) return this.handleCancel();
                if (bi(a, u.distance)) return this.handleStart();
            }
            return Rc(u) && bi(a, u.tolerance) ? this.handleCancel() : void 0;
        }
        t.cancelable && t.preventDefault(), i(s);
    }
    handleEnd() {
        const { onEnd: t } = this.props;
        this.detach(), t();
    }
    handleCancel() {
        const { onCancel: t } = this.props;
        this.detach(), t();
    }
    handleKeydown(t) {
        t.code === U.Esc && this.handleCancel();
    }
    removeTextSelection() {
        var t;
        (t = this.document.getSelection()) == null || t.removeAllRanges();
    }
}
const ih = { move: { name: 'pointermove' }, end: { name: 'pointerup' } };
class w1 extends $s {
    constructor(t) {
        const { event: n } = t,
            r = ur(n.target);
        super(t, ih, r);
    }
}
w1.activators = [
    {
        eventName: 'onPointerDown',
        handler: (e, t) => {
            let { nativeEvent: n } = e,
                { onActivation: r } = t;
            return !n.isPrimary || n.button !== 0 ? !1 : (r == null || r({ event: n }), !0);
        },
    },
];
const uh = { move: { name: 'mousemove' }, end: { name: 'mouseup' } };
var Bu;
(function (e) {
    e[(e.RightClick = 2)] = 'RightClick';
})(Bu || (Bu = {}));
class S1 extends $s {
    constructor(t) {
        super(t, uh, ur(t.event.target));
    }
}
S1.activators = [
    {
        eventName: 'onMouseDown',
        handler: (e, t) => {
            let { nativeEvent: n } = e,
                { onActivation: r } = t;
            return n.button === Bu.RightClick ? !1 : (r == null || r({ event: n }), !0);
        },
    },
];
const Hi = { move: { name: 'touchmove' }, end: { name: 'touchend' } };
class sh extends $s {
    constructor(t) {
        super(t, Hi);
    }
    static setup() {
        return (
            window.addEventListener(Hi.move.name, t, { capture: !1, passive: !1 }),
            function () {
                window.removeEventListener(Hi.move.name, t);
            }
        );
        function t() {}
    }
}
sh.activators = [
    {
        eventName: 'onTouchStart',
        handler: (e, t) => {
            let { nativeEvent: n } = e,
                { onActivation: r } = t;
            const { touches: l } = n;
            return l.length > 1 ? !1 : (r == null || r({ event: n }), !0);
        },
    },
];
var zr;
(function (e) {
    (e[(e.Pointer = 0)] = 'Pointer'), (e[(e.DraggableRect = 1)] = 'DraggableRect');
})(zr || (zr = {}));
var Lo;
(function (e) {
    (e[(e.TreeOrder = 0)] = 'TreeOrder'), (e[(e.ReversedTreeOrder = 1)] = 'ReversedTreeOrder');
})(Lo || (Lo = {}));
function ah(e) {
    let {
        acceleration: t,
        activator: n = zr.Pointer,
        canScroll: r,
        draggingRect: l,
        enabled: o,
        interval: i = 5,
        order: u = Lo.TreeOrder,
        pointerCoordinates: s,
        scrollableAncestors: a,
        scrollableAncestorRects: c,
        delta: f,
        threshold: h,
    } = e;
    const g = fh({ delta: f, disabled: !o }),
        [S, y] = gv(),
        N = m.useRef({ x: 0, y: 0 }),
        p = m.useRef({ x: 0, y: 0 }),
        d = m.useMemo(() => {
            switch (n) {
                case zr.Pointer:
                    return s ? { top: s.y, bottom: s.y, left: s.x, right: s.x } : null;
                case zr.DraggableRect:
                    return l;
            }
        }, [n, l, s]),
        v = m.useRef(null),
        w = m.useCallback(() => {
            const C = v.current;
            if (!C) return;
            const E = N.current.x * p.current.x,
                _ = N.current.y * p.current.y;
            C.scrollBy(E, _);
        }, []),
        x = m.useMemo(() => (u === Lo.TreeOrder ? [...a].reverse() : a), [u, a]);
    m.useEffect(() => {
        if (!o || !a.length || !d) {
            y();
            return;
        }
        for (const C of x) {
            if ((r == null ? void 0 : r(C)) === !1) continue;
            const E = a.indexOf(C),
                _ = c[E];
            if (!_) continue;
            const { direction: D, speed: L } = Xv(C, _, d, t, h);
            for (const A of ['x', 'y']) g[A][D[A]] || ((L[A] = 0), (D[A] = 0));
            if (L.x > 0 || L.y > 0) {
                y(), (v.current = C), S(w, i), (N.current = L), (p.current = D);
                return;
            }
        }
        (N.current = { x: 0, y: 0 }), (p.current = { x: 0, y: 0 }), y();
    }, [t, w, r, y, o, i, JSON.stringify(d), JSON.stringify(g), S, a, x, c, JSON.stringify(h)]);
}
const ch = {
    x: { [ie.Backward]: !1, [ie.Forward]: !1 },
    y: { [ie.Backward]: !1, [ie.Forward]: !1 },
};
function fh(e) {
    let { delta: t, disabled: n } = e;
    const r = Uu(t);
    return dl(
        l => {
            if (n || !r || !l) return ch;
            const o = { x: Math.sign(t.x - r.x), y: Math.sign(t.y - r.y) };
            return {
                x: {
                    [ie.Backward]: l.x[ie.Backward] || o.x === -1,
                    [ie.Forward]: l.x[ie.Forward] || o.x === 1,
                },
                y: {
                    [ie.Backward]: l.y[ie.Backward] || o.y === -1,
                    [ie.Forward]: l.y[ie.Forward] || o.y === 1,
                },
            };
        },
        [n, t, r],
    );
}
function dh(e, t) {
    const n = t !== null ? e.get(t) : void 0,
        r = n ? n.node.current : null;
    return dl(
        l => {
            var o;
            return t === null ? null : (o = r ?? l) != null ? o : null;
        },
        [r, t],
    );
}
function ph(e, t) {
    return m.useMemo(
        () =>
            e.reduce((n, r) => {
                const { sensor: l } = r,
                    o = l.activators.map(i => ({
                        eventName: i.eventName,
                        handler: t(i.handler, r),
                    }));
                return [...n, ...o];
            }, []),
        [e, t],
    );
}
var ll;
(function (e) {
    (e[(e.Always = 0)] = 'Always'),
        (e[(e.BeforeDragging = 1)] = 'BeforeDragging'),
        (e[(e.WhileDragging = 2)] = 'WhileDragging');
})(ll || (ll = {}));
var Vu;
(function (e) {
    e.Optimized = 'optimized';
})(Vu || (Vu = {}));
const Mc = new Map();
function vh(e, t) {
    let { dragging: n, dependencies: r, config: l } = t;
    const [o, i] = m.useState(null),
        { frequency: u, measure: s, strategy: a } = l,
        c = m.useRef(e),
        f = N(),
        h = rl(f),
        g = m.useCallback(
            function (p) {
                p === void 0 && (p = []),
                    !h.current &&
                        i(d => (d === null ? p : d.concat(p.filter(v => !d.includes(v)))));
            },
            [h],
        ),
        S = m.useRef(null),
        y = dl(
            p => {
                if (f && !n) return Mc;
                if (!p || p === Mc || c.current !== e || o != null) {
                    const d = new Map();
                    for (let v of e) {
                        if (!v) continue;
                        if (o && o.length > 0 && !o.includes(v.id) && v.rect.current) {
                            d.set(v.id, v.rect.current);
                            continue;
                        }
                        const w = v.node.current,
                            x = w ? new Vs(s(w), w) : null;
                        (v.rect.current = x), x && d.set(v.id, x);
                    }
                    return d;
                }
                return p;
            },
            [e, o, n, f, s],
        );
    return (
        m.useEffect(() => {
            c.current = e;
        }, [e]),
        m.useEffect(() => {
            f || g();
        }, [n, f]),
        m.useEffect(() => {
            o && o.length > 0 && i(null);
        }, [JSON.stringify(o)]),
        m.useEffect(() => {
            f ||
                typeof u != 'number' ||
                S.current !== null ||
                (S.current = setTimeout(() => {
                    g(), (S.current = null);
                }, u));
        }, [u, f, g, ...r]),
        { droppableRects: y, measureDroppableContainers: g, measuringScheduled: o != null }
    );
    function N() {
        switch (a) {
            case ll.Always:
                return !1;
            case ll.BeforeDragging:
                return n;
            default:
                return !n;
        }
    }
}
function E1(e, t) {
    return dl(n => (e ? n || (typeof t == 'function' ? t(e) : e) : null), [t, e]);
}
function hh(e, t) {
    return E1(e, t);
}
function mh(e) {
    let { callback: t, disabled: n } = e;
    const r = Hs(t),
        l = m.useMemo(() => {
            if (n || typeof window > 'u' || typeof window.MutationObserver > 'u') return;
            const { MutationObserver: o } = window;
            return new o(r);
        }, [r, n]);
    return m.useEffect(() => () => (l == null ? void 0 : l.disconnect()), [l]), l;
}
function ii(e) {
    let { callback: t, disabled: n } = e;
    const r = Hs(t),
        l = m.useMemo(() => {
            if (n || typeof window > 'u' || typeof window.ResizeObserver > 'u') return;
            const { ResizeObserver: o } = window;
            return new o(r);
        }, [n]);
    return m.useEffect(() => () => (l == null ? void 0 : l.disconnect()), [l]), l;
}
function gh(e) {
    return new Vs(pl(e), e);
}
function Nc(e, t, n) {
    t === void 0 && (t = gh);
    const [r, l] = m.useReducer(u, null),
        o = mh({
            callback(s) {
                if (e)
                    for (const a of s) {
                        const { type: c, target: f } = a;
                        if (c === 'childList' && f instanceof HTMLElement && f.contains(e)) {
                            l();
                            break;
                        }
                    }
            },
        }),
        i = ii({ callback: l });
    return (
        Pt(() => {
            l(),
                e
                    ? (i == null || i.observe(e),
                      o == null || o.observe(document.body, { childList: !0, subtree: !0 }))
                    : (i == null || i.disconnect(), o == null || o.disconnect());
        }, [e]),
        r
    );
    function u(s) {
        if (!e) return null;
        if (e.isConnected === !1) {
            var a;
            return (a = s ?? n) != null ? a : null;
        }
        const c = t(e);
        return JSON.stringify(s) === JSON.stringify(c) ? s : c;
    }
}
function yh(e) {
    const t = E1(e);
    return c1(e, t);
}
const Lc = [];
function wh(e) {
    const t = m.useRef(e),
        n = dl(
            r =>
                e
                    ? r && r !== Lc && e && t.current && e.parentNode === t.current.parentNode
                        ? r
                        : Bs(e)
                    : Lc,
            [e],
        );
    return (
        m.useEffect(() => {
            t.current = e;
        }, [e]),
        n
    );
}
function Sh(e) {
    const [t, n] = m.useState(null),
        r = m.useRef(e),
        l = m.useCallback(o => {
            const i = Wi(o.target);
            i && n(u => (u ? (u.set(i, Hu(i)), new Map(u)) : null));
        }, []);
    return (
        m.useEffect(() => {
            const o = r.current;
            if (e !== o) {
                i(o);
                const u = e
                    .map(s => {
                        const a = Wi(s);
                        return a
                            ? (a.addEventListener('scroll', l, { passive: !0 }), [a, Hu(a)])
                            : null;
                    })
                    .filter(s => s != null);
                n(u.length ? new Map(u) : null), (r.current = e);
            }
            return () => {
                i(e), i(o);
            };
            function i(u) {
                u.forEach(s => {
                    const a = Wi(s);
                    a == null || a.removeEventListener('scroll', l);
                });
            }
        }, [l, e]),
        m.useMemo(
            () =>
                e.length ? (t ? Array.from(t.values()).reduce((o, i) => Qn(o, i), ot) : m1(e)) : ot,
            [e, t],
        )
    );
}
function Oc(e, t) {
    t === void 0 && (t = []);
    const n = m.useRef(null);
    return (
        m.useEffect(() => {
            n.current = null;
        }, t),
        m.useEffect(() => {
            const r = e !== ot;
            r && !n.current && (n.current = e), !r && n.current && (n.current = null);
        }, [e]),
        n.current ? Mo(e, n.current) : ot
    );
}
function Eh(e) {
    m.useEffect(
        () => {
            if (!li) return;
            const t = e.map(n => {
                let { sensor: r } = n;
                return r.setup == null ? void 0 : r.setup();
            });
            return () => {
                for (const n of t) n == null || n();
            };
        },
        e.map(t => {
            let { sensor: n } = t;
            return n;
        }),
    );
}
function Ch(e, t) {
    return m.useMemo(
        () =>
            e.reduce((n, r) => {
                let { eventName: l, handler: o } = r;
                return (
                    (n[l] = i => {
                        o(i, t);
                    }),
                    n
                );
            }, {}),
        [e, t],
    );
}
function C1(e) {
    return m.useMemo(() => (e ? Qv(e) : null), [e]);
}
const Bi = [];
function kh(e, t) {
    t === void 0 && (t = pl);
    const [n] = e,
        r = C1(n ? Me(n) : null),
        [l, o] = m.useReducer(u, Bi),
        i = ii({ callback: o });
    return (
        e.length > 0 && l === Bi && o(),
        Pt(() => {
            e.length
                ? e.forEach(s => (i == null ? void 0 : i.observe(s)))
                : (i == null || i.disconnect(), o());
        }, [e]),
        l
    );
    function u() {
        return e.length ? e.map(s => (v1(s) ? r : new Vs(t(s), s))) : Bi;
    }
}
function xh(e) {
    if (!e) return null;
    if (e.children.length > 1) return e;
    const t = e.children[0];
    return fl(t) ? t : e;
}
function _h(e) {
    let { measure: t } = e;
    const [n, r] = m.useState(null),
        l = m.useCallback(
            a => {
                for (const { target: c } of a)
                    if (fl(c)) {
                        r(f => {
                            const h = t(c);
                            return f ? { ...f, width: h.width, height: h.height } : h;
                        });
                        break;
                    }
            },
            [t],
        ),
        o = ii({ callback: l }),
        i = m.useCallback(
            a => {
                const c = xh(a);
                o == null || o.disconnect(), c && (o == null || o.observe(c)), r(c ? t(c) : null);
            },
            [t, o],
        ),
        [u, s] = Ro(i);
    return m.useMemo(() => ({ nodeRef: u, rect: n, setRef: s }), [n, u, s]);
}
const Ph = [
        { sensor: w1, options: {} },
        { sensor: y1, options: {} },
    ],
    Rh = { current: {} },
    Kl = {
        draggable: { measure: xc },
        droppable: { measure: xc, strategy: ll.WhileDragging, frequency: Vu.Optimized },
        dragOverlay: { measure: pl },
    };
class jr extends Map {
    get(t) {
        var n;
        return t != null && (n = super.get(t)) != null ? n : void 0;
    }
    toArray() {
        return Array.from(this.values());
    }
    getEnabled() {
        return this.toArray().filter(t => {
            let { disabled: n } = t;
            return !n;
        });
    }
    getNodeFor(t) {
        var n, r;
        return (n = (r = this.get(t)) == null ? void 0 : r.node.current) != null ? n : void 0;
    }
}
const Mh = {
        activatorEvent: null,
        active: null,
        activeNode: null,
        activeNodeRect: null,
        collisions: null,
        containerNodeRect: null,
        draggableNodes: new Map(),
        droppableRects: new Map(),
        droppableContainers: new jr(),
        over: null,
        dragOverlay: { nodeRef: { current: null }, rect: null, setRef: No },
        scrollableAncestors: [],
        scrollableAncestorRects: [],
        measuringConfiguration: Kl,
        measureDroppableContainers: No,
        windowRect: null,
        measuringScheduled: !1,
    },
    Nh = {
        activatorEvent: null,
        activators: [],
        active: null,
        activeNodeRect: null,
        ariaDescribedById: { draggable: '' },
        dispatch: No,
        draggableNodes: new Map(),
        over: null,
        measureDroppableContainers: No,
    },
    ui = m.createContext(Nh),
    Lh = m.createContext(Mh);
function Oh() {
    return {
        draggable: {
            active: null,
            initialCoordinates: { x: 0, y: 0 },
            nodes: new Map(),
            translate: { x: 0, y: 0 },
        },
        droppable: { containers: new jr() },
    };
}
function Dh(e, t) {
    switch (t.type) {
        case te.DragStart:
            return {
                ...e,
                draggable: {
                    ...e.draggable,
                    initialCoordinates: t.initialCoordinates,
                    active: t.active,
                },
            };
        case te.DragMove:
            return e.draggable.active
                ? {
                      ...e,
                      draggable: {
                          ...e.draggable,
                          translate: {
                              x: t.coordinates.x - e.draggable.initialCoordinates.x,
                              y: t.coordinates.y - e.draggable.initialCoordinates.y,
                          },
                      },
                  }
                : e;
        case te.DragEnd:
        case te.DragCancel:
            return {
                ...e,
                draggable: {
                    ...e.draggable,
                    active: null,
                    initialCoordinates: { x: 0, y: 0 },
                    translate: { x: 0, y: 0 },
                },
            };
        case te.RegisterDroppable: {
            const { element: n } = t,
                { id: r } = n,
                l = new jr(e.droppable.containers);
            return l.set(r, n), { ...e, droppable: { ...e.droppable, containers: l } };
        }
        case te.SetDroppableDisabled: {
            const { id: n, key: r, disabled: l } = t,
                o = e.droppable.containers.get(n);
            if (!o || r !== o.key) return e;
            const i = new jr(e.droppable.containers);
            return (
                i.set(n, { ...o, disabled: l }),
                { ...e, droppable: { ...e.droppable, containers: i } }
            );
        }
        case te.UnregisterDroppable: {
            const { id: n, key: r } = t,
                l = e.droppable.containers.get(n);
            if (!l || r !== l.key) return e;
            const o = new jr(e.droppable.containers);
            return o.delete(n), { ...e, droppable: { ...e.droppable, containers: o } };
        }
        default:
            return e;
    }
}
function Th(e) {
    let { disabled: t } = e;
    const { active: n, activatorEvent: r, draggableNodes: l } = m.useContext(ui),
        o = Uu(r),
        i = Uu(n == null ? void 0 : n.id);
    return (
        m.useEffect(() => {
            if (!t && !r && o && i != null) {
                if (!s1(o) || document.activeElement === o.target) return;
                const u = l.get(i);
                if (!u) return;
                const { activatorNode: s, node: a } = u;
                if (!s.current && !a.current) return;
                requestAnimationFrame(() => {
                    for (const c of [s.current, a.current]) {
                        if (!c) continue;
                        const f = Sv(c);
                        if (f) {
                            f.focus();
                            break;
                        }
                    }
                });
            }
        }, [r, t, l, i, o]),
        null
    );
}
function Ah(e, t) {
    let { transform: n, ...r } = t;
    return e != null && e.length ? e.reduce((l, o) => o({ transform: l, ...r }), n) : n;
}
function Ih(e) {
    return m.useMemo(
        () => ({
            draggable: { ...Kl.draggable, ...(e == null ? void 0 : e.draggable) },
            droppable: { ...Kl.droppable, ...(e == null ? void 0 : e.droppable) },
            dragOverlay: { ...Kl.dragOverlay, ...(e == null ? void 0 : e.dragOverlay) },
        }),
        [
            e == null ? void 0 : e.draggable,
            e == null ? void 0 : e.droppable,
            e == null ? void 0 : e.dragOverlay,
        ],
    );
}
function zh(e) {
    let { activeNode: t, measure: n, initialRect: r, config: l = !0 } = e;
    const o = m.useRef(!1),
        { x: i, y: u } = typeof l == 'boolean' ? { x: l, y: l } : l;
    Pt(() => {
        if ((!i && !u) || !t) {
            o.current = !1;
            return;
        }
        if (o.current || !r) return;
        const a = t == null ? void 0 : t.node.current;
        if (!a || a.isConnected === !1) return;
        const c = n(a),
            f = c1(c, r);
        if (
            (i || (f.x = 0),
            u || (f.y = 0),
            (o.current = !0),
            Math.abs(f.x) > 0 || Math.abs(f.y) > 0)
        ) {
            const h = f1(a);
            h && h.scrollBy({ top: f.y, left: f.x });
        }
    }, [t, i, u, r, n]);
}
const k1 = m.createContext({ ...ot, scaleX: 1, scaleY: 1 });
var zt;
(function (e) {
    (e[(e.Uninitialized = 0)] = 'Uninitialized'),
        (e[(e.Initializing = 1)] = 'Initializing'),
        (e[(e.Initialized = 2)] = 'Initialized');
})(zt || (zt = {}));
const jh = m.memo(function (t) {
        var n, r, l, o;
        let {
            id: i,
            accessibility: u,
            autoScroll: s = !0,
            children: a,
            sensors: c = Ph,
            collisionDetection: f = Fv,
            measuring: h,
            modifiers: g,
            ...S
        } = t;
        const y = m.useReducer(Dh, void 0, Oh),
            [N, p] = y,
            [d, v] = Pv(),
            [w, x] = m.useState(zt.Uninitialized),
            C = w === zt.Initialized,
            {
                draggable: { active: E, nodes: _, translate: D },
                droppable: { containers: L },
            } = N,
            A = E ? _.get(E) : null,
            re = m.useRef({ initial: null, translated: null }),
            le = m.useMemo(() => {
                var se;
                return E != null
                    ? {
                          id: E,
                          data: (se = A == null ? void 0 : A.data) != null ? se : Rh,
                          rect: re,
                      }
                    : null;
            }, [E, A]),
            ge = m.useRef(null),
            [En, it] = m.useState(null),
            [Ne, R] = m.useState(null),
            O = rl(S, Object.values(S)),
            T = oi('DndDescribedBy', i),
            B = m.useMemo(() => L.getEnabled(), [L]),
            F = Ih(h),
            {
                droppableRects: Ge,
                measureDroppableContainers: Ue,
                measuringScheduled: Cn,
            } = vh(B, { dragging: C, dependencies: [D.x, D.y], config: F.droppable }),
            J = dh(_, E),
            nn = m.useMemo(() => (Ne ? Wu(Ne) : null), [Ne]),
            Zs = T1(),
            Qs = hh(J, F.draggable.measure);
        zh({
            activeNode: E ? _.get(E) : null,
            config: Zs.layoutShiftCompensation,
            initialRect: Qs,
            measure: F.draggable.measure,
        });
        const Ke = Nc(J, F.draggable.measure, Qs),
            si = Nc(J ? J.parentElement : null),
            rn = m.useRef({
                activatorEvent: null,
                active: null,
                activeNode: J,
                collisionRect: null,
                collisions: null,
                droppableRects: Ge,
                draggableNodes: _,
                draggingNode: null,
                draggingNodeRect: null,
                droppableContainers: L,
                over: null,
                scrollableAncestors: [],
                scrollAdjustedTranslate: null,
            }),
            Gs = L.getNodeFor((n = rn.current.over) == null ? void 0 : n.id),
            ln = _h({ measure: F.dragOverlay.measure }),
            vl = (r = ln.nodeRef.current) != null ? r : J,
            kn = C ? ((l = ln.rect) != null ? l : Ke) : null,
            Ks = !!(ln.nodeRef.current && ln.rect),
            Ys = yh(Ks ? null : Ke),
            ai = C1(vl ? Me(vl) : null),
            Mt = wh(C ? Gs ?? J : null),
            hl = kh(Mt),
            ml = Ah(g, {
                transform: { x: D.x - Ys.x, y: D.y - Ys.y, scaleX: 1, scaleY: 1 },
                activatorEvent: Ne,
                active: le,
                activeNodeRect: Ke,
                containerNodeRect: si,
                draggingNodeRect: kn,
                over: rn.current.over,
                overlayNodeRect: ln.rect,
                scrollableAncestors: Mt,
                scrollableAncestorRects: hl,
                windowRect: ai,
            }),
            Xs = nn ? Qn(nn, D) : null,
            qs = Sh(Mt),
            P1 = Oc(qs),
            R1 = Oc(qs, [Ke]),
            xn = Qn(ml, P1),
            _n = kn ? Bv(kn, ml) : null,
            sr =
                le && _n
                    ? f({
                          active: le,
                          collisionRect: _n,
                          droppableRects: Ge,
                          droppableContainers: B,
                          pointerCoordinates: Xs,
                      })
                    : null,
            Js = zv(sr, 'id'),
            [Nt, ea] = m.useState(null),
            M1 = Ks ? ml : Qn(ml, R1),
            N1 = bv(M1, (o = Nt == null ? void 0 : Nt.rect) != null ? o : null, Ke),
            ta = m.useCallback(
                (se, Le) => {
                    let { sensor: Oe, options: Lt } = Le;
                    if (ge.current == null) return;
                    const We = _.get(ge.current);
                    if (!We) return;
                    const Ye = se.nativeEvent,
                        ut = new Oe({
                            active: ge.current,
                            activeNode: We,
                            event: Ye,
                            options: Lt,
                            context: rn,
                            onStart(Xe) {
                                const ar = ge.current;
                                if (ar == null) return;
                                const cr = _.get(ar);
                                if (!cr) return;
                                const { onDragStart: gl } = O.current,
                                    yl = { active: { id: ar, data: cr.data, rect: re } };
                                Ut.unstable_batchedUpdates(() => {
                                    gl == null || gl(yl),
                                        x(zt.Initializing),
                                        p({
                                            type: te.DragStart,
                                            initialCoordinates: Xe,
                                            active: ar,
                                        }),
                                        d({ type: 'onDragStart', event: yl });
                                });
                            },
                            onMove(Xe) {
                                p({ type: te.DragMove, coordinates: Xe });
                            },
                            onEnd: Pn(te.DragEnd),
                            onCancel: Pn(te.DragCancel),
                        });
                    Ut.unstable_batchedUpdates(() => {
                        it(ut), R(se.nativeEvent);
                    });
                    function Pn(Xe) {
                        return async function () {
                            const {
                                active: cr,
                                collisions: gl,
                                over: yl,
                                scrollAdjustedTranslate: ra,
                            } = rn.current;
                            let fr = null;
                            if (cr && ra) {
                                const { cancelDrop: dr } = O.current;
                                (fr = {
                                    activatorEvent: Ye,
                                    active: cr,
                                    collisions: gl,
                                    delta: ra,
                                    over: yl,
                                }),
                                    Xe === te.DragEnd &&
                                        typeof dr == 'function' &&
                                        (await Promise.resolve(dr(fr))) &&
                                        (Xe = te.DragCancel);
                            }
                            (ge.current = null),
                                Ut.unstable_batchedUpdates(() => {
                                    p({ type: Xe }),
                                        x(zt.Uninitialized),
                                        ea(null),
                                        it(null),
                                        R(null);
                                    const dr = Xe === te.DragEnd ? 'onDragEnd' : 'onDragCancel';
                                    if (fr) {
                                        const ci = O.current[dr];
                                        ci == null || ci(fr), d({ type: dr, event: fr });
                                    }
                                });
                        };
                    }
                },
                [_],
            ),
            L1 = m.useCallback(
                (se, Le) => (Oe, Lt) => {
                    const We = Oe.nativeEvent,
                        Ye = _.get(Lt);
                    if (ge.current !== null || !Ye || We.dndKit || We.defaultPrevented) return;
                    const ut = { active: Ye };
                    se(Oe, Le.options, ut) === !0 &&
                        ((We.dndKit = { capturedBy: Le.sensor }), (ge.current = Lt), ta(Oe, Le));
                },
                [_, ta],
            ),
            na = ph(c, L1);
        Eh(c),
            Pt(() => {
                Ke && w === zt.Initializing && x(zt.Initialized);
            }, [Ke, w]),
            m.useEffect(() => {
                const { onDragMove: se } = O.current,
                    { active: Le, activatorEvent: Oe, collisions: Lt, over: We } = rn.current;
                if (!Le || !Oe) return;
                const Ye = {
                    active: Le,
                    activatorEvent: Oe,
                    collisions: Lt,
                    delta: { x: xn.x, y: xn.y },
                    over: We,
                };
                Ut.unstable_batchedUpdates(() => {
                    se == null || se(Ye), d({ type: 'onDragMove', event: Ye });
                });
            }, [xn.x, xn.y]),
            m.useEffect(() => {
                const {
                    active: se,
                    activatorEvent: Le,
                    collisions: Oe,
                    droppableContainers: Lt,
                    scrollAdjustedTranslate: We,
                } = rn.current;
                if (!se || ge.current == null || !Le || !We) return;
                const { onDragOver: Ye } = O.current,
                    ut = Lt.get(Js),
                    Pn =
                        ut && ut.rect.current
                            ? {
                                  id: ut.id,
                                  rect: ut.rect.current,
                                  data: ut.data,
                                  disabled: ut.disabled,
                              }
                            : null,
                    Xe = {
                        active: se,
                        activatorEvent: Le,
                        collisions: Oe,
                        delta: { x: We.x, y: We.y },
                        over: Pn,
                    };
                Ut.unstable_batchedUpdates(() => {
                    ea(Pn), Ye == null || Ye(Xe), d({ type: 'onDragOver', event: Xe });
                });
            }, [Js]),
            Pt(() => {
                (rn.current = {
                    activatorEvent: Ne,
                    active: le,
                    activeNode: J,
                    collisionRect: _n,
                    collisions: sr,
                    droppableRects: Ge,
                    draggableNodes: _,
                    draggingNode: vl,
                    draggingNodeRect: kn,
                    droppableContainers: L,
                    over: Nt,
                    scrollableAncestors: Mt,
                    scrollAdjustedTranslate: xn,
                }),
                    (re.current = { initial: kn, translated: _n });
            }, [le, J, sr, _n, _, vl, kn, Ge, L, Nt, Mt, xn]),
            ah({
                ...Zs,
                delta: D,
                draggingRect: _n,
                pointerCoordinates: Xs,
                scrollableAncestors: Mt,
                scrollableAncestorRects: hl,
            });
        const O1 = m.useMemo(
                () => ({
                    active: le,
                    activeNode: J,
                    activeNodeRect: Ke,
                    activatorEvent: Ne,
                    collisions: sr,
                    containerNodeRect: si,
                    dragOverlay: ln,
                    draggableNodes: _,
                    droppableContainers: L,
                    droppableRects: Ge,
                    over: Nt,
                    measureDroppableContainers: Ue,
                    scrollableAncestors: Mt,
                    scrollableAncestorRects: hl,
                    measuringConfiguration: F,
                    measuringScheduled: Cn,
                    windowRect: ai,
                }),
                [le, J, Ke, Ne, sr, si, ln, _, L, Ge, Nt, Ue, Mt, hl, F, Cn, ai],
            ),
            D1 = m.useMemo(
                () => ({
                    activatorEvent: Ne,
                    activators: na,
                    active: le,
                    activeNodeRect: Ke,
                    ariaDescribedById: { draggable: T },
                    dispatch: p,
                    draggableNodes: _,
                    over: Nt,
                    measureDroppableContainers: Ue,
                }),
                [Ne, na, le, Ke, p, T, _, Nt, Ue],
            );
        return Te.createElement(
            a1.Provider,
            { value: v },
            Te.createElement(
                ui.Provider,
                { value: D1 },
                Te.createElement(
                    Lh.Provider,
                    { value: O1 },
                    Te.createElement(k1.Provider, { value: N1 }, a),
                ),
                Te.createElement(Th, { disabled: (u == null ? void 0 : u.restoreFocus) === !1 }),
            ),
            Te.createElement(Nv, { ...u, hiddenTextDescribedById: T }),
        );
        function T1() {
            const se = (En == null ? void 0 : En.autoScrollEnabled) === !1,
                Le = typeof s == 'object' ? s.enabled === !1 : s === !1,
                Oe = C && !se && !Le;
            return typeof s == 'object' ? { ...s, enabled: Oe } : { enabled: Oe };
        }
    }),
    Fh = m.createContext(null),
    Dc = 'button',
    Uh = 'Droppable';
function Wh(e) {
    let { id: t, data: n, disabled: r = !1, attributes: l } = e;
    const o = oi(Uh),
        {
            activators: i,
            activatorEvent: u,
            active: s,
            activeNodeRect: a,
            ariaDescribedById: c,
            draggableNodes: f,
            over: h,
        } = m.useContext(ui),
        { role: g = Dc, roleDescription: S = 'draggable', tabIndex: y = 0 } = l ?? {},
        N = (s == null ? void 0 : s.id) === t,
        p = m.useContext(N ? k1 : Fh),
        [d, v] = Ro(),
        [w, x] = Ro(),
        C = Ch(i, t),
        E = rl(n);
    Pt(
        () => (
            f.set(t, { id: t, key: o, node: d, activatorNode: w, data: E }),
            () => {
                const D = f.get(t);
                D && D.key === o && f.delete(t);
            }
        ),
        [f, t],
    );
    const _ = m.useMemo(
        () => ({
            role: g,
            tabIndex: y,
            'aria-disabled': r,
            'aria-pressed': N && g === Dc ? !0 : void 0,
            'aria-roledescription': S,
            'aria-describedby': c.draggable,
        }),
        [r, g, y, N, S, c.draggable],
    );
    return {
        active: s,
        activatorEvent: u,
        activeNodeRect: a,
        attributes: _,
        isDragging: N,
        listeners: r ? void 0 : C,
        node: d,
        over: h,
        setNodeRef: v,
        setActivatorNodeRef: x,
        transform: p,
    };
}
const bh = 'Droppable',
    Hh = { timeout: 25 };
function Bh(e) {
    let { data: t, disabled: n = !1, id: r, resizeObserverConfig: l } = e;
    const o = oi(bh),
        { active: i, dispatch: u, over: s, measureDroppableContainers: a } = m.useContext(ui),
        c = m.useRef({ disabled: n }),
        f = m.useRef(!1),
        h = m.useRef(null),
        g = m.useRef(null),
        { disabled: S, updateMeasurementsFor: y, timeout: N } = { ...Hh, ...l },
        p = rl(y ?? r),
        d = m.useCallback(() => {
            if (!f.current) {
                f.current = !0;
                return;
            }
            g.current != null && clearTimeout(g.current),
                (g.current = setTimeout(() => {
                    a(Array.isArray(p.current) ? p.current : [p.current]), (g.current = null);
                }, N));
        }, [N]),
        v = ii({ callback: d, disabled: S || !i }),
        w = m.useCallback(
            (_, D) => {
                v && (D && (v.unobserve(D), (f.current = !1)), _ && v.observe(_));
            },
            [v],
        ),
        [x, C] = Ro(w),
        E = rl(t);
    return (
        m.useEffect(() => {
            !v || !x.current || (v.disconnect(), (f.current = !1), v.observe(x.current));
        }, [x, v]),
        Pt(
            () => (
                u({
                    type: te.RegisterDroppable,
                    element: { id: r, key: o, disabled: n, node: x, rect: h, data: E },
                }),
                () => u({ type: te.UnregisterDroppable, key: o, id: r })
            ),
            [r],
        ),
        m.useEffect(() => {
            n !== c.current.disabled &&
                (u({ type: te.SetDroppableDisabled, id: r, key: o, disabled: n }),
                (c.current.disabled = n));
        }, [r, o, n, u]),
        {
            active: i,
            rect: h,
            isOver: (s == null ? void 0 : s.id) === r,
            node: x,
            over: s,
            setNodeRef: C,
        }
    );
}
function Vh(e) {
    return function (n) {
        const [r, l] = m.useState([]),
            o = Ov(Lv(S1, { activationConstraint: { distance: 10 } }));
        function i(c) {
            var f;
            return P.jsx($h, {
                coord: c,
                canDrag: n.moveblePositions.find(h => he(h, c)) !== void 0,
                canDrop: r.find(h => he(h, c)) !== void 0,
                children: (f = n.createSquareContent) == null ? void 0 : f.call(n, c),
            });
        }
        function u(c) {
            const f = c.active.data.current;
            l(n.destinationsFrom(f.origin));
        }
        function s(c) {
            var g;
            const f = c.active.data.current,
                h = (g = c.over) == null ? void 0 : g.data.current;
            l([]),
                !(!f || !h) &&
                    n.destinationsFrom(f.origin).find(S => he(S, h.destination)) &&
                    n.onMove(f.origin, h.destination);
        }
        const a = lr(n, { destinationsFrom: !0, moveblePositions: !0, onMove: !0 });
        return P.jsxs(jh, {
            sensors: o,
            onDragEnd: s,
            onDragStart: u,
            collisionDetection: Wv,
            children: [P.jsx(e, { ...a, createSquareContent: i }), ';'],
        });
    };
}
function $h(e) {
    const {
            attributes: t,
            listeners: n,
            setNodeRef: r,
            transform: l,
        } = Wh({
            id: `drag-${e.coord.row}-${e.coord.column}`,
            data: { origin: e.coord },
            disabled: !e.canDrag,
        }),
        o = l ? { transform: bu.Translate.toString(l) } : void 0,
        { isOver: i, setNodeRef: u } = Bh({
            id: `drop-${e.coord.row}-${e.coord.column}`,
            data: { destination: e.coord },
            disabled: !e.canDrop,
        });
    return P.jsx('div', {
        className: `dnd ${e.canDrop ? 'droppable' : ''} ${i ? 'over' : ''}`,
        ref: u,
        children: P.jsx('div', {
            className: `dnd ${e.canDrag ? 'draggable' : ''}`,
            ref: r,
            style: o,
            ...n,
            ...t,
            children: e.children,
        }),
    });
}
function Zh(e, t, n) {
    const r = m.useMemo(() => Vh(e), [e]);
    return m.useCallback(
        function (o) {
            const i = t(),
                u = i.getPiecesThatCanMove().map(c => c.position),
                s = c => {
                    const f = i.getPieceFromPosition(c);
                    return f !== void 0 ? i.possibleDestinations(f) : [];
                },
                a = (c, f) => {
                    const h = i.getPieceFromPosition(c);
                    h !== void 0 && i.canMoveTo(h, f) && n().setNextMovePiece(h, f);
                };
            return P.jsx(r, { ...o, moveblePositions: u, destinationsFrom: s, onMove: a });
        },
        [r, n, t],
    );
}
function x1(e, t) {
    return function (r) {
        function l(i) {
            var u, s;
            return r.highlighted.find(a => Xd(a, i))
                ? P.jsx('div', {
                      className: 'highlight',
                      children: (s = r[t]) == null ? void 0 : s.call(r, i),
                  })
                : (u = r[t]) == null
                ? void 0
                : u.call(r, i);
        }
        const o = lr(r, { highlighted: !0 });
        return P.jsx(e, { ...o, [t]: l });
    };
}
function Qh(e, t) {
    return Kh(Gh(e, t), t);
}
function Gh(e, t) {
    const n = m.useMemo(() => x1(e, 'createSquareContent'), [e]);
    return m.useCallback(
        function (l) {
            var s, a;
            const o = t(),
                i = m.useRef(o.pieces),
                u = m.useRef([]);
            for (const c of i.current) {
                const f = c.position,
                    h =
                        ((s = o.pieces.find(g => g.id === c.id)) == null ? void 0 : s.position) ||
                        ((a = o.deadPieces.find(g => g.id === c.id)) == null ? void 0 : a.position);
                h && !he(f, h) && (u.current = [f, h]);
            }
            return (i.current = o.pieces), P.jsx(n, { ...l, highlighted: u.current });
        },
        [n, t],
    );
}
function Kh(e, t) {
    const n = m.useMemo(() => x1(e, 'createEdgeContent'), [e]);
    return m.useCallback(
        function (l) {
            const o = t();
            let i = m.useRef(o.walls),
                u = m.useRef([]);
            for (const s of o.walls)
                i.current.find(a => Qo(a.position, s.position)) || (u.current = [s.position]);
            return (i.current = o.walls), P.jsx(n, { ...l, highlighted: u.current });
        },
        [n, t],
    );
}
function _1(e, t) {
    return function (r) {
        function l(i) {
            var u, s;
            return r.placebleCoordinates.find(a => Xd(a, i)) === void 0
                ? (u = r[t]) == null
                    ? void 0
                    : u.call(r, i)
                : P.jsx(Yh, {
                      placeble: r.placeble,
                      onClick: () => r.onPlace(i),
                      children: (s = r[t]) == null ? void 0 : s.call(r, i),
                  });
        }
        const o = lr(r, { onPlace: !0, placeble: !0, placebleCoordinates: !0 });
        return P.jsx(e, { ...o, [t]: l });
    };
}
function Yh(e) {
    const t = e.placeble;
    return P.jsxs('div', {
        className: 'placeble-area-container',
        children: [
            e.children,
            P.jsx('div', {
                className: 'placeble-area',
                onClick: e.onClick,
                children: P.jsx(t, {}),
            }),
        ],
    });
}
function Xh(e, t, n, r) {
    const l = m.useMemo(() => _1(e, 'createSquareContent'), [e]);
    return m.useCallback(
        function (i) {
            const u = t(),
                s = u.availableSquaresForPlacingPiece(),
                a = m.useCallback(
                    () => P.jsx(l1, { player: u.playerId, type: 'rook' }),
                    [u.playerId],
                );
            function c(f) {
                u.canPlacePiece(f) && n().addPiece(u.playerId, f, r);
            }
            return P.jsx(l, { ...i, placeble: a, placebleCoordinates: s, onPlace: c });
        },
        [l, t, n, r],
    );
}
function qh(e, t, n, r) {
    const l = m.useMemo(() => _1(e, 'createEdgeContent'), [e]);
    return m.useCallback(
        function (i) {
            const u = t();
            function s(f) {
                return P.jsx(o1, { children: f.children });
            }
            const a = u.availableEdgesForPlacingWalls();
            function c(f) {
                n().setNextMoveWall(f), n().commitMove(r);
            }
            return P.jsx(l, { ...i, placeble: s, placebleCoordinates: a, onPlace: c });
        },
        [l, n, t, r],
    );
}
function Jh(e) {
    return function (n) {
        const [r, l] = m.useState(void 0),
            [o, i] = m.useState([]);
        function u(a) {
            var c;
            return P.jsx(tm, {
                isSelected: r !== void 0 && he(a, r),
                isHighlighted: o.find(f => he(a, f)) !== void 0,
                handleClick: em(a, n, r, l, i),
                children: (c = n.createSquareContent) == null ? void 0 : c.call(n, a),
            });
        }
        const s = lr(n, { destinationsFrom: !0, moveblePositions: !0, onMove: !0 });
        return P.jsx(e, { ...s, createSquareContent: u });
    };
}
const em = (e, t, n, r, l) => () => {
    if (n) r(void 0), l([]), t.destinationsFrom(n).find(o => he(o, e)) && t.onMove(n, e);
    else {
        if (!!!t.moveblePositions.find(i => he(i, e))) return;
        r(e), l(t.destinationsFrom(e));
    }
};
function tm(e) {
    const { isSelected: t, isHighlighted: n, handleClick: r } = e;
    return P.jsx('div', {
        className: `click-movement ${t ? 'selected' : ''} ${n ? 'highlighted' : ''}`,
        onClick: r,
        children: e.children,
    });
}
function nm(e, t, n) {
    const r = m.useMemo(() => Jh(e), [e]);
    return m.useCallback(
        function (o) {
            const i = t(),
                u = i.getPiecesThatCanMove().map(c => c.position),
                s = c => {
                    const f = i.getPieceFromPosition(c);
                    return f !== void 0 ? i.possibleDestinations(f) : [];
                },
                a = (c, f) => {
                    const h = i.getPieceFromPosition(c);
                    h !== void 0 && i.canMoveTo(h, f) && n().setNextMovePiece(h, f);
                };
            return P.jsx(r, { ...o, moveblePositions: u, destinationsFrom: s, onMove: a });
        },
        [r, n, t],
    );
}
function rm(e) {
    return P.jsx(r3, { children: P.jsx(lm, { ...e }) });
}
function lm(e) {
    const t = t3(),
        n = n3(),
        r = Ap(t),
        l = Vp(n),
        o = hc(r),
        i = hc(l);
    Pp(Object.values(Y.pieces).flatMap(c => [c.default.uri, c.disabled.uri]));
    function u(c) {
        l.updateFromServer(c);
    }
    const s = nv(e.gameId, u),
        a = om(o, i, s);
    return P.jsx(a, { rows: e.board.rows, columns: e.board.columns, haveEdges: !0 });
}
function om(e, t, n) {
    let r = dv;
    return (
        (r = qh(r, e, t, n)),
        (r = nm(r, e, t)),
        (r = Xh(r, e, t, n)),
        (r = Qh(r, e)),
        (r = Zh(r, e, t)),
        (r = mv(r, e)),
        (r = vv(r, e)),
        r
    );
}
function im(e) {
    const [t, n] = m.useState({
        players: e.defaultPlayers,
        piecesPerPlayer: e.defaultPiecesPerPlayer,
        gameId: void 0,
    });
    function r(s) {
        let a = Number.parseInt(s.target.value);
        (a = Math.min(e.maxPlayers, a)),
            (a = Math.max(e.minPlayers, a)),
            n(c => ({ ...c, players: a }));
    }
    function l(s) {
        let a = Number.parseInt(s.target.value);
        (a = Math.min(e.maxPiecesPerPlayer, a)),
            (a = Math.max(e.minPiecesPerPlayer, a)),
            n(c => ({ ...c, piecesPerPlayer: a }));
    }
    function o(s) {
        const a = s.target.value;
        let c;
        Rp(a) ? ((c = Number.parseInt(a)), (c = Math.max(0, c))) : (c = void 0),
            n(f => ({ ...f, gameId: c }));
    }
    function i(s) {
        s.preventDefault(), e.createGame(t.players, t.piecesPerPlayer);
    }
    function u(s) {
        s.preventDefault(), e.joinGame(t.gameId || 0);
    }
    return P.jsxs('div', {
        className: 'access-game',
        children: [
            P.jsxs('form', {
                className: 'create-new-game',
                onSubmit: i,
                children: [
                    P.jsx('h3', { children: 'Criar novo jogo' }),
                    P.jsxs('label', {
                        children: [
                            'Jogadores',
                            P.jsx('select', {
                                value: t.players,
                                onChange: r,
                                children: vc(e.minPlayers, e.maxPlayers).map(s =>
                                    P.jsx('option', { value: s, children: s }, s),
                                ),
                            }),
                        ],
                    }),
                    P.jsxs('label', {
                        children: [
                            'Peças por jogador',
                            P.jsx('select', {
                                value: t.piecesPerPlayer,
                                onChange: l,
                                children: vc(e.minPiecesPerPlayer, e.maxPiecesPerPlayer).map(s =>
                                    P.jsx('option', { value: s, children: s }, s),
                                ),
                            }),
                        ],
                    }),
                    P.jsx('input', { type: 'submit', value: 'Criar' }),
                ],
            }),
            P.jsx('hr', {}),
            P.jsxs('form', {
                className: 'join-existing-game',
                onSubmit: u,
                children: [
                    P.jsx('h3', { children: 'Entrar em um jogo' }),
                    P.jsxs('label', {
                        children: [
                            'ID',
                            P.jsx('input', {
                                type: 'number',
                                value: t.gameId === void 0 ? '' : t.gameId,
                                onChange: o,
                            }),
                        ],
                    }),
                    P.jsx('input', {
                        type: 'submit',
                        value: 'Entrar',
                        disabled: t.gameId === void 0,
                    }),
                ],
            }),
        ],
    });
}
function um() {
    return P.jsx(Dp, { children: P.jsx(sm, {}) });
}
function sm(e) {
    const t = Lp(),
        n = Op();
    function r(i, u) {
        n(Sp(i, u));
    }
    function l(i) {
        n(xp(i));
    }
    const o = t.games.at(0);
    return o && !o.isCreating
        ? P.jsxs(P.Fragment, {
              children: [
                  P.jsxs('p', {
                      style: { textAlign: 'center' },
                      children: ['Game ID: ', o.gameId],
                  }),
                  P.jsx(rm, {
                      gameId: o.gameId,
                      board: { rows: Y.boardSize.rows, columns: Y.boardSize.columns },
                  }),
              ],
          })
        : P.jsx(im, {
              maxPlayers: Y.maxNumberOfPlayers,
              minPlayers: Y.minNumberOfPlayers,
              defaultPlayers: Y.defaultNumberOfPlayers,
              maxPiecesPerPlayer: Y.maxPiecesPerPlayer,
              minPiecesPerPlayer: Y.minPiecesPerPlayer,
              defaultPiecesPerPlayer: Y.defaultPiecesPerPlayer,
              createGame: r,
              joinGame: l,
          });
}
function am() {
    return P.jsxs('div', {
        className: 'App',
        children: [P.jsx('h1', { children: 'Rooks And Walls' }), P.jsx(um, {})],
    });
}
const cm = Vi.createRoot(document.getElementById('root'));
cm.render(P.jsx(Te.StrictMode, { children: P.jsx(am, {}) }));
