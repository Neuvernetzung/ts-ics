import compact from "lodash/compact";

import type { Attachment } from "@/types/attachment";

import { generateIcsLine } from "./utils/addLine";
import { generateIcsOptions } from "./utils/generateOptions";

export const generateIcsAttachment = (attachment: Attachment) => {
  if (attachment.type === "uri") {
    const options = generateIcsOptions(
      compact([
        attachment.formatType && {
          key: "FMTTYPE",
          value: attachment.formatType,
        },
      ])
    );

    return generateIcsLine("ATTACH", attachment.url, options);
  }

  if (attachment.type === "binary") {
    const options = generateIcsOptions(
      compact([
        attachment.value && { key: "VALUE", value: attachment.value },
        attachment.encoding && { key: "ENCODING", value: attachment.encoding },
      ])
    );

    return generateIcsLine("ATTACH", attachment.binary, options);
  }

  throw Error(`Attachment has no type! ${JSON.stringify(attachment)}`);
};
