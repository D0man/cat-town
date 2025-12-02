//GenderSelector.tsx
import { ImageRadioSelector, type Option } from "@components/ImageRadioSelector";
import FemaleImg from '@assets/femaleselect.png';
import MaleImg from '@assets/maleselect.png';
interface GenderSelectorProps {
    value: 'male' | 'female';
    onChange: (value: 'male' | 'female') => void;
}

export function GenderSelector({ value, onChange }: GenderSelectorProps) {
    const genderOptions = [
        {
            value: 'male', label: 'Male', image: MaleImg, activeBorderColor: 'border-blue-300',
            activeBgColor: 'bg-blue-500'
        },
        {
            value: 'female', label: 'Female', image: FemaleImg, activeBorderColor: 'border-pink-300',
            activeBgColor: 'bg-pink-50'
        },
    ] satisfies Option[];

    return (
        <ImageRadioSelector
            name="gender"
            options={genderOptions}
            value={value}
            onChange={(val) => onChange(val as 'male' | 'female')}
        />
    );
}