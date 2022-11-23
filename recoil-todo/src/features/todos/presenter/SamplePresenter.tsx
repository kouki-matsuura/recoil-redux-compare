import { memo } from "react";

export const SamplePresneter =memo(() => {
    console.log("Todoリストレンダリング");
    return(
        <h1>Todoリスト</h1>
    )
});