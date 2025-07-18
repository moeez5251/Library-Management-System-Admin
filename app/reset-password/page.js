import React, { Suspense } from "react";
import ResetClient from "./ResetClient";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetClient />
        </Suspense>
    );
}
