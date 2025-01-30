/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Backdrop,
  Divider,
  HStack,
  VStack,
} from "@/component/design-system/Layout";
import { LFIcon, LFText } from "@/component/design-system";
import { CSSProperties, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LFColor } from "@repo/shared/constant";

interface MenuProps {
  show: boolean;
  title: string;
  items: LFMenuItems;
  onChange: (e: LFMenuItem) => void;
  onClose: () => void;
  containerStyle?: CSSProperties;
}

export type LFMenuItems = Array<{
  title: string;
  items: Array<LFMenuItem>;
  selectedItem?: LFMenuItem;
}>;

export type LFMenuItem = { label: string; value: string; key: string };

export const LFMenu = ({
  show,
  title,
  items,
  onChange,
  onClose,
  containerStyle,
}: MenuProps) => {
  return (
    <AnimatePresence>
      {show ? null : (
        <>
          <VStack css={ContainerStyle} style={containerStyle}>
            <HStack paddingVertical={"12px"} paddingHorizontal={"16px"}>
              <LFText variant={"callout"} weight={"B"} color={"ContentMainC"}>
                {title}
              </LFText>
            </HStack>

            <Divider height={8} backgroundColor={"GrayLight20"} />

            {items.length === 1
              ? items[0].items.map((innerItem) => {
                  return (
                    <button
                      key={innerItem.value}
                      onClick={() => {
                        onChange(innerItem);
                      }}
                    >
                      <LFMenuItem
                        label={innerItem.label}
                        isSelected={
                          innerItem.value === items[0].selectedItem?.value
                        }
                      />
                    </button>
                  );
                })
              : items.map((item) => {
                  return (
                    <VStack key={item.title}>
                      <LFMenuItems
                        items={item.items}
                        selectedItem={item.selectedItem}
                        title={item.title}
                        onChange={onChange}
                      />
                    </VStack>
                  );
                })}
          </VStack>
          <Backdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
        </>
      )}
    </AnimatePresence>
  );
};

type LFMenuItemsProps = {
  title: string;
  items: Array<LFMenuItem>;
  selectedItem?: LFMenuItem;
  onChange: (e: LFMenuItem) => void;
};

const LFMenuItems = ({
  title,
  items,
  selectedItem,
  onChange,
}: LFMenuItemsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <VStack>
      <LFMenuTitle
        isOpen={isOpen}
        title={title}
        onClick={() => setIsOpen((prev) => !prev)}
      />
      <AnimatePresence>
        <>
          {isOpen ? (
            <VStack>
              {items.map((item) => {
                return (
                  <button
                    key={item.value}
                    onClick={() => {
                      onChange(item);
                    }}
                  >
                    <LFMenuItem
                      label={item.label}
                      isSelected={item.value === selectedItem?.value}
                    />
                  </button>
                );
              })}
            </VStack>
          ) : null}
        </>
      </AnimatePresence>
    </VStack>
  );
};

type LFMenuTitleProps = {
  isOpen: boolean;
  title: string;
  onClick: () => void;
};

const LFMenuTitle = ({ isOpen, title, onClick }: LFMenuTitleProps) => {
  const weight = isOpen ? "B" : "R";

  return (
    <HStack
      onClick={onClick}
      alignItems={"center"}
      gap={6}
      paddingHorizontal={10}
      paddingVertical={10}
    >
      <motion.div
        animate={{
          rotate: isOpen ? 90 : 0, // isOpen 상태에 따라 90도 회전
        }}
      >
        <LFIcon variant={"chevron.right"} weight={weight} size={13} />
      </motion.div>
      <LFText variant={"callout"} weight={weight} color={"ContentMainC"}>
        {title}
      </LFText>
    </HStack>
  );
};

type LFMenuItemProps = {
  isSelected: boolean;
  label: string;
};

const LFMenuItem = ({ isSelected, label }: LFMenuItemProps) => {
  return (
    <HStack
      alignItems={"center"}
      gap={6}
      paddingHorizontal={10}
      paddingVertical={10}
    >
      <div style={{ opacity: isSelected ? 1 : 0 }}>
        <LFIcon variant={"check"} weight={"R"} size={13} />
      </div>
      <LFText variant={"callout"} weight={"R"} color={"ContentMainC"}>
        {label}
      </LFText>
    </HStack>
  );
};

const ContainerStyle = css`
  background-color: ${LFColor.GrayLight10};
  position: absolute;
  z-index: 100;
  display: flex;
  border-radius: 12px;
  width: 100%;
`;
