import styled from "@emotion/styled";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LFText } from "@/component/design-system";
import { LFColor } from "@repo/shared/constant";

interface ScrollPickerProps<T> {
  list: T[];
  getInitialIndex: (items: T[]) => number;
  getDisplayText: (item: T) => string;
  onSelectedChange?: (selected: T) => void;
}

const ITEM_HEIGHT = 60;

export const LFPickerWheel = <T,>({
  list,
  getInitialIndex,
  getDisplayText,
  onSelectedChange,
}: ScrollPickerProps<T>) => {
  const SCROLL_DEBOUNCE_TIME = 100;

  const newList = [undefined, ...list, undefined];
  const ref = useRef<HTMLUListElement>(null);
  const [selected, setSelected] = useState(getInitialIndex(list) + 1); // 앞에 undefinde를 넣기 때문에 + 1을 해줍니다
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const timerRef = useRef<any | null>(null);

  const handleScroll = () => {
    if (ref.current) {
      clearTimeout(timerRef.current!);
      if (ref.current.scrollTop < ITEM_HEIGHT) {
        ref.current.scrollTop = ITEM_HEIGHT;
      }
      timerRef.current = setTimeout(() => {
        const index = Math.floor(
          (ref.current!.scrollTop + ITEM_HEIGHT / 2) / ITEM_HEIGHT,
        );
        if (list[index] !== "") {
          setSelected(index);
          itemRefs.current[index]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          if (onSelectedChange) {
            if (newList[index]) {
              onSelectedChange(newList[index]);
            }
          }
        }
      }, SCROLL_DEBOUNCE_TIME);
    }
  };

  const handleClickItem = (index: number) => {
    if (index === 0) {
      return;
    }
    if (index === newList.length - 1) {
      return;
    }

    if (ref.current) {
      // 스크롤 위치를 인덱스에 맞춰서 이동
      ref.current.scrollTop = index * ITEM_HEIGHT;
    }
    setSelected(index);

    // 클릭 후에도 onSelectedChange 호출
    if (onSelectedChange) {
      onSelectedChange(list[index]);
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = selected * ITEM_HEIGHT;
    }
  }, []);

  return (
    <List ref={ref} onScroll={handleScroll}>
      <ListCenter />
      {newList.map((item, index) => (
        <ListItem
          key={index}
          isSelected={index === selected}
          onClick={() => handleClickItem(index)} // ← 클릭 핸들러 추가!
          ref={(el) => (itemRefs.current[index] = el)}
          animate={{
            opacity: index === selected ? 1 : 0.4,
            scale: index === selected ? 1 : 0.9,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          <LFText
            variant={index === selected ? "title1" : "title2"}
            color={index === selected ? "LFGreen" : "RawGray70"}
            weight={"B"}
          >
            {item && getDisplayText(item)}
          </LFText>
        </ListItem>
      ))}
    </List>
  );
};

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  width: 100%;
  height: ${ITEM_HEIGHT * 3}px;
  overflow-y: scroll;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none; /* 기본 스크롤바 폭 제거 */
  -ms-overflow-style: none; /* 스크롤바 스타일 제거 */
`;

const ListCenter = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  border-top: 1.3px solid ${LFColor.GrayLight40};
  border-bottom: 1.3px solid ${LFColor.GrayLight40};
  height: ${ITEM_HEIGHT}px;
  position: sticky;
  top: ${ITEM_HEIGHT}px;
`;

const ListItem = styled(motion.li)<{ isSelected: boolean }>`
  height: ${ITEM_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center;
  overflow: visible;
`;
