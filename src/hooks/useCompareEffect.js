import React from 'react';
import {equals as deepEqual} from 'ramda';

// eslint-disable-next-line func-style,no-unused-vars
function checkDeps(deps) {
	if (!deps || !deps.length) {
		throw new Error(
			'useDeepCompareEffect should not be used with no dependencies. Use React.useEffect instead.',
		);
	}
	if (deps.every(isPrimitive)) {
		throw new Error(
			'useDeepCompareEffect should not be used with dependencies that are all primitive values. Use React.useEffect instead.',
		);
	}
}

// eslint-disable-next-line func-style
function isPrimitive(val) {
	// eslint-disable-next-line no-eq-null
	return val == null || /^[sbn]/.test(typeof val);
}

// eslint-disable-next-line func-style
function useDeepCompareMemoize(value) {
	const ref = React.useRef();

	if (!deepEqual(value, ref.current)) {
		ref.current = value;
	}

	return ref.current;
}

// eslint-disable-next-line id-blacklist,func-style
function useCompareEffect(callback, dependencies) {
	if (process.env.NODE_ENV !== 'production') {
		//    CheckDeps(dependencies)
	}
	React.useEffect(callback, useDeepCompareMemoize(dependencies));
}

// eslint-disable-next-line id-blacklist,func-style
export function useDeepCompareEffectNoCheck(callback, dependencies) {
	React.useEffect(callback, useDeepCompareMemoize(dependencies));
}

export default useCompareEffect;
