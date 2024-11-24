'use client';

import React from "react";
import dynamic from "next/dynamic";
import LeafletMap from "@/components/LeafletJsMap";

export default function LeafLetMapPage() {
    const Map = React.useMemo(
        () =>
            dynamic(() => import("@/components/LeafletJsMap"), {
                loading: () => <p>A map is loading</p>,
                ssr: false,
            }),
        []
    );
    return <LeafletMap />;
};