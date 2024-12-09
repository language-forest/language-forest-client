"use client";

import { bridge } from "../../util/webview";
import { useState } from "react";
import { safeAreaColors } from "@repo/shared/webview";

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
      <div style={{ paddingTop: 100 }}>
        <button style={{ height: "50px" }} onClick={getPoseMessageHealthCheck}>
          bridge
        </button>
        <button style={{ height: "50px" }} onClick={reset}>
          reset
        </button>
      </div>
      <div>
        <button
          style={{ height: "50px" }}
          onClick={() => handleChangeSafeAreaColor("blue")}
        >
          blue로 바꾸기
        </button>
        <button
          style={{ height: "50px" }}
          onClick={() => handleChangeSafeAreaColor("green")}
        >
          green으로 바꾸기
        </button>
      </div>
      {healthCheck}
    </div>
  );
}
