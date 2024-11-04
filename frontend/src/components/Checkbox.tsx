import { Entypo } from "@expo/vector-icons";
import clsx from "clsx";
import { FC, useState } from "react";
import { useController } from "react-hook-form";
import { Pressable, StyleSheet } from "react-native";

interface CheckboxProps {
    name: string;
    control: any;
    className?: string;
}

export const Checkbox: FC<CheckboxProps> = ({control, name, className , ...props}) => {
    const [isChecked, setIsChecked] = useState(false);
    const { field } = useController({
        control,
        defaultValue: isChecked,
        name
    })
    return (
      <Pressable 
        {...props}
        role="checkbox"
        aria-checked={isChecked}
        className={clsx(
            "h-6 w-6 border-2 border-zinc-400 rounded-lg bg-transparent justify-center items-center",
            isChecked && 'bg-blue-700 border-blue-700',
            className
        )}
        onPress={() => {
            setIsChecked(!isChecked);
            field.onChange(!field.value);
        }}>
        {isChecked && <Entypo name="check" size={16} color="white" />}
      </Pressable>
    );
  }
  