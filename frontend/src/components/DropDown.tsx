import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { cn } from '../utils/cn';
import { ScrollView } from 'react-native-gesture-handler';

interface DropDownContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropDownContext = createContext<DropDownContextType | undefined>(
  undefined
);

const DropDown = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <DropDownContext.Provider value={{ open, setOpen }}>
      <View className="relative">{children}</View>
    </DropDownContext.Provider>
  );
};

const DropDownTrigger = ({ children }: any) => {
  const { setOpen } = useDropdown();
  return cloneElement(children, {
    onPress: () => setOpen((prev: any) => !prev),
  });
};

type DropDownContentTypes = {
  className?: string;
  children: React.ReactNode;
};

const DropDownContent = ({ className, children }: DropDownContentTypes) => {
  const { open } = useDropdown();
  return (
    <>
      {open && (
        <ScrollView
          className={cn(
            'min-w-[8rem] w-full absolute h-52 gap-3 overflow-hidden rounded-md text-popover-foreground shadow-md shadow-black mt-3 p-3 top-10 mx-auto',
            className
          )}
          style={{
            backgroundColor: '#f2f2f2',
          }}
          contentContainerStyle={{flexGrow: 1}}
          nestedScrollEnabled
        >
          {children}
        </ScrollView>
      )}
    </>
  );
};

type DropDownLabelProps = {
  labelTitle: string;
};

const DropDownLabel = ({ labelTitle }: DropDownLabelProps) => {
  return (
    <Text className="text-xl font-semibold text-primary">{labelTitle}</Text>
  );
};

type DropDownItemProps = {
  children: React.ReactNode;
  className?: string;
  onPress?: Function
};

const DropDownItem = ({ children, onPress, className }: DropDownItemProps) => {
  const { setOpen } = useDropdown();

  return (
    <TouchableOpacity onPress={() => {
      setOpen(false);
      onPress && onPress();      
    }} className={cn('p-2', className)}>
      {children}
    </TouchableOpacity>
  );
};

const DropDownItemSeparator = () => {
  return <View className="h-[1px] bg-border flex-1" />;
};
const useDropdown = () => {
  const context = useContext(DropDownContext);
  if (!context) {
    throw new Error('useDropdown must be used within a DropdownProvider');
  }
  return context;
};
export {
  DropDown,
  DropDownTrigger,
  DropDownContent,
  DropDownLabel,
  DropDownItemSeparator,
  DropDownItem,
  useDropdown,
};