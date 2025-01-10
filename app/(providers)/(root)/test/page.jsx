import Button from "@/components/Button";
import React from "react";

function TestPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Button size="sm" intent="primary">
        작은 버튼
      </Button>
      <Button size="md" intent="secondary">
        중간 버튼
      </Button>
      <Button size="lg" intent="white">
        큰 버튼
      </Button>
      <Button intent="black">네 번째 버튼</Button>
      <Button>다섯 번째 버튼</Button>
    </div>
  );
}

export default TestPage;
