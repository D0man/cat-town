// ImageRadioSelector.tsx 

type Color = "pink" | "blue" | "gray";
type Shade = 50 | 100 | 200 | 300 | 400 | 500;
export interface Option {
    value: string;
    label: string;
    image: string; // Can be emoji or image URL
    activeBgColor?: `bg-${Color}-${Shade}`
    activeBorderColor?: `border-${Color}-${Shade}`;
}

interface ImageRadioSelectorProps {
    name: string;
    options: Option[];
    value: string;
    onChange: (value: string) => void;
}

export function ImageRadioSelector({
    name,
    options,
    value,
    onChange
}: ImageRadioSelectorProps) {
    return (
        <fieldset className="flex gap-4 flex-wrap justify-center">
            <legend className="text-xl">Chose your character:</legend>
            {options.map((option) => {
                const isSelected = value === option.value;
                const activeBorder = option.activeBorderColor || 'border-blue-500';
                const activeBg = option.activeBgColor || 'bg-blue-50';

                return (
                    <label
                        key={option.value}
                        className={`cursor-pointer flex max-w-xs flex-col items-center p-4 border-2 rounded-lg transition-all shadow-lg ${isSelected
                            ? `${activeBorder} ${activeBg}`
                            : 'border-gray-300 hover:border-gray-500'
                            }`}
                    >
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={isSelected}
                            onChange={(e) => onChange(e.target.value)}
                            className="sr-only"
                        />

                        <img
                            src={option.image}
                            alt={option.label}
                            className="mb-2 object-cover"
                        />


                        <span className="text-sm font-medium">{option.label}</span>
                    </label>
                );
            })}
        </fieldset>
    );
}