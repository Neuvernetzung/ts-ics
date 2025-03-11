import type { Attachment } from "@/types/attachment";

import { generateIcsLine } from "./utils/addLine";
import { generateIcsOptions } from "./utils/generateOptions";

export const generateIcsAttachment = (attachment: Attachment) => {
  if (attachment.type === "uri") {
    const options = generateIcsOptions(
      [
        attachment.formatType && {
          key: "FMTTYPE",
          value: attachment.formatType,
        },
      ].filter((v) => !!v)
    );

    return generateIcsLine("ATTACH", attachment.url, options);
  }

  if (attachment.type === "binary") {
    const options = generateIcsOptions(
      [
        attachment.value && { key: "VALUE", value: attachment.value },
        attachment.encoding && { key: "ENCODING", value: attachment.encoding },
      ].filter((v) => !!v)
    );

    return generateIcsLine("ATTACH", attachment.binary, options);
  }

  throw Error(`Attachment has no type! ${JSON.stringify(attachment)}`);
};
