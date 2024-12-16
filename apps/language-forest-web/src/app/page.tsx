"use client";

import { bridge } from "../../util/webview";
import { useState } from "react";
import { safeAreaColors } from "@repo/shared/webview";
import { Text } from "@/design-system";

export default function Home() {
  const [healthCheck, setHealthCheck] = useState("before");
  const getPoseMessageHealthCheck = async () => {
    const _healthCheck = await bridge.postMessageHealthCheck({ input: "foo" });
    setHealthCheck(_healthCheck);
  };

  const reset = () => {
    setHealthCheck("reset");
  };

  const handleChangeSafeAreaColor = async (color: safeAreaColors) => {
    await bridge.changeSafeAreaColor({ color });
  };

  return (
    <div>
      {/*<div style={{ paddingTop: 100 }}>*/}
      {/*  <button style={{ height: "50px" }} onClick={getPoseMessageHealthCheck}>*/}
      {/*    bridge*/}
      {/*  </button>*/}
      {/*  <button style={{ height: "50px" }} onClick={reset}>*/}
      {/*    reset*/}
      {/*  </button>*/}
      {/*</div>*/}
      {/*<div>*/}
      {/*  <button*/}
      {/*    style={{ height: "50px" }}*/}
      {/*    onClick={() => handleChangeSafeAreaColor("blue")}*/}
      {/*  >*/}
      {/*    blue로 바꾸기*/}
      {/*  </button>*/}
      {/*  <button*/}
      {/*    style={{ height: "50px" }}*/}
      {/*    onClick={() => handleChangeSafeAreaColor("green")}*/}
      {/*  >*/}
      {/*    green으로 바꾸기*/}
      {/*  </button>*/}
      {/*</div>*/}
      {healthCheck}
      <Text name="Title2/A">test 1,23,4, 테스트</Text>
      <p>1,23,4</p>
      <p>test</p>
    </div>
  );
}
