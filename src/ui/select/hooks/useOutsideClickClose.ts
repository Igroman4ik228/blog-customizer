import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
}: UseOutsideClickClose) => {
	const handleClick = (event: MouseEvent) => {
		const { target } = event;
		if (target instanceof Node && !rootRef.current?.contains(target)) {
			if (isOpen) {
				onClose?.();
				onChange(false);
			}
		}
	};

	useEffect(() => {
		if (!isOpen) return;
		window.addEventListener('mousedown', handleClick);
		return () => window.removeEventListener('mousedown', handleClick);
	}, [handleClick, isOpen]);
};
