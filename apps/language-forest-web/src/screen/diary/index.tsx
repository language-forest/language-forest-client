import {
  LFBottomTabNavigation,
  LFHeader,
  LFPageWrapper,
} from "@/component/design-system";
import withAuth from "@/hoc/AuthHoc.tsx";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../ReactCalendarCustomCss.css";
import { useGetMontlyStudy } from "@repo/language-forest-api";
import { DiaryTileComponent } from "@/screen/diary/_components/DiaryTileComponent.tsx";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const minDate = new Date(2025, 0, 1);
const maxDate = new Date();

const DiaryScreen = withAuth(
  () => {
    const [value, setValue] = useState<Value>(new Date());
    const year =
      value instanceof Date ? value.getFullYear() : new Date().getFullYear();
    const month =
      value instanceof Date ? value.getMonth() + 1 : new Date().getMonth() + 1; // 0부터 시작하므로 +1

    const { data } = useGetMontlyStudy({ year, month });
    const studies = data?.studies ?? [];

    return (
      <LFPageWrapper>
        <LFHeader />
        <Calendar
          maxDate={maxDate}
          minDate={minDate}
          onChange={(e) => {
            console.log(e);
            setValue(e);
          }}
          value={value}
          calendarType={"gregory"}
          tileContent={(e) => {
            const targetDate = new Date(e.date);
            if (e.view === "month") {
              const formatDate = `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, "0")}-${String(targetDate.getDate()).padStart(2, "0")}`;
              const targetItem = studies.find(
                (study) => study.studyDate === formatDate,
              );
              return <DiaryTileComponent studyItem={targetItem} tileArgs={e} />;
            }
          }}
          formatShortWeekday={(locale, date) => {
            // console.log("요일:", date.toDateString()); // 콘솔에서 확인 가능
            return date
              .toLocaleDateString(locale, { weekday: "short" })
              .toUpperCase(); // 대문자로 변환
          }}
          formatDay={() => {
            return "";
          }}
        />

        <LFBottomTabNavigation />
      </LFPageWrapper>
    );
  },
  { behavior: "redirect" },
);

export default DiaryScreen;
