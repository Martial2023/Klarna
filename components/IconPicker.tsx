'use client';

import { useMemo } from "react";
import { CATEGORY_ICONS, type IconOption, DEFAULT_ICON } from "@/lib/category-options";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export type IconPickerProps = {
    value?: string;
    onChange: (iconValue: string) => void;
};

const IconPicker = ({ value, onChange }: IconPickerProps) => {
    const selectedIcon = useMemo<IconOption>(() => {
        const fallback = DEFAULT_ICON;
        if (!value) {
            return fallback;
        }
        return CATEGORY_ICONS.find((icon) => icon.value === value) ?? fallback;
    }, [value]);

    const SelectedIcon = selectedIcon.Icon;

    return (
        <Select onValueChange={onChange} value={value}>
            <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Choisissez une icône" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Icons</SelectLabel>
                    {
                        CATEGORY_ICONS.map(({ value: optionValue, Icon, label }) => (
                            <SelectItem key={optionValue} value={optionValue} className="cursor-pointer">
                                <Icon className="size-6" /> {label}
                            </SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default IconPicker;
