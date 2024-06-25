import { useEffect, useRef } from 'react';

// 첫 렌더링 시 실행되지 않는 Effect
const useDidMountEffect = (func, deps) => {
	const didMount = useRef(false);

	useEffect(() => {
		if (didMount.current) func();
		else didMount.current = true;
	}, deps);
};

export default useDidMountEffect;