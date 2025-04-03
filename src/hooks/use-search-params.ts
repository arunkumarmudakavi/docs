import { parseAsString, useQueryState} from "nuqs"
import { use } from "react"

export function userSearchParam() {
    return useQueryState(
        "search",
        parseAsString.withDefault("").withOptions({clearOnDefault: true})
    )
}