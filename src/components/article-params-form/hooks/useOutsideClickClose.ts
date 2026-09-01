import { useEffect, RefObject } from 'react';

type UseOutsideClickCloseParams = {
	isOpen: boolean;
	rootRef: RefObject<HTMLDivElement>;
	onChange: (newValue: boolean) => void;
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onChange,
}: UseOutsideClickCloseParams) => {
	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handleClickOutside = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				onChange(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, rootRef, onChange]);
};
