/**
 * Custom ESLint rule: require InternetIdentityProvider to be present in the tree
 * when useInternetIdentity hook is used.
 */
export default {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Require InternetIdentityProvider when using useInternetIdentity hook',
            recommended: true,
        },
        schema: [],
        messages: {
            missingProvider:
                'useInternetIdentity must be used inside an <InternetIdentityProvider>. Make sure it wraps your component tree.',
        },
    },
    create(_context) {
        // This rule is a placeholder — enforcing provider presence statically
        // requires full component tree analysis (not supported in simple AST rules).
        // It serves as documentation and can be extended with custom logic.
        return {};
    },
};
