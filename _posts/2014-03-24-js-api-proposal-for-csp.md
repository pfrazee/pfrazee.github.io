---
layout: post
title: Javascript API proposal for CSP
---

<style>strong { color: gray; }</style>

While conversing with Mike West, I was told there's a need for JS API proposals for CSPs. Since this is an interest of mine, I thought I'd take a crack at it. He pointed me to a few reference points to get started:

 - [Use-Case Zero](http://infrequently.org/2013/05/use-case-zero/)
 - [An Extensible Approach to Browser Security Policy](http://yehudakatz.com/2013/05/24/an-extensible-approach-to-browser-security-policy/)

To collect their suggestions, the API should be reflectable, perhaps be event-based (an "approval hook") and give clear opportunities for prollyfill-style extension. There are plenty of ways to approach this (for instance, as Yehuda Katz suggests, intercepting the network stack behaviors). For this first pass, I've opted to closely follow the existing CSP design, and to focus on an generic interface which can be reapplied for new use-cases.

This is a quick first pass to get the conversation started. I'm still learning WebIDL, so I apologize in advance for any syntax mistakes.

<br>

### Deprecated: SecurityPolicy API

Previously, a `SecurityPolicy` API gave some reflection. For reference:

```c#
interface SecurityPolicy {
  readonly attribute bool allowsEval;
  readonly attribute bool allowsInlineScript;
  readonly attribute bool allowsInlineStyle;
  readonly attribute bool isActive;
}
```

<br>

### Example usage

A small set of examples in the proposed API:

```js
document.addSecurityPolicy('img-src', 'none');
document.getSecurityPolicies('img-src');
/* => [
  { policy: 'none' }
]*/

document.addSecurityPolicy('script-src', 'host', 'cdn.bar.com');
document.addSecurityPolicy('script-src', [{policy: 'host', value: 'cdn.foo.com'}, {policy: 'self'}]);
document.addSecurityPolicy('script-src', 'nonce', '41jk58jkdf837h1');
document.getSecurityPolicies('script-src');
/* => [
  { policy: 'host', value: 'cdn.bar.com' },
  { policy: 'host', value: 'cdn.foo.com' },
  { policy: 'self' },
  { policy: 'nonce', value: '41jk58jkdf837h1' }
] */
document.removeSecurityPolicy('script-src', 'host', 'cdn.foo.com');
document.getSecurityPolicies('script-src');
/* => [
  { policy: 'host', value: 'cdn.bar.com' },
  { policy: 'self' },
  { policy: 'nonce', value: '41jk58jkdf837h1' }
] */

document.addSecurityPolicy('style-src', function(e) {
  if (e.detail.action == 'fetch' && e.detail.url != 'https://foo.com/safe.css') {
    // security violation
    e.preventDefault();
  }
});
document.getSecurityPolicies('style-src');
/* => [
  { policy: 'user-defined', onaccess: [Function] }
] */
```

<br>

### Proposed: SecurityDirectiveConsumer API

This interface applies to APIs which need to make security/access decisions, and do so by reflecting on directives.

```c#
interface SecurityDirectiveConsumer {
  readonly attribute SecurityDirective[] securityDirectives;
  SecurityDirective    addSecurityPolicy     (DOMString directiveName, DOMString policyName, DOMString policyValue);
  SecurityDirective    addSecurityPolicy     (DOMString directiveName, SecurityDirectivePolicyInit[] policies);
  SecurityDirective    addSecurityPolicy     (DOMString directiveName, SecurityDirectivePolicyEventHandler onaccess);
  SecurityDirective[]  getSecurityPolicies   (DOMString directiveName);
  boolean              removeSecurityPolicy  (DOMString directiveName);
};
exception SecurityDirectiveNameError { };
```

Implementers may include `Document` and `Worker`. The interpretation of policies and directives is at the discretion of the consumer. Each implemented consumer has its own set of valid directive names (those which it interprets) and policy type/values which apply to each directive.

 - If an invalid directive name is given, `addSecurityDirective` throws `SecurityDirectiveNameError`.

Removing a directive disables it. (Is it a good idea to implement "directive-freezing"?)

<br>

### Proposed: SecurityDirective API

This interface refers to a CSP directive, eg `script-src` and `sandbox`. It maps a directive name to a list of directive policies, and is only used internally by a directive consumer.

```c#
[Constructor(DOMString name, optional SecurityDirectivePolicyInit[] policies)]
interface SecurityDirective {
  readonly   attribute DOMString                 name;
  readonly   attribute SecurityDirectivePolicy[] policies;
  SecurityDirectivePolicy  addPolicy    (SecurityDirectivePolicyInit policyInitDict);
  boolean                  removePolicy (SecurityDirectivePolicy policy);
};
```

Some notable characteristics:

 - `addPolicy` instantiates the policy, adds it to `policies`, then returns the policy object.
 - `removePolicy(SecurityDirectivePolicy)` searches for the object reference value of `policy` in `policies` and removes it, returning true if found and false otherwise.

<br>

### Proposed: SecurityDirectivePolicy API

This interface refers to &ndash; or, in the case of a handler function, defines &ndash; a CSP policy to be used in a directive. It pairs a policy name with a policy value, and must be interpretted by the consumer.

```c#
[Constructor(SecurityDirectivePolicyInit policyInitDict)]
interface SecurityDirectivePolicy {
  readonly   attribute DOMString  policy;
  readonly   attribute DOMString? value;
  readonly   attribute SecurityDirectivePolicyEventHandler? onaccess;
};

dictionary SecurityDirectivePolicyInit {
  DOMString  policy;
  DOMString? value;
  SecurityDirectivePolicyEventHandler? onaccess;
};

[Callback=FunctionOnly, NoInterfaceObject] interface SecurityDirectivePolicyEventHandler {
   void onaccess(SecurityPolicyAccessEvent e);
};

interface SecurityPolicyAccessEvent : Event {
  readonly attribute any detail;
};
```

The only standard value for `policy` is `'user-defined'`, in which case `onaccess` should be used. The `onaccess` function receives a `SecurityPolicyAccessEvent` with information necessary to make the security decision. If `preventDefault()` is called on the given event, the violation-error handling is triggered. (There is no mechanism here for providing an alternative behavior or resource.)

All other policy values are interpretted by the `SecurityDirectiveConsumer`. For the existing spec, valid values might include:

 - none, self, unsafe-inline, unsafe-eval
 - scheme (`value` should be a URI scheme)
 - host (`value` should be a URI)
 - nonce (`value` should be the nonce-value)
 - hash (`value` should be the hash-algo + base64-value)
 - media-type (`value` should be a mimetype - for `plugin-types` directive)
 - allow-forms, allow-pointer-lock, allow-popups, allow-same-origin, allow-scripts, allow-top-navigation (for `sandbox` directive)
 - never, default, origin, always (for `referrer` directive)
 - allow, block, filter (for `reflected-xss` directive)

<br>

### Closing

This pass aims for simplicity. It defines a standard interface for hooking into the security decisions of Browser APIs, and tries to impose only the opinions from the existing spec.

Please send responses and suggestions to public-webappsec or <a href="https://twitter.com/pfrazee">@pfrazee</a>.


~pfrazee