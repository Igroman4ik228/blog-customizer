import clsx from 'clsx';
import { FormEvent, useEffect, useRef, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	currentState: ArticleStateType;
	setCurrentState: (state: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	currentState,
	setCurrentState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState<ArticleStateType>(currentState);
	const asideRef = useRef<HTMLDivElement>(null);

	const toggleOpen = () => setIsOpen((prev) => !prev);

	// Обработчик клика вне формы
	const handleClickOutside = (event: MouseEvent) => {
		if (
			asideRef.current &&
			event.target instanceof Node &&
			!asideRef.current.contains(event.target)
		)
			setIsOpen(false);
	};

	// Добавляем/убираем слушатель событий при открытии/закрытии формы
	useEffect(() => {
		if (!isOpen) return;
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen]);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCurrentState(formState);
	};

	const handleReset = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		setCurrentState(defaultArticleState);
	};

	const updateFormState = (
		key: keyof ArticleStateType,
		value: ArticleStateType[keyof ArticleStateType]
	) => {
		setFormState((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleOpen} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				aria-hidden={!isOpen}
				aria-expanded={isOpen}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}
					aria-label='Форма настройки параметров статьи'>
					<Text
						children='Задайте параметры'
						as='h2'
						size={31}
						weight={800}
						uppercase
					/>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => updateFormState('fontFamilyOption', option)}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) => updateFormState('fontSizeOption', option)}
						title='Размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={(option) => updateFormState('fontColor', option)}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(option) => updateFormState('backgroundColor', option)}
						title='Цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(option) => updateFormState('contentWidth', option)}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
