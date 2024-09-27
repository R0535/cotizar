import AppLayout from "@/layouts/app-layout";
import ListPageLayout from "@/layouts/list-layout";
import React from "react";

const Page: React.FC = () => {
  return (
    <AppLayout>
      {Array(50)
                .fill(0)
                .map((_, i) => (
                  <p key={i} className="my-4">
                    This is paragraph {i + 1}. Adding more content to
                    demonstrate scrolling behavior.
                  </p>
                ))}
    </AppLayout>
  );
};

export default Page;
