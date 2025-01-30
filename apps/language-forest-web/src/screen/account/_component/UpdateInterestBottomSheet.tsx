// import {
//   BottomSheet,
//   LFFillButton,
//   LFInputField,
//   VStack,
// } from "@/component/design-system";
// import { useUserStore } from "@/store/useUserStore.ts";
// import { BaseUserInfo } from "@repo/language-forest-api";
// import { useState } from "react";
//
// type Props = {
//   isOpen: boolean;
//   close: () => void;
//   userInfo: BaseUserInfo;
// };
//
// export const UpdateInterestBottomSheet = ({
//   isOpen,
//   close,
//   userInfo,
// }: Props) => {
//   const updateUser = useUserStore((state) => state.updateUser);
//   const [interest, setInterest] = useState(userInfo.interest);
//
//   const handleSaveInterest = async () => {
//     if (userInfo.interest !== interest) {
//       await updateUser({ userInfo: { interest: interest ?? undefined } });
//     }
//
//     close();
//   };
//
//   return (
//     <BottomSheet
//       isOpen={isOpen}
//       onClose={() => {
//         close();
//       }}
//       title={"관심 분야"}
//     >
//       <VStack gap={20}>
//         <LFInputField value={interest} onInputChange={(e) => setInterest(e)} />
//
//         <VStack paddingVertical={20}>
//           <LFFillButton type={"Green"} onClick={handleSaveInterest}>
//             확인
//           </LFFillButton>
//         </VStack>
//       </VStack>
//     </BottomSheet>
//   );
// };
