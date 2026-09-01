import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef, FormEvent } from 'react';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';
import { clsx } from 'clsx';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	onApply: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	onApply,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const handleArrowClick = () => {
		setIsOpen((prevIsOpen) => !prevIsOpen);
	};

	const [formState, setFormState] = useState<ArticleStateType>(articleState);

	useOutsideClickClose({
		isOpen,
		rootRef: containerRef,
		onChange: setIsOpen,
	});

	const handleFieldChange =
		(key: keyof ArticleStateType) => (value: OptionType) => {
			setFormState((prevState) => ({ ...prevState, [key]: value }));
		};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formState);
	};

	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<div ref={containerRef}>
			<ArrowButton isOpen={isOpen} onClick={handleArrowClick} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFieldChange('fontFamilyOption')}
						title='шрифт'
					/>

					<RadioGroup
						name='fontSize'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleFieldChange('fontSizeOption')}
						title='размер шрифта'
					/>

					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleFieldChange('fontColor')}
						title='цвет шрифта'
					/>

					<Separator />

					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleFieldChange('backgroundColor')}
						title='цвет фона'
					/>

					<RadioGroup
						name='contentWidth'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleFieldChange('contentWidth')}
						title='ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
