/**
 * Custom ESLint rule: disallow BigInt values in @tanstack/react-query query keys.
 * BigInt values are not serializable and can cause unexpected cache key behavior.
 */
export default {
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow BigInt values in React Query query keys',
            recommended: true,
        },
        schema: [],
        messages: {
            noBigInt:
                'BigInt values should not be used in query keys. Convert to string with .toString() instead.',
        },
    },
    create(context) {
        function checkForBigInt(node) {
            if (!node) return;
            if (node.type === 'BigIntLiteral' || node.type === 'Literal' && typeof node.value === 'bigint') {
                context.report({ node, messageId: 'noBigInt' });
                return;
            }
            if (node.type === 'ArrayExpression' && node.elements) {
                node.elements.forEach(el => el && checkForBigInt(el));
            }
        }

        return {
            CallExpression(node) {
                const callee = node.callee;
                const isUseQuery =
                    (callee.type === 'Identifier' && callee.name === 'useQuery') ||
                    (callee.type === 'MemberExpression' &&
                        callee.property.type === 'Identifier' &&
                        callee.property.name === 'useQuery');

                if (!isUseQuery) return;

                const firstArg = node.arguments[0];
                if (!firstArg || firstArg.type !== 'ObjectExpression') return;

                const queryKeyProp = firstArg.properties.find(
                    p =>
                        p.type === 'Property' &&
                        p.key.type === 'Identifier' &&
                        p.key.name === 'queryKey'
                );

                if (queryKeyProp && queryKeyProp.type === 'Property') {
                    checkForBigInt(queryKeyProp.value);
                }
            },
        };
    },
};
