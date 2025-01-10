import React from "react";

async function SeverComponent() {
  await Promise.resolve();
  return <div>서버컴포넌트</div>;
}

export default SeverComponent;
