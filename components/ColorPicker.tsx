'use client';

import { CATEGORY_COLORS, DEFAULT_COLOR } from "@/lib/category-options";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export type ColorPickerProps = {
    value?: string;
    onChange: (color: string) => void;
};

const ColorPicker = ({ value, onChange }: ColorPickerProps) => {

    return (
        <Select onValueChange={onChange} value={value}>
            <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Choisissez une couleur" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Colors</SelectLabel>
                    {
                        CATEGORY_COLORS.map((color) => (
                            <SelectItem key={color} value={color} className="cursor-pointer">
                                <span
                                    className="block size-6 rounded-full"
                                    style={{ backgroundColor: color }}
                                /> {color}
                            </SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>

    );
};

export default ColorPicker;
